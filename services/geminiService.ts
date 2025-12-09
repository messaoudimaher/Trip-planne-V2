import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";
import { Trip, Activity } from "../types";

// Helper to safely get API key from Local Storage
const getApiKey = (): string => {
  return localStorage.getItem('gemini_api_key') || '';
};

// Initialize only if key exists
const createAI = () => {
  const apiKey = getApiKey();
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

export const suggestActivities = async (destination: string, interests: string[]): Promise<string> => {
  const ai = createAI();
  if (!ai) return "Please click the Settings (Gear) icon to add your Google Gemini API Key.";

  try {
    const prompt = `Suggest 3 unique family-friendly activities in ${destination} based on these interests: ${interests.join(', ')}. 
    Format as a concise list with estimated costs.`;
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "No suggestions found.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I couldn't fetch suggestions. Please check your API Key.";
  }
};

export const chatWithAssistant = async (
  history: { role: 'user' | 'model'; text: string }[],
  currentMessage: string,
  context?: { trip?: Trip; view: string }
) => {
  const ai = createAI();
  if (!ai) return "Please click the Settings (Gear) icon in the top right to configure your AI API Key first.";

  const systemInstruction = `You are WanderNest AI, a helpful, warm, and knowledgeable family travel assistant. 
  Your tone is encouraging and organized.
  Current Context: User is viewing ${context?.view}.
  ${context?.trip ? `Selected Trip: ${context.trip.destination} (${context.trip.startDate} to ${context.trip.endDate}).` : ''}
  
  Help the user plan trips, manage budgets, and find activities. Keep responses concise and easy to read on mobile.`;

  try {
    const chat: Chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: { systemInstruction },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const response = await chat.sendMessage({ message: currentMessage });
    return response.text;
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I'm having trouble connecting. Please verify your API Key in Settings.";
  }
};
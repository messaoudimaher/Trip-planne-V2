import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { chatWithAssistant } from '../services/geminiService';
import { ChatMessage, Trip, View } from '../types';

interface ChatAssistantProps {
  currentView: View;
  currentTrip?: Trip;
}

export const ChatAssistant: React.FC<ChatAssistantProps> = ({ currentView, currentTrip }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hi! I'm your WanderNest assistant. Need help planning your next adventure?",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      const responseText = await chatWithAssistant(history, userMsg.text, { trip: currentTrip, view: currentView });
      
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText || "I'm having trouble thinking right now. Try again later!",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "I couldn't reach the server. Please check your connection or API key.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 ${isOpen ? 'bg-white text-stone-800 rotate-90' : 'bg-sage-500 text-white'}`}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Interface */}
      <div 
        className={`fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-3xl shadow-2xl border border-stone-100 z-40 transition-all duration-300 origin-bottom-right flex flex-col overflow-hidden ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10 pointer-events-none'}`}
        style={{ height: '500px', maxHeight: '80vh' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-sage-500 to-sage-700 p-4 text-white flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-full">
            <Sparkles size={18} />
          </div>
          <div>
            <h3 className="font-bold text-sm">Trip Assistant</h3>
            <p className="text-xs text-sage-100">Powered by Gemini AI</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-stone-800 text-white rounded-tr-none'
                    : 'bg-white text-stone-700 shadow-sm border border-stone-100 rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
             <div className="flex justify-start">
               <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-stone-100 flex gap-1 items-center">
                 <div className="w-2 h-2 bg-sage-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                 <div className="w-2 h-2 bg-sage-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                 <div className="w-2 h-2 bg-sage-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t border-stone-100">
          <div className="flex items-center gap-2 bg-stone-50 rounded-full px-4 py-2 border border-stone-200 focus-within:border-sage-400 transition-colors">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask for suggestions..."
              className="flex-1 bg-transparent outline-none text-sm text-stone-800 placeholder-stone-400"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="text-sage-600 hover:text-sage-800 disabled:opacity-50 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
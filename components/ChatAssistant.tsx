import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, MessageSquare } from 'lucide-react';
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
      text: "✈️ Hi! I'm your AI travel assistant. Ask me anything about your trips — itinerary ideas, budget tips, local recommendations...",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      const responseText = await chatWithAssistant(history, userMsg.text, {
        trip: currentTrip,
        view: currentView,
      });

      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'model',
          text: responseText || "I'm having trouble thinking right now. Try again!",
          timestamp: new Date(),
        },
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'model',
          text: "Couldn't reach the server. Please check your API key in Settings.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Float Button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center ${
          isOpen
            ? 'bg-white text-slate-700 shadow-slate-200 rotate-90 scale-95'
            : 'bg-gradient-to-br from-brand-500 to-violet-600 text-white shadow-brand-500/40 hover:scale-110 hover:shadow-brand-500/60'
        }`}
        aria-label="Open AI Assistant"
      >
        {/* Pulse ring (only when closed) */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-brand-400 opacity-30 animate-ping" />
        )}
        {isOpen ? <X size={22} /> : <Sparkles size={22} />}
      </button>

      {/* Chat Panel */}
      <div
        className={`fixed bottom-24 right-6 w-[340px] md:w-[380px] bg-white rounded-3xl shadow-2xl border border-slate-100 z-40 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right ${
          isOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-90 translate-y-8 pointer-events-none'
        }`}
        style={{ height: '520px', maxHeight: '80vh' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-brand-900 p-4 text-white flex items-center gap-3 flex-shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-400 to-violet-500 flex items-center justify-center shadow-lg shadow-brand-500/40 flex-shrink-0">
            <Sparkles size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-bold text-sm">WanderLog AI</h3>
            <p className="text-[10px] text-slate-400 font-medium">Powered by Gemini · Always ready</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X size={13} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-slate-50">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
            >
              {msg.role === 'model' && (
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-brand-500 to-violet-600 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5 shadow-sm">
                  <MessageSquare size={10} className="text-white" />
                </div>
              )}
              <div
                className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-br from-brand-500 to-violet-600 text-white rounded-tr-sm shadow-lg shadow-brand-500/20'
                    : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Loading dots */}
          {isLoading && (
            <div className="flex justify-start animate-fade-in">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-brand-500 to-violet-600 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
                <MessageSquare size={10} className="text-white" />
              </div>
              <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm border border-slate-100 flex gap-1.5 items-center">
                {[0, 150, 300].map(delay => (
                  <div
                    key={delay}
                    className="w-2 h-2 rounded-full bg-brand-400 animate-bounce"
                    style={{ animationDelay: `${delay}ms` }}
                  />
                ))}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t border-slate-100 flex-shrink-0">
          <div className="flex items-center gap-2 bg-slate-50 rounded-2xl px-4 py-2 border border-slate-200 focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-500/10 transition-all">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask about your trips..."
              className="flex-1 bg-transparent outline-none text-sm text-slate-800 placeholder-slate-400"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-500 to-violet-600 text-white flex items-center justify-center disabled:opacity-40 transition-all hover:shadow-md hover:shadow-brand-500/30 active:scale-95 flex-shrink-0"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
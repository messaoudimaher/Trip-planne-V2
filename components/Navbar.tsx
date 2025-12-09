import React from 'react';
import { View } from '../types';
import { Compass, BarChart2, Plus, Home, Settings } from 'lucide-react';

interface NavbarProps {
  currentView: View;
  onNavigate: (view: View) => void;
  onOpenSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenSettings }) => {
  return (
    <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-stone-200 px-4 py-3">
      <div className="container mx-auto max-w-7xl flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => onNavigate('home')}
        >
          <div className="bg-sage-500 text-white p-2 rounded-xl shadow-md">
            <Compass size={24} />
          </div>
          <span className="text-xl md:text-2xl font-display font-extrabold text-stone-800 tracking-tight">Maher's Family Trips</span>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={() => onNavigate('home')}
            className={`p-2 rounded-full transition-colors ${currentView === 'home' ? 'bg-sage-100 text-sage-700' : 'text-stone-500 hover:bg-stone-100'}`}
          >
            <Home size={20} />
            <span className="sr-only">Home</span>
          </button>
          
          <button 
            onClick={() => onNavigate('analytics')}
            className={`p-2 rounded-full transition-colors ${currentView === 'analytics' ? 'bg-sage-100 text-sage-700' : 'text-stone-500 hover:bg-stone-100'}`}
          >
            <BarChart2 size={20} />
            <span className="sr-only">Analytics</span>
          </button>

          <button 
            onClick={onOpenSettings}
            className="p-2 rounded-full text-stone-500 hover:bg-stone-100 transition-colors"
            title="Settings / API Key"
          >
            <Settings size={20} />
            <span className="sr-only">Settings</span>
          </button>

          <div className="h-6 w-[1px] bg-stone-200 mx-1 hidden md:block"></div>

          <button 
            onClick={() => onNavigate('create')}
            className="hidden md:flex items-center gap-2 bg-stone-800 hover:bg-stone-700 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-transform active:scale-95 shadow-lg shadow-stone-200"
          >
            <Plus size={16} />
            <span>New Trip</span>
          </button>
           {/* Mobile Plus Button */}
           <button 
            onClick={() => onNavigate('create')}
            className="md:hidden flex items-center justify-center bg-stone-800 text-white w-10 h-10 rounded-full shadow-lg active:scale-90 transition-transform"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};
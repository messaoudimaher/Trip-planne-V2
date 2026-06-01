import React, { useState, useEffect } from 'react';
import { View } from '../types';
import { BarChart2, Plus, Home, Settings, Map } from 'lucide-react';

interface NavbarProps {
  currentView: View;
  onNavigate: (view: View) => void;
  onOpenSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenSettings }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { view: View; label: string; icon: React.ReactNode }[] = [
    { view: 'home',      label: 'Trips',     icon: <Home size={18} /> },
    { view: 'analytics', label: 'Analytics', icon: <BarChart2 size={18} /> },
  ];

  return (
    <nav
      className={`sticky top-0 z-30 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-sm shadow-slate-200/60 border-b border-slate-200/70'
          : 'bg-white/60 backdrop-blur-md border-b border-slate-200/40'
      }`}
    >
      <div className="container mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 group"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-violet-600 shadow-lg shadow-brand-500/30 flex items-center justify-center overflow-hidden group-hover:shadow-brand-500/50 transition-shadow duration-300">
            <Map size={20} className="text-white relative z-10" />
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display font-extrabold text-lg text-slate-900 tracking-tight">
              WanderLog
            </span>
            <span className="text-[10px] font-medium text-slate-400 tracking-widest uppercase">Family Trips</span>
          </div>
        </button>

        {/* Center Nav */}
        <div className="hidden md:flex items-center gap-1 bg-slate-100 rounded-full px-1.5 py-1.5">
          {navItems.map(item => (
            <button
              key={item.view}
              onClick={() => onNavigate(item.view)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                currentView === item.view
                  ? 'bg-white text-brand-600 shadow-sm shadow-slate-200'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSettings}
            className="w-10 h-10 rounded-full text-slate-500 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-all duration-200"
            title="Settings / API Key"
          >
            <Settings size={19} />
          </button>

          <button
            onClick={() => onNavigate('create')}
            className="relative hidden md:flex items-center gap-2 bg-gradient-to-r from-brand-500 to-violet-600 hover:from-brand-600 hover:to-violet-700 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 active:scale-95 overflow-hidden shimmer-btn"
          >
            <Plus size={16} />
            <span>New Trip</span>
          </button>

          {/* Mobile */}
          <button
            onClick={() => onNavigate('create')}
            className="md:hidden w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-violet-600 text-white shadow-lg shadow-brand-500/30 flex items-center justify-center active:scale-90 transition-transform"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <div className="md:hidden flex justify-around border-t border-slate-100 bg-white/95 px-4 py-2">
        {navItems.map(item => (
          <button
            key={item.view}
            onClick={() => onNavigate(item.view)}
            className={`flex flex-col items-center gap-1 px-6 py-1 rounded-xl transition-colors duration-200 ${
              currentView === item.view ? 'text-brand-600' : 'text-slate-400'
            }`}
          >
            {item.icon}
            <span className="text-[10px] font-semibold">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};
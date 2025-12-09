import React, { useState } from 'react';
import { Trip } from '../types';
import { COLORS } from '../constants';
import { ChevronRight, MapPin, Calendar as CalendarIcon, DollarSign, Check } from 'lucide-react';
import { Calendar } from '../components/Calendar';

interface CreateTripViewProps {
  onSave: (trip: Trip) => void;
  onCancel: () => void;
}

const STEPS = [
  { id: 'dest', title: 'Where to?', icon: <MapPin /> },
  { id: 'dates', title: 'When?', icon: <CalendarIcon /> },
  { id: 'budget', title: 'Budget', icon: <DollarSign /> },
];

const TRIP_IMAGES = [
  { id: 'city', url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1000&auto=format&fit=crop', name: 'City' },
  { id: 'beach', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop', name: 'Beach' },
  { id: 'mountain', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000&auto=format&fit=crop', name: 'Mountain' },
  { id: 'nature', url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1000&auto=format&fit=crop', name: 'Forest' },
  { id: 'culture', url: 'https://images.unsplash.com/photo-1528164344705-47542687000d?q=80&w=1000&auto=format&fit=crop', name: 'Culture' },
  { id: 'safari', url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1000&auto=format&fit=crop', name: 'Safari' },
];

export const CreateTripView: React.FC<CreateTripViewProps> = ({ onSave, onCancel }) => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Partial<Trip>>({
    destination: '',
    totalBudget: 0,
    budgetCategories: [],
    activities: [],
    image: TRIP_IMAGES[0].url
  });

  const nextStep = () => setStep(Math.min(STEPS.length - 1, step + 1));
  const prevStep = () => setStep(Math.max(0, step - 1));

  const handleFinish = () => {
    const total = Number(data.totalBudget) || 1000;
    
    const newTrip: Trip = {
      id: `t${Date.now()}`,
      destination: data.destination || 'Unknown',
      startDate: data.startDate || new Date().toISOString().split('T')[0],
      endDate: data.endDate || new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
      totalBudget: total,
      image: data.image || TRIP_IMAGES[0].url,
      budgetCategories: [
        { id: 'b1', name: 'Accommodation', allocated: total * 0.35, spent: 0, color: COLORS.sage },
        { id: 'b2', name: 'Transportation', allocated: total * 0.25, spent: 0, color: COLORS.sky },
        { id: 'b3', name: 'Food', allocated: total * 0.20, spent: 0, color: COLORS.warm },
        { id: 'b4', name: 'Activities', allocated: total * 0.20, spent: 0, color: COLORS.violet },
      ],
      activities: []
    };
    onSave(newTrip);
  };

  const formatDateDisplay = (dateStr?: string) => {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in py-8 px-4">
      {/* Progress */}
      <div className="mb-12">
        <div className="flex justify-between relative max-w-lg mx-auto">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-stone-100 -z-10 -translate-y-1/2 rounded-full" />
          <div 
            className="absolute top-1/2 left-0 h-1 bg-stone-800 -z-10 -translate-y-1/2 rounded-full transition-all duration-700 ease-out" 
            style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}
          />
          {STEPS.map((s, i) => (
            <div 
              key={s.id} 
              className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-500 z-10 shadow-sm ${
                i <= step ? 'bg-stone-800 border-stone-800 text-white scale-110' : 'bg-white border-stone-200 text-stone-300'
              }`}
            >
              <span className="scale-75">{s.icon}</span>
            </div>
          ))}
        </div>
        <h2 className="text-center mt-8 text-3xl font-bold font-display text-stone-800">{STEPS[step].title}</h2>
      </div>

      {/* Form Content */}
      <div className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-xl shadow-stone-200/50 border border-stone-100 min-h-[500px] flex flex-col justify-between transition-all duration-500">
        
        {step === 0 && (
          <div className="space-y-10 animate-fade-in">
            <div className="relative group">
              <label className="block text-sm font-bold text-stone-400 uppercase tracking-widest mb-3">Destination Name</label>
              <input 
                type="text" 
                value={data.destination}
                onChange={(e) => setData({...data, destination: e.target.value})}
                className="w-full text-4xl font-bold border-b-2 border-stone-200 py-4 focus:outline-none focus:border-sage-500 placeholder-stone-200 bg-transparent transition-colors text-stone-800"
                placeholder="e.g. Kyoto, Japan"
                autoFocus
              />
              <div className="absolute right-0 bottom-4 text-stone-300 pointer-events-none group-focus-within:text-sage-500 transition-colors">
                <MapPin size={32} />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-stone-400 uppercase tracking-widest mb-4">Choose a vibe (Cover Image)</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {TRIP_IMAGES.map((img) => (
                    <div 
                      key={img.id} 
                      onClick={() => setData({...data, image: img.url})}
                      className={`relative h-32 rounded-3xl overflow-hidden cursor-pointer group transition-all duration-300 ${data.image === img.url ? 'ring-4 ring-sage-500 ring-offset-2' : 'hover:scale-[1.02]'}`}
                    >
                      <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                      <div className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity ${data.image === img.url ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                         {data.image === img.url && <div className="bg-white p-2 rounded-full text-sage-600"><Check size={20} strokeWidth={3} /></div>}
                      </div>
                      <div className="absolute bottom-2 left-3 text-white font-bold text-sm drop-shadow-md">{img.name}</div>
                    </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col h-full animate-fade-in">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 bg-stone-50 p-6 rounded-3xl border border-stone-100 shadow-inner gap-4">
              <div className="flex flex-col w-full md:w-auto">
                <span className="text-xs text-stone-400 uppercase font-bold tracking-wider mb-2">Start Date</span>
                <div className="font-bold text-xl text-stone-800 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-sage-500" />
                    {formatDateDisplay(data.startDate) || <span className="text-stone-300">Select...</span>}
                </div>
              </div>
              <div className="h-[2px] w-full md:h-10 md:w-[2px] bg-stone-200" />
              <div className="flex flex-col text-right w-full md:w-auto">
                <span className="text-xs text-stone-400 uppercase font-bold tracking-wider mb-2">End Date</span>
                <div className="font-bold text-xl text-stone-800 flex items-center justify-end gap-2">
                    {formatDateDisplay(data.endDate) || <span className="text-stone-300">Select...</span>}
                    <div className="w-2 h-2 rounded-full bg-stone-800" />
                </div>
              </div>
            </div>
            
            <div className="flex-1 flex justify-center w-full">
              <Calendar 
                startDate={data.startDate} 
                endDate={data.endDate} 
                onChange={(s, e) => setData({...data, startDate: s, endDate: e})} 
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-fade-in flex flex-col items-center justify-center h-full">
            <div className="w-full text-center">
              <label className="block text-sm font-bold text-stone-400 uppercase tracking-widest mb-6">Total Budget Estimate</label>
              <div className="relative inline-block w-full max-w-md">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-4xl md:text-5xl font-bold text-stone-300">$</span>
                <input 
                  type="number" 
                  className="w-full pl-12 md:pl-16 pr-6 py-6 text-4xl md:text-6xl font-bold bg-stone-50 rounded-[2rem] focus:ring-4 focus:ring-sage-100 focus:bg-white outline-none transition-all text-stone-800 placeholder-stone-200 text-center shadow-inner"
                  placeholder="0"
                  value={data.totalBudget || ''}
                  onChange={(e) => setData({...data, totalBudget: parseInt(e.target.value)})}
                  autoFocus
                />
              </div>
              <p className="text-stone-400 mt-6 max-w-sm mx-auto leading-relaxed">We'll help you track your spending across accommodation, food, transportation, and fun later on.</p>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-between mt-10 pt-8 border-t border-stone-100">
          <button 
            onClick={step === 0 ? onCancel : prevStep}
            className="px-8 py-3 rounded-2xl text-stone-500 hover:bg-stone-50 font-bold transition-colors"
          >
            {step === 0 ? 'Cancel' : 'Back'}
          </button>
          
          <button 
            onClick={step === STEPS.length - 1 ? handleFinish : nextStep}
            disabled={
              (step === 0 && !data.destination) ||
              (step === 1 && (!data.startDate || !data.endDate))
            }
            className="flex items-center gap-3 bg-stone-800 text-white px-10 py-4 rounded-2xl hover:bg-stone-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <span className="font-bold">{step === STEPS.length - 1 ? 'Create Trip' : 'Next Step'}</span>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
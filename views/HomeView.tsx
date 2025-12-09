import React, { useState } from 'react';
import { Trip, View } from '../types';
import { Calendar, MapPin, ArrowRight, PieChart, Clock, Trash2, AlertTriangle, ImageOff } from 'lucide-react';

interface HomeViewProps {
  trips: Trip[];
  onNavigate: (view: View, tripId?: string) => void;
  onDeleteTrip: (tripId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ trips, onNavigate, onDeleteTrip }) => {
  const [tripToDelete, setTripToDelete] = useState<string | null>(null);
  
  const upcomingTrips = trips.filter(t => new Date(t.endDate) >= new Date());
  const pastTrips = trips.filter(t => new Date(t.endDate) < new Date());

  const handleRequestDelete = (tripId: string) => {
    setTripToDelete(tripId);
  };

  const confirmDelete = () => {
    if (tripToDelete) {
      onDeleteTrip(tripToDelete);
      setTripToDelete(null);
    }
  };

  return (
    <div className="space-y-12 animate-fade-in">
      <section>
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-stone-800">Your Adventures</h2>
            <p className="text-stone-500 mt-2">Where will you make memories next?</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingTrips.map(trip => (
            <TripCard 
              key={trip.id} 
              trip={trip} 
              onClick={() => onNavigate('dashboard', trip.id)} 
              onDelete={handleRequestDelete}
            />
          ))}
          
          <button 
            onClick={() => onNavigate('create')}
            className="group flex flex-col items-center justify-center h-[400px] rounded-[2rem] border-2 border-dashed border-stone-300 hover:border-sage-400 hover:bg-sage-50/50 transition-all cursor-pointer relative overflow-hidden"
          >
             <div className="absolute inset-0 bg-stone-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="w-20 h-20 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 group-hover:bg-sage-500 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:scale-110 relative z-10 mb-6">
              <span className="text-4xl font-light">+</span>
            </div>
            <span className="font-bold text-lg text-stone-500 group-hover:text-stone-700 relative z-10">Plan a New Journey</span>
            <span className="text-sm text-stone-400 mt-2 relative z-10">Start from scratch</span>
          </button>
        </div>
      </section>

      {pastTrips.length > 0 && (
        <section>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-display font-bold text-stone-600">Travel Journal</h2>
            <div className="h-[1px] bg-stone-200 flex-1" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-90 hover:opacity-100 transition-opacity">
            {pastTrips.map(trip => (
              <TripCard 
                key={trip.id} 
                trip={trip} 
                onClick={() => onNavigate('dashboard', trip.id)} 
                onDelete={handleRequestDelete}
                isPast 
              />
            ))}
          </div>
        </section>
      )}

      {/* Delete Confirmation Modal */}
      {tripToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-stone-900/50 backdrop-blur-sm" onClick={() => setTripToDelete(null)} />
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm relative z-10 animate-scale-up p-6 text-center">
             <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
               <AlertTriangle size={32} />
             </div>
             <h3 className="text-xl font-bold text-stone-800 mb-2">Delete Trip?</h3>
             <p className="text-stone-500 mb-6">Are you sure you want to delete this trip and all its memories? This action cannot be undone.</p>
             
             <div className="flex gap-3">
               <button 
                 onClick={() => setTripToDelete(null)}
                 className="flex-1 py-3 px-4 rounded-xl font-bold text-stone-600 bg-stone-100 hover:bg-stone-200 transition-colors"
               >
                 Cancel
               </button>
               <button 
                 onClick={confirmDelete}
                 className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-200 transition-all active:scale-95"
               >
                 Yes, Delete
               </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TripCard: React.FC<{ trip: Trip; onClick: () => void; onDelete: (id: string) => void; isPast?: boolean }> = ({ trip, onClick, onDelete, isPast }) => {
  const [imageError, setImageError] = useState(false);
  const spentPercentage = Math.min(100, Math.round(
    (trip.budgetCategories.reduce((acc, c) => acc + c.spent, 0) / trip.totalBudget) * 100
  ));
  
  const daysUntil = Math.ceil((new Date(trip.startDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  const handleDeleteClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(trip.id);
  };

  return (
    // Note: Removed 'transform' class which can cause stacking context issues on some mobile browsers
    <div className="group relative bg-white rounded-[2rem] shadow-sm hover:shadow-2xl hover:shadow-stone-200/50 transition-shadow duration-500 overflow-hidden h-[400px] flex flex-col border border-stone-100 isolate">
      
      {/* 
        LAYER 1: The Content (Image + Text)
        Pointer events none prevents clicks on these elements from interfering with navigation
      */}
      <div className="h-full flex flex-col pointer-events-none">
        {/* Image Section */}
        <div className="relative h-[60%] overflow-hidden bg-stone-200">
          {!imageError ? (
            <img 
              src={trip.image} 
              alt={trip.destination} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-stone-500 bg-stone-200/50">
                <ImageOff size={32} className="mb-2 opacity-50" />
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Image Unavailable</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
          
          <div className="absolute bottom-0 left-0 p-6 w-full z-10">
            <h3 className="text-2xl font-bold text-white mb-2 leading-tight drop-shadow-md">{trip.destination}</h3>
            <div className="flex items-center gap-2 text-sm text-stone-200 font-medium">
              <Calendar size={14} className="text-sage-300" />
              <span>{new Date(trip.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} — {new Date(trip.endDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
            </div>
          </div>
        </div>
        
        {/* Text Content Section */}
        <div className="p-6 flex-1 flex flex-col justify-between bg-white relative z-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="px-3 py-1.5 rounded-lg bg-stone-50 text-stone-600 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                <MapPin size={12} />
                {trip.activities.length} Activities
              </div>
            </div>
            
            {!isPast && (
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1.5 text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">
                  <PieChart size={12} />
                  <span>Budget</span>
                </div>
                <div className="text-lg font-bold text-stone-800">
                  {spentPercentage}%
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-stone-50">
            <div className="px-3 py-1.5 rounded-lg bg-stone-50 text-stone-600 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                <Clock size={12} />
                {Math.max(1, Math.ceil((new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / (1000 * 3600 * 24)))} Days
            </div>
          </div>
        </div>
      </div>

      {/* 
        LAYER 2: Navigation Click Overlay (z-10)
        Covers the entire card. This handles the main "Go to Trip" action.
      */}
      <div 
        onClick={onClick}
        className="absolute inset-0 z-10 cursor-pointer"
        role="button"
        aria-label={`View details for ${trip.destination}`}
      />

      {/* 
        LAYER 3: Interactive Controls (z-30)
        These sit ON TOP of the navigation layer.
        We position them absolutely.
      */}
      <div className="absolute top-4 right-4 z-30 flex gap-2" onClick={(e) => e.stopPropagation()}>
          {/* Status Badge */}
          <div className="bg-white/90 backdrop-blur-md text-stone-600 px-3 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm flex items-center h-10 pointer-events-none">
            {isPast ? 'Completed' : `${daysUntil > 0 ? daysUntil + ' days' : 'Now'}`}
          </div>

          {/* Delete Button - Needs pointer-events-auto */}
          <button
            type="button"
            onClick={handleDeleteClick}
            onTouchEnd={handleDeleteClick}
            className="bg-white text-stone-400 hover:bg-red-500 hover:text-white w-10 h-10 rounded-full transition-all duration-200 shadow-md border border-stone-100 cursor-pointer active:scale-95 flex items-center justify-center pointer-events-auto z-40"
            title="Delete Trip"
          >
            <Trash2 size={18} />
          </button>

          {/* Arrow Icon (Visual hint) */}
          {!isPast && (
            <div className="bg-white/90 backdrop-blur-sm w-10 h-10 rounded-full text-stone-800 shadow-lg hidden md:flex items-center justify-center pointer-events-none">
              <ArrowRight size={16} className="group-hover:-rotate-45 transition-transform duration-300" />
            </div>
          )}
      </div>
    </div>
  );
};
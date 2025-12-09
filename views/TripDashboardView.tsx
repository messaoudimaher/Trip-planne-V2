import React, { useState } from 'react';
import { Trip, View, Activity, BudgetCategory } from '../types';
import { 
  ArrowLeft, Calendar, MapPin, DollarSign, Plus, Map as MapIcon, 
  List, PieChart, Clock, Trash2, Edit2, X, Check, Utensils, 
  Camera, Coffee, Ticket, Train, Filter, AlertTriangle, ImageOff 
} from 'lucide-react';
import { TripMap } from '../components/TripMap';

interface TripDashboardViewProps {
  trip: Trip;
  onNavigate: (view: View) => void;
  onTripUpdate: (updatedTrip: Trip) => void;
  onDeleteTrip: (tripId: string) => void;
}

export const TripDashboardView: React.FC<TripDashboardViewProps> = ({ 
  trip, 
  onNavigate, 
  onTripUpdate,
  onDeleteTrip 
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'itinerary' | 'map'>('itinerary');
  const [isAddActivityOpen, setIsAddActivityOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Activity Sorting
  const [sortMethod, setSortMethod] = useState<'date' | 'time' | 'cost' | 'category'>('date');
  
  // Edit/Delete States
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  
  // Confirmation States
  const [activityToDelete, setActivityToDelete] = useState<string | null>(null);
  const [isDeletingTrip, setIsDeletingTrip] = useState(false);

  // Helper to recalculate budget based on activities
  const recalculateBudget = (activities: Activity[], categories: BudgetCategory[]) => {
    // Reset spent
    const newCategories = categories.map(c => ({ ...c, spent: 0 }));
    
    activities.forEach(act => {
      // Find matching category (flexible matching)
      let categoryIndex = -1;
      
      if (act.category === 'food') categoryIndex = newCategories.findIndex(c => c.name.toLowerCase().includes('food'));
      else if (act.category === 'transit') categoryIndex = newCategories.findIndex(c => c.name.toLowerCase().includes('transport'));
      else if (act.category === 'adventure' || act.category === 'culture') categoryIndex = newCategories.findIndex(c => c.name.toLowerCase().includes('activit'));
      else if (act.category === 'relax') categoryIndex = newCategories.findIndex(c => c.name.toLowerCase().includes('accomm') || c.name.toLowerCase().includes('hotel'));
      
      // Fallback: distribute evenly or to first if no match
      if (categoryIndex === -1 && newCategories.length > 0) categoryIndex = 0;
      
      if (categoryIndex !== -1) {
        newCategories[categoryIndex].spent += act.cost;
      }
    });

    return newCategories;
  };

  const handleSaveActivity = (activity: Activity) => {
    let updatedActivities;
    if (editingActivity) {
      updatedActivities = trip.activities.map(a => a.id === activity.id ? activity : a);
    } else {
      updatedActivities = [...trip.activities, { ...activity, id: Date.now().toString() }];
    }
    
    const updatedCategories = recalculateBudget(updatedActivities, trip.budgetCategories);
    
    onTripUpdate({
      ...trip,
      activities: updatedActivities,
      budgetCategories: updatedCategories
    });
    
    setIsAddActivityOpen(false);
    setEditingActivity(null);
  };

  const handleDeleteActivity = () => {
    if (!activityToDelete) return;
    
    const updatedActivities = trip.activities.filter(a => a.id !== activityToDelete);
    const updatedCategories = recalculateBudget(updatedActivities, trip.budgetCategories);
    
    onTripUpdate({
      ...trip,
      activities: updatedActivities,
      budgetCategories: updatedCategories
    });
    setActivityToDelete(null);
  };

  const handleUpdateBudget = (updatedCategories: BudgetCategory[]) => {
      onTripUpdate({
          ...trip,
          budgetCategories: updatedCategories,
          totalBudget: updatedCategories.reduce((acc, c) => acc + c.allocated, 0)
      });
      setIsEditingBudget(false);
  };

  // Sort Logic
  const sortedActivities = [...trip.activities].sort((a, b) => {
    if (sortMethod === 'date') return new Date(a.date).getTime() - new Date(b.date).getTime();
    if (sortMethod === 'time') return a.time.localeCompare(b.time);
    if (sortMethod === 'cost') return b.cost - a.cost;
    if (sortMethod === 'category') return a.category.localeCompare(b.category);
    return 0;
  });

  const confirmDeleteTrip = () => {
    onDeleteTrip(trip.id);
  };

  // Find center for map
  const mapCenter = trip.activities.find(a => a.coordinates)?.coordinates || { lat: 48.8566, lng: 2.3522 };

  return (
    <div className="animate-fade-in pb-20">
      {/* Header */}
      <div className="relative h-[300px] md:h-[400px] rounded-[2.5rem] overflow-hidden shadow-xl mb-8 group isolate bg-stone-900">
        {!imageError ? (
            <img 
              src={trip.image} 
              alt={trip.destination} 
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
        ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-stone-600 bg-stone-200">
                <ImageOff size={64} className="mb-4 opacity-50" />
                <span className="text-sm font-bold uppercase tracking-wider opacity-60">Image Unavailable</span>
            </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-stone-900/30" />
        
        <div className="absolute top-6 left-6 z-20">
          <button 
            type="button"
            onClick={() => onNavigate('home')}
            className="bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white hover:text-stone-900 transition-all active:scale-95"
          >
            <ArrowLeft size={24} />
          </button>
        </div>

        <div className="absolute top-6 right-6 z-[60]" onClick={(e) => e.stopPropagation()}>
             <button
               type="button"
               onClick={() => setIsDeletingTrip(true)}
               onTouchEnd={() => setIsDeletingTrip(true)}
               className="bg-white/20 backdrop-blur-md text-white hover:bg-red-500 hover:text-white p-3 rounded-full transition-all active:scale-95 flex items-center gap-2 cursor-pointer pointer-events-auto"
               title="Delete Trip"
             >
                 <Trash2 size={20} />
                 <span className="hidden md:inline font-bold text-sm">Delete Trip</span>
             </button>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-8 z-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-sage-200 font-bold mb-2 uppercase tracking-wider text-sm">
                <Calendar size={16} />
                <span>{new Date(trip.startDate).toLocaleDateString(undefined, { dateStyle: 'long' })} — {new Date(trip.endDate).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-extrabold text-white leading-tight">{trip.destination}</h1>
            </div>
            
            <div className="flex gap-4">
               <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                  <span className="block text-xs text-stone-300 uppercase tracking-wider">Total Spent</span>
                  <span className="text-2xl font-bold text-white">${trip.budgetCategories.reduce((acc, c) => acc + c.spent, 0)}</span>
               </div>
               <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                  <span className="block text-xs text-stone-300 uppercase tracking-wider">Budget</span>
                  <span className="text-2xl font-bold text-sage-300">${trip.totalBudget}</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-white rounded-2xl p-1.5 shadow-sm border border-stone-100 mb-8 overflow-x-auto sticky top-20 z-40">
        {[
          { id: 'itinerary', icon: <List size={18} />, label: 'Itinerary' },
          { id: 'map', icon: <MapIcon size={18} />, label: 'Map' },
          { id: 'overview', icon: <PieChart size={18} />, label: 'Budget & Stats' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold transition-all whitespace-nowrap ${
              activeTab === tab.id 
                ? 'bg-stone-800 text-white shadow-md' 
                : 'text-stone-500 hover:bg-stone-100 hover:text-stone-800'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'map' && (
             <div className="animate-fade-in-up" key="map-view">
                <TripMap activities={trip.activities} center={mapCenter} />
             </div>
        )}

        {activeTab === 'overview' && (
          <div className="animate-fade-in-up grid grid-cols-1 md:grid-cols-2 gap-8" key="overview-view">
             <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-stone-100">
               <div className="flex justify-between items-center mb-6">
                 <h3 className="text-2xl font-bold text-stone-800">Budget Breakdown</h3>
                 <button onClick={() => setIsEditingBudget(true)} className="text-stone-400 hover:text-sage-600 p-2 rounded-full hover:bg-stone-50 transition-colors">
                    <Edit2 size={20} />
                 </button>
               </div>
               
               <div className="space-y-6">
                 {trip.budgetCategories.map(cat => {
                   const percentage = Math.min(100, (cat.spent / cat.allocated) * 100);
                   return (
                     <div key={cat.id}>
                       <div className="flex justify-between text-sm font-bold mb-2">
                         <span className="text-stone-600 flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                            {cat.name}
                         </span>
                         <span className="text-stone-800">${cat.spent} / ${cat.allocated}</span>
                       </div>
                       <div className="h-3 bg-stone-100 rounded-full overflow-hidden">
                         <div 
                           className="h-full rounded-full transition-all duration-1000" 
                           style={{ width: `${percentage}%`, backgroundColor: cat.color }}
                         />
                       </div>
                     </div>
                   );
                 })}
               </div>
             </div>

             <div className="bg-sage-50 p-8 rounded-[2rem] border border-sage-100 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-sage-600 shadow-md mb-4">
                  <DollarSign size={40} />
                </div>
                <h3 className="text-2xl font-bold text-stone-800 mb-2">Remaining Budget</h3>
                <p className="text-5xl font-display font-bold text-sage-600">
                  ${trip.totalBudget - trip.budgetCategories.reduce((acc, c) => acc + c.spent, 0)}
                </p>
                <p className="text-stone-500 mt-2">Available for spontaneity!</p>
             </div>
          </div>
        )}

        {activeTab === 'itinerary' && (
          <div className="animate-fade-in-up space-y-6" key="itinerary-view">
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-stone-100 shadow-sm sticky top-[160px] z-30">
              <div className="flex items-center gap-2 text-sm font-bold text-stone-500">
                <Filter size={16} />
                <span className="hidden sm:inline">Sort by:</span>
                <select 
                  className="bg-stone-50 border-none rounded-lg py-1 px-2 focus:ring-2 focus:ring-sage-200 cursor-pointer text-stone-800"
                  value={sortMethod}
                  onChange={(e) => setSortMethod(e.target.value as any)}
                >
                   <option value="date">Date</option>
                   <option value="time">Time</option>
                   <option value="cost">Cost</option>
                   <option value="category">Category</option>
                </select>
              </div>

              <button 
                onClick={() => { setEditingActivity(null); setIsAddActivityOpen(true); }}
                className="flex items-center gap-2 bg-stone-800 hover:bg-stone-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-stone-200 transition-transform active:scale-95"
              >
                <Plus size={18} />
                <span className="hidden sm:inline">Add Activity</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>

            {sortedActivities.length === 0 ? (
              <div className="text-center py-20 bg-stone-50 rounded-[2rem] border-2 border-dashed border-stone-200">
                <MapPin size={48} className="mx-auto text-stone-300 mb-4" />
                <h3 className="text-xl font-bold text-stone-400">No activities yet</h3>
                <p className="text-stone-400">Start planning your adventure!</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {sortedActivities.map(activity => (
                  <div key={activity.id} className="group bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-all border border-stone-100 flex flex-col md:flex-row md:items-center justify-between gap-4 isolate relative">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-2xl shrink-0 ${
                        activity.category === 'food' ? 'bg-orange-100 text-orange-600' :
                        activity.category === 'adventure' ? 'bg-sage-100 text-sage-600' :
                        activity.category === 'culture' ? 'bg-violet-100 text-violet-600' :
                        activity.category === 'transit' ? 'bg-slate-100 text-slate-600' :
                        'bg-sky-100 text-sky-600'
                      }`}>
                         {activity.category === 'food' ? <Utensils size={24} /> :
                          activity.category === 'adventure' ? <Camera size={24} /> :
                          activity.category === 'culture' ? <Ticket size={24} /> :
                          activity.category === 'transit' ? <Train size={24} /> :
                          <Coffee size={24} />}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                           <span className="font-mono text-sm font-bold text-stone-400 bg-stone-50 px-2 py-0.5 rounded-md border border-stone-100">
                             {activity.time}
                           </span>
                           <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                             {new Date(activity.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                           </span>
                        </div>
                        <h3 className="text-lg font-bold text-stone-800">{activity.name}</h3>
                        <div className="flex items-center gap-1 text-stone-500 text-sm mt-1">
                          <MapPin size={14} />
                          {activity.location}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-4 md:gap-8 mt-2 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-stone-50">
                      <div className="text-right">
                        <span className="block text-xl font-bold text-stone-800">${activity.cost}</span>
                        <span className="text-xs font-bold text-stone-400 uppercase tracking-wider bg-stone-50 px-2 py-1 rounded-full flex items-center gap-1">
                          {activity.category === 'food' && <Utensils size={10} />}
                          {activity.category === 'adventure' && <Camera size={10} />}
                          {activity.category === 'relax' && <Coffee size={10} />}
                          {activity.category === 'culture' && <Ticket size={10} />}
                          {activity.category === 'transit' && <Train size={10} />}
                          {activity.category.charAt(0).toUpperCase() + activity.category.slice(1)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 z-[60]" onClick={(e) => e.stopPropagation()}>
                        <button 
                          type="button"
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setEditingActivity(activity); setIsAddActivityOpen(true); }}
                          className="bg-stone-50 hover:bg-stone-100 text-stone-500 hover:text-stone-800 px-3 py-2 rounded-xl transition-colors font-bold text-sm flex items-center gap-2"
                        >
                          <Edit2 size={16} />
                          <span className="hidden sm:inline">Edit</span>
                        </button>
                        <button 
                          type="button"
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActivityToDelete(activity.id); }}
                          onTouchEnd={(e) => { e.preventDefault(); e.stopPropagation(); setActivityToDelete(activity.id); }}
                          className="bg-white border border-red-100 text-red-500 hover:bg-red-500 hover:text-white px-3 py-2 rounded-xl transition-all font-bold text-sm flex items-center gap-2 shadow-sm cursor-pointer"
                        >
                          <Trash2 size={16} />
                          <span className="hidden sm:inline">Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add/Edit Activity Modal */}
      {isAddActivityOpen && (
        <ActivityModal 
          isOpen={isAddActivityOpen} 
          onClose={() => { setIsAddActivityOpen(false); setEditingActivity(null); }} 
          onSave={handleSaveActivity}
          initialData={editingActivity}
          tripDates={{ start: trip.startDate, end: trip.endDate }}
        />
      )}

      {/* Edit Budget Modal */}
      {isEditingBudget && (
          <BudgetModal
             isOpen={isEditingBudget}
             onClose={() => setIsEditingBudget(false)}
             categories={trip.budgetCategories}
             onSave={handleUpdateBudget}
          />
      )}

      {/* Delete Activity Confirmation */}
      {activityToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-stone-900/50 backdrop-blur-sm" onClick={() => setActivityToDelete(null)} />
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm relative z-10 animate-scale-up p-6 text-center">
             <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
               <AlertTriangle size={32} />
             </div>
             <h3 className="text-xl font-bold text-stone-800 mb-2">Delete Activity?</h3>
             <p className="text-stone-500 mb-6">Are you sure you want to remove this activity from your itinerary?</p>
             <div className="flex gap-3">
               <button onClick={() => setActivityToDelete(null)} className="flex-1 py-3 px-4 rounded-xl font-bold text-stone-600 bg-stone-100 hover:bg-stone-200">Cancel</button>
               <button onClick={handleDeleteActivity} className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-200">Delete</button>
             </div>
          </div>
        </div>
      )}

       {/* Delete Trip Confirmation */}
       {isDeletingTrip && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-stone-900/50 backdrop-blur-sm" onClick={() => setIsDeletingTrip(false)} />
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm relative z-10 animate-scale-up p-6 text-center">
             <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
               <Trash2 size={32} />
             </div>
             <h3 className="text-xl font-bold text-stone-800 mb-2">Delete Entire Trip?</h3>
             <p className="text-stone-500 mb-6">This will permanently delete "{trip.destination}" and all its activities. This cannot be undone.</p>
             <div className="flex gap-3">
               <button onClick={() => setIsDeletingTrip(false)} className="flex-1 py-3 px-4 rounded-xl font-bold text-stone-600 bg-stone-100 hover:bg-stone-200">Keep It</button>
               <button onClick={confirmDeleteTrip} className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-200">Delete Trip</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Activity Modal Component
const ActivityModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  onSave: (activity: Activity) => void;
  initialData?: Activity | null;
  tripDates: { start: string; end: string };
}> = ({ isOpen, onClose, onSave, initialData, tripDates }) => {
  const [formData, setFormData] = useState<Partial<Activity>>(initialData || {
    name: '',
    date: tripDates.start,
    time: '09:00',
    location: '',
    cost: 0,
    category: 'culture'
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-white rounded-[2rem] w-full max-w-lg relative z-10 animate-scale-up flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-stone-100 flex justify-between items-center">
          <h3 className="text-xl font-bold text-stone-800">{initialData ? 'Edit Activity' : 'New Adventure'}</h3>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full text-stone-500"><X size={20} /></button>
        </div>
        
        <div className="p-6 overflow-y-auto space-y-5">
           <div>
             <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Activity Name</label>
             <input 
               type="text" 
               className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 font-bold text-stone-800 focus:outline-none focus:border-sage-400"
               placeholder="e.g. Visit Museum"
               value={formData.name}
               onChange={e => setFormData({...formData, name: e.target.value})}
             />
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Date</label>
                <input 
                  type="date" 
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 font-medium text-stone-800 focus:outline-none focus:border-sage-400"
                  min={tripDates.start}
                  max={tripDates.end}
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Time</label>
                <input 
                  type="time" 
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 font-medium text-stone-800 focus:outline-none focus:border-sage-400"
                  value={formData.time}
                  onChange={e => setFormData({...formData, time: e.target.value})}
                />
              </div>
           </div>

           <div>
             <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Location</label>
             <div className="relative">
                <input 
                  type="text" 
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 pl-10 font-medium text-stone-800 focus:outline-none focus:border-sage-400"
                  placeholder="Where is it?"
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                />
                <MapPin size={18} className="absolute left-3 top-3.5 text-stone-400" />
             </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Cost</label>
                <div className="relative">
                  <span className="absolute left-3 top-3.5 text-stone-500 font-bold">$</span>
                  <input 
                    type="number" 
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 pl-8 font-bold text-stone-800 focus:outline-none focus:border-sage-400"
                    placeholder="0"
                    value={formData.cost}
                    onChange={e => setFormData({...formData, cost: Number(e.target.value)})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Category</label>
                <select 
                   className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 font-medium text-stone-800 focus:outline-none focus:border-sage-400"
                   value={formData.category}
                   onChange={e => setFormData({...formData, category: e.target.value as any})}
                >
                   <option value="culture">Culture</option>
                   <option value="food">Food</option>
                   <option value="adventure">Adventure</option>
                   <option value="relax">Relax</option>
                   <option value="transit">Transit</option>
                </select>
              </div>
           </div>
        </div>

        <div className="p-6 border-t border-stone-100 bg-stone-50 rounded-b-[2rem]">
           <button 
             onClick={() => onSave(formData as Activity)}
             className="w-full bg-stone-800 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-stone-700 transition-all active:scale-95 flex items-center justify-center gap-2"
           >
             <Check size={20} />
             Save Activity
           </button>
        </div>
      </div>
    </div>
  );
};

// Budget Modal
const BudgetModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    categories: BudgetCategory[];
    onSave: (categories: BudgetCategory[]) => void;
}> = ({ isOpen, onClose, categories, onSave }) => {
    const [localCats, setLocalCats] = useState<BudgetCategory[]>(JSON.parse(JSON.stringify(categories)));

    if (!isOpen) return null;

    const handleUpdate = (id: string, field: keyof BudgetCategory, value: any) => {
        setLocalCats(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={onClose} />
            <div className="bg-white rounded-[2rem] w-full max-w-lg relative z-10 animate-scale-up flex flex-col max-h-[90vh]">
                 <div className="p-6 border-b border-stone-100 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-stone-800">Edit Budget</h3>
                    <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full text-stone-500"><X size={20} /></button>
                </div>
                <div className="p-6 overflow-y-auto space-y-4">
                    {localCats.map(cat => (
                        <div key={cat.id} className="flex items-center gap-4 bg-stone-50 p-4 rounded-xl border border-stone-100">
                            <div className="w-4 h-4 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                            <div className="flex-1">
                                <label className="text-xs font-bold text-stone-400 uppercase">Category Name</label>
                                <input 
                                    value={cat.name} 
                                    onChange={(e) => handleUpdate(cat.id, 'name', e.target.value)}
                                    className="w-full bg-transparent font-bold text-stone-800 border-b border-stone-200 focus:border-sage-400 outline-none pb-1"
                                />
                            </div>
                            <div className="w-32">
                                <label className="text-xs font-bold text-stone-400 uppercase">Allocated</label>
                                <div className="relative">
                                    <span className="absolute left-0 top-0 text-stone-500">$</span>
                                    <input 
                                        type="number"
                                        value={cat.allocated}
                                        onChange={(e) => handleUpdate(cat.id, 'allocated', Number(e.target.value))}
                                        className="w-full bg-transparent font-bold text-stone-800 pl-3 border-b border-stone-200 focus:border-sage-400 outline-none pb-1 text-right"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-6 border-t border-stone-100 bg-stone-50 rounded-b-[2rem]">
                    <div className="flex justify-between items-center mb-4 text-sm font-bold text-stone-500">
                        <span>Total Budget</span>
                        <span className="text-xl text-stone-800">${localCats.reduce((a,c) => a + c.allocated, 0)}</span>
                    </div>
                    <button 
                        onClick={() => onSave(localCats)}
                        className="w-full bg-stone-800 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-stone-700 transition-all active:scale-95"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    )
}
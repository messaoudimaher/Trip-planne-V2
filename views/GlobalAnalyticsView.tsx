import React from 'react';
import { Trip, View } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface GlobalAnalyticsViewProps {
  trips: Trip[];
  onNavigate: (view: View) => void;
}

export const GlobalAnalyticsView: React.FC<GlobalAnalyticsViewProps> = ({ trips, onNavigate }) => {
  const totalSpentAllTrips = trips.reduce((acc, t) => acc + t.budgetCategories.reduce((s, c) => s + c.spent, 0), 0);
  const totalTrips = trips.length;
  const avgCost = totalTrips > 0 ? Math.round(totalSpentAllTrips / totalTrips) : 0;

  // Prepare data for bar chart
  const tripCostData = trips.map(t => ({
    name: t.destination.split(',')[0], // City name only
    cost: t.budgetCategories.reduce((s, c) => s + c.spent, 0)
  }));

  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex items-center justify-between">
         <h2 className="text-3xl font-display font-bold text-stone-800">Travel Analytics</h2>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100">
           <p className="text-sm font-medium text-stone-400 uppercase tracking-wider">Total Invested in Memories</p>
           <p className="text-4xl font-display font-bold text-stone-800 mt-2">${totalSpentAllTrips.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100">
           <p className="text-sm font-medium text-stone-400 uppercase tracking-wider">Trips Taken</p>
           <p className="text-4xl font-display font-bold text-stone-800 mt-2">{totalTrips}</p>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100">
           <p className="text-sm font-medium text-stone-400 uppercase tracking-wider">Average Trip Cost</p>
           <p className="text-4xl font-display font-bold text-stone-800 mt-2">${avgCost.toLocaleString()}</p>
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
        <h3 className="text-xl font-bold text-stone-800 mb-6">Cost per Destination</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={tripCostData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#78716c', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#78716c', fontSize: 12 }} prefix="$" />
              <Tooltip 
                cursor={{ fill: '#f5f5f4' }} 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="cost" fill="#d4a373" radius={[8, 8, 0, 0]} barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Heatmap Placeholder (Visual only) */}
      <div className="bg-stone-800 p-8 rounded-3xl shadow-lg text-white relative overflow-hidden">
         <div className="relative z-10 flex justify-between items-end">
           <div>
             <h3 className="text-xl font-bold mb-2">World Footprint</h3>
             <p className="text-stone-400 text-sm max-w-md">You've explored 3 continents so far. Your travel history shows a strong preference for coastal destinations.</p>
           </div>
           <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm transition-colors backdrop-blur-md">View Full Map</button>
         </div>
         {/* Decorative Circles */}
         <div className="absolute top-0 right-0 w-64 h-64 bg-sage-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>
      </div>
    </div>
  );
};
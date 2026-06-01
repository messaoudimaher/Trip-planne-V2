import React, { useState } from 'react';
import { Trip, View } from '../types';
import { Calendar, MapPin, ArrowRight, Clock, Trash2, AlertTriangle, ImageOff, Plus, Globe, TrendingUp, Wallet } from 'lucide-react';

interface HomeViewProps {
  trips: Trip[];
  onNavigate: (view: View, tripId?: string) => void;
  onDeleteTrip: (tripId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ trips, onNavigate, onDeleteTrip }) => {
  const [tripToDelete, setTripToDelete] = useState<string | null>(null);

  const upcomingTrips = trips.filter(t => new Date(t.endDate) >= new Date());
  const pastTrips    = trips.filter(t => new Date(t.endDate) < new Date());

  const totalSpent = trips.reduce((acc, t) => acc + t.budgetCategories.reduce((s, c) => s + c.spent, 0), 0);
  const totalBudget = trips.reduce((acc, t) => acc + t.totalBudget, 0);

  const confirmDelete = () => {
    if (tripToDelete) { onDeleteTrip(tripToDelete); setTripToDelete(null); }
  };

  return (
    <div className="animate-fade-in">

      {/* ── Hero Banner ── */}
      <div className="relative overflow-hidden rounded-[2rem] mb-10 bg-gradient-to-br from-slate-900 via-brand-900 to-violet-900 p-8 md:p-12">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500 rounded-full opacity-10 blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-violet-500 rounded-full opacity-15 blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-amber-400 rounded-full opacity-5 blur-2xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        {/* Floating globe icon */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block opacity-10 animate-float pointer-events-none">
          <Globe size={180} className="text-white" strokeWidth={0.6} />
        </div>

        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse-soft" />
            Your Travel Universe
          </div>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl text-white leading-tight tracking-tight mb-3">
            Where will you go<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-violet-300">next?</span>
          </h1>
          <p className="text-slate-300 text-base md:text-lg mb-8 font-light">
            {trips.length} {trips.length === 1 ? 'trip' : 'trips'} planned &amp; lived. Keep writing your story.
          </p>

          {/* Mini stats */}
          <div className="flex flex-wrap gap-4">
            {[
              { icon: <Globe size={14}/>, label: 'Destinations', value: trips.length },
              { icon: <Wallet size={14}/>, label: 'Total Invested', value: `€${totalSpent.toLocaleString()}` },
              { icon: <TrendingUp size={14}/>, label: 'Budget Planned', value: `€${totalBudget.toLocaleString()}` },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-2.5">
                <div className="text-amber-300">{stat.icon}</div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">{stat.label}</div>
                  <div className="text-white font-display font-bold text-sm">{stat.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Upcoming / Planned Trips ── */}
      <section className="mb-14">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900">Upcoming Adventures</h2>
            <p className="text-slate-500 text-sm mt-1">Your next chapters are waiting.</p>
          </div>
          <span className="text-xs font-bold text-brand-500 bg-brand-50 border border-brand-100 px-3 py-1.5 rounded-full">
            {upcomingTrips.length} planned
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingTrips.map((trip, i) => (
            <TripCard
              key={trip.id}
              trip={trip}
              index={i}
              onClick={() => onNavigate('dashboard', trip.id)}
              onDelete={setTripToDelete}
            />
          ))}

          {/* Add new card */}
          <button
            onClick={() => onNavigate('create')}
            className="group flex flex-col items-center justify-center h-[390px] rounded-[2rem] border-2 border-dashed border-slate-200 hover:border-brand-300 hover:bg-brand-50/50 transition-all duration-300 cursor-pointer relative overflow-hidden"
          >
            <div className="w-16 h-16 rounded-2xl bg-slate-100 group-hover:bg-gradient-to-br group-hover:from-brand-500 group-hover:to-violet-600 flex items-center justify-center text-slate-400 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-brand-500/25 mb-5">
              <Plus size={28} strokeWidth={1.5} />
            </div>
            <span className="font-display font-bold text-base text-slate-500 group-hover:text-slate-700 transition-colors">Plan a New Journey</span>
            <span className="text-xs text-slate-400 mt-1.5">Start from scratch</span>
          </button>
        </div>
      </section>

      {/* ── Past Trips ── */}
      {pastTrips.length > 0 && (
        <section>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="font-display font-bold text-xl text-slate-600 whitespace-nowrap">Travel Journal</h2>
            <div className="h-px bg-gradient-to-r from-slate-200 to-transparent flex-1" />
            <span className="text-xs font-bold text-slate-400 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-full whitespace-nowrap">
              {pastTrips.length} memories
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastTrips.map((trip, i) => (
              <TripCard
                key={trip.id}
                trip={trip}
                index={i}
                onClick={() => onNavigate('dashboard', trip.id)}
                onDelete={setTripToDelete}
                isPast
              />
            ))}
          </div>
        </section>
      )}

      {/* ── Delete Modal ── */}
      {tripToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setTripToDelete(null)} />
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm relative z-10 animate-scale-up p-7 text-center">
            <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm">
              <AlertTriangle size={28} />
            </div>
            <h3 className="font-display text-xl font-bold text-slate-900 mb-2">Delete this trip?</h3>
            <p className="text-slate-500 text-sm mb-7 leading-relaxed">
              All activities and memories will be permanently removed. This can't be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setTripToDelete(null)}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 shadow-lg shadow-rose-200 transition-all active:scale-95"
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

/* ══════════════════════════════════════════
   Trip Card Component
══════════════════════════════════════════ */
const TripCard: React.FC<{
  trip: Trip;
  index: number;
  onClick: () => void;
  onDelete: (id: string) => void;
  isPast?: boolean;
}> = ({ trip, index, onClick, onDelete, isPast }) => {
  const [imageError, setImageError] = useState(false);

  const totalSpent   = trip.budgetCategories.reduce((acc, c) => acc + c.spent, 0);
  const spentPercent = Math.min(100, Math.round((totalSpent / trip.totalBudget) * 100));
  const daysUntil    = Math.ceil((new Date(trip.startDate).getTime() - Date.now()) / 86400000);
  const tripDays     = Math.max(1, Math.ceil((new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / 86400000));

  const statusLabel = isPast ? 'Completed' : daysUntil <= 0 ? 'Happening Now' : `In ${daysUntil} days`;
  const statusColor = isPast
    ? 'bg-slate-700/80 text-slate-200'
    : daysUntil <= 0
    ? 'bg-rose-500/90 text-white'
    : 'bg-brand-600/90 text-white';

  // SVG progress ring
  const radius = 18, stroke = 3;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (spentPercent / 100) * circumference;

  return (
    <div
      style={{ animationDelay: `${index * 60}ms` }}
      className="group relative bg-white rounded-[2rem] shadow-sm hover:shadow-2xl hover:shadow-slate-300/40 transition-all duration-500 overflow-hidden h-[390px] flex flex-col border border-slate-100 isolate animate-fade-in-up"
    >
      {/* Image */}
      <div className="relative h-[58%] overflow-hidden bg-slate-200 flex-shrink-0">
        {!imageError ? (
          <img
            src={trip.image}
            alt={trip.destination}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-200">
            <ImageOff size={30} className="mb-2 opacity-50" />
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Image Unavailable</span>
          </div>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        {/* Destination title over image */}
        <div className="absolute bottom-0 left-0 p-5 w-full z-10 pointer-events-none">
          <h3 className="font-display font-extrabold text-xl md:text-2xl text-white leading-tight drop-shadow-lg">
            {trip.destination}
          </h3>
          <div className="flex items-center gap-2 mt-1.5 text-xs text-white/80 font-medium">
            <Calendar size={12} className="text-amber-300 flex-shrink-0" />
            <span>
              {new Date(trip.startDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
              {' — '}
              {new Date(trip.endDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          </div>
        </div>

        {/* Top badges */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
          {/* Status */}
          <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-sm ${statusColor} ${!isPast && daysUntil <= 0 ? 'animate-pulse-soft' : ''}`}>
            {statusLabel}
          </span>
        </div>
      </div>

      {/* Card bottom */}
      <div className="p-5 flex-1 flex flex-col justify-between bg-white relative z-10 pointer-events-none">
        <div className="flex items-center justify-between">
          {/* Stats pills */}
          <div className="flex gap-2">
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-500">
              <MapPin size={11} className="text-brand-400" />
              {trip.activities.length} stops
            </div>
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-500">
              <Clock size={11} className="text-violet-400" />
              {tripDays}d
            </div>
          </div>

          {/* Budget ring */}
          <div className="flex items-center gap-2">
            <svg width="44" height="44" viewBox="0 0 44 44">
              <circle cx="22" cy="22" r={radius} fill="none" stroke="#e2e8f0" strokeWidth={stroke} />
              <circle
                cx="22" cy="22" r={radius}
                fill="none"
                stroke={spentPercent > 90 ? '#f43f5e' : spentPercent > 60 ? '#f59e0b' : '#6366f1'}
                strokeWidth={stroke}
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                transform="rotate(-90 22 22)"
                style={{ transition: 'stroke-dashoffset 0.6s ease' }}
              />
              <text x="22" y="26" textAnchor="middle" fontSize="8" fontWeight="800" fill="#1e293b">
                {spentPercent}%
              </text>
            </svg>
            <div className="text-right">
              <div className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Budget</div>
              <div className="text-sm font-display font-extrabold text-slate-800">€{trip.totalBudget.toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-50">
          <span className="text-xs text-slate-400 font-medium">
            €{totalSpent.toLocaleString()} spent of €{trip.totalBudget.toLocaleString()}
          </span>
          <div className="flex items-center gap-1 text-xs font-bold text-brand-500">
            <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>

      {/* Full-card click overlay */}
      <div
        onClick={onClick}
        className="absolute inset-0 z-10 cursor-pointer"
        role="button"
        aria-label={`View ${trip.destination}`}
      />

      {/* Action buttons (above click overlay) */}
      <div className="absolute top-4 right-4 z-30 flex gap-2" onClick={e => e.stopPropagation()}>
        <button
          type="button"
          onClick={e => { e.preventDefault(); e.stopPropagation(); onDelete(trip.id); }}
          className="bg-black/30 backdrop-blur-sm text-white/80 hover:bg-rose-500 hover:text-white w-9 h-9 rounded-full transition-all duration-200 cursor-pointer active:scale-95 flex items-center justify-center border border-white/10"
          title="Delete Trip"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
};
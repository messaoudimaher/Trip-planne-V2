import React from 'react';
import { Trip, View } from '../types';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, PieChart, Pie, Cell, Legend
} from 'recharts';
import { Globe, TrendingUp, Wallet, Map } from 'lucide-react';

interface GlobalAnalyticsViewProps {
  trips: Trip[];
  onNavigate: (view: View) => void;
}

const GRADIENT_IDS = ['barGrad0', 'barGrad1', 'barGrad2', 'barGrad3', 'barGrad4'];
const BAR_COLORS   = [
  ['#6366f1', '#8b5cf6'],
  ['#f59e0b', '#f97316'],
  ['#10b981', '#06b6d4'],
  ['#f43f5e', '#e11d48'],
  ['#a78bfa', '#7c3aed'],
];

const PIE_COLORS = ['#6366f1', '#8b5cf6', '#f59e0b', '#10b981', '#f43f5e', '#06b6d4'];

// Custom Tooltip
const CustomBarTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-white/10">
        <p className="text-xs text-slate-400 mb-1 font-semibold uppercase tracking-wider">{label}</p>
        <p className="text-xl font-display font-extrabold text-white">€{payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

export const GlobalAnalyticsView: React.FC<GlobalAnalyticsViewProps> = ({ trips }) => {
  const totalSpent  = trips.reduce((acc, t) => acc + t.budgetCategories.reduce((s, c) => s + c.spent, 0), 0);
  const totalBudget = trips.reduce((acc, t) => acc + t.totalBudget, 0);
  const totalTrips  = trips.length;
  const avgCost     = totalTrips > 0 ? Math.round(totalSpent / totalTrips) : 0;

  const barData = trips.map(t => ({
    name: t.destination.split(',')[0],
    cost: t.budgetCategories.reduce((s, c) => s + c.spent, 0),
  }));

  // Aggregate spending by category label across all trips
  const categoryMap: Record<string, number> = {};
  trips.forEach(t => {
    t.budgetCategories.forEach(c => {
      const key = c.name.split(' ').slice(0, 2).join(' ');
      categoryMap[key] = (categoryMap[key] || 0) + c.spent;
    });
  });
  const pieData = Object.entries(categoryMap)
    .filter(([, v]) => v > 0)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  const kpis = [
    {
      icon: <Wallet size={20} />,
      label: 'Total Invested',
      value: `€${totalSpent.toLocaleString()}`,
      sub: `of €${totalBudget.toLocaleString()} planned`,
      gradient: 'from-brand-500 to-violet-600',
      glow: 'shadow-brand-500/30',
    },
    {
      icon: <Globe size={20} />,
      label: 'Trips Taken',
      value: totalTrips.toString(),
      sub: `across ${new Set(trips.map(t => t.destination.split(',')[1]?.trim())).size} countries`,
      gradient: 'from-violet-500 to-pink-500',
      glow: 'shadow-violet-500/30',
    },
    {
      icon: <TrendingUp size={20} />,
      label: 'Avg. Trip Cost',
      value: `€${avgCost.toLocaleString()}`,
      sub: 'per trip on average',
      gradient: 'from-amber-400 to-orange-500',
      glow: 'shadow-amber-400/30',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">

      {/* Page header */}
      <div>
        <h2 className="font-display font-extrabold text-3xl text-slate-900 tracking-tight">Travel Analytics</h2>
        <p className="text-slate-500 mt-1 text-sm">A snapshot of your journey portfolio.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {kpis.map((kpi, i) => (
          <div
            key={i}
            className={`relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br ${kpi.gradient} shadow-xl ${kpi.glow} text-white animate-fade-in-up`}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="relative z-10">
              <div className="bg-white/20 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                {kpi.icon}
              </div>
              <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">{kpi.label}</p>
              <p className="font-display font-extrabold text-4xl text-white">{kpi.value}</p>
              <p className="text-white/60 text-xs mt-1">{kpi.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Bar Chart — 2/3 width */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-7 shadow-sm border border-slate-100">
          <h3 className="font-display font-bold text-lg text-slate-900 mb-1">Cost per Destination</h3>
          <p className="text-slate-400 text-xs mb-6">Total amount spent per trip</p>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                <defs>
                  {BAR_COLORS.map(([c1, c2], i) => (
                    <linearGradient key={i} id={GRADIENT_IDS[i]} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={c1} />
                      <stop offset="100%" stopColor={c2} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="4 0" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={v => `€${v}`} />
                <Tooltip content={<CustomBarTooltip />} cursor={{ fill: '#f8fafc', radius: 8 }} />
                <Bar dataKey="cost" radius={[10, 10, 0, 0]} barSize={44}>
                  {barData.map((_, index) => (
                    <Cell key={index} fill={`url(#${GRADIENT_IDS[index % GRADIENT_IDS.length]})`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart — 1/3 width */}
        <div className="bg-white rounded-3xl p-7 shadow-sm border border-slate-100">
          <h3 className="font-display font-bold text-lg text-slate-900 mb-1">Spending Mix</h3>
          <p className="text-slate-400 text-xs mb-4">By category across all trips</p>
          {pieData.length > 0 ? (
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="45%"
                    innerRadius={52}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((_, index) => (
                      <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    formatter={(value) => (
                      <span style={{ color: '#64748b', fontSize: 11, fontWeight: 600 }}>{value}</span>
                    )}
                  />
                  <Tooltip
                    formatter={(value: number) => [`€${value.toLocaleString()}`, '']}
                    contentStyle={{ borderRadius: 16, border: 'none', boxShadow: '0 20px 60px rgba(0,0,0,0.15)', background: '#0f172a', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                    labelStyle={{ color: '#94a3b8' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-72 flex items-center justify-center text-slate-300 text-sm">No spending data yet</div>
          )}
        </div>
      </div>

      {/* World Footprint Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-brand-900 p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500 rounded-full opacity-10 blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500 rounded-full opacity-10 blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/3" />

        {/* Animated globe decoration */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-10 animate-spin-slow pointer-events-none hidden lg:block">
          <Map size={160} strokeWidth={0.5} />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-lg">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 border border-white/10">
              <Globe size={11} /> World Footprint
            </div>
            <h3 className="font-display font-extrabold text-2xl mb-2">Your adventures span the globe.</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              You've explored {totalTrips} destinations so far. Every trip is a page in your story — keep writing.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <div className="text-center bg-white/10 border border-white/10 rounded-2xl px-5 py-4 backdrop-blur-sm">
              <p className="font-display font-extrabold text-3xl text-white">{totalTrips}</p>
              <p className="text-xs text-slate-400 mt-1 font-semibold uppercase tracking-wider">Trips</p>
            </div>
            <div className="text-center bg-white/10 border border-white/10 rounded-2xl px-5 py-4 backdrop-blur-sm">
              <p className="font-display font-extrabold text-3xl text-amber-300">€{totalSpent.toLocaleString()}</p>
              <p className="text-xs text-slate-400 mt-1 font-semibold uppercase tracking-wider">Invested</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
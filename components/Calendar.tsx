import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  startDate?: string;
  endDate?: string;
  onChange: (start: string, end: string) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ startDate, endDate, onChange }) => {
  // Helper to safely parse YYYY-MM-DD to local Date
  const parseDate = (dateStr?: string) => {
    if (!dateStr) return new Date();
    const [y, m, d] = dateStr.split('-').map(Number);
    return new Date(y, m - 1, d);
  };

  const [currentDate, setCurrentDate] = useState(() => parseDate(startDate));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 = Sunday

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const formatDate = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const handleDayClick = (day: number) => {
    const clickedDate = new Date(year, month, day);
    const dateStr = formatDate(clickedDate);

    if (!startDate || (startDate && endDate)) {
      // Start new range
      onChange(dateStr, '');
    } else {
      // Complete range logic
      const start = parseDate(startDate);
      const current = parseDate(dateStr);
      
      if (current < start) {
        // New start date if clicked before current start
        onChange(dateStr, '');
      } else {
        // Set end date
        onChange(startDate, dateStr);
      }
    }
  };

  const isSelected = (day: number) => {
    if (!startDate) return false;
    const current = new Date(year, month, day).getTime();
    const start = parseDate(startDate).getTime();
    const end = endDate ? parseDate(endDate).getTime() : null;
    return current === start || current === end;
  };

  const isInRange = (day: number) => {
    if (!startDate || !endDate) return false;
    const current = new Date(year, month, day).getTime();
    const start = parseDate(startDate).getTime();
    const end = parseDate(endDate).getTime();
    return current > start && current < end;
  };

  const isStart = (day: number) => {
      if (!startDate) return false;
      const current = new Date(year, month, day).getTime();
      const start = parseDate(startDate).getTime();
      return current === start;
  };
  
  const isEnd = (day: number) => {
      if (!endDate) return false;
      const current = new Date(year, month, day).getTime();
      const end = parseDate(endDate).getTime();
      return current === end;
  };

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="w-full select-none bg-white">
      <div className="flex items-center justify-between mb-6 px-2">
        <button onClick={handlePrevMonth} className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-500">
          <ChevronLeft size={20} />
        </button>
        <span className="text-lg font-bold text-stone-800 font-display">
          {monthNames[month]} {year}
        </span>
        <button onClick={handleNextMonth} className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-500">
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-3 px-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
          <div key={d} className="h-8 flex items-center justify-center text-xs font-bold text-stone-400 uppercase tracking-wider">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-2 px-2 pb-2">
        {blanks.map((_, i) => <div key={`blank-${i}`} />)}
        {days.map(day => {
          const selected = isSelected(day);
          const inRange = isInRange(day);
          const start = isStart(day);
          const end = isEnd(day);

          return (
             <div key={day} className="relative h-10 flex items-center justify-center">
                 {/* Range connection background */}
                 {(inRange || (start && endDate) || (end && startDate)) && (
                    <div 
                      className={`absolute inset-y-0 bg-sage-100 z-0
                        ${start ? 'left-1/2 right-0' : ''} 
                        ${end ? 'left-0 right-1/2' : ''} 
                        ${inRange ? 'left-0 right-0' : ''}
                      `} 
                    />
                 )}

                 <button
                    onClick={() => handleDayClick(day)}
                    className={`relative w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium transition-all z-10 
                      ${selected ? 'bg-stone-800 text-white shadow-lg scale-105' : 'text-stone-700 hover:bg-stone-100'}
                      ${inRange && !selected ? 'hover:bg-sage-200' : ''}
                    `}
                 >
                    {day}
                 </button>
             </div>
          );
        })}
      </div>
    </div>
  );
};
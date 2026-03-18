import React, { useState } from 'react';
import { X } from 'lucide-react';
import styles from '../styles/StudioCalendar.module.css';

const BOOKED_DATES = ['2026-03-15', '2026-03-20', '2026-03-22'];

const StudioCalendar = ({ isOpen, onClose, selectedDate, onSelect }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);

  if (!isOpen) return null;

  const daysInMonth = 31;
  const startDayOfWeek = 0; // March 1, 2026 is Sunday
  
  const paddingDays = Array.from({ length: startDayOfWeek }, (_, i) => null);
  const actualDays = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const dateStr = `2026-03-${day.toString().padStart(2, '0')}`;
    const isBooked = BOOKED_DATES.includes(dateStr);
    return { day, dateStr, isBooked };
  });

  const allDays = [...paddingDays, ...actualDays];
  const dayLabels = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const handleDateClick = (dateStr) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(dateStr);
      setEndDate(null);
    } else {
      if (new Date(dateStr) < new Date(startDate)) {
        setStartDate(dateStr);
        setEndDate(null);
      } else if (dateStr === startDate) {
        setStartDate(null);
      } else {
        setEndDate(dateStr);
      }
    }
  };

  const handleConfirm = () => {
    if (startDate && endDate) {
      onSelect({ start: startDate, end: endDate }); 
      onClose();
    }
  };

  const isInRange = (dateStr, start, end) => {
    if (!start || !end) return false;
    const current = new Date(dateStr);
    const s = new Date(start);
    const e = new Date(end);
    return current > s && current < e;
  };

  const isGhostRange = (dateStr) => {
    if (startDate && !endDate && hoverDate) {
      if (new Date(hoverDate) > new Date(startDate)) {
        return isInRange(dateStr, startDate, hoverDate) || dateStr === hoverDate;
      }
    }
    return false;
  };

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300 ${styles.ryta_calendar_root}`}>
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black tracking-tight text-slate-900 uppercase">Production Window</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">March 2026 • Cebu City</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-slate-50 rounded-2xl transition-all">
            <X size={20} className="text-slate-400" />
          </button>
        </div>
        <div className="p-8">
          <div className={styles.calendar_container}>
            {dayLabels.map(label => (
              <div key={label} className={styles.day_label}>{label}</div>
            ))}
            {allDays.map((dateObj, idx) => {
              if (!dateObj) return <div key={`padding-${idx}`} />;
              
              const { day, dateStr, isBooked } = dateObj;
              const isStart = startDate === dateStr;
              const isEnd = endDate === dateStr;
              const inRange = isInRange(dateStr, startDate, endDate);
              const inGhost = isGhostRange(dateStr);
              
              const isSelected = isStart || isEnd;
              const isMid = inRange || (inGhost && !isEnd && dateStr !== startDate);

              let buttonClass = styles.day_button;
              if (isBooked) buttonClass += ` ${styles.day_booked}`;
              if (isSelected) buttonClass += ` ${styles.selected}`;
              if (isMid) buttonClass += ` ${styles.range_mid}`;
              
              // Handle bridge connections
              if (isStart && (endDate || (hoverDate && new Date(hoverDate) > new Date(startDate)))) {
                buttonClass += ` ${styles.range_start}`;
              }
              if (isEnd || (hoverDate === dateStr && startDate && !endDate && new Date(hoverDate) > new Date(startDate))) {
                buttonClass += ` ${styles.range_end}`;
              }

              return (
                <button 
                  key={dateStr} 
                  disabled={isBooked} 
                  onClick={() => handleDateClick(dateStr)}
                  onMouseEnter={() => setHoverDate(dateStr)}
                  onMouseLeave={() => setHoverDate(null)}
                  className={buttonClass}
                >
                  <span className="relative z-10">{day}</span>
                </button>
              );
            })}
          </div>
          <button 
            onClick={handleConfirm}
            disabled={!startDate || !endDate}
            className={`${styles.confirm_button} ${(startDate && endDate) ? styles.confirm_button_active : styles.confirm_button_disabled}`}
          >
            Confirm Selection
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudioCalendar;

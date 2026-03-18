import React, { useState } from 'react';
import { X } from 'lucide-react';
import styles from '../styles/StudioCalendar.module.css';

const BOOKED_DATES = [
  '2026-03-01', '2026-03-02', '2026-03-03', '2026-03-04', '2026-03-05',
  '2026-03-08', '2026-03-15', '2026-03-22'
];

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

  const formatDateRange = (start, end) => {
    if (!start) return 'Select dates';
    const s = new Date(start);
    const month = s.toLocaleDateString('en-US', { month: 'short' });
    const sDay = s.getDate();
    
    if (!end) return `${month} ${sDay}`;
    
    const e = new Date(end);
    const eDay = e.getDate();
    return `${month} ${sDay} - ${eDay}`;
  };

  const calculateDays = (start, end) => {
    if (!start) return 0;
    if (!end) return 1;
    const s = new Date(start);
    const e = new Date(end);
    const diffTime = Math.abs(e - s);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

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

  const isInRange = (dateStr) => {
    if (!startDate || !endDate) return false;
    const current = new Date(dateStr);
    const s = new Date(startDate);
    const e = new Date(endDate);
    return current > s && current < e;
  };

  const isGhostRange = (dateStr) => {
    if (startDate && !endDate && hoverDate) {
      if (new Date(hoverDate) > new Date(startDate)) {
        const current = new Date(dateStr);
        const s = new Date(startDate);
        const e = new Date(hoverDate);
        return current > s && current <= e;
      }
    }
    return false;
  };

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300 ${styles.ryta_calendar_root}`}>
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />
      <div className={`relative bg-white w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-300 ${styles.modal_container}`}>
        <div className="p-5 pb-3 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-xl font-black tracking-tight text-slate-900 uppercase">Production Window</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">March 2026 • Cebu City</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-slate-50 rounded-2xl transition-all">
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        <div className="px-5 pb-3 shrink-0">
          <div className={styles.summary_container}>
            <div>
              <span className={styles.summary_label}>WHEN</span>
              <div className="flex items-center gap-2">
                <span className={styles.summary_dates}>
                  {formatDateRange(startDate, endDate)}
                </span>
                {startDate && (
                  <button 
                    onClick={() => { setStartDate(null); setEndDate(null); }} 
                    className={styles.reset_button}
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            </div>
            {startDate && (
              <div className={styles.day_badge}>
                {calculateDays(startDate, endDate)} {calculateDays(startDate, endDate) === 1 ? 'Day' : 'Days'}
              </div>
            )}
          </div>
          <div className={styles.divider} />
        </div>
        
        <div className={`p-5 pt-0 flex-1 ${styles.scroll_container}`}>
          <div className={styles.calendar_container}>
            {dayLabels.map(label => (
              <div key={label} className={styles.day_label}>{label}</div>
            ))}
            {allDays.map((dateObj, idx) => {
              if (!dateObj) return <div key={`padding-${idx}`} />;
              
              const { day, dateStr, isBooked } = dateObj;
              const isStart = startDate === dateStr;
              const isEnd = endDate === dateStr;
              const inRange = isInRange(dateStr);
              const inGhost = isGhostRange(dateStr);
              
              let cellClass = styles.day_cell;
              if (inRange || (inGhost && !isStart)) {
                cellClass += ` ${styles.rangeBridge}`;
              }
              if (isStart && (endDate || (hoverDate && new Date(hoverDate) > new Date(startDate)))) {
                cellClass += ` ${styles.rangeStartBridge}`;
              }
              if (isEnd || (hoverDate === dateStr && startDate && !endDate && new Date(hoverDate) > new Date(startDate))) {
                cellClass += ` ${styles.rangeEndBridge}`;
              }

              return (
                <div key={dateStr} className={cellClass}>
                  <button 
                    disabled={isBooked} 
                    onClick={() => handleDateClick(dateStr)}
                    onMouseEnter={() => setHoverDate(dateStr)}
                    onMouseLeave={() => setHoverDate(null)}
                    className={`${styles.day_button} ${isBooked ? styles.day_booked : ''} ${(isStart || isEnd) ? styles.activeDate : ''}`}
                  >
                    <span>{day}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-5 border-t border-slate-50 bg-white shrink-0 sticky bottom-0">
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

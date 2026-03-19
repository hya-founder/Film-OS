import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from '../styles/StudioCalendar.module.css';

const BOOKED_DATES = [
  new Date(2026, 2, 1),
  new Date(2026, 2, 2),
  new Date(2026, 2, 3),
  new Date(2026, 2, 4),
  new Date(2026, 2, 5),
  new Date(2026, 2, 8),
  new Date(2026, 2, 15),
  new Date(2026, 2, 22)
];

const isSameDay = (d1, d2) => {
  if (!d1 || !d2) return false;
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

const StudioCalendar = ({ isOpen, onClose, onSelect }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [viewDate, setViewDate] = useState(new Date(2026, 2, 1)); // March 2026

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => document.body.classList.remove('no-scroll');
  }, [isOpen]);

  if (!isOpen) return null;

  const currentYear = viewDate.getFullYear();
  const currentMonth = viewDate.getMonth();
  
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const startDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
  
  const paddingDays = Array.from({ length: startDayOfWeek }, (_, i) => null);
  const actualDays = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(currentYear, currentMonth, i + 1);
    const isBooked = BOOKED_DATES.some(bookedDate => isSameDay(bookedDate, date));
    return { date, isBooked };
  });

  const allDays = [...paddingDays, ...actualDays];
  const dayLabels = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const handlePrevMonth = () => {
    setViewDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const formatDateRange = (start, end) => {
    if (!start) return 'Select dates';
    const month = start.toLocaleDateString('en-US', { month: 'short' });
    const sDay = start.getDate();
    if (!end || isSameDay(start, end)) return `${month} ${sDay}`;
    const eDay = end.getDate();
    return `${month} ${sDay} - ${eDay}`;
  };

  const calculateDays = (start, end) => {
    if (!start) return 0;
    if (!end || isSameDay(start, end)) return 1;
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const handleDateClick = (date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else {
      if (date < startDate) {
        setStartDate(date);
        setEndDate(null);
      } else if (isSameDay(date, startDate)) {
        setStartDate(null);
        setEndDate(null);
      } else {
        setEndDate(date);
      }
    }
  };

  const handleConfirm = () => {
    if (startDate) {
      const finalEnd = endDate || startDate;
      onSelect({ start: startDate, end: finalEnd }); 
      onClose();
    }
  };

  const isInRange = (date) => {
    if (!startDate || !endDate) return false;
    return date > startDate && date < endDate;
  };

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300 ${styles.ryta_calendar_root}`}>
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />
      <div className={`relative bg-white w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-300 ${styles.modal_container}`}>
        <div className="p-5 pb-3 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-xl font-black tracking-tight text-slate-900 uppercase">Production Window</h2>
            <div className="flex items-center gap-1 mt-1">
              <button 
                onClick={handlePrevMonth} 
                className="p-1 hover:bg-slate-50 rounded-lg transition-colors"
              >
                <ChevronLeft size={16} strokeWidth={3} color="#000000" />
              </button>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest min-w-[120px] text-center">
                {viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} • Cebu City
              </p>
              <button 
                onClick={handleNextMonth} 
                className="p-1 hover:bg-slate-50 rounded-lg transition-colors"
              >
                <ChevronRight size={16} strokeWidth={3} color="#000000" />
              </button>
            </div>
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
            {allDays.map((dayObj, idx) => {
              if (!dayObj) return <div key={`padding-${idx}`} />;
              
              const { date, isBooked } = dayObj;
              const isStart = isSameDay(date, startDate);
              const isEnd = isSameDay(date, endDate);
              const inRange = isInRange(date);
              
              let cellClass = styles.day_cell;
              let buttonClass = `${styles.day} ${isBooked ? styles.day_booked : ''} ${(isStart || isEnd) ? styles.activeCircle : ''}`;
              
              if (inRange) {
                cellClass += ` ${styles.rangeBridge}`;
                buttonClass += ` ${styles.rangeBridge}`;
              }
              if (isStart && endDate) {
                cellClass += ` ${styles.rangeStartBridge}`;
              }
              if (isEnd) {
                cellClass += ` ${styles.rangeEndBridge}`;
              }

              return (
                <div key={date.toISOString()} className={cellClass}>
                  <button 
                    disabled={isBooked} 
                    onClick={() => handleDateClick(date)}
                    className={buttonClass}
                    style={(isStart || isEnd) ? { backgroundColor: '#000', color: '#fff' } : {}}
                  >
                    <span className="relative z-[11]">{date.getDate()}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-5 border-t border-slate-50 bg-white shrink-0 sticky bottom-0">
          <button 
            onClick={handleConfirm}
            disabled={!startDate}
            className={`${styles.confirm_button} ${startDate ? styles.confirm_button_active : styles.confirm_button_disabled}`}
          >
            Confirm Selection
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudioCalendar;

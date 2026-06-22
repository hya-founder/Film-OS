import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

const ControlCenter = () => {
  const columns = [
    {
      title: 'PRE-PRODUCTION',
      color: 'border-l-amber-400',
      tasks: [
        { id: 1, title: 'Location Scouting', dept: 'DIR', done: true },
        { id: 2, title: 'Equipment Rental List', dept: 'CAM', done: true },
        { id: 3, title: 'Cast Wardrobe Fitting', dept: 'PROD', done: false },
      ]
    },
    {
      title: 'PRODUCTION',
      color: 'border-l-blue-500',
      tasks: [
        { id: 4, title: 'Day 1: Principal Photography', dept: 'ALL', done: false },
        { id: 5, title: 'Drone Fly-throughs', dept: 'CAM', done: false },
        { id: 6, title: 'Daily Dailies Backup', dept: 'DIT', done: false },
      ]
    },
    {
      title: 'POST-PRODUCTION',
      color: 'border-l-purple-400',
      tasks: [
        { id: 7, title: 'Assembly Cut (V1)', dept: 'EDIT', done: false },
        { id: 8, title: 'Color Grade - First Pass', dept: 'GRADE', done: false },
        { id: 9, title: 'Sound Design & Mix', dept: 'AUDIO', done: false },
      ]
    }
  ];

  return (
    <div className="flex-1 flex flex-col lg:flex-row bg-slate-50 overflow-y-auto lg:overflow-hidden pb-24 lg:pb-0">
      {columns.map((col, idx) => (
        <section key={idx} className="w-full lg:flex-1 flex flex-col bg-white border-b lg:border-b-0 lg:border-r border-slate-200 last:border-none text-left">
          <header className="p-4 border-b border-slate-100">
            <h2 className="text-[8px] font-black tracking-[0.4em] text-slate-400 uppercase">
              {col.title}
            </h2>
          </header>
          
          <div className="flex-1 overflow-y-auto bg-slate-50/30 py-2">
            {col.tasks.map((task) => (
              <div 
                key={task.id} 
                className={`p-3 m-2 bg-white border border-slate-100 rounded-lg hover:shadow-sm transition-all border-l-2 ${col.color} flex items-start justify-between group cursor-pointer`}
              >
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-mono font-bold text-slate-700 leading-tight">
                    {task.title}
                  </span>
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">
                    {task.dept}
                  </span>
                </div>
                {task.done ? (
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                ) : (
                  <Circle size={14} className="text-slate-200 group-hover:text-slate-300 shrink-0 mt-0.5" />
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default ControlCenter;

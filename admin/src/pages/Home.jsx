import React, { useState, useEffect } from 'react';
import { Cloud, Wind, HardDrive, DollarSign, CheckCircle2, Circle, Clock } from 'lucide-react';

const Home = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date, isUTC = false) => {
    return date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: isUTC ? 'UTC' : undefined,
    });
  };

  const projects = [
    { id: 'PJ-402', title: 'NIKE - THE LAB', lead: 'Director: J. Arnaiz', phase: 'FILMING', timeline: 'MAR 04 - MAR 28' },
    { id: 'PJ-405', title: 'AYALA LAND COMMERCIAL', lead: 'Lead: M. Santos', phase: 'PRE-PRODUCTION', timeline: 'MAR 10 - APR 05' },
    { id: 'PJ-398', title: 'VOGUE - SUMMER 26', lead: 'Director: K. Lee', phase: 'POST-PROD', timeline: 'FEB 20 - MAR 15' },
    { id: 'PJ-410', title: 'RED BULL - SPEED', lead: 'Director: T. Chen', phase: 'PRE-PRODUCTION', timeline: 'APR 01 - APR 12' },
  ];

  return (
    <div className="grid grid-cols-12 gap-4 p-8 bg-slate-50 min-h-screen text-slate-900 font-sans w-full overflow-y-auto">
      
      {/* 2. The "Live Pulse" Header (Span 12) */}
      <header className="col-span-12 h-20 bg-white border border-slate-200 shadow-sm rounded-2xl px-8 flex items-center justify-between relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
        
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 px-4 py-2 bg-red-50 text-red-600 border border-red-100 rounded-full animate-pulse">
            <div className="w-2 h-2 bg-red-600 rounded-full shadow-[0_0_8px_rgba(220,38,38,0.4)]"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">LIVE ON SET</span>
          </div>
          <div className="h-6 w-px bg-slate-200"></div>
          <div className="flex flex-col">
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-400 mb-1">Current Production State</span>
            <span className="text-sm font-black tracking-tight text-slate-900 uppercase">SCENE 42B - THE LAB (INT) | SHOT 4/12</span>
          </div>
        </div>

        <div className="flex items-center gap-10 font-mono text-slate-400">
          <div className="text-right">
            <p className="text-[8px] font-black uppercase tracking-[0.4em] mb-1">UTC TIME</p>
            <p className="text-lg font-mono tracking-tighter">{formatTime(time, true)}</p>
          </div>
          <div className="text-right">
            <p className="text-[8px] font-black uppercase tracking-[0.4em] mb-1">LOCAL (MNL)</p>
            <p className="text-lg font-mono tracking-tighter">{formatTime(time)}</p>
          </div>
        </div>
      </header>

      {/* 3. Core Dashboard Content - Left Column (Span 8) */}
      <section className="col-span-8 flex flex-col gap-4">
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl flex-1 flex flex-col overflow-hidden">
          <header className="p-6 border-b border-slate-200 flex justify-between items-center">
            <h2 className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-400">ONGOING PROJECTS</h2>
            <div className="flex gap-4">
               <span className="text-[8px] font-black uppercase text-blue-600 bg-blue-50 px-2 py-1 rounded">MAR 04, 2026</span>
               <span className="text-[8px] font-black uppercase text-slate-400 border border-slate-200 px-2 py-1 rounded italic underline decoration-blue-500/50">Active Ops: 04</span>
            </div>
          </header>
          
          <div className="p-6 space-y-4">
            {projects.map((proj, idx) => (
              <div key={idx} className="group flex items-center justify-between p-5 bg-white border border-slate-200 rounded-xl hover:border-blue-500/30 transition-all cursor-pointer shadow-sm">
                <div className="flex items-center gap-6">
                  <div className="w-16 text-center py-1 bg-slate-50 rounded text-[10px] font-mono font-bold text-slate-400 border border-slate-200">
                    {proj.id}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900 uppercase tracking-tight">{proj.title}</span>
                    <span className="text-[10px] font-medium text-slate-500 uppercase tracking-widest mt-0.5">{proj.lead}</span>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                   <div className="text-right">
                     <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">TIMELINE</p>
                     <p className="text-[10px] font-bold text-slate-600 font-mono">{proj.timeline}</p>
                   </div>
                   <div className="px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest bg-blue-50 text-blue-700">
                    {proj.phase}
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Right Column (Span 4): Production Vitals */}
      <aside className="col-span-4 flex flex-col gap-4">
        {/* Card 1: WEATHER */}
        <div className="p-6 bg-white border border-slate-200 shadow-sm rounded-2xl relative overflow-hidden">
          <h3 className="text-[8px] font-black tracking-[0.4em] text-slate-400 uppercase mb-6">WEATHER / SAFETY</h3>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Cloud className="text-blue-600" size={32} />
              <div>
                <p className="text-3xl font-semibold text-slate-900 tracking-tighter">28°C</p>
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Partly Cloudy</p>
              </div>
            </div>
            <div className="text-right text-slate-400">
              <div className="flex items-center gap-2 justify-end text-emerald-600 mb-1">
                <Wind size={14} />
                <span className="text-xs font-black">12 KM/H</span>
              </div>
              <p className="text-[8px] font-bold uppercase tracking-widest">WIND SPEED: SAFE</p>
            </div>
          </div>
        </div>

        {/* Card 2: STORAGE */}
        <div className="p-6 bg-white border border-slate-200 shadow-sm rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[8px] font-black tracking-[0.4em] text-slate-400 uppercase">DIGITAL ASSET STORAGE</h3>
            <HardDrive size={14} className="text-slate-300" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <p className="text-2xl font-black text-slate-900 tracking-tighter">1.2<span className="text-xs opacity-40 ml-1">TB</span></p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">/ 10 TB</p>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.2)]" style={{ width: '12%' }}></div>
            </div>
          </div>
        </div>

        {/* Card 3: BURN RATE */}
        <div className="p-6 bg-white border border-slate-200 shadow-sm rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <DollarSign size={80} />
          </div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[8px] font-black tracking-[0.4em] text-slate-400 uppercase">DAILY BURN RATE</h3>
            <span className="text-[8px] font-black px-2 py-0.5 bg-red-50 text-red-600 rounded border border-red-100">CRITICAL</span>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <p className="text-2xl font-black text-slate-900 tracking-tighter">74<span className="text-xs opacity-40 ml-1">%</span></p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">₱85,000 SPENT</p>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.2)]" style={{ width: '74%' }}></div>
            </div>
          </div>
        </div>
      </aside>

    </div>
  );
};

export default Home;

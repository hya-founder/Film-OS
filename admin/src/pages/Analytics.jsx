import React from 'react';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

const Analytics = () => {
  return (
    <div className="flex-1 flex flex-col bg-white p-4 sm:p-6 md:p-12 overflow-y-auto pb-24">
      {/* 1. Metric Cards (Top Row) */}
      <header className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 text-left">
        {/* Total Revenue */}
        <div className="p-6 sm:p-8 bg-slate-50 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 blur-3xl -mr-8 -mt-8"></div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Total Revenue</p>
          <div className="flex items-end justify-between">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">₱1.4M</h2>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-600 rounded-xl text-[10px] font-black uppercase border border-green-100">
              <TrendingUp size={12} /> +12%
            </div>
          </div>
        </div>

        {/* Net Profit */}
        <div className="p-6 sm:p-8 bg-slate-50 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 blur-3xl -mr-8 -mt-8"></div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Net Profit</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">₱900K</h2>
        </div>

        {/* Pending Inquiries */}
        <div className="p-6 sm:p-8 bg-slate-900 rounded-[32px] shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-500/20 transition-all duration-700"></div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Pending Inquiries</p>
          <div className="flex items-center justify-between">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter">1</h2>
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white/50 group-hover:text-white transition-colors">
              <ArrowUpRight size={24} />
            </div>
          </div>
        </div>
      </header>

      {/* 2. Package Performance (Main Card) */}
      <section className="bg-white rounded-[40px] border border-slate-100 p-6 md:p-12 shadow-sm text-left">
        <header className="mb-12">
          <h3 className="text-[12px] font-black uppercase tracking-[0.3em] text-slate-400">PACKAGE PERFORMANCE</h3>
        </header>

        <div className="space-y-12">
          {/* Commercial 4K */}
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm font-black text-slate-900">Commercial 4K</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Video & Production</p>
              </div>
              <p className="text-lg font-black text-slate-900 tracking-tight">₱150,000</p>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-slate-900 rounded-full transition-all duration-1000" style={{ width: '15%' }}></div>
            </div>
          </div>

          {/* Events/Wedding */}
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm font-black text-slate-900">Events/Wedding</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Multi-Cam coverage</p>
              </div>
              <p className="text-lg font-black text-slate-900 tracking-tight">₱600,000</p>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-slate-900 rounded-full transition-all duration-1000" style={{ width: '60%' }}></div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm font-black text-slate-900">Social Media</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Short-form Reels</p>
              </div>
              <p className="text-lg font-black text-slate-900 tracking-tight">₱250,000</p>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-slate-900 rounded-full transition-all duration-1000" style={{ width: '25%' }}></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Analytics;

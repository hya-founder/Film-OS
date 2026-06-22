import React from 'react';
import { Banknote, Users, TrendingDown, Wallet } from 'lucide-react';

const Expenses = () => {
  const payroll = [
    { name: 'Miguel Arnaiz', role: 'Director', rate: '25,000', status: 'PAID' },
    { name: 'Sarah Jenkins', role: 'DP', rate: '18,000', status: 'PENDING' },
    { name: 'Leo Castro', role: 'Gaffer', rate: '12,000', status: 'PAID' },
    { name: 'Tina Wong', role: 'Editor', rate: '15,000', status: 'PENDING' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-slate-50 p-4 sm:p-6 md:p-8 overflow-y-auto pb-24">
      {/* 1. Top Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 text-left">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <p className="text-[8px] font-black tracking-[0.4em] text-slate-400 uppercase mb-4">TOTAL BUDGET</p>
          <h2 className="text-3xl font-black text-slate-900">₱1,200,000</h2>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <p className="text-[8px] font-black tracking-[0.4em] text-slate-400 uppercase mb-4">REAL-TIME BURN</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-3xl font-black text-slate-900">₱450,000</h2>
            <span className="text-[10px] font-bold text-red-500">37.5%</span>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <p className="text-[8px] font-black tracking-[0.4em] text-slate-400 uppercase mb-4">NET MARGIN</p>
          <h2 className="text-3xl font-black text-blue-600">₱750,000</h2>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* 2. Staff Payroll Section */}
        <section className="col-span-12 lg:col-span-7 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden text-left">
          <header className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-[8px] font-black tracking-[0.4em] text-slate-400 uppercase">STAFF PAYROLL</h3>
            <Users size={14} className="text-slate-300" />
          </header>
          <div className="divide-y divide-slate-50">
            {payroll.map((staff, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-900">{staff.name}</span>
                  <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">{staff.role}</span>
                </div>
                <div className="flex items-center gap-8">
                  <span className="text-sm font-mono font-bold text-slate-600">₱{staff.rate}</span>
                  <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                    staff.status === 'PAID' ? 'bg-green-50 text-green-700' : 'bg-slate-50 text-slate-500'
                  }`}>
                    {staff.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Burn Graph Placeholder */}
        <section className="col-span-12 lg:col-span-5 flex flex-col gap-6 text-left">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex-1">
            <h3 className="text-[8px] font-black tracking-[0.4em] text-slate-400 uppercase mb-6">EXPENDITURE FLOW</h3>
            <div className="h-48 bg-slate-50 border border-dashed border-slate-200 rounded-lg flex items-center justify-center">
              <span className="text-[8px] font-black tracking-[0.5em] text-slate-300 uppercase">LIVE BURN VISUALIZATION</span>
            </div>
          </div>
          <div className="bg-slate-900 rounded-xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Wallet size={48} className="text-white" />
            </div>
            <p className="text-[8px] font-black tracking-[0.4em] text-slate-500 uppercase mb-4">QUICK DISBURSE</p>
            <button className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/5 rounded-lg text-[10px] font-black text-white uppercase tracking-widest transition-all">
              Initialize Payout
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Expenses;

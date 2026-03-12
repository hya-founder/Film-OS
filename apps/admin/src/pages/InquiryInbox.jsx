import React, { useState, useMemo } from 'react';
import { 
  Send, 
  MoreHorizontal, 
  FileText, 
  Target, 
  Clock, 
  CreditCard,
  MessageSquare,
  CheckCircle
} from 'lucide-react';

const INITIAL_LEADS = [
  {
    id: 'L-002',
    name: 'Nike PH - Summer Run',
    source: 'TIKTOK',
    status: 'BOOKED & CONFIRMED',
    messages: [
      { sender: 'client', text: 'Hey! Love your high-speed FPV work. Can we book for a 3-day shoot?', time: '10:24 AM' }
    ],
    brief: {
      projectName: 'Nike Summer Run',
      location: 'Manila',
      dateRequest: '2026-03-15',
      duration: '3 Days',
      clientNotes: 'Needs high-speed FPV drone work for the sprint segments.'
    },
    price: 150000
  },
  {
    id: 'L-001',
    name: 'Ayala Land Premier',
    source: 'INSTAGRAM',
    status: 'LEAD',
    messages: [
      { sender: 'client', text: 'Hey! Interested in the Cebu Heights project.', time: 'Yesterday' }
    ],
    brief: {
      projectName: 'ALP - Cebu Heights',
      location: 'Cebu City',
      dateRequest: '2026-04-20',
      duration: '5 Days',
      clientNotes: 'Focus on lifestyle drone footage.'
    },
    price: 899000
  }
];

const SourceTag = ({ source }) => (
  <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase text-white ${
    source === 'TIKTOK' ? 'bg-pink-500' :
    source === 'INSTAGRAM' ? 'bg-purple-500' :
    'bg-indigo-500'
  }`}>
    {source}
  </span>
);

const InquiryInbox = () => {
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [activeLeadId, setActiveLeadId] = useState('L-002');
  const [activeTab, setActiveTab] = useState('brief');
  const [replyText, setReplyText] = useState('');
  
  // Quote State
  const [quoteAmount, setQuoteAmount] = useState('');
  const [downpaymentPercent, setDownpaymentPercent] = useState(50);
  const [isQuoteSent, setIsQuoteSent] = useState(false);
  
  const activeLead = useMemo(() => leads.find(l => l.id === activeLeadId), [leads, activeLeadId]);

  // Reset quote state when changing lead
  React.useEffect(() => {
    setQuoteAmount(activeLead?.price || '');
    setIsQuoteSent(false);
  }, [activeLeadId, activeLead?.price]);

  const handleSendMessage = () => {
    if (!replyText.trim()) return;
    setLeads(prev => prev.map(l => l.id === activeLeadId ? {
      ...l,
      messages: [...l.messages, { sender: 'owner', text: replyText, time: 'Now' }]
    } : l));
    setReplyText('');
  };

  const handleSendQuote = () => {
    if (!quoteAmount) return;
    setIsQuoteSent(true);
    const amountStr = Number(quoteAmount).toLocaleString();
    setLeads(prev => prev.map(l => l.id === activeLeadId ? {
      ...l,
      messages: [...l.messages, { sender: 'system', text: `System: A quote for ₱${amountStr} (${downpaymentPercent}% downpayment) has been sent to the client.`, time: 'Now' }]
    } : l));
  };

  return (
    <div className="flex-1 flex overflow-hidden bg-white">
      
      {/* Column 1: Inquiry Inbox (25%) */}
      <section className="w-1/4 border-r border-slate-200/50 flex flex-col bg-white">
        <header className="p-6 border-b border-slate-200/50">
          <h2 className="text-[7px] font-black tracking-[0.5em] opacity-50 uppercase text-slate-400">INQUIRY INBOX</h2>
        </header>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {leads.map(lead => (
            <div 
              key={lead.id} 
              onClick={() => setActiveLeadId(lead.id)}
              className={`p-5 rounded-[24px] border transition-all cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.02)] ${activeLeadId === lead.id ? 'border-slate-900 bg-white' : 'border-slate-200/50 hover:border-slate-300'}`}
            >
              <div className="flex justify-between items-center mb-3">
                <SourceTag source={lead.source} />
                <span className="text-[8px] font-black uppercase bg-slate-50 text-slate-500 px-2 py-0.5 rounded-full border border-slate-200/50">{lead.status}</span>
              </div>
              <h3 className="text-sm font-black text-slate-900 truncate">{lead.name}</h3>
              <p className="text-xs text-slate-400 truncate mt-1">{lead.messages[lead.messages.length - 1]?.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Column 2: Active Chat (50%) */}
      <main className="w-1/2 flex flex-col bg-white border-r border-slate-200/50">
        {activeLead ? (
          <>
            <header className="h-20 border-b border-slate-200/50 px-8 flex items-center justify-between bg-white/80 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-black uppercase tracking-tight">{activeLead.name}</h2>
                <SourceTag source={activeLead.source} />
              </div>
              <MoreHorizontal className="text-slate-300" />
            </header>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {activeLead.messages.map((m, i) => (
                <div key={i} className={`flex ${m.sender === 'client' ? 'justify-start' : m.sender === 'system' ? 'justify-center' : 'justify-end'}`}>
                  <div className={`max-w-[70%] p-5 rounded-[24px] shadow-[0_1px_2px_rgba(0,0,0,0.02)] ${m.sender === 'client' ? 'bg-slate-50 text-slate-900 border border-slate-200/50' : 'bg-slate-900 text-white shadow-xl'}`}>
                    <p className="text-sm font-medium leading-relaxed">{m.text}</p>
                    <p className={`text-[9px] font-mono tracking-tighter mt-2 uppercase opacity-40`}>{m.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <footer className="p-6 border-t border-slate-200/50 bg-white">
              <div className="bg-slate-50 border border-slate-200/50 rounded-[20px] p-2 flex items-center gap-2">
                <input 
                  type="text" 
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Reply to client..." 
                  className="flex-1 bg-transparent border-none focus:ring-0 text-sm px-4"
                />
                <button 
                  onClick={handleSendMessage}
                  className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center hover:bg-slate-800 transition-all shadow-lg"
                >
                  <Send size={18} />
                </button>
              </div>
            </footer>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-300 font-black uppercase tracking-widest">Select an inquiry to begin</div>
        )}
      </main>

      {/* Column 3: Management Panel (25%) */}
      <aside className="w-1/4 flex flex-col bg-white overflow-y-auto">
        <nav className="flex border-b border-slate-200/50 sticky top-0 bg-white z-10">
          <button 
            onClick={() => setActiveTab('brief')}
            className={`flex-1 py-6 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === 'brief' ? 'border-b-2 border-slate-900 text-slate-900' : 'text-slate-400'}`}
          >
            PROJECT BRIEF
          </button>
          <button 
            onClick={() => setActiveTab('finance')}
            className={`flex-1 py-6 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === 'finance' ? 'border-b-2 border-slate-900 text-slate-900' : 'text-slate-400'}`}
          >
            FINANCE & BOOKING
          </button>
        </nav>

        <div className="p-8">
          {activeTab === 'brief' ? (
            <div className="space-y-10">
              {/* Post-Prod Tracker */}
              <section className="p-6 bg-slate-900 rounded-[24px] text-white shadow-xl border border-white/5">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[7px] font-black tracking-[0.5em] opacity-50 uppercase text-white/70">POST-PROD TRACKER</h3>
                  <span className="text-[10px] font-mono tracking-tighter font-black text-indigo-400">50%</span>
                </div>
                <div className="grid grid-cols-4 gap-2 h-1.5 mb-2">
                  <div className="bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.4)]"></div>
                  <div className="bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.4)]"></div>
                  <div className="bg-white/10 rounded-full"></div>
                  <div className="bg-white/10 rounded-full"></div>
                </div>
              </section>

              {/* Generate Call Sheet */}
              <button className="w-full py-5 bg-white border border-slate-200/50 text-slate-900 rounded-[20px] text-[9px] font-black uppercase tracking-[0.2em] shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex items-center justify-center gap-3 hover:bg-slate-50 transition-all">
                <FileText size={14} /> GENERATE CALL SHEET
              </button>

              {/* Client Details */}
              <section className="space-y-4">
                <h3 className="text-[7px] font-black tracking-[0.5em] opacity-50 uppercase text-slate-400">CLIENT DETAILS</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="p-5 bg-white rounded-[24px] border border-slate-200/50 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                    <div className="flex items-center gap-2 mb-2 text-slate-400">
                      <Target size={12} />
                      <p className="text-[8px] font-black uppercase">Target Date</p>
                    </div>
                    <p className="text-sm font-mono tracking-tighter font-black text-slate-900">2026-03-15</p>
                  </div>
                  <div className="p-5 bg-white rounded-[24px] border border-slate-200/50 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                    <div className="flex items-center gap-2 mb-2 text-slate-400">
                      <Clock size={12} />
                      <p className="text-[8px] font-black uppercase">Duration</p>
                    </div>
                    <p className="text-sm font-mono tracking-tighter font-black text-slate-900">3 Days</p>
                  </div>
                </div>
              </section>

              {/* Client Notes */}
              <section>
                <h3 className="text-[7px] font-black tracking-[0.5em] opacity-50 uppercase text-slate-400 mb-4">CLIENT NOTES</h3>
                <div className="p-6 bg-slate-50 rounded-[24px] border border-slate-200/50 text-sm font-medium italic text-slate-600 leading-relaxed">
                  "{activeLead?.brief.clientNotes}"
                </div>
              </section>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Manual Quote Generator */}
              <section className="p-8 bg-white border border-slate-200 rounded-[32px] shadow-sm relative overflow-hidden">
                <h3 className="text-[7px] font-black tracking-[0.5em] opacity-50 uppercase text-slate-400 mb-8">MANUAL QUOTE GENERATOR</h3>
                
                <div className="space-y-6">
                  {/* Total Investment Input */}
                  <div>
                    <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-2">Total Investment</label>
                    <div className="flex items-center gap-2 border-b-2 border-slate-100 focus-within:border-slate-900 transition-colors pb-2">
                      <span className="text-xl font-mono font-bold text-slate-300">₱</span>
                      <input 
                        type="number" 
                        value={quoteAmount}
                        onChange={(e) => setQuoteAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full text-3xl font-mono font-black text-slate-900 bg-transparent border-none focus:ring-0 p-0"
                      />
                    </div>
                  </div>

                  {/* Downpayment Slider */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Downpayment (%)</label>
                      <span className="text-sm font-mono font-black text-slate-900">{downpaymentPercent}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="100" 
                      step="5"
                      value={downpaymentPercent}
                      onChange={(e) => setDownpaymentPercent(e.target.value)}
                      className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-900"
                    />
                    <div className="flex justify-between mt-2 text-[8px] font-bold text-slate-300 uppercase">
                      <span>10%</span>
                      <span>100%</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button 
                    onClick={handleSendQuote}
                    disabled={isQuoteSent || !quoteAmount}
                    className={`w-full py-5 rounded-2xl flex items-center justify-center gap-3 transition-all duration-500 shadow-xl ${
                      isQuoteSent 
                      ? 'bg-emerald-600 text-white scale-[0.98]' 
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                  >
                    {isQuoteSent ? (
                      <>
                        <span className="text-[7px] font-black tracking-[0.5em] uppercase">QUOTE DISPATCHED</span>
                        <CheckCircle size={16} />
                      </>
                    ) : (
                      <>
                        <span className="text-[7px] font-black tracking-[0.5em] uppercase">SEND PAYMENT QUOTE</span>
                        <CreditCard size={16} />
                      </>
                    )}
                  </button>
                </div>
              </section>

              {/* Summary Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest mb-1">Downpayment</p>
                  <p className="text-sm font-mono font-black text-slate-900">₱{((Number(quoteAmount) * downpaymentPercent) / 100).toLocaleString()}</p>
                </div>
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest mb-1">Remaining</p>
                  <p className="text-sm font-mono font-black text-slate-900">₱{((Number(quoteAmount) * (100 - downpaymentPercent)) / 100).toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>

    </div>
  );
};

export default InquiryInbox;

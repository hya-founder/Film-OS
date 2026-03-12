import React, { useState, useMemo, useEffect } from 'react';
import { 
  Zap, Box, BarChart3, Home as HomeIcon, Send, MoreHorizontal, 
  ChevronRight, Image, MapPin, Calendar, Clock, 
  Check, CreditCard, X, Edit3, Target,
  MessageSquare,
  Plus, Instagram, FileText, Receipt, ClipboardList, ArrowLeft,
  Megaphone
} from 'lucide-react';
import Inventory from './pages/Inventory';
import Analytics from './pages/Analytics';
import Home from './pages/Home';
import ControlCenter from './pages/ControlCenter';
import Expenses from './pages/Expenses';
import CommunicationHub from './pages/CommunicationHub';
import InquiryInbox from './pages/InquiryInbox';

// --- INITIAL MOCK DATA ---
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

const App = () => {
  const [view, setView] = useState('HOME'); 
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [activeLeadId, setActiveLeadId] = useState('L-002');
  const [activeTab, setActiveTab] = useState('brief');
  const [replyText, setReplyText] = useState('');
  
  const activeLead = useMemo(() => leads.find(l => l.id === activeLeadId), [leads, activeLeadId]);

  const handleSendMessage = () => {
    if (!replyText.trim()) return;
    setLeads(prev => prev.map(l => l.id === activeLeadId ? {
      ...l,
      messages: [...l.messages, { sender: 'owner', text: replyText, time: 'Now' }]
    } : l));
    setReplyText('');
  };

  return (
    <div className="flex h-screen w-full bg-[#fcfcfd] overflow-hidden text-slate-900 selection:bg-slate-900/10 font-inter">
      {/* Sidebar Navigation - Studio White Refactor */}
      <aside className="w-20 flex flex-col items-center py-8 bg-white/70 backdrop-blur-xl border-r border-slate-100 shrink-0 z-20">
        <button 
          onClick={() => window.location.href = 'http://localhost:3001'}
          title="Back to Client Side"
          className="bg-white border border-slate-100 rounded-xl p-2 hover:bg-slate-50 transition-all shadow-sm mb-10"
        >
          <ArrowLeft className="text-slate-400 w-4 h-4" />
        </button>

        <nav className="flex-1 flex flex-col gap-6 w-full items-center">
          <button onClick={() => setView('HOME')} className="relative w-full flex justify-center group">
            {view === 'HOME' && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-blue-600 rounded-r-full"></div>}
            <div className={`p-3 transition-all ${view === 'HOME' ? 'bg-blue-50 text-blue-600 rounded-2xl shadow-sm' : 'text-slate-300 hover:text-slate-500'}`}>
              <HomeIcon size={22} />
            </div>
          </button>

          <button onClick={() => setView('DASHBOARD')} className="relative w-full flex justify-center group">
            {view === 'DASHBOARD' && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-blue-600 rounded-r-full"></div>}
            <div className={`p-3 transition-all ${view === 'DASHBOARD' ? 'bg-blue-50 text-blue-600 rounded-2xl shadow-sm' : 'text-slate-300 hover:text-slate-500'}`}>
              <BarChart3 size={22} />
            </div>
          </button>

          <button onClick={() => setView('CRM')} className="relative w-full flex justify-center group">
            {view === 'CRM' && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-blue-600 rounded-r-full"></div>}
            <div className={`p-3 transition-all ${view === 'CRM' ? 'bg-blue-50 text-blue-600 rounded-2xl shadow-sm' : 'text-slate-300 hover:text-slate-500'}`}>
              <MessageSquare size={22} />
            </div>
          </button>

          <button onClick={() => setView('COMM_HUB')} className="relative w-full flex justify-center group">
            {view === 'COMM_HUB' && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-blue-600 rounded-r-full"></div>}
            <div className={`p-3 transition-all ${view === 'COMM_HUB' ? 'bg-blue-50 text-blue-600 rounded-2xl shadow-sm' : 'text-slate-300 hover:text-slate-500'}`}>
              <Megaphone size={22} />
            </div>
          </button>

          <button onClick={() => setView('INVENTORY')} className="relative w-full flex justify-center group">
            {view === 'INVENTORY' && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-blue-600 rounded-r-full"></div>}
            <div className={`p-3 transition-all ${view === 'INVENTORY' ? 'bg-blue-50 text-blue-600 rounded-2xl shadow-sm' : 'text-slate-300 hover:text-slate-500'}`}>
              <Box size={22} />
            </div>
          </button>

          <button onClick={() => setView('EXPENSES')} className="relative w-full flex justify-center group">
            {view === 'EXPENSES' && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-blue-600 rounded-r-full"></div>}
            <div className={`p-3 transition-all ${view === 'EXPENSES' ? 'bg-blue-50 text-blue-600 rounded-2xl shadow-sm' : 'text-slate-300 hover:text-slate-500'}`}>
              <Receipt size={22} />
            </div>
          </button>

          <button onClick={() => setView('CONTROL_CENTER')} className="relative w-full flex justify-center group">
            {view === 'CONTROL_CENTER' && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-blue-600 rounded-r-full"></div>}
            <div className={`p-3 transition-all ${view === 'CONTROL_CENTER' ? 'bg-blue-50 text-blue-600 rounded-2xl shadow-sm' : 'text-slate-300 hover:text-slate-500'}`}>
              <ClipboardList size={22} />
            </div>
          </button>
        </nav>
      </aside>

      <main className="flex-1 h-full overflow-y-auto p-12">
        <div className="max-w-[1400px] mx-auto">
          {view === 'HOME' ? (
            <Home />
          ) : view === 'CRM' ? (
            <InquiryInbox />
          ) : view === 'INVENTORY' ? (
            <Inventory />
          ) : view === 'COMM_HUB' ? (
            <CommunicationHub />
          ) : view === 'DASHBOARD' ? (
            <Analytics />
          ) : view === 'CONTROL_CENTER' ? (
            <ControlCenter />
          ) : view === 'EXPENSES' ? (
            <Expenses />
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-300 font-black uppercase tracking-widest">
              {view} View Offline
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;

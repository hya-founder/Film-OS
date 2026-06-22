import React, { useState, useMemo, useEffect } from 'react';
import { 
  Zap, Box, BarChart3, Home as HomeIcon, Send, MoreHorizontal, 
  ChevronRight, Image, MapPin, Calendar, Clock, 
  Check, CreditCard, X, Edit3, Target,
  MessageSquare,
  Plus, Instagram, FileText, Receipt, ClipboardList, ArrowLeft,
  Megaphone, LifeBuoy, LogOut
} from 'lucide-react';
import Inventory from './pages/Inventory';
import Analytics from './pages/Analytics';
import Home from './pages/Home';
import ControlCenter from './pages/ControlCenter';
import Expenses from './pages/Expenses';
import CommunicationHub from './pages/CommunicationHub';
import InquiryInbox from './pages/InquiryInbox';
import SignIn from './pages/SignIn';

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
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('admin_logged_in') === 'true';
  });
  const [view, setView] = useState('HOME'); 
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [activeLeadId, setActiveLeadId] = useState('L-002');
  const [activeTab, setActiveTab] = useState('brief');
  const [replyText, setReplyText] = useState('');
  
  const activeLead = useMemo(() => leads.find(l => l.id === activeLeadId), [leads, activeLeadId]);

  const handleSignIn = () => {
    setIsLoggedIn(true);
    localStorage.setItem('admin_logged_in', 'true');
  };

  if (!isLoggedIn) {
    return <SignIn onSignIn={handleSignIn} />;
  }

  const handleSendMessage = () => {
    if (!replyText.trim()) return;
    setLeads(prev => prev.map(l => l.id === activeLeadId ? {
      ...l,
      messages: [...l.messages, { sender: 'owner', text: replyText, time: 'Now' }]
    } : l));
    setReplyText('');
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-[#fcfcfd] overflow-hidden text-slate-900 selection:bg-slate-900/10 font-inter">
      {/* Mobile Header / Top Bar */}
      <div className="md:hidden flex items-center justify-between px-6 py-4 bg-white border-b border-slate-100 z-30 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white">
            <Zap size={18} fill="currentColor" />
          </div>
          <span className="text-sm font-black uppercase tracking-wider">FILM OS</span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => window.location.href = 'http://localhost:3001'}
            title="Back to Client Side"
            className="bg-white border border-slate-100 rounded-xl p-2 shadow-sm text-slate-400 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={() => {
              setIsLoggedIn(false);
              localStorage.removeItem('admin_logged_in');
            }}
            title="Sign Out"
            className="bg-red-50 text-red-600 rounded-xl p-2 shadow-sm flex items-center justify-center cursor-pointer"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>

      {/* Sidebar Navigation - Studio White Refactor (Desktop) */}
      <aside className="hidden md:flex w-20 flex-col items-center py-8 bg-white/70 backdrop-blur-xl border-r border-slate-100 shrink-0 z-20">
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

          <button onClick={() => setView('SUPPORT')} className="relative w-full flex justify-center group">
            {view === 'SUPPORT' && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-blue-600 rounded-r-full"></div>}
            <div className={`p-3 transition-all ${view === 'SUPPORT' ? 'bg-blue-50 text-blue-600 rounded-2xl shadow-sm' : 'text-slate-300 hover:text-slate-500'}`}>
              <LifeBuoy size={22} />
            </div>
          </button>
        </nav>
        <button 
          onClick={() => {
            setIsLoggedIn(false);
            localStorage.removeItem('admin_logged_in');
          }}
          title="Sign Out"
          className="mt-auto bg-red-50 hover:bg-red-100 text-red-600 rounded-xl p-3 transition-all shadow-sm flex items-center justify-center cursor-pointer"
        >
          <LogOut size={20} />
        </button>
      </aside>

      <main className="flex-1 h-full overflow-y-auto p-4 sm:p-6 md:p-12 pb-24 md:pb-12">
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
          ) : view === 'SUPPORT' ? (
            <div className="flex-1">
              <div className="mb-12">
                <h1 className="text-4xl font-black tracking-tighter uppercase mb-2">Support Center</h1>
                <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em]">How can we help you today?</p>
              </div>
              <div className="grid grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                    <FileText size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Documentation</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">Learn how to use the Cinema Lab platform effectively.</p>
                </div>
                <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                  <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6">
                    <MessageSquare size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Live Chat</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">Chat with our technical team for immediate assistance.</p>
                </div>
                <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                  <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6">
                    <Send size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Email Support</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">Send us a detailed message about your inquiry.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-300 font-black uppercase tracking-widest">
              {view} View Offline
            </div>
          )}
        </div>
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-slate-100 flex items-center justify-start gap-1 px-4 overflow-x-auto no-scrollbar z-30">
        {[
          { id: 'HOME', label: 'Home', icon: HomeIcon },
          { id: 'DASHBOARD', label: 'Analytics', icon: BarChart3 },
          { id: 'CRM', label: 'CRM', icon: MessageSquare },
          { id: 'COMM_HUB', label: 'Hub', icon: Megaphone },
          { id: 'INVENTORY', label: 'Gear', icon: Box },
          { id: 'EXPENSES', label: 'Cash', icon: Receipt },
          { id: 'CONTROL_CENTER', label: 'Tasks', icon: ClipboardList },
          { id: 'SUPPORT', label: 'Help', icon: LifeBuoy }
        ].map((item) => {
          const Icon = item.icon;
          const isActive = view === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex flex-col items-center justify-center min-w-[64px] h-full transition-all gap-1 ${
                isActive ? 'text-blue-600 font-bold' : 'text-slate-400'
              }`}
            >
              <Icon size={18} />
              <span className="text-[9px] uppercase tracking-wider">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default App;

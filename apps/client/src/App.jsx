import React, { useState, useMemo, useEffect } from 'react';
import { 
  Video, 
  Mail, 
  MessageCircle, 
  Send, 
  FileText, 
  Calendar as CalendarIcon, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  Search,
  ChevronRight,
  User,
  Plus,
  ArrowUpRight,
  Image as ImageIcon,
  Check,
  CreditCard,
  Zap,
  Layout,
  ClipboardList,
  MapPin,
  ShoppingBag,
  X,
  Filter,
  ArrowLeft,
  Camera,
  MapPinned
} from 'lucide-react';

// --- STUDIO PACKAGES DATA ---
const PACKAGES = [
  {
    id: 'PKG-001',
    title: 'Commercial 4K Package',
    details: 'ProRES 422, 10-bit color, 2-camera setup',
    price: 125000,
    availability: 'Available',
    category: 'Commercials',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800',
    stockStatus: 'High Demand'
  },
  {
    id: 'PKG-002',
    title: 'FPV Drone Specialist',
    details: '60fps 4K CineWhoop, 15-min flight sets',
    price: 25000,
    availability: 'Low Stock',
    category: 'Social Media',
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=800',
    stockStatus: 'Low Stock'
  },
  {
    id: 'PKG-003',
    title: 'Music Video Pro',
    details: 'Anamorphic Glass, Stylized Grade, 12hr Day',
    price: 85000,
    availability: 'Available',
    category: 'Social Media',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800',
    stockStatus: 'Trending'
  },
  {
    id: 'PKG-004',
    title: 'Real Estate Walkthrough',
    details: 'Gimbal 4K, HDR Stills, Interior Lighting',
    price: 15000,
    availability: 'Out of Stock',
    category: 'Real Estate',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    stockStatus: 'Booked'
  }
];

const BOOKED_DATES = ['2026-03-15', '2026-03-20', '2026-03-22'];

const BookingCalendar = ({ isOpen, onClose, selectedDate, onSelect }) => {
  if (!isOpen) return null;
  const daysInMonth = 31;
  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const dateStr = `2026-03-${day.toString().padStart(2, '0')}`;
    const isBooked = BOOKED_DATES.includes(dateStr);
    return { day, dateStr, isBooked };
  });
  const dayLabels = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
          <div><h2 className="text-xl font-black tracking-tight text-slate-900 uppercase">Studio Calendar</h2><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">March 2026 • Cebu City</p></div>
          <button onClick={onClose} className="p-3 hover:bg-slate-50 rounded-2xl transition-all"><X size={20} className="text-slate-400" /></button>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-7 gap-1 mb-4">
            {dayLabels.map(label => (<div key={label} className="text-[9px] font-black text-slate-300 text-center pb-2">{label}</div>))}
            {days.map(({ day, dateStr, isBooked }) => {
              const isSelected = selectedDate === dateStr;
              return (<button key={dateStr} disabled={isBooked} onClick={() => { onSelect(dateStr); onClose(); }} className={`h-12 rounded-xl text-xs font-black transition-all flex flex-col items-center justify-center relative ${isBooked ? 'text-slate-200 cursor-not-allowed' : 'hover:bg-slate-50 text-slate-900'} ${isSelected ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : ''}`}><span className={isBooked ? 'line-through decoration-slate-300 decoration-2' : ''}>{day}</span></button>);
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const BookingDetailsForm = ({ onBack, onSubmit }) => {
  const [formData, setFormData] = useState({ venueAddress: '', shootDates: '', techRequirements: '', onsetContact: '' });
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <nav className="p-8 border-b border-slate-100 flex items-center gap-6">
        <button onClick={onBack} className="p-3 hover:bg-slate-50 rounded-2xl transition-all text-slate-400 hover:text-slate-900"><ArrowLeft size={20} /></button>
        <h1 className="text-xl font-black tracking-tight uppercase">Booking Details</h1>
      </nav>
      <main className="max-w-2xl mx-auto py-20 px-8">
        <div className="mb-12"><h2 className="text-4xl font-black tracking-tighter mb-4 uppercase">Production Briefing.</h2><p className="text-slate-500 font-medium uppercase text-xs tracking-widest">Submit logistical details for your upcoming shoot.</p></div>
        <div className="space-y-10">
          <section className="bg-slate-900 rounded-[32px] p-10 text-white shadow-2xl">
            <div className="space-y-8">
              <div><label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4 block">Venue Address</label><div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4"><MapPinned className="text-indigo-400" size={20} /><input type="text" placeholder="Full location or studio address..." className="bg-transparent border-none w-full text-sm font-bold focus:ring-0 p-0 placeholder:text-white/10" onChange={(e) => setFormData({...formData, venueAddress: e.target.value})} /></div></div>
              <div className="grid grid-cols-2 gap-6">
                <div><label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4 block">Shoot Dates</label><div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4"><CalendarIcon className="text-indigo-400" size={20} /><input type="text" placeholder="e.g. March 15-17" className="bg-transparent border-none w-full text-sm font-bold focus:ring-0 p-0 placeholder:text-white/10" onChange={(e) => setFormData({...formData, shootDates: e.target.value})} /></div></div>
                <div><label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4 block">On-Set Contact</label><div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4"><User className="text-indigo-400" size={20} /><input type="text" placeholder="Name & WhatsApp..." className="bg-transparent border-none w-full text-sm font-bold focus:ring-0 p-0 placeholder:text-white/10" onChange={(e) => setFormData({...formData, onsetContact: e.target.value})} /></div></div>
              </div>
              <div><label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4 block">Technical Requirements</label><div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-start gap-4"><Camera className="text-indigo-400 mt-1" size={20} /><textarea placeholder="List specific gear, lighting styles, or frame rate requirements..." className="bg-transparent border-none w-full text-sm font-bold focus:ring-0 p-0 placeholder:text-white/10 min-h-[120px] resize-none" onChange={(e) => setFormData({...formData, techRequirements: e.target.value})} /></div></div>
            </div>
          </section>
          <button onClick={() => onSubmit(formData)} className="w-full py-6 bg-slate-900 text-white rounded-3xl font-black text-lg hover:bg-slate-800 transition-all shadow-2xl flex items-center justify-center gap-3 uppercase tracking-widest">Submit Production Details <Zap size={20} fill="currentColor" /></button>
        </div>
      </main>
    </div>
  );
};

const App = () => {
  const [currentPage, setCurrentPage] = useState('storefront');
  const [selectedCategory, setSelectedCategory] = useState('All Packages');
  const [activePackage, setActivePackage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);

  const filteredPackages = useMemo(() => {
    return (PACKAGES || []).filter(pkg => {
      const matchesCategory = selectedCategory === 'All Packages' || pkg.category === selectedCategory;
      const matchesSearch = pkg.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleAdminRedirect = () => {
    const isAdminDev = window.location.hostname === 'localhost';
    window.location.href = isAdminDev ? 'http://localhost:3000' : `https://admin.${window.location.hostname}`;
  };

  const handleInitiateBooking = () => {
    if (!selectedDate) {
      setIsCalendarOpen(true);
      return;
    }
    setCurrentPage('booking-details');
  };

  const handleFormSubmit = (data) => {
    console.log("OS_SYNC: Updating Lead Status to INTENT TO BOOK", data);
    setIsBookingSuccess(true);
    setCurrentPage('storefront');
    setActivePackage(null);
  };

  const Footer = () => (
    <footer className="w-full bg-[#050505] border-t border-white/5 mt-32">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-6 space-y-10">
            <h4 className="text-[8px] tracking-[0.5em] text-slate-600 uppercase font-black">Global Partners</h4>
            <div className="grid grid-cols-2 gap-y-12">
              <span className="text-white font-bold italic text-2xl tracking-tighter uppercase leading-none">NIKE PH</span>
              <span className="text-white font-bold italic text-2xl tracking-tighter uppercase leading-none">AYALA LAND</span>
              <span className="text-white font-bold italic text-2xl tracking-tighter uppercase leading-none">VOGUE</span>
              <span className="text-white font-bold italic text-2xl tracking-tighter uppercase leading-none">RED BULL</span>
            </div>
          </div>
          <div className="md:col-span-2 space-y-8">
            <h4 className="text-[8px] tracking-[0.5em] text-slate-600 uppercase font-black">Product</h4>
            <div className="flex flex-col gap-4">
              <a href="#" className="text-[11px] font-mono text-slate-500 hover:text-white transition-colors uppercase">Features</a>
              <a href="#" className="text-[11px] font-mono text-slate-500 hover:text-white transition-colors uppercase">Pricing</a>
            </div>
          </div>
          <div className="md:col-span-2 space-y-8">
            <h4 className="text-[8px] tracking-[0.5em] text-slate-600 uppercase font-black">Company</h4>
            <div className="flex flex-col gap-4">
              <a href="#" className="text-[11px] font-mono text-slate-500 hover:text-white transition-colors uppercase">About</a>
              <a href="#" className="text-[11px] font-mono text-slate-500 hover:text-white transition-colors uppercase">Terms</a>
            </div>
          </div>
          <div className="md:col-span-2 space-y-8">
            <h4 className="text-[8px] tracking-[0.5em] text-slate-600 uppercase font-black">Join The Lab</h4>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="EMAIL" 
                className="w-full bg-transparent border-b border-slate-800 py-2 text-[11px] font-mono text-white outline-none focus:border-white transition-colors placeholder:text-slate-800"
              />
              <ArrowUpRight size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-600 group-hover:text-white transition-colors" />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center text-[8px] tracking-[0.3em] uppercase text-white opacity-40 font-black mt-20 pt-8 border-t border-white/5">
          <span>© 2026 CINEMALAB PH</span>
          <div className="flex items-center gap-8">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:opacity-100 transition-opacity cursor-pointer font-bold">Back to Top</button>
            <span className="opacity-100 text-slate-400 font-bold">POWERED BY RYTA OS</span>
          </div>
        </div>
      </div>
    </footer>
  );

  if (currentPage === 'booking-details') return <BookingDetailsForm onBack={() => setCurrentPage('storefront')} onSubmit={handleFormSubmit} />;

  return (
    <div className="min-h-screen w-full bg-white text-slate-900 selection:bg-slate-900 selection:text-white font-inter">
      <BookingCalendar isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} selectedDate={selectedDate} onSelect={setSelectedDate} />
      
      <header className="px-16 py-8">
        <div className="flex items-center justify-between mb-12">
          {/* Logo */}
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
               <span className="text-[10px] font-black italic">CL.</span>
             </div>
             <h1 className="text-2xl font-black tracking-tighter uppercase">CINEMA LAB.</h1>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-xl mx-auto px-12">
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
              <input 
                type="text" 
                placeholder="Search services..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F8F9FA] border-none rounded-full py-4 px-14 text-sm font-medium focus:ring-2 focus:ring-slate-100 transition-all placeholder:text-slate-400" 
              />
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-8">
            <button onClick={() => setIsCalendarOpen(true)} className="text-slate-900 hover:opacity-60 transition-all">
              <CalendarIcon size={24} strokeWidth={1.5} />
            </button>
            <button onClick={handleAdminRedirect} className="text-slate-900 hover:opacity-60 transition-all">
              <User size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center justify-center gap-12 mt-8 pb-4">
          {['ALL PACKAGES', 'COMMERCIALS', 'EVENTS', 'REAL ESTATE', 'SOCIAL MEDIA'].map(cat => (
            <button 
              key={cat} 
              onClick={() => setSelectedCategory(cat === 'ALL PACKAGES' ? 'All Packages' : cat)} 
              className={`text-[11px] font-black uppercase tracking-[0.3em] transition-all relative pb-2 ${
                (selectedCategory === 'All Packages' && cat === 'ALL PACKAGES') || (selectedCategory.toUpperCase() === cat)
                ? 'text-slate-900' : 'text-slate-400 hover:text-slate-900'
              }`}
            >
              {cat}
              {((selectedCategory === 'All Packages' && cat === 'ALL PACKAGES') || (selectedCategory.toUpperCase() === cat)) && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 rounded-full" />
              )}
            </button>
          ))}
        </nav>
      </header>

      <main className="max-w-[1600px] mx-auto px-16 py-12">
        {isBookingSuccess && (
          <div className="mb-16 p-8 bg-slate-900 rounded-[40px] flex items-center justify-between text-white animate-in slide-in-from-top-4 duration-500 shadow-2xl">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-900">
                <Check size={24} strokeWidth={4} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50">Booking Request Sent</p>
                <p className="text-lg font-bold mt-1 tracking-tight">We've received your brief. Expect a response within 24 hours.</p>
              </div>
            </div>
            <button className="bg-white text-slate-900 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-slate-100 transition-all">Schedule Call</button>
          </div>
        )}

        <div className="grid grid-cols-4 gap-x-8 gap-y-16">
          {filteredPackages.map(pkg => (
            <div key={pkg.id} onClick={() => setActivePackage(pkg)} className="group cursor-pointer">
              <div className="relative aspect-[1.4/1] overflow-hidden rounded-[40px] bg-slate-50 mb-8 border border-slate-100">
                <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-6 right-6 px-4 py-2 rounded-xl bg-white/95 backdrop-blur-sm text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-sm border border-white/20">
                  {pkg.stockStatus}
                </div>
              </div>
              
              <div className="space-y-4 pr-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{pkg.category}</p>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none">{pkg.title}</h3>
                <p className="text-slate-400 text-sm font-medium italic italic">"{pkg.details}"</p>
                
                <div className="flex items-center justify-between pt-6">
                  <p className="text-2xl font-black text-slate-900 tracking-tighter">₱{pkg?.price?.toLocaleString() || '0'}</p>
                  <div className="w-12 h-12 bg-[#F8F9FA] rounded-full flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                    <ChevronRight size={20} strokeWidth={2.5} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
      {activePackage && (
        <>
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]" onClick={() => setActivePackage(null)} />
          <aside className="fixed inset-y-0 right-0 w-full max-w-xl bg-white z-[70] shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 border-l border-slate-100">
            <div className="p-10 border-b border-slate-50 flex items-center justify-between"><h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Service Overview</h2><button onClick={() => setActivePackage(null)} className="p-3 hover:bg-slate-50 rounded-full transition-colors"><X size={24} className="text-slate-400" /></button></div>
            <div className="flex-1 overflow-y-auto p-12 space-y-12">
              <div><div className="flex items-center gap-3 mb-6"><span className="text-[10px] font-black px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg uppercase tracking-widest border border-indigo-100">{activePackage?.category}</span></div><h2 className="text-5xl font-black tracking-tighter text-slate-900 mb-6 uppercase">{activePackage?.title}</h2><p className="text-slate-500 text-lg font-medium leading-relaxed italic">"{activePackage?.details}"</p></div>
              <section className="space-y-10">
                <button onClick={() => setIsCalendarOpen(true)} className={`w-full p-8 rounded-[32px] border transition-all flex items-center justify-between group ${selectedDate ? 'bg-indigo-50 border-indigo-200' : 'bg-slate-50 border-slate-100 hover:border-slate-300'}`}><div className="text-left"><p className="text-[9px] font-black uppercase text-slate-400 mb-2 tracking-widest">Production Date</p><p className={`text-xl font-black ${selectedDate ? 'text-indigo-600' : 'text-slate-900'}`}>{selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'SELECT FROM CALENDAR'}</p></div><ChevronRight className={selectedDate ? 'text-indigo-400' : 'text-slate-300 group-hover:translate-x-1 transition-transform'} /></button>
                <div className="p-10 bg-slate-900 border border-slate-800 rounded-[40px] shadow-2xl text-white"><p className="text-[10px] font-black uppercase opacity-40 mb-4 tracking-widest">Estimated Investment</p><div className="flex items-end justify-between"><p className="text-5xl font-black tracking-tighter text-white">₱{activePackage?.price?.toLocaleString() || '0'}</p><p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Includes LDI</p></div></div>
              </section>
            </div>
            <div className="p-12 border-t border-slate-50 bg-white"><button className={`w-full py-7 rounded-[24px] font-black text-xl transition-all flex items-center justify-center gap-4 uppercase tracking-[0.2em] shadow-2xl ${selectedDate ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/20' : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'}`} onClick={handleInitiateBooking}><Zap size={24} fill="currentColor" /> Initiate Request</button></div>
          </aside>
        </>
      )}
    </div>
  );
};

export default App;

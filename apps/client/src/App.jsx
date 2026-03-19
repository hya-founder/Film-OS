import React, { useState, useMemo, useEffect, useRef } from 'react';
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

import StudioCalendar from './components/StudioCalendar';

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
    stockStatus: 'FEATURED WORK'
  },
  {
    id: 'PKG-002',
    title: 'FPV Drone Specialist',
    details: '60fps 4K CineWhoop, 15-min flight sets',
    price: 25000,
    availability: 'Low Stock',
    category: 'Social Media',
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=800',
    stockStatus: 'NOW BOOKING'
  },
  {
    id: 'PKG-003',
    title: 'Music Video Pro',
    details: 'Anamorphic Glass, Stylized Grade, 12hr Day',
    price: 85000,
    availability: 'Available',
    category: 'Social Media',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800',
    stockStatus: 'DIRECTOR\'S CHOICE'
  },
  {
    id: 'PKG-004',
    title: 'Real Estate Walkthrough',
    details: 'Gimbal 4K, HDR Stills, Interior Lighting',
    price: 15000,
    availability: 'Out of Stock',
    category: 'Portrait Studio',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    stockStatus: 'IN PRODUCTION'
  }
];

const BookingDetailsForm = ({ onBack, onSubmit }) => {
  const [formData, setFormData] = useState({ venueAddress: '', shootDates: '', techRequirements: '', onsetContact: '' });
  return (
    <>
      <nav className="p-8 border-b border-slate-100 flex items-center gap-6 shrink-0">
        <button onClick={onBack} className="p-3 hover:bg-slate-50 rounded-2xl transition-all text-slate-400 hover:text-slate-900"><ArrowLeft size={20} /></button>
        <h1 className="text-xl font-black tracking-tight uppercase">Booking Details</h1>
      </nav>
      <main className="flex-1 max-w-2xl mx-auto py-20 px-8 w-full">
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
    </>
  );
};

const App = () => {
  const [currentPage, setCurrentPage] = useState('storefront');
  const [selectedCategory, setSelectedCategory] = useState('All Packages');
  const [activePackage, setActivePackage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);

  const searchInputRef = useRef(null);

  const filteredPackages = useMemo(() => {
    return (PACKAGES || []).filter(pkg => {
      const matchesCategory = selectedCategory === 'All Packages' || pkg.category === selectedCategory;
      const matchesSearch = pkg.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const calculateDays = (range) => {
    if (!range || !range.start) return 1;
    if (!range.end || (
      range.start.getFullYear() === range.end.getFullYear() &&
      range.start.getMonth() === range.end.getMonth() &&
      range.start.getDate() === range.end.getDate()
    )) return 1;
    const diffTime = Math.abs(range.end.getTime() - range.start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const totalPrice = useMemo(() => {
    if (!activePackage) return 0;
    const days = calculateDays(selectedDate);
    return activePackage.price * days;
  }, [activePackage, selectedDate]);

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

  const formatSelectedDate = (range) => {
    if (!range) return 'Select Date...';
    const { start, end } = range;
    if (!start) return 'Select Date...';
    
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const startStr = start.toLocaleDateString('en-US', options);
    
    if (!end || start.getTime() === end.getTime()) {
      return startStr;
    }
    
    const endStr = end.toLocaleDateString('en-US', options);
    return `${startStr} - ${endStr}`;
  };

  const handleFormSubmit = (data) => {
    console.log("OS_SYNC: Updating Lead Status to INTENT TO BOOK", data);
    setIsBookingSuccess(true);
    setCurrentPage('storefront');
    setActivePackage(null);
  };

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (!isSearchExpanded) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  };

  const Footer = () => (
    <footer className="footer-reveal-container w-full bg-[#050505] border-t border-white/5 mt-10 shrink-0">
      <div className="max-w-[1600px] mx-auto px-16 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-6 space-y-6">
            <h4 className="text-[8px] tracking-[0.5em] text-slate-600 uppercase font-black">Global Partners</h4>
            <div className="grid grid-cols-2 gap-y-8">
              <span className="text-white font-bold italic text-2xl tracking-tighter uppercase leading-none">NIKE PH</span>
              <span className="text-white font-bold italic text-2xl tracking-tighter uppercase leading-none">AYALA LAND</span>
              <span className="text-white font-bold italic text-2xl tracking-tighter uppercase leading-none">VOGUE</span>
              <span className="text-white font-bold italic text-2xl tracking-tighter uppercase leading-none">RED BULL</span>
            </div>
          </div>
          <div className="md:col-span-2 space-y-6">
            <h4 className="text-[8px] tracking-[0.5em] text-slate-600 uppercase font-black">Product</h4>
            <div className="flex flex-col gap-3">
              <a href="#" className="text-[11px] font-mono text-slate-500 hover:text-white transition-colors uppercase">Features</a>
              <a href="#" className="text-[11px] font-mono text-slate-500 hover:text-white transition-colors uppercase">Pricing</a>
            </div>
          </div>
          <div className="md:col-span-2 space-y-6">
            <h4 className="text-[8px] tracking-[0.5em] text-slate-600 uppercase font-black">Company</h4>
            <div className="flex flex-col gap-3">
              <a href="#" className="text-[11px] font-mono text-slate-500 hover:text-white transition-colors uppercase">About</a>
              <a href="#" className="text-[11px] font-mono text-slate-500 hover:text-white transition-colors uppercase">Terms</a>
            </div>
          </div>
          <div className="md:col-span-2 space-y-6">
            <h4 className="text-[8px] tracking-[0.5em] text-slate-600 uppercase font-black">Contact Us</h4>
            <div className="flex flex-col gap-3">
              <a 
                href="https://www.instagram.com/javaphotographyfilms/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[11px] font-mono text-slate-500 hover:text-white transition-colors uppercase flex items-center gap-2"
              >
                Instagram
                <ArrowUpRight size={12} />
              </a>
              <a 
                href="https://www.facebook.com/javaphotographyandfilm" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[11px] font-mono text-slate-500 hover:text-white transition-colors uppercase flex items-center gap-2"
              >
                Facebook
                <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 items-center text-[8px] tracking-[0.3em] uppercase text-white opacity-40 font-black mt-12 pt-6 border-t border-white/5">
          <span className="text-left">© 2026 JAVA PHOTOGRAPHY & FILM</span>
          <div className="flex justify-center">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:opacity-100 transition-opacity cursor-pointer font-bold">Back to Top</button>
          </div>
          <div className="flex justify-end">
            <span className="opacity-100 text-slate-400 font-bold">Powered by ryta</span>
          </div>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="flex flex-col min-h-screen w-full bg-white text-slate-900 selection:bg-slate-900 selection:text-white font-inter">
      <StudioCalendar isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} selectedDate={selectedDate} onSelect={setSelectedDate} />
      
      {currentPage === 'storefront' ? (
        <>
          <header className="px-16 pt-10 pb-6 border-b border-slate-50 bg-white shrink-0">
            <div className="grid grid-cols-3 items-center mb-16">
              {/* Search (Left) */}
              <div className="flex items-center justify-start">
                <div className="flex items-center relative h-8">
                  <button onClick={toggleSearch} className="text-slate-900 z-10 hover:opacity-60 transition-all">
                    <Search size={20} strokeWidth={1.25} />
                  </button>
                  <input 
                    ref={searchInputRef}
                    type="text" 
                    placeholder="SEARCH SERVICES..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onBlur={() => searchQuery === '' && setIsSearchExpanded(false)}
                    className={`absolute left-0 pl-10 bg-transparent border-none border-b border-slate-200 focus:border-slate-900 focus:ring-0 text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 ease-out outline-none
                      ${isSearchExpanded ? 'w-56 opacity-100' : 'w-0 opacity-0 pointer-events-none'}`}
                  />
                </div>
              </div>

              {/* Logo (Center) */}
              <div className="flex items-center justify-center">
                 <h1 className="text-[22px] font-black tracking-tighter uppercase text-center text-slate-900">JAVA PHOTOGRAPHY & FILM</h1>
              </div>

              {/* Icons (Right) */}
              <div className="flex items-center justify-end gap-6">
                <button onClick={() => setIsCalendarOpen(true)} className="text-slate-900 hover:opacity-60 transition-all relative">
                  <CalendarIcon size={20} strokeWidth={1.25} />
                  {selectedDate && <div className="absolute -top-1 -right-1 w-2 h-2 bg-slate-900 rounded-full border-2 border-white" />}
                </button>
                <button onClick={handleAdminRedirect} className="text-slate-900 hover:opacity-60 transition-all">
                  <User size={20} strokeWidth={1.25} />
                </button>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex items-center justify-center gap-10">
              {['ALL PACKAGES', 'COMMERCIALS', 'EVENTS', 'PORTRAIT STUDIO', 'SOCIAL MEDIA'].map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setSelectedCategory(cat === 'ALL PACKAGES' ? 'All Packages' : cat === 'PORTRAIT STUDIO' ? 'Portrait Studio' : cat)} 
                  className={`text-[10px] font-black uppercase tracking-[0.25em] transition-all relative pb-3 ${
                    (selectedCategory === 'All Packages' && cat === 'ALL PACKAGES') || (selectedCategory.toUpperCase() === cat)
                    ? 'text-slate-900' : 'text-slate-400 hover:text-slate-900'
                  }`}
                >

                  {cat}
                  {((selectedCategory === 'All Packages' && cat === 'ALL PACKAGES') || (selectedCategory.toUpperCase() === cat)) && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-900" />
                  )}
                </button>
              ))}
            </nav>
          </header>

          <main className="flex-1 max-w-[1600px] mx-auto px-16 pt-4 pb-4 w-full">
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

            <div className="grid grid-cols-4 gap-x-8 gap-y-12">
              {filteredPackages.map(pkg => (
                <div key={pkg.id} onClick={() => setActivePackage(pkg)} className="group cursor-pointer flex flex-col">
                  <div className="relative aspect-[1.6/1] overflow-hidden rounded-[40px] bg-slate-50 mb-4 border border-slate-100 shrink-0">
                    <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute top-6 right-6 px-4 py-2 rounded-xl bg-white/95 backdrop-blur-sm text-[10px] font-light uppercase tracking-[0.15em] text-slate-900 shadow-sm border border-white/20">
                      {pkg.stockStatus}
                    </div>
                  </div>
                  
                  <div className="flex flex-col flex-1">
                    <div className="space-y-1.5 pr-4">
                      <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">{pkg.category}</p>
                      <h3 className="text-xl font-black text-slate-900 tracking-tight leading-none">{pkg.title}</h3>
                      <p className="text-slate-400 text-sm font-medium italic opacity-80">{pkg.details}</p>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 mt-auto">
                      <p className="text-2xl font-black text-slate-900 tracking-tighter">₱{pkg?.price?.toLocaleString() || '0'}</p>
                      <div className="w-10 h-10 bg-[#F8F9FA] rounded-full flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                        <ChevronRight size={18} strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </>
      ) : (
        <BookingDetailsForm onBack={() => setCurrentPage('storefront')} onSubmit={handleFormSubmit} />
      )}

      <Footer />
      {activePackage && (
        <>
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]" onClick={() => setActivePackage(null)} />
          <aside className="fixed inset-y-0 right-0 w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 border-l border-slate-100">
            <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
              <h2 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Service Overview</h2>
              <button onClick={() => setActivePackage(null)} className="p-2 hover:bg-slate-50 rounded-full transition-colors"><X size={20} className="text-slate-400" /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[8px] font-black px-2 py-0.5 bg-slate-100 text-slate-500 rounded uppercase tracking-widest border border-slate-200">{activePackage?.category}</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4 uppercase">{activePackage?.title}</h2>
                <ul className="space-y-2">
                  <li className="flex items-center gap-3 text-xs font-medium text-slate-500">
                    <div className="w-1 h-1 bg-slate-300 rounded-full" /> 12-hour Production Day
                  </li>
                  <li className="flex items-center gap-3 text-xs font-medium text-slate-500">
                    <div className="w-1 h-1 bg-slate-300 rounded-full" /> Anamorphic Lens Kit
                  </li>
                  <li className="flex items-center gap-3 text-xs font-medium text-slate-500">
                    <div className="w-1 h-1 bg-slate-300 rounded-full" /> Professional Color Grade
                  </li>
                </ul>
              </div>

              <section className="space-y-6">
                <div>
                  <label className="text-[9px] font-black uppercase text-slate-400 mb-2 block tracking-widest">Production Date</label>
                  <button 
                    onClick={() => setIsCalendarOpen(true)} 
                    className={`w-full px-4 py-3 rounded-xl border text-left transition-all flex items-center justify-between group ${selectedDate ? 'bg-white border-slate-900' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}
                  >
                    <span className={`text-sm font-bold ${selectedDate ? 'text-slate-900' : 'text-slate-400'}`}>
                      {formatSelectedDate(selectedDate)}
                    </span>
                    <ChevronRight size={16} className={selectedDate ? 'text-slate-900' : 'text-slate-300'} />
                  </button>
                </div>

                <div className="p-6 bg-slate-900 rounded-2xl shadow-xl text-white">
                  <p className="text-[9px] font-black uppercase opacity-40 mb-2 tracking-widest">Starting Price</p>
                  <div className="flex items-baseline justify-between">
                    <p className="text-3xl font-bold tracking-tighter text-white">₱{totalPrice?.toLocaleString() || '0'}</p>
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">VAT Inclusive</p>
                  </div>
                </div>
              </section>
            </div>

            <div className="p-8 border-t border-slate-50 bg-white">
              <button 
                className={`w-full py-4 rounded-xl font-black text-sm transition-all flex items-center justify-center gap-3 uppercase tracking-widest ${selectedDate ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-slate-100 text-slate-300 cursor-not-allowed'}`} 
                onClick={handleInitiateBooking}
              >
                <Zap size={16} fill="currentColor" /> Initiate Request
              </button>
            </div>
          </aside>
        </>
      )}
    </div>
  );
};

export default App;

import React, { useState } from 'react';
import { Shield, Lock, User, Eye, EyeOff, Zap } from 'lucide-react';

const SignIn = ({ onSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Mock authentication check
    setTimeout(() => {
      if (email === 'admin' && password === 'admin123') {
        onSignIn();
      } else {
        setError('Invalid credentials. Check your username and password.');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white relative overflow-hidden font-sans select-none text-slate-900">
      {/* Subtle minimalist grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000002_1px,transparent_1px),linear-gradient(to_bottom,#00000002_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Core card wrapper */}
      <div className="relative w-full max-w-[440px] mx-4 z-10">
        
        {/* Form Container */}
        <div className="bg-white border border-slate-200/80 rounded-[32px] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-slate-900 text-white rounded-2xl mb-5 shadow-sm">
              <Shield size={24} strokeWidth={1.5} />
            </div>
            <h1 className="text-xl font-black text-slate-900 tracking-tighter uppercase">FILM CONTROL</h1>
            <p className="text-[8px] font-black uppercase text-slate-400 tracking-[0.3em] mt-2">Authorized Personnel Only</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 text-center animate-in fade-in slide-in-from-top-2 duration-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[8px] font-black uppercase text-slate-400 tracking-[0.2em] block">
                Username / Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Enter username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl py-4 pl-11 pr-4 text-xs font-bold uppercase tracking-wider text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:bg-white transition-all duration-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[8px] font-black uppercase text-slate-400 tracking-[0.2em] block">
                  Security Passkey
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Lock size={16} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl py-4 pl-11 pr-11 text-xs font-bold uppercase tracking-wider text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:bg-white transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-900 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-sm flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Establish Access <Zap size={12} fill="currentColor" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

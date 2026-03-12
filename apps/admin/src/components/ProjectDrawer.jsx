import React from 'react';
import { X } from 'lucide-react';

const ProjectDrawer = ({ isOpen, onClose, project }) => {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-sm" onClick={onClose} />
      
      <aside className="fixed inset-y-0 right-0 w-[400px] bg-white/95 backdrop-blur-md border-l border-slate-200/50 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <header className="p-8 border-b border-slate-100/50 flex justify-between items-center text-left">
          <div className="flex flex-col gap-1">
            <h2 className="text-[7px] font-black tracking-[0.5em] text-slate-400 uppercase leading-none">PROJECT EDIT</h2>
            <span className="font-mono text-xs text-slate-500">{project.id}</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
            <X size={18} />
          </button>
        </header>

        {/* Editable Fields */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          <div className="space-y-6">
            {/* PROJECT TITLE */}
            <div className="flex flex-col gap-2 text-left">
              <label className="text-[8px] font-black uppercase tracking-widest text-slate-400">PROJECT TITLE</label>
              <input 
                type="text" 
                defaultValue={project.title}
                className="bg-slate-50 border-b border-transparent focus:border-blue-600 transition-all p-3 text-sm font-bold text-slate-900 outline-none"
              />
            </div>

            {/* DIRECTOR */}
            <div className="flex flex-col gap-2 text-left">
              <label className="text-[8px] font-black uppercase tracking-widest text-slate-400">DIRECTOR / LEAD</label>
              <input 
                type="text" 
                defaultValue={project.lead}
                className="bg-slate-50 border-b border-transparent focus:border-blue-600 transition-all p-3 text-sm font-medium text-slate-600 outline-none"
              />
            </div>

            {/* TIMELINE */}
            <div className="flex flex-col gap-2 text-left">
              <label className="text-[8px] font-black uppercase tracking-widest text-slate-400">TIMELINE</label>
              <input 
                type="text" 
                defaultValue={project.timeline}
                className="bg-slate-50 border-b border-transparent focus:border-blue-600 transition-all p-3 text-sm font-mono text-slate-600 outline-none"
              />
            </div>

            {/* PRODUCTION PHASE */}
            <div className="flex flex-col gap-2 text-left">
              <label className="text-[8px] font-black uppercase tracking-widest text-slate-400">PRODUCTION PHASE</label>
              <select 
                defaultValue={project.phase}
                className="bg-slate-50 border-b border-transparent focus:border-blue-600 transition-all p-3 text-sm font-bold text-slate-900 outline-none appearance-none cursor-pointer"
              >
                <option value="PRE-PRODUCTION">PRE-PRODUCTION</option>
                <option value="FILMING">FILMING</option>
                <option value="POST-PROD">POST-PROD</option>
                <option value="COMPLETED">COMPLETED</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <footer className="p-8 border-t border-slate-100/50 bg-white/50">
          <button className="w-full bg-slate-900 text-white font-bold tracking-[0.2em] text-[10px] py-4 rounded-lg hover:bg-slate-800 transition-all shadow-lg active:scale-[0.98] uppercase">
            SAVE CHANGES
          </button>
          <button 
            onClick={onClose}
            className="w-full text-slate-400 font-bold text-[10px] mt-2 py-2 hover:text-slate-600 transition-colors uppercase tracking-widest"
          >
            CANCEL
          </button>
        </footer>
      </aside>
    </div>
  );
};

export default ProjectDrawer;

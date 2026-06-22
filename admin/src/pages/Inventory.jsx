import React from 'react';
import { Plus } from 'lucide-react';

const Inventory = () => {
  const inventoryData = [
    { id: 1, name: 'RED Komodo 6K', source: 'Owned', status: 'IN USE', assigned: 'Nike PH - Summer Run' },
    { id: 2, name: 'DJI Mavic 3 Pro', source: 'Owned', status: 'AVAILABLE', assigned: '—' },
    { id: 3, name: 'Aputure 600d Pro', source: 'Rented', status: 'IN USE', assigned: 'Ayala Land Premier' },
    { id: 4, name: 'Teradek Bolt 4K', source: 'Owned', status: 'AVAILABLE', assigned: '—' }
  ];

  const StatusBadge = ({ status }) => {
    const styles = {
      'IN USE': 'bg-yellow-50 text-orange-600',
      'AVAILABLE': 'bg-green-50 text-green-700'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${styles[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="flex-1 flex flex-col bg-white p-12 overflow-y-auto">
      {/* 1. Header Section */}
      <header className="flex justify-between items-start mb-12">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Equipment Tracker</h1>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-400 mt-1">LIVE ASSET MANAGEMENT</p>
        </div>
        <button className="px-6 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-slate-800 transition-all shadow-lg">
          <Plus size={16} /> ADD GEAR
        </button>
      </header>

      {/* 2. Asset Table Structure */}
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-50 bg-slate-50/50">
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">ITEM NAME</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">SOURCE</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">STATUS</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">ASSIGNED TO</th>
            </tr>
          </thead>
          <tbody>
            {inventoryData.map((item) => (
              <tr key={item.id} className="border-b border-slate-50 last:border-none hover:bg-slate-50/30 transition-colors">
                <td className="px-8 py-8 font-black text-slate-900 text-sm">
                  {item.name}
                </td>
                <td className="px-8 py-8 text-sm text-slate-600 font-medium">
                  {item.source}
                </td>
                <td className="px-8 py-8">
                  <StatusBadge status={item.status} />
                </td>
                <td className="px-8 py-8">
                  <span className={`text-sm font-medium ${item.assigned !== '—' ? 'italic text-slate-600' : 'text-slate-300'}`}>
                    {item.assigned}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;

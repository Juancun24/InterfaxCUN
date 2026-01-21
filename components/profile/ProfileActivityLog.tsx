
import React, { useState } from 'react';
import { activityEvents } from '../../config/profile.mock';

const ProfileActivityLog: React.FC = () => {
  const [filter, setFilter] = useState('ALL');
  
  const filteredEvents = filter === 'ALL' 
    ? activityEvents 
    : activityEvents.filter(e => e.type === filter);

  return (
    <div className="glass rounded-2xl p-6 border border-white/5 flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-agency text-sm tracking-[0.3em] text-[#9B6BFF]">ACTIVIDAD</h3>
        <div className="flex gap-2">
          {['TODO', 'SEGURO', 'NAVEGACIÓN'].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`text-[8px] font-agency px-2 py-0.5 border rounded transition-all ${filter === f ? 'border-[#9B6BFF] text-[#9B6BFF] bg-[#9B6BFF11]' : 'border-white/10 text-[#9AA4C7]'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
        {filteredEvents.map((event, idx) => (
          <div key={event.id} className="relative pl-6 group">
            {/* Timeline Line */}
            {idx !== filteredEvents.length - 1 && (
              <div className="absolute left-1.5 top-3 w-[1px] h-full bg-white/5"></div>
            )}
            {/* Timeline Node */}
            <div className={`absolute left-0 top-1 w-3 h-3 rounded-full border border-white/20 bg-[#0B0F1A] z-10 ${event.type === 'SECURITY' ? 'border-red-500/50' : 'border-[#9B6BFF55]'}`}>
              <div className={`absolute inset-0.5 rounded-full ${event.type === 'SECURITY' ? 'bg-red-500' : 'bg-[#9B6BFF]'}`}></div>
            </div>

            <div>
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-agency text-[10px] text-white group-hover:text-[#9B6BFF] transition-colors">{event.label}</span>
                <span className="text-[8px] font-agency opacity-30">{event.time}</span>
              </div>
              <p className="text-[9px] font-agency text-[#9AA4C7] uppercase">{event.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileActivityLog;

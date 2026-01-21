
import React, { useState, useRef } from 'react';
import { useProfileStore } from '../../hooks/useProfileStore';

const ProfileHeader: React.FC = () => {
  const { user, updateProfile } = useProfileStore();
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({ 
    name: user.name, 
    role: user.role, 
    avatar: user.avatar 
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    updateProfile(tempData);
    setIsEditing(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempData(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="glass rounded-2xl p-6 border border-[#9B6BFF33] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#9B6BFF]"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#9B6BFF]"></div>
      
      <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
        <div className="relative group">
          {/* Avatar con soporte de cambio de imagen en modo edición */}
          <div 
            className={`w-36 h-36 rounded-full border-4 border-[#9B6BFF] p-1 shadow-[0_0_20px_#9B6BFF66] overflow-hidden relative transition-all duration-300 ${isEditing ? 'cursor-pointer hover:border-white ring-4 ring-[#9B6BFF22]' : ''}`}
            onClick={triggerFileInput}
          >
            <img 
              src={isEditing ? tempData.avatar : user.avatar} 
              alt="Avatar" 
              className={`w-full h-full rounded-full object-cover transition-all duration-700 ${!isEditing ? 'grayscale hover:grayscale-0' : ''}`}
            />
            {isEditing && (
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1 text-white">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                  <circle cx="12" cy="13" r="4"></circle>
                </svg>
                <span className="font-agency text-[8px] text-white tracking-[0.2em]">SUBIR</span>
              </div>
            )}
          </div>
          
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleAvatarChange} 
          />

          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#9B6BFF] text-black text-[9px] font-agency px-2 py-0.5 rounded shadow-[0_0_10px_#9B6BFF]">
            NIVEL_{user.accessLevel}
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          {isEditing ? (
            <div className="space-y-4 max-w-sm">
              <div className="flex flex-col gap-1">
                <label className="font-agency text-[8px] text-[#9B6BFF] opacity-60">COMANDO_OPERATIVO</label>
                <input 
                  className="w-full bg-white/5 border border-[#9B6BFF] rounded px-3 py-2 font-agency text-xl text-white outline-none focus:bg-[#9B6BFF11]"
                  value={tempData.name}
                  onChange={e => setTempData({...tempData, name: e.target.value})}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-agency text-[8px] text-[#9B6BFF] opacity-60">ASIGNAR_ROL</label>
                <input 
                  className="w-full bg-white/5 border border-white/20 rounded px-3 py-1.5 font-agency text-xs text-[#9B6BFF] outline-none focus:border-[#9B6BFF]"
                  value={tempData.role}
                  onChange={e => setTempData({...tempData, role: e.target.value})}
                />
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                <h2 className="font-agency text-4xl text-white tracking-tight">{user.name}</h2>
                <span className="px-2 py-0.5 bg-[#2BFF8822] border border-[#2BFF88] text-[#2BFF88] font-agency text-[10px] rounded self-center shadow-[0_0_8px_#2BFF8833]">
                  {user.status}
                </span>
              </div>
              <p className="font-agency text-sm text-[#9B6BFF] mb-4 tracking-[0.3em] uppercase opacity-80">{user.role}</p>
            </>
          )}
          
          <div className="grid grid-cols-2 gap-6 text-[10px] font-agency text-[#9AA4C7] mt-6 border-t border-white/5 pt-4">
            <div>
              <span className="opacity-40 block mb-1">AUTORIZACIÓN_DE _ACCESO</span>
              <span className="text-white uppercase tracking-widest">RANGO_{user.accessLevel}_ULTRA</span>
            </div>
            <div>
              <span className="opacity-40 block mb-1">ÚLTIMO_INICIO_DE_SESIÓN_SEGURO</span>
              <span className="text-white tracking-widest">{user.lastLogin}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
           {isEditing ? (
             <>
               <button onClick={handleSave} className="px-8 py-3 bg-[#9B6BFF] text-black font-agency text-xs transition-all rounded hover:scale-105 active:scale-95 shadow-[0_0_20px_#9B6BFF88]">
                 CONFIRMAR_CAMBIOS
               </button>
               <button onClick={() => setIsEditing(false)} className="px-8 py-2 border border-white/10 font-agency text-xs transition-all rounded hover:bg-white/5">
                 ABORTAR_EDICIÓN
               </button>
             </>
           ) : (
             <button 
                onClick={() => { setTempData({ name: user.name, role: user.role, avatar: user.avatar }); setIsEditing(true); }}
                className="px-8 py-3 border border-white/10 hover:border-[#9B6BFF] hover:bg-[#9B6BFF11] text-[#9AA4C7] hover:text-[#9B6BFF] font-agency text-xs transition-all rounded group"
             >
              EDITAR_ACTUALIZACIÓN
               <div className="h-0.5 w-0 group-hover:w-full transition-all bg-[#9B6BFF] mt-1"></div>
             </button>
           )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;

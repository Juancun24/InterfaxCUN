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
    <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-[#9B6BFF33] relative overflow-hidden">
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-t border-l border-[#9B6BFF]"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-b border-r border-[#9B6BFF]"></div>
      
      {/* Main content - RESPONSIVE LAYOUT */}
      <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 relative z-10">
        
        {/* Avatar section - RESPONSIVE SIZE */}
        <div className="relative group">
          <div 
            className={`w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full border-4 border-[#9B6BFF] p-1 shadow-[0_0_20px_#9B6BFF66] overflow-hidden relative transition-all duration-300 ${
              isEditing ? 'cursor-pointer hover:border-white ring-4 ring-[#9B6BFF22]' : ''
            }`}
            onClick={triggerFileInput}
          >
            <img 
              src={isEditing ? tempData.avatar : user.avatar} 
              alt="Avatar" 
              className={`w-full h-full rounded-full object-cover transition-all duration-700 ${
                !isEditing ? 'grayscale hover:grayscale-0' : ''
              }`}
            />
            {isEditing && (
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                <svg width="20" height="20" className="sm:w-6 sm:h-6 mb-1 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

          {/* Level badge - RESPONSIVE SIZE */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#9B6BFF] text-black text-[8px] sm:text-[9px] font-agency px-2 py-0.5 rounded shadow-[0_0_10px_#9B6BFF]">
            NIVEL_{user.accessLevel}
          </div>
        </div>

        {/* Info section - RESPONSIVE TEXT ALIGNMENT */}
        <div className="flex-1 text-center sm:text-left w-full sm:w-auto">
          {isEditing ? (
            <div className="space-y-3 sm:space-y-4 max-w-sm mx-auto sm:mx-0">
              <div className="flex flex-col gap-1">
                <label className="font-agency text-[8px] text-[#9B6BFF] opacity-60">COMANDO_OPERATIVO</label>
                <input 
                  className="w-full bg-white/5 border border-[#9B6BFF] rounded px-3 py-2 font-agency text-lg sm:text-xl text-white outline-none focus:bg-[#9B6BFF11]"
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
              {/* Name and status - RESPONSIVE */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                <h2 className="font-agency text-3xl sm:text-4xl text-white tracking-tight">{user.name}</h2>
                <span className="px-2 py-0.5 bg-[#2BFF8822] border border-[#2BFF88] text-[#2BFF88] font-agency text-[10px] rounded self-center shadow-[0_0_8px_#2BFF8833]">
                  {user.status}
                </span>
              </div>
              <p className="font-agency text-xs sm:text-sm text-[#9B6BFF] mb-4 tracking-[0.2em] sm:tracking-[0.3em] uppercase opacity-80">
                {user.role}
              </p>
            </>
          )}
          
          {/* Info grid - RESPONSIVE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-[10px] font-agency text-[#9AA4C7] mt-4 sm:mt-6 border-t border-white/5 pt-4">
            <div>
              <span className="opacity-40 block mb-1">AUTORIZACIÓN_DE_ACCESO</span>
              <span className="text-white uppercase tracking-widest text-[9px] sm:text-[10px]">
                RANGO_{user.accessLevel}_ULTRA
              </span>
            </div>
            <div>
              <span className="opacity-40 block mb-1">ÚLTIMO_INICIO_DE_SESIÓN</span>
              <span className="text-white tracking-widest text-[9px] sm:text-[10px]">{user.lastLogin}</span>
            </div>
          </div>
        </div>

        {/* Action buttons - RESPONSIVE */}
        <div className="flex flex-col gap-2 w-full sm:w-auto">
          {isEditing ? (
            <>
              <button 
                onClick={handleSave} 
                className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-[#9B6BFF] text-black font-agency text-xs transition-all rounded hover:scale-105 active:scale-95 shadow-[0_0_20px_#9B6BFF88]"
              >
                CONFIRMAR_CAMBIOS
              </button>
              <button 
                onClick={() => setIsEditing(false)} 
                className="w-full sm:w-auto px-6 sm:px-8 py-2 border border-white/10 font-agency text-xs transition-all rounded hover:bg-white/5"
              >
                ABORTAR_EDICIÓN
              </button>
            </>
          ) : (
            <button 
              onClick={() => { 
                setTempData({ name: user.name, role: user.role, avatar: user.avatar }); 
                setIsEditing(true); 
              }}
              className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 border border-white/10 hover:border-[#9B6BFF] hover:bg-[#9B6BFF11] text-[#9AA4C7] hover:text-[#9B6BFF] font-agency text-xs transition-all rounded group"
            >
              EDITAR_ACTUALIZACIÓN
              <div className="h-0.5 w-0 group-hover:w-full transition-all bg-[#9B6BFF] mt-1 mx-auto"></div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
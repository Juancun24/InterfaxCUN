
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SECTIONS } from '../../config/sections';

const HomeCards: React.FC = () => {
  const navigate = useNavigate();

  // Filtramos para que solo aparezcan las 6 tarjetas operativas (excluyendo Perfil)
  const dashboardSections = SECTIONS.filter(section => section.id !== 'perfil');

  return (
    <div className="p-4 md:p-10 flex flex-col items-center justify-start min-h-full overflow-y-auto">
      {/* Dashboard Header */}
      <header className="mb-10 mt-6 md:mt-0 text-center px-4 w-full">
        <div className="inline-block relative mb-4">
            <div className="absolute -top-4 -left-4 w-6 h-6 border-t border-l border-[#1FB6FF] opacity-50"></div>
            <div className="absolute -bottom-4 -right-4 w-6 h-6 border-b border-r border-[#1FB6FF] opacity-50"></div>
            <h1 className="font-agency text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-[#E6ECFF] tracking-tighter uppercase px-6">
                Centro de control
            </h1>
        </div>
        <p className="text-[#9AA4C7] font-light max-w-2xl mx-auto uppercase text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.4em] opacity-80 leading-relaxed">
           Solo personal autorizado. Módulos operativos activos: 06.
        </p>
      </header>

      {/* Grid de 6 tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-[1400px] px-2 sm:px-6 pb-20">
        {dashboardSections.map((section) => (
          <div 
            key={section.id}
            onClick={() => navigate(`/${section.path}`)}
            className="group relative h-[380px] sm:h-[400px] w-full [perspective:1200px] cursor-pointer"
          >
            <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(10deg)_rotateX(5deg)]">
              <div 
                className="absolute inset-0 h-full w-full rounded-2xl glass p-6 border transition-all duration-500 flex flex-col overflow-hidden"
                style={{ 
                    borderColor: `${section.accentColor}33`,
                    boxShadow: `0 4px 20px rgba(0,0,0,0.4)`,
                }}
              >
                {/* HUD Header Bar */}
                <div className="flex justify-between items-start mb-6 z-10">
                    <div className="flex flex-col">
                        <span className="font-agency text-[8px] text-[#9AA4C7] opacity-60">MÓDULO_DE_MISIÓN</span>
                        <span className="font-agency text-[10px] text-white">{section.id.toUpperCase().slice(0, 4)}</span>
                    </div>
                    <span className="font-agency text-[9px] px-2 py-0.5 border rounded-sm tracking-widest" 
                          style={{ color: section.accentColor, borderColor: `${section.accentColor}66`, backgroundColor: `${section.accentColor}11` }}>
                        {section.accessLevel}
                    </span>
                </div>

                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                     style={{ backgroundImage: `radial-gradient(${section.accentColor} 1px, transparent 0)`, backgroundSize: '15px 15px' }}></div>

                <div className="flex-1 flex flex-col justify-center z-10">
                    <h2 
                        className="font-agency text-4xl mb-3 transition-all duration-500 group-hover:tracking-wider"
                        style={{ color: section.accentColor, textShadow: `0 0 15px ${section.accentColor}44` }}
                    >
                        {section.label}
                    </h2>
                    <div className="w-12 h-1 mb-4 bg-white/5 relative overflow-hidden">
                        <div className="absolute inset-0 w-1/3 animate-shimmer" style={{ backgroundColor: section.accentColor }}></div>
                    </div>
                    <p className="text-[#9AA4C7] text-[10px] leading-relaxed uppercase tracking-widest opacity-70">
                        {section.description}
                    </p>
                </div>

                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between z-10">
                    <div className="flex gap-1.5 items-end">
                        {[0, 1, 2].map((bar) => (
                            <div 
                                key={bar} 
                                className="w-1 bg-white/10" 
                                style={{ 
                                    backgroundColor: bar === 2 ? section.accentColor : undefined,
                                    height: `${12 + bar * 4}px` 
                                }}
                            ></div>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 group/btn">
                        <span className="font-agency text-[9px] text-[#9AA4C7] group-hover:text-white">INICIAR MISIÓN</span>
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke={section.accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }
      `}} />
    </div>
  );
};

export default HomeCards;

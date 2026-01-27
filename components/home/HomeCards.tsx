import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SECTIONS } from '../../config/sections';

const HomeCards: React.FC = () => {
  const navigate = useNavigate();

  // Filtramos para que solo aparezcan las 6 tarjetas operativas (excluyendo Perfil)
  const dashboardSections = SECTIONS.filter(section => section.id !== 'perfil');

  return (
    <div className="p-4 sm:p-6 md:p-10 flex flex-col items-center justify-start min-h-full overflow-y-auto">
      {/* Dashboard Header - RESPONSIVE */}
      <header className="mb-8 sm:mb-10 mt-16 sm:mt-6 md:mt-0 text-center px-4 w-full">
        <div className="inline-block relative mb-4">
          {/* Corner decorations - más pequeños en móvil */}
          <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-4 h-4 sm:w-6 sm:h-6 border-t border-l border-[#1FB6FF] opacity-50"></div>
          <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-4 h-4 sm:w-6 sm:h-6 border-b border-r border-[#1FB6FF] opacity-50"></div>
          
          {/* Título principal - RESPONSIVE */}
          <h1 className="font-agency text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-[#E6ECFF] tracking-tighter uppercase px-4 sm:px-6">
            Centro de control
          </h1>
        </div>
        
        {/* Subtítulo - RESPONSIVE */}
        <p className="text-[#9AA4C7] font-light max-w-2xl mx-auto uppercase text-[9px] sm:text-[10px] md:text-xs tracking-[0.15em] sm:tracking-[0.3em] md:tracking-[0.4em] opacity-80 leading-relaxed px-4">
          Solo personal autorizado. Módulos operativos activos: 06.
        </p>
      </header>

      {/* Grid de 6 tarjetas - OPTIMIZADO PARA TODAS LAS PANTALLAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 pb-20">
        {dashboardSections.map((section) => (
          <div 
            key={section.id}
            onClick={() => navigate(`/${section.path}`)}
            className="group relative h-[320px] sm:h-[360px] md:h-[400px] w-full [perspective:1200px] cursor-pointer"
          >
            <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(10deg)_rotateX(5deg)]">
              <div 
                className="absolute inset-0 h-full w-full rounded-xl sm:rounded-2xl glass p-5 sm:p-6 border transition-all duration-500 flex flex-col overflow-hidden"
                style={{ 
                  borderColor: `${section.accentColor}33`,
                  boxShadow: `0 4px 20px rgba(0,0,0,0.4)`,
                }}
              >
                {/* HUD Header Bar */}
                <div className="flex justify-between items-start mb-4 sm:mb-6 z-10">
                  <div className="flex flex-col">
                    <span className="font-agency text-[8px] text-[#9AA4C7] opacity-60">MÓDULO_DE_MISIÓN</span>
                    <span className="font-agency text-[9px] sm:text-[10px] text-white">{section.id.toUpperCase().slice(0, 4)}</span>
                  </div>
                  <span className="font-agency text-[8px] sm:text-[9px] px-1.5 sm:px-2 py-0.5 border rounded-sm tracking-widest" 
                    style={{ 
                      color: section.accentColor, 
                      borderColor: `${section.accentColor}66`, 
                      backgroundColor: `${section.accentColor}11` 
                    }}>
                    {section.accessLevel}
                  </span>
                </div>

                {/* Background pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                  style={{ 
                    backgroundImage: `radial-gradient(${section.accentColor} 1px, transparent 0)`, 
                    backgroundSize: '15px 15px' 
                  }}>
                </div>

                {/* Main content area */}
                <div className="flex-1 flex flex-col justify-center z-10">
                  {/* Título de la tarjeta - RESPONSIVE */}
                  <h2 
                    className="font-agency text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 transition-all duration-500 group-hover:tracking-wider"
                    style={{ 
                      color: section.accentColor, 
                      textShadow: `0 0 15px ${section.accentColor}44` 
                    }}
                  >
                    {section.label}
                  </h2>
                  
                  {/* Loading bar */}
                  <div className="w-10 sm:w-12 h-1 mb-3 sm:mb-4 bg-white/5 relative overflow-hidden">
                    <div className="absolute inset-0 w-1/3 animate-shimmer" style={{ backgroundColor: section.accentColor }}></div>
                  </div>
                  
                  {/* Descripción - RESPONSIVE */}
                  <p className="text-[#9AA4C7] text-[9px] sm:text-[10px] leading-relaxed uppercase tracking-wide sm:tracking-widest opacity-70">
                    {section.description}
                  </p>
                </div>

                {/* Footer con stats y CTA */}
                <div className="mt-auto pt-4 sm:pt-6 border-t border-white/5 flex items-center justify-between z-10">
                  {/* Mini bars indicator */}
                  <div className="flex gap-1 sm:gap-1.5 items-end">
                    {[0, 1, 2].map((bar) => (
                      <div 
                        key={bar} 
                        className="w-1 bg-white/10" 
                        style={{ 
                          backgroundColor: bar === 2 ? section.accentColor : undefined,
                          height: `${10 + bar * 3}px` 
                        }}
                      ></div>
                    ))}
                  </div>
                  
                  {/* CTA Button */}
                  <div className="flex items-center gap-1.5 sm:gap-2 group/btn">
                    <span className="font-agency text-[8px] sm:text-[9px] text-[#9AA4C7] group-hover:text-white transition-colors">
                      INICIAR MISIÓN
                    </span>
                    <svg 
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover/btn:translate-x-1" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke={section.accentColor} 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
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

      {/* Shimmer animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }
        
        /* Optimización para móviles */
        @media (max-width: 640px) {
          .animate-shimmer {
            animation: shimmer 3s infinite linear; /* Más lento en móvil */
          }
        }
      `}} />
    </div>
  );
};

export default HomeCards;
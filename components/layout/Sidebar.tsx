import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { SECTIONS } from '../../config/sections';

const IconHome = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 172.78 148.93"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M31.84,147.39c-6.42.02-11.5-4.9-11.51-11.42l-.06-55.05c-5.34,4.52-11.35,4.81-15.63.73-3.83-3.66-4.63-10.79.2-14.84L80.35,3.48c3.55-2.97,9.23-2.41,12.61.43l73.88,61.92c5.03,4.22,6.03,10.68,1.74,15.37-4.07,4.45-10.55,4.49-16.2-.39v54.13c0,7.63-4.88,12.52-12.49,12.49l-39.21-.16-68.84.13Z"
      stroke="currentColor"
      strokeWidth={3}
      strokeMiterlimit={10}
      fill="none"
    />
    <path
      d="M166.79,65.61L92.91,3.68c-3.38-2.84-9.07-3.4-12.61-.43L4.8,66.58c-4.83,4.05-4.03,11.18-.2,14.84,4.28,4.09,10.29,3.8,15.63-.73l.06,55.05c0,6.52,5.09,11.44,11.51,11.42l68.84-.13,39.21.16c7.62.03,12.5-4.86,12.5-12.49v-54.13c5.64,4.89,12.13,4.85,16.19.39,4.28-4.69,3.29-11.15-1.74-15.37ZM88.13,52.58c6.87,0,12.44,6.65,12.44,14.86s-5.49,14.61-12.44,14.86c-6.87,0-12.44-6.65-12.44-14.86s5.57-14.86,12.44-14.86ZM86.44,129.91c-30.97,0-44.58-48.18-45.3-51.76s4.15-17.23,9.77-18.54c5.62-1.31,14.32,51.89,35.31,51.89,15.78,0,32.65-40.15,32.65-40.15,0,0,5.34-13.05,10.47-13.05,2.77,0-12.61,71.61-42.9,71.61Z"
      fill="currentColor"
      opacity={1}
    />
    <path
      d="M88.29,82.54c6.94-.25,12.44-6.65,12.44-14.86s-5.57-14.86-12.44-14.86-12.44,6.65-12.44,14.86,5.57,14.86,12.44,14.86Z"
      stroke="currentColor"
      strokeWidth={1.42}
      strokeMiterlimit={10}
      fill="none"
    />
    <path
      d="M129.5,58.54c-5.13,0-10.47,13.05-10.47,13.05,0,0-16.87,40.15-32.65,40.15-20.99,0-29.7-53.2-35.31-51.89-5.62,1.31-10.49,14.96-9.77,18.54s14.33,51.76,45.3,51.76,45.67-71.61,42.9-71.61Z"
      stroke="currentColor"
      strokeWidth={1.42}
      strokeMiterlimit={10}
      fill="none"
    />
  </svg>

);

// ✅ NUEVO: Componente que acepta SVG completo como string
const IconModule = ({ color, svgString }: { color: string, svgString: string }) => {
  // Reemplaza 'currentColor' en el SVG con el color activo
  const colorizedSvg = svgString
    .replace(/stroke="currentColor"/g, `stroke="${color}"`)
    .replace(/fill="currentColor"/g, `fill="${color}"`);
  
  return (
    <div 
      className="w-5 h-5 flex items-center justify-center"
      dangerouslySetInnerHTML={{ __html: colorizedSvg }}
      style={{ color }}
    />
  );
};

const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  return (
    <aside 
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={`glass h-screen sticky top-0 left-0 transition-all duration-300 ease-in-out z-40 flex flex-col items-center py-8 border-r border-white/5
        ${isExpanded ? 'w-64' : 'w-20'}
      `}
    >
      {/* Logo Principal Flotante (Sin recuadro) */}
      <div className="mb-12 flex items-center justify-center">
         <div className="w-14 h-14 flex items-center justify-center transition-transform duration-500 hover:scale-110 drop-shadow-[0_0_10px_rgba(31,182,255,0.6)]">
           <img 
            src="https://res.cloudinary.com/dknmovwrt/image/upload/v1769027588/Logo-1_e4jz2r.png" 
            alt="Logo" 
            className="w-full h-full object-contain brightness-125"
           />
         </div>
      </div>

      <nav className="flex-1 flex flex-col gap-6 w-full px-4 overflow-y-auto">
        <NavLink 
          to="/"
          className={({ isActive }) => `
            flex items-center gap-4 p-3 rounded-lg transition-all
            ${isActive ? 'bg-white/10 text-[#1FB6FF] shadow-[0_0_10px_rgba(31,182,255,0.2)]' : 'text-[#9AA4C7] hover:text-white hover:bg-white/5'}
          `}
        >
          <div className="w-6 flex justify-center"><IconHome /></div>
          {isExpanded && <span className="font-agency text-sm tracking-widest">Control</span>}
        </NavLink>

        <div className="h-px bg-white/10 my-2"></div>

        {SECTIONS.map((section) => {
          const isActive = location.pathname === `/${section.path}`;
          return (
            <NavLink
              key={section.id}
              to={`/${section.path}`}
              className={`
                flex items-center gap-4 p-3 rounded-lg transition-all group relative
                ${isActive ? 'bg-white/5' : 'text-[#9AA4C7] hover:text-white hover:bg-white/5'}
              `}
              style={{ 
                color: isActive ? section.accentColor : undefined,
                boxShadow: isActive ? `inset 0 0 10px ${section.accentColor}22` : 'none'
              }}
            >
              {isActive && (
                <div 
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-2/3 rounded-r-full"
                  style={{ backgroundColor: section.accentColor, boxShadow: `0 0 10px ${section.accentColor}` }}
                />
              )}
              <div className="w-6 flex justify-center">
                <IconModule 
                    color={isActive ? section.accentColor : 'currentColor'} 
                    svgString={section.iconSvg || '<svg viewBox="0 0 24 24"><rect width="16" height="16" x="4" y="4"/></svg>'} 
                />
              </div>
              {isExpanded && <span className="font-agency text-sm tracking-widest uppercase">{section.label}</span>}
              {!isExpanded && !isActive && (
                  <div className="absolute left-full ml-4 px-2 py-1 glass text-[10px] font-agency opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-[100]">
                    {section.label}
                  </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto w-full px-4">
        <div className="p-3 text-center border border-white/10 rounded-lg text-[#9AA4C7]">
          {isExpanded ? (
            <div className="font-agency text-[10px] tracking-tighter uppercase opacity-50">
              Session_Time: 12:45:01<br/>Status: ACTIVE
            </div>
          ) : (
            <div className="text-xs animate-spin-slow">◎</div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
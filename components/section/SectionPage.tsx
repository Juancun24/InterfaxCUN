
import React, { useState } from 'react';
import { SectionConfig } from '../../types';
import VideoCarousel from './VideoCarousel';
import Forum from '../forum/Forum';
import ContactCard from '../contact/ContactCard';
import VideoModalPlayer from '../player/VideoModalPlayer';

// Profile Components
import ProfileHeader from '../profile/ProfileHeader';
import ProfileStats from '../profile/ProfileStats';
import ProfileSecurity from '../profile/ProfileSecurity';
import ProfilePreferences from '../profile/ProfilePreferences';
import ProfileActivityLog from '../profile/ProfileActivityLog';
import ProfileBadges from '../profile/ProfileBadges';
import ProfileQuicklinks from '../profile/ProfileQuicklinks';

interface SectionPageProps {
  section: SectionConfig;
}

const SectionPage: React.FC<SectionPageProps> = ({ section }) => {
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  // --- VISTA DE PERFIL ---
  if (section.id === 'perfil') {
    return (
      <div className="relative p-4 lg:p-10 min-h-full flex flex-col pb-20">
        <header className="mb-6 lg:mb-10 relative overflow-hidden rounded-2xl p-6 lg:p-8 border border-white/5">
          {section.headerVideoUrl && (
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
              <video 
                src={section.headerVideoUrl} 
                autoPlay muted loop playsInline
                className="w-full h-full object-cover brightness-50 contrast-125"
                style={{ filter: `sepia(1) saturate(5) hue-rotate(${section.accentColor === '#9B6BFF' ? '250deg' : '0deg'})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F1A] via-transparent to-[#0B0F1A]"></div>
            </div>
          )}
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-6 lg:w-8 h-px bg-[#9B6BFF]"></div>
              {/* Ajuste: tracking reducido en móviles */}
              <span className="font-agency text-[10px] sm:text-xs tracking-[0.2em] lg:tracking-[0.4em] text-[#9B6BFF]">EXPEDIENTE_OPERATORIO</span>
            </div>
            {/* Ajuste: text-3xl en móviles, text-6xl en desktop */}
            <h1 className="font-agency text-3xl md:text-5xl lg:text-6xl text-white tracking-tighter uppercase leading-none">
              Bóveda_de_identidad
            </h1>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
          <div className="lg:col-span-8 space-y-8">
            <ProfileHeader />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <ProfileStats />
               <ProfileSecurity />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
               <ProfileActivityLog />
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
             <ProfileBadges />
             <ProfilePreferences />
             <ProfileQuicklinks />
             <div id="contact-module">
               <ContactCard accentColor={section.accentColor} />
             </div>
          </div>
        </div>
      </div>
    );
  }

  // --- VISTA DE SECCIONES GENERALES ---
  return (
    <div className="relative p-4 lg:p-10 min-h-full flex flex-col">
      <div className="mb-8 lg:mb-10 relative overflow-hidden rounded-2xl group border border-white/5">
        {section.headerVideoUrl && (
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <video 
              src={section.headerVideoUrl} 
              autoPlay muted loop playsInline
              className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110"
              style={{ opacity: 0.25, filter: `contrast(1.5) brightness(0.7) grayscale(0.5)` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-transparent to-[#0B0F1A]"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F1A] via-transparent to-[#0B0F1A]"></div>
            <div className="absolute inset-0 opacity-20" style={{ backgroundColor: section.accentColor }}></div>
          </div>
        )}

        {/* Ajuste: padding reducido en móviles (p-6) */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 p-6 lg:p-10">
          <div>
              <div className="flex items-center gap-3 mb-2">
                  <div className="w-6 lg:w-8 h-px" style={{ backgroundColor: section.accentColor }}></div>
                  <span className="font-agency text-[10px] sm:text-xs tracking-[0.2em] lg:tracking-[0.4em] opacity-60">DIRECTORIO_ACTIVO</span>
              </div>
              {/* Ajuste: text-4xl en móviles, escala a 6xl en pantallas grandes */}
              <h1 className="font-agency text-4xl md:text-5xl lg:text-6xl tracking-tighter leading-none" style={{ color: section.accentColor }}>
                  {section.label}
              </h1>
          </div>
          
          <div className="glass p-3 lg:p-4 rounded-lg flex gap-4 lg:gap-8 self-start md:self-auto border border-white/5">
              <div>
                  <div className="font-agency text-[8px] lg:text-[10px] opacity-40 mb-1 uppercase">Estado de datos</div>
                  <div className="text-[10px] lg:text-xs font-agency text-[#2BFF88] tracking-widest">CONEXIÓN_ESTABLE</div>
              </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-10">
        <div className="xl:col-span-3 space-y-12 lg:space-y-16">
          <section id="visual-intel">
            <div className="flex items-center gap-4 mb-6">
                <h3 className="font-agency text-base lg:text-lg tracking-widest uppercase">Portafolio</h3>
                <div className="flex-1 h-px bg-white/5"></div>
            </div>
            <VideoCarousel 
                videos={section.videos} 
                accentColor={section.accentColor} 
                onSelect={(v) => setSelectedVideo(v)}
            />
          </section>

          <section id="secure-comms">
            <div className="flex items-center gap-4 mb-6">
                <h3 className="font-agency text-base lg:text-lg tracking-widest text-[#00E5FF] uppercase">Canal de comunicación</h3>
                <div className="flex-1 h-px bg-white/5"></div>
            </div>
            <Forum />
          </section>
        </div>

        <div className="xl:col-span-1">
            <div className="sticky top-10" id="contact-module">
                <ContactCard accentColor={section.accentColor} />
            </div>
        </div>
      </div>

      {selectedVideo && (
        <VideoModalPlayer 
            video={selectedVideo} 
            accentColor={section.accentColor} 
            onClose={() => setSelectedVideo(null)} 
        />
      )}
    </div>
  );
};

export default SectionPage;

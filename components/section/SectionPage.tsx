
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

  // If this is the Profile section, render the Identity Dossier dashboard
  if (section.id === 'perfil') {
    return (
      <div className="relative p-6 lg:p-10 min-h-full flex flex-col pb-20">
        <header className="mb-10 relative overflow-hidden rounded-2xl p-8 border border-white/5">
          {/* Header Video Banner for Profile */}
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
              <div className="w-8 h-px bg-[#9B6BFF]"></div>
              <span className="font-agency text-xs tracking-[0.4em] text-[#9B6BFF]">OPERATIONAL_DOSSIER</span>
            </div>
            <h1 className="font-agency text-5xl md:text-6xl text-white tracking-tighter uppercase">Identity_Vault</h1>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
          {/* Main Content (Left/Center) */}
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

          {/* Sidebar (Right) */}
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

  // Default layout for other sections
  return (
    <div className="relative p-6 lg:p-10 min-h-full flex flex-col">
      {/* Header with Video Banner */}
      <div className="mb-10 relative overflow-hidden rounded-2xl group border border-white/5">
        {/* EDIT HERE: Banner video background */}
        {section.headerVideoUrl && (
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <video 
              src={section.headerVideoUrl} 
              autoPlay muted loop playsInline
              className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110"
              style={{ opacity: 0.25, filter: `contrast(1.5) brightness(0.7) grayscale(0.5)` }}
            />
            {/* Gradient Mask to make it a "thin" banner visually blending at edges */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-transparent to-[#0B0F1A]"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F1A] via-transparent to-[#0B0F1A]"></div>
            {/* Accent color glow overlay */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundColor: section.accentColor }}></div>
          </div>
        )}

        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 p-10">
          <div>
              <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-px" style={{ backgroundColor: section.accentColor }}></div>
                  <span className="font-agency text-xs tracking-[0.4em] opacity-60">ACTIVE_DIRECTORY</span>
              </div>
              <h1 className="font-agency text-6xl tracking-tighter" style={{ color: section.accentColor }}>
                  {section.label}
              </h1>
          </div>
          
          <div className="glass p-4 rounded-lg flex gap-8">
              <div>
                  <div className="font-agency text-[10px] opacity-40 mb-1">DATA_STATUS</div>
                  <div className="text-xs font-agency text-[#2BFF88]">STABLE_CONNECTION</div>
              </div>
              <div>
                  <div className="font-agency text-[10px] opacity-40 mb-1">ENCRYPTION</div>
                  <div className="text-xs font-agency">AES_256_BIT</div>
              </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">
        {/* Main Area: Carousel + Forum */}
        <div className="xl:col-span-3 space-y-16">
          <section id="visual-intel">
            <div className="flex items-center gap-4 mb-6">
                <h3 className="font-agency text-lg tracking-widest">VISUAL_SURVEILLANCE</h3>
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
                <h3 className="font-agency text-lg tracking-widest text-[#00E5FF]">SECURE_COMMS_CHANNEL</h3>
                <div className="flex-1 h-px bg-white/5"></div>
            </div>
            <Forum />
          </section>
        </div>

        {/* Sidebar: Contact Card */}
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

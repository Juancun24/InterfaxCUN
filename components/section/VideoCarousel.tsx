import React, { useState, useEffect } from 'react';
import { VideoData } from '../../types';
import { useLocation } from 'react-router-dom';

interface VideoCarouselProps {
  videos: VideoData[];
  accentColor: string;
  onSelect: (v: VideoData) => void;
}

const VideoCarousel: React.FC<VideoCarouselProps> = ({ videos, accentColor, onSelect }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();

  // NUEVO: Reset a posición 0 cuando cambia la sección
  useEffect(() => {
    setActiveIndex(0);
  }, [location.pathname]); // Se ejecuta cada vez que cambia la ruta

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % videos.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + videos.length) % videos.length);

  // SOLO DESKTOP: Play en hover
  const handleMouseEnter = (e: React.MouseEvent<HTMLVideoElement>) => {
    if (isMobile) return;
    const video = e.currentTarget;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLVideoElement>, isActive: boolean) => {
    if (isMobile) return;
    const video = e.currentTarget;
    if (!isActive) {
      video.pause();
    }
  };

  // Touch gesture handlers
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);
    
    if (isHorizontalSwipe && Math.abs(distanceX) > 50) {
      if (distanceX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  return (
    <div className="relative w-full py-6 sm:py-10 overflow-hidden">
      {/* ARREGLADO: Contenedor con overflow visible en móvil para evitar cortes */}
      <div 
        className={`flex items-center justify-center min-h-[250px] sm:min-h-[300px] md:min-h-[350px] relative ${
          isMobile ? 'px-4' : ''
        }`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: 'pan-y' }}
      >
        {videos.map((video, idx) => {
          let position = idx - activeIndex;
          if (idx === 0 && activeIndex === videos.length - 1) position = 1;
          if (idx === videos.length - 1 && activeIndex === 0) position = -1;

          const isActive = position === 0;
          const isFar = Math.abs(position) > 1;

          return (
            <div
              key={video.id}
              onClick={() => isActive ? onSelect(video) : setActiveIndex(idx)}
              className={`
                absolute transition-all duration-500 cursor-pointer overflow-hidden rounded-lg sm:rounded-xl border-2
                ${isActive 
                  ? isMobile
                    ? 'z-30 w-[85%] max-w-[320px] scale-100' // MÓVIL: Ajustado para no cortarse
                    : 'z-30 w-full max-w-xs sm:max-w-md md:max-w-lg scale-100 sm:scale-110' // DESKTOP
                  : isMobile
                    ? 'z-20 w-[50%] max-w-[160px] scale-75 opacity-60 blur-[1px]' // MÓVIL: Laterales más pequeños
                    : 'z-20 w-2/5 sm:w-1/3 max-w-[200px] sm:max-w-xs scale-75 sm:scale-90 opacity-60 blur-[1px]' // DESKTOP
                }
                ${position === -1 ? '-translate-x-1/2 -rotate-y-10' : position === 1 ? 'translate-x-1/2 rotate-y-10' : ''}
                ${isFar ? 'opacity-0 scale-50 pointer-events-none' : ''}
              `}
              style={{ 
                borderColor: isActive ? accentColor : 'rgba(255,255,255,0.1)',
                boxShadow: isActive ? `0 0 30px ${accentColor}44` : 'none',
                left: '50%',
                // ARREGLADO: Transform ajustado para móviles
                transform: isMobile
                  ? `translateX(calc(-50% + ${position * 85}%)) scale(${isActive ? 1 : 0.75}) rotateY(${position * 10}deg)` // Móvil: menos separación
                  : `translateX(calc(-50% + ${position * 110}%)) scale(${isActive ? 1.1 : 0.85}) rotateY(${position * 15}deg)` // Desktop: original
              }}
            >
              <div className="relative aspect-video">
                {/* CONDICIONAL: Video solo en desktop, Imagen en móvil */}
                {isMobile ? (
                  // MÓVIL: Solo poster image
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ 
                      backgroundImage: `url(${video.thumbnail})`,
                      backgroundColor: '#000'
                    }}
                  >
                    <div className="absolute inset-0 bg-black/30"></div>
                  </div>
                ) : (
                  // DESKTOP: Video con preview
                  <video 
                    src={video.url} 
                    muted 
                    loop 
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={(e) => handleMouseLeave(e, isActive)}
                    poster={video.thumbnail}
                    playsInline
                    preload={isActive ? "auto" : "none"}
                    className="w-full h-full object-cover"
                  />
                )}
                
                {/* Info overlay */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4 sm:p-6 pointer-events-none">
                    <h4 className="font-agency text-base sm:text-lg md:text-xl mb-1 text-white">{video.title}</h4>
                    <p className="text-[9px] sm:text-[10px] font-agency opacity-60 text-white">
                      <span className="hidden sm:inline">ACCESO CONCEDIDO // HAGA CLIC PARA EXPANDIR</span>
                      <span className="sm:hidden">TOCA PARA EXPANDIR</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="mt-8 sm:mt-12 flex items-center justify-center gap-6 sm:gap-10">
        <button 
          onClick={handlePrev}
          className="p-2 sm:p-3 glass rounded-full hover:text-[#1FB6FF] border-white/10 hover:border-[#1FB6FF] transition-all active:scale-95"
          aria-label="Previous video"
        >
          <svg 
            width="20" 
            height="20" 
            className="sm:w-6 sm:h-6" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <div className="flex gap-1.5 sm:gap-2">
          {videos.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-1 transition-all rounded-full cursor-pointer ${
                i === activeIndex ? 'w-6 sm:w-8' : 'w-2 bg-white/10'
              }`}
              style={{ backgroundColor: i === activeIndex ? accentColor : undefined }}
              aria-label={`Go to video ${i + 1}`}
            />
          ))}
        </div>

        <button 
          onClick={handleNext}
          className="p-2 sm:p-3 glass rounded-full hover:text-[#1FB6FF] border-white/10 hover:border-[#1FB6FF] transition-all active:scale-95"
          aria-label="Next video"
        >
          <svg 
            width="20" 
            height="20" 
            className="sm:w-6 sm:h-6" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      {/* Mobile swipe hint */}
      <div className="mt-4 text-center sm:hidden">
        <p className="text-[9px] font-agency opacity-30 uppercase tracking-widest animate-pulse">
          ← Desliza para navegar →
        </p>
      </div>
    </div>
  );
};

export default VideoCarousel;
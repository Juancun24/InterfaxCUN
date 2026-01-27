import React, { useState } from 'react';
import { VideoData } from '../../types';

interface VideoCarouselProps {
  videos: VideoData[];
  accentColor: string;
  onSelect: (v: VideoData) => void;
}

const VideoCarousel: React.FC<VideoCarouselProps> = ({ videos, accentColor, onSelect }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % videos.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + videos.length) % videos.length);

  // Safe play handler
  const handleMouseEnter = (e: React.MouseEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLVideoElement>, isActive: boolean) => {
    const video = e.currentTarget;
    if (!isActive) {
      video.pause();
    }
  };

  // MEJORADO: Touch gesture handlers con mejor detección
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null); // Reset
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
    
    // Mínimo 50px de swipe horizontal
    if (isHorizontalSwipe && Math.abs(distanceX) > 50) {
      if (distanceX > 0) {
        handleNext(); // Swipe left -> next
      } else {
        handlePrev(); // Swipe right -> prev
      }
    }
  };

  return (
    <div className="relative w-full py-6 sm:py-10 overflow-hidden">
      {/* ARREGLADO: Contenedor principal CENTRADO con flex */}
      <div 
        className="flex items-center justify-center min-h-[250px] sm:min-h-[300px] md:min-h-[350px] relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: 'pan-y' }} // Permite scroll vertical, previene zoom
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
                  ? 'z-30 w-full max-w-xs sm:max-w-md md:max-w-lg scale-100 sm:scale-110' 
                  : 'z-20 w-2/5 sm:w-1/3 max-w-[200px] sm:max-w-xs scale-75 sm:scale-90 opacity-60 blur-[1px]'
                }
                ${position === -1 ? '-translate-x-1/2 -rotate-y-10' : position === 1 ? 'translate-x-1/2 rotate-y-10' : ''}
                ${isFar ? 'opacity-0 scale-50 pointer-events-none' : ''}
              `}
              style={{ 
                borderColor: isActive ? accentColor : 'rgba(255,255,255,0.1)',
                boxShadow: isActive ? `0 0 30px ${accentColor}44` : 'none',
                // ARREGLADO: Centrado perfecto con left: 50% y transform
                left: '50%',
                transform: `translateX(calc(-50% + ${position * 110}%)) scale(${isActive ? 1.1 : 0.85}) rotateY(${position * 15}deg)`
              }}
            >
              <div className="relative aspect-video">
                {/* OPTIMIZADO: Video con preload según estado */}
                <video 
                  src={video.url} 
                  muted 
                  loop 
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={(e) => handleMouseLeave(e, isActive)}
                  poster={video.thumbnail}
                  playsInline
                  preload={isActive ? "auto" : "none"} // NUEVO: Solo precarga el video activo
                  className="w-full h-full object-cover"
                  // OPTIMIZADO: Reducir calidad en móviles
                  style={{
                    maxHeight: window.innerWidth < 768 ? '300px' : 'none'
                  }}
                />
                
                {/* Info overlay - RESPONSIVE TEXT */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4 sm:p-6 pointer-events-none">
                    <h4 className="font-agency text-base sm:text-lg md:text-xl mb-1">{video.title}</h4>
                    <p className="text-[9px] sm:text-[10px] font-agency opacity-60">
                      {/* MEJORADO: Texto diferente para móvil/desktop */}
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

      {/* Controls - RESPONSIVE SPACING AND SIZE */}
      <div className="mt-8 sm:mt-12 flex items-center justify-center gap-6 sm:gap-10">
        {/* Previous button */}
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

        {/* Dots indicator - RESPONSIVE SIZES */}
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

        {/* Next button */}
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

      {/* Mobile swipe hint - MEJORADO: Solo aparece al inicio */}
      <div className="mt-4 text-center sm:hidden">
        <p className="text-[9px] font-agency opacity-30 uppercase tracking-widest animate-pulse">
          ← Desliza para navegar →
        </p>
      </div>
    </div>
  );
};

export default VideoCarousel;
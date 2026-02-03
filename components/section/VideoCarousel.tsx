import React, { useState, useEffect } from 'react';
import { VideoData } from '../../types';
import { useLocation } from 'react-router-dom';
import { getVideoProgress, VideoProgress } from './videoProgressManager';
import VideoProgressIndicator from './VideoProgressIndicator';

interface VideoCarouselProps {
  videos: VideoData[];
  accentColor: string;
  onSelect: (v: VideoData) => void;
}

const VideoCarousel: React.FC<VideoCarouselProps> = ({ videos, accentColor, onSelect }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [videoProgresses, setVideoProgresses] = useState<Record<string, VideoProgress>>({});
  const location = useLocation();

  // Reset a posición 0 cuando cambia la sección
  useEffect(() => {
    setActiveIndex(0);
  }, [location.pathname]);

  // Cargar progresos de videos
  useEffect(() => {
    const loadProgresses = () => {
      const progresses: Record<string, VideoProgress> = {};
      videos.forEach(video => {
        const progress = getVideoProgress(video.id);
        if (progress) {
          progresses[video.id] = progress;
        }
      });
      setVideoProgresses(progresses);
    };
    
    loadProgresses();
    
    // Actualizar cada 2 segundos para reflejar cambios de otros tabs/ventanas
    const interval = setInterval(loadProgresses, 2000);
    
    return () => clearInterval(interval);
  }, [videos]);

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

  // Obtener estado de progreso de un video
  const getVideoState = (videoId: string) => {
    const progress = videoProgresses[videoId];
    return {
      progress: progress?.progress || 0,
      completed: progress?.completed || false,
      hasProgress: !!progress && progress.progress > 0
    };
  };

  return (
    <div className="relative w-full py-6 sm:py-10 overflow-hidden">
      {/* Contenedor principal CENTRADO */}
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
          const videoState = getVideoState(video.id);

          return (
            <div
              key={video.id}
              onClick={() => isActive ? onSelect(video) : setActiveIndex(idx)}
              className={`
                absolute transition-all duration-500 cursor-pointer overflow-hidden rounded-lg sm:rounded-xl
                ${isActive 
                  ? isMobile
                    ? 'z-30 w-[85%] max-w-[320px] scale-100'
                    : 'z-30 w-full max-w-xs sm:max-w-md md:max-w-lg scale-100 sm:scale-110'
                  : isMobile
                    ? 'z-20 w-[50%] max-w-[160px] scale-75 opacity-60 blur-[1px]'
                    : 'z-20 w-2/5 sm:w-1/3 max-w-[200px] sm:max-w-xs scale-75 sm:scale-90 opacity-60 blur-[1px]'
                }
                ${position === -1 ? '-translate-x-1/2 -rotate-y-10' : position === 1 ? 'translate-x-1/2 rotate-y-10' : ''}
                ${isFar ? 'opacity-0 scale-50 pointer-events-none' : ''}
              `}

              style={{ 
                left: '50%',
                transform: isMobile
                  ? `translateX(calc(-50% + ${position * 85}%)) scale(${isActive ? 1 : 0.75}) rotateY(${position * 10}deg)`
                  : `translateX(calc(-50% + ${position * 110}%)) scale(${isActive ? 1.1 : 0.85}) rotateY(${position * 15}deg)`
              }}
            >
              {/* HUD FRAME - Estado visual según progreso */}
              <div 
                className={`absolute inset-0 rounded-lg sm:rounded-xl transition-all duration-300 ${
                  videoState.completed
                    ? 'border-2'
                    : videoState.hasProgress
                      ? 'border-2'
                      : 'border border-dashed'
                }`}
                style={{
                  borderColor: videoState.completed
                    ? accentColor
                    : videoState.hasProgress
                      ? `${accentColor}88`
                      : 'rgba(255,255,255,0.15)',
                  boxShadow: isActive
                    ? videoState.completed
                      ? `0 0 30px ${accentColor}66, inset 0 0 20px ${accentColor}22`
                      : videoState.hasProgress
                        ? `0 0 20px ${accentColor}44`
                        : '0 0 15px rgba(255,255,255,0.1)'
                    : 'none'
                }}
              >
                {/* Corner brackets - HUD style */}
                {isActive && (
                  <>
                    {/* Top left */}
                    <div 
                      className="absolute top-2 left-2 w-4 h-4 sm:w-6 sm:h-6 border-t-2 border-l-2 transition-all"
                      style={{ 
                        borderColor: videoState.completed ? accentColor : videoState.hasProgress ? `${accentColor}88` : 'rgba(255,255,255,0.3)',
                        boxShadow: videoState.completed ? `0 0 8px ${accentColor}` : 'none'
                      }}
                    />
                    {/* Top right */}
                    <div 
                      className="absolute top-2 right-2 w-4 h-4 sm:w-6 sm:h-6 border-t-2 border-r-2 transition-all"
                      style={{ 
                        borderColor: videoState.completed ? accentColor : videoState.hasProgress ? `${accentColor}88` : 'rgba(255,255,255,0.3)',
                        boxShadow: videoState.completed ? `0 0 8px ${accentColor}` : 'none'
                      }}
                    />
                    {/* Bottom left */}
                    <div 
                      className="absolute bottom-2 left-2 w-4 h-4 sm:w-6 sm:h-6 border-b-2 border-l-2 transition-all"
                      style={{ 
                        borderColor: videoState.completed ? accentColor : videoState.hasProgress ? `${accentColor}88` : 'rgba(255,255,255,0.3)',
                        boxShadow: videoState.completed ? `0 0 8px ${accentColor}` : 'none'
                      }}
                    />
                    {/* Bottom right */}
                    <div 
                      className="absolute bottom-2 right-2 w-4 h-4 sm:w-6 sm:h-6 border-b-2 border-r-2 transition-all"
                      style={{ 
                        borderColor: videoState.completed ? accentColor : videoState.hasProgress ? `${accentColor}88` : 'rgba(255,255,255,0.3)',
                        boxShadow: videoState.completed ? `0 0 8px ${accentColor}` : 'none'
                      }}
                    />
                  </>
                )}
              </div>

              <div className="relative aspect-video">
                {/* CONDICIONAL: Video solo en desktop, Imagen en móvil */}
                {isMobile ? (
                  // MÓVIL: Solo poster image
                  <div 
                    className={`w-full h-full bg-cover bg-center transition-all duration-300 ${
                      videoState.completed ? 'brightness-110 saturate-110' : videoState.hasProgress ? 'brightness-100' : 'brightness-75 grayscale-[0.3]'
                    }`}
                    style={{ 
                      backgroundImage: `url(${video.thumbnail})`,
                      backgroundColor: '#000'
                    }}
                  >
                    <div className={`absolute inset-0 transition-all ${
                      videoState.completed ? 'bg-black/20' : videoState.hasProgress ? 'bg-black/30' : 'bg-black/50'
                    }`}></div>
                    
                    {/* Scanline effect */}
                    {!videoState.completed && (
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent animate-scanline opacity-30" />
                    )}
                  </div>
                ) : (
                  // DESKTOP: Video con preview
                  <div className="relative w-full h-full">
                    <video 
                      src={video.url} 
                      muted 
                      loop 
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={(e) => handleMouseLeave(e, isActive)}
                      poster={video.thumbnail}
                      playsInline
                      preload={isActive ? "auto" : "none"}
                      className={`w-full h-full object-cover transition-all duration-300 ${
                        videoState.completed ? 'brightness-110' : videoState.hasProgress ? 'brightness-100' : 'brightness-75 grayscale-[0.2]'
                      }`}
                    />
                    
                    {/* Overlay para no vistos */}
                    {!videoState.hasProgress && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
                    )}
                  </div>
                )}
                
                {/* PROGRESS INDICATOR - Top right */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
                  <VideoProgressIndicator
                    progress={videoState.progress}
                    completed={videoState.completed}
                    accentColor={accentColor}
                    size={isMobile ? 'small' : isActive ? 'medium' : 'small'}
                    style="circular"
                  />
                </div>

                {/* Status badge - Top left */}
                {isActive && (
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
                    <div 
                      className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded font-agency text-[8px] sm:text-[9px] tracking-wider backdrop-blur-md border ${
                        videoState.completed
                          ? 'bg-[#2BFF88]/20 border-[#2BFF88]/50 text-[#2BFF88]'
                          : videoState.hasProgress
                            ? 'bg-white/10 border-white/20 text-white/80'
                            : 'bg-black/40 border-white/10 text-white/40'
                      }`}
                      style={{
                        boxShadow: videoState.completed 
                          ? `0 0 12px ${accentColor}44` 
                          : 'none'
                      }}
                    >
                      {videoState.completed 
                        ? '✓ PROCESADO' 
                        : videoState.hasProgress 
                          ? '⟳ EN_PROCESO'
                          : '🔒 PENDIENTE'
                      }
                    </div>
                  </div>
                )}
                
                {/* Info overlay */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-4 sm:p-6 pointer-events-none">
                    {/* Progress bar linear - Bottom */}
                    <div className="mb-3 sm:mb-4">
                      <VideoProgressIndicator
                        progress={videoState.progress}
                        completed={videoState.completed}
                        accentColor={accentColor}
                        style="linear"
                      />
                    </div>
                    
                    <h4 className="font-agency text-base sm:text-lg md:text-xl mb-1 text-white flex items-center gap-2">
                      {video.title}
                      {videoState.completed && (
                        <svg 
                          width="16" 
                          height="16" 
                          className="sm:w-5 sm:h-5"
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="#2BFF88" 
                          strokeWidth="3"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </h4>
                    
                    <p className="text-[9px] sm:text-[10px] font-agency opacity-60 text-white">
                      <span className="hidden sm:inline">
                        {videoState.completed 
                          ? 'ARCHIVO_PROCESADO // ACCESO_CONCEDIDO'
                          : videoState.hasProgress
                            ? 'PROCESANDO_DATOS // HAGA_CLIC_PARA_CONTINUAR'
                            : 'DATOS_BLOQUEADOS // HAGA_CLIC_PARA_DESBLOQUEAR'
                        }
                      </span>
                      <span className="sm:hidden">
                        {videoState.completed ? 'COMPLETADO' : 'TOCA PARA ABRIR'}
                      </span>
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

        {/* Dots indicator with progress state */}
        <div className="flex gap-1.5 sm:gap-2">
          {videos.map((video, i) => {
            const state = getVideoState(video.id);
            return (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-1 transition-all rounded-full cursor-pointer relative ${
                  i === activeIndex ? 'w-6 sm:w-8' : 'w-2'
                }`}
                style={{ 
                  backgroundColor: i === activeIndex
                    ? accentColor
                    : state.completed
                      ? `${accentColor}66`
                      : state.hasProgress
                        ? `${accentColor}44`
                        : 'rgba(255,255,255,0.2)'
                }}
                aria-label={`Go to video ${i + 1}`}
              >
                {state.completed && (
                  <div 
                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ backgroundColor: '#2BFF88', boxShadow: '0 0 4px #2BFF88' }}
                  />
                )}
              </button>
            );
          })}
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
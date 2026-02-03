import React, { useState, useRef, useEffect } from 'react';
import { VideoData } from '../../types';
import { TRANSITION_VIDEO_URL } from '../../config/sections';
import { saveVideoProgress, markVideoAsCompleted } from '../section/videoProgressManager';

interface VideoModalPlayerProps {
  video: VideoData;
  accentColor: string;
  onClose: () => void;
}

const VideoModalPlayer: React.FC<VideoModalPlayerProps> = ({ video, accentColor, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [decryptionPercent, setDecryptionPercent] = useState(0);
  const [currentTimeDisplay, setCurrentTimeDisplay] = useState('00:00');
  const [durationDisplay, setDurationDisplay] = useState('00:00');
  const [isMobile, setIsMobile] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const [showRotateHint, setShowRotateHint] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const transitionVideoRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  
  // NUEVO: Estados y ref para tracking de progreso
  const [lastSavedProgress, setLastSavedProgress] = useState(0);
  const progressSaveIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Detectar móvil y orientación
    const checkMobile = () => window.innerWidth < 768;
    const checkLandscape = () => window.innerWidth > window.innerHeight;
    
    setIsMobile(checkMobile());
    setIsLandscape(checkLandscape());
    
    // Mostrar hint de rotación solo en móvil portrait
    if (checkMobile() && !checkLandscape()) {
      setShowRotateHint(true);
      setTimeout(() => setShowRotateHint(false), 5000);
    }
    
    const handleResize = () => {
      setIsMobile(checkMobile());
      setIsLandscape(checkLandscape());
    };
    
    const handleOrientationChange = () => {
      setTimeout(() => {
        setIsLandscape(checkLandscape());
      }, 100);
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ' && !isTransitioning) {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Duración de la transición
    const transitionDuration = 3000;
    const start = Date.now();
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const percent = Math.min(100, Math.floor((elapsed / transitionDuration) * 100));
      setDecryptionPercent(percent);
      
      if (elapsed >= transitionDuration) {
        clearInterval(interval);
        handleTransitionEnd();
      }
    }, 50);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      clearInterval(interval);
      
      // IMPORTANTE: Limpiar interval de guardado
      if (progressSaveIntervalRef.current) {
        clearInterval(progressSaveIntervalRef.current);
      }
    };
  }, [onClose, isTransitioning]);

  // NUEVO: useEffect separado para guardar progreso al cerrar
  useEffect(() => {
    return () => {
      // Solo guardar si NO estamos en transición Y el video está cargado
      if (!isTransitioning && videoRef.current) {
        const currentTime = videoRef.current.currentTime;
        const duration = videoRef.current.duration;
        
        // Validar que tenemos datos válidos
        if (duration > 0 && !isNaN(currentTime) && !isNaN(duration)) {
          const finalProgress = (currentTime / duration) * 100;
          
          // Solo guardar si hay progreso real (> 1%)
          if (finalProgress > 1) {
            console.log('💾 Guardando progreso final:', finalProgress.toFixed(2), '%');
            saveVideoProgress(video.id, finalProgress, duration);
          }
        }
      }
    };
  }, [video.id, isTransitioning]);

  // NUEVO: Función para iniciar tracking automático
  const startProgressTracking = () => {
    // Limpiar interval anterior si existe
    if (progressSaveIntervalRef.current) {
      clearInterval(progressSaveIntervalRef.current);
    }

    console.log('🟢 Iniciando tracking automático...');

    // Guardar progreso cada 3 segundos
    progressSaveIntervalRef.current = setInterval(() => {
      if (videoRef.current) {
        const currentTime = videoRef.current.currentTime;
        const duration = videoRef.current.duration;
        
        if (duration > 0 && !isNaN(currentTime) && !isNaN(duration)) {
          const currentProgress = (currentTime / duration) * 100;
          
          // Solo guardar si hay cambio significativo (>2%)
          if (Math.abs(currentProgress - lastSavedProgress) >= 2) {
            console.log('💾 Auto-guardando progreso:', currentProgress.toFixed(2), '%');
            saveVideoProgress(video.id, currentProgress, duration);
            setLastSavedProgress(currentProgress);
            
            // Marcar como completado si llega al 95%
            if (currentProgress >= 95 && lastSavedProgress < 95) {
              console.log('✅ Video completado!');
              markVideoAsCompleted(video.id);
            }
          }
        }
      }
    }, 3000); // Cada 3 segundos
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.load();
        
        if (isMobile) {
          setTimeout(() => {
            enterFullscreen();
          }, 500);
        }
        
        videoRef.current.play().then(() => {
          setIsPlaying(true);
          // NUEVO: Iniciar tracking al reproducir
          startProgressTracking();
        }).catch((error) => {
          console.log('Autoplay bloqueado:', error);
          setIsPlaying(false);
        });
      }
    }, 100);
  };

  const enterFullscreen = () => {
    if (!videoRef.current || !isMobile) return;
    
    try {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if ((videoRef.current as any).webkitEnterFullscreen) {
        (videoRef.current as any).webkitEnterFullscreen();
      } else if ((videoRef.current as any).webkitRequestFullscreen) {
        (videoRef.current as any).webkitRequestFullscreen();
      } else if ((videoRef.current as any).mozRequestFullScreen) {
        (videoRef.current as any).mozRequestFullScreen();
      } else if ((videoRef.current as any).msRequestFullscreen) {
        (videoRef.current as any).msRequestFullscreen();
      }
    } catch (error) {
      console.log('No se pudo entrar en fullscreen:', error);
    }
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
          // NUEVO: Reiniciar tracking al reanudar
          startProgressTracking();
        });
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
        // NUEVO: Detener tracking al pausar
        if (progressSaveIntervalRef.current) {
          clearInterval(progressSaveIntervalRef.current);
          console.log('⏸️ Tracking pausado');
        }
      }
    }
  };

  // MODIFICADO: handleProgress ahora solo actualiza la UI
  const handleProgress = () => {
    if (videoRef.current) {
      const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(p || 0);
      setCurrentTimeDisplay(formatTime(videoRef.current.currentTime));
    }
  };

  // NUEVO: Handler cuando el video termina
  const handleVideoEnded = () => {
    console.log('✅ Video terminado, marcando como completado');
    markVideoAsCompleted(video.id);
    setIsPlaying(false);
    
    // Detener tracking
    if (progressSaveIntervalRef.current) {
      clearInterval(progressSaveIntervalRef.current);
    }
  };

  const onLoadedMetadata = () => {
    if (videoRef.current) setDurationDisplay(formatTime(videoRef.current.duration));
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (videoRef.current) {
      const time = (val / 100) * videoRef.current.duration;
      videoRef.current.currentTime = time;
      setProgress(val);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
      onClick={handleBackdropClick}
    >
      {/* HINT DE ROTACIÓN */}
      {showRotateHint && isMobile && !isLandscape && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[250] glass px-6 py-4 rounded-2xl border border-[#1FB6FF]/50 shadow-2xl animate-in slide-in-from-top duration-500">
          <div className="flex items-center gap-4">
            <div className="relative">
              <svg 
                width="32" 
                height="32" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#1FB6FF" 
                strokeWidth="2"
                className="animate-bounce"
              >
                <rect x="2" y="6" width="20" height="12" rx="2" />
                <path d="M12 3v3M12 18v3" />
              </svg>
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#1FB6FF" 
                strokeWidth="2"
                className="absolute -bottom-1 -right-1 animate-spin"
                style={{ animationDuration: '3s' }}
              >
                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
              </svg>
            </div>
            
            <div>
              <p className="font-agency text-sm text-white tracking-wider mb-1">
                MEJOR EXPERIENCIA
              </p>
              <p className="font-agency text-[10px] text-[#1FB6FF] tracking-widest opacity-80">
                Gira tu dispositivo →
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal */}
      <div 
        ref={modalRef}
        className={`relative w-full ${
          isMobile ? 'mx-2' : 'max-w-6xl'
        } glass rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_120px_rgba(0,0,0,1)] animate-in zoom-in duration-500`}
        style={{ borderColor: `${accentColor}44` }}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header HUD */}
        <div className={`${
          isMobile ? 'p-3' : 'p-4'
        } flex items-center justify-between border-b border-white/5 font-agency bg-white/[0.02] relative z-[70]`}>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${
              isTransitioning ? 'bg-yellow-500' : 'bg-red-500'
            } animate-pulse shadow-[0_0_10px_currentColor]`}></div>
            <span className={`${
              isMobile ? 'text-[9px]' : 'text-[11px]'
            } tracking-[0.3em] sm:tracking-[0.4em] text-white/80 uppercase truncate max-w-[150px] sm:max-w-none`}>
              {isTransitioning ? 'AUTORIZACIÓN_MISIÓN' : `// ${video.title}`}
            </span>
          </div>
          
          <button 
            onClick={onClose}
            className={`${
              isMobile ? 'p-2' : 'p-2 sm:p-3'
            } rounded-full hover:bg-white/10 transition-all group z-[210]`}
            aria-label="Close video"
          >
            <svg 
              width={isMobile ? "20" : "24"} 
              height={isMobile ? "20" : "24"}
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Video Container */}
        <div 
          className="relative bg-black flex items-center justify-center overflow-hidden"
          style={{
            aspectRatio: isMobile ? '16/9' : undefined,
            height: isMobile ? 'auto' : undefined
          }}
        >
          {/* Transición */}
          {isTransitioning && (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black">
              <video 
                ref={transitionVideoRef}
                src={TRANSITION_VIDEO_URL}
                autoPlay 
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover opacity-80 brightness-150 contrast-125 saturate-150"
                style={{ 
                  filter: `sepia(0.6) hue-rotate(${accentColor === '#9B6BFF' ? '240deg' : '0deg'})`,
                  maxHeight: isMobile ? '70vh' : 'none'
                }}
              />
              
              <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]"></div>
            </div>
          )}

          {/* Video Principal */}
          <video 
            ref={videoRef}
            src={video.url}
            playsInline
            controls={isMobile && isLandscape}
            preload="auto"
            poster={video.thumbnail}
            className={`w-full h-full object-contain transition-all duration-1000 ${
              isTransitioning ? 'scale-110 blur-3xl opacity-0' : 'scale-100 blur-0 opacity-100'
            }`}
            style={{
              maxHeight: isMobile ? '70vh' : 'none'
            }}
            onTimeUpdate={handleProgress}
            onLoadedMetadata={onLoadedMetadata}
            onLoadedData={() => {
              console.log('📹 Video cargado correctamente');
            }}
            onPlay={() => {
              setIsPlaying(true);
              startProgressTracking();
            }}
            onPause={() => {
              setIsPlaying(false);
              if (progressSaveIntervalRef.current) {
                clearInterval(progressSaveIntervalRef.current);
              }
            }}
            onEnded={handleVideoEnded}
            onError={(e) => {
              console.error('❌ Error loading video:', e);
            }}
          />

          {/* Controles - Ocultos en landscape móvil */}
          {!isTransitioning && !(isMobile && isLandscape) && (
            <div className={`absolute inset-x-0 bottom-0 ${
              isMobile ? 'p-4' : 'p-10'
            } bg-gradient-to-t from-black via-black/40 to-transparent transition-all duration-700 z-[60]`}>
              <div className={`flex flex-col ${isMobile ? 'gap-4' : 'gap-8'}`}>
                
                <div className="relative flex flex-col gap-2">
                  <div className="flex justify-between items-end px-1">
                    <span className={`font-agency ${
                      isMobile ? 'text-[8px]' : 'text-[9px]'
                    } text-white/40 tracking-[0.2em] sm:tracking-[0.3em]`}>
                      NIVEL: <span className="text-[#2BFF88]">PRINCIPIANTE</span>
                    </span>
                    <div className={`font-agency ${
                      isMobile ? 'text-xs' : 'text-sm'
                    } tracking-[0.2em] text-white/90`}>
                      {currentTimeDisplay} <span className="text-white/20">/</span> {durationDisplay}
                    </div>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    step="0.01" 
                    value={progress} 
                    onChange={seek}
                    className={`w-full ${
                      isMobile ? 'h-1' : 'h-1.5'
                    } bg-white/10 appearance-none rounded-full cursor-pointer transition-all hover:h-2.5 outline-none`}
                    style={{ 
                      background: `linear-gradient(to right, ${accentColor} ${progress}%, rgba(255,255,255,0.1) ${progress}%)` 
                    }}
                  />
                </div>

                <div className={`flex items-center ${
                  isMobile ? 'justify-center gap-4' : 'justify-between'
                }`}>
                  <div className="flex items-center gap-4 sm:gap-10">
                    <button 
                      onClick={togglePlay} 
                      className={`${
                        isMobile ? 'w-12 h-12' : 'w-14 h-14'
                      } flex items-center justify-center rounded-full border border-white/20 hover:border-white hover:bg-white/10 transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] active:scale-90`}
                    >
                      {isPlaying ? (
                        <svg width={isMobile ? "18" : "22"} height={isMobile ? "18" : "22"} viewBox="0 0 24 24" fill="currentColor">
                          <rect x="6" y="4" width="4" height="16"></rect>
                          <rect x="14" y="4" width="4" height="16"></rect>
                        </svg>
                      ) : (
                        <svg width={isMobile ? "18" : "22"} height={isMobile ? "18" : "22"} viewBox="0 0 24 24" fill="currentColor" className="ml-1">
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      )}
                    </button>
                    
                    {isMobile && !isLandscape && (
                      <button 
                        onClick={enterFullscreen}
                        className="p-3 rounded-full border border-white/20 hover:bg-white/10 transition-all"
                        aria-label="Fullscreen"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                        </svg>
                      </button>
                    )}
                    
                    {!isMobile && (
                      <div className="hidden lg:flex gap-8 border-l border-white/10 pl-10">
                        <div className="flex flex-col">
                          <span className="font-agency text-[8px] opacity-40">ENLACE_ASCENDENTE</span>
                          <span className="font-agency text-[10px] text-white/80">CONECTADO</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-agency text-[8px] opacity-40">BANDANCHA</span>
                          <span className="font-agency text-[10px] text-[#2BFF88]">500 MB/S</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {!isMobile && (
                    <div className="flex items-center gap-6 border-l border-white/10 pl-10">
                      <div className="flex flex-col items-end gap-1">
                        <span className="font-agency text-[8px] opacity-40">VOLUMEN</span>
                        <div className="flex items-center gap-4">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-40">
                            <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                          </svg>
                          <input 
                            type="range" 
                            min="0" 
                            max="1" 
                            step="0.01" 
                            value={volume} 
                            onChange={(e) => { 
                              const v = parseFloat(e.target.value); 
                              setVolume(v); 
                              if(videoRef.current) videoRef.current.volume = v; 
                            }}
                            className="w-28 h-1 accent-[#9B6BFF] cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {isMobile && (
                    <button 
                      onClick={() => {
                        if (videoRef.current) {
                          const newVolume = volume > 0 ? 0 : 1;
                          setVolume(newVolume);
                          videoRef.current.volume = newVolume;
                        }
                      }}
                      className="p-3 rounded-full border border-white/20 hover:bg-white/10 transition-all"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                        {volume > 0 && <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>}
                        {volume === 0 && <line x1="23" y1="9" x2="17" y2="15"></line>}
                        {volume === 0 && <line x1="17" y1="9" x2="23" y2="15"></line>}
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {!isMobile && (
            <>
              <div className="absolute top-10 left-10 w-12 h-12 border-t-2 border-l-2 opacity-20 pointer-events-none" style={{ borderColor: accentColor }}></div>
              <div className="absolute top-10 right-10 w-12 h-12 border-t-2 border-r-2 opacity-20 pointer-events-none" style={{ borderColor: accentColor }}></div>
              <div className="absolute bottom-10 left-10 w-12 h-12 border-b-2 border-l-2 opacity-20 pointer-events-none" style={{ borderColor: accentColor }}></div>
              <div className="absolute bottom-10 right-10 w-12 h-12 border-b-2 border-r-2 opacity-20 pointer-events-none" style={{ borderColor: accentColor }}></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoModalPlayer;

import React, { useState, useRef, useEffect } from 'react';
import { VideoData } from '../../types';
import { TRANSITION_VIDEO_URL } from '../../config/sections';

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
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const transitionVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ' && !isTransitioning) {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Duración de la transición forzada a 3 segundos
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
      clearInterval(interval);
    };
  }, [onClose]);

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    // Aseguramos que el video principal inicie tras la transición
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          setIsPlaying(false);
        });
      }
    }, 100);
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().then(() => setIsPlaying(true));
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleProgress = () => {
    if (videoRef.current) {
      const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(p || 0);
      setCurrentTimeDisplay(formatTime(videoRef.current.currentTime));
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

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 overflow-hidden">
      <div className="absolute inset-0 bg-black/98 backdrop-blur-3xl" onClick={onClose} />
      
      <div className="relative w-full max-w-6xl glass rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_120px_rgba(0,0,0,1)] animate-in zoom-in duration-500" style={{ borderColor: `${accentColor}44` }}>
        
        {/* Header HUD */}
        <div className="p-4 flex items-center justify-between border-b border-white/5 font-agency bg-white/[0.02] relative z-[70]">
            <div className="flex items-center gap-4">
              <div className={`w-2.5 h-2.5 rounded-full ${isTransitioning ? 'bg-yellow-500' : 'bg-red-500'} animate-pulse shadow-[0_0_10px_currentColor]`}></div>
              <span className="text-[11px] tracking-[0.4em] text-white/80 uppercase">
                {isTransitioning ? 'AUTHORIZING_MISSION_INTEL' : `DECRYPTED_FEED // ${video.title}`}
              </span>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-[10px] opacity-40 hidden sm:inline tracking-widest font-mono">STREAMING_ENCRYPTED</span>
              <button onClick={onClose} className="text-[10px] hover:text-white transition-all text-white/50 border border-white/10 px-4 py-1.5 rounded-sm hover:border-white/60 hover:bg-white/5">
                  CLOSE_ARCHIVE [ESC]
              </button>
            </div>
        </div>

        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
            
            {/* Capa de Transición Táctica (3 segundos) */}
            {isTransitioning && (
              <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black">
                <video 
                    ref={transitionVideoRef}
                    src={TRANSITION_VIDEO_URL}
                    autoPlay muted
                    className="absolute inset-0 w-full h-full object-cover opacity-80 brightness-150 contrast-125 saturate-150"
                    style={{ filter: `sepia(0.6) hue-rotate(${accentColor === '#9B6BFF' ? '240deg' : '0deg'})` }}
                />
                
                <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]"></div>
              </div>
            )}

            {/* Video Principal */}
            <video 
                ref={videoRef}
                src={video.url}
                className={`w-full h-full object-contain transition-all duration-1000 ${isTransitioning ? 'scale-110 blur-3xl opacity-0' : 'scale-100 blur-0 opacity-100'}`}
                onTimeUpdate={handleProgress}
                onLoadedMetadata={onLoadedMetadata}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onClick={togglePlay}
            />

            {/* HUD de CONTROLES - Visible solo tras transición */}
            {!isTransitioning && (
              <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-black via-black/40 to-transparent transition-all duration-700 z-[60] group-hover:opacity-100">
                  <div className="flex flex-col gap-8">
                      
                      <div className="relative flex flex-col gap-2">
                          <div className="flex justify-between items-end px-1">
                            <span className="font-agency text-[9px] text-white/40 tracking-[0.3em]">INTEL_INTEGRITY: <span className="text-[#2BFF88]">MAXIMAL</span></span>
                            <div className="font-agency text-sm tracking-[0.2em] text-white/90">
                                {currentTimeDisplay} <span className="text-white/20">/</span> {durationDisplay}
                            </div>
                          </div>
                          <input 
                              type="range" min="0" max="100" step="0.01" value={progress} onChange={seek}
                              className="w-full h-1.5 bg-white/10 appearance-none rounded-full cursor-pointer transition-all hover:h-2.5 outline-none"
                              style={{ background: `linear-gradient(to right, ${accentColor} ${progress}%, rgba(255,255,255,0.1) ${progress}%)` }}
                          />
                      </div>

                      <div className="flex items-center justify-between">
                          <div className="flex items-center gap-10">
                              <button 
                                onClick={togglePlay} 
                                className="w-14 h-14 flex items-center justify-center rounded-full border border-white/20 hover:border-white hover:bg-white/10 transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] active:scale-90"
                              >
                                  {isPlaying ? (
                                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                                  ) : (
                                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="ml-1"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                                  )}
                              </button>
                              
                              <div className="hidden lg:flex gap-8 border-l border-white/10 pl-10">
                                <div className="flex flex-col">
                                  <span className="font-agency text-[8px] opacity-40">SAT_UPLINK</span>
                                  <span className="font-agency text-[10px] text-white/80">CONNECTED</span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-agency text-[8px] opacity-40">BANDWIDTH</span>
                                  <span className="font-agency text-[10px] text-[#2BFF88]">500 MB/S</span>
                                </div>
                              </div>
                          </div>
                          
                          <div className="flex items-center gap-6 border-l border-white/10 pl-10">
                              <div className="flex flex-col items-end gap-1">
                                 <span className="font-agency text-[8px] opacity-40">VOL_OUTPUT</span>
                                 <div className="flex items-center gap-4">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-40">
                                      <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                                    </svg>
                                    <input 
                                        type="range" min="0" max="1" step="0.01" value={volume} 
                                        onChange={(e) => { const v = parseFloat(e.target.value); setVolume(v); if(videoRef.current) videoRef.current.volume = v; }}
                                        className="w-28 h-1 accent-[#9B6BFF] cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
                                    />
                                 </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
            )}

            {/* Decoraciones HUD de esquinas */}
            <div className="absolute top-10 left-10 w-12 h-12 border-t-2 border-l-2 opacity-20 pointer-events-none" style={{ borderColor: accentColor }}></div>
            <div className="absolute top-10 right-10 w-12 h-12 border-t-2 border-r-2 opacity-20 pointer-events-none" style={{ borderColor: accentColor }}></div>
            <div className="absolute bottom-10 left-10 w-12 h-12 border-b-2 border-l-2 opacity-20 pointer-events-none" style={{ borderColor: accentColor }}></div>
            <div className="absolute bottom-10 right-10 w-12 h-12 border-b-2 border-r-2 opacity-20 pointer-events-none" style={{ borderColor: accentColor }}></div>
        </div>
      </div>
    </div>
  );
};

export default VideoModalPlayer;

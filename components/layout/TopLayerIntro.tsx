
import React, { useState, useEffect, useRef } from 'react';
import { INTRO_VIDEO_URL } from '../../config/sections';

interface TopLayerIntroProps {
  onEnd: () => void;
}

const TopLayerIntro: React.FC<TopLayerIntroProps> = ({ onEnd }) => {
  const [isEnding, setIsEnding] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnd = () => {
    setIsEnding(true);
    // Give time for the shutter/fade animation before unmounting via parent
    setTimeout(onEnd, 1000);
  };

  const onVideoFinished = () => {
    setVideoEnded(true);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden">
      {/* Main Intro Video */}
      <video
        ref={videoRef}
        src={INTRO_VIDEO_URL}
        autoPlay
        muted
        onEnded={onVideoFinished}
        className={`w-full h-full object-cover transition-all duration-1000 ${
          isEnding ? 'scale-110 blur-xl opacity-0' : videoEnded ? 'brightness-[0.3] scale-105' : 'scale-100'
        }`}
      />
      
      {/* Overlay Content when Video Ends */}
      {videoEnded && !isEnding && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 animate-in fade-in zoom-in duration-700">
            <div className="relative group">
                {/* Decorative scanning corners */}
                <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-[#1FB6FF] shadow-[0_0_15px_#1FB6FF]"></div>
                <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-[#1FB6FF] shadow-[0_0_15px_#1FB6FF]"></div>
                
                <button 
                    onClick={handleEnd}
                    className="glass px-12 py-5 border-2 border-[#1FB6FF] text-[#1FB6FF] font-agency text-2xl tracking-[0.2em] hover:bg-[#1FB6FF] hover:text-black transition-all duration-300 shadow-[0_0_30px_rgba(31,182,255,0.3)] group-hover:shadow-[0_0_50px_rgba(31,182,255,0.5)]"
                >
                    ACCESO_CONCEDIDO // CONTINUAR
                </button>
            </div>
            
            <p className="mt-8 font-agency text-xs text-white/40 tracking-widest animate-pulse">
                ESCANER_BIOMETRICO_COMPLETADO // SISTEMAS_LISTOS
            </p>
        </div>
      )}
      
      {/* Shutter Overlay Transition (Triggered by handleEnd) */}
      <div className={`absolute inset-0 flex pointer-events-none transition-transform duration-700 z-20 ${isEnding ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="w-full h-full glass border-b border-[#1FB6FF] shadow-[0_10px_40px_rgba(31,182,255,0.3)] flex items-center justify-center">
            <div className="font-agency text-4xl text-[#1FB6FF] animate-pulse">
                INICIALIZANDO_HUD_TACTICO...
            </div>
        </div>
      </div>
      
      {/* Skip Button (Only visible while video is playing) */}
      {!videoEnded && !isEnding && (
        <button 
            onClick={handleEnd}
            className="absolute bottom-8 right-8 font-agency text-xs text-white/40 hover:text-[#1FB6FF] border border-white/20 px-4 py-2 hover:border-[#1FB6FF] transition-all z-30"
        >
            OMITIR_INTRO [ESC]
        </button>
      )}
    </div>
  );
};

export default TopLayerIntro;

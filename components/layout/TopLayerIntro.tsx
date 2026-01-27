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
    setTimeout(onEnd, 1000);
  };

  const onVideoFinished = () => {
    setVideoEnded(true);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden">
      <video
        ref={videoRef}
        src={INTRO_VIDEO_URL}
        autoPlay
        muted
        onEnded={onVideoFinished}
        playsInline
        className={`w-full h-full object-cover transition-all duration-1000 ${
          isEnding ? 'scale-110 blur-xl opacity-0' : videoEnded ? 'brightness-[0.3] scale-105' : 'scale-100'
        }`}
      />
      
      {/* Overlay Content: Ajustado para Mobile SM */}
      {videoEnded && !isEnding && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 animate-in fade-in zoom-in duration-700 px-6 text-center">
            <div className="relative group w-full max-w-xs sm:max-w-none flex justify-center">
                {/* Decorative scanning corners: Ocultos en pantallas muy pequeñas para evitar ruido visual */}
                <div className="hidden xs:block absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-[#1FB6FF] shadow-[0_0_15px_#1FB6FF]"></div>
                <div className="hidden xs:block absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-[#1FB6FF] shadow-[0_0_15px_#1FB6FF]"></div>
                
                <button 
                    onClick={handleEnd}
                    className="glass w-full sm:w-auto px-6 sm:px-12 py-4 sm:py-5 border-2 border-[#1FB6FF] text-[#1FB6FF] font-agency text-lg sm:text-2xl tracking-[0.15em] sm:tracking-[0.2em] hover:bg-[#1FB6FF] hover:text-black transition-all duration-300 shadow-[0_0_30px_rgba(31,182,255,0.3)]"
                >
                    {/* Texto adaptativo para evitar desbordamiento */}
                    <span className="block sm:hidden">ACCESO // CONTINUAR</span>
                    <span className="hidden sm:block">ACCESO_CONCEDIDO // CONTINUAR</span>
                </button>
            </div>
            
            <p className="mt-6 sm:mt-8 font-agency text-[10px] sm:text-xs text-white/40 tracking-[0.2em] sm:tracking-widest animate-pulse uppercase">
                ESCANER_COMPLETADO // SISTEMAS_LISTOS
            </p>
        </div>
      )}
      
      {/* Shutter Overlay Transition: Ajuste de tamaño de texto */}
      <div className={`absolute inset-0 flex pointer-events-none transition-transform duration-700 z-20 ${isEnding ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="w-full h-full glass border-b border-[#1FB6FF] shadow-[0_10px_40px_rgba(31,182,255,0.3)] flex items-center justify-center px-6">
            <div className="font-agency text-xl sm:text-4xl text-[#1FB6FF] animate-pulse text-center tracking-tighter sm:tracking-normal">
                INICIALIZANDO_HUD_TACTICO...
            </div>
        </div>
      </div>
      
      {/* Skip Button: Posición optimizada para pulgares en móvil */}
      {!videoEnded && !isEnding && (
        <button 
            onClick={handleEnd}
            className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 font-agency text-[10px] sm:text-xs text-white/40 hover:text-[#1FB6FF] border border-white/20 px-3 py-1.5 sm:px-4 sm:py-2 hover:border-[#1FB6FF] transition-all z-30 bg-black/20 backdrop-blur-sm"
        >
            OMITIR_INTRO
        </button>
      )}
    </div>
  );
};

export default TopLayerIntro;
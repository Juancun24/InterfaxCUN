
import React, { useState } from 'react';
import { VideoData } from '../../types';

interface VideoCarouselProps {
  videos: VideoData[];
  accentColor: string;
  onSelect: (v: VideoData) => void;
}

const VideoCarousel: React.FC<VideoCarouselProps> = ({ videos, accentColor, onSelect }) => {
  const [activeIndex, setActiveIndex] = useState(2); // Start with middle

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % videos.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + videos.length) % videos.length);

  // Safe play handler to manage the promise returned by video.play()
  const handleMouseEnter = (e: React.MouseEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Interruption handled: ignore the error that occurs when pause() is called before play() resolves
      });
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLVideoElement>, isActive: boolean) => {
    const video = e.currentTarget;
    if (!isActive) {
      video.pause();
    } else {
      // For active video, we keep it playing but might reset if specific behavior is desired
      // Here we keep it simple to avoid state conflicts
    }
  };

  return (
    <div className="relative w-full py-10 overflow-hidden">
      <div className="flex items-center justify-center min-h-[350px] relative">
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
                absolute transition-all duration-500 cursor-pointer overflow-hidden rounded-xl border-2
                ${isActive ? 'z-30 w-full max-w-lg md:scale-110' : 'z-20 w-1/3 max-w-xs scale-90 opacity-60 blur-[1px]'}
                ${position === -1 ? '-translate-x-1/2 -rotate-y-10' : position === 1 ? 'translate-x-1/2 rotate-y-10' : ''}
                ${isFar ? 'opacity-0 scale-50 pointer-events-none' : ''}
              `}
              style={{ 
                borderColor: isActive ? accentColor : 'rgba(255,255,255,0.1)',
                boxShadow: isActive ? `0 0 30px ${accentColor}44` : 'none',
                transform: `translateX(${position * 110}%) scale(${isActive ? 1.1 : 0.85}) rotateY(${position * 15}deg)`
              }}
            >
              <div className="relative aspect-video">
                {/* Video Preview: Local video muted loop with safe promise handling */}
                <video 
                    src={video.url} 
                    muted 
                    loop 
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={(e) => handleMouseLeave(e, isActive)}
                    poster={video.thumbnail}
                    className="w-full h-full object-cover"
                />
                
                {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 pointer-events-none">
                        <h4 className="font-agency text-xl mb-1">{video.title}</h4>
                        <p className="text-[10px] font-agency opacity-60">ACCESS_GRANTED // CLICK_TO_EXPAND</p>
                    </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="mt-12 flex items-center justify-center gap-10">
        <button 
            onClick={handlePrev}
            className="p-3 glass rounded-full hover:text-[#1FB6FF] border-white/10 hover:border-[#1FB6FF] transition-all"
        >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>

        <div className="flex gap-2">
            {videos.map((_, i) => (
                <div 
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`h-1 transition-all rounded-full cursor-pointer ${i === activeIndex ? 'w-8' : 'w-2 bg-white/10'}`}
                    style={{ backgroundColor: i === activeIndex ? accentColor : undefined }}
                />
            ))}
        </div>

        <button 
            onClick={handleNext}
            className="p-3 glass rounded-full hover:text-[#1FB6FF] border-white/10 hover:border-[#1FB6FF] transition-all"
        >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>
    </div>
  );
};

export default VideoCarousel;

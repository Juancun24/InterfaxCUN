// components/video/VideoProgressIndicator.tsx

import React from 'react';

interface VideoProgressIndicatorProps {
  progress: number; // 0-100
  completed: boolean;
  accentColor: string;
  size?: 'small' | 'medium' | 'large';
  style?: 'circular' | 'linear';
}

const VideoProgressIndicator: React.FC<VideoProgressIndicatorProps> = ({
  progress,
  completed,
  accentColor,
  size = 'medium',
  style = 'circular'
}) => {
  // Tamaños
  const sizes = {
    small: { circle: 40, stroke: 3, icon: 14 },
    medium: { circle: 56, stroke: 4, icon: 20 },
    large: { circle: 72, stroke: 5, icon: 28 }
  };
  
  const { circle: circleSize, stroke: strokeWidth, icon: iconSize } = sizes[size];
  const radius = (circleSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  
  // Estados
  const isNotStarted = progress === 0;
  const isInProgress = progress > 0 && !completed;
  
  if (style === 'linear') {
    return (
      <div className="w-full">
        {/* LINEAR BAR STYLE */}
        <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden">
          {/* Background scanline effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-scanline" />
          
          {/* Progress bar */}
          <div
            className={`h-full transition-all duration-500 relative ${
              completed 
                ? 'bg-gradient-to-r' 
                : isInProgress 
                  ? 'bg-gradient-to-r'
                  : 'bg-white/5'
            }`}
            style={{
              width: `${progress}%`,
              backgroundImage: completed
                ? `linear-gradient(90deg, ${accentColor}, ${accentColor}DD)`
                : isInProgress
                  ? `linear-gradient(90deg, ${accentColor}88, ${accentColor})`
                  : undefined,
              boxShadow: isInProgress || completed
                ? `0 0 10px ${accentColor}66`
                : 'none'
            }}
          >
            {/* Glowing edge */}
            {isInProgress && (
              <div 
                className="absolute right-0 top-0 bottom-0 w-1 animate-pulse"
                style={{ 
                  background: accentColor,
                  boxShadow: `0 0 8px ${accentColor}, 0 0 4px ${accentColor}`
                }}
              />
            )}
          </div>
          
          {/* Completion check */}
          {completed && (
            <div 
              className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 flex items-center justify-center rounded-full"
              style={{ backgroundColor: accentColor }}
            >
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="4">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          )}
        </div>
        
        {/* Progress text */}
        <div className="mt-1 flex items-center justify-between text-[8px] font-agency tracking-wider">
          <span className={completed ? 'text-[#2BFF88]' : 'text-white/40'}>
          </span>
          <span className="text-white/60">{Math.round(progress)}%</span>
        </div>
      </div>
    );
  }
  
  // CIRCULAR STYLE (Default)
  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Outer glow */}
      {(isInProgress || completed) && (
        <div 
          className="absolute inset-0 rounded-full animate-pulse"
          style={{
            background: `radial-gradient(circle, ${accentColor}22 0%, transparent 70%)`,
            filter: 'blur(8px)'
          }}
        />
      )}
      
      <svg width={circleSize} height={circleSize} className="relative transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={circleSize / 2}
          cy={circleSize / 2}
          r={radius}
          stroke={isNotStarted ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.15)'}
          strokeWidth={strokeWidth}
          fill="none"
          className={isNotStarted ? '' : 'opacity-50'}
        />
        
        {/* Corner markers (tactical style) */}
        {!completed && (
          <>
            <line 
              x1={strokeWidth} 
              y1={strokeWidth} 
              x2={strokeWidth + 8} 
              y2={strokeWidth} 
              stroke="rgba(255,255,255,0.2)" 
              strokeWidth="1" 
            />
            <line 
              x1={strokeWidth} 
              y1={strokeWidth} 
              x2={strokeWidth} 
              y2={strokeWidth + 8} 
              stroke="rgba(255,255,255,0.2)" 
              strokeWidth="1" 
            />
          </>
        )}
        
        {/* Progress circle */}
        {(isInProgress || completed) && (
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            stroke={accentColor}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-500"
            style={{
              filter: `drop-shadow(0 0 4px ${accentColor})`,
              opacity: completed ? 1 : 0.9
            }}
          />
        )}
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {completed ? (
          // COMPLETED: Check icon
          <div 
            className="flex items-center justify-center rounded-full animate-in zoom-in duration-300"
            style={{ 
              width: iconSize + 4, 
              height: iconSize + 4,
              backgroundColor: `${accentColor}33`,
              border: `2px solid ${accentColor}`
            }}
          >
            <svg 
              width={iconSize} 
              height={iconSize} 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke={accentColor} 
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        ) : isInProgress ? (
          // IN PROGRESS: Percentage
          <div className="text-center">
            <div 
              className="font-agency font-bold tracking-tighter leading-none"
              style={{ 
                fontSize: size === 'small' ? '10px' : size === 'medium' ? '13px' : '16px',
                color: accentColor,
                textShadow: `0 0 8px ${accentColor}88`
              }}
            >
              {Math.round(progress)}
            </div>
            <div 
              className="font-agency text-[6px] tracking-wider opacity-60"
              style={{ color: accentColor }}
            >
              %
            </div>
          </div>
        ) : (
          // NOT STARTED: Lock icon
          <svg 
            width={iconSize} 
            height={iconSize} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="rgba(255,255,255,0.3)" 
            strokeWidth="2"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        )}
      </div>
      
      {/* Scanning animation for in-progress */}
      {isInProgress && (
        <div 
          className="absolute inset-0 rounded-full border-2 animate-ping"
          style={{ 
            borderColor: `${accentColor}44`,
            animationDuration: '2s'
          }}
        />
      )}
    </div>
  );
};

export default VideoProgressIndicator;

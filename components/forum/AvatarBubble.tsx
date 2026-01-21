
import React from 'react';

interface AvatarBubbleProps {
  src: string;
  name: string;
}

const AvatarBubble: React.FC<AvatarBubbleProps> = ({ src, name }) => {
  return (
    <div className="relative shrink-0">
      <div className="w-10 h-10 rounded-full border-2 border-[#00E5FF] p-0.5 shadow-[0_0_10px_rgba(0,229,255,0.3)]">
        <img src={src} alt={name} className="w-full h-full rounded-full object-cover grayscale brightness-125" />
      </div>
      
      {/* Decorative HUD Elements */}
      <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-[#00E5FF]"></div>
      <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-[#00E5FF]"></div>

      {/* Pop-up tooltip simulation */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="bg-[#00E5FF] text-black font-agency text-[8px] px-2 py-0.5 rounded">
            LEVEL_9_OPERATIVE
        </div>
      </div>
    </div>
  );
};

export default AvatarBubble;

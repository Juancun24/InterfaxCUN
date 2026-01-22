
// src/components/chatbot/ChatbotFab.tsx
import React from 'react';

interface ChatbotFabProps {
  isOpen: boolean;
  accentColor: string;
  onClick: () => void;
}

const ChatbotFab: React.FC<ChatbotFabProps> = ({ isOpen, accentColor, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={`
        fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center z-[70] transition-all duration-300
        ${isOpen ? 'rotate-90 scale-90 opacity-50' : 'hover:scale-110'}
        glass border-2
      `}
      style={{ 
        borderColor: `${accentColor}88`,
        boxShadow: `0 0 20px ${accentColor}44`
      }}
    >
      <div className="relative">
        {isOpen ? (
          <img
            src="https://res.cloudinary.com/dknmovwrt/image/upload/v1769089546/fokiweb_g4g7fd.gif" // ✅ EDIT HERE: GIF cuando está abierto
            alt="Close chatbot"
            className="w-18 h-18 object-contain"
            draggable={false}
          />
        ) : (
          <>
            <img
              src="https://res.cloudinary.com/dknmovwrt/image/upload/v1769089546/fokiweb_g4g7fd.gif" // ✅ EDIT HERE: GIF cuando está cerrado
              alt="Open chatbot"
              className="w-16 h-16 object-contain"
              draggable={false}
            /> 
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#2BFF88] rounded-full border-2 border-[#0B0F1A] animate-pulse"></div>
          </>
        )}
      </div>
      
      {/* Decorative pulse glow */}
      {!isOpen && (
        <div 
          className="absolute inset-0 rounded-full animate-ping opacity-20 pointer-events-none"
          style={{ backgroundColor: accentColor }}
        ></div>
      )}
    </button>
  );
};

export default ChatbotFab;

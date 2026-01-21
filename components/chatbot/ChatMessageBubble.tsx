
// src/components/chatbot/ChatMessageBubble.tsx
import React from 'react';
import { Message } from './useChatbot';

interface ChatMessageBubbleProps {
  message: Message;
  accentColor: string;
}

const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({ message, accentColor }) => {
  const isBot = message.sender === 'bot';

  const typeStyles = {
    INFO: 'border-white/10',
    ALERT: 'border-red-500/30 text-red-200',
    MISSION: 'border-[#9B6BFF33] text-[#E6ECFF]',
    SYSTEM: 'border-[#1FB6FF33] text-[#1FB6FF]'
  };

  return (
    <div className={`flex flex-col ${isBot ? 'items-start' : 'items-end'} gap-1 max-w-[85%] ${isBot ? 'mr-auto' : 'ml-auto'}`}>
      <div className="flex items-center gap-2 px-1">
        {isBot && <span className="font-agency text-[8px] opacity-40">OPS_AID</span>}
        <span className="text-[8px] opacity-20 font-mono tracking-tighter">{message.timestamp}</span>
        {!isBot && <span className="font-agency text-[8px] opacity-40">OPERATIVE</span>}
      </div>
      
      <div 
        className={`
          glass p-3 rounded-2xl text-[11px] leading-relaxed border transition-all
          ${isBot ? 'rounded-tl-none' : 'rounded-tr-none'}
          ${typeStyles[message.type]}
        `}
        style={{ 
          borderColor: !isBot ? `${accentColor}44` : undefined,
          backgroundColor: !isBot ? `${accentColor}11` : undefined
        }}
      >
        {isBot && (
          <div className="flex items-center gap-1.5 mb-1 mb-1">
            <div className={`w-1 h-1 rounded-full ${message.type === 'ALERT' ? 'bg-red-500' : 'bg-[#9B6BFF]'}`}></div>
            <span className="font-agency text-[8px] opacity-50 tracking-[0.2em]">{message.type}</span>
          </div>
        )}
        <div className="whitespace-pre-wrap font-sans tracking-wide">
          {message.text}
        </div>
      </div>
    </div>
  );
};

export default ChatMessageBubble;


// src/components/chatbot/ChatbotPanel.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useChatbot } from './useChatbot';
import ChatMessageBubble from './ChatMessageBubble';
import { SectionConfig } from '../../types';

interface ChatbotPanelProps {
  activeSection?: SectionConfig;
  accentColor: string;
  onClose: () => void;
}

const ChatbotPanel: React.FC<ChatbotPanelProps> = ({ activeSection, accentColor, onClose }) => {
  const { messages, isTyping, sendMessage } = useChatbot(activeSection);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  const handleQuickCommand = (cmd: string) => {
    sendMessage(cmd);
  };

  return (
    <div className="fixed bottom-24 right-6 w-[360px] md:w-[420px] max-h-[600px] h-[80vh] flex flex-col glass rounded-3xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] z-[60] overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
      {/* Header HUD */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-[#2BFF88] animate-pulse"></div>
            <div className="absolute inset-0 w-2 h-2 rounded-full bg-[#2BFF88] animate-ping opacity-40"></div>
          </div>
          <div>
            <h4 className="font-agency text-xs tracking-[0.2em] text-white">SEALABOT</h4>
            <span className="text-[9px] font-agency opacity-40 uppercase">Canal_Seguro //Activo</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/40 hover:text-white">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      </div>

      {/* Message Feed */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-black/10">
        {messages.map((msg) => (
          <ChatMessageBubble key={msg.id} message={msg} accentColor={accentColor} />
        ))}
        {isTyping && (
          <div className="flex items-center gap-2 p-2 opacity-50">
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-white rounded-full animate-bounce"></div>
              <div className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
            <span className="font-agency text-[8px]">RESPUESTA_CIFRADA...</span>
          </div>
        )}
      </div>

      {/* Quick Chips */}
      <div className="px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar border-t border-white/5">
        {['/ayuda', '/seccion', '/videos', 'borrar'].map(chip => (
          <button 
            key={chip}
            onClick={() => handleQuickCommand(chip.startsWith('/') ? chip : `/${chip.toLowerCase()}`)}
            className="shrink-0 px-3 py-1 glass border border-white/10 rounded-full font-agency text-[8px] hover:border-[#1FB6FF] hover:text-[#1FB6FF] transition-all"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input Composer */}
      <div className="p-4 bg-white/[0.02] border-t border-white/10">
        <div className="relative">
          <input 
            ref={inputRef}
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="ENTER_TACTICAL_COMMAND..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 font-agency text-[10px] tracking-widest focus:outline-none focus:border-[#1FB6FF] transition-all"
          />
          <button 
            onClick={handleSend}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#1FB6FF] hover:scale-110 transition-transform"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </div>
        <div className="mt-2 flex justify-between px-1">
          <span className="text-[8px] font-agency opacity-20">Sistema_ID: ALPHA</span>
          <span className="text-[8px] font-agency opacity-20">SHIFT+ENTER para nueva linea</span>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPanel;

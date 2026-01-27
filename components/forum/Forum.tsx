import React, { useState } from 'react';
import { ForumMessage } from '../../types';
import AvatarBubble from './AvatarBubble';

const MOCK_MESSAGES: ForumMessage[] = [
  { id: '1', user: 'Agent_Zero', avatar: 'https://picsum.photos/seed/a1/100/100', text: 'Operational intel suggests heavy encryption on the west sector.', timestamp: '12:04' },
  { id: '2', user: 'Shadow_Walker', avatar: 'https://picsum.photos/seed/a2/100/100', text: 'Confirmed. I have deployed localized EMP bursts.', timestamp: '12:15' },
];

const Forum: React.FC = () => {
  const [messages, setMessages] = useState<ForumMessage[]>(MOCK_MESSAGES);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMessage: ForumMessage = {
      id: Date.now().toString(),
      user: 'YOU_OPERATIVE',
      avatar: 'https://picsum.photos/seed/me/100/100',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMessage]);
    setInputText('');
  };

  return (
    <div className="glass rounded-2xl overflow-hidden border border-[#00E5FF22] flex flex-col min-h-[450px] sm:min-h-[500px]">
        {/* Header - Ajustado padding y tamaño de texto */}
        <div className="bg-[#00E5FF11] p-3 sm:p-4 flex items-center justify-between border-b border-[#00E5FF22]">
            <span className="font-agency text-[10px] sm:text-sm text-[#00E5FF] tracking-[0.2em]">CANAL_SEGURO_ACTIVADO:</span>
            <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-ping text-center"></div>
                <span className="text-[9px] sm:text-[10px] font-agency opacity-50 uppercase">En Línea</span>
            </div>
        </div>

        {/* Feed - Padding reducido en móvil para ganar espacio horizontal */}
        <div className="flex-1 p-3 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto max-h-[400px]">
            {messages.map((msg) => (
                <div key={msg.id} className="flex gap-2 sm:gap-4 group">
                    <div className="flex-shrink-0 scale-90 sm:scale-100">
                        <AvatarBubble src={msg.avatar} name={msg.user} />
                    </div>
                    <div className="flex-1 min-w-0"> {/* min-w-0 evita que el texto empuje el layout */}
                        <div className="flex items-baseline gap-2 sm:gap-3 mb-1">
                            <span className="font-agency text-[10px] sm:text-xs text-[#00E5FF] truncate">{msg.user}</span>
                            <span className="text-[8px] sm:text-[9px] opacity-40">{msg.timestamp}</span>
                        </div>
                        <div className="p-2 sm:p-3 glass rounded-lg rounded-tl-none border border-white/5 text-xs sm:text-sm leading-relaxed text-[#9AA4C7] break-words">
                            {msg.text}
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Input - Cambio a disposición vertical en pantallas muy pequeñas si es necesario */}
        <div className="p-3 sm:p-6 border-t border-white/5 bg-black/20">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <input 
                    type="text" 
                    placeholder="INTRODUCIR_MENSAJE..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 sm:px-4 sm:py-3 font-agency text-[10px] sm:text-xs focus:border-[#00E5FF] focus:outline-none transition-all"
                />
                <button 
                    onClick={handleSend}
                    className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 bg-[#00E5FF11] border border-[#00E5FF] text-[#00E5FF] font-agency text-[10px] sm:text-xs hover:bg-[#00E5FF] hover:text-black transition-all rounded-lg uppercase tracking-widest"
                >
                    Enviar
                </button>
            </div>
        </div>
    </div>
  );
};

export default Forum;
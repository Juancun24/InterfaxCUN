
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
    <div className="glass rounded-2xl overflow-hidden border border-[#00E5FF22] flex flex-col min-h-[500px]">
        {/* Header */}
        <div className="bg-[#00E5FF11] p-4 flex items-center justify-between border-b border-[#00E5FF22]">
            <span className="font-agency text-sm text-[#00E5FF] tracking-widest">ACTIVE_SECURE_CHANNEL: 0x93F</span>
            <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-[#00E5FF] animate-ping"></div>
                <span className="text-[10px] font-agency opacity-50">SYNCED</span>
            </div>
        </div>

        {/* Feed */}
        <div className="flex-1 p-6 space-y-6 overflow-y-auto max-h-[400px]">
            {messages.map((msg) => (
                <div key={msg.id} className="flex gap-4 group">
                    <AvatarBubble src={msg.avatar} name={msg.user} />
                    <div className="flex-1">
                        <div className="flex items-baseline gap-3 mb-1">
                            <span className="font-agency text-xs text-[#00E5FF]">{msg.user}</span>
                            <span className="text-[9px] opacity-40">{msg.timestamp}</span>
                        </div>
                        <div className="p-3 glass rounded-lg rounded-tl-none border border-white/5 text-sm leading-relaxed text-[#9AA4C7]">
                            {msg.text}
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Input */}
        <div className="p-6 border-t border-white/5 bg-black/20">
            <div className="flex gap-4">
                <input 
                    type="text" 
                    placeholder="ENTER_ENCRYPTED_MESSAGE..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 font-agency text-xs focus:border-[#00E5FF] focus:outline-none transition-all"
                />
                <button 
                    onClick={handleSend}
                    className="px-6 py-3 bg-[#00E5FF11] border border-[#00E5FF] text-[#00E5FF] font-agency text-xs hover:bg-[#00E5FF] hover:text-black transition-all rounded-lg"
                >
                    SEND_ENCRYPTED
                </button>
            </div>
        </div>
    </div>
  );
};

export default Forum;

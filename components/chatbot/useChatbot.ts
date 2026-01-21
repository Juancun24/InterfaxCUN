
// src/components/chatbot/useChatbot.ts
import { useState, useEffect } from 'react';
import { BOT_CONFIG } from '../../config/chatbot.config';
import { processInput, BotResponse } from './botEngine';
import { SectionConfig } from '../../types';

export interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  type: 'INFO' | 'ALERT' | 'MISSION' | 'SYSTEM';
}

export const useChatbot = (activeSection?: SectionConfig) => {
  const [isOpen, setIsOpen] = useState(() => localStorage.getItem('ops_chatbot_open') === 'true');
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('ops_chatbot_history');
    if (saved) return JSON.parse(saved);
    return [{
      id: 'init',
      sender: 'bot',
      text: BOT_CONFIG.defaultGreeting,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'SYSTEM'
    }];
  });
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    localStorage.setItem('ops_chatbot_open', isOpen.toString());
  }, [isOpen]);

  useEffect(() => {
    localStorage.setItem('ops_chatbot_history', JSON.stringify(messages.slice(-BOT_CONFIG.maxHistory)));
  }, [messages]);

  const addMessage = (sender: 'user' | 'bot', text: string, type: Message['type'] = 'INFO') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  };

  const sendMessage = async (input: string) => {
    if (!input.trim()) return;
    
    addMessage('user', input, 'INFO');
    setIsTyping(true);

    const delay = Math.floor(Math.random() * (BOT_CONFIG.typingDelay.max - BOT_CONFIG.typingDelay.min) + BOT_CONFIG.typingDelay.min);
    
    setTimeout(() => {
      const response = processInput(input, activeSection);
      setIsTyping(false);
      
      if (response.action === 'CLEAR') {
        setMessages([{
          id: 'reboot',
          sender: 'bot',
          text: "LOCAL_HISTORY_PURGED. ENCRYPTION_RESET.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'SYSTEM'
        }]);
      } else {
        addMessage('bot', response.text, response.type);
        
        // --- ACCIONES FUNCIONALES EN EL DOM ---
        if (response.action === 'SCROLL_FORO') {
          setTimeout(() => {
            const el = document.getElementById('secure-comms');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
        if (response.action === 'FOCUS_CONTACT') {
          setTimeout(() => {
            const el = document.getElementById('contact-module');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 100);
        }
      }
    }, delay);
  };

  return {
    isOpen,
    setIsOpen,
    messages,
    isTyping,
    sendMessage,
  };
};

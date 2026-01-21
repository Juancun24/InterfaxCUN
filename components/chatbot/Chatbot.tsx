
// src/components/chatbot/Chatbot.tsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SECTIONS } from '../../config/sections';
import ChatbotFab from './ChatbotFab';
import ChatbotPanel from './ChatbotPanel';

const Chatbot: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(() => localStorage.getItem('ops_chatbot_open') === 'true');
  
  const currentSection = SECTIONS.find(s => `/${s.path}` === location.pathname);
  const accentColor = currentSection?.accentColor || '#1FB6FF';

  useEffect(() => {
    localStorage.setItem('ops_chatbot_open', isOpen.toString());
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <ChatbotFab 
        isOpen={isOpen} 
        accentColor={accentColor} 
        onClick={() => setIsOpen(!isOpen)} 
      />
      {isOpen && (
        <ChatbotPanel 
          activeSection={currentSection} 
          accentColor={accentColor} 
          onClose={() => setIsOpen(false)} 
        />
      )}
    </>
  );
};

export default Chatbot;

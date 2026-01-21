
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TopLayerIntro from './components/layout/TopLayerIntro';
import Sidebar from './components/layout/Sidebar';
import HomeCards from './components/home/HomeCards';
import SectionPage from './components/section/SectionPage';
import Chatbot from './components/chatbot/Chatbot';
import { SECTIONS } from './config/sections';

const App: React.FC = () => {
  const [isIntroFinished, setIsIntroFinished] = useState(false);
  const [showMainUI, setShowMainUI] = useState(false);

  const handleIntroEnd = () => {
    setIsIntroFinished(true);
    // Slight delay for the "shutter" transition effect
    setTimeout(() => setShowMainUI(true), 800);
  };

  return (
    <Router>
      <div className="relative w-full h-screen bg-[#0B0F1A] overflow-hidden text-[#E6ECFF] font-sans selection:bg-[#1FB6FF] selection:text-white">
        
        {/* Particles Background Overlay (CSS Only) */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#1FB6FF] rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#9B6BFF] rounded-full blur-[100px] animate-pulse delay-700"></div>
        </div>

        {/* HUD Scanline Effect */}
        <div className="scanline absolute inset-0 pointer-events-none z-50"></div>

        {!isIntroFinished && <TopLayerIntro onEnd={handleIntroEnd} />}

        {showMainUI && (
          <div className="flex w-full h-full transition-opacity duration-1000 opacity-100">
            <Sidebar />
            
            <main className="flex-1 relative overflow-y-auto overflow-x-hidden">
              <Routes>
                <Route path="/" element={<HomeCards />} />
                {SECTIONS.map(section => (
                  <Route 
                    key={section.id} 
                    path={`/${section.path}`} 
                    element={<SectionPage section={section} />} 
                  />
                ))}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            {/* Global Tactical Assistant */}
            <Chatbot />
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
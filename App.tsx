
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // ← LINEA RESPONSIVE

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
          <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-64 md:h-64 lg:w-96 lg:h-96 bg-[#1FB6FF] rounded-full blur-[60px] md:blur-[100px] lg:blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 bg-[#9B6BFF] rounded-full blur-[50px] md:blur-[80px] lg:blur-[100px] animate-pulse delay-700"></div>
        </div>

        {/* HUD Scanline Effect */}
        <div className="scanline absolute inset-0 pointer-events-none z-50"></div>

        {!isIntroFinished && <TopLayerIntro onEnd={handleIntroEnd} />}

        {showMainUI && (
          <div className="flex w-full h-full transition-opacity duration-1000 opacity-100">
                    
      {/* 🍔 HAMBURGER BUTTON - Solo visible en móvil */}
      <button
        onClick={() => setIsMobileMenuOpen?.(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-[100] glass p-3 rounded-lg border border-white/20 hover:border-[#1FB6FF]/80 transition-all shadow-lg backdrop-blur-md"
        aria-label="Toggle menu"
        style={{ 
          backgroundColor: 'rgba(18, 26, 47, 0.95)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
        }}
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <span 
            className={`w-full h-0.5 bg-[#1FB6FF] transition-all duration-300 ${
              isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          ></span>
          <span 
            className={`w-full h-0.5 bg-[#1FB6FF] transition-all duration-300 ${
              isMobileMenuOpen ? 'opacity-0' : ''
            }`}
          ></span>
          <span 
            className={`w-full h-0.5 bg-[#1FB6FF] transition-all duration-300 ${
              isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          ></span>
        </div>
      </button>

          <Sidebar 
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />

          {/* Overlay para cerrar menú móvil */}
          {isMobileMenuOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}
            
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
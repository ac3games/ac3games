import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { GamesCatalog } from './components/GamesCatalog';
import { CodexViewer } from './components/CodexViewer';
import { RoadmapSection } from './components/RoadmapSection';
import { StudioAbout } from './components/StudioAbout';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-cyber-dark text-slate-200 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <GamesCatalog />
        <CodexViewer />
        <RoadmapSection />
        <StudioAbout />
      </main>
      <Footer />
    </div>
  );
};

export default App;

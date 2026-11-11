import React, { useState } from 'react';
import { Gamepad2, Layers, Compass, Info, Menu, X, ExternalLink } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-cyber-dark/80 border-b border-cyber-cardBorder/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Studio */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 flex items-center justify-center bg-cyber-card rounded-lg border border-cyber-cyan/40 group-hover:border-cyber-cyan group-hover:shadow-neon-cyan transition-all">
              <span className="font-orbitron font-extrabold text-cyber-cyan text-xl tracking-tighter">AC3</span>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyber-neonPink rounded-full animate-ping"></span>
            </div>
            <div className="flex flex-col">
              <span className="font-orbitron font-bold text-lg tracking-wider text-white group-hover:text-cyber-cyan transition-colors">
                AC3<span className="text-cyber-cyan">GAMES</span>
              </span>
              <span className="font-mono text-[10px] tracking-widest text-slate-400">
                GEOMETRY UNIVERSE
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 font-outfit text-sm font-medium">
            <a href="#games" className="flex items-center gap-2 text-slate-300 hover:text-cyber-cyan transition-colors">
              <Gamepad2 className="w-4 h-4 text-cyber-cyan" />
              <span>Franquia Geometry</span>
            </a>
            <a href="#codex" className="flex items-center gap-2 text-slate-300 hover:text-cyber-neonPurple transition-colors">
              <Layers className="w-4 h-4 text-cyber-neonPurple" />
              <span>Biblioteca & Codex</span>
            </a>
            <a href="#roadmap" className="flex items-center gap-2 text-slate-300 hover:text-cyber-neonAmber transition-colors">
              <Compass className="w-4 h-4 text-cyber-neonAmber" />
              <span>Roadmap 2027</span>
            </a>
            <a href="#about" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
              <Info className="w-4 h-4 text-slate-400" />
              <span>Sobre a AC3games</span>
            </a>
          </nav>

          {/* Steam Call to Action */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://store.steampowered.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg bg-cyber-card border border-cyber-cyan/40 hover:border-cyber-cyan text-cyber-cyan font-mono text-xs font-semibold tracking-wider hover:shadow-neon-cyan transition-all flex items-center gap-2"
            >
              <span>WISHLIST NA STEAM</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-cyber-card"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-cyber-darker border-b border-cyber-cardBorder px-4 pt-3 pb-6 space-y-3 font-outfit">
          <a
            href="#games"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-slate-200 hover:bg-cyber-card hover:text-cyber-cyan"
          >
            Franquia Geometry
          </a>
          <a
            href="#codex"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-slate-200 hover:bg-cyber-card hover:text-cyber-neonPurple"
          >
            Biblioteca & Codex
          </a>
          <a
            href="#roadmap"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-slate-200 hover:bg-cyber-card hover:text-cyber-neonAmber"
          >
            Roadmap 2027
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-slate-200 hover:bg-cyber-card hover:text-white"
          >
            Sobre a AC3games
          </a>
          <div className="pt-2">
            <a
              href="https://store.steampowered.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center block px-4 py-2.5 rounded-lg bg-cyber-cyan text-black font-mono text-xs font-bold"
            >
              WISHLIST NA STEAM
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

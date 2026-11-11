import React from 'react';
import { Globe, Shield, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-cyber-darker border-t border-cyber-cardBorder/60 py-12 font-outfit text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-cyber-cardBorder/40">
          
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 flex items-center justify-center bg-cyber-card rounded-lg border border-cyber-cyan/30 text-cyber-cyan font-orbitron font-extrabold text-sm">
              AC3
            </div>
            <div>
              <span className="font-orbitron font-bold text-base text-white tracking-wider block">
                AC3<span className="text-cyber-cyan">GAMES</span>
              </span>
              <span className="text-xs text-slate-500 font-mono">
                Geometry Franchise Studios // 2026 - 2027
              </span>
            </div>
          </div>

          {/* Social / External Links */}
          <div className="flex items-center gap-6 font-mono text-xs">
            <a
              href="https://github.com/ac3games-dev/ac3games"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-cyber-cyan transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              <span>github.com/ac3games-dev</span>
            </a>
            <a
              href="https://store.steampowered.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-cyber-neonPurple transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span>Steam Store</span>
            </a>
            <a
              href="#about"
              className="flex items-center gap-2 hover:text-cyber-neonAmber transition-colors"
            >
              <Shield className="w-4 h-4" />
              <span>Imprensa & Contato</span>
            </a>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-4">
          <p>© 2026 AC3games. Todos os direitos reservados. Franquia Geometry.</p>
          <p className="flex items-center gap-1.5">
            <span>Desenvolvido com</span>
            <Heart className="w-3.5 h-3.5 text-cyber-neonPink fill-cyber-neonPink" />
            <span>e alta precisão vetorial</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

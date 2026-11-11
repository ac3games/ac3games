import React, { useState } from 'react';
import { GAMES_DATA } from '../data/gamesData';
import { GameItem } from '../types';
import { Gamepad2, Sparkles, CheckCircle2, ChevronRight, ExternalLink } from 'lucide-react';

export const GamesCatalog: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<GameItem>(GAMES_DATA[0]!);

  return (
    <section id="games" className="py-24 relative overflow-hidden bg-cyber-darker">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-cyber-cardBorder/60 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-cyber-cyan font-mono text-xs font-semibold tracking-wider uppercase mb-2">
              <Gamepad2 className="w-4 h-4" />
              <span>CATÁLOGO DE TÍTULOS AC3GAMES</span>
            </div>
            <h2 className="font-orbitron font-extrabold text-3xl sm:text-4xl text-white">
              A Franquia <span className="text-cyber-cyan">Geometry</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 font-outfit text-slate-400 text-sm max-w-md">
            Inspirada na arquitetura de portais modernos como Amazon Luna, explore nosso universo conectado de experiências de precisão e ação neo-arcade.
          </p>
        </div>

        {/* Luna-Style Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Game Selection Cards (Left / 5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {GAMES_DATA.map((game) => {
              const isSelected = selectedGame.id === game.id;
              const isAvailable = game.status === 'available';

              return (
                <div
                  key={game.id}
                  onClick={() => setSelectedGame(game)}
                  className={`p-5 rounded-2xl cursor-pointer transition-all border text-left relative overflow-hidden ${
                    isSelected
                      ? 'bg-cyber-card border-cyber-cyan shadow-neon-cyan/30 translate-x-2'
                      : 'bg-cyber-dark/90 border-cyber-cardBorder hover:border-slate-700 hover:bg-cyber-card/60'
                  }`}
                >
                  {/* Active Indicator Bar */}
                  {isSelected && (
                    <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-cyber-cyan to-cyber-neonPink" />
                  )}

                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        isAvailable
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      }`}
                    >
                      {game.badge}
                    </span>
                    <span className="font-mono text-xs text-slate-500">{game.releaseYear}</span>
                  </div>

                  <h3 className="font-orbitron font-bold text-xl text-white group-hover:text-cyber-cyan transition-colors">
                    {game.title}
                  </h3>
                  <p className="font-outfit text-slate-400 text-xs mt-1 line-clamp-1">
                    {game.subtitle}
                  </p>

                  <div className="mt-4 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>{game.genre}</span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-cyber-cyan translate-x-1' : 'text-slate-600'}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Featured Game Spotlight (Right / 7 Cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl p-8 bg-gradient-to-b from-cyber-card to-cyber-dark border border-cyber-cardBorder relative overflow-hidden shadow-2xl">
              
              {/* Glow Accent */}
              <div 
                className="absolute top-0 right-0 w-80 h-80 blur-[100px] pointer-events-none opacity-20"
                style={{ backgroundColor: selectedGame.accentColor }}
              />

              {/* Title & Badge */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-cyber-dark border border-cyber-cardBorder text-cyber-cyan">
                  {selectedGame.genre}
                </span>
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-cyber-dark border border-cyber-cardBorder text-slate-400">
                  Lançamento: {selectedGame.releaseYear}
                </span>
              </div>

              <h3 className="font-orbitron font-extrabold text-3xl sm:text-4xl text-white mb-2">
                {selectedGame.title}
              </h3>
              <p className="font-orbitron text-sm text-cyber-cyan mb-6 tracking-wide">
                {selectedGame.subtitle}
              </p>

              {/* Description */}
              <p className="font-outfit text-slate-300 text-base leading-relaxed mb-8">
                {selectedGame.description}
              </p>

              {/* Features List */}
              <div className="mb-8">
                <h4 className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-cyber-neonAmber" />
                  <span>Destaques Técnicos & Mecânicas</span>
                </h4>
                <div className="space-y-2.5">
                  {selectedGame.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-cyber-cyan shrink-0 mt-0.5" />
                      <span className="font-outfit text-sm text-slate-200">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-cyber-cardBorder">
                {selectedGame.status === 'available' ? (
                  <>
                    <a
                      href={selectedGame.steamUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-xl bg-cyber-cyan hover:bg-cyan-300 text-black font-orbitron font-bold text-xs tracking-wider shadow-neon-cyan transition-all flex items-center gap-2"
                    >
                      <span>COMPRAR / WISHLIST NA STEAM</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="#codex"
                      className="px-6 py-3 rounded-xl bg-cyber-card hover:bg-cyber-cardBorder border border-cyber-cardBorder text-slate-200 font-orbitron text-xs tracking-wider transition-all"
                    >
                      VER NO CODEX DIGITAL
                    </a>
                  </>
                ) : (
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs font-semibold px-4 py-2.5 rounded-xl bg-purple-950/60 border border-purple-500/40 text-purple-300">
                      🔒 PREVISTO PARA O ROADMAP 2027
                    </span>
                    <a
                      href="#roadmap"
                      className="text-xs font-mono text-cyber-cyan hover:underline"
                    >
                      Ver cronograma de produção →
                    </a>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

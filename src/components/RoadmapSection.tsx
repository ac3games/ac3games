import React from 'react';
import { Compass, Clock, Rocket, ShieldAlert, Cpu } from 'lucide-react';

export const RoadmapSection: React.FC = () => {
  const milestones = [
    {
      period: '2026 // Q3 - Q4',
      title: 'Geometry Platforms: Lançamento & Expansão',
      status: 'EM PRODUÇÃO ATIVA',
      icon: Rocket,
      accent: 'border-cyber-cyan text-cyber-cyan',
      bgGlow: 'bg-cyber-cyan/10',
      description: 'Lançamento global na Steam, integração do ranking mundial na nuvem (Supabase), suporte a novos chefes de arena e torneios da comunidade.'
    },
    {
      period: '2027 // Q1 - Q2',
      title: 'Geometry Space: A Fronteira Estelar',
      status: 'EM BREVE 2027',
      icon: Compass,
      accent: 'border-cyber-neonPurple text-cyber-neonPurple',
      bgGlow: 'bg-cyber-neonPurple/10',
      description: 'Expansão da franquia para o espaço sideral aberto em gravidade zero. Combate 360°, frotas capitânias customizáveis e viagens por buracos de minhoca.'
    },
    {
      period: '2027 // Q3',
      title: 'Geometry Arena: Coliseu dos Chefes',
      status: 'EM BREVE 2027',
      icon: ShieldAlert,
      accent: 'border-cyber-neonPink text-cyber-neonPink',
      bgGlow: 'bg-cyber-neonPink/10',
      description: 'Modo Boss Rush supremo com arenas hexagonais reconfiguráveis e os 30+ Guardiões Sintéticos mais letais do universo geométrico.'
    },
    {
      period: '2027 // Q4',
      title: 'Geometry Tactics: Estratégia Vetorial',
      status: 'EM BREVE 2027',
      icon: Cpu,
      accent: 'border-cyber-neonAmber text-cyber-neonAmber',
      bgGlow: 'bg-cyber-neonAmber/10',
      description: 'Batalhas táticas por turnos em grade isométrica. Comande esquadrões de drones, crie redes de barreiras e vença pela inteligência analítica.'
    }
  ];

  return (
    <section id="roadmap" className="py-24 relative overflow-hidden bg-cyber-darker border-t border-cyber-cardBorder/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-cyber-neonAmber font-mono text-xs font-semibold tracking-wider uppercase mb-2">
            <Clock className="w-4 h-4" />
            <span>CRONOGRAMA DE PRODUÇÃO & ROADMAP</span>
          </div>
          <h2 className="font-orbitron font-extrabold text-3xl sm:text-4xl text-white mb-4">
            A Trajetória da <span className="text-cyber-neonAmber">AC3games</span>
          </h2>
          <p className="font-outfit text-slate-400 text-sm sm:text-base">
            Nosso compromisso contínuo com a evolução da Franquia Geometry nos próximos anos.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-cyber-card rounded-2xl p-6 border border-cyber-cardBorder relative flex flex-col justify-between hover:border-slate-600 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-slate-500 font-semibold">{item.period}</span>
                    <div className={`p-2 rounded-xl ${item.bgGlow} border border-white/5`}>
                      <Icon className={`w-5 h-5 ${item.accent}`} />
                    </div>
                  </div>

                  <span className={`inline-block font-mono text-[10px] font-bold px-2 py-0.5 rounded border mb-3 ${item.accent}`}>
                    {item.status}
                  </span>

                  <h3 className="font-orbitron font-bold text-lg text-white mb-3 group-hover:text-cyber-cyan transition-colors">
                    {item.title}
                  </h3>

                  <p className="font-outfit text-xs text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-cyber-cardBorder/50 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>FASE {idx + 1}</span>
                  <span className="text-slate-400">AC3 Studio Plan</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { SupabaseLeaderboard } from './SupabaseLeaderboard';
import { Shield, Target, Cpu, Flame, CheckCircle } from 'lucide-react';

export const StudioAbout: React.FC = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-cyber-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Studio Story (Left / 7 Cols) */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-cyber-cyan font-mono text-xs font-semibold tracking-wider uppercase mb-2">
              <Shield className="w-4 h-4" />
              <span>SOBRE A AC3GAMES</span>
            </div>
            
            <h2 className="font-orbitron font-extrabold text-3xl sm:text-4xl text-white mb-6">
              Engenharia de Jogos & <br />
              <span className="text-cyber-cyan">Precisão Vetorial</span>
            </h2>

            <p className="font-outfit text-slate-300 text-base leading-relaxed mb-6">
              A <strong>AC3games</strong> é um estúdio de desenvolvimento independente focado na intersecção entre o arcade clássico e a computação gráfica vetorial contemporânea. 
            </p>

            <p className="font-outfit text-slate-400 text-sm leading-relaxed mb-8">
              Acreditamos em jogos onde cada milissegundo de reflexo importa, sem firulas visuais desnecessárias. Nossa arquitetura prioriza renderização procedural direta, sistemas ECS escaláveis, balanceamento cirúrgico e experiências imersivas na tela de 16:9.
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-cyber-card border border-cyber-cardBorder">
                <Target className="w-6 h-6 text-cyber-cyan mb-2" />
                <h4 className="font-orbitron font-bold text-sm text-white mb-1">Precisão Pura</h4>
                <p className="font-outfit text-xs text-slate-400">Hitboxes exatas e controle absoluto em cada curva.</p>
              </div>

              <div className="p-4 rounded-xl bg-cyber-card border border-cyber-cardBorder">
                <Cpu className="w-6 h-6 text-cyber-neonPurple mb-2" />
                <h4 className="font-orbitron font-bold text-sm text-white mb-1">Render Vetorial</h4>
                <p className="font-outfit text-xs text-slate-400">Arte procedural gerada matematicamente a 60 FPS.</p>
              </div>

              <div className="p-4 rounded-xl bg-cyber-card border border-cyber-cardBorder">
                <Flame className="w-6 h-6 text-cyber-neonPink mb-2" />
                <h4 className="font-orbitron font-bold text-sm text-white mb-1">Neo-Arcade</h4>
                <p className="font-outfit text-xs text-slate-400">Dificuldade desafiadora e rejogabilidade infinita.</p>
              </div>
            </div>

            {/* Studio Checklist */}
            <div className="space-y-2 font-mono text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-cyber-cyan" />
                <span>Infraestrutura em Nuvem 100% Gratuita (Vercel + Supabase)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-cyber-cyan" />
                <span>Preparado para migração instantânea para o domínio oficial da AC3games</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-cyber-cyan" />
                <span>Repositório GitHub dedicado: github.com/ac3games-dev/ac3games</span>
              </div>
            </div>

          </div>

          {/* Supabase Leaderboard Panel (Right / 5 Cols) */}
          <div className="lg:col-span-5">
            <SupabaseLeaderboard />
          </div>

        </div>

      </div>
    </section>
  );
};

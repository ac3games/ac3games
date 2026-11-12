import React from 'react';
import { CodexStudio } from './CodexStudio';
import { Layers } from 'lucide-react';

export const CodexViewer: React.FC = () => {
  return (
    <section id="codex" className="py-24 relative overflow-hidden bg-cyber-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-cyber-neonPurple font-mono text-xs font-semibold tracking-wider uppercase mb-2">
            <Layers className="w-4 h-4" />
            <span>SISTEMA DE VETORES & ARTE PROCEDURAL</span>
          </div>
          <h2 className="font-orbitron font-extrabold text-3xl sm:text-5xl text-white mb-4">
            Biblioteca Digital & <span className="text-cyber-neonPurple">Codex 16:9</span>
          </h2>
          <p className="font-outfit text-slate-300 text-sm sm:text-base">
            O estúdio interativo completo de <strong>Geometry Platforms</strong>: configure formas e raridades do Player, Inimigos, Chefes de Onda, Chefes de Arena, Drones, Classes com munições, Auras de Biomas e Cenários de Combate.
          </p>
        </div>

        {/* 1. INTERACTIVE COMBINATION STUDIO */}
        <CodexStudio />

      </div>
    </section>
  );
};

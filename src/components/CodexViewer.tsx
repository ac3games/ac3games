import React, { useState, useEffect, useRef } from 'react';
import { CODEX_ASSETS } from '../data/codexData';
import { CodexAsset, CodexCategory } from '../types';
import { renderProceduralAsset } from '../utils/vectorRenderers';
import { CodexStudio } from './CodexStudio';
import { Layers, Search, Eye, Download, X, Cpu } from 'lucide-react';

interface CanvasCardProps {
  asset: CodexAsset;
  onInspect: (asset: CodexAsset) => void;
}

const CanvasCard: React.FC<CanvasCardProps> = ({ asset, onInspect }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let startTime = performance.now();

    const renderLoop = () => {
      const elapsed = (performance.now() - startTime) / 1000;
      renderProceduralAsset(ctx, asset.renderType, canvas.width, canvas.height, elapsed, asset.color);
      animId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => cancelAnimationFrame(animId);
  }, [asset]);

  return (
    <div
      onClick={() => onInspect(asset)}
      className="group bg-cyber-card rounded-2xl border border-cyber-cardBorder hover:border-cyber-cyan transition-all overflow-hidden cursor-pointer hover:shadow-neon-cyan/25 flex flex-col"
    >
      {/* 16:9 Canvas Frame */}
      <div className="relative aspect-video w-full bg-[#070314] overflow-hidden border-b border-cyber-cardBorder/60">
        <canvas
          ref={canvasRef}
          width={320}
          height={180}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 font-mono text-[10px] px-2 py-0.5 rounded-full bg-cyber-dark/80 border border-white/10 text-slate-300 backdrop-blur-sm">
          {asset.categoryLabel}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span
              className="font-mono text-[10px] font-bold px-2 py-0.5 rounded"
              style={{ backgroundColor: `${asset.color}1a`, color: asset.color }}
            >
              {asset.badge}
            </span>
          </div>
          <h4 className="font-orbitron font-bold text-base text-white group-hover:text-cyber-cyan transition-colors">
            {asset.name}
          </h4>
          <p className="font-outfit text-xs text-slate-400 mt-1 line-clamp-2">
            {asset.desc}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-cyber-cardBorder/50 flex items-center justify-between font-mono text-xs text-slate-400">
          <span className="flex items-center gap-1.5 text-cyber-cyan">
            <Cpu className="w-3.5 h-3.5" />
            <span>VETOR 16:9</span>
          </span>
          <span className="group-hover:text-white flex items-center gap-1 text-[11px]">
            <Eye className="w-3.5 h-3.5 text-cyber-cyan" />
            <span>Inspecionar</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export const CodexViewer: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CodexCategory | 'all'>('drones');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectedAsset, setInspectedAsset] = useState<CodexAsset | null>(null);
  const modalCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Category Tabs Configuration
  const categories: { id: CodexCategory | 'all'; label: string; count: number }[] = [
    { id: 'all', label: 'Todos os Recursos', count: CODEX_ASSETS.length },
    { id: 'drones', label: '⚔️ Forja de Drones (16)', count: CODEX_ASSETS.filter(a => a.category === 'drones').length },
    { id: 'expressions', label: '🤖 Matriz Sensorial HUD (20)', count: CODEX_ASSETS.filter(a => a.category === 'expressions').length },
    { id: 'auras', label: '🌌 Auras & Biomas (11)', count: CODEX_ASSETS.filter(a => a.category === 'auras').length },
    { id: 'platforms', label: '🏞️ Cenários & Plataformas (11)', count: CODEX_ASSETS.filter(a => a.category === 'platforms').length },
    { id: 'player', label: '🚀 Chassis do Piloto (12)', count: CODEX_ASSETS.filter(a => a.category === 'player').length },
    { id: 'projectiles', label: '💥 Balística Vetorial (10)', count: CODEX_ASSETS.filter(a => a.category === 'projectiles').length }
  ];

  // Filtering
  const filteredAssets = CODEX_ASSETS.filter(asset => {
    const matchesCategory = activeCategory === 'all' || asset.category === activeCategory;
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          asset.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          asset.badge.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Modal Animation Loop
  useEffect(() => {
    if (!inspectedAsset) return;
    const canvas = modalCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let startTime = performance.now();

    const renderLoop = () => {
      const elapsed = (performance.now() - startTime) / 1000;
      renderProceduralAsset(ctx, inspectedAsset.renderType, canvas.width, canvas.height, elapsed, inspectedAsset.color);
      animId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => cancelAnimationFrame(animId);
  }, [inspectedAsset]);

  // Download High-Res 1080p Render
  const downloadRender = () => {
    if (!inspectedAsset) return;
    const offCanvas = document.createElement('canvas');
    offCanvas.width = 1920;
    offCanvas.height = 1080;
    const offCtx = offCanvas.getContext('2d');
    if (!offCtx) return;

    renderProceduralAsset(offCtx, inspectedAsset.renderType, 1920, 1080, 0, inspectedAsset.color);

    const link = document.createElement('a');
    link.download = `AC3GAMES_${inspectedAsset.id}_1080p.png`;
    link.href = offCanvas.toDataURL('image/png');
    link.click();
  };

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
            O estúdio interativo completo de <strong>Geometry Platforms</strong>: configure formas e raridades do Player, Inimigos, Chefes de Onda, Chefes de Arena, Drones e Classes com munição.
          </p>
        </div>

        {/* 1. INTERACTIVE COMBINATION STUDIO (O Usuário escolhe Forma, Raridade, Drone ou Classe com Munição) */}
        <CodexStudio />

        {/* 2. REPOSITORY ASSETS GALLERY TOOLBAR */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-cyber-card p-3 rounded-2xl border border-cyber-cardBorder">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl font-mono text-xs transition-all flex items-center gap-2 ${
                  activeCategory === cat.id
                    ? 'bg-cyber-neonPurple/20 text-purple-200 border border-cyber-neonPurple shadow-neon-purple/20'
                    : 'text-slate-400 hover:text-white hover:bg-cyber-darker border border-transparent'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Buscar no acervo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-cyber-darker border border-cyber-cardBorder rounded-xl pl-10 pr-4 py-2 text-xs font-outfit text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan"
            />
          </div>

        </div>

        {/* Assets Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAssets.map((asset) => (
            <CanvasCard key={asset.id} asset={asset} onInspect={setInspectedAsset} />
          ))}
        </div>

        {filteredAssets.length === 0 && (
          <div className="text-center py-16 text-slate-500 font-mono text-sm">
            Nenhum elemento encontrado para os critérios de busca selecionados.
          </div>
        )}

      </div>

      {/* 16:9 Modal de Inspeção & Download */}
      {inspectedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-cyber-card border border-cyber-cyan/50 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-cyber-cardBorder flex items-center justify-between bg-cyber-darker/60">
              <div className="flex items-center gap-3">
                <span
                  className="w-3 h-3 rounded-full animate-ping"
                  style={{ backgroundColor: inspectedAsset.color }}
                />
                <div>
                  <h3 className="font-orbitron font-bold text-lg text-white">
                    {inspectedAsset.name}
                  </h3>
                  <span className="font-mono text-xs text-slate-400">
                    {inspectedAsset.categoryLabel} // {inspectedAsset.badge}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setInspectedAsset(null)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-cyber-cardBorder transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Canvas 16:9 Widescreen */}
            <div className="relative aspect-video w-full bg-[#05020c] flex items-center justify-center border-b border-cyber-cardBorder">
              <canvas
                ref={modalCanvasRef}
                width={960}
                height={540}
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-3 left-4 font-mono text-[11px] text-cyber-cyan/70 bg-black/70 px-3 py-1 rounded-md border border-cyber-cyan/20">
                1920 × 1080 PROPORÇÃO 16:9 // 60 FPS PROCEDURAL
              </div>
            </div>

            {/* Modal Technical Specs & Download */}
            <div className="p-6 bg-cyber-dark flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <p className="font-outfit text-sm text-slate-300 mb-4">
                  {inspectedAsset.desc}
                </p>
                {inspectedAsset.technicalSpecs && (
                  <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                    {inspectedAsset.technicalSpecs.map((spec, i) => (
                      <div key={i} className="p-2 rounded bg-cyber-darker border border-cyber-cardBorder">
                        <span className="block text-slate-500 text-[10px]">{spec.label}</span>
                        <span className="text-cyber-cyan font-semibold">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={downloadRender}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyber-cyan to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-orbitron font-bold text-xs tracking-wider shadow-neon-cyan transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>BAIXAR RENDER 1080P PNG</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

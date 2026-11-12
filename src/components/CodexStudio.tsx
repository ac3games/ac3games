import React, { useState, useEffect, useRef } from 'react';
import {
  CATALOG_FORMS,
  RARITIES_DATA,
  ARENA_BOSSES_DATA,
  DRONES_DATA,
  HERO_CLASSES_DATA,
  renderStudioPlayer,
  renderStudioEnemy,
  renderStudioWaveBoss,
  renderStudioArenaBoss,
  renderStudioDrone,
  renderStudioHeroClassWeapon
} from '../utils/vectorRenderers';
import { User, Skull, ShieldAlert, Award, Crosshair, Zap, Download, Sparkles } from 'lucide-react';

type StudioTab = 'player' | 'enemy' | 'wave_boss' | 'arena_boss' | 'drone' | 'hero_class';

export const CodexStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<StudioTab>('player');

  // Selectors State
  const [playerForm, setPlayerForm] = useState<number>(1);
  const [playerRarity, setPlayerRarity] = useState<number>(1);

  const [enemyForm, setEnemyForm] = useState<number>(1);
  const [enemyRarity, setEnemyRarity] = useState<number>(1);

  const [waveBossForm, setWaveBossForm] = useState<number>(1);
  const [waveBossRarity, setWaveBossRarity] = useState<number>(1);

  const [arenaBossIdx, setArenaBossIdx] = useState<number>(1);
  const [arenaBossRarity, setArenaBossRarity] = useState<number>(1);

  const [droneId, setDroneId] = useState<string>('missiles');
  const [heroClassId, setHeroClassId] = useState<string>('vanguard');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Animation Loop for Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let startTime = performance.now();

    const render = () => {
      const elapsed = (performance.now() - startTime) / 1000;

      if (activeTab === 'player') {
        renderStudioPlayer(ctx, playerForm, playerRarity, canvas.width, canvas.height, elapsed);
      } else if (activeTab === 'enemy') {
        renderStudioEnemy(ctx, enemyForm, enemyRarity, canvas.width, canvas.height, elapsed);
      } else if (activeTab === 'wave_boss') {
        renderStudioWaveBoss(ctx, waveBossForm, waveBossRarity, canvas.width, canvas.height, elapsed);
      } else if (activeTab === 'arena_boss') {
        renderStudioArenaBoss(ctx, arenaBossIdx, arenaBossRarity, canvas.width, canvas.height, elapsed);
      } else if (activeTab === 'drone') {
        renderStudioDrone(ctx, droneId, canvas.width, canvas.height, elapsed);
      } else if (activeTab === 'hero_class') {
        renderStudioHeroClassWeapon(ctx, heroClassId, canvas.width, canvas.height, elapsed);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [
    activeTab,
    playerForm,
    playerRarity,
    enemyForm,
    enemyRarity,
    waveBossForm,
    waveBossRarity,
    arenaBossIdx,
    arenaBossRarity,
    droneId,
    heroClassId
  ]);

  // Download 1080p Crystal Clear PNG
  const handleDownload = () => {
    const offCanvas = document.createElement('canvas');
    offCanvas.width = 1920;
    offCanvas.height = 1080;
    const offCtx = offCanvas.getContext('2d');
    if (!offCtx) return;

    let filename = 'AC3GAMES_render.png';

    if (activeTab === 'player') {
      renderStudioPlayer(offCtx, playerForm, playerRarity, 1920, 1080, 0);
      filename = `player_forma_${playerForm}_raridade_${playerRarity}.png`;
    } else if (activeTab === 'enemy') {
      renderStudioEnemy(offCtx, enemyForm, enemyRarity, 1920, 1080, 0);
      filename = `inimigo_forma_${enemyForm}_raridade_${enemyRarity}.png`;
    } else if (activeTab === 'wave_boss') {
      renderStudioWaveBoss(offCtx, waveBossForm, waveBossRarity, 1920, 1080, 0);
      filename = `wave_boss_forma_${waveBossForm}_raridade_${waveBossRarity}.png`;
    } else if (activeTab === 'arena_boss') {
      renderStudioArenaBoss(offCtx, arenaBossIdx, arenaBossRarity, 1920, 1080, 0);
      filename = `arena_boss_${arenaBossIdx}_raridade_${arenaBossRarity}.png`;
    } else if (activeTab === 'drone') {
      renderStudioDrone(offCtx, droneId, 1920, 1080, 0);
      filename = `drone_${droneId}.png`;
    } else if (activeTab === 'hero_class') {
      renderStudioHeroClassWeapon(offCtx, heroClassId, 1920, 1080, 0);
      filename = `classe_heroi_${heroClassId}.png`;
    }

    const link = document.createElement('a');
    link.download = filename;
    link.href = offCanvas.toDataURL('image/png');
    link.click();
  };

  // Helper data getters
  const selectedPlayerForm = CATALOG_FORMS[playerForm - 1] || CATALOG_FORMS[0]!;
  const selectedPlayerRarity = RARITIES_DATA[playerRarity - 1] || RARITIES_DATA[0]!;
  const playerCombinedMult = selectedPlayerForm.mult * selectedPlayerRarity.multiplier;

  const selectedEnemyForm = CATALOG_FORMS[enemyForm - 1] || CATALOG_FORMS[0]!;
  const selectedEnemyRarity = RARITIES_DATA[enemyRarity - 1] || RARITIES_DATA[0]!;

  const selectedWaveBossForm = CATALOG_FORMS[waveBossForm - 1] || CATALOG_FORMS[0]!;
  const selectedWaveBossRarity = RARITIES_DATA[waveBossRarity - 1] || RARITIES_DATA[0]!;

  const selectedArenaBoss = ARENA_BOSSES_DATA[arenaBossIdx - 1] || ARENA_BOSSES_DATA[0]!;
  const selectedArenaBossRarity = RARITIES_DATA[arenaBossRarity - 1] || RARITIES_DATA[0]!;

  const selectedDrone = DRONES_DATA.find(d => d.id === droneId) || DRONES_DATA[0]!;
  const selectedHeroClass = HERO_CLASSES_DATA.find(c => c.id === heroClassId) || HERO_CLASSES_DATA[0]!;

  return (
    <div className="bg-cyber-card rounded-3xl p-6 sm:p-8 border border-cyber-cyan/50 shadow-neon-cyan/20 mb-16">
      
      {/* Studio Header & 6 Official Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-cyber-cardBorder/60 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-cyber-cyan font-mono text-xs font-semibold tracking-wider uppercase mb-1">
            <Sparkles className="w-4 h-4" />
            <span>ESTÚDIO VETORIAL CANÔNICO // RENDERS 16:9</span>
          </div>
          <h3 className="font-orbitron font-extrabold text-2xl sm:text-3xl text-white">
            Biblioteca Técnica & <span className="text-cyber-cyan">Forja de Combinações</span>
          </h3>
        </div>

        {/* 6 Official Category Buttons */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setActiveTab('player')}
            className={`px-3 py-2 rounded-xl flex items-center gap-2 transition-all ${
              activeTab === 'player'
                ? 'bg-cyber-cyan text-black font-bold shadow-neon-cyan'
                : 'bg-cyber-darker text-slate-300 hover:text-white border border-cyber-cardBorder'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Jogador (Vector-01)</span>
          </button>

          <button
            onClick={() => setActiveTab('enemy')}
            className={`px-3 py-2 rounded-xl flex items-center gap-2 transition-all ${
              activeTab === 'enemy'
                ? 'bg-cyber-neonPink text-white font-bold shadow-neon-pink'
                : 'bg-cyber-darker text-slate-300 hover:text-white border border-cyber-cardBorder'
            }`}
          >
            <Skull className="w-4 h-4" />
            <span>Inimigos Comuns</span>
          </button>

          <button
            onClick={() => setActiveTab('wave_boss')}
            className={`px-3 py-2 rounded-xl flex items-center gap-2 transition-all ${
              activeTab === 'wave_boss'
                ? 'bg-cyber-neonAmber text-black font-bold shadow-neon-amber'
                : 'bg-cyber-darker text-slate-300 hover:text-white border border-cyber-cardBorder'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Boss de Onda</span>
          </button>

          <button
            onClick={() => setActiveTab('arena_boss')}
            className={`px-3 py-2 rounded-xl flex items-center gap-2 transition-all ${
              activeTab === 'arena_boss'
                ? 'bg-cyber-neonPurple text-white font-bold shadow-neon-purple'
                : 'bg-cyber-darker text-slate-300 hover:text-white border border-cyber-cardBorder'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Super Bosses de Arena</span>
          </button>

          <button
            onClick={() => setActiveTab('drone')}
            className={`px-3 py-2 rounded-xl flex items-center gap-2 transition-all ${
              activeTab === 'drone'
                ? 'bg-emerald-400 text-black font-bold shadow-lg shadow-emerald-400/20'
                : 'bg-cyber-darker text-slate-300 hover:text-white border border-cyber-cardBorder'
            }`}
          >
            <Crosshair className="w-4 h-4" />
            <span>Drones & Armas Supremas</span>
          </button>

          <button
            onClick={() => setActiveTab('hero_class')}
            className={`px-3 py-2 rounded-xl flex items-center gap-2 transition-all ${
              activeTab === 'hero_class'
                ? 'bg-cyber-cyan text-black font-bold shadow-neon-cyan'
                : 'bg-cyber-darker text-slate-300 hover:text-white border border-cyber-cardBorder'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Classes & Armas de Heróis</span>
          </button>
        </div>
      </div>

      {/* Main Studio Interactive Screen (Left 16:9 Canvas + Right Explanatory Legend) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: 16:9 Live Canvas Display (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[#030109] border border-cyber-cardBorder shadow-2xl flex items-center justify-center">
            <canvas
              ref={canvasRef}
              width={960}
              height={540}
              className="w-full h-full object-contain"
            />
            
            {/* Top Badge Overlay */}
            <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 font-mono text-[11px] text-white/80">
              RENDER 16:9 // CONTORNO PRECISO // 60 FPS
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="font-mono text-xs text-slate-400">
              Render vetorial nítido oficial em 1920 × 1080 PNG
            </span>
            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-xl bg-cyber-darker border border-cyber-cyan/40 hover:border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan/10 font-mono text-xs font-bold transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Baixar Render PNG</span>
            </button>
          </div>
        </div>

        {/* Right: Technical Explanation & Complete Dynamic Legend (5 Cols) */}
        <div className="lg:col-span-5 bg-cyber-darker/90 rounded-2xl p-6 border border-cyber-cardBorder flex flex-col">
          
          {/* TAB 1: JOGADOR (VECTOR-01) */}
          {activeTab === 'player' && (
            <div>
              <div className="mb-6 space-y-4">
                <div>
                  <label className="block text-xs font-mono text-cyber-cyan font-bold uppercase mb-1.5">
                    1. Escolha a Forma do Jogador (Formas 1 a 12):
                  </label>
                  <select
                    value={playerForm}
                    onChange={(e) => setPlayerForm(Number(e.target.value))}
                    className="w-full bg-cyber-card border border-cyber-cardBorder rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyber-cyan"
                  >
                    {CATALOG_FORMS.map((f, idx) => (
                      <option key={f.key} value={idx + 1}>
                        Forma #{idx + 1}: {f.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-cyber-cyan font-bold uppercase mb-1.5">
                    2. Escolha a Raridade do Jogador (1 a 12):
                  </label>
                  <select
                    value={playerRarity}
                    onChange={(e) => setPlayerRarity(Number(e.target.value))}
                    className="w-full bg-cyber-card border border-cyber-cardBorder rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyber-cyan"
                  >
                    {RARITIES_DATA.map((r) => (
                      <option key={r.index} value={r.index}>
                        Raridade #{r.index}: {r.namePt} ({r.multiplier.toFixed(2)}x)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Explanatory Legend */}
              <div className="pt-4 border-t border-cyber-cardBorder/60">
                <span
                  className="font-mono text-xs font-bold px-2.5 py-1 rounded inline-block mb-2"
                  style={{ backgroundColor: `${selectedPlayerRarity.color}22`, color: selectedPlayerRarity.color }}
                >
                  NÍVEL DE SINTONIA // {selectedPlayerRarity.namePt.toUpperCase()}
                </span>

                <h4 className="font-orbitron font-bold text-xl text-white mb-1">
                  Vector-01 • {selectedPlayerForm.name}
                </h4>
                <p className="font-mono text-xs text-cyber-cyan mb-3">
                  FORMA #{playerForm} // {selectedPlayerForm.sides} Lados Poligonais
                </p>

                <div className="space-y-3 font-mono text-xs mb-4">
                  <div className="p-2.5 rounded bg-cyber-card border border-cyber-cardBorder/40">
                    <span className="text-slate-400 block mb-0.5">BÔNUS PASSIVO DO CHASSI:</span>
                    <span className="text-white font-bold block">{selectedPlayerForm.bonus}</span>
                  </div>

                  <div className="p-2.5 rounded bg-emerald-950/30 border border-emerald-500/40">
                    <span className="text-emerald-400 block mb-0.5 font-bold">BÔNUS DA RARIDADE CONCEDIDO AO JOGADOR:</span>
                    <span className="text-emerald-200 font-bold block">{selectedPlayerRarity.playerBonus}</span>
                  </div>

                  <div className="flex justify-between p-2 rounded bg-cyber-card border border-cyber-cardBorder/40">
                    <span className="text-slate-400">Poder Combinado da Nave:</span>
                    <span className="text-cyber-cyan font-bold">{playerCombinedMult.toFixed(2)}x Multiplicador</span>
                  </div>
                </div>

                <div className="text-[11px] font-outfit text-slate-300 leading-relaxed border-t border-cyber-cardBorder/40 pt-3">
                  <strong className="text-white font-mono block mb-1">COMPORTAMENTO EM VOO:</strong>
                  {selectedPlayerForm.behavior}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INIMIGOS COMUNS */}
          {activeTab === 'enemy' && (
            <div>
              <div className="mb-6 space-y-4">
                <div>
                  <label className="block text-xs font-mono text-cyber-neonPink font-bold uppercase mb-1.5">
                    1. Escolha a Forma do Inimigo (Formas 1 a 12):
                  </label>
                  <select
                    value={enemyForm}
                    onChange={(e) => setEnemyForm(Number(e.target.value))}
                    className="w-full bg-cyber-card border border-cyber-cardBorder rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyber-neonPink"
                  >
                    {CATALOG_FORMS.map((f, idx) => (
                      <option key={f.key} value={idx + 1}>
                        Forma #{idx + 1}: {f.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-cyber-neonPink font-bold uppercase mb-1.5">
                    2. Escolha a Raridade / Grau de Ameaça:
                  </label>
                  <select
                    value={enemyRarity}
                    onChange={(e) => setEnemyRarity(Number(e.target.value))}
                    className="w-full bg-cyber-card border border-cyber-cardBorder rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyber-neonPink"
                  >
                    {RARITIES_DATA.map((r) => (
                      <option key={r.index} value={r.index}>
                        Raridade #{r.index}: {r.namePt} ({r.multiplier.toFixed(2)}x HP)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Explanatory Legend */}
              <div className="pt-4 border-t border-cyber-cardBorder/60">
                <span
                  className="font-mono text-xs font-bold px-2.5 py-1 rounded inline-block mb-2"
                  style={{ backgroundColor: `${selectedEnemyRarity.color}22`, color: selectedEnemyRarity.color }}
                >
                  GRAU DE AMEAÇA // {selectedEnemyRarity.namePt.toUpperCase()}
                </span>

                <h4 className="font-orbitron font-bold text-xl text-white mb-1">
                  Constructo Hostil • {selectedEnemyForm.name}
                </h4>
                <p className="font-mono text-xs text-cyber-neonPink mb-3">
                  CONSTRUTO #{enemyForm} // {selectedEnemyForm.sides} Lados Poligonais
                </p>

                <div className="space-y-3 font-mono text-xs mb-4">
                  <div className="p-2.5 rounded bg-cyber-card border border-cyber-cardBorder/40">
                    <span className="text-slate-400 block mb-0.5">COMPORTAMENTO / PADRÃO DE ATAQUE:</span>
                    <span className="text-white font-bold block">{selectedEnemyForm.behavior}</span>
                  </div>

                  <div className="p-2.5 rounded bg-pink-950/30 border border-pink-500/40">
                    <span className="text-pink-400 block mb-0.5 font-bold">O QUE O INIMIGO GANHA NESTA RARIDADE:</span>
                    <span className="text-pink-200 font-bold block">{selectedEnemyRarity.enemyBonus}</span>
                  </div>

                  <div className="flex justify-between p-2 rounded bg-cyber-card border border-cyber-cardBorder/40">
                    <span className="text-slate-400">Escalonamento de HP:</span>
                    <span className="text-cyber-neonPink font-bold">
                      {(selectedEnemyForm.mult * selectedEnemyRarity.multiplier).toFixed(2)}x Vida Efetiva
                    </span>
                  </div>
                </div>

                <div className="text-[11px] font-outfit text-slate-300 leading-relaxed border-t border-cyber-cardBorder/40 pt-3">
                  <strong className="text-white font-mono block mb-1">ARQUIVO DE TELEMETRIA:</strong>
                  {selectedEnemyForm.lore}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BOSS DE ONDA */}
          {activeTab === 'wave_boss' && (
            <div>
              <div className="mb-6 space-y-4">
                <div>
                  <label className="block text-xs font-mono text-cyber-neonAmber font-bold uppercase mb-1.5">
                    1. Escolha a Forma do Boss de Onda (1 a 12):
                  </label>
                  <select
                    value={waveBossForm}
                    onChange={(e) => setWaveBossForm(Number(e.target.value))}
                    className="w-full bg-cyber-card border border-cyber-cardBorder rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyber-neonAmber"
                  >
                    {CATALOG_FORMS.map((f, idx) => (
                      <option key={f.key} value={idx + 1}>
                        Boss Forma #{idx + 1}: {f.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-cyber-neonAmber font-bold uppercase mb-1.5">
                    2. Escolha a Raridade do Boss:
                  </label>
                  <select
                    value={waveBossRarity}
                    onChange={(e) => setWaveBossRarity(Number(e.target.value))}
                    className="w-full bg-cyber-card border border-cyber-cardBorder rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyber-neonAmber"
                  >
                    {RARITIES_DATA.map((r) => (
                      <option key={r.index} value={r.index}>
                        Raridade #{r.index}: {r.namePt} ({r.multiplier.toFixed(2)}x)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Explanatory Legend */}
              <div className="pt-4 border-t border-cyber-cardBorder/60">
                <span
                  className="font-mono text-xs font-bold px-2.5 py-1 rounded inline-block mb-2"
                  style={{ backgroundColor: `${selectedWaveBossRarity.color}22`, color: selectedWaveBossRarity.color }}
                >
                  CHEFE DE ONDA COLOSSAL // {selectedWaveBossRarity.namePt.toUpperCase()}
                </span>

                <h4 className="font-orbitron font-bold text-xl text-white mb-1">
                  Guardião de Onda • {selectedWaveBossForm.name}
                </h4>
                <p className="font-mono text-xs text-cyber-neonAmber mb-3">
                  ESCALA GIGANTE // Forma #{waveBossForm} ({selectedWaveBossForm.sides} Lados)
                </p>

                <div className="space-y-3 font-mono text-xs mb-4">
                  <div className="p-2.5 rounded bg-cyber-card border border-cyber-cardBorder/40">
                    <span className="text-slate-400 block mb-0.5">COMPORTAMENTO DO CHEFE:</span>
                    <span className="text-white font-bold block">
                      {selectedWaveBossForm.behavior} (Emissão de Projéteis Direcionados)
                    </span>
                  </div>

                  <div className="p-2.5 rounded bg-amber-950/30 border border-amber-500/40">
                    <span className="text-amber-400 block mb-0.5 font-bold">ESCALONAMENTO DA RARIDADE NO BOSS:</span>
                    <span className="text-purple-300 font-bold text-xs block">
                      {selectedWaveBossRarity.enemyBonus}
                    </span>
                  </div>

                  <div className="flex justify-between p-2 rounded bg-cyber-card border border-cyber-cardBorder/40">
                    <span className="text-slate-400">Multiplicador de HP Total:</span>
                    <span className="text-cyber-neonPink font-bold">
                      {(selectedWaveBossForm.mult * selectedWaveBossRarity.multiplier * 2.5).toFixed(1)}x Vida
                    </span>
                  </div>

                  <div className="flex justify-between p-2 rounded bg-cyber-card border border-cyber-cardBorder/40">
                    <span className="text-slate-400">Recompensas ao Derrotar:</span>
                    <span className="text-[#00ffaa] font-bold">Baú Tático + 15 Fragmentos</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SUPER BOSSES DE ARENA */}
          {activeTab === 'arena_boss' && (
            <div>
              <div className="mb-6 space-y-4">
                <div>
                  <label className="block text-xs font-mono text-cyber-neonPurple font-bold uppercase mb-1.5">
                    1. Escolha o Super Boss de Arena (12 Bosses Únicos):
                  </label>
                  <select
                    value={arenaBossIdx}
                    onChange={(e) => setArenaBossIdx(Number(e.target.value))}
                    className="w-full bg-cyber-card border border-cyber-cardBorder rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyber-neonPurple"
                  >
                    {ARENA_BOSSES_DATA.map((b) => (
                      <option key={b.index} value={b.index}>
                        Boss #{b.index}: {b.namePt} (Wave {b.wave})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-cyber-neonPurple font-bold uppercase mb-1.5">
                    2. Escolha o Grau de Ascensão / Raridade:
                  </label>
                  <select
                    value={arenaBossRarity}
                    onChange={(e) => setArenaBossRarity(Number(e.target.value))}
                    className="w-full bg-cyber-card border border-cyber-cardBorder rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyber-neonPurple"
                  >
                    {RARITIES_DATA.map((r) => (
                      <option key={r.index} value={r.index}>
                        Ascensão #{r.index}: {r.namePt} ({r.multiplier.toFixed(2)}x Ameaça)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Explanatory Legend */}
              <div className="pt-4 border-t border-cyber-cardBorder/60">
                <span
                  className="font-mono text-xs font-bold px-2.5 py-1 rounded inline-block mb-2"
                  style={{ backgroundColor: `${selectedArenaBossRarity.color}22`, color: selectedArenaBossRarity.color }}
                >
                  SUPER CHEFE DE ARENA #{selectedArenaBoss.index} • ONDA {selectedArenaBoss.wave}
                </span>

                <h4 className="font-orbitron font-bold text-xl text-white mb-1">
                  {selectedArenaBoss.namePt}
                </h4>
                <p className="font-mono text-xs text-cyber-neonPurple mb-3">
                  {selectedArenaBoss.nameEn}
                </p>

                <div className="space-y-3 font-mono text-xs mb-4">
                  <div className="p-2.5 rounded bg-cyber-card border border-cyber-cardBorder/40">
                    <span className="text-slate-400 block mb-0.5">ARQUÉTIPO & GEOMETRIA:</span>
                    <span className="text-white font-bold block">
                      {selectedArenaBoss.desc} ({selectedArenaBoss.sides} Lados Sagrados)
                    </span>
                  </div>

                  <div className="p-2.5 rounded bg-cyber-card border border-cyber-cardBorder/40">
                    <span className="text-slate-400 block mb-0.5">MECÂNICAS ESPECÍFICAS DE COMBATE:</span>
                    <span className="text-slate-300 font-outfit text-xs block leading-relaxed">
                      {selectedArenaBoss.mechanics}
                    </span>
                  </div>

                  <div className="p-2.5 rounded bg-amber-950/30 border border-amber-500/40">
                    <span className="text-amber-400 font-bold block mb-0.5">RECOMPENSA EXCLUSIVA GARANTIDA:</span>
                    <span className="text-amber-100 font-outfit text-xs block">
                      {selectedArenaBoss.relicDrop}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: DRONES & ARMAS SUPREMAS */}
          {activeTab === 'drone' && (
            <div>
              <div className="mb-6">
                <label className="block text-xs font-mono text-emerald-400 font-bold uppercase mb-1.5">
                  Escolha o Drone / Arma Suprema ({DRONES_DATA.length} Modelos):
                </label>
                <select
                  value={droneId}
                  onChange={(e) => setDroneId(e.target.value)}
                  className="w-full bg-cyber-card border border-cyber-cardBorder rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-emerald-400"
                >
                  {DRONES_DATA.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.namePt} [{d.role}]
                    </option>
                  ))}
                </select>
              </div>

              {/* Explanatory Legend */}
              <div className="pt-4 border-t border-cyber-cardBorder/60">
                <span
                  className="font-mono text-xs font-bold px-2.5 py-1 rounded inline-block mb-2"
                  style={{ backgroundColor: `${selectedDrone.color}22`, color: selectedDrone.color }}
                >
                  FORJA DE ARMAS SUPREMAS // {selectedDrone.role.toUpperCase()}
                </span>

                <h4 className="font-orbitron font-bold text-xl text-white mb-1">
                  {selectedDrone.namePt}
                </h4>
                <p className="font-mono text-xs text-cyber-cyan mb-3">
                  {selectedDrone.nameEn}
                </p>

                <div className="space-y-3 font-mono text-xs mb-4">
                  <div className="p-2.5 rounded bg-cyber-card border border-cyber-cardBorder/40">
                    <span className="text-slate-400 block mb-0.5 font-bold">AÇÃO DO DRONE EM COMBATE:</span>
                    <p className="font-outfit text-xs text-slate-200 leading-relaxed">
                      {selectedDrone.combatAction}
                    </p>
                  </div>

                  <div className="p-2.5 rounded bg-emerald-950/30 border border-emerald-500/40">
                    <span className="text-emerald-400 block mb-0.5 font-bold">BÔNUS CONCEDIDO AO JOGADOR:</span>
                    <p className="font-outfit text-xs text-emerald-100 leading-relaxed">
                      {selectedDrone.playerBonus}
                    </p>
                  </div>

                  <div className="p-2.5 rounded bg-blue-950/30 border border-blue-500/40">
                    <span className="text-blue-300 block mb-0.5 font-bold">MUNIÇÃO & COMPORTAMENTO DE DISPARO:</span>
                    <span className="text-white font-bold block mb-1">{selectedDrone.munitionName}</span>
                    <p className="font-outfit text-xs text-blue-100 leading-relaxed">
                      {selectedDrone.munitionBehavior}
                    </p>
                  </div>

                  <div className="flex justify-between p-2 rounded bg-cyber-card border border-cyber-cardBorder/40 text-[11px]">
                    <span className="text-slate-400">Implementação Canônica:</span>
                    <span className="text-white font-mono">{selectedDrone.codeRef}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: CLASSES & ARMAS DE HERÓIS */}
          {activeTab === 'hero_class' && (
            <div>
              <div className="mb-6">
                <label className="block text-xs font-mono text-cyber-cyan font-bold uppercase mb-1.5">
                  Escolha a Classe do Herói (6 Arquétipos Canônicos):
                </label>
                <select
                  value={heroClassId}
                  onChange={(e) => setHeroClassId(e.target.value)}
                  className="w-full bg-cyber-card border border-cyber-cardBorder rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyber-cyan"
                >
                  {HERO_CLASSES_DATA.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Explanatory Legend */}
              <div className="pt-4 border-t border-cyber-cardBorder/60">
                <span
                  className="font-mono text-xs font-bold px-2.5 py-1 rounded inline-block mb-2"
                  style={{ backgroundColor: `${selectedHeroClass.color}22`, color: selectedHeroClass.color }}
                >
                  ARQUÉTIPO DE HERÓI // CÓDIGO {selectedHeroClass.code.toUpperCase()}
                </span>

                <h4 className="font-orbitron font-bold text-xl text-white mb-1">
                  {selectedHeroClass.name}
                </h4>

                {/* Hexagonal Stat Matrix Display (from HullSetupOverlay) */}
                <div className="grid grid-cols-6 gap-1 my-3 text-center font-mono text-[11px]">
                  <div className="p-1.5 bg-cyber-card rounded border border-cyber-cardBorder/50">
                    <span className="text-slate-400 block text-[9px]">PWR</span>
                    <span className="text-white font-bold">{selectedHeroClass.pwr}</span>
                  </div>
                  <div className="p-1.5 bg-cyber-card rounded border border-cyber-cardBorder/50">
                    <span className="text-slate-400 block text-[9px]">AGI</span>
                    <span className="text-white font-bold">{selectedHeroClass.agi}</span>
                  </div>
                  <div className="p-1.5 bg-cyber-card rounded border border-cyber-cardBorder/50">
                    <span className="text-slate-400 block text-[9px]">HUL</span>
                    <span className="text-white font-bold">{selectedHeroClass.hul}</span>
                  </div>
                  <div className="p-1.5 bg-cyber-card rounded border border-cyber-cardBorder/50">
                    <span className="text-slate-400 block text-[9px]">SYS</span>
                    <span className="text-white font-bold">{selectedHeroClass.sys}</span>
                  </div>
                  <div className="p-1.5 bg-cyber-card rounded border border-cyber-cardBorder/50">
                    <span className="text-slate-400 block text-[9px]">PRC</span>
                    <span className="text-white font-bold">{selectedHeroClass.prc}</span>
                  </div>
                  <div className="p-1.5 bg-cyber-card rounded border border-cyber-cardBorder/50">
                    <span className="text-slate-400 block text-[9px]">NRG</span>
                    <span className="text-white font-bold">{selectedHeroClass.nrg}</span>
                  </div>
                </div>

                <div className="space-y-3 font-mono text-xs mb-4">
                  <div className="p-2.5 rounded bg-cyber-card border border-cyber-cardBorder/40">
                    <span className="text-slate-400 block mb-0.5 font-bold">PERFIL OFICIAL DE COMBATE:</span>
                    <p className="font-outfit text-xs text-slate-200 leading-relaxed">
                      {selectedHeroClass.combatProfile}
                    </p>
                  </div>

                  <div className="p-2.5 rounded bg-cyan-950/30 border border-cyan-500/40">
                    <span className="text-cyber-cyan block mb-0.5 font-bold">ARMA PRIMÁRIA & MUNIÇÃO:</span>
                    <span className="text-white font-bold block mb-1">{selectedHeroClass.weaponName}</span>
                    <span className="text-cyan-200 block text-[11px] mb-1 font-semibold">{selectedHeroClass.munitionName}</span>
                    <p className="font-outfit text-xs text-slate-300 leading-relaxed">
                      {selectedHeroClass.munitionDetails}
                    </p>
                  </div>

                  <div className="flex justify-between p-2 rounded bg-cyber-card border border-cyber-cardBorder/40 text-[11px]">
                    <span className="text-slate-400">Implementação no Motor:</span>
                    <span className="text-white font-mono">{selectedHeroClass.codeRef}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
import React, { useState, useEffect, useRef } from 'react';
import {
  FORMS_DATA,
  RARITIES_DATA,
  CLASSES_DATA,
  ARENA_BOSSES_DATA,
  renderStudioPlayer,
  renderStudioEnemy,
  renderStudioWaveBoss,
  renderStudioArenaBoss,
  renderStudioDrone,
  renderStudioClassMunition
} from '../utils/vectorRenderers';
import { CODEX_ASSETS } from '../data/codexData';
import { User, Skull, ShieldAlert, Award, Crosshair, Target, Download, Sparkles } from 'lucide-react';

type StudioTab = 'player' | 'enemy' | 'wave_boss' | 'arena_boss' | 'drone' | 'class';

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
  const [classId, setClassId] = useState<string>('fighter');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Drones list for dropdown
  const dronesList = CODEX_ASSETS.filter(a => a.category === 'drones');

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
      } else if (activeTab === 'class') {
        renderStudioClassMunition(ctx, classId, canvas.width, canvas.height, elapsed);
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
    classId
  ]);

  // Download High-Res 1080p Render of the current combination
  const handleDownload = () => {
    const offCanvas = document.createElement('canvas');
    offCanvas.width = 1920;
    offCanvas.height = 1080;
    const offCtx = offCanvas.getContext('2d');
    if (!offCtx) return;

    if (activeTab === 'player') {
      renderStudioPlayer(offCtx, playerForm, playerRarity, 1920, 1080, 0);
    } else if (activeTab === 'enemy') {
      renderStudioEnemy(offCtx, enemyForm, enemyRarity, 1920, 1080, 0);
    } else if (activeTab === 'wave_boss') {
      renderStudioWaveBoss(offCtx, waveBossForm, waveBossRarity, 1920, 1080, 0);
    } else if (activeTab === 'arena_boss') {
      renderStudioArenaBoss(offCtx, arenaBossIdx, arenaBossRarity, 1920, 1080, 0);
    } else if (activeTab === 'drone') {
      renderStudioDrone(offCtx, droneId, 1920, 1080, 0);
    } else if (activeTab === 'class') {
      renderStudioClassMunition(offCtx, classId, 1920, 1080, 0);
    }

    const link = document.createElement('a');
    link.download = `AC3GAMES_${activeTab}_1080p.png`;
    link.href = offCanvas.toDataURL('image/png');
    link.click();
  };

  // Helper data getters
  const selectedPlayerForm = FORMS_DATA[playerForm - 1]!;
  const selectedPlayerRarity = RARITIES_DATA[playerRarity - 1]!;

  const selectedEnemyForm = FORMS_DATA[enemyForm - 1]!;
  const selectedEnemyRarity = RARITIES_DATA[enemyRarity - 1]!;

  const selectedWaveBossForm = FORMS_DATA[waveBossForm - 1]!;
  const selectedWaveBossRarity = RARITIES_DATA[waveBossRarity - 1]!;

  const selectedArenaBoss = ARENA_BOSSES_DATA[arenaBossIdx - 1]!;
  const selectedArenaBossRarity = RARITIES_DATA[arenaBossRarity - 1]!;

  const selectedDrone = dronesList.find(d => d.id === droneId) || dronesList[0]!;
  const selectedClass = CLASSES_DATA.find(c => c.id === classId) || CLASSES_DATA[0]!;

  return (
    <div className="bg-cyber-card rounded-3xl p-6 sm:p-8 border border-cyber-cyan/50 shadow-neon-cyan/20 mb-16">
      
      {/* Studio Header & Tab Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-cyber-cardBorder/60 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-cyber-cyan font-mono text-xs font-semibold tracking-wider uppercase mb-1">
            <Sparkles className="w-4 h-4" />
            <span>ESTÚDIO DE COMBINAÇÕES & RENDERS 16:9</span>
          </div>
          <h3 className="font-orbitron font-extrabold text-2xl sm:text-3xl text-white">
            Forja de Combinações & <span className="text-cyber-cyan">Legenda Técnica</span>
          </h3>
        </div>

        {/* Studio 6-Mode Selector */}
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
            <span>Player (Naves)</span>
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
            <span>Inimigos</span>
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
            <span>Boss de Arena</span>
          </button>

          <button
            onClick={() => setActiveTab('drone')}
            className={`px-3 py-2 rounded-xl flex items-center gap-2 transition-all ${
              activeTab === 'drone'
                ? 'bg-emerald-400 text-black font-bold'
                : 'bg-cyber-darker text-slate-300 hover:text-white border border-cyber-cardBorder'
            }`}
          >
            <Crosshair className="w-4 h-4" />
            <span>Drones (16)</span>
          </button>

          <button
            onClick={() => setActiveTab('class')}
            className={`px-3 py-2 rounded-xl flex items-center gap-2 transition-all ${
              activeTab === 'class'
                ? 'bg-blue-500 text-white font-bold'
                : 'bg-cyber-darker text-slate-300 hover:text-white border border-cyber-cardBorder'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>Classes & Munição</span>
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
            <div className="absolute top-3 left-4 font-mono text-[10px] px-2.5 py-1 rounded bg-black/75 border border-white/10 text-slate-300 backdrop-blur-sm">
              RENDER 16:9 // 60 FPS VETORIAL
            </div>
          </div>

          {/* Quick Download Button */}
          <div className="mt-4 flex items-center justify-between font-mono text-xs text-slate-400">
            <span>Resolução oficial de exportação: 1920 × 1080 PNG</span>
            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-xl bg-cyber-darker hover:bg-cyber-cardBorder text-cyber-cyan border border-cyber-cyan/40 hover:border-cyber-cyan flex items-center gap-2 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Baixar Render PNG</span>
            </button>
          </div>
        </div>

        {/* Right: Selectors & Full Explanatory Legend (5 Cols) */}
        <div className="lg:col-span-5 bg-cyber-darker rounded-2xl p-6 border border-cyber-cardBorder flex flex-col justify-between">
          
          {/* TAB 1: PLAYER (FORMA + RARIDADE) */}
          {activeTab === 'player' && (
            <div>
              <div className="mb-6 space-y-4">
                <div>
                  <label className="block text-xs font-mono text-cyber-cyan font-bold uppercase mb-1.5">
                    1. Escolha a Forma do Player ({FORMS_DATA.length} Formas):
                  </label>
                  <select
                    value={playerForm}
                    onChange={(e) => setPlayerForm(Number(e.target.value))}
                    className="w-full bg-cyber-card border border-cyber-cardBorder rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyber-cyan"
                  >
                    {FORMS_DATA.map((f) => (
                      <option key={f.index} value={f.index}>
                        Forma #{f.index}: {f.name} (Mult: {f.multiplier}x)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-cyber-cyan font-bold uppercase mb-1.5">
                    2. Escolha a Raridade ({RARITIES_DATA.length} Raridades):
                  </label>
                  <select
                    value={playerRarity}
                    onChange={(e) => setPlayerRarity(Number(e.target.value))}
                    className="w-full bg-cyber-card border border-cyber-cardBorder rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyber-cyan"
                  >
                    {RARITIES_DATA.map((r) => (
                      <option key={r.index} value={r.index}>
                        Raridade #{r.index}: {r.namePt} ({r.name}) - {r.multiplier}x
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Complete Explanatory Legend */}
              <div className="pt-4 border-t border-cyber-cardBorder/60">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="font-mono text-xs font-bold px-2.5 py-1 rounded"
                    style={{ backgroundColor: `${selectedPlayerRarity.color}22`, color: selectedPlayerRarity.color }}
                  >
                    {selectedPlayerRarity.namePt.toUpperCase()} // MULTIPLIER {selectedPlayerRarity.multiplier}x
                  </span>
                  <span className="font-mono text-xs text-slate-400">
                    Forma #{selectedPlayerForm.index} ({selectedPlayerForm.sides} Lados)
                  </span>
                </div>

                <h4 className="font-orbitron font-bold text-xl text-white mb-2">
                  Chassi {selectedPlayerForm.name}
                </h4>

                <p className="font-outfit text-xs text-slate-300 leading-relaxed mb-4">
                  {selectedPlayerForm.desc}
                </p>

                <div className="space-y-2 font-mono text-xs">
                  <div className="flex justify-between p-2 rounded bg-cyber-card border border-cyber-cardBorder/40">
                    <span className="text-slate-400">Blindagem Efetiva:</span>
                    <span className="text-cyber-cyan font-bold">
                      {Math.round(1000 * selectedPlayerForm.multiplier * selectedPlayerRarity.multiplier)} HP
                    </span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-cyber-card border border-cyber-cardBorder/40">
                    <span className="text-slate-400">Potência da Chama de Plasma:</span>
                    <span className="font-bold" style={{ color: selectedPlayerRarity.flameColor }}>
                      {Math.round(400 * selectedPlayerRarity.multiplier)} kN (Escape Traseiro)
                    </span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-cyber-card border border-cyber-cardBorder/40">
                    <span className="text-slate-400">Fragmentos Orbitais:</span>
                    <span className="text-white font-bold">
                      {selectedPlayerRarity.index} Orbes de Ressonância
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INIMIGO (FORMA + RARIDADE) */}
          {activeTab === 'enemy' && (
            <div>
              <div className="mb-6 space-y-4">
                <div>
                  <label className="block text-xs font-mono text-cyber-neonPink font-bold uppercase mb-1.5">
                    1. Escolha a Forma do Inimigo:
                  </label>
                  <select
                    value={enemyForm}
                    onChange={(e) => setEnemyForm(Number(e.target.value))}
                    className="w-full bg-cyber-card border border-cyber-cardBorder rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyber-neonPink"
                  >
                    {FORMS_DATA.map((f) => (
                      <option key={f.index} value={f.index}>
                        Inimigo #{f.index}: {f.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-cyber-neonPink font-bold uppercase mb-1.5">
                    2. Escolha a Raridade do Inimigo:
                  </label>
                  <select
                    value={enemyRarity}
                    onChange={(e) => setEnemyRarity(Number(e.target.value))}
                    className="w-full bg-cyber-card border border-cyber-cardBorder rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyber-neonPink"
                  >
                    {RARITIES_DATA.map((r) => (
                      <option key={r.index} value={r.index}>
                        Raridade #{r.index}: {r.namePt} ({r.multiplier}x Ameaça)
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
                  AMEAÇA {selectedEnemyRarity.namePt.toUpperCase()} // SENSOR EM CRUZ
                </span>

                <h4 className="font-orbitron font-bold text-xl text-white mb-2">
                  Patrulheiro {selectedEnemyForm.name}
                </h4>

                <p className="font-outfit text-xs text-slate-300 leading-relaxed mb-4">
                  Inimigo autônomo com sensor central de mira em cruz laser. Movimenta-se em patrulha senoidal sobre as plataformas e dispara salvas direcionadas ao chassi do jogador.
                </p>

                <div className="space-y-2 font-mono text-xs">
                  <div className="flex justify-between p-2 rounded bg-cyber-card border border-cyber-cardBorder/40">
                    <span className="text-slate-400">Vida Base:</span>
                    <span className="text-cyber-neonPink font-bold">
                      {Math.round(250 * selectedEnemyForm.multiplier * selectedEnemyRarity.multiplier)} HP
                    </span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-cyber-card border border-cyber-cardBorder/40">
                    <span className="text-slate-400">Dano de Contato:</span>
                    <span className="text-white font-bold">
                      {Math.round(45 * selectedEnemyRarity.multiplier)} Dano Cinético
                    </span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-cyber-card border border-cyber-cardBorder/40">
                    <span className="text-slate-400">Recompensa ao Abater:</span>
                    <span className="text-cyber-neonAmber font-bold">
                      +{Math.round(50 * selectedEnemyRarity.multiplier)} Evolution Points
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BOSS DE ONDA (FORMA + RARIDADE) */}
          {activeTab === 'wave_boss' && (
            <div>
              <div className="mb-6 space-y-4">
                <div>
                  <label className="block text-xs font-mono text-cyber-neonAmber font-bold uppercase mb-1.5">
                    1. Escolha a Forma do Boss de Onda:
                  </label>
                  <select
                    value={waveBossForm}
                    onChange={(e) => setWaveBossForm(Number(e.target.value))}
                    className="w-full bg-cyber-card border border-cyber-cardBorder rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyber-neonAmber"
                  >
                    {FORMS_DATA.map((f) => (
                      <option key={f.index} value={f.index}>
                        Boss de Onda #{f.index}: {f.name}
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
                        Raridade #{r.index}: {r.namePt} ({r.multiplier}x Escala de Onda)
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
                  GUARDIÃO DE ONDA {selectedWaveBossRarity.namePt.toUpperCase()} // PLACAS EXTERNAS
                </span>

                <h4 className="font-orbitron font-bold text-xl text-white mb-2">
                  Boss Colossal {selectedWaveBossForm.name}
                </h4>

                <p className="font-outfit text-xs text-slate-300 leading-relaxed mb-4">
                  Comandante de horda dotado de anéis de placas de blindagem destacáveis, canhão frontal multitorreta e modo enrage com espículas de energia ativadas abaixo de 40% de vida.
                </p>

                <div className="space-y-2 font-mono text-xs">
                  <div className="flex justify-between p-2 rounded bg-cyber-card border border-cyber-cardBorder/40">
                    <span className="text-slate-400">Vida do Chefe:</span>
                    <span className="text-cyber-neonAmber font-bold">
                      {Math.round(8000 * selectedWaveBossForm.multiplier * selectedWaveBossRarity.multiplier)} HP
                    </span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-cyber-card border border-cyber-cardBorder/40">
                    <span className="text-slate-400">Placas Protetoras:</span>
                    <span className="text-white font-bold">{selectedWaveBossForm.sides} Módulos Blindados</span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-cyber-card border border-cyber-cardBorder/40">
                    <span className="text-slate-400">Fase de Fúria (Enrage):</span>
                    <span className="text-cyber-neonPink font-bold">Cadência +50% & Rajada 360°</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: BOSS DE ARENA (12 SUPER BOSSES + RARIDADE) */}
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
                        Boss Arena #{b.index}: {b.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-cyber-neonPurple font-bold uppercase mb-1.5">
                    2. Escolha o Nível de Ascensão / Raridade:
                  </label>
                  <select
                    value={arenaBossRarity}
                    onChange={(e) => setArenaBossRarity(Number(e.target.value))}
                    className="w-full bg-cyber-card border border-cyber-cardBorder rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyber-neonPurple"
                  >
                    {RARITIES_DATA.map((r) => (
                      <option key={r.index} value={r.index}>
                        Ascensão #{r.index}: {r.namePt} ({r.multiplier}x Dificuldade)
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
                  ARENA SUPREMA // {selectedArenaBossRarity.namePt.toUpperCase()}
                </span>

                <h4 className="font-orbitron font-bold text-xl text-white mb-1">
                  {selectedArenaBoss.name}
                </h4>
                <p className="font-mono text-xs text-cyber-neonPurple mb-3">
                  {selectedArenaBoss.title}
                </p>

                <p className="font-outfit text-xs text-slate-300 leading-relaxed mb-4">
                  Super guardião primordial de arenas fechadas. Gera grades hexagonais de contenção, satélites de disparos em feixe contínuo e tempestades bullet hell omnidirecionais.
                </p>

                <div className="space-y-2 font-mono text-xs">
                  <div className="flex justify-between p-2 rounded bg-cyber-card border border-cyber-cardBorder/40">
                    <span className="text-slate-400">Vida na Arena:</span>
                    <span className="text-cyber-neonPurple font-bold">
                      {Math.round(25000 * selectedArenaBossRarity.multiplier)} HP
                    </span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-cyber-card border border-cyber-cardBorder/40">
                    <span className="text-slate-400">Padrão de Ataque:</span>
                    <span className="text-white font-bold">Hexágono Laser + 6 Satélites</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: DRONE (16 DRONES DA FORJA SUPREMA) */}
          {activeTab === 'drone' && (
            <div>
              <div className="mb-6">
                <label className="block text-xs font-mono text-emerald-400 font-bold uppercase mb-1.5">
                  Escolha o Drone da Forja Suprema (16 Modelos):
                </label>
                <select
                  value={droneId}
                  onChange={(e) => setDroneId(e.target.value)}
                  className="w-full bg-cyber-card border border-cyber-cardBorder rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-emerald-400"
                >
                  {dronesList.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} [{d.badge}]
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
                  {selectedDrone.badge} // FORJA SUPREMA
                </span>

                <h4 className="font-orbitron font-bold text-xl text-white mb-2">
                  {selectedDrone.name}
                </h4>

                <p className="font-outfit text-xs text-slate-300 leading-relaxed mb-4">
                  {selectedDrone.desc}
                </p>

                {selectedDrone.technicalSpecs && (
                  <div className="space-y-2 font-mono text-xs">
                    {selectedDrone.technicalSpecs.map((spec, i) => (
                      <div key={i} className="flex justify-between p-2 rounded bg-cyber-card border border-cyber-cardBorder/40">
                        <span className="text-slate-400">{spec.label}:</span>
                        <span className="text-white font-bold">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 6: CLASSE & MUNIÇÃO */}
          {activeTab === 'class' && (
            <div>
              <div className="mb-6">
                <label className="block text-xs font-mono text-blue-400 font-bold uppercase mb-1.5">
                  Escolha o Arquétipo de Classe (Imagem Exibe a Munição):
                </label>
                <select
                  value={classId}
                  onChange={(e) => setClassId(e.target.value)}
                  className="w-full bg-cyber-card border border-cyber-cardBorder rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-blue-400"
                >
                  {CLASSES_DATA.map((c) => (
                    <option key={c.id} value={c.id}>
                      Classe: {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Explanatory Legend */}
              <div className="pt-4 border-t border-cyber-cardBorder/60">
                <span
                  className="font-mono text-xs font-bold px-2.5 py-1 rounded inline-block mb-2"
                  style={{ backgroundColor: `${selectedClass.color}22`, color: selectedClass.color }}
                >
                  {selectedClass.munitionName.toUpperCase()}
                </span>

                <h4 className="font-orbitron font-bold text-xl text-white mb-1">
                  {selectedClass.name}
                </h4>
                <p className="font-mono text-xs text-cyber-cyan mb-3">
                  Arma Padrão: {selectedClass.weaponName}
                </p>

                <p className="font-outfit text-xs text-slate-300 leading-relaxed mb-4">
                  {selectedClass.desc}
                </p>

                <div className="font-mono text-xs mb-3">
                  <span className="block text-slate-400 mb-1.5 uppercase font-bold text-[10px]">Atributos Primários:</span>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2 rounded bg-cyber-card border border-cyber-cardBorder/40 text-center">
                      <span className="text-[10px] text-slate-500 block">STR</span>
                      <span className="font-bold text-white">{selectedClass.attributes.str}</span>
                    </div>
                    <div className="p-2 rounded bg-cyber-card border border-cyber-cardBorder/40 text-center">
                      <span className="text-[10px] text-slate-500 block">DEX</span>
                      <span className="font-bold text-white">{selectedClass.attributes.dex}</span>
                    </div>
                    <div className="p-2 rounded bg-cyber-card border border-cyber-cardBorder/40 text-center">
                      <span className="text-[10px] text-slate-500 block">CON</span>
                      <span className="font-bold text-white">{selectedClass.attributes.con}</span>
                    </div>
                    <div className="p-2 rounded bg-cyber-card border border-cyber-cardBorder/40 text-center">
                      <span className="text-[10px] text-slate-500 block">INT</span>
                      <span className="font-bold text-white">{selectedClass.attributes.int}</span>
                    </div>
                    <div className="p-2 rounded bg-cyber-card border border-cyber-cardBorder/40 text-center">
                      <span className="text-[10px] text-slate-500 block">WIT</span>
                      <span className="font-bold text-white">{selectedClass.attributes.wit}</span>
                    </div>
                    <div className="p-2 rounded bg-cyber-card border border-cyber-cardBorder/40 text-center">
                      <span className="text-[10px] text-slate-500 block">MEN</span>
                      <span className="font-bold text-white">{selectedClass.attributes.men}</span>
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded bg-blue-950/40 border border-blue-500/30 font-mono text-[11px] text-blue-200">
                  A munição exibida ao lado possui trajetória e física balística única calculada em tempo real no motor de jogo.
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import {
  CATALOG_FORMS,
  FORMS_DATA,
  RARITIES_DATA,
  ARENA_BOSSES_DATA,
  DRONES_DATA,
  PROJECTILES_DATA,
  renderStudioPlayer,
  renderStudioEnemy,
  renderStudioWaveBoss,
  renderStudioArenaBoss,
  renderStudioDrone,
  renderStudioClassMunition
} from '../utils/vectorRenderers';
import { User, Skull, ShieldAlert, Award, Crosshair, Target, Download, Sparkles } from 'lucide-react';

type StudioTab = 'player' | 'enemy' | 'wave_boss' | 'arena_boss' | 'drone' | 'projectiles';

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
  const [projectileId, setProjectileId] = useState<string>('rocket_missile');

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
      } else if (activeTab === 'projectiles') {
        renderStudioClassMunition(ctx, projectileId, canvas.width, canvas.height, elapsed);
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
    projectileId
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
    } else if (activeTab === 'projectiles') {
      renderStudioClassMunition(offCtx, projectileId, 1920, 1080, 0);
      filename = `projetil_${projectileId}.png`;
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
  const selectedProjectile = PROJECTILES_DATA.find(p => p.id === projectileId) || PROJECTILES_DATA[0]!;

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
                ? 'bg-emerald-400 text-black font-bold'
                : 'bg-cyber-darker text-slate-300 hover:text-white border border-cyber-cardBorder'
            }`}
          >
            <Crosshair className="w-4 h-4" />
            <span>Drones de Combate</span>
          </button>

          <button
            onClick={() => setActiveTab('projectiles')}
            className={`px-3 py-2 rounded-xl flex items-center gap-2 transition-all ${
              activeTab === 'projectiles'
                ? 'bg-blue-500 text-white font-bold'
                : 'bg-cyber-darker text-slate-300 hover:text-white border border-cyber-cardBorder'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>Projéteis de Combate</span>
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
              RENDER 16:9 // CONTORNO PRECISO // 60 FPS
            </div>
          </div>

          {/* Quick Download Button */}
          <div className="mt-4 flex items-center justify-between font-mono text-xs text-slate-400">
            <span>Render vetorial nítido oficial em 1920 × 1080 PNG</span>
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
          
          {/* TAB 1: JOGADOR (VECTOR-01) */}
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
                    {CATALOG_FORMS.map((f, idx) => (
                      <option key={f.key} value={idx + 1}>
                        Forma #{idx + 1}: {f.name} ({f.sides} Lados)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-cyber-cyan font-bold uppercase mb-1.5">
                    2. Escolha a Raridade do Casco ({RARITIES_DATA.length} Raridades):
                  </label>
                  <select
                    value={playerRarity}
                    onChange={(e) => setPlayerRarity(Number(e.target.value))}
                    className="w-full bg-cyber-card border border-cyber-cardBorder rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyber-cyan"
                  >
                    {RARITIES_DATA.map((r) => (
                      <option key={r.index} value={r.index}>
                        Tier #{r.index}: {r.namePt} ({r.multiplier.toFixed(2)}x Potência)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Complete Explanatory Legend with Real In-Game Bonuses */}
              <div className="pt-4 border-t border-cyber-cardBorder/60">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="font-mono text-xs font-bold px-2.5 py-1 rounded"
                    style={{ backgroundColor: `${selectedPlayerRarity.color}22`, color: selectedPlayerRarity.color }}
                  >
                    TIER: {selectedPlayerRarity.namePt.toUpperCase()} // MULTIPLICADOR: {playerCombinedMult.toFixed(2)}x
                  </span>
                  <span className="font-mono text-xs text-slate-400">
                    Forma #{playerForm} ({selectedPlayerForm.sides} Lados)
                  </span>
                </div>

                <h4 className="font-orbitron font-bold text-xl text-white mb-2">
                  Nave Vector-01: {selectedPlayerForm.name}
                </h4>

                <div className="space-y-2 font-mono text-xs mb-4">
                  <div className="p-2.5 rounded bg-cyber-card border border-cyber-cardBorder/40">
                    <span className="text-slate-400 block mb-0.5">BÔNUS DO CHASSI (FORMA):</span>
                    <span className="text-[#00ffaa] font-bold text-sm block">
                      {selectedPlayerForm.bonus}
                    </span>
                  </div>

                  <div className="p-2.5 rounded bg-cyber-card border border-cyber-cardBorder/40">
                    <span className="text-slate-400 block mb-0.5">BÔNUS CONCEDIDO PELA RARIDADE:</span>
                    <span className="text-cyber-cyan font-bold text-sm block">
                      {selectedPlayerRarity.playerBonus}
                    </span>
                  </div>

                  <div className="flex justify-between p-2 rounded bg-cyber-card border border-cyber-cardBorder/40">
                    <span className="text-slate-400">Multiplicador Global de Casco & Dano:</span>
                    <span className="text-emerald-400 font-bold">
                      {playerCombinedMult.toFixed(2)}x Potência
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-cyber-card/60 border border-cyber-cardBorder/40 font-outfit text-xs text-slate-300">
                  <span className="font-semibold text-cyber-cyan block mb-1">ARQUIVO DE LORE DO CHASSI:</span>
                  {selectedPlayerForm.lore}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INIMIGOS COMUNS */}
          {activeTab === 'enemy' && (
            <div>
              <div className="mb-6 space-y-4">
                <div>
                  <label className="block text-xs font-mono text-cyber-cyan font-bold uppercase mb-1.5">
                    1. Escolha a Forma do Inimigo ({CATALOG_FORMS.length} Formas do Bestiário):
                  </label>
                  <select
                    value={enemyForm}
                    onChange={(e) => setEnemyForm(Number(e.target.value))}
                    className="w-full bg-cyber-card border border-cyber-cardBorder rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyber-cyan"
                  >
                    {CATALOG_FORMS.map((f, idx) => (
                      <option key={f.key} value={idx + 1}>
                        #{idx + 1}: {f.name} (Lados: {f.sides} | HP Base: {f.mult.toFixed(2)}x)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-cyber-cyan font-bold uppercase mb-1.5">
                    2. Escolha a Raridade / Grau de Ameaça ({RARITIES_DATA.length} Raridades):
                  </label>
                  <select
                    value={enemyRarity}
                    onChange={(e) => setEnemyRarity(Number(e.target.value))}
                    className="w-full bg-cyber-card border border-cyber-cardBorder rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyber-cyan"
                  >
                    {RARITIES_DATA.map((r) => (
                      <option key={r.index} value={r.index}>
                        Raridade #{r.index}: {r.namePt} ({r.multiplier.toFixed(2)}x Ameaça)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Exact In-Game Catalog Card Layout */}
              <div className="pt-6 border-t border-cyber-cardBorder/60 bg-[#07071a] p-6 rounded-2xl border border-[#1b2a4a]">
                <h3 className="text-center font-orbitron font-extrabold text-2xl sm:text-3xl text-cyber-cyan uppercase tracking-wider mb-6">
                  {selectedEnemyForm.name}
                </h3>

                <div className="space-y-2.5 font-outfit text-base mb-6">
                  <div className="text-slate-300">
                    <span className="font-semibold">LADOS DO POLÍGONO / FORMA:</span>{' '}
                    <span className="font-bold text-white">{selectedEnemyForm.sides}</span>
                  </div>
                  <div className="text-slate-300">
                    <span className="font-semibold">MULTIPLICADOR DE HP BASE DA FORMA:</span>{' '}
                    <span className="font-bold text-white">{selectedEnemyForm.mult.toFixed(2)}x</span>
                  </div>
                  <div className="text-[#00ffaa] font-bold">
                    BÔNUS DO CHASSI: {selectedEnemyForm.bonus}
                  </div>
                </div>

                {/* What the enemy gains with this Rarity */}
                <div className="mb-5 p-3 rounded-xl bg-purple-950/30 border border-purple-500/30">
                  <h5 className="font-mono text-xs font-bold text-purple-300 uppercase mb-1">
                    O QUE O INIMIGO GANHA COM ESTA RARIDADE:
                  </h5>
                  <p className="font-outfit text-xs text-purple-100 leading-relaxed">
                    {selectedEnemyRarity.enemyBonus}
                  </p>
                </div>

                {/* Comportamento */}
                <div className="mb-5">
                  <h5 className="font-outfit font-semibold text-base text-slate-200 mb-1">
                    COMPORTAMENTO:
                  </h5>
                  <p className="font-outfit text-sm text-slate-400 leading-relaxed">
                    {selectedEnemyForm.behavior}
                  </p>
                </div>

                {/* Arquivo de Lore */}
                <div className="mb-5">
                  <h5 className="font-outfit font-semibold text-base text-[#00f0ff] mb-1">
                    ARQUIVO DE LORE:
                  </h5>
                  <p className="font-outfit text-sm text-slate-400 leading-relaxed">
                    {selectedEnemyForm.lore}
                  </p>
                </div>

                <div className="pt-3 border-t border-cyber-cardBorder/40 flex items-center justify-between font-mono text-xs">
                  <span className="text-slate-400">Raridade Selecionada:</span>
                  <span
                    className="font-bold px-2 py-0.5 rounded"
                    style={{ backgroundColor: `${selectedEnemyRarity.color}22`, color: selectedEnemyRarity.color }}
                  >
                    {selectedEnemyRarity.namePt.toUpperCase()} ({selectedEnemyRarity.multiplier.toFixed(2)}x Ameaça)
                  </span>
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
                    1. Escolha a Forma do Boss de Onda:
                  </label>
                  <select
                    value={waveBossForm}
                    onChange={(e) => setWaveBossForm(Number(e.target.value))}
                    className="w-full bg-cyber-card border border-cyber-cardBorder rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyber-neonAmber"
                  >
                    {CATALOG_FORMS.map((f, idx) => (
                      <option key={f.key} value={idx + 1}>
                        Boss de Onda #{idx + 1}: {f.name}
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
                        Raridade #{r.index}: {r.namePt} ({r.multiplier.toFixed(2)}x Escala)
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
                  CHEFÃO DE ONDA PERIÓDICA // TIER {selectedWaveBossRarity.namePt.toUpperCase()}
                </span>

                <h4 className="font-orbitron font-bold text-xl text-white mb-2">
                  Boss Colossal {selectedWaveBossForm.name}
                </h4>

                <p className="font-outfit text-xs text-slate-300 leading-relaxed mb-4">
                  Constructo colossal aumentado em 35% de escala em relação aos inimigos comuns. Dotado de Barra de Vida superior com Escudo Ciano (Barra Branca) e cronômetro de 10 segundos para entrar no modo Fúria (Enrage).
                </p>

                <div className="space-y-2 font-mono text-xs mb-4">
                  <div className="p-2.5 rounded bg-cyber-card border border-cyber-cardBorder/40">
                    <span className="text-slate-400 block mb-0.5">PADRÃO DE ATAQUE & MOVIMENTO:</span>
                    <span className="text-cyber-neonAmber font-bold text-xs block">
                      {selectedWaveBossForm.behavior}
                    </span>
                  </div>

                  <div className="p-2.5 rounded bg-cyber-card border border-cyber-cardBorder/40">
                    <span className="text-slate-400 block mb-0.5">ESCALONAMENTO DA RARIDADE NO BOSS:</span>
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

          {/* TAB 5: DRONES DE COMBATE */}
          {activeTab === 'drone' && (
            <div>
              <div className="mb-6">
                <label className="block text-xs font-mono text-emerald-400 font-bold uppercase mb-1.5">
                  Escolha o Drone de Combate ({DRONES_DATA.length} Modelos):
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
                  DRONE DE COMBATE // {selectedDrone.role.toUpperCase()}
                </span>

                <h4 className="font-orbitron font-bold text-xl text-white mb-1">
                  {selectedDrone.namePt}
                </h4>
                <p className="font-mono text-xs text-cyber-cyan mb-3">
                  {selectedDrone.nameEn}
                </p>

                <div className="space-y-3 font-mono text-xs mb-4">
                  <div className="p-2.5 rounded bg-cyber-card border border-cyber-cardBorder/40">
                    <span className="text-slate-400 block mb-0.5 font-bold">O QUE O DRONE FAZ EM COMBATE:</span>
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

                  <div className="flex justify-between p-2 rounded bg-cyber-card border border-cyber-cardBorder/40 text-[11px]">
                    <span className="text-slate-400">Implementação no Motor:</span>
                    <span className="text-white font-mono">{selectedDrone.codeRef}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: PROJÉTEIS DE COMBATE */}
          {activeTab === 'projectiles' && (
            <div>
              <div className="mb-6">
                <label className="block text-xs font-mono text-blue-400 font-bold uppercase mb-1.5">
                  Escolha o Projétil / Munição ({PROJECTILES_DATA.length} Tipos de Balística):
                </label>
                <select
                  value={projectileId}
                  onChange={(e) => setProjectileId(e.target.value)}
                  className="w-full bg-cyber-card border border-cyber-cardBorder rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-blue-400"
                >
                  {PROJECTILES_DATA.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.namePt} ({p.className})
                    </option>
                  ))}
                </select>
              </div>

              {/* Explanatory Legend */}
              <div className="pt-4 border-t border-cyber-cardBorder/60">
                <span
                  className="font-mono text-xs font-bold px-2.5 py-1 rounded inline-block mb-2"
                  style={{ backgroundColor: `${selectedProjectile.color}22`, color: selectedProjectile.color }}
                >
                  MUNIÇÃO PROCEDURAL // {selectedProjectile.className.toUpperCase()}
                </span>

                <h4 className="font-orbitron font-bold text-xl text-white mb-1">
                  {selectedProjectile.namePt}
                </h4>
                <p className="font-mono text-xs text-cyber-cyan mb-3">
                  {selectedProjectile.weaponName}
                </p>

                <div className="space-y-3 font-mono text-xs mb-4">
                  <div className="p-2.5 rounded bg-cyber-card border border-cyber-cardBorder/40">
                    <span className="text-slate-400 block mb-0.5 font-bold">O QUE O PROJÉTIL FAZ (VISUAL & BALÍSTICA):</span>
                    <p className="font-outfit text-xs text-slate-200 leading-relaxed">
                      {selectedProjectile.projectileBehavior}
                    </p>
                  </div>

                  <div className="p-2.5 rounded bg-blue-950/30 border border-blue-500/40">
                    <span className="text-blue-300 block mb-0.5 font-bold">DANO & EFEITOS DE STATUS:</span>
                    <p className="font-outfit text-xs text-blue-100 leading-relaxed">
                      {selectedProjectile.damageAndEffects}
                    </p>
                  </div>

                  <div className="p-2.5 rounded bg-emerald-950/30 border border-emerald-500/40">
                    <span className="text-[#00ffaa] block mb-0.5 font-bold">BÔNUS CONCEDIDOS PELA CLASSE:</span>
                    <p className="font-outfit text-xs text-emerald-100 leading-relaxed">
                      {selectedProjectile.classBonuses}
                    </p>
                  </div>

                  <div className="flex justify-between p-2 rounded bg-cyber-card border border-cyber-cardBorder/40 text-[11px]">
                    <span className="text-slate-400">Implementação no Motor:</span>
                    <span className="text-white font-mono">{selectedProjectile.codeRef}</span>
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

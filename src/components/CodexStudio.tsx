import React, { useState, useEffect, useRef } from 'react';
import {
  CATALOG_FORMS,
  FORMS_DATA,
  RARITIES_DATA,
  CLASSES_DATA,
  ARENA_BOSSES_DATA,
  CYBER_EXPRESSIONS,
  renderStudioPlayer,
  renderStudioEnemy,
  renderStudioWaveBoss,
  renderStudioArenaBoss,
  renderStudioDrone,
  renderStudioClassMunition,
  renderStudioExpression
} from '../utils/vectorRenderers';
import { CODEX_ASSETS } from '../data/codexData';
import { User, Skull, ShieldAlert, Award, Crosshair, Target, Download, Sparkles, Smile } from 'lucide-react';

type StudioTab = 'player' | 'enemy' | 'wave_boss' | 'arena_boss' | 'drone' | 'class' | 'expression';

export const CodexStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<StudioTab>('enemy');

  // Selectors State
  const [playerForm, setPlayerForm] = useState<number>(12); // Defaults to Flower
  const [playerRarity, setPlayerRarity] = useState<number>(12); // Defaults to Mythic

  const [enemyForm, setEnemyForm] = useState<number>(1);
  const [enemyRarity, setEnemyRarity] = useState<number>(1);

  const [waveBossForm, setWaveBossForm] = useState<number>(1);
  const [waveBossRarity, setWaveBossRarity] = useState<number>(1);

  const [arenaBossIdx, setArenaBossIdx] = useState<number>(1);
  const [arenaBossRarity, setArenaBossRarity] = useState<number>(1);

  const [droneId, setDroneId] = useState<string>('missiles');
  const [classId, setClassId] = useState<string>('fighter');
  const [expressionId, setExpressionId] = useState<string>('Happy');

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
      } else if (activeTab === 'expression') {
        renderStudioExpression(ctx, expressionId, canvas.width, canvas.height, elapsed);
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
    classId,
    expressionId
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
    } else if (activeTab === 'expression') {
      renderStudioExpression(offCtx, expressionId, 1920, 1080, 0);
    }

    const link = document.createElement('a');
    link.download = `AC3GAMES_${activeTab}_1080p.png`;
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

  const selectedDrone = dronesList.find(d => d.id === droneId) || dronesList[0]!;
  const selectedClass = CLASSES_DATA.find(c => c.id === classId) || CLASSES_DATA[0]!;
  const selectedExpression = CYBER_EXPRESSIONS.find(e => e.id === expressionId) || CYBER_EXPRESSIONS[0]!;

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
            <span>Inimigos (Fixos)</span>
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

          <button
            onClick={() => setActiveTab('expression')}
            className={`px-3 py-2 rounded-xl flex items-center gap-2 transition-all ${
              activeTab === 'expression'
                ? 'bg-amber-400 text-black font-bold'
                : 'bg-cyber-darker text-slate-300 hover:text-white border border-cyber-cardBorder'
            }`}
          >
            <Smile className="w-4 h-4" />
            <span>Expressões (20)</span>
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
          
          {/* TAB 1: PLAYER (FORMA + RARIDADE COM BÔNUS REAIS) */}
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
                        Forma #{idx + 1}: {f.name} (Mult: {f.mult.toFixed(2)}x)
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
                        Raridade #{r.index}: {r.namePt} ({r.name}) - {r.multiplier}x
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
                    {selectedPlayerRarity.namePt.toUpperCase()} // MULTIPLICADOR GLOBAL: {playerCombinedMult.toFixed(2)}x
                  </span>
                  <span className="font-mono text-xs text-slate-400">
                    Forma #{playerForm} ({selectedPlayerForm.sides} Lados)
                  </span>
                </div>

                <h4 className="font-orbitron font-bold text-xl text-white mb-2">
                  Chassi {selectedPlayerForm.name}
                </h4>

                <div className="space-y-2 font-mono text-xs mb-4">
                  <div className="flex justify-between p-2 rounded bg-cyber-card border border-cyber-cardBorder/40">
                    <span className="text-slate-400">Bônus Nativo do Chassi:</span>
                    <span className="text-[#00ffaa] font-bold">
                      {selectedPlayerForm.bonus}
                    </span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-cyber-card border border-cyber-cardBorder/40">
                    <span className="text-slate-400">Multiplicador de Atributos:</span>
                    <span className="text-cyber-cyan font-bold">
                      {playerCombinedMult.toFixed(2)}x Global
                    </span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-cyber-card border border-cyber-cardBorder/40">
                    <span className="text-slate-400">Bônus de Estrutura Máxima (HP):</span>
                    <span className="text-emerald-400 font-bold">
                      +{Math.round((playerCombinedMult - 1) * 100)}% de Vida
                    </span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-cyber-card border border-cyber-cardBorder/40">
                    <span className="text-slate-400">Bônus de Dano de Todas as Armas & Drones:</span>
                    <span className="text-cyber-neonAmber font-bold">
                      +{Math.round((playerCombinedMult - 1) * 100)}% de Dano
                    </span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-cyber-card border border-cyber-cardBorder/40">
                    <span className="text-slate-400">Bônus de Eficiência de Escudo:</span>
                    <span className="text-purple-300 font-bold">
                      +{Math.round((playerCombinedMult - 1) * 60)}% Absorção
                    </span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-cyber-card border border-cyber-cardBorder/40">
                    <span className="text-slate-400">Multiplicador de Pontuação (Score):</span>
                    <span className="text-cyber-neonPink font-bold">
                      {selectedPlayerRarity.multiplier.toFixed(2)}x Pontos
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-cyber-card/60 border border-cyber-cardBorder/40 font-outfit text-xs text-slate-300">
                  <span className="font-semibold text-cyber-cyan block mb-1">ARQUIVO DE LORE:</span>
                  {selectedPlayerForm.lore}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INIMIGO (COPIADO 100% DA BIBLIOTECA DO JOGO COMO NAS 5 FOTOS) */}
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

              {/* Exact In-Game Catalog Card Layout as in Photos 1-5 */}
              <div className="pt-6 border-t border-cyber-cardBorder/60 bg-[#07071a] p-6 rounded-2xl border border-[#1b2a4a]">
                {/* Centered Title in Cyan */}
                <h3 className="text-center font-orbitron font-extrabold text-2xl sm:text-3xl text-cyber-cyan uppercase tracking-wider mb-6">
                  {selectedEnemyForm.name}
                </h3>

                {/* Technical Specs matching photos */}
                <div className="space-y-2.5 font-outfit text-base mb-6">
                  <div className="text-slate-300">
                    <span className="font-semibold">LADOS DO POLÍGONO / FORMA:</span>{' '}
                    <span className="font-bold text-white">{selectedEnemyForm.sides}</span>
                  </div>
                  <div className="text-slate-300">
                    <span className="font-semibold">MULTIPLICADOR DE HP BASE:</span>{' '}
                    <span className="font-bold text-white">{selectedEnemyForm.mult.toFixed(2)}x</span>
                  </div>
                  <div className="text-[#00ffaa] font-bold">
                    BÔNUS DO CHASSI: {selectedEnemyForm.bonus}
                  </div>
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

                {/* Rarity Scaling Factor Indicator */}
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
                      {Math.round(4500 * selectedWaveBossForm.mult * selectedWaveBossRarity.multiplier)} HP
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

          {/* TAB 4: BOSS DE ARENA */}
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
                    <span className="text-white font-bold">Hexágono Laser + Satélites</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: DRONE */}
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

          {/* TAB 7: EXPRESSÕES (20 MATRIZES SENSORIAIS HUD - EXATAMENTE COMO NA FOTO 2) */}
          {activeTab === 'expression' && (
            <div>
              <div className="mb-6">
                <label className="block text-xs font-mono text-amber-400 font-bold uppercase mb-1.5">
                  Escolha a Expressão Emocional HUD (20 Estados):
                </label>
                <select
                  value={expressionId}
                  onChange={(e) => setExpressionId(e.target.value)}
                  className="w-full bg-cyber-card border border-cyber-cardBorder rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-amber-400"
                >
                  {CYBER_EXPRESSIONS.map((expr) => (
                    <option key={expr.id} value={expr.id}>
                      {expr.namePt} ({expr.descPt})
                    </option>
                  ))}
                </select>
              </div>

              {/* Exact In-Game Expression Card Layout as in Photo 2 */}
              <div className="pt-6 border-t border-cyber-cardBorder/60 bg-[#07071a] p-6 rounded-2xl border border-[#1b2a4a]">
                <h3 className="font-orbitron font-extrabold text-3xl text-cyber-cyan uppercase tracking-wider mb-5">
                  {selectedExpression.namePt}
                </h3>

                <div className="mb-5">
                  <span className="font-mono text-xs text-slate-400 uppercase tracking-wider block mb-1">
                    SINERGIA DE BUILD DESIGNADA:
                  </span>
                  <span className="font-orbitron font-bold text-lg text-[#ffd700]">
                    {selectedExpression.synergyPt}
                  </span>
                </div>

                <div className="mb-5">
                  <span className="font-mono text-xs text-slate-400 uppercase tracking-wider block mb-1">
                    BÔNUS DE ATRIBUTOS E HABILIDADES:
                  </span>
                  <span className="font-orbitron font-bold text-lg text-[#00ffaa]">
                    {selectedExpression.descPt}
                  </span>
                </div>

                <div>
                  <span className="font-mono text-xs text-cyber-cyan uppercase tracking-wider block mb-1.5 font-bold">
                    ESTRUTURA DE VETORES & EXPRESSÃO EMOCIONAL:
                  </span>
                  <p className="font-outfit text-sm text-slate-300 leading-relaxed">
                    {selectedExpression.lore}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-cyber-cardBorder/40 flex items-center justify-between font-mono text-xs text-slate-400">
                  <span>Sensor Óptico:</span>
                  <span className="text-cyber-cyan font-bold">MATRIZ SENSORIAL HUD</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

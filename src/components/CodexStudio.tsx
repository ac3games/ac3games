import React, { useState, useEffect, useRef } from 'react';
import {
  CATALOG_FORMS,
  RARITIES_DATA,
  CYBER_EXPRESSIONS,
  ARENA_BOSSES_DATA,
  DRONES_DATA,
  HERO_CLASSES_DATA,
  BIOME_AURAS_DATA,
  BIOME_SCENARIOS_DATA,
  renderStudioPlayer,
  renderStudioExpression,
  renderStudioEnemy,
  renderStudioWaveBoss,
  renderStudioArenaBoss,
  renderStudioDrone,
  renderStudioHeroClassWeapon,
  renderStudioBiomeAura,
  renderStudioBiomeScenario
} from '../utils/vectorRenderers';
import { User, Skull, ShieldAlert, Award, Crosshair, Zap, Compass, Download, Sparkles, Layers, Eye } from 'lucide-react';

type StudioTab = 'player' | 'hud_expression' | 'enemy' | 'wave_boss' | 'arena_boss' | 'drone' | 'hero_class' | 'biome_aura' | 'biome_platform';

export const CodexStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<StudioTab>('player');

  // Selectors State
  const [playerForm, setPlayerForm] = useState<number>(1);
  const [playerRarity, setPlayerRarity] = useState<number>(1);
  const [playerExpression, setPlayerExpression] = useState<string>('none');
  const [hudExpressionId, setHudExpressionId] = useState<string>('Happy');

  const [enemyForm, setEnemyForm] = useState<number>(1);
  const [enemyRarity, setEnemyRarity] = useState<number>(1);

  const [waveBossForm, setWaveBossForm] = useState<number>(1);
  const [waveBossRarity, setWaveBossRarity] = useState<number>(1);

  const [arenaBossIdx, setArenaBossIdx] = useState<number>(1);
  const [arenaBossRarity, setArenaBossRarity] = useState<number>(1);

  const [droneId, setDroneId] = useState<string>('missiles');
  const [heroClassId, setHeroClassId] = useState<string>('vanguard');
  const [isEvolved, setIsEvolved] = useState<boolean>(false);
  const [biomeAuraId, setBiomeAuraId] = useState<string>('normal');
  const [biomePlatformId, setBiomePlatformId] = useState<string>('normal');
  const [platformViewMode, setPlatformViewMode] = useState<'3lanes' | 'single'>('3lanes');

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
        renderStudioPlayer(ctx, playerForm, playerRarity, canvas.width, canvas.height, elapsed, playerExpression);
      } else if (activeTab === 'hud_expression') {
        renderStudioExpression(ctx, hudExpressionId, canvas.width, canvas.height, elapsed);
      } else if (activeTab === 'enemy') {
        renderStudioEnemy(ctx, enemyForm, enemyRarity, canvas.width, canvas.height, elapsed);
      } else if (activeTab === 'wave_boss') {
        renderStudioWaveBoss(ctx, waveBossForm, waveBossRarity, canvas.width, canvas.height, elapsed);
      } else if (activeTab === 'arena_boss') {
        renderStudioArenaBoss(ctx, arenaBossIdx, arenaBossRarity, canvas.width, canvas.height, elapsed);
      } else if (activeTab === 'drone') {
        renderStudioDrone(ctx, droneId, canvas.width, canvas.height, elapsed);
      } else if (activeTab === 'hero_class') {
        renderStudioHeroClassWeapon(ctx, heroClassId, canvas.width, canvas.height, elapsed, isEvolved);
      } else if (activeTab === 'biome_aura') {
        renderStudioBiomeAura(ctx, biomeAuraId, canvas.width, canvas.height, elapsed);
      } else if (activeTab === 'biome_platform') {
        renderStudioBiomeScenario(ctx, biomePlatformId, canvas.width, canvas.height, elapsed, platformViewMode);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [
    activeTab,
    playerForm,
    playerRarity,
    playerExpression,
    hudExpressionId,
    enemyForm,
    enemyRarity,
    waveBossForm,
    waveBossRarity,
    arenaBossIdx,
    arenaBossRarity,
    droneId,
    heroClassId,
    isEvolved,
    biomeAuraId,
    biomePlatformId,
    platformViewMode
  ]);

  type AspectRatioFormat = '21:9' | '16:9' | '9:16';

  const FORMAT_CONFIG: Record<AspectRatioFormat, { width: number; height: number; tag: string }> = {
    '21:9': { width: 2560, height: 1080, tag: '21x9_ultrawide' },
    '16:9': { width: 1920, height: 1080, tag: '16x9_fhd' },
    '9:16': { width: 1080, height: 1920, tag: '9x16_mobile' }
  };

  // Download Crystal Clear PNG in 21:9, 16:9 or 9:16
  const handleDownload = (format: AspectRatioFormat = '16:9') => {
    const { width, height, tag } = FORMAT_CONFIG[format];
    const offCanvas = document.createElement('canvas');
    offCanvas.width = width;
    offCanvas.height = height;
    const offCtx = offCanvas.getContext('2d');
    if (!offCtx) return;

    let filename = `AC3GAMES_${tag}.png`;

    if (activeTab === 'player') {
      renderStudioPlayer(offCtx, playerForm, playerRarity, width, height, 0, playerExpression);
      filename = `player_forma_${playerForm}_raridade_${playerRarity}_expr_${playerExpression}_${tag}.png`;
    } else if (activeTab === 'hud_expression') {
      renderStudioExpression(offCtx, hudExpressionId, width, height, 0);
      filename = `expressao_hud_${hudExpressionId}_${tag}.png`;
    } else if (activeTab === 'enemy') {
      renderStudioEnemy(offCtx, enemyForm, enemyRarity, width, height, 0);
      filename = `inimigo_forma_${enemyForm}_raridade_${enemyRarity}_${tag}.png`;
    } else if (activeTab === 'wave_boss') {
      renderStudioWaveBoss(offCtx, waveBossForm, waveBossRarity, width, height, 0);
      filename = `wave_boss_forma_${waveBossForm}_raridade_${waveBossRarity}_${tag}.png`;
    } else if (activeTab === 'arena_boss') {
      renderStudioArenaBoss(offCtx, arenaBossIdx, arenaBossRarity, width, height, 0);
      filename = `arena_boss_${arenaBossIdx}_raridade_${arenaBossRarity}_${tag}.png`;
    } else if (activeTab === 'drone') {
      renderStudioDrone(offCtx, droneId, width, height, 0);
      filename = `drone_${droneId}_${tag}.png`;
    } else if (activeTab === 'hero_class') {
      renderStudioHeroClassWeapon(offCtx, heroClassId, width, height, 0, isEvolved);
      filename = `classe_heroi_${heroClassId}${isEvolved ? '_evolucao_reliquia' : '_base'}_${tag}.png`;
    } else if (activeTab === 'biome_aura') {
      renderStudioBiomeAura(offCtx, biomeAuraId, width, height, 0);
      filename = `codex_aura_${biomeAuraId}_${tag}.png`;
    } else if (activeTab === 'biome_platform') {
      renderStudioBiomeScenario(offCtx, biomePlatformId, width, height, 0, platformViewMode);
      filename = `cenario_plataforma_${biomePlatformId}_${platformViewMode}_${tag}.png`;
    }

    const link = document.createElement('a');
    link.download = filename;
    link.href = offCanvas.toDataURL('image/png');
    link.click();
  };

  // Helper data getters
  const isPlayerFormNone = playerForm === 0;
  const isPlayerRarityNone = playerRarity === 0;
  const isPlayerExprNone = playerExpression === 'none';

  const selectedPlayerForm = isPlayerFormNone ? null : (CATALOG_FORMS[playerForm - 1] || CATALOG_FORMS[0]!);
  const selectedPlayerRarity = isPlayerRarityNone ? null : (RARITIES_DATA[playerRarity - 1] || RARITIES_DATA[0]!);
  const selectedPlayerExpr = isPlayerExprNone ? null : (CYBER_EXPRESSIONS.find(e => e.id === playerExpression) || CYBER_EXPRESSIONS[0]!);

  const playerFormMult = selectedPlayerForm ? selectedPlayerForm.mult : 1.0;
  const playerRarityMult = selectedPlayerRarity ? selectedPlayerRarity.multiplier : 1.0;
  const playerCombinedMult = playerFormMult * playerRarityMult;

  const selectedStandaloneExpr = CYBER_EXPRESSIONS.find(e => e.id === hudExpressionId) || CYBER_EXPRESSIONS[0]!;

  const selectedEnemyForm = CATALOG_FORMS[enemyForm - 1] || CATALOG_FORMS[0]!;
  const selectedEnemyRarity = RARITIES_DATA[enemyRarity - 1] || RARITIES_DATA[0]!;

  const selectedWaveBossForm = CATALOG_FORMS[waveBossForm - 1] || CATALOG_FORMS[0]!;
  const selectedWaveBossRarity = RARITIES_DATA[waveBossRarity - 1] || RARITIES_DATA[0]!;

  const selectedArenaBoss = ARENA_BOSSES_DATA[arenaBossIdx - 1] || ARENA_BOSSES_DATA[0]!;
  const selectedArenaBossRarity = RARITIES_DATA[arenaBossRarity - 1] || RARITIES_DATA[0]!;

  const selectedDrone = DRONES_DATA.find(d => d.id === droneId) || DRONES_DATA[0]!;
  const selectedHeroClass = HERO_CLASSES_DATA.find(c => c.id === heroClassId) || HERO_CLASSES_DATA[0]!;
  const selectedBiomeAura = BIOME_AURAS_DATA.find(a => a.id === biomeAuraId) || BIOME_AURAS_DATA[0]!;
  const selectedBiomePlatform = BIOME_SCENARIOS_DATA.find(b => b.id === biomePlatformId) || BIOME_SCENARIOS_DATA[0]!;

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
            onClick={() => setActiveTab('hud_expression')}
            className={`px-3 py-2 rounded-xl flex items-center gap-2 transition-all ${
              activeTab === 'hud_expression'
                ? 'bg-cyber-cyan text-black font-bold shadow-neon-cyan'
                : 'bg-cyber-darker text-slate-300 hover:text-white border border-cyber-cardBorder'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Matriz Sensorial HUD (20)</span>
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

          <button
            onClick={() => setActiveTab('biome_aura')}
            className={`px-3 py-2 rounded-xl flex items-center gap-2 transition-all ${
              activeTab === 'biome_aura'
                ? 'bg-emerald-400 text-black font-bold shadow-lg shadow-emerald-400/25'
                : 'bg-cyber-darker text-slate-300 hover:text-white border border-cyber-cardBorder'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Auras de Biomas (11)</span>
          </button>

          <button
            onClick={() => setActiveTab('biome_platform')}
            className={`px-3 py-2 rounded-xl flex items-center gap-2 transition-all ${
              activeTab === 'biome_platform'
                ? 'bg-cyber-cyan text-black font-bold shadow-neon-cyan'
                : 'bg-cyber-darker text-slate-300 hover:text-white border border-cyber-cardBorder'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Cenários & Plataformas (11)</span>
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

          {/* Formatos de Download Oficial: 21:9 / 16:9 / 9:16 */}
          <div className="mt-4 p-3.5 rounded-2xl bg-cyber-darker border border-cyber-cardBorder/80 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex flex-col">
              <span className="font-mono text-xs font-bold text-white flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5 text-cyber-cyan" />
                <span>BAIXAR RENDER VETORIAL HD:</span>
              </span>
              <span className="font-mono text-[11px] text-slate-400">
                Selecione o formato para wallpaper ou celular
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              {/* 21:9 Ultrawide */}
              <button
                onClick={() => handleDownload('21:9')}
                className="px-3 py-2 rounded-xl bg-purple-950/40 border border-purple-500/40 hover:border-purple-400 text-purple-200 hover:text-white hover:bg-purple-900/50 font-bold transition-all flex items-center gap-1.5 shadow-sm hover:shadow-neon-purple/20"
                title="Download 21:9 Ultrawide (2560 × 1080)"
              >
                <span>🖥️ 21:9 Ultrawide</span>
              </button>

              {/* 16:9 Widescreen */}
              <button
                onClick={() => handleDownload('16:9')}
                className="px-3.5 py-2 rounded-xl bg-cyber-cyan text-black font-extrabold hover:bg-cyan-300 transition-all flex items-center gap-1.5 shadow-neon-cyan"
                title="Download 16:9 Widescreen Full HD (1920 × 1080)"
              >
                <span>📺 16:9 Padrão</span>
              </button>

              {/* 9:16 Mobile */}
              <button
                onClick={() => handleDownload('9:16')}
                className="px-3 py-2 rounded-xl bg-pink-950/40 border border-pink-500/40 hover:border-pink-400 text-pink-200 hover:text-white hover:bg-pink-900/50 font-bold transition-all flex items-center gap-1.5 shadow-sm hover:shadow-neon-pink/20"
                title="Download 9:16 Vertical Mobile / Stories / Celular (1080 × 1920)"
              >
                <span>📱 9:16 Mobile</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Technical Explanation & Complete Dynamic Legend (5 Cols) */}
        <div className="lg:col-span-5 bg-cyber-darker/90 rounded-2xl p-6 border border-cyber-cardBorder flex flex-col">
          
          {/* TAB 1: JOGADOR (VECTOR-01) - FORMAS + RARIDADES + EXPRESSÕES */}
          {activeTab === 'player' && (
            <div>
              <div className="mb-6 space-y-4">
                {/* 1. SELETOR DE FORMA */}
                <div>
                  <label className="block text-xs font-mono text-cyber-cyan font-bold uppercase mb-1.5 flex items-center justify-between">
                    <span>1. Forma do Jogador (Chassi 1 a 12 ou None):</span>
                    <span className="text-[11px] text-slate-400 font-normal">
                      {isPlayerFormNone ? 'Chassi Desacoplado' : `${selectedPlayerForm?.mult.toFixed(2)}x Casco`}
                    </span>
                  </label>
                  <select
                    value={playerForm}
                    onChange={(e) => setPlayerForm(Number(e.target.value))}
                    className="w-full bg-cyber-card border border-cyber-cardBorder rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyber-cyan"
                  >
                    <option value={0} className="text-amber-400 font-bold">
                      0. Nenhuma Forma (Chassi Vazio / Base 1.00x)
                    </option>
                    {CATALOG_FORMS.map((f, idx) => (
                      <option key={f.key} value={idx + 1}>
                        Forma #{idx + 1}: {f.name} ({f.mult.toFixed(2)}x) — {f.sides} Lados
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. SELETOR DE RARIDADE */}
                <div>
                  <label className="block text-xs font-mono text-emerald-400 font-bold uppercase mb-1.5 flex items-center justify-between">
                    <span>2. Raridade do Jogador (Sintonia 1 a 12 ou None):</span>
                    <span className="text-[11px] text-slate-400 font-normal">
                      {isPlayerRarityNone ? 'Neutro (1.00x)' : `${selectedPlayerRarity?.multiplier.toFixed(2)}x Reator`}
                    </span>
                  </label>
                  <select
                    value={playerRarity}
                    onChange={(e) => setPlayerRarity(Number(e.target.value))}
                    className="w-full bg-cyber-card border border-cyber-cardBorder rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-emerald-400"
                  >
                    <option value={0} className="text-amber-400 font-bold">
                      0. Nenhuma Raridade (Neutro / 1.00x Base)
                    </option>
                    {RARITIES_DATA.map((r) => (
                      <option key={r.index} value={r.index}>
                        Raridade #{r.index}: {r.namePt} ({r.multiplier.toFixed(2)}x)
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. SELETOR DE EXPRESSÃO HUD */}
                <div>
                  <label className="block text-xs font-mono text-pink-400 font-bold uppercase mb-1.5 flex items-center justify-between">
                    <span>3. Expressão Cibernética HUD (Sensor 1 a 20 ou None):</span>
                    <span className="text-[11px] text-slate-400 font-normal">
                      {isPlayerExprNone ? 'Sem Sensor HUD' : selectedPlayerExpr?.namePt}
                    </span>
                  </label>
                  <select
                    value={playerExpression}
                    onChange={(e) => setPlayerExpression(e.target.value)}
                    className="w-full bg-cyber-card border border-cyber-cardBorder rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-pink-400"
                  >
                    <option value="none" className="text-amber-400 font-bold">
                      0. Nenhuma Expressão (Sem Sensor HUD)
                    </option>
                    {CYBER_EXPRESSIONS.map((ex, idx) => (
                      <option key={ex.id} value={ex.id}>
                        Sensor #{idx + 1}: {ex.namePt} ({ex.nameEn}) — {ex.descPt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Badges de Status das 3 Dimensões */}
              <div className="pt-4 border-t border-cyber-cardBorder/60">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span
                    className="font-mono text-[11px] font-bold px-2.5 py-1 rounded inline-block"
                    style={{
                      backgroundColor: selectedPlayerRarity ? `${selectedPlayerRarity.color}22` : '#64748b22',
                      color: selectedPlayerRarity ? selectedPlayerRarity.color : '#94a3b8',
                      border: `1px solid ${selectedPlayerRarity ? selectedPlayerRarity.color : '#64748b'}55`
                    }}
                  >
                    REATOR: {selectedPlayerRarity ? selectedPlayerRarity.namePt.toUpperCase() : 'NEUTRO (1.00x)'}
                  </span>

                  <span
                    className="font-mono text-[11px] font-bold px-2.5 py-1 rounded inline-block"
                    style={{
                      backgroundColor: selectedPlayerExpr ? `${selectedPlayerExpr.color}22` : '#64748b22',
                      color: selectedPlayerExpr ? selectedPlayerExpr.color : '#94a3b8',
                      border: `1px solid ${selectedPlayerExpr ? selectedPlayerExpr.color : '#64748b'}55`
                    }}
                  >
                    HUD: {selectedPlayerExpr ? selectedPlayerExpr.namePt.toUpperCase() : 'DESATIVADO'}
                  </span>
                </div>

                <h4 className="font-orbitron font-bold text-xl text-white mb-1">
                  Vector-01 • {selectedPlayerForm ? selectedPlayerForm.name : 'Chassi Neutro / Calibração'}
                </h4>
                <p className="font-mono text-xs text-cyber-cyan mb-4">
                  {selectedPlayerForm
                    ? `FORMA #${playerForm} // ${selectedPlayerForm.sides} Lados Poligonais`
                    : 'SEM FUSELAGEM ACOPLADA // Isolamento Analítico de Componentes'}
                </p>

                {/* 3 CARDS ISOLADOS DE BÔNUS + CARD COMBINADO */}
                <div className="space-y-3 font-mono text-xs mb-4">
                  {/* CARD 1: BÔNUS DA FORMA */}
                  <div className="p-3 rounded-xl bg-cyber-card border border-cyber-cyan/30">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-cyber-cyan font-bold">🔷 1. BÔNUS DO CHASSI (FORMA):</span>
                      <span className="text-white font-bold bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/40">
                        {playerFormMult.toFixed(2)}x Casco
                      </span>
                    </div>
                    <span className="text-slate-200 block font-semibold mb-1">
                      {selectedPlayerForm ? selectedPlayerForm.bonus : 'Nenhum Chassi Equipado (Base 1.00x - Sem bônus de casco)'}
                    </span>
                    <span className="text-[11px] text-slate-400 block font-outfit">
                      {selectedPlayerForm ? selectedPlayerForm.behavior : 'Simulação Pura: Casco desativado para medição isolada dos sensores e reator.'}
                    </span>
                  </div>

                  {/* CARD 2: BÔNUS DA RARIDADE */}
                  <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-emerald-400 font-bold">⚡ 2. BÔNUS DO REATOR (RARIDADE):</span>
                      <span className="text-emerald-200 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/40">
                        {playerRarityMult.toFixed(2)}x Reator
                      </span>
                    </div>
                    <span className="text-emerald-200 block font-semibold">
                      {selectedPlayerRarity
                        ? selectedPlayerRarity.playerBonus
                        : 'Reator Neutro (1.00x Stats Base - Sem bônus elemental ou amplificação)'}
                    </span>
                  </div>

                  {/* CARD 3: BÔNUS DA EXPRESSÃO HUD */}
                  <div className="p-3 rounded-xl bg-pink-950/20 border border-pink-500/30">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-pink-400 font-bold">👁️ 3. BÔNUS DO SENSOR HUD (EXPRESSÃO):</span>
                      <span
                        className="font-bold px-2 py-0.5 rounded text-[11px]"
                        style={{
                          backgroundColor: selectedPlayerExpr ? `${selectedPlayerExpr.color}22` : '#33415544',
                          color: selectedPlayerExpr ? selectedPlayerExpr.color : '#94a3b8',
                          border: `1px solid ${selectedPlayerExpr ? selectedPlayerExpr.color : '#64748b'}44`
                        }}
                      >
                        {selectedPlayerExpr ? selectedPlayerExpr.namePt : 'Nenhum'}
                      </span>
                    </div>
                    <span className="text-pink-200 block font-semibold mb-1">
                      {selectedPlayerExpr
                        ? selectedPlayerExpr.descPt
                        : 'Nenhum Sensor HUD Equipado (0% Bônus Sensorial - Operação binária padrão)'}
                    </span>
                    {selectedPlayerExpr && (
                      <div className="text-[11px] text-pink-300/80 font-outfit">
                        <strong>Sinergia Tática:</strong> {selectedPlayerExpr.synergyPt}
                      </div>
                    )}
                  </div>

                  {/* CARD 4: RESULTADO COMBINADO */}
                  <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-950/40 via-purple-950/30 to-pink-950/40 border border-cyber-cardBorder">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-slate-300 font-bold">📊 MULTIPLICADOR DE PODER GLOBAL:</span>
                      <span className="text-cyber-cyan font-bold text-sm bg-black/60 px-2.5 py-0.5 rounded border border-cyber-cyan/50 shadow-neon-cyan/20">
                        {playerCombinedMult.toFixed(2)}x Total
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-300 font-mono space-y-0.5">
                      <div>• Chassi: {isPlayerFormNone ? 'Nenhum (1.00x)' : `${selectedPlayerForm?.name} (${playerFormMult.toFixed(2)}x)`}</div>
                      <div>• Reator: {isPlayerRarityNone ? 'Neutro (1.00x)' : `${selectedPlayerRarity?.namePt} (${playerRarityMult.toFixed(2)}x)`}</div>
                      <div>• Sensor HUD: {isPlayerExprNone ? 'Nenhum (0% Bônus)' : `${selectedPlayerExpr?.namePt} (${selectedPlayerExpr?.descPt})`}</div>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] font-outfit text-slate-300 leading-relaxed border-t border-cyber-cardBorder/40 pt-3">
                  <strong className="text-white font-mono block mb-1">TELEMETRIA DO PILOTO:</strong>
                  {selectedPlayerForm
                    ? selectedPlayerForm.lore
                    : 'Modo de laboratório ativado: fuselagem desacoplada para calibrar o impacto matemático individual de cada raridade e sensor HUD nas equações de dano e sustentação.'}
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
              <div className="mb-4">
                <label className="block text-xs font-mono text-cyber-cyan font-bold uppercase mb-1.5">
                  1. Escolha a Classe do Herói (6 Arquétipos Canônicos):
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

              {/* Weapon State Toggle: Base Weapon vs Relic-Fused Evolution */}
              <div className="mb-5">
                <label className="block text-xs font-mono text-slate-300 font-bold uppercase mb-1.5">
                  2. Estado Balístico da Arma:
                </label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-cyber-card/80 rounded-xl border border-cyber-cardBorder">
                  <button
                    type="button"
                    onClick={() => setIsEvolved(false)}
                    className={`py-2 px-3 rounded-lg font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      !isEvolved
                        ? 'bg-cyber-cyan text-black shadow-neon-cyan'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>⚔️ Disparo Base</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEvolved(true)}
                    className={`py-2 px-3 rounded-lg font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      isEvolved
                        ? 'bg-gradient-to-r from-purple-500 to-cyber-cyan text-white shadow-neon-cyan font-extrabold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>⚡ Fusão com Relíquia</span>
                  </button>
                </div>
              </div>

              {/* Explanatory Legend */}
              <div className="pt-4 border-t border-cyber-cardBorder/60">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="font-mono text-xs font-bold px-2.5 py-1 rounded inline-block"
                    style={{ backgroundColor: `${selectedHeroClass.color}22`, color: selectedHeroClass.color }}
                  >
                    ARQUÉTIPO // {selectedHeroClass.code.toUpperCase()}
                  </span>
                  {isEvolved && (
                    <span className="font-mono text-[10px] font-extrabold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-400/40 animate-pulse">
                      ⚡ ARMA EVOLUÍDA
                    </span>
                  )}
                </div>

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

                  {/* Dynamic Weapon & Munition Card: Base vs Evolved */}
                  {!isEvolved ? (
                    <div className="p-2.5 rounded bg-cyan-950/30 border border-cyan-500/40">
                      <span className="text-cyber-cyan block mb-0.5 font-bold">⚔️ ARMA PRIMÁRIA & MUNIÇÃO PADRÃO:</span>
                      <span className="text-white font-bold block mb-1">{selectedHeroClass.weaponName}</span>
                      <span className="text-cyan-200 block text-[11px] mb-1 font-semibold">{selectedHeroClass.munitionName}</span>
                      <p className="font-outfit text-xs text-slate-300 leading-relaxed">
                        {selectedHeroClass.munitionDetails}
                      </p>
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/50 shadow-lg shadow-purple-500/10">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-purple-300 block font-bold text-xs uppercase tracking-wider">
                          ⚡ FUSÃO COM RELÍQUIA (ARMA EVOLUÍDA):
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-purple-400/20 text-purple-200 font-bold">
                          SYNERGY EVOLUTION
                        </span>
                      </div>
                      <span className="text-white font-extrabold text-sm block mb-1">
                        {selectedHeroClass.evolutionWeaponName}
                      </span>
                      <div className="p-1.5 mb-2 rounded bg-purple-900/40 border border-purple-400/30 text-[11px]">
                        <span className="text-purple-200 font-bold block">🧩 Relíquia Exigida na Partida:</span>
                        <span className="text-white font-semibold">{selectedHeroClass.evolutionRelicName}</span>
                      </div>
                      <span className="text-cyan-200 block text-[11px] mb-1 font-bold">
                        {selectedHeroClass.evolutionMunitionName}
                      </span>
                      <p className="font-outfit text-xs text-slate-200 leading-relaxed mb-2">
                        {selectedHeroClass.evolutionDetails}
                      </p>
                      <div className="p-2 rounded bg-black/40 border border-purple-500/30 text-[11px]">
                        <span className="text-emerald-400 font-bold block mb-0.5">💥 Impacto Físico no Motor:</span>
                        <span className="text-slate-300">{selectedHeroClass.evolutionNumericalBonus}</span>
                      </div>
                    </div>
                  )}

                  {/* Active Skill */}
                  <div className="p-2.5 rounded bg-purple-950/30 border border-purple-500/40">
                    <span className="text-purple-300 block mb-0.5 font-bold">HABILIDADE ATIVA ÚNICA:</span>
                    <span className="text-white font-bold block mb-1">{selectedHeroClass.activeSkillName}</span>
                    <p className="font-outfit text-xs text-purple-200 leading-relaxed">
                      {selectedHeroClass.activeSkillDetails}
                    </p>
                  </div>

                  {/* Detailed Numerical Attributes Breakdown */}
                  <div className="p-3 rounded-xl bg-cyber-darker border border-cyber-cardBorder/80">
                    <span className="text-emerald-400 font-bold block mb-2 text-[11px] uppercase tracking-wider">
                      📊 BÔNUS EXATOS EM NÚMEROS (MOTOR DO JOGO):
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedHeroClass.numericalBonuses.map((bonus, bIdx) => (
                        <div key={bIdx} className="p-2 rounded bg-cyber-card/80 border border-cyber-cardBorder/40">
                          <div className="flex justify-between items-center mb-0.5">
                            <span className="text-slate-300 font-semibold text-[11px]">{bonus.label}</span>
                            <span className="text-emerald-400 font-bold font-mono text-xs">{bonus.value}</span>
                          </div>
                          <p className="font-outfit text-[10px] text-slate-400 leading-tight">
                            {bonus.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between p-2 rounded bg-cyber-card border border-cyber-cardBorder/40 text-[11px]">
                    <span className="text-slate-400">Implementação no Motor:</span>
                    <span className="text-white font-mono">{selectedHeroClass.codeRef}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: AURAS DE BIOMAS (11) */}
          {activeTab === 'biome_aura' && (
            <div>
              <div className="mb-6 space-y-4">
                <div>
                  <label className="block text-xs font-mono text-cyber-cyan font-bold uppercase mb-1.5">
                    1. Escolha a Aura do Bioma (11 Biomas):
                  </label>
                  <select
                    value={biomeAuraId}
                    onChange={(e) => setBiomeAuraId(e.target.value)}
                    className="w-full bg-cyber-card border border-cyber-cardBorder rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyber-cyan"
                  >
                    {BIOME_AURAS_DATA.map((a, idx) => (
                      <option key={a.id} value={a.id}>
                        #{idx + 1}: {a.namePt} ({a.nameEn})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 font-bold uppercase mb-1.5">
                    2. Seleção Rápida de Bioma:
                  </label>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                    {BIOME_AURAS_DATA.map((a) => (
                      <button
                        key={a.id}
                        onClick={() => setBiomeAuraId(a.id)}
                        className={`px-2.5 py-1.5 rounded-lg border text-left font-mono text-[11px] transition-all flex items-center gap-2 ${
                          biomeAuraId === a.id
                            ? 'bg-cyber-card text-white font-bold'
                            : 'bg-cyber-darker text-slate-400 hover:text-white border-cyber-cardBorder'
                        }`}
                        style={{
                          borderColor: biomeAuraId === a.id ? a.colorHex : undefined,
                          boxShadow: biomeAuraId === a.id ? `0 0 12px ${a.colorHex}40` : undefined
                        }}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: a.colorHex, boxShadow: `0 0 6px ${a.colorHex}` }}
                        />
                        <span className="truncate">{a.namePt.replace('Aura ', '').replace('da ', '').replace('de ', '').replace('do ', '')}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Explanatory Legend */}
              <div className="pt-4 border-t border-cyber-cardBorder/60">
                <span
                  className="font-mono text-xs font-bold px-2.5 py-1 rounded inline-block mb-2"
                  style={{ backgroundColor: `${selectedBiomeAura.colorHex}22`, color: selectedBiomeAura.colorHex }}
                >
                  NÍVEL DE CAMPO // AURA DE BIOMA
                </span>

                <h4 className="font-orbitron font-bold text-xl text-white mb-1 flex items-center gap-2">
                  <span
                    className="w-3.5 h-3.5 rounded-full inline-block"
                    style={{ backgroundColor: selectedBiomeAura.colorHex, boxShadow: `0 0 8px ${selectedBiomeAura.colorHex}` }}
                  />
                  {selectedBiomeAura.namePt}
                </h4>
                <p className="font-mono text-xs text-cyber-cyan mb-3">
                  ID: #{selectedBiomeAura.id} // {selectedBiomeAura.nameEn.toUpperCase()}
                </p>

                <div className="space-y-3 font-mono text-xs mb-4">
                  {/* Combat Bonus */}
                  <div className="p-2.5 rounded bg-cyber-card border border-cyber-cardBorder/40">
                    <span className="text-slate-400 block mb-0.5">BÔNUS DE COMBATE & PODER DO BIOMA:</span>
                    <span className="text-white font-bold block" style={{ color: selectedBiomeAura.colorHex }}>
                      {selectedBiomeAura.bonusPt}
                    </span>
                  </div>

                  {/* Engine Instantiation Rules */}
                  <div className="p-3 rounded-xl bg-black/60 border border-cyber-cyan/30 text-[11px] leading-relaxed">
                    <span className="text-cyber-cyan font-bold block mb-1.5 uppercase tracking-wider">
                      ⚙️ REGRA DE INSTANCIAÇÃO (MOTOR):
                    </span>
                    <div className="space-y-1 text-slate-300">
                      <div>• Ganho na Plataforma: <span className="text-amber-400 font-bold">+1.0s/s</span></div>
                      <div>• Limiar Mínimo: <span className="text-amber-400 font-bold">T_min = 15.0s + (Dificuldade × 5.0s)</span></div>
                      <div>• Decaimento Fora da Plataforma: <span className="text-amber-400 font-bold">-0.4s/s</span> (Dreno ativo: <span className="text-red-400 font-bold">-1.0s/s</span>)</div>
                      <div>• Raio de Referência: <span className="text-amber-400 font-bold">R = 86px</span> padronizado (Fire Aura baseline)</div>
                      <div className="text-[10px] text-slate-400 pt-1 border-t border-cyber-cardBorder/40">
                        Código Fonte: <span className="text-white font-mono">BiomeAuraManager.ts</span> & <span className="text-white font-mono">RenderSystem.ts:lines 4778-5365</span>
                      </div>
                    </div>
                  </div>

                  {/* Active Procedural Geometry */}
                  <div className="p-2.5 rounded bg-cyber-darker border border-cyber-cardBorder/50 text-[11px]">
                    <span className="text-purple-300 font-bold block mb-1 uppercase tracking-wider">
                      📐 GEOMETRIA PROCEDURAL ATIVA:
                    </span>
                    <p className="font-outfit text-slate-300 leading-relaxed">
                      {selectedBiomeAura.geomPt}
                    </p>
                  </div>

                  {/* Lore */}
                  <div className="text-[11px] font-outfit text-slate-300 leading-relaxed border-t border-cyber-cardBorder/40 pt-2">
                    <strong className="text-white font-mono block mb-0.5">LORE DO BIOMA:</strong>
                    {selectedBiomeAura.lorePt}
                  </div>
                </div>
              </div>
            </div>
          )}

          
          {/* TAB 9: MATRIZ SENSORIAL HUD (20 EXPRESSÕES) */}
          {activeTab === 'hud_expression' && (
            <div>
              <div className="mb-6 space-y-4">
                <div>
                  <label className="block text-xs font-mono text-cyber-cyan font-bold uppercase mb-1.5 flex items-center justify-between">
                    <span>Escolha o Sensor HUD da Matriz (1 a 20):</span>
                    <span className="text-[11px] text-slate-400 font-normal">
                      {selectedStandaloneExpr.namePt} ({selectedStandaloneExpr.nameEn})
                    </span>
                  </label>
                  <select
                    value={hudExpressionId}
                    onChange={(e) => setHudExpressionId(e.target.value)}
                    className="w-full bg-cyber-card border border-cyber-cardBorder rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyber-cyan"
                  >
                    {CYBER_EXPRESSIONS.map((ex, idx) => (
                      <option key={ex.id} value={ex.id}>
                        Sensor #{idx + 1}: {ex.namePt} ({ex.nameEn}) — {ex.descPt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Explanatory Legend for Standalone HUD Expression */}
              <div className="pt-4 border-t border-cyber-cardBorder/60">
                <span
                  className="font-mono text-xs font-bold px-2.5 py-1 rounded inline-block mb-2"
                  style={{ backgroundColor: `${selectedStandaloneExpr.color}22`, color: selectedStandaloneExpr.color }}
                >
                  SENSOR ÓPTICO // {selectedStandaloneExpr.nameEn}
                </span>

                <h4 className="font-orbitron font-bold text-xl text-white mb-1">
                  Matriz HUD • {selectedStandaloneExpr.namePt}
                </h4>
                <p className="font-mono text-xs text-cyber-cyan mb-3">
                  CÂMARA HOLOGRÁFICA // Linhas Vetoriais Diretas no Cockpit
                </p>

                <div className="space-y-3 font-mono text-xs mb-4">
                  <div className="p-2.5 rounded bg-pink-950/30 border border-pink-500/40">
                    <span className="text-pink-400 block mb-0.5 font-bold">BÔNUS TÁTICO CONCEDIDO:</span>
                    <span className="text-pink-200 font-bold block">{selectedStandaloneExpr.descPt}</span>
                  </div>

                  <div className="p-2.5 rounded bg-cyan-950/30 border border-cyan-500/40">
                    <span className="text-cyber-cyan block mb-0.5 font-bold">SINERGIA DE COMBATE RECOMENDADA:</span>
                    <span className="text-slate-200 font-bold block">{selectedStandaloneExpr.synergyPt}</span>
                  </div>

                  <div className="flex justify-between p-2 rounded bg-cyber-card border border-cyber-cardBorder/40">
                    <span className="text-slate-400">Canal Óptico & Matriz:</span>
                    <span className="font-bold" style={{ color: selectedStandaloneExpr.color }}>
                      {selectedStandaloneExpr.color.toUpperCase()} Hex
                    </span>
                  </div>
                </div>

                <div className="text-[11px] font-outfit text-slate-300 leading-relaxed border-t border-cyber-cardBorder/40 pt-3">
                  <strong className="text-white font-mono block mb-1">ARQUIVO DE TELEMETRIA:</strong>
                  {selectedStandaloneExpr.lore}
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: CENÁRIOS & PLATAFORMAS (11) */}
          {activeTab === 'biome_platform' && (
            <div>
              <div className="mb-6 space-y-4">
                {/* View Mode Toggle: 3 Lanes vs Single */}
                <div>
                  <label className="block text-xs font-mono text-cyber-cyan font-bold uppercase mb-1.5">
                    1. Modo de Visualização:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setPlatformViewMode('3lanes')}
                      className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                        platformViewMode === '3lanes'
                          ? 'bg-cyber-cyan text-black shadow-neon-cyan'
                          : 'bg-cyber-card text-slate-300 hover:text-white border border-cyber-cardBorder'
                      }`}
                    >
                      3 Pistas de Combate
                    </button>
                    <button
                      onClick={() => setPlatformViewMode('single')}
                      className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                        platformViewMode === 'single'
                          ? 'bg-cyber-cyan text-black shadow-neon-cyan'
                          : 'bg-cyber-card text-slate-300 hover:text-white border border-cyber-cardBorder'
                      }`}
                    >
                      Foco em 1 Bioma
                    </button>
                  </div>
                </div>

                {/* Dropdown Selector */}
                <div>
                  <label className="block text-xs font-mono text-cyber-cyan font-bold uppercase mb-1.5">
                    2. Escolha o Bioma / Cenário (11 Biomas Canônicos):
                  </label>
                  <select
                    value={biomePlatformId}
                    onChange={(e) => setBiomePlatformId(e.target.value)}
                    className="w-full bg-cyber-card border border-cyber-cardBorder rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyber-cyan"
                  >
                    {BIOME_SCENARIOS_DATA.map((b, idx) => (
                      <option key={b.id} value={b.id}>
                        #{idx + 1}: {b.namePt} ({b.nameEn})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quick Buttons Grid */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 font-bold uppercase mb-1.5">
                    3. Seleção Rápida de Bioma:
                  </label>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                    {BIOME_SCENARIOS_DATA.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => setBiomePlatformId(b.id)}
                        className={`px-2.5 py-1.5 rounded-lg border text-left font-mono text-[11px] transition-all flex items-center gap-2 ${
                          biomePlatformId === b.id
                            ? 'bg-cyber-card text-white font-bold'
                            : 'bg-cyber-darker text-slate-400 hover:text-white border-cyber-cardBorder'
                        }`}
                        style={{
                          borderColor: biomePlatformId === b.id ? b.colorHex : undefined,
                          boxShadow: biomePlatformId === b.id ? `0 0 12px ${b.colorHex}40` : undefined
                        }}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: b.colorHex, boxShadow: `0 0 6px ${b.colorHex}` }}
                        />
                        <span className="truncate">{b.namePt}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Explanatory Legend & Specs */}
              <div className="pt-4 border-t border-cyber-cardBorder/60">
                <span
                  className="font-mono text-xs font-bold px-2.5 py-1 rounded inline-block mb-2"
                  style={{ backgroundColor: `${selectedBiomePlatform.colorHex}22`, color: selectedBiomePlatform.colorHex }}
                >
                  ENGENHARIA DE CENÁRIO // {platformViewMode === '3lanes' ? '3 PISTAS DE COMBATE' : 'FOCO EM 1 BIOMA'}
                </span>

                <h4 className="font-orbitron font-bold text-xl text-white mb-1 flex items-center gap-2">
                  <span
                    className="w-3.5 h-3.5 rounded-full inline-block"
                    style={{ backgroundColor: selectedBiomePlatform.colorHex, boxShadow: `0 0 8px ${selectedBiomePlatform.colorHex}` }}
                  />
                  {selectedBiomePlatform.namePt}
                </h4>
                <p className="font-mono text-xs text-cyber-cyan mb-3">
                  ID: #{selectedBiomePlatform.id} // {selectedBiomePlatform.nameEn.toUpperCase()}
                </p>

                <div className="space-y-3 font-mono text-xs mb-4">
                  {/* Atmosphere Description */}
                  <div className="p-2.5 rounded bg-cyber-card border border-cyber-cardBorder/40">
                    <span className="text-slate-400 block mb-0.5 font-bold">ATMOSFERA & ELEMENTOS PROCEDURAIS:</span>
                    <p className="font-outfit text-xs text-slate-300 leading-relaxed">
                      {selectedBiomePlatform.desc}
                    </p>
                  </div>

                  {/* Physics Specs Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 rounded bg-cyber-card border border-cyber-cardBorder/40">
                      <span className="text-slate-400 block text-[10px]">Atrito da Superfície:</span>
                      <span className="text-emerald-400 font-bold text-xs">{selectedBiomePlatform.drag}</span>
                    </div>
                    <div className="p-2 rounded bg-cyber-card border border-cyber-cardBorder/40">
                      <span className="text-slate-400 block text-[10px]">Multiplicador Velocidade:</span>
                      <span className="text-cyber-cyan font-bold text-xs">{selectedBiomePlatform.speed}</span>
                    </div>
                    <div className="p-2 rounded bg-cyber-card border border-cyber-cardBorder/40">
                      <span className="text-slate-400 block text-[10px]">Cooldown Recarga:</span>
                      <span className="text-amber-400 font-bold text-xs">{selectedBiomePlatform.cooldown}</span>
                    </div>
                    <div className="p-2 rounded bg-cyber-card border border-cyber-cardBorder/40">
                      <span className="text-slate-400 block text-[10px]">Efeito em Área (DoT):</span>
                      <span className="text-purple-300 font-bold text-xs">{selectedBiomePlatform.dot}</span>
                    </div>
                  </div>

                  {/* Metallic Platform Bar Details */}
                  <div className="p-2.5 rounded bg-cyber-darker border border-cyber-cardBorder/50 text-[11px]">
                    <span className="text-cyber-cyan font-bold block mb-1 uppercase tracking-wider">
                      📐 DETALHE METÁLICO DA PLATAFORMA:
                    </span>
                    <p className="font-outfit text-slate-300 leading-relaxed">
                      {selectedBiomePlatform.platformDetail}
                    </p>
                  </div>

                  {/* Engine Physics Architecture Box */}
                  <div className="p-3 rounded-xl bg-black/60 border border-cyber-cyan/30 text-[11px] leading-relaxed">
                    <span className="text-cyber-cyan font-bold block mb-1.5 uppercase tracking-wider">
                      ⚙️ ARQUITETURA DE INSTANCIAÇÃO (MOTOR):
                    </span>
                    <div className="space-y-1 text-slate-300">
                      <div>• Pistas Físicas: <span className="text-amber-400 font-bold">Top (Y=300), Mid (Y=600), Bot (Y=900)</span></div>
                      <div>• Largura Efetiva: <span className="text-amber-400 font-bold">X = 50 a 1870 (1820px)</span></div>
                      <div>• Espessura do Metal: <span className="text-amber-400 font-bold">26px</span> (painéis e trilhos)</div>
                      <div>• Motor de Renderização: <span className="text-amber-400 font-bold">RenderSystem.ts:lines 2518–4500</span></div>
                      <div>• Fidelidade Matemática: <span className="text-emerald-400 font-bold">100% Idêntico ao Jogo Oficial</span></div>
                    </div>
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
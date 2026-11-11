/**
 * AC3games Procedural Vector Render Engine
 * Directly copied from Geometry Platforms source code:
 * - RenderSystem.ts: renderShape, drawEnemies, drawBosses, renderProjectiles
 * - hq-scene.ts: drawProceduralWeaponIcon
 * - BossRegistry.ts: 12 Arena Bosses
 */

export interface FormInfo {
  index: number;
  name: string;
  sides: number;
  multiplier: number;
  desc: string;
}

export interface RarityInfo {
  index: number;
  name: string;
  namePt: string;
  color: string;
  hex: number;
  multiplier: number;
  flameColor: string;
}

export const FORMS_DATA: FormInfo[] = [
  { index: 1, name: 'Triângulo (Triangle)', sides: 3, multiplier: 1.0, desc: 'Chassi ágil com 3 vértices balanceados para velocidade e penetração linear.' },
  { index: 2, name: 'Quadrado (Square)', sides: 4, multiplier: 1.1, desc: 'Casco angular com estabilizadores quadráticos de alta blindagem balística.' },
  { index: 3, name: 'Pentágono (Pentagon)', sides: 5, multiplier: 1.2, desc: 'Geometria pentagonal de distribuição harmônica de energia e escudos.' },
  { index: 4, name: 'Hexágono (Hexagon)', sides: 6, multiplier: 1.3, desc: 'Configuração colmeia ultra-resistente contra impactos gravitacionais.' },
  { index: 5, name: 'Heptágono (Heptagon)', sides: 7, multiplier: 1.4, desc: 'Perfil assimétrico de 7 faces com capacitores de deflexão de plasma.' },
  { index: 6, name: 'Octógono (Octagon)', sides: 8, multiplier: 1.5, desc: 'Fortaleza octogonal compacta para combates em corredores estreitos.' },
  { index: 7, name: 'Trevo (Trefoil)', sides: 9, multiplier: 1.6, desc: 'Curvatura tri-lobular bio-sintética com vórtice central de energia.' },
  { index: 8, name: 'Estrela-4 (4-Star)', sides: 10, multiplier: 1.7, desc: 'Estrutura estelar com 4 pontas colimadoras de feixes concentrados.' },
  { index: 9, name: 'Estrela-5 (5-Star)', sides: 11, multiplier: 1.8, desc: 'Chassi bélico de 5 pontas cortantes com aceleração iônica tripla.' },
  { index: 10, name: 'Estrela-6 (6-Star)', sides: 12, multiplier: 1.9, desc: 'Simetria hexagonal estelar estendida de suprema precisão tática.' },
  { index: 11, name: 'Quatrefoil (4-Lóbulos)', sides: 11, multiplier: 2.1, desc: 'Orbe quad-lobular sagrada com ressonância magnética de longo alcance.' },
  { index: 12, name: 'Flor Primordial (Flower)', sides: 12, multiplier: 2.3, desc: 'Apotheosis floral primordial com 8 pétalas bio-geométricas regenerativas.' }
];

export const RARITIES_DATA: RarityInfo[] = [
  { index: 1, name: 'Common', namePt: 'Comum', color: '#ffffff', hex: 0xffffff, multiplier: 1.0, flameColor: '#ff0055' },
  { index: 2, name: 'Enhanced', namePt: 'Aprimorado', color: '#ff3333', hex: 0xff3333, multiplier: 1.15, flameColor: '#ff5500' },
  { index: 3, name: 'Refined', namePt: 'Refinado', color: '#ff8800', hex: 0xff8800, multiplier: 1.3, flameColor: '#ffd700' },
  { index: 4, name: 'Advanced', namePt: 'Avançado', color: '#ffd700', hex: 0xffd700, multiplier: 1.5, flameColor: '#ffff00' },
  { index: 5, name: 'Elite', namePt: 'Elite', color: '#00ff66', hex: 0x00ff66, multiplier: 1.7, flameColor: '#00f0ff' },
  { index: 6, name: 'Rare', namePt: 'Raro', color: '#0088ff', hex: 0x0088ff, multiplier: 1.9, flameColor: '#00ffff' },
  { index: 7, name: 'Epic', namePt: 'Épico', color: '#4a00e0', hex: 0x4a00e0, multiplier: 2.1, flameColor: '#8e2de2' },
  { index: 8, name: 'Masterwork', namePt: 'Obra-Prima', color: '#9d4edd', hex: 0x9d4edd, multiplier: 2.3, flameColor: '#c77dff' },
  { index: 9, name: 'Legendary', namePt: 'Lendário', color: '#ff00ff', hex: 0xff00ff, multiplier: 2.6, flameColor: '#ff007f' },
  { index: 10, name: 'Ascendant', namePt: 'Ascendente', color: '#ff0077', hex: 0xff0077, multiplier: 3.0, flameColor: '#ff00bb' },
  { index: 11, name: 'Transcendent', namePt: 'Transcendente', color: '#00f0ff', hex: 0x00f0ff, multiplier: 3.5, flameColor: '#ffffff' },
  { index: 12, name: 'Mythic', namePt: 'Mítico', color: '#ff0033', hex: 0xff0033, multiplier: 4.2, flameColor: '#ffd700' }
];

export const CLASSES_DATA = [
  {
    id: 'fighter',
    name: 'Guerreiro (Fighter)',
    weaponId: 'weapon_bazooka',
    weaponName: 'Bazuca Pesada Balística',
    munitionName: 'Munição: Míssil Ogiva Cinética',
    color: '#ff3b30',
    attributes: { str: 10, dex: 6, con: 10, int: 4, wit: 4, men: 4 },
    desc: 'Especialista em resistência corporal e demolição em área. Dispara foguetes pesados de alto impacto e onda de concussão.'
  },
  {
    id: 'rogue',
    name: 'Ladino (Rogue)',
    weaponId: 'weapon_daggers',
    weaponName: 'Adagas Cinéticas de Fase',
    munitionName: 'Munição: Lâminas Flechette de Fase',
    color: '#38bdf8',
    attributes: { str: 6, dex: 10, con: 6, int: 4, wit: 8, men: 4 },
    desc: 'Mestre da agilidade, esquiva e golpes críticos. Lança lâminas duplas velozes que ricocheteiam entre pontos fracos.'
  },
  {
    id: 'mage',
    name: 'Mago (Mage)',
    weaponId: 'weapon_fireball',
    weaponName: 'Esfera de Plasma Ígneo',
    munitionName: 'Munição: Bola de Fogo Termonuclear',
    color: '#f97316',
    attributes: { str: 4, dex: 4, con: 4, int: 10, wit: 6, men: 10 },
    desc: 'Manipulador de energias arcanas sintetizadas. Conjurador de orbes termonucleares com dano prolongado de queimadura contínua.'
  },
  {
    id: 'bard',
    name: 'Bardo (Bard)',
    weaponId: 'weapon_musical_notes',
    weaponName: 'Ressonador Sônico de Frequência',
    munitionName: 'Munição: Notas Musicais de Cavitação',
    color: '#a855f7',
    attributes: { str: 4, dex: 8, con: 6, int: 6, wit: 10, men: 8 },
    desc: 'Harmonizador bio-computacional. Projeta notas acústicas em expansão que desestabilizam blindagens e curam aliados.'
  },
  {
    id: 'paladin',
    name: 'Paladino (Paladin)',
    weaponId: 'weapon_holy_beam',
    weaponName: 'Lança de Luz Sagrada',
    munitionName: 'Munição: Feixe Perfurante de Fótons',
    color: '#ffd700',
    attributes: { str: 8, dex: 4, con: 10, int: 6, wit: 6, men: 10 },
    desc: 'Bastião inquebrável da justiça geométrica. Emite feixes de luz fotônica contínua que transpassam colunas de inimigos.'
  },
  {
    id: 'ranger',
    name: 'Patrulheiro (Ranger)',
    weaponId: 'weapon_bow_arrows',
    weaponName: 'Arco Balístico Quântico',
    munitionName: 'Munição: Flecha de Precisão Hipersônica',
    color: '#10b981',
    attributes: { str: 6, dex: 10, con: 6, int: 4, wit: 8, men: 6 },
    desc: 'Atirador de elite de longo alcance. Dispara flechas de aceleração extrema com 100% de precisão e perfuração crítica.'
  }
];

export const ARENA_BOSSES_DATA = [
  { index: 1, name: 'Titan Colossus Guardian', title: 'Guardião Titânico do Vácuo', sides: 3, coreColor: '#00f0ff' },
  { index: 2, name: 'Square Aegis Juggernaut', title: 'Fortaleza Quadrática Inquebrável', sides: 4, coreColor: '#ff0055' },
  { index: 3, name: 'Pentagon Hive Overmind', title: 'Mente Colmeia Pentagonal', sides: 5, coreColor: '#ffd700' },
  { index: 4, name: 'Hexagon Pulse Dreadnought', title: 'Dreadnought de Pulso Hexagonal', sides: 6, coreColor: '#00ff88' },
  { index: 5, name: 'Heptagon Singularity Core', title: 'Núcleo de Singularidade Heptagonal', sides: 7, coreColor: '#a855f7' },
  { index: 6, name: 'Octagon Antimatter Mine Lord', title: 'Senhor de Minas de Antimatéria', sides: 8, coreColor: '#ff3300' },
  { index: 7, name: 'Trefoil Shadow Vortex', title: 'Vórtice Sombrio de Três Lóbulos', sides: 9, coreColor: '#c084fc' },
  { index: 8, name: '4-Star Titanic Orbital Gunner', title: 'Artilheiro Estelar Titânico', sides: 10, coreColor: '#38bdf8' },
  { index: 9, name: '5-Star Chrono Manipulator', title: 'Manipulador Chrono de 5 Pontas', sides: 11, coreColor: '#f59e0b' },
  { index: 10, name: '6-Star Vector Sovereign', title: 'Soberano Vetorial Hexaestelar', sides: 12, coreColor: '#ec4899' },
  { index: 11, name: 'Quatrefoil Synthetic Dragon', title: 'Dragão Sintético de Quatro Asas', sides: 11, coreColor: '#10b981' },
  { index: 12, name: 'Flower Primordial Guardian', title: 'Guardião Floral Supremo da Origem', sides: 12, coreColor: '#ffd700' }
];

function drawPolygon(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  sides: number,
  rotOffset: number = -Math.PI / 2
) {
  ctx.beginPath();
  for (let i = 0; i < sides; i++) {
    const angle = rotOffset + (i * 2 * Math.PI) / sides;
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

function drawStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  outerRadius: number,
  innerRadius: number,
  points: number,
  rotOffset: number = -Math.PI / 2
) {
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const angle = rotOffset + (i * Math.PI) / points;
    const r = i % 2 === 0 ? outerRadius : innerRadius;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

/**
 * 1. PLAYER COMBINATION RENDERER
 */
export function renderStudioPlayer(
  ctx: CanvasRenderingContext2D,
  formIdx: number,
  rarityIdx: number,
  width: number,
  height: number,
  time: number
) {
  ctx.save();
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = '#04020c';
  ctx.fillRect(0, 0, width, height);

  const cx = width / 2;
  const cy = height / 2;
  const s = Math.min(width, height) / 100;

  const form = FORMS_DATA[formIdx - 1] || FORMS_DATA[0]!;
  const rarity = RARITIES_DATA[rarityIdx - 1] || RARITIES_DATA[0]!;
  const baseRadius = 26 * s;

  // Energy ring
  ctx.strokeStyle = `${rarity.color}33`;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(cx, cy, baseRadius * 1.5, 0, Math.PI * 2);
  ctx.stroke();

  // Floating Rarity Shards
  for (let sh = 0; sh < rarity.index; sh++) {
    const sha = (sh * 2 * Math.PI) / rarity.index + time * 0.8;
    const shx = cx + Math.cos(sha) * (baseRadius * 1.35);
    const shy = cy + Math.sin(sha) * (baseRadius * 1.35);
    ctx.fillStyle = rarity.color;
    ctx.beginPath();
    ctx.arc(shx, shy, 1.8 * s, 0, Math.PI * 2);
    ctx.fill();
  }

  // Plasma Flame at Stern
  const flameLen = (14 + Math.sin(time * 15) * 5) * s * (1 + rarity.index * 0.08);
  ctx.fillStyle = rarity.flameColor;
  ctx.beginPath();
  ctx.moveTo(cx - 7 * s, cy + baseRadius * 0.7);
  ctx.lineTo(cx, cy + baseRadius * 0.7 + flameLen);
  ctx.lineTo(cx + 7 * s, cy + baseRadius * 0.7);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(cx - 3 * s, cy + baseRadius * 0.7);
  ctx.lineTo(cx, cy + baseRadius * 0.7 + flameLen * 0.5);
  ctx.lineTo(cx + 3 * s, cy + baseRadius * 0.7);
  ctx.closePath();
  ctx.fill();

  // Hull
  ctx.fillStyle = '#080d1a';
  ctx.strokeStyle = rarity.color;
  ctx.lineWidth = 3.5 * s;
  ctx.lineJoin = 'round';

  if (form.index === 11) {
    for (let l = 0; l < 4; l++) {
      const la = (l * Math.PI) / 2 + time * 0.2;
      const lx = cx + Math.cos(la) * (baseRadius * 0.55);
      const ly = cy + Math.sin(la) * (baseRadius * 0.55);
      ctx.beginPath();
      ctx.arc(lx, ly, baseRadius * 0.55, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
  } else if (form.index === 12) {
    for (let p = 0; p < 8; p++) {
      const pa = (p * Math.PI) / 4 + time * 0.15;
      const px = cx + Math.cos(pa) * (baseRadius * 0.6);
      const py = cy + Math.sin(pa) * (baseRadius * 0.6);
      ctx.beginPath();
      ctx.arc(px, py, baseRadius * 0.45, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
  } else if (form.index >= 8 && form.index <= 10) {
    const points = form.index === 8 ? 4 : form.index === 9 ? 5 : 6;
    drawStar(ctx, cx, cy, baseRadius, baseRadius * 0.45, points);
    ctx.fill();
    ctx.stroke();
  } else if (form.index === 7) {
    for (let t = 0; t < 3; t++) {
      const ta = (t * 2 * Math.PI) / 3 - Math.PI / 2 + time * 0.2;
      const tx = cx + Math.cos(ta) * (baseRadius * 0.55);
      const ty = cy + Math.sin(ta) * (baseRadius * 0.55);
      ctx.beginPath();
      ctx.arc(tx, ty, baseRadius * 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
  } else {
    drawPolygon(ctx, cx, cy, baseRadius, form.sides);
    ctx.fill();
    ctx.stroke();
  }

  // Clean cockpit core
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(cx, cy, 3 * s, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

/**
 * 2. ENEMY COMBINATION RENDERER
 */
export function renderStudioEnemy(
  ctx: CanvasRenderingContext2D,
  formIdx: number,
  rarityIdx: number,
  width: number,
  height: number,
  time: number
) {
  ctx.save();
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = '#06020e';
  ctx.fillRect(0, 0, width, height);

  const cx = width / 2;
  const cy = height / 2;
  const s = Math.min(width, height) / 100;

  const form = FORMS_DATA[formIdx - 1] || FORMS_DATA[0]!;
  const rarity = RARITIES_DATA[rarityIdx - 1] || RARITIES_DATA[0]!;
  const baseRadius = 24 * s;

  ctx.strokeStyle = `${rarity.color}26`;
  ctx.lineWidth = 1;
  ctx.setLineDash([4 * s, 4 * s]);
  ctx.beginPath();
  ctx.arc(cx, cy, baseRadius * 1.45, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = '#1c0718';
  ctx.strokeStyle = rarity.color;
  ctx.lineWidth = 3 * s;

  if (form.index >= 8 && form.index <= 10) {
    const pts = form.index === 8 ? 4 : form.index === 9 ? 5 : 6;
    drawStar(ctx, cx, cy, baseRadius, baseRadius * 0.45, pts, time * 0.3);
    ctx.fill();
    ctx.stroke();
  } else {
    drawPolygon(ctx, cx, cy, baseRadius, form.sides, time * 0.2);
    ctx.fill();
    ctx.stroke();
  }

  // Crosshair
  ctx.strokeStyle = '#ff0055';
  ctx.lineWidth = 2 * s;
  ctx.beginPath();
  ctx.arc(cx, cy, 7 * s, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(cx - 11 * s, cy);
  ctx.lineTo(cx + 11 * s, cy);
  ctx.moveTo(cx, cy - 11 * s);
  ctx.lineTo(cx, cy + 11 * s);
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(cx, cy, 2.5 * s, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

/**
 * 3. WAVE BOSS COMBINATION RENDERER
 */
export function renderStudioWaveBoss(
  ctx: CanvasRenderingContext2D,
  formIdx: number,
  rarityIdx: number,
  width: number,
  height: number,
  time: number
) {
  ctx.save();
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = '#06010a';
  ctx.fillRect(0, 0, width, height);

  const cx = width / 2;
  const cy = height / 2;
  const s = Math.min(width, height) / 100;

  const form = FORMS_DATA[formIdx - 1] || FORMS_DATA[0]!;
  const rarity = RARITIES_DATA[rarityIdx - 1] || RARITIES_DATA[0]!;
  const baseRadius = 28 * s;

  // Armor Plates
  for (let p = 0; p < form.sides; p++) {
    const pa = (p * 2 * Math.PI) / form.sides + time * 0.4;
    const px = cx + Math.cos(pa) * (baseRadius * 1.35);
    const py = cy + Math.sin(pa) * (baseRadius * 1.35);
    ctx.fillStyle = rarity.color;
    ctx.fillRect(px - 4 * s, py - 4 * s, 8 * s, 8 * s);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.strokeRect(px - 4 * s, py - 4 * s, 8 * s, 8 * s);
  }

  // Enrage Spikes
  ctx.strokeStyle = '#ff005588';
  ctx.lineWidth = 2 * s;
  for (let sp = 0; sp < 12; sp++) {
    const spa = (sp * Math.PI) / 6 - time * 0.5;
    const len = (baseRadius * 1.5) + Math.sin(time * 10 + sp) * 6 * s;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(spa) * baseRadius, cy + Math.sin(spa) * baseRadius);
    ctx.lineTo(cx + Math.cos(spa) * len, cy + Math.sin(spa) * len);
    ctx.stroke();
  }

  // Core
  ctx.fillStyle = '#2b0615';
  ctx.strokeStyle = rarity.color;
  ctx.lineWidth = 4 * s;
  drawPolygon(ctx, cx, cy, baseRadius, form.sides, time * 0.15);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#ff0055';
  ctx.beginPath();
  ctx.arc(cx, cy, 9 * s, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2 * s;
  ctx.stroke();

  ctx.restore();
}

/**
 * 4. ARENA BOSS COMBINATION RENDERER
 */
export function renderStudioArenaBoss(
  ctx: CanvasRenderingContext2D,
  bossIdx: number,
  rarityIdx: number,
  width: number,
  height: number,
  time: number
) {
  ctx.save();
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = '#05010b';
  ctx.fillRect(0, 0, width, height);

  const cx = width / 2;
  const cy = height / 2;
  const s = Math.min(width, height) / 100;

  const boss = ARENA_BOSSES_DATA[bossIdx - 1] || ARENA_BOSSES_DATA[0]!;
  const rarity = RARITIES_DATA[rarityIdx - 1] || RARITIES_DATA[0]!;
  const baseRadius = 30 * s;

  ctx.strokeStyle = `${boss.coreColor}26`;
  ctx.lineWidth = 2;
  drawPolygon(ctx, cx, cy, baseRadius * 1.7, 6, time * 0.1);
  ctx.stroke();

  for (let o = 0; o < 6; o++) {
    const oa = (o * Math.PI) / 3 + time * 0.9;
    const ox = cx + Math.cos(oa) * (baseRadius * 1.4);
    const oy = cy + Math.sin(oa) * (baseRadius * 1.4);
    ctx.fillStyle = rarity.color;
    ctx.beginPath();
    ctx.arc(ox, oy, 3.5 * s, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  ctx.fillStyle = '#1c052e';
  ctx.strokeStyle = rarity.color;
  ctx.lineWidth = 4 * s;
  drawPolygon(ctx, cx, cy, baseRadius, boss.sides, -time * 0.2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = boss.coreColor;
  ctx.beginPath();
  ctx.arc(cx, cy, 10 * s, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2.5 * s;
  ctx.stroke();

  ctx.restore();
}

/**
 * 5. DRONE FROM ULTIMATE WEAPON FORGE RENDERER
 */
export function renderStudioDrone(
  ctx: CanvasRenderingContext2D,
  droneId: string,
  width: number,
  height: number,
  time: number
) {
  ctx.save();
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = '#060312';
  ctx.fillRect(0, 0, width, height);

  const cx = width / 2;
  const cy = height / 2;
  const s = Math.min(width, height) / 60;

  let baseColor = '#00f0ff';
  if (droneId === 'missiles') baseColor = '#ff3b30';
  else if (droneId === 'lightning') baseColor = '#ffd700';
  else if (droneId === 'golden_aura') baseColor = '#ffcc00';
  else if (droneId === 'black_hole') baseColor = '#a855f7';
  else if (droneId === 'death_wave') baseColor = '#00f0ff';
  else if (droneId === 'chrono_field') baseColor = '#06b6d4';
  else if (droneId === 'orbital_beam_drone') baseColor = '#34d399';
  else if (droneId === 'quantum_boomerang_drone') baseColor = '#38bdf8';
  else if (droneId === 'proximity_mine_drone') baseColor = '#ef4444';
  else if (droneId === 'mirror_deflector_drone') baseColor = '#6366f1';
  else if (droneId === 'subzero_cryo_drone') baseColor = '#38bdf8';
  else if (droneId === 'tesla_coil_drone') baseColor = '#c084fc';
  else if (droneId === 'elemental_buffer_drone') baseColor = '#00ffcc';
  else if (droneId === 'tactical_buffer_drone') baseColor = '#f59e0b';
  else if (droneId === 'scavenger_harvester_drone') baseColor = '#10b981';
  else if (droneId === 'disruptor_debuffer_drone') baseColor = '#ec4899';

  ctx.strokeStyle = baseColor;
  ctx.lineWidth = 2 * s;

  if (droneId === 'missiles') {
    ctx.fillStyle = '#3a0808';
    ctx.beginPath();
    ctx.moveTo(cx + 13 * s, cy);
    ctx.lineTo(cx + 4 * s, cy - 6 * s);
    ctx.lineTo(cx - 7 * s, cy - 6 * s);
    ctx.lineTo(cx - 11 * s, cy - 10 * s);
    ctx.lineTo(cx - 9 * s, cy - 3 * s);
    ctx.lineTo(cx - 9 * s, cy + 3 * s);
    ctx.lineTo(cx - 11 * s, cy + 10 * s);
    ctx.lineTo(cx - 7 * s, cy + 6 * s);
    ctx.lineTo(cx + 4 * s, cy + 6 * s);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffaa00';
    ctx.beginPath();
    ctx.arc(cx - 12 * s, cy, 2.8 * s, 0, Math.PI * 2);
    ctx.fill();
  } else if (droneId === 'lightning') {
    ctx.fillStyle = '#3d3000';
    ctx.beginPath();
    ctx.moveTo(cx + 2 * s, cy - 13 * s);
    ctx.lineTo(cx - 7 * s, cy - 1 * s);
    ctx.lineTo(cx - 1 * s, cy - 1 * s);
    ctx.lineTo(cx - 3 * s, cy + 13 * s);
    ctx.lineTo(cx + 7 * s, cy + 1 * s);
    ctx.lineTo(cx + 1 * s, cy + 1 * s);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  } else if (droneId === 'golden_aura') {
    ctx.fillStyle = '#382d00';
    ctx.beginPath();
    ctx.arc(cx, cy, 10 * s, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    for (let r = 0; r < 4; r++) {
      const ra = (r * Math.PI) / 2 + time * 0.8;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(ra) * 6 * s, cy + Math.sin(ra) * 6 * s);
      ctx.lineTo(cx + Math.cos(ra) * 15 * s, cy + Math.sin(ra) * 15 * s);
      ctx.stroke();
    }
  } else if (droneId === 'black_hole') {
    ctx.fillStyle = '#18002e';
    ctx.beginPath();
    ctx.arc(cx, cy, 9 * s, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    for (const rot of [Math.PI / 4 + time, -Math.PI / 4 - time]) {
      ctx.beginPath();
      ctx.ellipse(cx, cy, 15 * s, 6 * s, rot, 0, Math.PI * 2);
      ctx.stroke();
    }
  } else if (droneId === 'death_wave') {
    for (let a = 1; a <= 3; a++) {
      const ar = (a * 5 + 2) * s;
      ctx.beginPath();
      ctx.arc(cx - 4 * s, cy, ar, -Math.PI * 0.42, Math.PI * 0.42);
      ctx.stroke();
    }
  } else if (droneId === 'chrono_field') {
    ctx.fillStyle = '#002626';
    ctx.beginPath();
    ctx.arc(cx, cy, 8 * s, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    for (let gr = 0; gr < 6; gr++) {
      const ga = (gr * Math.PI) / 3 + time * 0.7;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(ga) * 8 * s, cy + Math.sin(ga) * 8 * s);
      ctx.lineTo(cx + Math.cos(ga) * 13 * s, cy + Math.sin(ga) * 13 * s);
      ctx.stroke();
    }
  } else {
    // Default circular drone
    ctx.fillStyle = '#0c1a2e';
    ctx.beginPath();
    ctx.arc(cx, cy, 10 * s, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(cx, cy, 3 * s, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

/**
 * 6. CLASS AMMUNITION / PROJECTILE RENDERER
 */
export function renderStudioClassMunition(
  ctx: CanvasRenderingContext2D,
  classId: string,
  width: number,
  height: number,
  time: number
) {
  ctx.save();
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = '#05020c';
  ctx.fillRect(0, 0, width, height);

  const cx = width / 2;
  const cy = height / 2;
  const s = Math.min(width, height) / 80;

  if (classId === 'fighter') {
    ctx.fillStyle = '#3a0808';
    ctx.strokeStyle = '#ff3b30';
    ctx.lineWidth = 2.5 * s;
    ctx.beginPath();
    ctx.moveTo(cx + 18 * s, cy);
    ctx.lineTo(cx + 6 * s, cy - 8 * s);
    ctx.lineTo(cx - 14 * s, cy - 8 * s);
    ctx.lineTo(cx - 18 * s, cy - 14 * s);
    ctx.lineTo(cx - 16 * s, cy);
    ctx.lineTo(cx - 18 * s, cy + 14 * s);
    ctx.lineTo(cx - 14 * s, cy + 8 * s);
    ctx.lineTo(cx + 6 * s, cy + 8 * s);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffaa00';
    ctx.beginPath();
    ctx.arc(cx - 20 * s, cy, (5 + Math.sin(time * 20) * 2) * s, 0, Math.PI * 2);
    ctx.fill();
  } else if (classId === 'rogue') {
    for (const offset of [-8 * s, 8 * s]) {
      ctx.fillStyle = '#062033';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.2 * s;
      ctx.beginPath();
      ctx.moveTo(cx + 16 * s, cy + offset);
      ctx.lineTo(cx - 12 * s, cy + offset - 5 * s);
      ctx.lineTo(cx - 6 * s, cy + offset);
      ctx.lineTo(cx - 12 * s, cy + offset + 5 * s);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
  } else if (classId === 'mage') {
    ctx.fillStyle = '#571800';
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 3 * s;
    ctx.beginPath();
    ctx.arc(cx, cy, 14 * s, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    for (let f = 0; f < 8; f++) {
      const fa = (f * Math.PI) / 4 + time * 1.5;
      const fl = (18 + Math.sin(time * 12 + f) * 5) * s;
      ctx.strokeStyle = '#ffd700';
      ctx.lineWidth = 1.5 * s;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(fa) * 14 * s, cy + Math.sin(fa) * 14 * s);
      ctx.lineTo(cx + Math.cos(fa) * fl, cy + Math.sin(fa) * fl);
      ctx.stroke();
    }
  } else if (classId === 'bard') {
    ctx.strokeStyle = '#c084fc';
    ctx.lineWidth = 2.5 * s;
    for (let w = 1; w <= 3; w++) {
      const wr = (w * 8 + Math.sin(time * 8) * 3) * s;
      ctx.beginPath();
      ctx.arc(cx - 6 * s, cy, wr, -Math.PI * 0.45, Math.PI * 0.45);
      ctx.stroke();
    }
    ctx.fillStyle = '#ffffff';
    ctx.font = `${Math.max(12, 10 * s)}px Arial`;
    ctx.fillText('♪', cx + 10 * s, cy - 6 * s);
    ctx.fillText('♫', cx + 16 * s, cy + 8 * s);
  } else if (classId === 'paladin') {
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 5 * s;
    ctx.beginPath();
    ctx.moveTo(cx - 26 * s, cy);
    ctx.lineTo(cx + 26 * s, cy);
    ctx.stroke();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2 * s;
    ctx.beginPath();
    ctx.moveTo(cx - 26 * s, cy);
    ctx.lineTo(cx + 26 * s, cy);
    ctx.stroke();
  } else if (classId === 'ranger') {
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2.5 * s;
    ctx.beginPath();
    ctx.moveTo(cx - 22 * s, cy);
    ctx.lineTo(cx + 22 * s, cy);
    ctx.stroke();

    ctx.fillStyle = '#a7f3d0';
    ctx.beginPath();
    ctx.moveTo(cx + 26 * s, cy);
    ctx.lineTo(cx + 14 * s, cy - 7 * s);
    ctx.lineTo(cx + 17 * s, cy);
    ctx.lineTo(cx + 14 * s, cy + 7 * s);
    ctx.closePath();
    ctx.fill();
  }

  ctx.restore();
}

/**
 * Universal Gallery Item Renderer for CodexViewer
 */
export function renderProceduralAsset(
  ctx: CanvasRenderingContext2D,
  type: string,
  width: number,
  height: number,
  time: number = 0,
  baseColor: string = '#00f0ff'
) {
  if (type.startsWith('drone_')) {
    const rawId = type.replace('drone_', '');
    renderStudioDrone(ctx, rawId, width, height, time);
    return;
  }

  ctx.save();
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = '#070314';
  ctx.fillRect(0, 0, width, height);

  const cx = width / 2;
  const cy = height / 2;
  const s = Math.min(width, height) / 80;

  if (type.startsWith('expression_')) {
    // Holographic box
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(cx - 30 * s, cy - 20 * s, 60 * s, 40 * s);

    ctx.fillStyle = '#00f0ff';
    ctx.font = `${Math.max(8, 5 * s)}px JetBrains Mono`;
    ctx.textAlign = 'center';
    ctx.fillText('MATRIZ SENSORIAL HUD', cx, cy + 16 * s);

    ctx.lineWidth = 2.5 * s;
    ctx.lineCap = 'round';
    ctx.strokeStyle = baseColor;

    if (type === 'expression_happy') {
      ctx.beginPath();
      ctx.moveTo(cx - 10 * s, cy - 3 * s);
      ctx.lineTo(cx - 6 * s, cy - 7 * s);
      ctx.lineTo(cx - 2 * s, cy - 3 * s);
      ctx.moveTo(cx + 2 * s, cy - 3 * s);
      ctx.lineTo(cx + 6 * s, cy - 7 * s);
      ctx.lineTo(cx + 10 * s, cy - 3 * s);
      ctx.moveTo(cx - 6 * s, cy + 3 * s);
      ctx.lineTo(cx, cy + 7 * s);
      ctx.lineTo(cx + 6 * s, cy + 3 * s);
      ctx.stroke();
    } else if (type === 'expression_excited') {
      ctx.fillStyle = baseColor;
      ctx.fillRect(cx - 9 * s, cy - 8 * s, 5 * s, 5 * s);
      ctx.fillRect(cx + 4 * s, cy - 8 * s, 5 * s, 5 * s);
      ctx.beginPath();
      ctx.arc(cx, cy + 3 * s, 6 * s, 0, Math.PI);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.moveTo(cx - 8 * s, cy - 4 * s);
      ctx.lineTo(cx - 2 * s, cy - 4 * s);
      ctx.moveTo(cx + 2 * s, cy - 4 * s);
      ctx.lineTo(cx + 8 * s, cy - 4 * s);
      ctx.moveTo(cx - 6 * s, cy + 4 * s);
      ctx.lineTo(cx + 6 * s, cy + 4 * s);
      ctx.stroke();
    }
  } else if (type.startsWith('aura_')) {
    const platY = cy + 22 * s;
    ctx.fillStyle = '#061320';
    ctx.fillRect(0, platY, width, height - platY);
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, platY);
    ctx.lineTo(width, platY);
    ctx.stroke();

    ctx.fillStyle = '#00f0ff55';
    for (let hx = 0; hx < width; hx += 16 * s) {
      ctx.beginPath();
      ctx.moveTo(hx, platY);
      ctx.lineTo(hx + 8 * s, platY);
      ctx.lineTo(hx, platY + 8 * s);
      ctx.fill();
    }

    ctx.strokeStyle = '#00f0ff44';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let h = 0; h < 6; h++) {
      const ha = (h * Math.PI) / 3;
      const hx = cx + Math.cos(ha) * 32 * s;
      const hy = (cy - 6 * s) + Math.sin(ha) * 32 * s;
      if (h === 0) ctx.moveTo(hx, hy);
      else ctx.lineTo(hx, hy);
    }
    ctx.closePath();
    ctx.stroke();

    ctx.strokeStyle = baseColor;
    ctx.beginPath();
    ctx.arc(cx, cy - 6 * s, 18 * s, 0, Math.PI * 2);
    ctx.stroke();

    for (let f = 0; f < 8; f++) {
      const fa = (f * Math.PI) / 4 + time * 0.2;
      const fx = cx + Math.cos(fa) * 18 * s;
      const fy = (cy - 6 * s) + Math.sin(fa) * 18 * s;
      ctx.fillStyle = '#ffffff';
      ctx.font = `${Math.max(8, 4 * s)}px Arial`;
      ctx.fillText('❄', fx, fy);
    }
  } else if (type === 'hull_vector01') {
    renderStudioPlayer(ctx, 1, 11, width, height, time);
  } else if (type === 'hull_flower') {
    renderStudioPlayer(ctx, 12, 12, width, height, time);
  } else if (type === 'proj_kinetic_dart') {
    renderStudioClassMunition(ctx, 'fighter', width, height, time);
  } else if (type === 'proj_photon_lance') {
    renderStudioClassMunition(ctx, 'paladin', width, height, time);
  }

  ctx.restore();
}

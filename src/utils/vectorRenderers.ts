/**
 * AC3games Procedural Vector Render Engine
 * Directly ported from Geometry Platforms source code:
 * - GeometryGenerator.ts: exact outer chassis contour with ZERO internal crossing lines
 * - RenderSystem.ts: stern plasma flame, enemy crosshair sensors, boss armor plates
 * - hq-scene.ts: 16 drones from Forja de Armas Supremas
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
  { index: 1, name: 'Triângulo (Triangle)', sides: 3, multiplier: 1.0, desc: 'Chassi primário com 3 vértices balanceados para velocidade e penetração linear.' },
  { index: 2, name: 'Quadrado (Square)', sides: 4, multiplier: 1.1, desc: 'Casco angular com estabilizadores quadráticos de alta blindagem balística.' },
  { index: 3, name: 'Pentágono (Pentagon)', sides: 5, multiplier: 1.2, desc: 'Geometria pentagonal com distribuição harmônica de energia e escudos.' },
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
    desc: 'Especialista em resistência corporal e demolição em área. Dispara foguetes pesados de alto impacto com onda de concussão.'
  },
  {
    id: 'rogue',
    name: 'Ladino (Rogue)',
    weaponId: 'weapon_daggers',
    weaponName: 'Adagas Cinéticas de Fase',
    munitionName: 'Munição: Lâminas Flechette de Fase',
    color: '#38bdf8',
    attributes: { str: 6, dex: 10, con: 6, int: 4, wit: 8, men: 4 },
    desc: 'Mestre da agilidade, esquiva e acertos críticos. Lança lâminas duplas velozes que ricocheteiam entre alvos.'
  },
  {
    id: 'mage',
    name: 'Mago (Mage)',
    weaponId: 'weapon_fireball',
    weaponName: 'Esfera de Plasma Ígneo',
    munitionName: 'Munição: Bola de Fogo Termonuclear',
    color: '#f97316',
    attributes: { str: 4, dex: 4, con: 4, int: 10, wit: 6, men: 10 },
    desc: 'Manipulador de energias arcanas sintetizadas. Conjurador de orbes termonucleares com dano contínuo de queimadura.'
  },
  {
    id: 'bard',
    name: 'Bardo (Bard)',
    weaponId: 'weapon_musical_notes',
    weaponName: 'Ressonador Sônico de Frequência',
    munitionName: 'Munição: Notas Musicais de Cavitação',
    color: '#a855f7',
    attributes: { str: 4, dex: 8, con: 6, int: 6, wit: 10, men: 8 },
    desc: 'Harmonizador bio-computacional. Projeta notas acústicas em expansão que desestabilizam armaduras e restauram sistemas.'
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

/**
 * Direct Geometric generator from GeometryGenerator.ts
 * Generates pure closed perimeter contour with ZERO internal crossing lines.
 */
function generateLobedContour(
  count: number,
  rOuter: number,
  distRatio: number,
  lobeRatio: number,
  stepsPerLobe: number = 24
): { x: number; y: number }[] {
  const points: { x: number; y: number }[] = [];
  const dist = rOuter * distRatio;
  const lobeR = rOuter * lobeRatio;
  const alpha = Math.PI / count;

  const D = 2 * dist * Math.sin(alpha);
  const h = Math.sqrt(Math.max(0, lobeR * lobeR - (D / 2) * (D / 2)));
  const c0x = dist, c0y = 0;
  const c1x = dist * Math.cos(2 * alpha), c1y = dist * Math.sin(2 * alpha);
  const midX = (c0x + c1x) / 2;
  const midY = (c0y + c1y) / 2;
  const rMid = Math.sqrt(midX * midX + midY * midY);
  const pOuterX = midX + (midX / rMid) * h;
  const pOuterY = midY + (midY / rMid) * h;

  // Outer valley angle relative to the lobe center (pure outer contour, ZERO internal crossing lines)
  const span = Math.atan2(pOuterY - c0y, pOuterX - c0x);

  for (let i = 0; i < count; i++) {
    const a = (i * 2 * Math.PI) / count - Math.PI / 2;
    const lx = dist * Math.cos(a);
    const ly = dist * Math.sin(a);

    for (let s = 0; s <= stepsPerLobe; s++) {
      const frac = s / stepsPerLobe;
      const phi = -span + 2 * span * frac;
      points.push({
        x: lx + lobeR * Math.cos(a + phi),
        y: ly + lobeR * Math.sin(a + phi)
      });
    }
  }
  return points;
}

/**
 * Returns clean 2D outer contour points for any form index (1-12)
 */
export function getFormContourPoints(formIndex: number, radius: number): { x: number; y: number }[] {
  const pts: { x: number; y: number }[] = [];

  if (formIndex === 1) {
    // Equilateral Triangle (flat base, point pointing up)
    const r = radius;
    const side = Math.sqrt(3) * r;
    const h = (Math.sqrt(3) / 2) * side;
    pts.push(
      { x: 0, y: -h / 2 },
      { x: side / 2, y: h / 2 },
      { x: -side / 2, y: h / 2 }
    );
  } else if (formIndex >= 2 && formIndex <= 6) {
    // Regular Polygons 4 to 8 with flat bottom
    const sides = formIndex + 2;
    for (let i = 0; i < sides; i++) {
      const angle = (2 * Math.PI * i) / sides + Math.PI / 2 - Math.PI / sides;
      pts.push({
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle)
      });
    }
  } else if (formIndex === 7) {
    // Trefoil (3 lobes outer contour)
    return generateLobedContour(3, radius, 0.44, 0.50, 24);
  } else if (formIndex === 8) {
    // 4-Star
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI * i) / 4 - Math.PI / 2;
      const r = i % 2 === 0 ? radius : radius * 0.42;
      pts.push({ x: r * Math.cos(angle), y: r * Math.sin(angle) });
    }
  } else if (formIndex === 9) {
    // 5-Star
    for (let i = 0; i < 10; i++) {
      const angle = (Math.PI * i) / 5 - Math.PI / 2;
      const r = i % 2 === 0 ? radius : radius * 0.45;
      pts.push({ x: r * Math.cos(angle), y: r * Math.sin(angle) });
    }
  } else if (formIndex === 10) {
    // 6-Star
    for (let i = 0; i < 12; i++) {
      const angle = (Math.PI * i) / 6 - Math.PI / 2;
      const r = i % 2 === 0 ? radius : radius * 0.50;
      pts.push({ x: r * Math.cos(angle), y: r * Math.sin(angle) });
    }
  } else if (formIndex === 11) {
    // Quatrefoil (4 lobes outer contour)
    return generateLobedContour(4, radius, 0.50, 0.44, 24);
  } else if (formIndex === 12) {
    // Flower (8 petals outer contour with zero internal lines)
    return generateLobedContour(8, radius, 0.60, 0.35, 18);
  }

  return pts;
}

/**
 * 1. PLAYER COMBINATION RENDERER
 * - Pure outer contour (NO internal lines!)
 * - NO floating dots/shards around the shape!
 * - Thin, crisp lines (2.0px)
 * - Plasma thruster flame at the stern
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
  const rarity = RARITIES_DATA[rarityIdx - 1] || RARITIES_DATA[0]!;
  const radius = 28 * s;

  // 1. Stern Plasma Thruster Flame (behind the hull)
  const flameLen = (14 + Math.sin(time * 16) * 4) * s;
  const flameY = cy + radius * 0.65;
  ctx.fillStyle = rarity.flameColor;
  ctx.beginPath();
  ctx.moveTo(cx - 6 * s, flameY);
  ctx.lineTo(cx, flameY + flameLen);
  ctx.lineTo(cx + 6 * s, flameY);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(cx - 2.5 * s, flameY);
  ctx.lineTo(cx, flameY + flameLen * 0.5);
  ctx.lineTo(cx + 2.5 * s, flameY);
  ctx.closePath();
  ctx.fill();

  // 2. Pure Closed Chassis Contour (ZERO internal lines!)
  const pts = getFormContourPoints(formIdx, radius);
  if (pts.length > 0) {
    ctx.beginPath();
    ctx.moveTo(cx + pts[0]!.x, cy + pts[0]!.y);
    for (let i = 1; i < pts.length; i++) {
      ctx.lineTo(cx + pts[i]!.x, cy + pts[i]!.y);
    }
    ctx.closePath();

    // Dark high-contrast solid hull fill
    ctx.fillStyle = '#080d1a';
    ctx.fill();

    // Crisp, thin outline matching rarity color (thickness = 2.0px)
    ctx.strokeStyle = rarity.color;
    ctx.lineWidth = 2.0;
    ctx.lineJoin = 'round';
    ctx.stroke();
  }

  ctx.restore();
}

/**
 * 2. ENEMY COMBINATION RENDERER
 * - FIXED orientation (NO rotation/spinning!)
 * - Pure outer contour with thin crisp lines
 * - Crosshair target sensor in center
 */
export function renderStudioEnemy(
  ctx: CanvasRenderingContext2D,
  formIdx: number,
  rarityIdx: number,
  width: number,
  height: number,
  _time: number
) {
  ctx.save();
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = '#06020e';
  ctx.fillRect(0, 0, width, height);

  const cx = width / 2;
  const cy = height / 2;
  const s = Math.min(width, height) / 100;
  const rarity = RARITIES_DATA[rarityIdx - 1] || RARITIES_DATA[0]!;
  const radius = 26 * s;

  // Pure Closed Chassis Contour (Fixed, no rotation)
  const pts = getFormContourPoints(formIdx, radius);
  if (pts.length > 0) {
    ctx.beginPath();
    ctx.moveTo(cx + pts[0]!.x, cy + pts[0]!.y);
    for (let i = 1; i < pts.length; i++) {
      ctx.lineTo(cx + pts[i]!.x, cy + pts[i]!.y);
    }
    ctx.closePath();

    ctx.fillStyle = '#1c0718';
    ctx.fill();

    ctx.strokeStyle = rarity.color;
    ctx.lineWidth = 2.0;
    ctx.lineJoin = 'round';
    ctx.stroke();
  }

  // Crosshair Sensor (Enemy characteristic)
  ctx.strokeStyle = '#ff0055';
  ctx.lineWidth = 1.8;
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
  ctx.arc(cx, cy, 2 * s, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

/**
 * 3. WAVE BOSS COMBINATION RENDERER
 * - Armor plates around outer contour
 * - Enrage spikes
 * - Crisp thin lines
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
  const radius = 28 * s;

  // Armor Plates (Fixed on perimeter)
  for (let p = 0; p < form.sides; p++) {
    const pa = (p * 2 * Math.PI) / form.sides - Math.PI / 2;
    const px = cx + Math.cos(pa) * (radius * 1.35);
    const py = cy + Math.sin(pa) * (radius * 1.35);
    ctx.fillStyle = rarity.color;
    ctx.fillRect(px - 3.5 * s, py - 3.5 * s, 7 * s, 7 * s);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.2;
    ctx.strokeRect(px - 3.5 * s, py - 3.5 * s, 7 * s, 7 * s);
  }

  // Enrage Spikes (Fixed radiating lines)
  ctx.strokeStyle = '#ff005577';
  ctx.lineWidth = 1.5;
  for (let sp = 0; sp < 12; sp++) {
    const spa = (sp * Math.PI) / 6;
    const len = radius * 1.45 + Math.sin(time * 8 + sp) * 4 * s;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(spa) * (radius * 1.05), cy + Math.sin(spa) * (radius * 1.05));
    ctx.lineTo(cx + Math.cos(spa) * len, cy + Math.sin(spa) * len);
    ctx.stroke();
  }

  // Pure Contour Hull
  const pts = getFormContourPoints(formIdx, radius);
  if (pts.length > 0) {
    ctx.beginPath();
    ctx.moveTo(cx + pts[0]!.x, cy + pts[0]!.y);
    for (let i = 1; i < pts.length; i++) {
      ctx.lineTo(cx + pts[i]!.x, cy + pts[i]!.y);
    }
    ctx.closePath();

    ctx.fillStyle = '#2b0615';
    ctx.fill();

    ctx.strokeStyle = rarity.color;
    ctx.lineWidth = 2.2;
    ctx.stroke();
  }

  // Core Turret
  ctx.fillStyle = '#ff0055';
  ctx.beginPath();
  ctx.arc(cx, cy, 7 * s, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1.5;
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
  _time: number
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
  const radius = 30 * s;

  // Outer Hexagon
  ctx.strokeStyle = `${boss.coreColor}33`;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  for (let h = 0; h < 6; h++) {
    const ha = (h * Math.PI) / 3 - Math.PI / 2;
    const hx = cx + Math.cos(ha) * (radius * 1.6);
    const hy = cy + Math.sin(ha) * (radius * 1.6);
    if (h === 0) ctx.moveTo(hx, hy);
    else ctx.lineTo(hx, hy);
  }
  ctx.closePath();
  ctx.stroke();

  // Pure Contour Hull
  const pts = getFormContourPoints(boss.sides === 11 ? 11 : (boss.sides === 12 ? 12 : boss.sides), radius);
  if (pts.length > 0) {
    ctx.beginPath();
    ctx.moveTo(cx + pts[0]!.x, cy + pts[0]!.y);
    for (let i = 1; i < pts.length; i++) {
      ctx.lineTo(cx + pts[i]!.x, cy + pts[i]!.y);
    }
    ctx.closePath();

    ctx.fillStyle = '#1c052e';
    ctx.fill();

    ctx.strokeStyle = rarity.color;
    ctx.lineWidth = 2.2;
    ctx.stroke();
  }

  // Core Eye
  ctx.fillStyle = boss.coreColor;
  ctx.beginPath();
  ctx.arc(cx, cy, 9 * s, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1.8;
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(cx, cy, 3 * s, 0, Math.PI * 2);
  ctx.fill();

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
  ctx.lineWidth = 1.8;

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

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(cx - 5 * s, cy);
    ctx.lineTo(cx + 7 * s, cy);
    ctx.stroke();

    ctx.fillStyle = '#ffaa00';
    ctx.beginPath();
    ctx.arc(cx - 12 * s, cy, 2.5 * s, 0, Math.PI * 2);
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
    ctx.lineWidth = 2.0;
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
    ctx.arc(cx - 20 * s, cy, (4 + Math.sin(time * 20) * 1.5) * s, 0, Math.PI * 2);
    ctx.fill();
  } else if (classId === 'rogue') {
    for (const offset of [-8 * s, 8 * s]) {
      ctx.fillStyle = '#062033';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.8;
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
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(cx, cy, 14 * s, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    for (let f = 0; f < 8; f++) {
      const fa = (f * Math.PI) / 4 + time * 1.5;
      const fl = (18 + Math.sin(time * 12 + f) * 4) * s;
      ctx.strokeStyle = '#ffd700';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(fa) * 14 * s, cy + Math.sin(fa) * 14 * s);
      ctx.lineTo(cx + Math.cos(fa) * fl, cy + Math.sin(fa) * fl);
      ctx.stroke();
    }
  } else if (classId === 'bard') {
    ctx.strokeStyle = '#c084fc';
    ctx.lineWidth = 1.8;
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
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(cx - 26 * s, cy);
    ctx.lineTo(cx + 26 * s, cy);
    ctx.stroke();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx - 26 * s, cy);
    ctx.lineTo(cx + 26 * s, cy);
    ctx.stroke();
  } else if (classId === 'ranger') {
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 1.8;
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
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 1.2;
    ctx.strokeRect(cx - 30 * s, cy - 20 * s, 60 * s, 40 * s);

    ctx.fillStyle = '#00f0ff';
    ctx.font = `${Math.max(8, 5 * s)}px JetBrains Mono`;
    ctx.textAlign = 'center';
    ctx.fillText('MATRIZ SENSORIAL HUD', cx, cy + 16 * s);

    ctx.lineWidth = 2.0;
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
    ctx.lineWidth = 1.5;
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
    ctx.lineWidth = 1.5;
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

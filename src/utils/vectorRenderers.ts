/**
 * AC3games Procedural Vector Render Engine
 * Directly copied from Geometry Platforms:
 * - catalog-scene.ts: lines 4359-4529 (drawVectorShape) & lines 474-510 (formsData)
 * - GeometryGenerator.ts: pure outer lobed contours
 */

export interface CatalogFormData {
  key: string;
  name: string;
  sides: number;
  mult: number;
  isSpecial?: boolean;
  specialType?: 'star' | 'flower';
  bonus: string;
  behavior: string;
  lore: string;
}

export const CATALOG_FORMS: CatalogFormData[] = [
  {
    key: 'triangle',
    name: 'TRIÂNGULO',
    sides: 3,
    mult: 1.0,
    bonus: '+5% Velocidade & Aceleração da Nave',
    behavior: 'Corredor: Avança horizontalmente em direção ao jogador e troca de pista rapidamente.',
    lore: 'A estrutura geométrica mais básica. Leve, ágil, porém altamente instável em níveis subatômicos.'
  },
  {
    key: 'square',
    name: 'QUADRADO',
    sides: 4,
    mult: 1.2,
    bonus: '+15% HP Máximo (Blindagem Pesada da Estrutura)',
    behavior: 'Tanque: HP elevadíssimo, movimento lento, atua como absorvedor de projéteis.',
    lore: 'Um constructo robusto de quatro lados projetado para reforço estrutural e escudo balístico pesado.'
  },
  {
    key: 'pentagon',
    name: 'PENTÁGONO',
    sides: 5,
    mult: 1.4,
    bonus: '+10% Dano de Projéteis e Módulos',
    behavior: 'Atirador de Distância: Move-se horizontalmente mantendo distância e dispara projéteis.',
    lore: 'Configurado para concentração localizada de energia, permitindo descargas em alta frequência.'
  },
  {
    key: 'hexagon',
    name: 'HEXÁGONO',
    sides: 6,
    mult: 1.6,
    bonus: '+5% Cadência de Tiro Primária',
    behavior: 'Divisor: Perseguidor médio. Divide-se em 2 pequenos hexágonos ao ser destruído.',
    lore: 'Uma matriz hexagonal avançada que cinde sua estrutura celular ao sofrer dano cinético terminal.'
  },
  {
    key: 'heptagon',
    name: 'HEPTÁGONO',
    sides: 7,
    mult: 1.9,
    bonus: '+8% Dano de Módulos Táticos Ativos',
    behavior: 'Investidor: Carrega periodicamente em arrancadas de alta velocidade direto contra o jogador.',
    lore: 'Um polígono primo assimétrico que utiliza liberação de inércia para investir abruptamente.'
  },
  {
    key: 'octagon',
    name: 'OCTÓGONO',
    sides: 8,
    mult: 2.2,
    bonus: '+15% Resistência a Colisão Física',
    behavior: 'Kamikaze Explosivo: Investe contra o jogador; explode ao contato ou morte (dano em área).',
    lore: 'Um elemento pesado altamente instável que detona uma explosão termodinâmica ao ser violado.'
  },
  {
    key: 'trefoil',
    name: 'TRIFÓLIO',
    sides: 9,
    mult: 2.6,
    bonus: '+10% Redução de Recarga Ativa',
    behavior: 'Teleportador: IA perseguidora. Teleporta horizontalmente ao ser alvejado por tiros.',
    lore: 'Capaz de alterar coordenadas dimensionais, saltando no espaço ao ser mirado.'
  },
  {
    key: '4-star',
    name: 'ESTRELA 4P',
    sides: 10,
    mult: 3.0,
    bonus: '+10% Regeneração da Estrutura',
    behavior: 'Sifonador de Nanites: Drena energia ao tocar a nave e regenera estruturas de outros constructos.',
    lore: 'Um constructo parasitário com nanites de sifão que desconstroem matéria do alvo para alimentar aliados próximos.'
  },
  {
    key: '5-star',
    name: 'ESTRELA 5P',
    sides: 11,
    mult: 3.5,
    bonus: '+5% Ganho de Experiência na Partida',
    behavior: 'Atirador Congelante: Dispara estilhaços de subzero que reduzem a velocidade da nave em 50%.',
    lore: 'Utiliza campos de subzero para projetar estilhaços gélidos, podando a mobilidade do piloto.'
  },
  {
    key: '6-star',
    name: 'ESTRELA 6P',
    sides: 12,
    mult: 4.0,
    bonus: '+10% Recuperação de Energia Quântica (EN)',
    behavior: 'Protetor: Emite campo gravitacional que desacelera a velocidade da nave em 40%.',
    lore: 'Emite um campo de distorção microgravitacional que impõe arrasto cinético aos arredores.'
  },
  {
    key: 'quatrefoil',
    name: 'QUATREFÓLIO',
    sides: 10,
    mult: 5.0,
    isSpecial: true,
    specialType: 'star',
    bonus: '+15% Taxa de Drop de Moedas & Créditos',
    behavior: 'Invocador: IA perseguidora. Invoca periodicamente sub-entidades Triângulos.',
    lore: 'Um constructo estelar celestial que manifesta subentidades geométricas menores.'
  },
  {
    key: 'flower',
    name: 'FLOR (SUPER BOSS)',
    sides: 12,
    mult: 6.0,
    isSpecial: true,
    specialType: 'flower',
    bonus: '+20% Escudo de Força Passivo',
    behavior: 'Boss Épico (Wave & Arena): Possui Escudo Ciano (Barra Branca sobre HP), Estado de Fúria com Núcleo Vermelho Pulsante, Disparos Espirais/Anéis Radiais e combate em 2 Fases.',
    lore: 'Super Entidade Geométrica Suprema. Em Bosses de Wave normais, possui barra de integridade sobre a cabeça e 10s para entrar em Fúria. Em Bosses Épicos de Arena (Wave 5, 70, 135...), utiliza a Barra do HUD Superior, escudo defensivo branco/ciano, padrões balísticos de alta velocidade e concede 1 Relíquia de Arena Exclusiva ao ser derrotado.'
  }
];

export interface RarityInfo {
  index: number;
  name: string;
  namePt: string;
  color: string;
  hex: number;
  multiplier: number;
  flameColor: string;
}

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
 * Direct port of catalog-scene.ts:drawVectorShape (lines 4359-4529)
 * Used to render in-game bestiary enemies, complete with central hostile target reticle core!
 */
export function drawInGameCatalogShape(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  form: CatalogFormData,
  color: string = '#00f0ff',
  isPlayer: boolean = false
) {
  const sides = form.sides;
  const isSpecial = form.isSpecial;
  const specialType = form.specialType;

  const isFlower = isSpecial && specialType === 'flower';
  const isTrefoil = !isSpecial && sides === 9;
  const is4Star = !isSpecial && sides === 10;
  const is5Star = !isSpecial && sides === 11;
  const is6Star = !isSpecial && sides === 12;
  const isQuatrefoil = isSpecial && specialType === 'star';

  // Helper: draw continuous lobed shape (Trefoil, Quatrefoil, Pure Flower)
  // Verbatim from GeometryGenerator.ts: pure outer contour, ZERO internal crossing lines
  const drawContinuousLobedShape = (count: number, distRatio: number, lobeRatio: number) => {
    const dist = r * distRatio;
    const lobeR = r * lobeRatio;
    const alpha = Math.PI / count;

    // Robust geometric intersection of adjacent circle lobes along their common boundary ray
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
    const stepsPerLobe = 20;

    ctx.beginPath();
    for (let i = 0; i < count; i++) {
      const a = (i * 2 * Math.PI) / count - Math.PI / 2;
      const lx = cx + dist * Math.cos(a);
      const ly = cy + dist * Math.sin(a);

      for (let s = 0; s <= stepsPerLobe; s++) {
        const frac = s / stepsPerLobe;
        const phi = -span + 2 * span * frac;
        const px = lx + lobeR * Math.cos(a + phi);
        const py = ly + lobeR * Math.sin(a + phi);
        if (i === 0 && s === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      }
    }
    ctx.closePath();
  };

  // Helper: draw clean polygon with exact side count
  const drawPolygonPath = (numSides: number) => {
    ctx.beginPath();
    // For sides = 4 (Square), offset by Math.PI / 4 so edges are horizontal/vertical (normal upright square, NOT a diamond/losango)
    const offset = numSides === 4 ? Math.PI / 4 : -Math.PI / 2;
    for (let i = 0; i < numSides; i++) {
      const angle = (i * 2 * Math.PI) / numSides + offset;
      const px = cx + r * Math.cos(angle);
      const py = cy + r * Math.sin(angle);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
  };

  // Helper: draw sharp star with N points
  const drawStarPath = (pts: number, innerRatio: number) => {
    ctx.beginPath();
    for (let i = 0; i < pts * 2; i++) {
      const angle = (i * Math.PI) / pts - Math.PI / 2;
      const rad = i % 2 === 0 ? r : r * innerRatio;
      const px = cx + rad * Math.cos(angle);
      const py = cy + rad * Math.sin(angle);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
  };

  const executeShapePath = () => {
    if (isFlower) {
      // 12 smooth shallow scallops on perimeter (Image 2) with ZERO internal crossing lines (Image 1 strictly forbidden)
      drawContinuousLobedShape(12, 0.74, 0.28);
    } else if (isTrefoil) {
      drawContinuousLobedShape(3, 0.44, 0.50);
    } else if (isQuatrefoil) {
      drawContinuousLobedShape(4, 0.50, 0.44);
    } else if (is4Star) {
      drawStarPath(4, 0.38);
    } else if (is5Star) {
      drawStarPath(5, 0.44);
    } else if (is6Star) {
      drawStarPath(6, 0.52);
    } else {
      drawPolygonPath(sides);
    }
  };

  // 1. Subtle Outer Glow
  ctx.strokeStyle = `${color}40`;
  ctx.lineWidth = 4.0;
  executeShapePath();
  ctx.stroke();

  // 2. Crisp Solid Hull Fill (Dark Navy high-contrast)
  ctx.fillStyle = '#060614';
  executeShapePath();
  ctx.fill();

  // 3. Crisp Core Outline (thickness = 2.0px)
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.0;
  executeShapePath();
  ctx.stroke();

  // 4. Internal Bevel Facet Lines (only for regular polygons 3 to 8, as in catalog-scene.ts lines 4494-4499)
  if (!isPlayer && !isFlower && !isTrefoil && !isQuatrefoil && !is4Star && !is5Star && !is6Star) {
    ctx.strokeStyle = `${color}40`;
    ctx.lineWidth = 1.0;
    const offset = sides === 4 ? Math.PI / 4 : -Math.PI / 2;
    for (let i = 0; i < sides; i++) {
      const angle = (i * 2 * Math.PI) / sides + offset;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
      ctx.stroke();
    }
  }

  // 5. Central Hostile Target Reticle Core (for Enemies/Bestiary, exactly as catalog-scene.ts lines 4512-4529)
  if (!isPlayer) {
    const coreR = r * 0.32;

    // Dark circle base
    ctx.fillStyle = '#06060c';
    ctx.beginPath();
    ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
    ctx.fill();

    // Reticle cyan circle
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
    ctx.stroke();

    // Pupil
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(cx, cy, coreR * 0.45, 0, Math.PI * 2);
    ctx.fill();

    // Pure white center dot
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(cx, cy, coreR * 0.22, 0, Math.PI * 2);
    ctx.fill();

    // 4 Crosshair lines extending across the circle
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(cx - coreR * 1.35, cy);
    ctx.lineTo(cx - coreR * 0.45, cy);
    ctx.moveTo(cx + coreR * 0.45, cy);
    ctx.lineTo(cx + coreR * 1.35, cy);
    ctx.moveTo(cx, cy - coreR * 1.35);
    ctx.lineTo(cx, cy - coreR * 0.45);
    ctx.moveTo(cx, cy + coreR * 0.45);
    ctx.lineTo(cx, cy + coreR * 1.35);
    ctx.stroke();
  }
}

// Export alias for compatibility
export const FORMS_DATA = CATALOG_FORMS;

/**
 * 1. PLAYER RENDERER (Clean Hull + Stern Plasma Flame, ZERO internal lines)
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

  ctx.fillStyle = '#060312';
  ctx.fillRect(0, 0, width, height);

  const cx = width / 2;
  const cy = height / 2;
  const s = Math.min(width, height) / 100;
  const form = CATALOG_FORMS[formIdx - 1] || CATALOG_FORMS[0]!;
  const rarity = RARITIES_DATA[rarityIdx - 1] || RARITIES_DATA[0]!;
  const radius = 32 * s;

  // Stern Plasma Flame
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

  // Draw pure player shape (isPlayer = true -> no reticle, clean contour)
  drawInGameCatalogShape(ctx, cx, cy, radius, form, rarity.color, true);

  ctx.restore();
}

/**
 * 2. ENEMY RENDERER (Copied 100% from in-game catalog-scene.ts)
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

  // Background matching in-game card
  ctx.fillStyle = '#060312';
  ctx.fillRect(0, 0, width, height);

  const cx = width / 2;
  const cy = height / 2;
  const s = Math.min(width, height) / 100;
  const form = CATALOG_FORMS[formIdx - 1] || CATALOG_FORMS[0]!;
  const rarity = RARITIES_DATA[rarityIdx - 1] || RARITIES_DATA[0]!;
  const radius = 34 * s;

  // Draw enemy shape with target reticle core (fixed, no spinning)
  drawInGameCatalogShape(ctx, cx, cy, radius, form, rarity.color, false);

  ctx.restore();
}

/**
 * 3. WAVE BOSS RENDERER
 * Exact game rule: The wave boss is identical to enemies, but larger and with boss stats!
 * Overhead in-game boss health bar + 10s enrage countdown bar.
 */
export function renderStudioWaveBoss(
  ctx: CanvasRenderingContext2D,
  formIdx: number,
  rarityIdx: number,
  width: number,
  height: number,
  _time: number
) {
  ctx.save();
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = '#06010a';
  ctx.fillRect(0, 0, width, height);

  const cx = width / 2;
  const cy = height / 2;
  const s = Math.min(width, height) / 100;
  const form = CATALOG_FORMS[formIdx - 1] || CATALOG_FORMS[0]!;
  const rarity = RARITIES_DATA[rarityIdx - 1] || RARITIES_DATA[0]!;
  
  // Wave boss is identical to the enemy shape, but 35% larger (46*s vs 34*s)
  const radius = 46 * s;

  // Draw identical in-game enemy shape with central hostile reticle, fixed orientation
  drawInGameCatalogShape(ctx, cx, cy, radius, form, rarity.color, false);

  // In-Game Overhead Boss Health Bar & 10s Enrage Timer
  const barW = 100 * s;
  const barH = 5 * s;
  const barY = cy - radius - 14 * s;

  // Health Bar Frame & Dark Base
  ctx.fillStyle = '#070714';
  ctx.fillRect(cx - barW / 2, barY, barW, barH);
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1.2;
  ctx.strokeRect(cx - barW / 2, barY, barW, barH);

  // Boss HP Fill (Red/Magenta)
  ctx.fillStyle = '#ff0055';
  ctx.fillRect(cx - barW / 2 + 1, barY + 1, barW * 0.85, barH - 2);

  // Cyan Shield Bar Overlay
  ctx.fillStyle = '#00f0ff';
  ctx.fillRect(cx - barW / 2 + 1, barY + 1, barW * 0.42, barH - 2);

  // 10s Enrage Timer Progress Bar
  const enrageY = barY - 7 * s;
  const enrageProgress = 0.72;
  ctx.fillStyle = '#ffaa00';
  ctx.fillRect(cx - barW / 2, enrageY, barW * enrageProgress, 3 * s);
  ctx.strokeStyle = '#ffaa00';
  ctx.lineWidth = 0.8;
  ctx.strokeRect(cx - barW / 2, enrageY, barW, 3 * s);

  ctx.restore();
}

/**
 * 4. ARENA BOSS RENDERER (Clean in-game accurate render)
 * - Base geometric shape (Triangle, Square, etc.)
 * - Concentric arena circles: Outer yellow ring + Inner red ring
 * - Central hostile ocular core (red circle + white center + 4 crosshairs)
 * - No fake dots, no lasers, no extra cyan circles
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

  ctx.fillStyle = '#05020c';
  ctx.fillRect(0, 0, width, height);

  const cx = width / 2;
  const cy = height / 2;
  const s = Math.min(width, height) / 100;
  const boss = ARENA_BOSSES_DATA[bossIdx - 1] || ARENA_BOSSES_DATA[0]!;
  const rarity = RARITIES_DATA[rarityIdx - 1] || RARITIES_DATA[0]!;
  const radius = 38 * s;

  // 1. Base Geometric Shape
  const matchedForm = CATALOG_FORMS.find(f => f.sides === boss.sides) || CATALOG_FORMS[0]!;
  drawInGameCatalogShape(ctx, cx, cy, radius * 1.05, matchedForm, rarity.color, false);

  // 2. Concentric Circular Arena Rings
  const ringR = radius * 0.95;

  // Outer Yellow Circle Ring
  ctx.strokeStyle = '#ffd700';
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.arc(cx, cy, ringR * 1.15, 0, Math.PI * 2);
  ctx.stroke();

  // Inner Red/Orange Concentric Circle
  ctx.strokeStyle = '#ff0055';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.arc(cx, cy, ringR * 0.65, 0, Math.PI * 2);
  ctx.stroke();

  // 3. Central Hostile Ocular Core
  const coreR = ringR * 0.42;

  // Red circle fill
  ctx.fillStyle = '#c8003a';
  ctx.beginPath();
  ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#ffd700';
  ctx.lineWidth = 1.4;
  ctx.stroke();

  // Pure white center dot
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(cx, cy, coreR * 0.45, 0, Math.PI * 2);
  ctx.fill();

  // 4 White Crosshair Lines extending outward through the rings
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(cx - ringR * 1.15, cy);
  ctx.lineTo(cx - coreR * 0.45, cy);
  ctx.moveTo(cx + coreR * 0.45, cy);
  ctx.lineTo(cx + ringR * 1.15, cy);
  ctx.moveTo(cx, cy - ringR * 1.15);
  ctx.lineTo(cx, cy - coreR * 0.45);
  ctx.moveTo(cx, cy + coreR * 0.45);
  ctx.lineTo(cx, cy + ringR * 1.15);
  ctx.stroke();

  ctx.restore();
}

/**
 * 5. DRONES
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
/**
 * 6. PROCEDURAL WEAPON PROJECTILES / CLASS AMMUNITIONS
 * Verbatim from in-game RenderSystem.ts and codex_biblioteca_16_9.html:drawProceduralProjectileFromCode
 */
export function drawProceduralProjectile(
  ctx: CanvasRenderingContext2D,
  id: string,
  cx: number,
  cy: number,
  scale: number = 4.0
) {
  ctx.save();
  const s = scale;

  switch (id) {
    case 'rocket_missile':
    case 'fighter': {
      // 1. Fighter: Rocket Missile (Bazooka)
      ctx.fillStyle = '#ffaa00';
      ctx.beginPath();
      ctx.moveTo(cx - 10 * s, cy - 2.5 * s);
      ctx.lineTo(cx - 22 * s, cy);
      ctx.lineTo(cx - 10 * s, cy + 2.5 * s);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#ff2200';
      ctx.strokeStyle = '#ffaa00';
      ctx.lineWidth = 1.2 * (s / 4);
      ctx.beginPath();
      ctx.moveTo(cx - 6 * s, cy - 2.5 * s);
      ctx.lineTo(cx - 11 * s, cy - 6.5 * s);
      ctx.lineTo(cx - 8 * s, cy - 2.5 * s);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx - 6 * s, cy + 2.5 * s);
      ctx.lineTo(cx - 11 * s, cy + 6.5 * s);
      ctx.lineTo(cx - 8 * s, cy + 2.5 * s);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx - 10 * s, cy - 2.8 * s);
      ctx.lineTo(cx + 2 * s, cy - 2.8 * s);
      ctx.quadraticCurveTo(cx + 8 * s, cy - 2.5 * s, cx + 14 * s, cy);
      ctx.quadraticCurveTo(cx + 8 * s, cy + 2.5 * s, cx + 2 * s, cy + 2.8 * s);
      ctx.lineTo(cx - 10 * s, cy + 2.8 * s);
      ctx.closePath();
      ctx.fillStyle = '#1c0707';
      ctx.fill();
      ctx.strokeStyle = '#ff3300';
      ctx.lineWidth = 1.5 * (s / 4);
      ctx.stroke();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.0 * (s / 4);
      ctx.beginPath();
      ctx.moveTo(cx - 7 * s, cy);
      ctx.lineTo(cx + 11 * s, cy);
      ctx.stroke();
      break;
    }
    case 'phase_flechette':
    case 'rogue': {
      // 2. Rogue: Phase Flechette (Daggers)
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.45)';
      ctx.lineWidth = 1.2 * (s / 4);
      ctx.beginPath();
      for (let x = -20; x <= -6; x += 1) {
        const y = Math.sin(x * 0.3) * 4 * s;
        if (x === -20) ctx.moveTo(cx + x * s, cy + y);
        else ctx.lineTo(cx + x * s, cy + y);
      }
      ctx.stroke();

      ctx.fillStyle = '#031a24';
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 1.5 * (s / 4);
      ctx.beginPath();
      ctx.moveTo(cx + 12 * s, cy);
      ctx.lineTo(cx, cy - 4.5 * s);
      ctx.lineTo(cx - 8 * s, cy - 2 * s);
      ctx.lineTo(cx - 4 * s, cy);
      ctx.lineTo(cx - 8 * s, cy + 2 * s);
      ctx.lineTo(cx, cy + 4.5 * s);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      break;
    }
    case 'plasma_vortex':
    case 'mage': {
      // 3. Mage: Plasma Vortex (Fireball)
      ctx.strokeStyle = '#ff6600';
      ctx.lineWidth = 2.0 * (s / 4);
      ctx.beginPath();
      ctx.arc(cx, cy, 7 * s, 0, Math.PI * 2);
      ctx.stroke();

      for (let i = 0; i < 3; i++) {
        const rot = (i * Math.PI * 2) / 3;
        ctx.strokeStyle = i === 0 ? '#ffffff' : '#ff0055';
        ctx.lineWidth = 1.5 * (s / 4);
        ctx.beginPath();
        ctx.arc(cx, cy, 5 * s, rot, rot + 1.2);
        ctx.stroke();
      }
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx, cy, 2.5 * s, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case 'kinetic_dart':
    case 'ranger': {
      // 4. Ranger: Kinetic Dart (Bow)
      ctx.fillStyle = '#1c1404';
      ctx.strokeStyle = '#ffcc00';
      ctx.lineWidth = 1.2 * (s / 4);
      ctx.beginPath();
      ctx.moveTo(cx - 10 * s, cy - 1.5 * s);
      ctx.lineTo(cx + 8 * s, cy - 1.5 * s);
      ctx.lineTo(cx + 14 * s, cy);
      ctx.lineTo(cx + 8 * s, cy + 1.5 * s);
      ctx.lineTo(cx - 10 * s, cy + 1.5 * s);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.0 * (s / 4);
      ctx.beginPath();
      ctx.moveTo(cx - 9 * s, cy);
      ctx.lineTo(cx + 13 * s, cy);
      ctx.stroke();
      break;
    }
    case 'photon_lance':
    case 'paladin': {
      // 5. Paladin: Photon Lance (Holy Beam)
      ctx.strokeStyle = 'rgba(255, 215, 0, 0.4)';
      ctx.lineWidth = 4.0 * (s / 4);
      ctx.beginPath();
      ctx.moveTo(cx - 16 * s, cy);
      ctx.lineTo(cx + 16 * s, cy);
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#ffd700';
      ctx.lineWidth = 1.5 * (s / 4);
      ctx.beginPath();
      ctx.moveTo(cx + 18 * s, cy);
      ctx.lineTo(cx + 12 * s, cy - 3.5 * s);
      ctx.lineTo(cx + 6 * s, cy);
      ctx.lineTo(cx + 12 * s, cy + 3.5 * s);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.8 * (s / 4);
      ctx.beginPath();
      ctx.moveTo(cx - 16 * s, cy);
      ctx.lineTo(cx + 17 * s, cy);
      ctx.stroke();
      break;
    }
    case 'sonic_shockwave':
    case 'bard': {
      // 6. Bard: Sonic Shockwave (Harmonic Pulse)
      for (let i = 1; i <= 3; i++) {
        ctx.strokeStyle = '#d946ef';
        ctx.lineWidth = 2.0 * (s / 4);
        ctx.beginPath();
        ctx.arc(cx - 2 * s, cy, i * 4 * s, -Math.PI * 0.55, Math.PI * 0.55);
        ctx.stroke();
      }
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#ff00ff';
      ctx.lineWidth = 1.5 * (s / 4);
      ctx.beginPath();
      ctx.arc(cx + 4 * s, cy, 3 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      break;
    }
    case 'cryo_needle': {
      ctx.fillStyle = '#062030';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.4 * (s / 4);
      ctx.beginPath();
      ctx.moveTo(cx + 10 * s, cy);
      ctx.lineTo(cx + 3 * s, cy - 3.5 * s);
      ctx.lineTo(cx - 7 * s, cy - 2.5 * s);
      ctx.lineTo(cx - 10 * s, cy);
      ctx.lineTo(cx - 7 * s, cy + 2.5 * s);
      ctx.lineTo(cx + 3 * s, cy + 3.5 * s);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.0 * (s / 4);
      ctx.beginPath();
      ctx.moveTo(cx - 8 * s, cy);
      ctx.lineTo(cx + 8 * s, cy);
      ctx.stroke();
      break;
    }
    case 'quantum_chakram': {
      ctx.fillStyle = '#170624';
      ctx.strokeStyle = '#c084fc';
      ctx.lineWidth = 1.5 * (s / 4);
      ctx.beginPath();
      for (let i = 0; i < 3; i++) {
        const ang = (i * Math.PI * 2) / 3;
        const x1 = Math.cos(ang) * 9 * s;
        const y1 = Math.sin(ang) * 9 * s;
        const x2 = Math.cos(ang + 0.6) * 4 * s;
        const y2 = Math.sin(ang + 0.6) * 4 * s;
        if (i === 0) ctx.moveTo(cx + x1, cy + y1);
        else {
          ctx.lineTo(cx + x1, cy + y1);
          ctx.lineTo(cx + x2, cy + y2);
        }
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#030308';
      ctx.beginPath();
      ctx.arc(cx, cy, 2.5 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();
      break;
    }
    case 'proximity_mine': {
      ctx.fillStyle = '#031f13';
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 1.5 * (s / 4);
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const ang = (i * Math.PI) / 4;
        const x = Math.cos(ang) * 8 * s;
        const y = Math.sin(ang) * 8 * s;
        if (i === 0) ctx.moveTo(cx + x, cy + y);
        else ctx.lineTo(cx + x, cy + y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#ff0055';
      ctx.beginPath();
      ctx.arc(cx, cy, 2.5 * s, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case 'tesla_spark': {
      ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
      ctx.beginPath();
      ctx.arc(cx, cy, 8 * s, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 1.2 * (s / 4);
      for (let i = 0; i < 4; i++) {
        const ang = (i * Math.PI) / 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(ang + 0.3) * 5 * s, cy + Math.sin(ang + 0.3) * 5 * s);
        ctx.lineTo(cx + Math.cos(ang) * 11 * s, cy + Math.sin(ang) * 11 * s);
        ctx.stroke();
      }
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx, cy, 3 * s, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    default: {
      ctx.fillStyle = '#ff3b30';
      ctx.beginPath();
      ctx.arc(cx, cy, 8 * s, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.restore();
}

export function renderStudioClassMunition(
  ctx: CanvasRenderingContext2D,
  classId: string,
  width: number,
  height: number,
  _time: number
) {
  ctx.save();
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = '#05020c';
  ctx.fillRect(0, 0, width, height);

  const cx = width / 2;
  const cy = height / 2;
  const s = Math.min(width, height) / 38;

  drawProceduralProjectile(ctx, classId, cx, cy, s);

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
    // Exact In-Game Aura Environment (Image 4: Aura de Gelo)
    const platY = cy + 18 * s;
    const playerY = cy - 2 * s;

    // 1. Metal Platform Floor with Diagonal Cyan Hazard Striping
    ctx.fillStyle = '#071520';
    ctx.fillRect(0, platY, width, height - platY);
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.moveTo(0, platY);
    ctx.lineTo(width, platY);
    ctx.stroke();

    // Diagonal hazard stripes on the platform edge
    ctx.strokeStyle = '#00f0ffaa';
    ctx.lineWidth = 2.5;
    for (let hx = -width; hx < width * 2; hx += 16 * s) {
      ctx.beginPath();
      ctx.moveTo(hx, platY + 12 * s);
      ctx.lineTo(hx + 10 * s, platY);
      ctx.stroke();
    }

    // 2. Concentric Cyan Dial Rings (Compass/Gauge style)
    const auraRadius = 26 * s;

    // Outer notched ring
    ctx.strokeStyle = '#00f0ffcc';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.arc(cx, playerY, auraRadius, 0, Math.PI * 2);
    ctx.stroke();

    // Dial gauge notches
    ctx.strokeStyle = '#00f0ff88';
    ctx.lineWidth = 1.2;
    for (let t = 0; t < 36; t++) {
      const ta = (t * 2 * Math.PI) / 36;
      const tLen = t % 4 === 0 ? 4.5 * s : 2.5 * s;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(ta) * (auraRadius - tLen), playerY + Math.sin(ta) * (auraRadius - tLen));
      ctx.lineTo(cx + Math.cos(ta) * auraRadius, playerY + Math.sin(ta) * auraRadius);
      ctx.stroke();
    }

    // Inner ring
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.arc(cx, playerY, auraRadius * 0.78, 0, Math.PI * 2);
    ctx.stroke();

    // 3. 8 Rotating White Snowflakes along the ring
    for (let f = 0; f < 8; f++) {
      const fa = (f * Math.PI) / 4 + time * 0.25;
      const fx = cx + Math.cos(fa) * (auraRadius * 0.88);
      const fy = playerY + Math.sin(fa) * (auraRadius * 0.88);
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${Math.max(10, 4.5 * s)}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('❄', fx, fy);
    }

    // 4. Center Player Ship (Forma 12 - Flower with 12 scallops, face, and flame)
    const shipR = 12 * s;
    // Plasma thruster flame
    const flameH = (7 + Math.sin(time * 16) * 2) * s;
    ctx.fillStyle = '#ff0077';
    ctx.beginPath();
    ctx.moveTo(cx - 3 * s, playerY + shipR * 0.7);
    ctx.lineTo(cx, playerY + shipR * 0.7 + flameH);
    ctx.lineTo(cx + 3 * s, playerY + shipR * 0.7);
    ctx.closePath();
    ctx.fill();

    // 12-scallop flower contour
    ctx.strokeStyle = '#ff0055';
    ctx.lineWidth = 2.2;
    ctx.fillStyle = '#1c0515';
    drawInGameCatalogShape(ctx, cx, playerY, shipR, CATALOG_FORMS[11]!, '#ff0055', true);

    // Face expression inside player
    const fs = s * 0.35;
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(cx - 6 * fs, playerY - 3 * fs, 3 * fs, 5 * fs);
    ctx.fillRect(cx + 3 * fs, playerY - 3 * fs, 3 * fs, 5 * fs);
    ctx.fillRect(cx - 4 * fs, playerY + 4 * fs, 8 * fs, 2 * fs);

    // 5. 4 Orbiting Secondary Drones (Image 4)
    const droneAngles = [time * 1.2, time * 1.2 + Math.PI / 2, time * 1.2 + Math.PI, time * 1.2 + Math.PI * 1.5];
    const droneDist = auraRadius * 0.65;
    const droneColors = ['#10b981', '#f97316', '#00f0ff', '#38bdf8'];
    for (let d = 0; d < 4; d++) {
      const da = droneAngles[d]!;
      const dx = cx + Math.cos(da) * droneDist;
      const dy = playerY + Math.sin(da) * droneDist;
      ctx.fillStyle = droneColors[d]!;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.rect(dx - 2.5 * s, dy - 2.5 * s, 5 * s, 5 * s);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(dx, dy, 1.2 * s, 0, Math.PI * 2);
      ctx.fill();
    }

    // 6. Floating In-Game HUD Heal Indicator (Image 4: "+1 HP")
    ctx.fillStyle = '#00ff44';
    ctx.font = `extrabold ${Math.max(12, 4.0 * s)}px 'Orbitron', sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText('+1 HP', cx, playerY - shipR - 5 * s);

    // HUD Drops below platform (Image 4)
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${Math.max(9, 2.5 * s)}px 'JetBrains Mono', monospace`;
    ctx.fillText('⚪ x13   🔴 x8   🟡 x0', cx, platY + 22 * s);
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

/**
 * 7. CYBER HUD EXPRESSIONS (Directly from CyberHUDExpressions.ts)
 */
export interface CyberExpression {
  id: string;
  nameEn: string;
  namePt: string;
  descPt: string;
  synergyPt: string;
  color: string;
  lore: string;
}

export const CYBER_EXPRESSIONS: CyberExpression[] = [
  {
    id: 'Happy',
    nameEn: 'HAPPY',
    namePt: 'FELIZ',
    descPt: '+25% XP & +20% Créditos',
    synergyPt: 'Evolução Acelerada',
    color: '#00f0ff',
    lore: "A matriz neuro-computacional 'FELIZ' modula a resposta tática dos geradores do chassi, convertendo telemetria afetiva em amplificação direta de combate e foco de miras."
  },
  {
    id: 'Excited',
    nameEn: 'EXCITED',
    namePt: 'EMOCIONADO',
    descPt: '+20% Cadência & +10% Crit Chance',
    synergyPt: 'Artilheiro / Disparo Contínuo',
    color: '#ffd700',
    lore: 'Sobrecarga de resposta adrenérgica quântica que eleva a cadência balística dos canhões e estabiliza a dispersão de tiros.'
  },
  {
    id: 'Joyful',
    nameEn: 'JOYFUL',
    namePt: 'ALEGRE',
    descPt: '+35% EN Regen & -10% Custo EN',
    synergyPt: 'Disruptor Tático / Spammer',
    color: '#00ffaa',
    lore: 'Sintonia harmônica com geradores de energia quântica, permitindo fluxo contínuo de ativações modulares com menor dissipação.'
  },
  {
    id: 'Angry',
    nameEn: 'ANGRY',
    namePt: 'IRADO',
    descPt: '+25% Dano (HP < 50%) & +2% Sifão de Estrutura',
    synergyPt: 'Vanguarda Berserker',
    color: '#ff0055',
    lore: 'Protocolo de emergência com agressividade reativa que canaliza estresse estrutural em impacto destrutivo massivo.'
  },
  {
    id: 'Stern',
    nameEn: 'STERN',
    namePt: 'SEVERO',
    descPt: '+3 em Todos os Sistemas Globais',
    synergyPt: 'Build Híbrida Equilibrada',
    color: '#38bdf8',
    lore: 'Foco absoluto e calibração estrita que amplificam uniformemente os 6 atributos nucleares do operador.'
  },
  {
    id: 'Surprised',
    nameEn: 'SURPRISED',
    namePt: 'SURPRESO',
    descPt: '-20% Cooldown Módulos & +20% Ativação',
    synergyPt: 'Burst de Sistemas Quânticos',
    color: '#00f0ff',
    lore: 'Tempo de resposta reflexo hiperacelerado que antecipa o ciclo de ignição dos barramentos táticos.'
  },
  {
    id: 'Defeated',
    nameEn: 'DEFEATED',
    namePt: 'DERROTADO',
    descPt: '+20% Estrutura Máx & +15% Blindagem Reativa',
    synergyPt: 'Baluarte Aegis de Contato',
    color: '#ef4444',
    lore: 'Blindagem reativa de condensação extrema projetada para resistir aos impactos mais devastadores em momentos críticos.'
  },
  {
    id: 'Crying',
    nameEn: 'CRYING',
    namePt: 'CHORANDO',
    descPt: '+3.0 Estrutura/s Regen & +10% Defesa Escudo',
    synergyPt: 'Regeneração de Estrutura & Escudo',
    color: '#38bdf8',
    lore: 'Cascata contínua de nanites regenerativos que reconstroem placas avariadas enquanto reforçam o envelope de escudo.'
  },
  {
    id: 'Bored',
    nameEn: 'BORED',
    namePt: 'TEDIADO',
    descPt: '+12% Evasão & -30% Cooldown Troca Pista',
    synergyPt: 'Evasão & Alta Mobilidade',
    color: '#94a3b8',
    lore: 'Manobras defensivas automatizadas de ultra-baixa latência permitindo trocas bruscas de rota no campo de batalha.'
  },
  {
    id: 'Static',
    nameEn: 'STATIC',
    namePt: 'ESTÁTICO',
    descPt: '+25% Vel. Projétil & +1 Perfuração',
    synergyPt: 'Balística Hipersônica',
    color: '#e879f9',
    lore: 'Campos magnéticos colimados que aceleram projéteis a velocidades hipersônicas conferindo penetração direta de blindagens.'
  },
  {
    id: 'Thirsty',
    nameEn: 'THIRSTY',
    namePt: 'SEDENTO',
    descPt: '+4% Sifão de Estrutura & +15% Dano DoT',
    synergyPt: 'Vampirismo & Corrosão DoT',
    color: '#f43f5e',
    lore: 'Drenagem ativa de plasma residual que converte danos contínuos infligidos em recomposição molecular do casco.'
  },
  {
    id: 'Devoted',
    nameEn: 'DEVOTED',
    namePt: 'DEVOTO',
    descPt: '+25% Blindagem Reativa & +15% Estrutura Máx',
    synergyPt: 'Fortaleza Inviolável',
    color: '#c084fc',
    lore: 'Fé inabalável em sistemas de defesa passivos que blindam o núcleo contra forças hostis esmagadoras.'
  },
  {
    id: 'Charmed',
    nameEn: 'CHARMED',
    namePt: 'ENCANTADO',
    descPt: '+25% Dano de Sistemas & +20 EN/s Regen',
    synergyPt: 'Amplificador Arcano Quântico',
    color: '#38bdf8',
    lore: 'Ressonância cristalina que energiza módulos táteis e mantém reservas de energia quântica permanentemente repletas.'
  },
  {
    id: 'Cunning',
    nameEn: 'CUNNING',
    namePt: 'ASTUTO',
    descPt: '+15% Crit Chance & +30% Dano Crítico',
    synergyPt: 'Interceptor de Precisão',
    color: '#a855f7',
    lore: 'Algoritmos preditivos de mira que identificam fraquezas microscópicas na geometria das defesas inimigas.'
  },
  {
    id: 'Relentless',
    nameEn: 'RELENTLESS',
    namePt: 'IMPLACÁVEL',
    descPt: '+25% Área Armas & +15% Dano Cinético',
    synergyPt: 'Artilharia Quântica Pesada',
    color: '#f97316',
    lore: 'Ondas de concussão expandidas que ampliam a zona de aniquilação das ogivas balísticas pesadas.'
  },
  {
    id: 'Furious',
    nameEn: 'FURIOUS',
    namePt: 'FURIOSO',
    descPt: '+30% Dano Crítico & +15% Cadência',
    synergyPt: 'Ataque Frenético Rápido',
    color: '#ff0000',
    lore: 'Disparo frenético ininterrupto com dissipação forçada de calor térmico nos canhões primários.'
  },
  {
    id: 'Serene',
    nameEn: 'SERENE',
    namePt: 'SERENO',
    descPt: '+15% Escudo & +2.0 Estrutura/s Regen',
    synergyPt: 'Tanque Inabalável',
    color: '#22d3ee',
    lore: 'Calma computacional imperturbável que reduz flutuações no campo de força e regenera integridade em ritmo estável.'
  },
  {
    id: 'Obsessed',
    nameEn: 'OBSESSED',
    namePt: 'OBSESSIVO',
    descPt: '+100% Alcance Ímã & +25% XP',
    synergyPt: 'Farme Magnético Acelerado',
    color: '#eab308',
    lore: 'Potencializador gravitacional de coleta que atrai fragmentos e orbes de evolução de todo o setor circundante.'
  },
  {
    id: 'Melancholic',
    nameEn: 'MELANCHOLIC',
    namePt: 'MELANCÓLICO',
    descPt: '+20% Debuff Resist & -20% Dano Eventos',
    synergyPt: 'Proteção Anticatástrofe',
    color: '#60a5fa',
    lore: 'Resiliência estóica que isola os circuitos vitais contra desacelerações, corrosão e catástrofes de ambiente.'
  },
  {
    id: 'Euphoric',
    nameEn: 'EUPHORIC',
    namePt: 'EUFÓRICO',
    descPt: '+20% Ativação & +20% Dano de Sistemas',
    synergyPt: 'Explosão Quântica Eufórica',
    color: '#ffd700',
    lore: 'Estado de pico de fluxo energético onde cada módulo tático dispara com velocidade e força extraordinárias.'
  }
];

export function renderStudioExpression(
  ctx: CanvasRenderingContext2D,
  expressionId: string,
  width: number,
  height: number,
  _time: number
) {
  ctx.save();
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = '#05020c';
  ctx.fillRect(0, 0, width, height);

  const cx = width / 2;
  const cy = height / 2;
  const s = Math.min(width, height) / 36;
  const expr = CYBER_EXPRESSIONS.find(e => e.id === expressionId) || CYBER_EXPRESSIONS[0]!;
  const color = expr.color;

  // Outer HUD Frame matching Image 2 "MATRIZ SENSORIAL HUD"
  const boxW = 28 * s;
  const boxH = 20 * s;
  ctx.strokeStyle = '#00f0ff88';
  ctx.lineWidth = 1.6;
  ctx.strokeRect(cx - boxW / 2, cy - boxH / 2, boxW, boxH);

  // Corner Accents
  ctx.strokeStyle = '#00f0ff';
  ctx.lineWidth = 3.0;
  const cSize = 2.5 * s;
  // Top Left
  ctx.beginPath();
  ctx.moveTo(cx - boxW / 2, cy - boxH / 2 + cSize);
  ctx.lineTo(cx - boxW / 2, cy - boxH / 2);
  ctx.lineTo(cx - boxW / 2 + cSize, cy - boxH / 2);
  ctx.stroke();
  // Top Right
  ctx.beginPath();
  ctx.moveTo(cx + boxW / 2 - cSize, cy - boxH / 2);
  ctx.lineTo(cx + boxW / 2, cy - boxH / 2);
  ctx.lineTo(cx + boxW / 2, cy - boxH / 2 + cSize);
  ctx.stroke();
  // Bottom Left
  ctx.beginPath();
  ctx.moveTo(cx - boxW / 2, cy + boxH / 2 - cSize);
  ctx.lineTo(cx - boxW / 2, cy + boxH / 2);
  ctx.lineTo(cx - boxW / 2 + cSize, cy + boxH / 2);
  ctx.stroke();
  // Bottom Right
  ctx.beginPath();
  ctx.moveTo(cx + boxW / 2 - cSize, cy + boxH / 2);
  ctx.lineTo(cx + boxW / 2, cy + boxH / 2);
  ctx.lineTo(cx + boxW / 2, cy + boxH / 2 - cSize);
  ctx.stroke();

  // HUD Title at bottom
  ctx.fillStyle = '#00f0ff';
  ctx.font = `bold ${Math.max(10, 1.3 * s)}px 'Orbitron', monospace`;
  ctx.textAlign = 'center';
  ctx.fillText('MATRIZ SENSORIAL HUD', cx, cy + boxH / 2 - 1.2 * s);

  // Draw Facial Vector Optics (scaled up cleanly)
  const faceScale = s * 0.9;
  const fx = cx;
  const fy = cy - 1.5 * s;

  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 2.5 * (faceScale / s);

  if (expr.id === 'Happy') {
    ctx.beginPath();
    ctx.moveTo(fx - 9 * faceScale, fy - 4 * faceScale);
    ctx.lineTo(fx - 5 * faceScale, fy - 7 * faceScale);
    ctx.lineTo(fx - 2 * faceScale, fy - 4 * faceScale);
    ctx.moveTo(fx + 2 * faceScale, fy - 4 * faceScale);
    ctx.lineTo(fx + 5 * faceScale, fy - 7 * faceScale);
    ctx.lineTo(fx + 9 * faceScale, fy - 4 * faceScale);
    ctx.moveTo(fx - 5 * faceScale, fy + 4 * faceScale);
    ctx.lineTo(fx, fy + 7 * faceScale);
    ctx.lineTo(fx + 5 * faceScale, fy + 4 * faceScale);
    ctx.stroke();
  } else if (expr.id === 'Excited') {
    ctx.strokeRect(fx - 9 * faceScale, fy - 7 * faceScale, 6 * faceScale, 5 * faceScale);
    ctx.strokeRect(fx + 3 * faceScale, fy - 7 * faceScale, 6 * faceScale, 5 * faceScale);
    ctx.beginPath();
    ctx.moveTo(fx - 5 * faceScale, fy + 3 * faceScale);
    ctx.lineTo(fx + 5 * faceScale, fy + 3 * faceScale);
    ctx.lineTo(fx + 3 * faceScale, fy + 7 * faceScale);
    ctx.lineTo(fx - 3 * faceScale, fy + 7 * faceScale);
    ctx.closePath();
    ctx.stroke();
  } else if (expr.id === 'Joyful') {
    ctx.beginPath();
    ctx.moveTo(fx - 9 * faceScale, fy - 2 * faceScale);
    ctx.lineTo(fx - 5 * faceScale, fy - 7 * faceScale);
    ctx.lineTo(fx - 1 * faceScale, fy - 2 * faceScale);
    ctx.moveTo(fx + 1 * faceScale, fy - 2 * faceScale);
    ctx.lineTo(fx + 5 * faceScale, fy - 7 * faceScale);
    ctx.lineTo(fx + 9 * faceScale, fy - 2 * faceScale);
    ctx.moveTo(fx - 4 * faceScale, fy + 4 * faceScale);
    ctx.lineTo(fx + 4 * faceScale, fy + 4 * faceScale);
    ctx.stroke();
  } else if (expr.id === 'Angry') {
    ctx.beginPath();
    ctx.moveTo(fx - 10 * faceScale, fy - 7 * faceScale);
    ctx.lineTo(fx - 2 * faceScale, fy - 3 * faceScale);
    ctx.moveTo(fx + 10 * faceScale, fy - 7 * faceScale);
    ctx.lineTo(fx + 2 * faceScale, fy - 3 * faceScale);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(fx - 5 * faceScale, fy + 5 * faceScale);
    ctx.lineTo(fx - 2 * faceScale, fy + 3 * faceScale);
    ctx.lineTo(fx + 2 * faceScale, fy + 5 * faceScale);
    ctx.lineTo(fx + 5 * faceScale, fy + 3 * faceScale);
    ctx.stroke();
  } else if (expr.id === 'Stern') {
    ctx.beginPath();
    ctx.moveTo(fx - 10 * faceScale, fy - 6 * faceScale);
    ctx.lineTo(fx + 10 * faceScale, fy - 6 * faceScale);
    ctx.moveTo(fx - 4 * faceScale, fy + 5 * faceScale);
    ctx.lineTo(fx + 4 * faceScale, fy + 5 * faceScale);
    ctx.stroke();
    ctx.fillRect(fx - 7 * faceScale, fy - 3 * faceScale, 4 * faceScale, 3 * faceScale);
    ctx.fillRect(fx + 3 * faceScale, fy - 3 * faceScale, 4 * faceScale, 3 * faceScale);
  } else if (expr.id === 'Surprised') {
    ctx.strokeRect(fx - 8 * faceScale, fy - 6 * faceScale, 5 * faceScale, 5 * faceScale);
    ctx.strokeRect(fx + 3 * faceScale, fy - 6 * faceScale, 5 * faceScale, 5 * faceScale);
    ctx.strokeRect(fx - 2.5 * faceScale, fy + 3 * faceScale, 5 * faceScale, 4 * faceScale);
  } else if (expr.id === 'Defeated') {
    ctx.beginPath();
    ctx.moveTo(fx - 8 * faceScale, fy - 7 * faceScale);
    ctx.lineTo(fx - 3 * faceScale, fy - 2 * faceScale);
    ctx.moveTo(fx - 3 * faceScale, fy - 7 * faceScale);
    ctx.lineTo(fx - 8 * faceScale, fy - 2 * faceScale);
    ctx.moveTo(fx + 3 * faceScale, fy - 7 * faceScale);
    ctx.lineTo(fx + 8 * faceScale, fy - 2 * faceScale);
    ctx.moveTo(fx + 8 * faceScale, fy - 7 * faceScale);
    ctx.lineTo(fx + 3 * faceScale, fy - 2 * faceScale);
    ctx.moveTo(fx - 4 * faceScale, fy + 5 * faceScale);
    ctx.lineTo(fx, fy + 3 * faceScale);
    ctx.lineTo(fx + 4 * faceScale, fy + 5 * faceScale);
    ctx.stroke();
  } else if (expr.id === 'Crying') {
    ctx.beginPath();
    ctx.moveTo(fx - 9 * faceScale, fy - 5 * faceScale);
    ctx.lineTo(fx - 2 * faceScale, fy - 5 * faceScale);
    ctx.moveTo(fx + 2 * faceScale, fy - 5 * faceScale);
    ctx.lineTo(fx + 9 * faceScale, fy - 5 * faceScale);
    ctx.moveTo(fx - 4 * faceScale, fy + 5 * faceScale);
    ctx.lineTo(fx, fy + 3 * faceScale);
    ctx.lineTo(fx + 4 * faceScale, fy + 5 * faceScale);
    ctx.stroke();
    ctx.strokeStyle = '#38bdf8';
    ctx.beginPath();
    ctx.moveTo(fx - 5.5 * faceScale, fy - 3 * faceScale);
    ctx.lineTo(fx - 5.5 * faceScale, fy + 3 * faceScale);
    ctx.moveTo(fx + 5.5 * faceScale, fy - 3 * faceScale);
    ctx.lineTo(fx + 5.5 * faceScale, fy + 3 * faceScale);
    ctx.stroke();
  } else {
    // Default high-tech optical eyes and neutral smile
    ctx.beginPath();
    ctx.moveTo(fx - 8 * faceScale, fy - 4 * faceScale);
    ctx.lineTo(fx - 2 * faceScale, fy - 4 * faceScale);
    ctx.moveTo(fx + 2 * faceScale, fy - 4 * faceScale);
    ctx.lineTo(fx + 8 * faceScale, fy - 4 * faceScale);
    ctx.moveTo(fx - 4 * faceScale, fy + 4 * faceScale);
    ctx.lineTo(fx + 4 * faceScale, fy + 4 * faceScale);
    ctx.stroke();
  }

  ctx.restore();
}

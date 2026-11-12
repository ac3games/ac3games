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
  playerBonus: string;
  enemyBonus: string;
}

export const RARITIES_DATA: RarityInfo[] = [
  {
    index: 1,
    name: 'Common',
    namePt: 'Comum',
    color: '#ffffff',
    hex: 0xffffff,
    multiplier: 1.0,
    flameColor: '#ff0055',
    playerBonus: 'Multiplicador Base: 1.00x de Dano & Casco. Configuração padrão de fábrica da nave Vector-01.',
    enemyBonus: 'HP Base: 1.00x. Comportamento padrão de onda inicial. Drop: 1 Fragmento de Sucata.'
  },
  {
    index: 2,
    name: 'Enhanced',
    namePt: 'Aprimorado',
    color: '#ff3333',
    hex: 0xff3333,
    multiplier: 1.25,
    flameColor: '#ff5500',
    playerBonus: '+25% Potência de Fogo Primária e +10% Capacidade de Escudo.',
    enemyBonus: 'HP Base: 1.25x (+25% Vida) e +5% Velocidade de Perseguição. Drop: 2 Fragmentos de Energia.'
  },
  {
    index: 3,
    name: 'Refined',
    namePt: 'Refinado',
    color: '#ff8800',
    hex: 0xff8800,
    multiplier: 1.5,
    flameColor: '#ffd700',
    playerBonus: '+50% Dano de Casco, +15% Velocidade de Projéteis e -5% Recarga dos Módulos Táticos.',
    enemyBonus: 'HP Base: 1.50x (+50% Vida). Troca de pistas mais agressiva. Drop: 3 Fragmentos de Energia.'
  },
  {
    index: 4,
    name: 'Advanced',
    namePt: 'Avançado',
    color: '#ffd700',
    hex: 0xffd700,
    multiplier: 1.8,
    flameColor: '#ffff00',
    playerBonus: '+80% Dano Crítico e +20% Resistência a Choques Físicos de Colisão.',
    enemyBonus: 'HP Base: 1.80x (+80% Vida). Dispara rajadas balísticas com +15% cadência. Drop: 4 Fragmentos.'
  },
  {
    index: 5,
    name: 'Elite',
    namePt: 'Elite',
    color: '#00ff66',
    hex: 0x00ff66,
    multiplier: 2.2,
    flameColor: '#00f0ff',
    playerBonus: '+120% Dano Global, +1 Perfuração Natural em Todos os Tiros e +15% Ganho de EXP.',
    enemyBonus: 'HP Base: 2.20x (+120% Vida) e Aura de Aceleração que buffa inimigos vizinhos em +10%. Drop: 6 Fragmentos.'
  },
  {
    index: 6,
    name: 'Rare',
    namePt: 'Raro',
    color: '#0088ff',
    hex: 0x0088ff,
    multiplier: 2.7,
    flameColor: '#00ffff',
    playerBonus: '+170% Multiplicador de Potência, Escudo Regenerativo Reativo e +25% Alcance do Ímã de Coleta.',
    enemyBonus: 'HP Base: 2.70x (+170% Vida). Resistência a dano em área (AoE) e disparos em espiral. Drop: 8 Fragmentos.'
  },
  {
    index: 7,
    name: 'Epic',
    namePt: 'Épico',
    color: '#7a22ff',
    hex: 0x7a22ff,
    multiplier: 3.3,
    flameColor: '#8e2de2',
    playerBonus: '+230% Multiplicador de Dano, Desbloqueio do 2º Slot de Módulo Especial e -15% Cooldown.',
    enemyBonus: 'HP Base: 3.30x (+230% Vida). Ganha Escudo Ciano (Barra Branca) que absorve 40% do dano inicial. Drop: 10 Fragmentos.'
  },
  {
    index: 8,
    name: 'Masterwork',
    namePt: 'Obra-Prima',
    color: '#b533ff',
    hex: 0xb533ff,
    multiplier: 4.0,
    flameColor: '#c77dff',
    playerBonus: '+300% Multiplicador de Combate, +35% Chance de Acerto Crítico e Dano em Área Duplicado.',
    enemyBonus: 'HP Base: 4.00x (+300% Vida). Dispara projéteis teleguiados de perseguição de curto alcance. Drop: 12 Fragmentos.'
  },
  {
    index: 9,
    name: 'Legendary',
    namePt: 'Lendário',
    color: '#ff00ea',
    hex: 0xff00ea,
    multiplier: 5.0,
    flameColor: '#ff007f',
    playerBonus: '+400% Dano Total, Jato de Plasma com Trilha Ionizada Letal e +50% Drop de Créditos & Moedas.',
    enemyBonus: 'HP Base: 5.00x (+400% Vida). Velocidade extrema, imunidade a desaceleração criogênica. Drop: 15 Fragmentos & 1 Orbe Raro.'
  },
  {
    index: 10,
    name: 'Ascendant',
    namePt: 'Ascendente',
    color: '#ff0077',
    hex: 0xff0077,
    multiplier: 6.5,
    flameColor: '#ff00bb',
    playerBonus: '+550% Potência Bélica, Fasagem Invulnerável durante Troca de Pistas e 2.0x Dano Crítico.',
    enemyBonus: 'HP Base: 6.50x (+550% Vida). Emite ondas de pulso sônico periódicas que repelem disparos. Drop: 20 Fragmentos.'
  },
  {
    index: 11,
    name: 'Transcendent',
    namePt: 'Transcendente',
    color: '#00ffff',
    hex: 0x00ffff,
    multiplier: 8.5,
    flameColor: '#ffffff',
    playerBonus: '+750% Multiplicador Quântico, +3 Perfurações em Projéteis e +50% Regeneração Contínua de Casco.',
    enemyBonus: 'HP Base: 8.50x (+750% Vida). Entidade de Elite Suprema. Teleporta horizontalmente ao ser alvejada. Drop: Núcleo de Matéria Escura.'
  },
  {
    index: 12,
    name: 'Mythic',
    namePt: 'Mítico',
    color: '#ff1744',
    hex: 0xff1744,
    multiplier: 12.0,
    flameColor: '#ffd700',
    playerBonus: '+1100% Apoteose Cósmica Máxima, Sobrecarga Quântica Infinita e Escudo Invencível Aegis de Emergência.',
    enemyBonus: 'HP Base: 12.00x (+1100% Vida). Super Titã de Onda. Dispara anéis de plasma de 360°, invoca sub-entidades e entra em Fúria. Drop: 1 Núcleo Cósmico Puro & Baú Mítico Garantido.'
  }
];

export interface ArenaBossData {
  index: number;
  formId: string;
  namePt: string;
  nameEn: string;
  wave: number;
  sides: number;
  color: string;
  secondary: string;
  desc: string;
  mechanics: string;
  relicDrop: string;
}

export const ARENA_BOSSES_DATA: ArenaBossData[] = [
  {
    index: 1,
    formId: 'triangle',
    namePt: 'SENTINELA OCULAR PRISMÁTICA',
    nameEn: 'PRISMATIC OCULAR SENTINEL',
    wave: 5,
    sides: 3,
    color: '#ffd700',
    secondary: '#00f0ff',
    desc: 'Canhão de Varredura Prismática & Feixes Ionizantes',
    mechanics: 'Varre a arena com 3 feixes de laser divergentes e emite pulsos de energia que forçam o jogador a alternar de pistas rapidamente.',
    relicDrop: 'Prisma Ocular da Percepção (+15% Dano Crítico e +10% Alcance de Miras)'
  },
  {
    index: 2,
    formId: 'square',
    namePt: 'TITÃ DE AÇO GRAVITACIONAL',
    nameEn: 'GRAVITATIONAL STEEL TITAN',
    wave: 65,
    sides: 4,
    color: '#ff5533',
    secondary: '#ffaa00',
    desc: 'Impacto Hidráulico & Ondas de Choque Tectônicas',
    mechanics: 'Ativa Escudo de Imunidade temporário, desce verticalmente como pilão hidráulico gerando ondas de choque em ambas as direções.',
    relicDrop: 'Blindagem Tectônica Inquebrável (+25% HP Máximo e Imunidade a Dano de Impacto Físico)'
  },
  {
    index: 3,
    formId: 'pentagon',
    namePt: 'IGNIS ELEMENTALISTA DE MAGMA',
    nameEn: 'IGNIS MAGMA ELEMENTALIST',
    wave: 135,
    sides: 5,
    color: '#ff3300',
    secondary: '#ffcc00',
    desc: 'Erupções Piroclásticas & Núcleo Vulcânico',
    mechanics: 'Lança projéteis de magma em parábola que incendeiam as plataformas por 6 segundos, reduzindo a mobilidade segura.',
    relicDrop: 'Coração de Magma Incandescente (+30% Dano de Fogo e Queimadura Contínua em Todos os Tiros)'
  },
  {
    index: 4,
    formId: 'hexagon',
    namePt: 'GUARDIÃO DA COLMEIA',
    nameEn: 'HONEYCOMB GUARDIAN',
    wave: 200,
    sides: 6,
    color: '#ffbb00',
    secondary: '#00ffcc',
    desc: 'Barreira Hexagonal & Drones Sub-Celulares',
    mechanics: 'Projeta escudos celulares modulares e libera enxames de pequenos hexágonos explosivos kamikazes.',
    relicDrop: 'Matriz de Colmeia Modular (+2 Drones Concorrentes e +20% Cadência da Esquadra)'
  },
  {
    index: 5,
    formId: 'heptagon',
    namePt: 'INVOCADOR ESPECTRAL',
    nameEn: 'SPECTRAL SUMMONER',
    wave: 265,
    sides: 7,
    color: '#a855f7',
    secondary: '#ec4899',
    desc: 'Rupturas do Vazio & Clones Espectrais Espelhados',
    mechanics: 'Abre portais dimensionais para invocar clones de energia com cópias exatas do padrão balístico do chefe.',
    relicDrop: 'Espelho do Vazio Dimensional (+15% Evasão e Chance de Clonar Projéteis Disparados)'
  },
  {
    index: 6,
    formId: 'octagon',
    namePt: 'SENHOR DAS MINAS DE ANTIMATÉRIA',
    nameEn: 'ANTIMATTER MINE LORD',
    wave: 330,
    sides: 8,
    color: '#ef4444',
    secondary: '#8b5cf6',
    desc: 'Minas de Proximidade & Campo de Singularidade',
    mechanics: 'Semeia a arena com minas magnéticas de antimatéria e atrai a nave do jogador em direção ao centro de gravidade.',
    relicDrop: 'Condensador de Antimatéria (+40% Raio de Explosão de Armas e Dano em Área Duplicado)'
  },
  {
    index: 7,
    formId: 'trefoil',
    namePt: 'VÓRTICE SOMBRIO',
    nameEn: 'SHADOW VORTEX',
    wave: 395,
    sides: 9,
    color: '#6366f1',
    secondary: '#06b6d4',
    desc: 'Distorção do Horizonte de Eventos & Matéria Escura',
    mechanics: 'Teleporta periodicamente deixando réplicas de vácuo que sugam projéteis e disparam estilhaços sombrios.',
    relicDrop: 'Lóbulo da Distorção Espacial (-25% Cooldown de Todas as Habilidades e Dash Transdimensional)'
  },
  {
    index: 8,
    formId: '4-star',
    namePt: 'ARTILHEIRO ORBITAL TITÂNICO',
    nameEn: 'TITANIC ORBITAL GUNNER',
    wave: 460,
    sides: 10,
    color: '#38bdf8',
    secondary: '#f43f5e',
    desc: 'Baterias de Railgun Orbital & Matriz Laser Quádrupla',
    mechanics: 'Trava miras a laser simultâneas nas 4 diagonais da tela e dispara rajadas hipersônicas de railgun com perfuração.',
    relicDrop: 'Bateria de Railgun Hiper-Acelerada (+50% Velocidade de Projétil e +2 Perfurações Naturais)'
  },
  {
    index: 9,
    formId: '5-star',
    namePt: 'MANIPULADOR TEMPORAL',
    nameEn: 'CHRONO MANIPULATOR',
    wave: 525,
    sides: 11,
    color: '#10b981',
    secondary: '#6ee7b7',
    desc: 'Anéis de Dilatação Temporal & Mostradores Cronológicos',
    mechanics: 'Manipula o fluxo temporal do setor, desacelerando a nave do jogador em 60% enquanto acelera os próprios ataques.',
    relicDrop: 'Ampulheta Quântica de Chronos (Imunidade a Lentidão e +30% Velocidade Global Permanente)'
  },
  {
    index: 10,
    formId: '6-star',
    namePt: 'SOBERANO VETORIAL',
    nameEn: 'VECTOR SOVEREIGN',
    wave: 590,
    sides: 12,
    color: '#f59e0b',
    secondary: '#a855f7',
    desc: 'Geometria Sagrada de Hexagrama & Recursão Vetorial',
    mechanics: 'Conecta 6 pontos de laser em geometria recursiva fechada, criando campos de corte que se contraem em direção ao centro.',
    relicDrop: 'Sigilo Vetorial Sagrado (+35% Dano Global e Sobrecarga de Energia Quântica)'
  },
  {
    index: 11,
    formId: 'quatrefoil',
    namePt: 'DRAGÃO SINTÉTICO',
    nameEn: 'SYNTHETIC DRAGON',
    wave: 655,
    sides: 10,
    color: '#14b8a6',
    secondary: '#f97316',
    desc: 'Segmentos Serpentine Biomédicos & Arcos de Bio-Plasma',
    mechanics: 'Corpo segmentado com 4 asas lobadas que serpenteia pelo cenário e sopra labaredas helicoidais de bio-plasma denso.',
    relicDrop: 'Escama do Dragão Quântico (+20% Chance de Evasão e Sifão de 3% de HP por Inimigo Destruído)'
  },
  {
    index: 12,
    formId: 'flower',
    namePt: 'GUARDIÃO PRIMORDIAL',
    nameEn: 'PRIMORDIAL GUARDIAN',
    wave: 720,
    sides: 12,
    color: '#fbbf24',
    secondary: '#ec4899',
    desc: 'Apoteose da Lótus Cósmica & Anel Primordial da Gênese',
    mechanics: 'Chefe supremo da franquia. 2 fases completas de combate, anéis concêntricos de disparos rotativos, escudo impenetrável e Fúria Final.',
    relicDrop: 'Gênese Primordial Cósmica (Desbloqueio de Todas as Sinergias e Multiplicador 2.5x no Score Final)'
  }
];

export interface DroneData {
  id: string;
  namePt: string;
  nameEn: string;
  color: string;
  role: string;
  combatAction: string;
  playerBonus: string;
  munitionName: string;
  munitionBehavior: string;
  codeRef: string;
}

export const DRONES_DATA: DroneData[] = [
  {
    id: 'missiles',
    namePt: 'Drone de Mísseis Táticos',
    nameEn: 'MISSILE DRONE',
    color: '#ff3333',
    role: 'Artilharia / Demolição',
    combatAction: 'Dispara salvas contínuas de 2 micro-mísseis balísticos teleguiados que buscam alvos hostis com explosão em área.',
    playerBonus: '+15% Dano Explosivo (AoE) para todas as armas da nave e rajadas teleguiadas automáticas a cada 2.5s.',
    munitionName: 'Micro-Mísseis Teleguiados Concussivos',
    munitionBehavior: 'Propulsão autônoma com curva de interceptação e raio de detonação termodinâmica de 120px.',
    codeRef: 'hq-scene.ts:line 781 / RenderSystem.ts:line 2185'
  },
  {
    id: 'lightning',
    namePt: 'Drone Bobina Tesla',
    nameEn: 'TESLA COIL DRONE',
    color: '#ffd700',
    role: 'Controle de Hordas / Eletricidade',
    combatAction: 'Descarrega arcos elétricos estocásticos de alta voltagem que saltam instantaneamente entre até 3 inimigos próximos.',
    playerBonus: '+20% Dano Elétrico Global e chance de 20% de atordoamento (stun) temporário em alvos de porte leve.',
    munitionName: 'Arcos Voltaicos em Cadeia',
    munitionBehavior: 'Descargas eletrostáticas instantâneas com arcos secundários encadeados de alta frequência.',
    codeRef: 'hq-scene.ts:line 811 / RenderSystem.ts:line 2205'
  },
  {
    id: 'golden_aura',
    namePt: 'Drone Aura Solar',
    nameEn: 'SOLAR AURA DRONE',
    color: '#ffcc00',
    role: 'Aura Térmica / Proximidade',
    combatAction: 'Projeta um halo permanente de radiação termonuclear em volta da nave que queima qualquer entidade que se aproxime.',
    playerBonus: '+10% Dano de Casco e queima contínua de 45 HP/s em todos os inimigos dentro do raio de 180px.',
    munitionName: 'Radiação Coronal Solar',
    munitionBehavior: 'Halo contínuo de calor coronal de 360° que funde blindagens e dissolve escudos por proximidade.',
    codeRef: 'hq-scene.ts:line 834 / RenderSystem.ts:line 2220'
  },
  {
    id: 'black_hole',
    namePt: 'Drone Vórtice (Singularidade)',
    nameEn: 'BLACK HOLE DRONE',
    color: '#cc33ff',
    role: 'Gravidade / Coleta Automática',
    combatAction: 'Gera micro-singularidades periódicas que desaceleram e atraem inimigos e fragmentos em direção ao centro do vácuo.',
    playerBonus: 'Atração magnética automática de 100% dos fragmentos e orbes soltos no setor +15% taxa de créditos.',
    munitionName: 'Poço de Singularidade Gravitacional',
    munitionBehavior: 'Vácuo gravitacional de atração contínua que imobiliza naves leves e concentra alvos para ataques em área.',
    codeRef: 'hq-scene.ts:line 859 / RenderSystem.ts:line 2235'
  },
  {
    id: 'death_wave',
    namePt: 'Drone Onda de Plasma',
    nameEn: 'PLASMA WAVE DRONE',
    color: '#ff4400',
    role: 'Disrupção / Limpeza de Projéteis',
    combatAction: 'Emite pulsos circulares expansivos de plasma de alta densidade que empurram constructos hostis e dissolvem tiros inimigos.',
    playerBonus: 'Dano de cavitação expansivo a cada 4s e destruição de projéteis hostis leves na área de expansão.',
    munitionName: 'Ondas de Choque Harmônicas de Cavitação',
    munitionBehavior: 'Pulsos de choque concussivo em 3 arcos concêntricos de alta velocidade com anulação de disparos hostis.',
    codeRef: 'hq-scene.ts:line 890 / RenderSystem.ts:line 2245'
  },
  {
    id: 'chrono_field',
    namePt: 'Drone Campo Chrono',
    nameEn: 'CHRONO FIELD DRONE',
    color: '#facc15',
    role: 'Dilatação Temporal / Suporte',
    combatAction: 'Projeta engrenagens e mostradores holográficos que distorcem o tempo ao redor da nave.',
    playerBonus: 'Redução de 60% na velocidade de deslocamento de todos os inimigos e tiros hostis próximos à nave.',
    munitionName: 'Bolha de Estase Temporal',
    munitionBehavior: 'Campo taquiônico de desaceleração que reduz em 60% a taxa de atualização física das entidades inimigas.',
    codeRef: 'hq-scene.ts:line 907 / RenderSystem.ts:line 2255'
  },
  {
    id: 'orbital_beam_drone',
    namePt: 'Drone Raio Orbital',
    nameEn: 'ORBITAL BEAM DRONE',
    color: '#00f0ff',
    role: 'Sniper / Anti-Blindagem',
    combatAction: 'Dispara um feixe colimado vertical de satélite direto do espaço com penetração contínua e foco sustentado.',
    playerBonus: 'Dano perfurante massivo contínuo contra Bosses e tanques pesados, ignorando 50% da blindagem natural.',
    munitionName: 'Feixe Laser Colimado Ionizante',
    munitionBehavior: 'Raio laser vertical perpétuo que varre o plano de cima para baixo com incineração molecular pura.',
    codeRef: 'hq-scene.ts:line 931 / RenderSystem.ts:line 2265'
  },
  {
    id: 'quantum_boomerang_drone',
    namePt: 'Drone Bumerangue Quântico',
    nameEn: 'QUANTUM BOOMERANG DRONE',
    color: '#38bdf8',
    role: 'Corte Contínuo / Retorno',
    combatAction: 'Lança lâminas giratórias que transpassam os inimigos em trajetória orbital e retornam causando dano duplo no retorno.',
    playerBonus: '+15% Velocidade de Recarga de Módulos e acertos múltiplos garantidos por projétil lançado.',
    munitionName: 'Chakram Tri-Facetado de Retorno Magnético',
    munitionBehavior: 'Três pás aerodinâmicas em rotação contínua que perfuram colunas de alvos na ida e retornam ao drone.',
    codeRef: 'hq-scene.ts:line 955 / RenderSystem.ts:line 2285'
  },
  {
    id: 'proximity_mine_drone',
    namePt: 'Drone Minas de Proximidade',
    nameEn: 'PROXIMITY MINE DRONE',
    color: '#ef4444',
    role: 'Defesa de Retaguarda / Armadilhas',
    combatAction: 'Deposita minas octogonais no rastro da nave que detonam ao toque de inimigos perseguidores ou corredores.',
    playerBonus: 'Proteção contra investidas pelas costas e retaguarda com dano de fragmentação em área de 120px.',
    munitionName: 'Minas Octogonais de Fragmentação',
    munitionBehavior: 'Sensores de proximidade com 4 antenas de gatilho e detonação de fragmentos explosivos em 360°.',
    codeRef: 'hq-scene.ts:line 976 / RenderSystem.ts:line 2305'
  },
  {
    id: 'mirror_deflector_drone',
    namePt: 'Drone Defletor Espelhado',
    nameEn: 'DEFLECTOR DRONE',
    color: '#60a5fa',
    role: 'Defesa Reativa / Contra-Ataque',
    combatAction: 'Prisma refletor de diamante que orbita a nave e rebate disparos hostis de volta contra os atiradores.',
    playerBonus: 'Chance de 35% de defletir tiros inimigos como projéteis aliados com 1.5x de dano crítico.',
    munitionName: 'Shards de Refração Holográfica',
    munitionBehavior: 'Prisma frontal de diamante com 4 fragmentos orbitais que invertem o vetor de velocidade de projéteis hostis.',
    codeRef: 'hq-scene.ts:line 1014 / RenderSystem.ts:line 2335'
  },
  {
    id: 'subzero_cryo_drone',
    namePt: 'Drone Criogênico Subzero',
    nameEn: 'SUBZERO CRYO DRONE',
    color: '#38bdf8',
    role: 'Congelamento / Controle de Área',
    combatAction: 'Dispara saraivadas de micro-agulhas de gelo que aplicam acúmulos de frio e congelam inimigos no lugar.',
    playerBonus: '+40% Dano Crítico contra inimigos congelados e redução passiva de 30% no dano recebido de alvos sob estase.',
    munitionName: 'Espículas de Gelo Subatômico',
    munitionBehavior: 'Cristal hexagonal com 6 pontas térmicas negativas que reduzem a velocidade do inimigo a zero.',
    codeRef: 'hq-scene.ts:line 1038 / RenderSystem.ts:line 2350'
  },
  {
    id: 'tesla_coil_drone',
    namePt: 'Drone Torre Tesla',
    nameEn: 'TESLA TOWER DRONE',
    color: '#a855f7',
    role: 'Sobrecarga de Energia / Arcos em Cascata',
    combatAction: 'Canaliza cascatas de arcos voltaicos contínuos entre o drone e os principais alvos na tela.',
    playerBonus: '+25% Regeneração de Energia (EN) para a nave e disparo de sobrecarga automática em emergências.',
    munitionName: 'Descargas Eletrostáticas em Cascata',
    munitionBehavior: 'Núcleo indutor com 3 faíscas orbitais emitindo relâmpagos contínuos que drenam energia dos chefes.',
    codeRef: 'hq-scene.ts:line 1057 / RenderSystem.ts:line 2360'
  },
  {
    id: 'elemental_buffer_drone',
    namePt: 'Drone Catalisador Elemental',
    nameEn: 'ELEMENTAL BUFFER DRONE',
    color: '#10b981',
    role: 'Amplificação / Sinergia Mágica',
    combatAction: 'Orbita com 4 satélites de energia que modulam a frequência dos tiros da nave.',
    playerBonus: '+18% Dano Elemental a todas as armas equipadas (Fogo, Gelo, Eletricidade e Vazio).',
    munitionName: 'Orbes de Infusão Quad-Elemental',
    munitionBehavior: 'Modula ciclicamente os disparos com Veneno, Choque, Fogo e Gelo aumentando o multiplicador de dano.',
    codeRef: 'hq-scene.ts:line 1124 / RenderSystem.ts:line 2370'
  },
  {
    id: 'tactical_buffer_drone',
    namePt: 'Drone Bastião Tático',
    nameEn: 'TACTICAL BASTION DRONE',
    color: '#f59e0b',
    role: 'Fortaleza / Escudo Balístico',
    combatAction: 'Projeta uma cúpula móvel hexagonal que acompanha a nave, absorvendo disparos pesados.',
    playerBonus: 'Absorve até 350 pontos de dano por onda e reduz em 20% a perda de integridade do casco.',
    munitionName: 'Barreira Hexagonal Aegis',
    munitionBehavior: 'Escudo com 3 emissores periféricos que cria um domo físico absorvedor de impacto cinético.',
    codeRef: 'hq-scene.ts:line 1148 / RenderSystem.ts:line 2400'
  },
  {
    id: 'scavenger_harvester_drone',
    namePt: 'Drone Minerador (Scavenger)',
    nameEn: 'HARVESTER DRONE',
    color: '#10b981',
    role: 'Economia / Mineração de Recursos',
    combatAction: 'Chassi com 3 coletores magnéticos que varrem os cantos da arena minerando fragmentos extras dos destroços.',
    playerBonus: '+25% Créditos e Moedas por onda e aumento de 15% na chance de drop de itens raros.',
    munitionName: 'Feixes de Extração Magnética',
    munitionBehavior: 'Gera vórtices de sucção que atraem e convertem destroços inimigos em fragmentos de dados e XP.',
    codeRef: 'hq-scene.ts:line 1077 / RenderSystem.ts:line 2440'
  },
  {
    id: 'disruptor_debuffer_drone',
    namePt: 'Drone Disruptor Entrópico',
    nameEn: 'DISRUPTOR DRONE',
    color: '#ec4899',
    role: 'Debuff / Corrosão de Blindagem',
    combatAction: 'Sonda com 2 pontas laterais que projeta raios de corrosão ácida nos alvos de maior HP.',
    playerBonus: 'Reduz a armadura dos Chefes e Tanques em -30%, permitindo que toda a esquadra cause dano amplificado.',
    munitionName: 'Feixe de Desestabilização Entrópica',
    munitionBehavior: 'Raios laterais de ressonância reversa que dissolvem a integridade de armadura e escudos hostis.',
    codeRef: 'hq-scene.ts:line 1101 / RenderSystem.ts:line 2465'
  }
];

export interface ProjectileInfo {
  id: string;
  namePt: string;
  nameEn: string;
  className: string;
  weaponName: string;
  color: string;
  glow: string;
  projectileBehavior: string;
  damageAndEffects: string;
  classBonuses: string;
  codeRef: string;
}

export const PROJECTILES_DATA: ProjectileInfo[] = [
  {
    id: 'rocket_missile',
    namePt: 'Míssil Balístico Estabilizado',
    nameEn: 'ROCKET MISSILE',
    className: 'Guerreiro (Fighter)',
    weaponName: 'Bazuca Pesada Balística',
    color: '#ff3300',
    glow: '#ffaa00',
    projectileBehavior: 'Ogiva perfurante com aletas estabilizadoras duplas e cauda de combustão com faíscas incandescentes. Trajetória com rastro térmico.',
    damageAndEffects: 'Dano Cinético / Explosivo em Área (AoE) de 140px. Causa concussão e atordoamento de 0.5s em constructos médios.',
    classBonuses: '+15% HP Máximo, +10 Força (STR), alta estabilidade de recuo e absorção de choques de impacto.',
    codeRef: 'RenderSystem.ts:line 860'
  },
  {
    id: 'phase_flechette',
    namePt: 'Flechette de Fase Quântica',
    nameEn: 'PHASE FLECHETTE',
    className: 'Ladino (Rogue)',
    weaponName: 'Adagas Cinéticas de Fase',
    color: '#00f0ff',
    glow: '#0088ff',
    projectileBehavior: 'Lâmina facetada de estase com trilha senoidal ondulante de fasagem. Atravessa barreiras e colunas sólidas de geometria.',
    damageAndEffects: 'Dano de Fasagem Perfurante com 100% chance de perfuração do 1º alvo e ricochete angular de alta velocidade.',
    classBonuses: '+12% Evasão, +15% Chance de Crítico, +8 Destreza (DEX) e recarga acelerada da habilidade de esquiva.',
    codeRef: 'RenderSystem.ts:line 1020'
  },
  {
    id: 'plasma_vortex',
    namePt: 'Núcleo Toroidal de Vórtice',
    nameEn: 'PLASMA VORTEX',
    className: 'Mago (Mage)',
    weaponName: 'Esfera de Plasma Ígneo',
    color: '#ff4400',
    glow: '#ff8800',
    projectileBehavior: 'Toroide com 3 arcos espirais de contenção magnética e núcleo de fusão de alta temperatura em rotação contínua.',
    damageAndEffects: 'Dano Térmico / Plasma com Queimadura Contínua (DoT). Inflige dano a cada 0.25s por 4 segundos em alvos atingidos.',
    classBonuses: '+25% Dano de Magia/Sistemas, +20 EN/s de regeneração e escalonamento por Inteligência (INT).',
    codeRef: 'RenderSystem.ts:line 910'
  },
  {
    id: 'kinetic_dart',
    namePt: 'Dardo Cinético Sabot Penetrador',
    nameEn: 'KINETIC DART',
    className: 'Patrulheiro (Ranger)',
    weaponName: 'Arco Balístico Quântico',
    color: '#ffcc00',
    glow: '#ffaa00',
    projectileBehavior: 'Penetrador sabot com cone hipersônico, aletas estabilizadoras duplas e linha dorsal de alta velocidade.',
    damageAndEffects: 'Dano Perfurante Puro com Multiplicador Balístico de Distância (causa até +60% de dano adicional em alcance máximo).',
    classBonuses: '+100% Precisão em linha reta, +30% Velocidade de Projétil e perfuração natural de até 3 inimigos alinhados.',
    codeRef: 'RenderSystem.ts:line 950'
  },
  {
    id: 'photon_lance',
    namePt: 'Lança Fotônica de Prótons',
    nameEn: 'PHOTON LANCE',
    className: 'Paladino (Paladin)',
    weaponName: 'Lança de Luz Sagrada',
    color: '#ffd700',
    glow: '#ffffff',
    projectileBehavior: 'Corredor de feixe colimado luminoso contínuo com ponta prismática de diamante perfurante.',
    damageAndEffects: 'Dano Radiante Sagrado instantâneo que transpassa toda a coluna de visão em linha reta sem perda de dano.',
    classBonuses: '+25% Blindagem Reativa, Domo Aegis de Proteção e nanites de auto-reparo que regeneram o casco em combate.',
    codeRef: 'RenderSystem.ts:line 985'
  },
  {
    id: 'sonic_shockwave',
    namePt: 'Pulso de Choque Harmônico',
    nameEn: 'SONIC SHOCKWAVE',
    className: 'Bardo (Bard)',
    weaponName: 'Ressonador Sônico de Frequência',
    color: '#d946ef',
    glow: '#ff00ff',
    projectileBehavior: '3 arcos concêntricos de choque por cavitação sônica com nó central oscilante de alta frequência.',
    damageAndEffects: 'Dano Acústico / Sônico que desestabiliza armaduras pesadas, empurra hordas para trás e quebra barreiras de escudo.',
    classBonuses: 'Buff de cadência para todos os drones aliados da esquadra, desaceleração acústica de alvos e cura por ressonância.',
    codeRef: 'RenderSystem.ts:line 1210'
  },
  {
    id: 'cryo_needle',
    namePt: 'Agulha Criogênica Subzero',
    nameEn: 'CRYO NEEDLE',
    className: 'Especialista Criogênico (Cryo)',
    weaponName: 'Canhão Nano-Cristalino Subzero',
    color: '#38bdf8',
    glow: '#a5f3fc',
    projectileBehavior: 'Agulha hexagonal de gelo em nano-cristais com micro-espigões de geada e rastro gélido de partículas.',
    damageAndEffects: 'Dano Criogênico com 60% de Lentidão por 3s e efeito de Estilhaçamento (alvos congelados recebem +50% de dano crítico).',
    classBonuses: '+40% Dano contra inimigos sob estase térmica e congelamento em cadeia que se espalha para alvos próximos.',
    codeRef: 'RenderSystem.ts:line 1060'
  },
  {
    id: 'quantum_chakram',
    namePt: 'Chakram Quântico Tri-Facetado',
    nameEn: 'QUANTUM CHAKRAM',
    className: 'Tecnomago (Boomerangueiro)',
    weaponName: 'Chakram Quântico Tri-Facetado',
    color: '#c084fc',
    glow: '#a855f7',
    projectileBehavior: 'Chakram giratório de 3 lâminas com centro oco e trajetória orbital helicoidal que avança e retorna à nave.',
    damageAndEffects: 'Dano de Corte Circular Contínuo com acertos múltiplos garantidos no mesmo alvo na ida e no retorno.',
    classBonuses: '+20% Velocidade de Rotação do Projétil e 2.0x Dano no golpe de retorno quando recuperado pela nave.',
    codeRef: 'RenderSystem.ts:line 1095'
  },
  {
    id: 'proximity_mine',
    namePt: 'Mina Terrestre Octogonal',
    nameEn: 'PROXIMITY MINE',
    className: 'Engenheiro Tático (Combat Engineer)',
    weaponName: 'Dispensador Balístico de Minas',
    color: '#10b981',
    glow: '#34d399',
    projectileBehavior: 'Corpo octogonal blindado com pinos laterais de ancoragem e diodo sensor óptico que pulsa no ar até a detonação.',
    damageAndEffects: 'Dano de Fragmentação Pesada em raio de 120px acionado por aproximação de qualquer entidade hostil.',
    classBonuses: '+40% Área de Efeito das explosões, nanites corrosivos que reduzem a blindagem do inimigo em -25% por 5s.',
    codeRef: 'RenderSystem.ts:line 1130'
  },
  {
    id: 'tesla_spark',
    namePt: 'Centelha de Descarga Voltaica',
    nameEn: 'TESLA SPARK',
    className: 'Artífice Voltaico (Tesla Specialist)',
    weaponName: 'Bobina de Choque de Alta Amperagem',
    color: '#3b82f6',
    glow: '#60a5fa',
    projectileBehavior: 'Arco voltaico estocástico com halo de ionização elétrica azul e 4 tentáculos que ramificam no ar.',
    damageAndEffects: 'Dano Elétrico de Alta Voltagem com efeito em cadeia que salta instantaneamente para até 4 inimigos adicionais.',
    classBonuses: '3.0x Regeneração de Energia Quântica (EN) e 25% de chance de infligir paralisia motora temporária nos alvos.',
    codeRef: 'RenderSystem.ts:line 1170'
  }
];

export interface HeroClassData {
  id: string;
  name: string;
  code: string;
  pwr: number;
  agi: number;
  hul: number;
  sys: number;
  prc: number;
  nrg: number;
  color: string;
  combatProfile: string;
  weaponId: string;
  weaponName: string;
  munitionName: string;
  munitionDetails: string;
  evolutionWeaponId: string;
  evolutionWeaponName: string;
  evolutionRelicId: string;
  evolutionRelicName: string;
  evolutionColor: string;
  evolutionGlow: string;
  evolutionMunitionName: string;
  evolutionDetails: string;
  evolutionNumericalBonus: string;
  activeSkillName: string;
  activeSkillDetails: string;
  numericalBonuses: {
    label: string;
    value: string;
    desc: string;
  }[];
  codeRef: string;
}

export const HERO_CLASSES_DATA: HeroClassData[] = [
  {
    id: 'vanguard',
    name: 'VANGUARDA [1]',
    code: 'Fighter',
    pwr: 12,
    agi: 10,
    hul: 12,
    sys: 8,
    prc: 8,
    nrg: 10,
    color: '#00ffaa',
    combatProfile: 'Dano Cinético em Área: Foguetes pesados com dispersão de 140px.',
    weaponId: 'weapon_bazooka',
    weaponName: 'Bazuca de Plasma (Vanguarda)',
    munitionName: 'Ogiva Balística Concussiva Termodinâmica',
    munitionDetails: 'Projéteis balísticos pesados que geram onda de choque expansiva de 140px com empurrão e desintegração de blindagens.',
    evolutionWeaponId: 'evolution_nuclear_nuke',
    evolutionWeaponName: 'Ogiva Termonuclear Quântica (Arma Evoluída)',
    evolutionRelicId: 'relic_fusion_core',
    evolutionRelicName: 'Núcleo de Fusão Cósmica (Fusion Core)',
    evolutionColor: '#22c55e',
    evolutionGlow: '#84cc16',
    evolutionMunitionName: 'Torpedo Atômico de Radioatividade Esmeralda (Nuke)',
    evolutionDetails: 'Transmuta para projétil balístico esmeralda de escala aumentada (+25%), casco obsidiana tóxico, ogiva de fusão nuclear e raio de explosão titânico de 240px (contra 140px da base) com desintegração de blindagens.',
    evolutionNumericalBonus: '+71% Raio de Explosão em Área (240px), 35 partículas quânticas de choque e dano cinético triplo instantâneo.',
    activeSkillName: 'Barreira Reativa Hexagonal (Kinetic Shield Blast)',
    activeSkillDetails: 'Aciona barreira reativa com onda de choque cinético que repele projéteis hostis e inflige 180 de dano em área (140px).',
    numericalBonuses: [
      { label: 'Dano Físico', value: '+18.0%', desc: 'Multiplicador base 1.18x em todas as armas e impactos balísticos (PWR 12)' },
      { label: 'Dano Crítico Físico', value: '156.0%', desc: 'Multiplicador de acerto crítico aumentado em +6.0% sobre a base (PWR 12)' },
      { label: 'HP Máximo do Casco', value: '+30.0%', desc: 'Multiplicador de 1.30x na integridade máxima da nave Vector-01 (HUL 12)' },
      { label: 'Regeneração de Casco', value: '+0.60 HP/s', desc: 'Reparo automático contínuo de nanites na integridade do casco (HUL 12)' },
      { label: 'Cadência & Disparo', value: '+10.0%', desc: 'Redução de tempo de recarga entre salvas da arma primária (AGI 10)' },
      { label: 'Velocidade da Nave', value: '+5.0%', desc: 'Aceleração linear e agilidade de navegação entre pistas (AGI 10)' },
      { label: 'Taxa Crítica Física', value: '6.50%', desc: '+1.50% de chance sobre a base padrão de 5.0% (AGI 10)' },
      { label: 'Esquiva Quântica', value: '1.50%', desc: 'Chance passiva de anular 100% de qualquer dano recebido (AGI 10)' }
    ],
    codeRef: 'HullSetupOverlay.ts:line 253 / SkillCalculator.ts:line 31'
  },
  {
    id: 'interceptor',
    name: 'INTERCEPTADOR [2]',
    code: 'Rogue',
    pwr: 10,
    agi: 14,
    hul: 8,
    sys: 8,
    prc: 10,
    nrg: 10,
    color: '#3b82f6',
    combatProfile: 'Lâminas de Plasma: Alta velocidade, esquiva quântica e taxa crítica.',
    weaponId: 'weapon_daggers',
    weaponName: 'Adagas Cibernéticas (Interceptador)',
    munitionName: 'Dupla de Lâminas Ondulatórias de Fase',
    munitionDetails: '2 adagas paralelas ondulatórias em frequência senoidal cruzando o centro (±16px) com alta perfuração e taxa crítica.',
    evolutionWeaponId: 'evolution_phantom_blades',
    evolutionWeaponName: 'Lâminas Fantasma de Fase Espectral (Arma Evoluída)',
    evolutionRelicId: 'relic_lucky_clover',
    evolutionRelicName: 'Trevo Quântico de Probabilidade (Lucky Clover)',
    evolutionColor: '#a855f7',
    evolutionGlow: '#34d399',
    evolutionMunitionName: 'Adagas Nanomoleculares de Interferência Espectral',
    evolutionDetails: 'Transmuta para lâminas violeta espectrais (+20% escala) com rastro duplo senoidal esmeralda brilhante. Ignora completamente colisões com o terreno, penetra alvos ilimitados e garante acertos críticos quânticos.',
    evolutionNumericalBonus: 'Perfuração infinita de obstáculos e alvos, +25% velocidade de projétil e dano crítico garantido em alvos em fase.',
    activeSkillName: 'Campo de Estase Temporal (Chronos Stasis Field)',
    activeSkillDetails: 'Projeta mostrador cronométrico holográfico sci-fi que desacelera tempo, naves e disparos inimigos em 60% por 4 segundos.',
    numericalBonuses: [
      { label: 'Esquiva Quântica', value: '2.10%', desc: 'A maior esquiva base do jogo: 2.10% de chance passiva de fasagem que anula 100% do impacto (AGI 14)' },
      { label: 'Taxa Crítica Física', value: '7.10%', desc: 'Chance cirúrgica de acerto crítico aumentada em +2.10% sobre a base (AGI 14)' },
      { label: 'Cadência de Disparo', value: '+14.0%', desc: 'Ataques em altíssima frequência com recarga acelerada (AGI 14)' },
      { label: 'Velocidade da Nave', value: '+7.0%', desc: 'A maior velocidade e aceleração de deslocamento entre os 6 heróis (AGI 14)' },
      { label: 'Velocidade dos Projéteis', value: '+4.2%', desc: 'Lâminas viajam 4.2% mais rápido até o alvo (AGI 14)' },
      { label: 'Taxa Crítica de Sistemas', value: '7.00%', desc: 'Chance de acertos críticos para módulos e habilidades ativas (PRC 10)' },
      { label: 'Aceleração de Recarga', value: '+15.0%', desc: 'Recarga acelerada para habilidades ativas e módulos táticos (PRC 10)' },
      { label: 'Dano Físico', value: '+15.0%', desc: 'Multiplicador de 1.15x de dano de corte plasmático (PWR 10)' }
    ],
    codeRef: 'HullSetupOverlay.ts:line 254 / SkillCalculator.ts:line 37'
  },
  {
    id: 'disruptor',
    name: 'DISRUPTOR QUÂNTICO [3]',
    code: 'Mage',
    pwr: 8,
    agi: 8,
    hul: 10,
    sys: 14,
    prc: 12,
    nrg: 8,
    color: '#a855f7',
    combatProfile: 'Torpedos Térmicos: Detonação plasmática e ondas de pulso devastadoras.',
    weaponId: 'weapon_fireball',
    weaponName: 'Cajado Solar (Disruptor)',
    munitionName: 'Esfera de Plasma Coronal Incandescente',
    munitionDetails: 'Esferas térmicas incandescentes com labaredas orbitais que aplicam Queimadura contínua (Burn DoT) e desestabilização de escudos.',
    evolutionWeaponId: 'evolution_inferno_meteor',
    evolutionWeaponName: 'Meteoro Supernova Estelar (Arma Evoluída)',
    evolutionRelicId: 'relic_overcharge_battery',
    evolutionRelicName: 'Capacitor Coronal de Sobrecarga (Overcharge Battery)',
    evolutionColor: '#ff0044',
    evolutionGlow: '#ffaa00',
    evolutionMunitionName: 'Singularidade Coronal Carmesim com Labaredas Triplas',
    evolutionDetails: 'Transmuta para vórtice estelar carmesim de escala massiva (+25%, raio 11px), 3 labaredas giratórias superaquecidas e núcleo de fusão estelar branca. Deixa uma trilha contínua de fogo no chão que derrete blindagens.',
    evolutionNumericalBonus: 'Aura solar permanente de dano contínuo (Burn DoT), +60% área de toróide e destruição automática de projéteis inimigos leves.',
    activeSkillName: 'Singularidade Quântica (Vector Pulse Nova)',
    activeSkillDetails: 'Colapsa hipercubo 4D Tesseract que detona ondas espirais de plasma quântico causando 320 de dano térmico com queima contínua (Burn DoT).',
    numericalBonuses: [
      { label: 'Dano de Sistemas', value: '+21.0%', desc: 'O maior dano de módulos, drones e magias do jogo: multiplicador 1.21x (SYS 14)' },
      { label: 'Dano Crítico de Sistemas', value: '157.0%', desc: 'Multiplicador de acerto crítico mágico devastador (SYS 14)' },
      { label: 'Taxa Crítica de Sistemas', value: '7.40%', desc: '+2.40% de chance de crítico para módulos e habilidades (PRC 12)' },
      { label: 'Aceleração de Recarga', value: '+18.0%', desc: 'Recarga acelerada para spam constante de módulos quânticos (PRC 12)' },
      { label: 'HP Máximo do Casco', value: '+25.0%', desc: 'Integridade de 1.25x com +0.50 HP/s de regeneração (HUL 10)' },
      { label: 'Defesa de Escudo', value: '+2.0%', desc: 'Absorção passiva direta de danos sofridos (HUL 10)' },
      { label: 'Esquiva a Áreas (AoE)', value: '1.80%', desc: 'Fasagem contra explosões e zonas de perigo (PRC 12)' },
      { label: 'Energia Quântica Base', value: '66 EN', desc: 'Reserva de 66 EN com regeneração de 0.66 EN/s (NRG 8)' }
    ],
    codeRef: 'HullSetupOverlay.ts:line 255 / SkillCalculator.ts:line 44'
  },
  {
    id: 'resonator',
    name: 'RESSONADOR [4]',
    code: 'Bard',
    pwr: 8,
    agi: 10,
    hul: 8,
    sys: 10,
    prc: 14,
    nrg: 12,
    color: '#d946ef',
    combatProfile: 'Emissor Sônico: Ondas de choque senoidais com desorientação e estase.',
    weaponId: 'weapon_musical_notes',
    weaponName: 'Sintetizador Harmônico (Ressonador)',
    munitionName: 'Pulsos de Choque Acústico & Notas Harmônicas',
    munitionDetails: 'Ondas acústicas oscilatórias e notas sônicas perfurantes que causam cavitação estrutural, desorientação e estase nos inimigos.',
    evolutionWeaponId: 'evolution_harmonic_resonance',
    evolutionWeaponName: 'Sinfonia Nova Harmônica (Arma Evoluída)',
    evolutionRelicId: 'relic_tuning_fork',
    evolutionRelicName: 'Diapasão de Cristal Ressonante (Resonance Tuning Fork)',
    evolutionColor: '#00f0ff',
    evolutionGlow: '#ffd700',
    evolutionMunitionName: 'Frente de Cavitação Hiper-Sônica Quântica',
    evolutionDetails: 'Transmuta para ondas de choque holográficas ciano/douradas com 4 arcos de cavitação ressonante e nó central estroboscópico. Reflete projéteis inimigos e causa estase vibracional em 360 graus.',
    evolutionNumericalBonus: 'Reflexão de 100% dos projéteis hostis que tocam as ondas e atordoamento harmônico de 1.5s em hordas.',
    activeSkillName: 'Onda de Choque Acústica (Acoustic Disruptor Wave)',
    activeSkillDetails: 'Emite osciloscópio de ondas senoidais fluorescentes com anéis de ressonância acústica que empurram hordas, quebram escudos e desaceleram em 45%.',
    numericalBonuses: [
      { label: 'Taxa Crítica de Sistemas', value: '7.80%', desc: 'A maior taxa crítica de sistemas do jogo: +2.80% sobre a base (PRC 14)' },
      { label: 'Aceleração de Recarga', value: '+21.0%', desc: 'A mais rápida reciclagem de habilidades e módulos da esquadra (PRC 14)' },
      { label: 'Energia Máxima', value: '74 EN', desc: 'Reserva ampliada para 74 EN com alta recuperação de 0.74 EN/s (NRG 12)' },
      { label: 'Resistência a Debuffs', value: '-7.2%', desc: 'Reduz a duração de congelamentos, lentidões e atordoamentos hostis (NRG 12)' },
      { label: 'Dano de Módulos & Drones', value: '+15.0%', desc: 'Amplificação harmônica de dano para toda a esquadra de drones (SYS 10)' },
      { label: 'Cadência de Disparo', value: '+10.0%', desc: 'Cadência acelerada de ondas sônicas (AGI 10)' },
      { label: 'Esquiva Mágica & Acústica', value: '2.10%', desc: 'Dissipação passiva de ataques e esferas de choque (PRC 14)' },
      { label: 'Velocidade da Nave', value: '+5.0%', desc: 'Mobilidade ágil com deslocamento de pistas suave (AGI 10)' }
    ],
    codeRef: 'HullSetupOverlay.ts:line 256 / SkillCalculator.ts:line 51'
  },
  {
    id: 'bastion',
    name: 'BASTIÃO AEGIS [5]',
    code: 'Paladin',
    pwr: 12,
    agi: 8,
    hul: 14,
    sys: 8,
    prc: 8,
    nrg: 10,
    color: '#facc15',
    combatProfile: 'Feixe Táquion: Perfuração linear em linha e nanites reparadores de estrutura.',
    weaponId: 'weapon_holy_beam',
    weaponName: 'Prisma de Luz Sagrada (Bastião)',
    munitionName: 'Feixe Colimado de Luz Divina Táquion',
    munitionDetails: 'Feixe colimado direcional de longo alcance com prisma de refração em diamante, incineração contínua e nanites de reparo.',
    evolutionWeaponId: 'evolution_prismatic_laser',
    evolutionWeaponName: 'Laser Prismático Refletivo Táquion (Arma Evoluída)',
    evolutionRelicId: 'relic_shield_generator',
    evolutionRelicName: 'Gerador de Escudo Táquion (Tachyon Shield Generator)',
    evolutionColor: '#00ffff',
    evolutionGlow: '#d946ef',
    evolutionMunitionName: 'Raio Contínuo Refratário com Prisma Diamante Magenta',
    evolutionDetails: 'Transmuta para feixe laser prismático ciano ultra-espesso (largura 4.5px, escala 1.25x) com prisma frontal refratário em magenta fluorescente. Atravessa a tela inteira instantaneamente incinerando linhas inteiras de inimigos e restaurando o casco a cada acerto.',
    evolutionNumericalBonus: 'Feixe de tela inteira contínuo, perfuração total de alvos e cura de 2% do dano causado convertida em casco.',
    activeSkillName: 'Matriz Sagrada de Auto-Reparo (Aegis Repair Matrix)',
    activeSkillDetails: 'Manifesta domo geodésico de 3 prismas de ouro orbitais com nanites que curam 25 HP/s e bloqueiam 80% do dano sofrido por 5 segundos.',
    numericalBonuses: [
      { label: 'HP Máximo do Casco', value: '+35.0%', desc: 'O maior chassi do jogo: multiplicador 1.35x de vida máxima (HUL 14)' },
      { label: 'Regeneração Contínua', value: '+0.70 HP/s', desc: 'A mais rápida regeneração passiva de vida entre todos os heróis (HUL 14)' },
      { label: 'Defesa Passiva de Escudo', value: '+2.8%', desc: 'Bloqueio natural de 2.8% de todo o dano recebido (HUL 14)' },
      { label: 'Dano de Espinhos (Thorns)', value: '1.4% HP', desc: 'Reflete 1.4% da vida máxima como dano direto ao colidir com inimigos (HUL 14)' },
      { label: 'Resistência a Perigos', value: '+2.8%', desc: 'Redução de dano de armadilhas, lasers e hazards ambientais (HUL 14)' },
      { label: 'Dano Físico Balístico', value: '+18.0%', desc: 'Multiplicador de 1.18x de poder de fogo primário pesado (PWR 12)' },
      { label: 'Dano Crítico Físico', value: '156.0%', desc: 'Disparos colimados com alto impacto crítico (PWR 12)' },
      { label: 'Alcance Magnético', value: '+14px', desc: 'Atração estendida de fragmentos e cristais soltos (HUL 14)' }
    ],
    codeRef: 'HullSetupOverlay.ts:line 257 / SkillCalculator.ts:line 58'
  },
  {
    id: 'marksman',
    name: 'ATIRADOR TÁTICO [6]',
    code: 'Ranger',
    pwr: 10,
    agi: 14,
    hul: 10,
    sys: 8,
    prc: 12,
    nrg: 8,
    color: '#f97316',
    combatProfile: 'Dardos Flechette: Alta penetração, múltiplos disparos em leque e precisão.',
    weaponId: 'weapon_bow_arrows',
    weaponName: 'Arco Cibernético (Atirador)',
    munitionName: 'Dardo Cinético Sabot Penetrador APFSDS',
    munitionDetails: 'Haste hipersônica alongada de tungstênio (18px × 4px) com núcleo de alta densidade e aletas cinéticas de Mach. Sem penas medievais.',
    evolutionWeaponId: 'evolution_volley_rain',
    evolutionWeaponName: 'Chuva de Dardos Táquion em Leque (Arma Evoluída)',
    evolutionRelicId: 'relic_adrenaline_gland',
    evolutionRelicName: 'Injetor Cinético de Adrenalina (Adrenaline Gland)',
    evolutionColor: '#00f0ff',
    evolutionGlow: '#38bdf8',
    evolutionMunitionName: 'Dardo Hipersônico Quântico de Plasma Ciano (APFSDS Táquion)',
    evolutionDetails: 'Transmuta para dardo penetrador de plasma ciano brilhante (#00f0ff) com núcleo obsidiana escura (#031a24), espinha central branca incandescente e escala aumentada (+20%). Disparado em salva quádrupla em leque com penetração infinita que atravessa todas as colunas da tela sem perder velocidade.',
    evolutionNumericalBonus: 'Salva quádrupla em leque contínuo, perfuração infinita de inimigos e +40% de multiplicador de crítico cirúrgico.',
    activeSkillName: 'Barragem Flechette de Precisão (Tactical Barrage Shots)',
    activeSkillDetails: 'Dispara leque cirúrgico de 5 flechettes hipersônicas perfurantes de altíssima penetração crítica com multiplicador de 2.5x dano crítico.',
    numericalBonuses: [
      { label: 'Precisão Balística', value: '100%', desc: 'Trajetória colimada linear sem desvio angular ou dispersão (PRC 12)' },
      { label: 'Cadência de Disparo', value: '+14.0%', desc: 'Disparo contínuo e rápido de flechettes cinéticas (AGI 14)' },
      { label: 'Velocidade da Nave', value: '+7.0%', desc: 'Alta mobilidade e aceleração para reposicionamento tático (AGI 14)' },
      { label: 'Taxa Crítica Física', value: '7.10%', desc: '+2.10% de chance de crítico em cada disparo flechette (AGI 14)' },
      { label: 'Taxa Crítica de Sistemas', value: '7.40%', desc: 'Críticos ampliados para habilidades e drones táticos (PRC 12)' },
      { label: 'Velocidade dos Projéteis', value: '+4.2%', desc: 'Flechettes supersônicas atingem o alvo instantaneamente (AGI 14)' },
      { label: 'Esquiva Quântica', value: '2.10%', desc: 'Chance passiva de desviar completamente de projéteis hostis (AGI 14)' },
      { label: 'Aceleração de Recarga', value: '+18.0%', desc: 'Reciclagem rápida de habilidades e rajadas de sniper (PRC 12)' }
    ],
    codeRef: 'HullSetupOverlay.ts:line 258 / SkillCalculator.ts:line 65'
  }
];

// Compatibility alias for older references
export const CLASSES_DATA = HERO_CLASSES_DATA;

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
 * 5. DRONES & ARMAS SUPREMAS (16 CANONICAL DRONES & WEAPONS)
 * Verbatim procedural designs from hq-scene.ts:drawProceduralWeaponIcon (lines 780-1175)
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
  const s = Math.min(width, height) / 36;

  let baseColor = '#00f0ff';
  if (droneId === 'missiles') baseColor = '#ff3333';
  else if (droneId === 'lightning') baseColor = '#ffd700';
  else if (droneId === 'golden_aura') baseColor = '#ffcc00';
  else if (droneId === 'black_hole') baseColor = '#cc33ff';
  else if (droneId === 'death_wave') baseColor = '#ff4400';
  else if (droneId === 'chrono_field') baseColor = '#facc15';
  else if (droneId === 'orbital_beam_drone') baseColor = '#00f0ff';
  else if (droneId === 'quantum_boomerang_drone') baseColor = '#38bdf8';
  else if (droneId === 'proximity_mine_drone') baseColor = '#ef4444';
  else if (droneId === 'mirror_deflector_drone') baseColor = '#60a5fa';
  else if (droneId === 'subzero_cryo_drone') baseColor = '#38bdf8';
  else if (droneId === 'tesla_coil_drone') baseColor = '#a855f7';
  else if (droneId === 'elemental_buffer_drone') baseColor = '#10b981';
  else if (droneId === 'tactical_buffer_drone') baseColor = '#f59e0b';
  else if (droneId === 'scavenger_harvester_drone') baseColor = '#10b981';
  else if (droneId === 'disruptor_debuffer_drone') baseColor = '#ec4899';

  ctx.strokeStyle = baseColor;
  ctx.lineWidth = Math.max(2, 1.8 * (s / 4));

  switch (droneId) {
    case 'missiles': {
      // Aerodynamic Ballistic Missile with Delta Stabilizers & Exhaust Dots
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
      ctx.lineWidth = 1.4 * (s / 4);
      ctx.beginPath();
      ctx.moveTo(cx - 5 * s, cy);
      ctx.lineTo(cx + 7 * s, cy);
      ctx.stroke();

      ctx.fillStyle = '#ffaa00';
      ctx.beginPath();
      ctx.arc(cx - 12 * s, cy, 2.2 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx - 9 * s, cy, 1.4 * s, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'lightning': {
      // High-Voltage Collimated Dual-Discharge Bolt with Spark Nodes
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

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.2 * (s / 4);
      ctx.beginPath();
      ctx.moveTo(cx - 4 * s, cy - 5 * s);
      ctx.lineTo(cx + 4 * s, cy + 5 * s);
      ctx.stroke();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx, cy, 2.2 * s, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'golden_aura': {
      // Radiant Solar Coronal Field with 4 Cardinal Spikes
      ctx.fillStyle = '#382d00';
      ctx.beginPath();
      ctx.arc(cx, cy, 10 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.strokeStyle = baseColor;
      ctx.lineWidth = 1.6 * (s / 4);
      ctx.beginPath();
      ctx.arc(cx, cy, 6 * s, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx, cy, 2.8 * s, 0, Math.PI * 2);
      ctx.fill();

      for (let r = 0; r < 4; r++) {
        const ra = (r * Math.PI) / 2 + time * 0.8;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(ra) * 6 * s, cy + Math.sin(ra) * 6 * s);
        ctx.lineTo(cx + Math.cos(ra) * 13 * s, cy + Math.sin(ra) * 13 * s);
        ctx.stroke();
      }
      break;
    }

    case 'black_hole': {
      // Toroidal Gravitational Singularity with Accretion Disks
      ctx.fillStyle = '#18002e';
      ctx.beginPath();
      ctx.arc(cx, cy, 8.5 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      for (const rot of [Math.PI / 4 + time * 0.5, -Math.PI / 4 - time * 0.5]) {
        ctx.beginPath();
        for (let a = 0; a <= Math.PI * 2; a += 0.35) {
          const ex = Math.cos(a) * 14 * s;
          const ey = Math.sin(a) * 5 * s;
          const rx = cx + ex * Math.cos(rot) - ey * Math.sin(rot);
          const ry = cy + ex * Math.sin(rot) + ey * Math.cos(rot);
          if (a === 0) ctx.moveTo(rx, ry); else ctx.lineTo(rx, ry);
        }
        ctx.closePath();
        ctx.stroke();
      }

      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(cx, cy, 3.8 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx + 1 * s, cy - 1 * s, 1.1 * s, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'death_wave': {
      // Concentric Harmonic Cavitation Shockwaves
      ctx.lineWidth = 2.0 * (s / 4);
      for (let a = 1; a <= 3; a++) {
        const ar = (a * 5 + 2) * s;
        ctx.beginPath();
        ctx.arc(cx - 4 * s, cy, ar, -Math.PI * 0.42, Math.PI * 0.42);
        ctx.stroke();
      }

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx - 4 * s, cy, 2.8 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.2 * (s / 4);
      ctx.beginPath();
      ctx.moveTo(cx - 8 * s, cy);
      ctx.lineTo(cx - 2 * s, cy);
      ctx.stroke();
      break;
    }

    case 'chrono_field': {
      // Precision Chronometer Stasis Gear with Radial Teeth & Axle Hub
      ctx.fillStyle = '#002626';
      ctx.beginPath();
      ctx.arc(cx, cy, 7 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      for (let gr = 0; gr < 6; gr++) {
        const ga = (gr * Math.PI) / 3 + time * 0.6;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(ga) * 7 * s, cy + Math.sin(ga) * 7 * s);
        ctx.lineTo(cx + Math.cos(ga) * 11.5 * s, cy + Math.sin(ga) * 11.5 * s);
        ctx.stroke();
      }

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx, cy, 2.8 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = baseColor;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + 3.5 * s, cy - 3.5 * s);
      ctx.stroke();
      break;
    }

    case 'orbital_beam_drone': {
      // Satellite Drone Prism Emitter with Vertical Piercing Laser Beam
      ctx.fillStyle = '#002233';
      ctx.beginPath();
      ctx.moveTo(cx, cy - 11 * s);
      ctx.lineTo(cx + 8 * s, cy + 3 * s);
      ctx.lineTo(cx - 8 * s, cy + 3 * s);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Piercing vertical beam
      ctx.strokeStyle = baseColor;
      ctx.lineWidth = 2.2 * (s / 4);
      ctx.beginPath();
      ctx.moveTo(cx, cy + 3 * s);
      ctx.lineTo(cx, cy + 18 * s);
      ctx.stroke();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.1 * (s / 4);
      ctx.beginPath();
      ctx.moveTo(cx, cy + 3 * s);
      ctx.lineTo(cx, cy + 18 * s);
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx, cy - 2 * s, 2.2 * s, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'quantum_boomerang_drone': {
      // Spinning Chakram Aerodynamic Tri-Blade Boomerang
      ctx.fillStyle = '#033e5c';
      for (let b = 0; b < 3; b++) {
        const ba = (b * 2 * Math.PI) / 3 - Math.PI / 2 + time * 1.5;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(ba) * 12 * s, cy + Math.sin(ba) * 12 * s);
        ctx.lineTo(cx + Math.cos(ba + 0.5) * 6 * s, cy + Math.sin(ba + 0.5) * 6 * s);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx, cy, 2.8 * s, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'proximity_mine_drone': {
      // Armored Octagonal Mine with 4 Standoff Sensors & Detonator
      ctx.fillStyle = '#380505';
      ctx.beginPath();
      for (let m = 0; m < 8; m++) {
        const ma = (m * Math.PI) / 4;
        const mx = cx + Math.cos(ma) * 9 * s;
        const my = cy + Math.sin(ma) * 9 * s;
        if (m === 0) ctx.moveTo(mx, my); else ctx.lineTo(mx, my);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      for (let sp = 0; sp < 4; sp++) {
        const spa = (sp * Math.PI) / 2 + Math.PI / 4;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(spa) * 9 * s, cy + Math.sin(spa) * 9 * s);
        ctx.lineTo(cx + Math.cos(spa) * 13 * s, cy + Math.sin(spa) * 13 * s);
        ctx.stroke();
      }

      ctx.fillStyle = '#ff5555';
      ctx.beginPath();
      ctx.arc(cx, cy, 3.8 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx, cy, 1.6 * s, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'mirror_deflector_drone': {
      // Diamond Reflector Prism + 4 Orbiting Deflector Shards
      ctx.fillStyle = '#0e244d';
      ctx.beginPath();
      ctx.moveTo(cx, cy - 10 * s);
      ctx.lineTo(cx + 7.5 * s, cy);
      ctx.lineTo(cx, cy + 10 * s);
      ctx.lineTo(cx - 7.5 * s, cy);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      for (let d = 0; d < 4; d++) {
        const da = (d * Math.PI) / 2 + Math.PI / 4 + time * 0.8;
        ctx.fillStyle = baseColor;
        ctx.beginPath();
        ctx.arc(cx + Math.cos(da) * 13 * s, cy + Math.sin(da) * 13 * s, 1.8 * s, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx, cy, 2.3 * s, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'subzero_cryo_drone': {
      // Hexagonal Cryogenic Snowflake Lattice with 6 Frost Spurs
      ctx.fillStyle = '#082f49';
      ctx.beginPath();
      ctx.arc(cx, cy, 7 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      for (let c = 0; c < 6; c++) {
        const ca = (c * Math.PI) / 3;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(ca) * 12 * s, cy + Math.sin(ca) * 12 * s);
        ctx.stroke();

        ctx.fillStyle = baseColor;
        ctx.beginPath();
        ctx.arc(cx + Math.cos(ca) * 9 * s, cy + Math.sin(ca) * 9 * s, 1.6 * s, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx, cy, 2.8 * s, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'tesla_coil_drone': {
      // Tesla Inductor Core with 3 Orbiting Discharge Sparks
      ctx.fillStyle = '#270744';
      ctx.beginPath();
      ctx.arc(cx, cy, 8 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      for (let sn = 0; sn < 3; sn++) {
        const sa = (sn * 2 * Math.PI) / 3 - Math.PI / 2 + time * 1.2;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(cx + Math.cos(sa) * 11 * s, cy + Math.sin(sa) * 11 * s, 2 * s, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = baseColor;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(sa) * 11 * s, cy + Math.sin(sa) * 11 * s);
        ctx.stroke();
      }

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx, cy, 3 * s, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'elemental_buffer_drone': {
      // Prismatic Quad-Elemental Diamond Core with 4 orbiting sparks
      ctx.fillStyle = '#042f2e';
      ctx.beginPath();
      ctx.moveTo(cx, cy - 10 * s);
      ctx.lineTo(cx + 8 * s, cy);
      ctx.lineTo(cx, cy + 10 * s);
      ctx.lineTo(cx - 8 * s, cy);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      const eleColors = ['#10b981', '#fbbf24', '#f97316', '#38bdf8'];
      for (let m = 0; m < 4; m++) {
        const ma = (m * Math.PI) / 2 + time * 0.9;
        ctx.fillStyle = eleColors[m]!;
        ctx.beginPath();
        ctx.arc(cx + Math.cos(ma) * 12 * s, cy + Math.sin(ma) * 12 * s, 1.8 * s, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx, cy, 2.8 * s, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'tactical_buffer_drone': {
      // Hexagonal Aegis Forcefield Shield with 3 Emitters
      ctx.fillStyle = '#451a03';
      ctx.beginPath();
      for (let h = 0; h < 6; h++) {
        const ha = (h * Math.PI) / 3;
        const hx = cx + Math.cos(ha) * 8.5 * s;
        const hy = cy + Math.sin(ha) * 8.5 * s;
        if (h === 0) ctx.moveTo(hx, hy); else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      for (let sa = 0; sa < 3; sa++) {
        const ang = (sa * 2 * Math.PI) / 3 - Math.PI / 2 + time * 0.8;
        ctx.fillStyle = '#fde047';
        ctx.beginPath();
        ctx.arc(cx + Math.cos(ang) * 13 * s, cy + Math.sin(ang) * 13 * s, 1.8 * s, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx, cy, 3 * s, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'scavenger_harvester_drone': {
      // Geometric Emerald Harvester Prism with 3 satellite orbiters
      ctx.fillStyle = '#064e3b';
      ctx.beginPath();
      ctx.arc(cx, cy, 9 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#34d399';
      ctx.beginPath();
      ctx.moveTo(cx, cy - 5 * s);
      ctx.lineTo(cx + 5 * s, cy);
      ctx.lineTo(cx, cy + 5 * s);
      ctx.lineTo(cx - 5 * s, cy);
      ctx.closePath();
      ctx.fill();

      for (let m = 0; m < 3; m++) {
        const ma = (m * 2 * Math.PI) / 3 + time * 1.1;
        ctx.fillStyle = '#a7f3d0';
        ctx.beginPath();
        ctx.arc(cx + Math.cos(ma) * 13 * s, cy + Math.sin(ma) * 13 * s, 1.6 * s, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }

    case 'disruptor_debuffer_drone': {
      // Neon Magenta Entropy Disruptor with dual lateral prongs
      ctx.fillStyle = '#500724';
      ctx.beginPath();
      ctx.moveTo(cx, cy - 8 * s);
      ctx.lineTo(cx + 7 * s, cy + 4 * s);
      ctx.lineTo(cx - 7 * s, cy + 4 * s);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#f472b6';
      ctx.beginPath();
      ctx.arc(cx, cy, 3 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx, cy, 1.5 * s, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#f43f5e';
      ctx.beginPath();
      ctx.moveTo(cx - 8 * s, cy);
      ctx.lineTo(cx - 13 * s, cy + 3 * s);
      ctx.moveTo(cx + 8 * s, cy);
      ctx.lineTo(cx + 13 * s, cy + 3 * s);
      ctx.stroke();
      break;
    }

    default: {
      ctx.fillStyle = '#0c1a2e';
      ctx.beginPath();
      ctx.arc(cx, cy, 10 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx, cy, 3 * s, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
  }

  ctx.restore();
}

/**
 * 6. HERO CLASS WEAPON & PROJECTILE RENDERER
 * Renders the exact procedural projectiles from codex_biblioteca_16_9.html:drawProceduralProjectileFromCode
 * and in-game RenderSystem.ts:lines 860-1420
 */
export function renderStudioHeroClassWeapon(
  ctx: CanvasRenderingContext2D,
  classId: string,
  width: number,
  height: number,
  _time: number,
  isEvolved: boolean = false
) {
  ctx.save();
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = '#05020c';
  ctx.fillRect(0, 0, width, height);

  const cx = width / 2;
  const cy = height / 2;
  // Authentic 16:9 scale factor matching codex_biblioteca_16_9.html: 6.5 at 960x540, 13.0 at 1920x1080
  const s = (Math.min(width, height) / 540) * 6.5;

  let projId = classId.toLowerCase();
  if (projId === 'vanguard' || projId === 'fighter') projId = 'rocket_missile';
  else if (projId === 'interceptor' || projId === 'rogue') projId = 'phase_flechette';
  else if (projId === 'disruptor' || projId === 'mage') projId = 'plasma_vortex';
  else if (projId === 'resonator' || projId === 'bard') projId = 'sonic_shockwave';
  else if (projId === 'bastion' || projId === 'paladin') projId = 'photon_lance';
  else if (projId === 'marksman' || projId === 'ranger') projId = 'kinetic_dart';

  drawProceduralProjectile(ctx, projId, cx, cy, s, isEvolved);

  ctx.restore();
}

/**
 * 6. CLASS AMMUNITION / PROJECTILE RENDERER
 */
/**
 * 6. PROCEDURAL WEAPON PROJECTILES / CLASS AMMUNITIONS
 * Verbatim from in-game RenderSystem.ts and codex_biblioteca_16_9.html:drawProceduralProjectileFromCode
 * Fully supports Base and Evolved (Relic Fusion) states.
 */
export function drawProceduralProjectile(
  ctx: CanvasRenderingContext2D,
  id: string,
  cx: number,
  cy: number,
  scale: number = 4.0,
  isEvolved: boolean = false
) {
  ctx.save();
  const s = scale * (isEvolved ? 1.22 : 1.0);

  switch (id) {
    case 'vanguard':
    case 'rocket_missile':
    case 'fighter': {
      // 1. Fighter / Vanguard: Rocket Missile (Bazooka) -> Evolution: Nuclear Nuke (Radioactive Emerald)
      const mainColor = isEvolved ? '#22c55e' : '#ff3300';
      const glowColor = isEvolved ? '#84cc16' : '#ffaa00';
      const hullFill = isEvolved ? '#05240f' : '#1c0707';

      // Rocket Exhaust Flame
      ctx.fillStyle = glowColor;
      ctx.beginPath();
      ctx.moveTo(cx - 10 * s, cy - 2.5 * s);
      ctx.lineTo(cx - 24 * s, cy);
      ctx.lineTo(cx - 10 * s, cy + 2.5 * s);
      ctx.closePath();
      ctx.fill();

      // Rear Stabilizer Fins
      ctx.fillStyle = mainColor;
      ctx.strokeStyle = glowColor;
      ctx.lineWidth = 1.2 * (s / 4);
      ctx.beginPath();
      ctx.moveTo(cx - 6 * s, cy - 2.5 * s);
      ctx.lineTo(cx - 12 * s, cy - 6.5 * s);
      ctx.lineTo(cx - 8 * s, cy - 2.5 * s);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx - 6 * s, cy + 2.5 * s);
      ctx.lineTo(cx - 12 * s, cy + 6.5 * s);
      ctx.lineTo(cx - 8 * s, cy + 2.5 * s);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Fuselage Body
      ctx.beginPath();
      ctx.moveTo(cx - 10 * s, cy - 3.0 * s);
      ctx.lineTo(cx + 2 * s, cy - 3.0 * s);
      ctx.quadraticCurveTo(cx + 9 * s, cy - 2.8 * s, cx + 15 * s, cy);
      ctx.quadraticCurveTo(cx + 9 * s, cy + 2.8 * s, cx + 2 * s, cy + 3.0 * s);
      ctx.lineTo(cx - 10 * s, cy + 3.0 * s);
      ctx.closePath();
      ctx.fillStyle = hullFill;
      ctx.fill();
      ctx.strokeStyle = mainColor;
      ctx.lineWidth = 1.6 * (s / 4);
      ctx.stroke();

      // Center Core Spine
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.0 * (s / 4);
      ctx.beginPath();
      ctx.moveTo(cx - 7 * s, cy);
      ctx.lineTo(cx + 12 * s, cy);
      ctx.stroke();
      break;
    }
    case 'interceptor':
    case 'phase_flechette':
    case 'rogue': {
      // 2. Rogue / Interceptor: Phase Flechette (Daggers) -> Evolution: Phantom Blades (Spectral Violet & Emerald)
      const waveColor = isEvolved ? 'rgba(52, 211, 153, 0.75)' : 'rgba(0, 240, 255, 0.45)';
      const bladeColor = isEvolved ? '#a855f7' : '#00f0ff';
      const bladeFill = isEvolved ? '#1a062e' : '#031a24';

      // Sinusoidal Phase Wave Trail
      ctx.strokeStyle = waveColor;
      ctx.lineWidth = (isEvolved ? 1.6 : 1.2) * (s / 4);
      ctx.beginPath();
      for (let x = -24; x <= -6; x += 1) {
        const y = Math.sin(x * 0.3) * (isEvolved ? 5.5 : 4) * s;
        if (x === -24) ctx.moveTo(cx + x * s, cy + y);
        else ctx.lineTo(cx + x * s, cy + y);
      }
      ctx.stroke();

      if (isEvolved) {
        // Mirrored Phase Trail for interference resonance
        ctx.beginPath();
        for (let x = -24; x <= -6; x += 1) {
          const y = -Math.sin(x * 0.3) * 5.5 * s;
          if (x === -24) ctx.moveTo(cx + x * s, cy + y);
          else ctx.lineTo(cx + x * s, cy + y);
        }
        ctx.stroke();
      }

      // Faceted Nanomolecular Blade
      ctx.fillStyle = bladeFill;
      ctx.strokeStyle = bladeColor;
      ctx.lineWidth = 1.6 * (s / 4);
      ctx.beginPath();
      ctx.moveTo(cx + 14 * s, cy);
      ctx.lineTo(cx + 1 * s, cy - 5 * s);
      ctx.lineTo(cx - 9 * s, cy - 2.2 * s);
      ctx.lineTo(cx - 4 * s, cy);
      ctx.lineTo(cx - 9 * s, cy + 2.2 * s);
      ctx.lineTo(cx + 1 * s, cy + 5 * s);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Sharp central ridge
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.0 * (s / 4);
      ctx.beginPath();
      ctx.moveTo(cx - 4 * s, cy);
      ctx.lineTo(cx + 13 * s, cy);
      ctx.stroke();
      break;
    }
    case 'disruptor':
    case 'plasma_vortex':
    case 'mage': {
      // 3. Mage / Disruptor: Plasma Vortex (Fireball) -> Evolution: Inferno Meteor (Supernova Stellar Crimson)
      const outerColor = isEvolved ? '#ff0044' : '#ff6600';
      const flareColor = isEvolved ? '#ffaa00' : '#ff0055';
      const coreR = isEvolved ? 10 * s : 7 * s;

      // Outer Toroidal Plasma Ring
      ctx.strokeStyle = outerColor;
      ctx.lineWidth = (isEvolved ? 2.4 : 2.0) * (s / 4);
      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      ctx.stroke();

      // Rotating Coronal Plasma Flares
      const flareCount = isEvolved ? 4 : 3;
      for (let i = 0; i < flareCount; i++) {
        const rot = (i * Math.PI * 2) / flareCount;
        ctx.strokeStyle = i % 2 === 0 ? '#ffffff' : flareColor;
        ctx.lineWidth = 1.6 * (s / 4);
        ctx.beginPath();
        ctx.arc(cx, cy, coreR * 0.72, rot, rot + 1.25);
        ctx.stroke();
      }

      // Central Singularity White-Hot Core
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx, cy, (isEvolved ? 3.5 : 2.5) * s, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case 'marksman':
    case 'kinetic_dart':
    case 'ranger': {
      // 4. Ranger / Marksman: Kinetic Dart (Bow) -> Evolution: Volley Rain (Quantum Tachyon Cyan)
      // Authentic sleek APFSDS tungsten flechette penetrator sabot (NO medieval arrow feathers!)
      const strokeColor = isEvolved ? '#00f0ff' : '#ffcc00';
      const glowColor = isEvolved ? '#38bdf8' : '#ffaa00';
      const fillColor = isEvolved ? '#031a24' : '#1c1404';

      // Mach Shock Glow
      ctx.strokeStyle = glowColor;
      ctx.lineWidth = 2.4 * (s / 4);
      ctx.beginPath();
      ctx.moveTo(cx - 11 * s, cy - 2.0 * s);
      ctx.lineTo(cx + 8 * s, cy - 2.0 * s);
      ctx.lineTo(cx + 15 * s, cy);
      ctx.lineTo(cx + 8 * s, cy + 2.0 * s);
      ctx.lineTo(cx - 11 * s, cy + 2.0 * s);
      ctx.closePath();
      ctx.stroke();

      // Slender Tungsten APFSDS Hull Fill & Outline
      ctx.fillStyle = fillColor;
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1.4 * (s / 4);
      ctx.beginPath();
      ctx.moveTo(cx - 10 * s, cy - 1.5 * s);
      ctx.lineTo(cx + 8 * s, cy - 1.5 * s);
      ctx.lineTo(cx + 14 * s, cy);
      ctx.lineTo(cx + 8 * s, cy + 1.5 * s);
      ctx.lineTo(cx - 10 * s, cy + 1.5 * s);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Pure White-Hot Kinetic Spine
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.0 * (s / 4);
      ctx.beginPath();
      ctx.moveTo(cx - 9 * s, cy);
      ctx.lineTo(cx + 13 * s, cy);
      ctx.stroke();
      break;
    }
    case 'bastion':
    case 'photon_lance':
    case 'paladin': {
      // 5. Paladin / Bastion: Photon Lance (Holy Beam) -> Evolution: Prismatic Laser (Cyan with Magenta Refraction)
      const beamColor = isEvolved ? '#00ffff' : '#ffd700';
      const coronaColor = isEvolved ? '#d946ef' : 'rgba(255, 215, 0, 0.4)';
      const beamThickness = (isEvolved ? 5.5 : 4.0) * (s / 4);

      // Collimated Ray Outer Halo
      ctx.strokeStyle = coronaColor;
      ctx.lineWidth = beamThickness;
      ctx.beginPath();
      ctx.moveTo(cx - 24 * s, cy);
      ctx.lineTo(cx + 24 * s, cy);
      ctx.stroke();

      // Diamond Prism Head
      ctx.fillStyle = isEvolved ? '#2e0838' : '#ffffff';
      ctx.strokeStyle = beamColor;
      ctx.lineWidth = 1.6 * (s / 4);
      ctx.beginPath();
      ctx.moveTo(cx + 20 * s, cy);
      ctx.lineTo(cx + 13 * s, cy - 4.5 * s);
      ctx.lineTo(cx + 6 * s, cy);
      ctx.lineTo(cx + 13 * s, cy + 4.5 * s);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Inner Laser Core Ray
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = (isEvolved ? 2.2 : 1.8) * (s / 4);
      ctx.beginPath();
      ctx.moveTo(cx - 24 * s, cy);
      ctx.lineTo(cx + 19 * s, cy);
      ctx.stroke();
      break;
    }
    case 'resonator':
    case 'sonic_shockwave':
    case 'bard': {
      // 6. Bard / Resonator: Sonic Shockwave (Harmonic Pulse) -> Evolution: Symphonic Nova (Hyper-Sonic Cyan & Gold)
      const waveColor = isEvolved ? '#00f0ff' : '#d946ef';
      const nodeColor = isEvolved ? '#ffd700' : '#ff00ff';
      const waveCount = isEvolved ? 4 : 3;

      for (let i = 1; i <= waveCount; i++) {
        ctx.strokeStyle = i === waveCount && isEvolved ? '#ffd700' : waveColor;
        ctx.lineWidth = (isEvolved ? 2.2 : 2.0) * (s / 4);
        ctx.beginPath();
        ctx.arc(cx - 2 * s, cy, i * 4 * s, -Math.PI * 0.55, Math.PI * 0.55);
        ctx.stroke();
      }

      // Central Harmonic Resonator Node
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = nodeColor;
      ctx.lineWidth = 1.6 * (s / 4);
      ctx.beginPath();
      ctx.arc(cx + 4 * s, cy, (isEvolved ? 3.6 : 3.0) * s, 0, Math.PI * 2);
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

export interface BiomeAuraInfo {
  id: string;
  namePt: string;
  nameEn: string;
  colorHex: string;
  colorNumber: number;
  haloColor: number;
  coreColor: number;
  bonusPt: string;
  geomPt: string;
  lorePt: string;
}

export const BIOME_AURAS_DATA: BiomeAuraInfo[] = [
  {
    id: 'normal',
    namePt: 'Aura da Floresta Quântica',
    nameEn: 'Quantum Forest Aura',
    colorHex: '#00ff66',
    colorNumber: 0x00ff66,
    haloColor: 0x10b981,
    coreColor: 0x34d399,
    bonusPt: 'SIFÃO VITAL & ESCUDO DE ESPOROS: +12.0 HP/s DE CURA E -40% DANO SOFRIDO!',
    geomPt: 'Anel névoa esmeralda (largura 22px) + Anel core mint com filamento branco + Anel de vinhas interior (R-10) + 6 folhas em diamante com veios + 8 esporos bio-sintéticos em contra-rotação.',
    lorePt: 'Ativada nas plataformas bio-quânticas. Restaura a integridade estrutural e sela microfissuras da nave.'
  },
  {
    id: 'magma',
    namePt: 'Aura Vulcânica Incandescente',
    nameEn: 'Incandescent Volcanic Aura',
    colorHex: '#ff4400',
    colorNumber: 0xff4400,
    haloColor: 0xff4400,
    coreColor: 0xffea00,
    bonusPt: 'SOBRECARGA DE CHAMAS ATÔMICAS: +60% DANO GLOBAL EM TODAS AS ARMAS E MAGIAS!',
    geomPt: 'Halo térmico de 25px + 12 línguas de fogo vetoriais pontiagudas (Vector Flame Sickles) com cauda pulsante (18+sin*8) + Núcleo de labareda dourada + Anel de contenção magmática + 6 faíscas ejetadas.',
    lorePt: 'Forjada em plataformas de magma condensado. Infunde ogivas e lasers com plasma térmico hiperconcentrado.'
  },
  {
    id: 'ice',
    namePt: 'Aura Criogênica SubZero',
    nameEn: 'SubZero Cryogenic Aura',
    colorHex: '#00ffff',
    colorNumber: 0x00ffff,
    haloColor: 0x00ffff,
    coreColor: 0x00e5ff,
    bonusPt: 'ESTASE CRIOGÊNICA TOTAL: +50% CADÊNCIA DE TIRO E CAMPO DE ESTASE DE GELO!',
    geomPt: 'Halo glacial de 25px + 6 Flocos de Neve Hexagonais Facetados orbitando em R=86px (com 6 ramificações e espículas em 45°) + Anel de gelo periwinkle com filamento branco puro.',
    lorePt: 'Resfriamento supercondutor instantâneo que acelera a ignição de disparos e retarda matéria hostil.'
  },
  {
    id: 'electric',
    namePt: 'Aura Voltaica Megawatt',
    nameEn: 'Megawatt Voltaic Aura',
    colorHex: '#ffea00',
    colorNumber: 0xffea00,
    haloColor: 0xffea00,
    coreColor: 0xffffff,
    bonusPt: 'SUPERCONDUÇÃO VOLTAICA: 3.0x REGENERAÇÃO DE MANA E DESCARGAS ELÉTRICAS!',
    geomPt: 'Halo ambiente de 20px + Anel de Arco Voltaico de alta velocidade oscilando com 24 pontos estocásticos com jitter senoidal duplo + 4 Capacitores Tesla com descargas e faíscas para fora.',
    lorePt: 'Rede de condensadores de alta voltagem. Conduz surtos de elétrons para aniquilar escudos cibernéticos.'
  },
  {
    id: 'void',
    namePt: 'Aura Singulárica do Vazio',
    nameEn: 'Singular Void Aura',
    colorHex: '#a000ff',
    colorNumber: 0xa000ff,
    haloColor: 0x581c87,
    coreColor: 0xa000ff,
    bonusPt: 'FENDA TEMPORAL & ÍMÃ ABSOLUTO: -45% COOLDOWNS E ATRAÇÃO DE 100% DOS DROPS!',
    geomPt: 'Halo do Horizonte de Eventos + Anel gravitacional duplo + 2 Braços Espirais de Sucção de Arquimedes (Archimedean Suction Spirals) com fio dorsal branco + 6 partículas sugadas para a fenda.',
    lorePt: 'Dobra o tecido do hiperespaço local, colapsando o tempo de recarga e canalizando todos os recursos caídos.'
  },
  {
    id: 'overcharged',
    namePt: 'Aura de Reator Sobrecarregado',
    nameEn: 'Overcharged Reactor Aura',
    colorHex: '#ffaa00',
    colorNumber: 0xffaa00,
    haloColor: 0xef4444,
    coreColor: 0xfef08a,
    bonusPt: 'ANIQUILAÇÃO CRÍTICA & HIPER-XP: 3.0x EXP, +40% CHANCE CRÍTICA E 2.0x DANO CRÍTICO!',
    geomPt: 'Halo de contenção de plasma + 2 Pentágonos Concorrentes Contra-Rotativos (externo R=86px horário, interno R=0.80 anti-horário) + 5 Nodos Capacitores de Descarga Vermelhos nos vértices.',
    lorePt: 'Libera o limitador do reator de fissão quântica para amplificação geométrica de dano crítico.'
  },
  {
    id: 'chronos',
    namePt: 'Aura Temporal de Chronos',
    nameEn: 'Chronos Temporal Aura',
    colorHex: '#ffd700',
    colorNumber: 0xffd700,
    haloColor: 0xeab308,
    coreColor: 0xffd700,
    bonusPt: 'DOMO CHRONOS & ESQUIVA ABSOLUTA: +40% ESQUIVA E DESACELERAÇÃO DE PROJÉTEIS INIMIGOS!',
    geomPt: 'Halo de bisel dourado + Anel mostrador + 12 Marcadores de Horas do Relógio Cósmico (cardeais brancos longos de 13px) + Ponteiro Táquion de alta velocidade + Orbe Temporal Chronos orbitando.',
    lorePt: 'Cria uma bolha temporal local onde disparos inimigos desaceleram e manobras evasivas tornam-se imperceptíveis.'
  },
  {
    id: 'cyber_grid',
    namePt: 'Aura Cibernética Neon',
    nameEn: 'Neon Cybernetic Aura',
    colorHex: '#ff00aa',
    colorNumber: 0xff00aa,
    haloColor: 0x00f0ff,
    coreColor: 0xff00aa,
    bonusPt: 'DISPARO QUÂNTICO PERFURANTE: PERFURAÇÃO INFINITA E +75% DANO DE RICOCHETE!',
    geomPt: '4 Suportes de Mira HUD segmentados em ciano + 8 Nodos de Telemetria de Dados + Hipercubo 3D Real Wireframe girando em 3 eixos (rotX, rotY, rotZ) no centro com 12 arestas e 8 vértices brilhantes.',
    lorePt: 'Interliga o vetor de disparo com a malha computacional central para perfurar qualquer barreira.'
  },
  {
    id: 'solar_flare',
    namePt: 'Aura Solar Incandescente',
    nameEn: 'Incandescent Solar Aura',
    colorHex: '#ff0055',
    colorNumber: 0xff0055,
    haloColor: 0xf59e0b,
    coreColor: 0xffea00,
    bonusPt: 'PULSO RADIATIVO INCANDESCENTE: CORONA SOLAR DE 100 DANO TÉRMICO/S EM ÁREA!',
    geomPt: 'Halo corona suave + 12 Proeminências Solares Dinâmicas com comprimento pulsante (14+sin*9) alternando amarelo e carmesim + Anel corona com filamento branco incandescente.',
    lorePt: 'Incinerador radioativo contínuo que desintegra inimigos menores ao redor do casco do caça.'
  },
  {
    id: 'crystal_prism',
    namePt: 'Aura Prismática Cortante',
    nameEn: 'Prismatic Cutting Aura',
    colorHex: '#e25cff',
    colorNumber: 0xe25cff,
    haloColor: 0x06b6d4,
    coreColor: 0xe25cff,
    bonusPt: 'REFRAÇÃO DEVASTADORA: +100% DANO CRÍTICO E DISPAROS ADICIONAIS REFRATADOS!',
    geomPt: 'Halo de refração ciano + Anel facetado magenta com núcleo branco + 6 Cristais Prismáticos em Losango (Rhombus) orbitando em R=86px com preenchimento translúcido e linha de refração interna.',
    lorePt: 'Prismas ópticos de precisão que refratam qualquer feixe disparado em múltiplos ângulos de abate.'
  },
  {
    id: 'abyssal',
    namePt: 'Aura do Miasma Abissal',
    nameEn: 'Abyssal Miasma Aura',
    colorHex: '#38bdf8',
    colorNumber: 0x38bdf8,
    haloColor: 0x581c87,
    coreColor: 0x38bdf8,
    bonusPt: 'DANO VERDADEIRO & SIFÃO CINÉTICO: +50% DANO VERDADEIRO E +5 HP / +10 EN POR ABATE!',
    geomPt: 'Halo do abismo profundo + Anel de Tentáculos Fluidos Ondulatórios com 6 lóbulos bio-cinéticos ondulando em onda senoidal (waveAmp = 8+sin*3.5) + Filamento branco + 6 Nodos de Miasma roxos/brancos.',
    lorePt: 'Canalização da matéria escura das profundezas do cosmos. Converte a destruição de alvos em sobrevivência.'
  }
];

/**
 * Real-time 60 FPS Procedural Biome Aura Showcase Renderer
 * Verbatim recreation of RenderSystem.ts:lines 4778-5365 & codex_auras_biomas.html
 */
export function renderStudioBiomeAura(
  ctx: CanvasRenderingContext2D,
  biomeId: string,
  width: number,
  height: number,
  time: number
) {
  ctx.save();
  ctx.clearRect(0, 0, width, height);

  // Deep space canvas background
  ctx.fillStyle = '#030109';
  ctx.fillRect(0, 0, width, height);

  const cx = width / 2;
  const cy = height / 2;

  // Responsive scaling: Base 1080p -> s = 2.4, R = 206px. Scales smoothly to card size or 1080p
  const scaleRef = Math.min(width / 1920, height / 1080);
  const s = Math.max(0.35, 2.4 * scaleRef);
  const R = 86 * s;

  const aura = BIOME_AURAS_DATA.find((a) => a.id === biomeId) || BIOME_AURAS_DATA[0]!;

  // 1. Draw Platform Rail & Hazard Platform Stripes
  const platY = cy + 120 * s;
  ctx.fillStyle = '#060d1a';
  ctx.fillRect(0, platY, width, height - platY);

  // Top Hazard Rail
  ctx.strokeStyle = '#00f0ff';
  ctx.lineWidth = Math.max(1, 3.5 * scaleRef);
  ctx.beginPath();
  ctx.moveTo(0, platY);
  ctx.lineTo(width, platY);
  ctx.stroke();

  // Hazard Stripes
  ctx.fillStyle = 'rgba(0, 240, 255, 0.22)';
  const stripeStep = Math.max(14, 40 * scaleRef);
  for (let x = 0; x < width; x += stripeStep) {
    ctx.beginPath();
    ctx.moveTo(x, platY);
    ctx.lineTo(x + 22 * scaleRef, platY + 28 * scaleRef);
    ctx.lineTo(x + 10 * scaleRef, platY + 28 * scaleRef);
    ctx.lineTo(x - 12 * scaleRef, platY);
    ctx.closePath();
    ctx.fill();
  }

  // 2. Translucent Radial Gradient Background
  const grad = ctx.createRadialGradient(cx, cy, 20 * scaleRef, cx, cy, R * 1.25);
  grad.addColorStop(0, `${aura.colorHex}33`);
  grad.addColorStop(0.5, `${aura.colorHex}15`);
  grad.addColorStop(1, 'transparent');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(cx, cy, R * 1.25, 0, Math.PI * 2);
  ctx.fill();

  // 3. Render Aura Geometric Components by Type
  ctx.save();
  switch (aura.id) {
    case 'normal': {
      // Emerald Mist Ring
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.18)';
      ctx.lineWidth = 22 * s;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();

      // Mint Core Ring + White Filament
      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 2.8 * s;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.0 * s;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();

      // Inner Vine Filament Ring
      ctx.strokeStyle = 'rgba(5, 150, 105, 0.55)';
      ctx.lineWidth = 1.6 * s;
      ctx.beginPath(); ctx.arc(cx, cy, R - 10 * s, 0, Math.PI * 2); ctx.stroke();

      // 6 Orbiting Emerald Diamond Leaves
      for (let i = 0; i < 6; i++) {
        const angle = time * 1.6 + (i * Math.PI) / 3;
        const lx = cx + Math.cos(angle) * R;
        const ly = cy + Math.sin(angle) * R;
        ctx.fillStyle = '#00ff66';
        ctx.beginPath();
        ctx.moveTo(lx, ly - 8 * s);
        ctx.lineTo(lx + 8 * s, ly);
        ctx.lineTo(lx, ly + 8 * s);
        ctx.lineTo(lx - 8 * s, ly);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.2 * s;
        ctx.beginPath();
        ctx.moveTo(lx, ly - 7 * s);
        ctx.lineTo(lx, ly + 7 * s);
        ctx.stroke();
      }

      // Orbiting Bio-Spore Motes
      for (let sp = 0; sp < 8; sp++) {
        const sAng = -time * 2.2 + (sp * Math.PI) / 4;
        const sDist = R + Math.sin(time * 3 + sp) * 6 * s;
        const sx = cx + Math.cos(sAng) * sDist;
        const sy = cy + Math.sin(sAng) * sDist;
        ctx.fillStyle = '#6ee7b7';
        ctx.beginPath();
        ctx.arc(sx, sy, 2.4 * s, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }

    case 'magma': {
      const rot = time * 1.6;
      ctx.strokeStyle = 'rgba(255, 68, 0, 0.16)';
      ctx.lineWidth = 25 * s;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();

      const numFlames = 12;
      for (let i = 0; i < numFlames; i++) {
        const fa = rot + (i * Math.PI * 2) / numFlames;
        const flameLen = (18 + Math.sin(time * 8 + i * 2) * 8) * s;
        const p0x = cx + Math.cos(fa - 0.12) * (R - 10 * s);
        const p0y = cy + Math.sin(fa - 0.12) * (R - 10 * s);
        const p1x = cx + Math.cos(fa + 0.22) * (R + flameLen);
        const p1y = cy + Math.sin(fa + 0.22) * (R + flameLen);
        const p2x = cx + Math.cos(fa + 0.12) * (R - 10 * s);
        const p2y = cy + Math.sin(fa + 0.12) * (R - 10 * s);

        ctx.fillStyle = i % 2 === 0 ? '#ff3300' : '#ff7700';
        ctx.beginPath();
        ctx.moveTo(p0x, p0y); ctx.lineTo(p1x, p1y); ctx.lineTo(p2x, p2y);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#ffea00';
        ctx.beginPath();
        ctx.moveTo(p0x, p0y);
        ctx.lineTo(cx + Math.cos(fa + 0.18) * (R + flameLen * 0.65), cy + Math.sin(fa + 0.18) * (R + flameLen * 0.65));
        ctx.lineTo(p2x, p2y);
        ctx.closePath();
        ctx.fill();
      }

      ctx.strokeStyle = '#ff4400';
      ctx.lineWidth = 2.4 * s;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 0.9 * s;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();

      for (let f = 0; f < 6; f++) {
        const fa = -time * 3 + f * 1.3;
        const fd = R + 14 * s + Math.sin(time * 5 + f) * 16 * s;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(cx + Math.cos(fa) * fd, cy + Math.sin(fa) * fd, 2.0 * s, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }

    case 'ice': {
      const rot = time * 0.45;
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.15)';
      ctx.lineWidth = 25 * s;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();

      for (let i = 0; i < 6; i++) {
        const fa = rot + (i * Math.PI) / 3;
        const fx = cx + Math.cos(fa) * R;
        const fy = cy + Math.sin(fa) * R;
        const snowRot = time * 1.2 + i;

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.4 * s;

        for (let b = 0; b < 6; b++) {
          const ba = snowRot + (b * Math.PI) / 3;
          const bx = fx + Math.cos(ba) * 11 * s;
          const by = fy + Math.sin(ba) * 11 * s;
          ctx.beginPath(); ctx.moveTo(fx, fy); ctx.lineTo(bx, by); ctx.stroke();

          const spX = fx + Math.cos(ba) * 6 * s;
          const spY = fy + Math.sin(ba) * 6 * s;
          const s1 = ba + Math.PI / 4;
          const s2 = ba - Math.PI / 4;
          ctx.beginPath(); ctx.moveTo(spX, spY); ctx.lineTo(spX + Math.cos(s1) * 4 * s, spY + Math.sin(s1) * 4 * s); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(spX, spY); ctx.lineTo(spX + Math.cos(s2) * 4 * s, spY + Math.sin(s2) * 4 * s); ctx.stroke();
        }

        ctx.fillStyle = '#00e5ff';
        ctx.beginPath(); ctx.arc(fx, fy, 2.8 * s, 0, Math.PI * 2); ctx.fill();
      }

      ctx.strokeStyle = '#00e5ff';
      ctx.lineWidth = 2.2 * s;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 0.9 * s;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
      break;
    }

    case 'electric': {
      ctx.strokeStyle = 'rgba(255, 234, 0, 0.18)';
      ctx.lineWidth = 20 * s;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();

      const arcPoints = 24;
      ctx.strokeStyle = '#ffea00';
      ctx.lineWidth = 2.2 * s;
      ctx.beginPath();
      for (let p = 0; p <= arcPoints; p++) {
        const pa = (p * Math.PI * 2) / arcPoints;
        const jitter = (Math.sin(time * 25 + p * 7) * 0.5 + Math.cos(time * 35 + p * 13) * 0.5) * 8 * s;
        const px = cx + Math.cos(pa) * (R + jitter);
        const py = cy + Math.sin(pa) * (R + jitter);
        if (p === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 0.9 * s;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();

      for (let c = 0; c < 4; c++) {
        const ca = time * 2.5 + (c * Math.PI) / 2;
        const cpx = cx + Math.cos(ca) * R;
        const cpy = cy + Math.sin(ca) * R;

        ctx.fillStyle = '#ffffff';
        ctx.beginPath(); ctx.arc(cpx, cpy, 3.8 * s, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#ffea00';
        ctx.lineWidth = 1.6 * s;
        ctx.beginPath(); ctx.arc(cpx, cpy, 3.8 * s, 0, Math.PI * 2); ctx.stroke();

        const sparkLen = (14 + Math.sin(time * 40 + c) * 6) * s;
        ctx.beginPath();
        ctx.moveTo(cpx, cpy);
        ctx.lineTo(cx + Math.cos(ca) * (R + sparkLen), cy + Math.sin(ca) * (R + sparkLen));
        ctx.stroke();
      }
      break;
    }

    case 'void': {
      const rotSpeed = -time * 2.8;
      const totalTurns = 2.0;
      const maxTheta = totalTurns * Math.PI * 2;
      const minR = 14 * s;
      const maxR = R;
      const kSlope = (maxR - minR) / maxTheta;
      const steps = 90;

      ctx.strokeStyle = 'rgba(88, 28, 135, 0.28)';
      ctx.lineWidth = 18 * s;
      ctx.beginPath(); ctx.arc(cx, cy, maxR, 0, Math.PI * 2); ctx.stroke();
      ctx.strokeStyle = '#a000ff';
      ctx.lineWidth = 2.6 * s;
      ctx.beginPath(); ctx.arc(cx, cy, maxR, 0, Math.PI * 2); ctx.stroke();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 0.9 * s;
      ctx.beginPath(); ctx.arc(cx, cy, maxR, 0, Math.PI * 2); ctx.stroke();

      for (let arm = 0; arm < 2; arm++) {
        const phase = arm * Math.PI;

        ctx.strokeStyle = '#a000ff';
        ctx.lineWidth = 2.4 * s;
        ctx.beginPath();
        for (let st = 0; st <= steps; st++) {
          const theta = (st / steps) * maxTheta;
          const rad = minR + kSlope * theta;
          const ang = rotSpeed + theta + phase;
          const px = cx + Math.cos(ang) * rad;
          const py = cy + Math.sin(ang) * rad;
          if (st === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.stroke();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.lineWidth = 0.9 * s;
        ctx.beginPath();
        for (let st = 0; st <= steps; st++) {
          const theta = (st / steps) * maxTheta;
          const rad = minR + kSlope * theta;
          const ang = rotSpeed + theta + phase;
          const px = cx + Math.cos(ang) * rad;
          const py = cy + Math.sin(ang) * rad;
          if (st === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

      for (let p = 0; p < 6; p++) {
        const frac = ((time * 0.8 + p * 0.16) % 1);
        const rad = maxR - frac * (maxR - minR);
        const ang = rotSpeed + frac * maxTheta + (p % 2 === 0 ? 0 : Math.PI);
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(cx + Math.cos(ang) * rad, cy + Math.sin(ang) * rad, 2.4 * s, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }

    case 'overcharged': {
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.25)';
      ctx.lineWidth = 20 * s;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();

      ctx.strokeStyle = '#ffaa00';
      ctx.lineWidth = 2.6 * s;
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const pa = -time * 1.5 + (i * 2 * Math.PI) / 5;
        const px = cx + Math.cos(pa) * R;
        const py = cy + Math.sin(pa) * R;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 0.9 * s;
      ctx.stroke();

      const inR = R * 0.80;
      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 1.8 * s;
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const pa = time * 2.0 + (i * 2 * Math.PI) / 5;
        const px = cx + Math.cos(pa) * inR;
        const py = cy + Math.sin(pa) * inR;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();

      for (let i = 0; i < 5; i++) {
        const pa = -time * 1.5 + (i * 2 * Math.PI) / 5;
        const nx = cx + Math.cos(pa) * R;
        const ny = cy + Math.sin(pa) * R;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath(); ctx.arc(nx, ny, 3.8 * s, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1.8 * s;
        ctx.beginPath(); ctx.arc(nx, ny, 3.8 * s, 0, Math.PI * 2); ctx.stroke();
      }
      break;
    }

    case 'chronos': {
      ctx.strokeStyle = 'rgba(234, 179, 8, 0.22)';
      ctx.lineWidth = 18 * s;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();

      ctx.strokeStyle = '#ffd700';
      ctx.lineWidth = 2.4 * s;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 0.9 * s;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();

      for (let i = 0; i < 12; i++) {
        const ta = (i * Math.PI) / 6;
        const isCardinal = i % 3 === 0;
        const tLen = (isCardinal ? 13 : 7) * s;
        const x1 = cx + Math.cos(ta) * (R - tLen);
        const y1 = cy + Math.sin(ta) * (R - tLen);
        const x2 = cx + Math.cos(ta) * (R + tLen);
        const y2 = cy + Math.sin(ta) * (R + tLen);
        ctx.strokeStyle = isCardinal ? '#ffffff' : '#ffd700';
        ctx.lineWidth = (isCardinal ? 2.4 : 1.4) * s;
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
      }

      const handAngle = time * 2.8;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.4 * s;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(handAngle) * (R - 16 * s), cy + Math.sin(handAngle) * (R - 16 * s));
      ctx.stroke();

      const ox = cx + Math.cos(-time * 1.2) * R;
      const oy = cy + Math.sin(-time * 1.2) * R;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath(); ctx.arc(ox, oy, 4.2 * s, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#ffd700';
      ctx.lineWidth = 1.8 * s;
      ctx.beginPath(); ctx.arc(ox, oy, 4.2 * s, 0, Math.PI * 2); ctx.stroke();
      break;
    }

    case 'cyber_grid': {
      const bracketRot = time * 1.0;
      const bracketSpan = Math.PI * 0.32;
      for (let b = 0; b < 4; b++) {
        const bAng = bracketRot + (b * Math.PI) / 2;
        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = 3.2 * s;
        ctx.beginPath();
        ctx.arc(cx, cy, R, bAng - bracketSpan * 0.5, bAng + bracketSpan * 0.5);
        ctx.stroke();
      }

      for (let d = 0; d < 8; d++) {
        const da = -time * 1.8 + (d * Math.PI) / 4;
        ctx.fillStyle = '#00f0ff';
        ctx.beginPath();
        ctx.arc(cx + Math.cos(da) * R, cy + Math.sin(da) * R, 2.6 * s, 0, Math.PI * 2);
        ctx.fill();
      }

      const cubeS = 42 * s;
      const rawVertices = [
        [-cubeS, -cubeS, -cubeS], [ cubeS, -cubeS, -cubeS], [ cubeS,  cubeS, -cubeS], [-cubeS,  cubeS, -cubeS],
        [-cubeS, -cubeS,  cubeS], [ cubeS, -cubeS,  cubeS], [ cubeS,  cubeS,  cubeS], [-cubeS,  cubeS,  cubeS]
      ];
      const cubeEdges = [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7]
      ];

      const rotX = time * 0.9;
      const rotY = time * 1.4;
      const rotZ = time * 0.6;
      const cxX = Math.cos(rotX), sxX = Math.sin(rotX);
      const cxY = Math.cos(rotY), sxY = Math.sin(rotY);
      const cxZ = Math.cos(rotZ), sxZ = Math.sin(rotZ);

      const proj = rawVertices.map(([vx, vy, vz]) => {
        const y1 = vy * cxX - vz * sxX;
        const z1 = vy * sxX + vz * cxX;
        const x2 = vx * cxY + z1 * sxY;
        const x3 = x2 * cxZ - y1 * sxZ;
        const y3 = x2 * sxZ + y1 * cxZ;
        return { x: cx + x3, y: cy + y3 };
      });

      ctx.strokeStyle = '#ff00aa';
      ctx.lineWidth = 1.8 * s;
      for (const [i1, i2] of cubeEdges) {
        const p1 = proj[i1]!;
        const p2 = proj[i2]!;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }

      for (const p of proj) {
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.4 * s, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }

    case 'solar_flare': {
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.22)';
      ctx.lineWidth = 20 * s;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();

      for (let i = 0; i < 12; i++) {
        const fa = time * 1.4 + (i * Math.PI) / 6;
        const rayLen = (14 + Math.sin(time * 8 + i) * 9) * s;
        const x1 = cx + Math.cos(fa) * (R - 5 * s);
        const y1 = cy + Math.sin(fa) * (R - 5 * s);
        const x2 = cx + Math.cos(fa) * (R + rayLen);
        const y2 = cy + Math.sin(fa) * (R + rayLen);

        ctx.strokeStyle = i % 2 === 0 ? '#ffea00' : '#ff0055';
        ctx.lineWidth = 2.4 * s;
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
      }

      ctx.strokeStyle = '#ff0055';
      ctx.lineWidth = 2.6 * s;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 0.9 * s;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
      break;
    }

    case 'crystal_prism': {
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.22)';
      ctx.lineWidth = 18 * s;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
      ctx.strokeStyle = '#e25cff';
      ctx.lineWidth = 2.4 * s;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 0.9 * s;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();

      for (let i = 0; i < 6; i++) {
        const pa = time * 1.8 + (i * Math.PI) / 3;
        const px = cx + Math.cos(pa) * R;
        const py = cy + Math.sin(pa) * R;
        const rotPrism = pa + Math.PI / 2;

        const cosP = Math.cos(rotPrism);
        const sinP = Math.sin(rotPrism);
        const rP = (lx: number, ly: number) => ({
          x: px + (lx * cosP - ly * sinP) * s,
          y: py + (lx * sinP + ly * cosP) * s
        });

        const pTop = rP(0, -13);
        const pRight = rP(8, 0);
        const pBottom = rP(0, 13);
        const pLeft = rP(-8, 0);

        ctx.fillStyle = 'rgba(226, 92, 255, 0.50)';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5 * s;
        ctx.beginPath();
        ctx.moveTo(pTop.x, pTop.y);
        ctx.lineTo(pRight.x, pRight.y);
        ctx.lineTo(pBottom.x, pBottom.y);
        ctx.lineTo(pLeft.x, pLeft.y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.2 * s;
        ctx.beginPath(); ctx.moveTo(pLeft.x, pLeft.y); ctx.lineTo(pRight.x, pRight.y); ctx.stroke();
      }
      break;
    }

    case 'abyssal': {
      const waveCount = 6;
      const waveAmp = (8 + Math.sin(time * 3.0) * 3.5) * s;
      const totalSteps = 72;

      ctx.strokeStyle = 'rgba(88, 28, 135, 0.28)';
      ctx.lineWidth = 22 * s;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();

      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.6 * s;
      ctx.beginPath();
      for (let k = 0; k <= totalSteps; k++) {
        const rad = (k * Math.PI * 2) / totalSteps;
        const wave = Math.sin(time * 4.5 + rad * waveCount) * waveAmp;
        const px = cx + Math.cos(rad) * (R + wave);
        const py = cy + Math.sin(rad) * (R + wave);
        if (k === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 0.9 * s;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();

      for (let m = 0; m < 6; m++) {
        const ma = -time * 2.0 + (m * Math.PI) / 3;
        const mx = cx + Math.cos(ma) * R;
        const my = cy + Math.sin(ma) * R;
        ctx.fillStyle = '#a855f7';
        ctx.beginPath(); ctx.arc(mx, my, 3.4 * s, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.beginPath(); ctx.arc(mx, my, 1.3 * s, 0, Math.PI * 2); ctx.fill();
      }
      break;
    }
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
    const rawId = type.replace('aura_', '');
    renderStudioBiomeAura(ctx, rawId, width, height, time);
    ctx.restore();
    return;
  } else if (type.startsWith('scenario_') || type.startsWith('biome_platform_')) {
    const rawId = type.replace('scenario_', '').replace('biome_platform_', '');
    renderStudioBiomeScenario(ctx, rawId, width, height, time, 'single');
    ctx.restore();
    return;
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

/**
 * 8. BIOME SCENARIOS & PROCEDURAL PLATFORMS (Directly from RenderSystem.ts:lines 2518–4500)
 */
export interface BiomeScenarioData {
  id: string;
  namePt: string;
  nameEn: string;
  colorHex: string;
  colorNumber: number;
  drag: string;
  speed: string;
  cooldown: string;
  dot: string;
  desc: string;
  platformDetail: string;
  lorePt: string;
  codeRef: string;
}

export const BIOME_SCENARIOS_DATA: BiomeScenarioData[] = [
  {
    id: 'normal',
    namePt: 'Floresta Quântica',
    nameEn: 'Forest Canopy',
    colorHex: '#00ff66',
    colorNumber: 0x00ff66,
    drag: '0.88',
    speed: '+10% (1.10x)',
    cooldown: '-10% (0.90x)',
    dot: '+3.0 HP/s Regeneração',
    desc: 'Atmosfera em 6 faixas de gradiente, lua geométrica com auréolas esmeralda, raios de luz divinos (God Rays), cordilheira distante, colinas e 9 árvores geométricas procedurais oscilando com o vento.',
    platformDetail: 'Trilhos neon esmeralda, chanfros modulares de 80px, vinco longitudinal central e faixas diagonais de advertência a 45°.',
    lorePt: 'O dossel botânico quântico gera oxigenação taquiônica pura. Restaura a blindagem e melhora a manobrabilidade dos caças.',
    codeRef: 'RenderSystem.ts:lines 2562-2682 & 4207-4484'
  },
  {
    id: 'ice',
    namePt: 'Criogênico SubZero',
    nameEn: 'SubZero Ice Tundra',
    colorHex: '#00f0ff',
    colorNumber: 0x00f0ff,
    drag: '0.97 (Escorregadio)',
    speed: '+30% (1.30x)',
    cooldown: '+25% (1.25x lentidão)',
    dot: 'Estase Inimiga',
    desc: 'Nevasca contínua com flocos de neve hexagonais facetados com 6 braços e ramificações duplas a 45°, anel interno e poeira de gelo brilhante.',
    platformDetail: 'Superfície de gelo periwinkle com reflexos cristalinos brancos em corte chanfrado a 45° e trilhos de perigo ciano.',
    lorePt: 'Temperaturas próximas do zero absoluto criam supercondutividade de momento inercial. Alta velocidade com atrito mínimo.',
    codeRef: 'RenderSystem.ts:lines 2682-2758'
  },
  {
    id: 'magma',
    namePt: 'Vulcânico Incandescente',
    nameEn: 'Incandescent Volcanic Magma',
    colorHex: '#ff3300',
    colorNumber: 0xff3300,
    drag: '0.88',
    speed: '1.00x',
    cooldown: '1.00x',
    dot: '-3.0 HP/s Dano Térmico',
    desc: 'Chamas em curvas de Bézier quádruplas em 3 passagens (vermelho 0xd03000, laranja 0xff7700 e núcleo amarelo 0xffdd00) subindo da base e descendo do topo, com brasas em diamante.',
    platformDetail: 'Condutos magmáticos pulsantes no corpo metálico da plataforma com pulsação senoidal (0.45 a 0.60 alpha).',
    lorePt: 'Câmaras de fusão planetária irradiam calor geotérmico extremo. Exige circulação forçada de refrigerante de bordo.',
    codeRef: 'RenderSystem.ts:lines 2758-2885'
  },
  {
    id: 'electric',
    namePt: 'Voltaico Megawatt',
    nameEn: 'Megawatt Voltaic Circuit',
    colorHex: '#ffff00',
    colorNumber: 0xffff00,
    drag: '0.88',
    speed: '1.00x',
    cooldown: '-35% (0.65x ultrarrápido)',
    dot: 'Supercondução de Mana',
    desc: 'Exatamente 16 trilhas de circuitos impressos vetoriais com terminais em anel e ponto, pulso de elétrons em movimento contínuo e repetição modular a cada 700px.',
    platformDetail: 'Pistas de barramento de cobre neon com ilhas de solda circulares e nós de aterramento elétrico.',
    lorePt: 'Superfície energizada em escala de gigawatts que acelera a recarga de canhões de plasma e sistemas de bateria.',
    codeRef: 'RenderSystem.ts:lines 2885-3084'
  },
  {
    id: 'void',
    namePt: 'Singular do Vazio',
    nameEn: 'Singular Void Abyss',
    colorHex: '#bd00ff',
    colorNumber: 0xbd00ff,
    drag: '0.88',
    speed: '-25% (0.75x gravidade pesada)',
    cooldown: '1.00x',
    dot: '+50% Regen Mana',
    desc: 'Fenda de horizonte de eventos cósmica ondulante, anéis de acreção gravitacional concêntricos, raios de atração radial, núcleo escuro e enxame de 8 partículas em órbita diferencial.',
    platformDetail: 'Anéis de contenção quântica embutidos no chassi metálico com núcleo de singularidade circular escuro.',
    lorePt: 'Distorção espaço-temporal profunda onde a gravidade densa suga partículas e desacelera o movimento da matéria.',
    codeRef: 'RenderSystem.ts:lines 3084-3167'
  },
  {
    id: 'overcharged',
    namePt: 'Reator Sobrecarregado',
    nameEn: 'Overcharged Reactor Hub',
    colorHex: '#ffaa00',
    colorNumber: 0xffaa00,
    drag: '0.88',
    speed: '1.00x',
    cooldown: '+20% (1.20x)',
    dot: '+50% Ganho de EXP',
    desc: 'Grade de favo de mel (honeycomb grid) em alta frequência, trilhos de neon horizontais a 25% e 75% da altura, onda senoidal osciloscópica espessa, capacitores de descarga com raios e células de energia em diamante.',
    platformDetail: 'Chevrons de aceleração triplos (>>>) desenhados no centro de cada bloco da plataforma.',
    lorePt: 'Complexo nuclear de alta densidade operando em sobrecarga crítica controlada. Multiplica os dados de combate coletados.',
    codeRef: 'RenderSystem.ts:lines 3167-3266'
  },
  {
    id: 'chronos',
    namePt: 'Temporal de Chronos',
    nameEn: 'Chronos Distortion Dimension',
    colorHex: '#d4af32',
    colorNumber: 0xd4af32,
    drag: '0.88',
    speed: '1.00x',
    cooldown: '-30% (0.70x)',
    dot: '+25% EXP / +10% Dano',
    desc: '8 relógios sutis de fundo, 4 grandes mostradores de relógio steampunk com anéis concêntricos duplos, 60 marcas de minutos, 12 dentes de engrenagem em rotação, 3 ponteiros diferenciais e pêndulos oscilantes.',
    platformDetail: 'Marcadores de horas radiais e dentes de engrenagem de precisão gravados nas vigas estruturais.',
    lorePt: 'Dimensão cronométrica onde o tempo flui em taxas relativas assimétricas, conferindo reflexos táquions antecipados.',
    codeRef: 'RenderSystem.ts:lines 3266-3384'
  },
  {
    id: 'cyber_grid',
    namePt: 'Cibernética Neon',
    nameEn: 'Neon Cyber Grid Synthwave',
    colorHex: '#ff009f',
    colorNumber: 0xff009f,
    drag: '0.85',
    speed: '+35% (1.35x alta velocidade)',
    cooldown: '-15% (0.85x)',
    dot: '+15% Dano / Perfuração',
    desc: 'Grade 3D synthwave com perspectiva de horizonte fugitivo em magenta e ciano, barramentos de fibra óptica com pacotes de dados viajando e microchips integrados com pinos e LEDs pulsantes.',
    platformDetail: 'Nós duplos de telecomunicação cibernética com iluminação laser magenta.',
    lorePt: 'Ciberespaço holográfico materializado via barramentos ópticos de altíssima condutividade e aceleração fotônica.',
    codeRef: 'RenderSystem.ts:lines 3384-3431'
  },
  {
    id: 'solar_flare',
    namePt: 'Solar Incandescente',
    nameEn: 'Solar Flare Eruptor',
    colorHex: '#ffea66',
    colorNumber: 0xffea66,
    drag: '0.88',
    speed: '+5% (1.05x)',
    cooldown: '1.00x',
    dot: '-1.5 HP/s Radiação Térmica',
    desc: 'Corona solar central incandescente com 36 raios em dente de serra, 72 raios de emissão radial em leque, 6 proeminências curvas de Bézier em arco contínuo, manto solar e brasas flutuantes.',
    platformDetail: 'Emissor de raios solares em leque com cristas de plasma dourado e carmesim.',
    lorePt: 'Proximidade estelar extrema com tempestades de prótons e vento solar contínuo gerando blindagem coronal.',
    codeRef: 'RenderSystem.ts:lines 3431-3543'
  },
  {
    id: 'crystal_prism',
    namePt: 'Prisma Cristalino',
    nameEn: 'Crystal Prism Matrix',
    colorHex: '#d2bdff',
    colorNumber: 0xd2bdff,
    drag: '0.88',
    speed: '1.00x',
    cooldown: '-20% (0.80x)',
    dot: '+20% Dano / +30% Mana',
    desc: 'Cristais de quartzo crescendo ritmicamente no chão e teto em 15 posições, feixe de luz branca espessa que entra no prisma central de quartzo biterminado com 6 facetas coloridas e refrata um arco-íris de 7 cores na altura total.',
    platformDetail: 'Facetas lapidadas de diamante translúcido com reflexos ópticos triangulares em corte diagonal.',
    lorePt: 'Matriz piezoelétrica de quartzo puro. A refração fotônica polarizada amplifica canhões de luz e dispersões de lasers.',
    codeRef: 'RenderSystem.ts:lines 3543-3854'
  },
  {
    id: 'abyssal',
    namePt: 'Miasma Abissal',
    nameEn: 'Abyssal Trench Depths',
    colorHex: '#00ffc4',
    colorNumber: 0x00ffc4,
    drag: '0.92',
    speed: '-15% (0.85x alta pressão)',
    cooldown: '+10% (1.10x)',
    dot: '+40% Dano Verdadeiro',
    desc: 'Fossa oceânica profunda com gradiente azul meia-noite, raios cáusticos de luz da superfície descendo, silhuetas de rochas marinhas, floresta de algas ondulando senoidalmente em 6 segmentos, 4 espécies de criaturas bioluminescentes e bolhas de gás hidrotermal.',
    platformDetail: 'Ranhuras de alta pressão oceânica com nervuras duplas reforçadas para suportar o abismo.',
    lorePt: 'Trincheira pelágica hiperbárica. A alta densidade de fluidos bio-sintéticos gera dano corrosivo terminal.',
    codeRef: 'RenderSystem.ts:lines 3854-4047'
  }
];

// --- Procedural Generation Helper Functions for Scenarios ---

function createPhaserGraphicsShim(c: CanvasRenderingContext2D) {
  let curFill = 'rgba(0,0,0,1)';
  let curStroke = 'rgba(0,0,0,1)';
  let curLineWidth = 1;

  function toRgba(val: number | string, alpha = 1): string {
    if (typeof val === 'string') {
      if (val.startsWith('#')) {
        const num = parseInt(val.slice(1), 16);
        const r = (num >> 16) & 255;
        const g = (num >> 8) & 255;
        const b = num & 255;
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      }
      return val;
    }
    const r = (val >> 16) & 255;
    const g = (val >> 8) & 255;
    const b = val & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  return {
    clear() {},
    fillStyle(color: number | string, alpha = 1) {
      curFill = toRgba(color, alpha);
      c.fillStyle = curFill;
    },
    lineStyle(width: number, color: number | string, alpha = 1) {
      curLineWidth = width;
      curStroke = toRgba(color, alpha);
      c.lineWidth = width;
      c.strokeStyle = curStroke;
    },
    fillRect(x: number, y: number, w: number, h: number) {
      c.fillStyle = curFill;
      c.fillRect(x, y, w, h);
    },
    strokeRect(x: number, y: number, w: number, h: number) {
      c.strokeStyle = curStroke;
      c.lineWidth = curLineWidth;
      c.strokeRect(x, y, w, h);
    },
    fillCircle(x: number, y: number, r: number) {
      c.fillStyle = curFill;
      c.beginPath();
      c.arc(x, y, Math.max(0, r), 0, Math.PI * 2);
      c.fill();
    },
    strokeCircle(x: number, y: number, r: number) {
      c.strokeStyle = curStroke;
      c.lineWidth = curLineWidth;
      c.beginPath();
      c.arc(x, y, Math.max(0, r), 0, Math.PI * 2);
      c.stroke();
    },
    lineBetween(x1: number, y1: number, x2: number, y2: number) {
      c.strokeStyle = curStroke;
      c.lineWidth = curLineWidth;
      c.beginPath();
      c.moveTo(x1, y1);
      c.lineTo(x2, y2);
      c.stroke();
    },
    beginPath() {
      c.beginPath();
    },
    moveTo(x: number, y: number) {
      c.moveTo(x, y);
    },
    lineTo(x: number, y: number) {
      c.lineTo(x, y);
    },
    arc(cx: number, cy: number, r: number, sAng: number, eAng: number, anticlockwise = false) {
      c.arc(cx, cy, Math.max(0, r), sAng, eAng, anticlockwise);
    },
    closePath() {
      c.closePath();
    },
    fillPath() {
      c.fillStyle = curFill;
      c.fill();
    },
    strokePath() {
      c.strokeStyle = curStroke;
      c.lineWidth = curLineWidth;
      c.stroke();
    }
  };
}

interface ForestTreeModel {
  xRatio: number;
  yOffset: number;
  treeType: number;
  scale: number;
  colorShade: number;
  secondaryColorShade: number;
  trunkColor: number;
}

const precomputedForestTrees: Record<number, ForestTreeModel[]> = {};
function getForestTrees(pIndex: number): ForestTreeModel[] {
  if (precomputedForestTrees[pIndex]) return precomputedForestTrees[pIndex]!;

  let seed = 1337 + pIndex * 42;
  const rng = () => {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };

  const greenPalettes = [
    { primary: 0x2ecc71, sec: 0x27ae60 },
    { primary: 0x1abc9c, sec: 0x16a085 },
    { primary: 0xa3e635, sec: 0x65a30d },
    { primary: 0x4ade80, sec: 0x16a34a },
    { primary: 0x84cc16, sec: 0x4d7c0f },
    { primary: 0x10b981, sec: 0x047857 },
    { primary: 0x6ee7b7, sec: 0x059669 }
  ];
  const trunkPalettes = [0x5c4033, 0x795548, 0x4a3525, 0x3e2723, 0x6d4c41];

  const trees: ForestTreeModel[] = [];
  const count = 20;
  for (let i = 0; i < count; i++) {
    const xRatio = (i + 0.15 + rng() * 0.7) / count;
    const palette = greenPalettes[Math.floor(rng() * greenPalettes.length)]!;
    const trunk = trunkPalettes[Math.floor(rng() * trunkPalettes.length)]!;
    trees.push({
      xRatio,
      yOffset: rng() * 8,
      treeType: Math.floor(rng() * 9),
      scale: 0.75 + rng() * 0.55,
      colorShade: palette.primary,
      secondaryColorShade: palette.sec,
      trunkColor: trunk
    });
  }
  precomputedForestTrees[pIndex] = trees;
  return trees;
}

function drawNeonGeometricTree(
  graphics: ReturnType<typeof createPhaserGraphicsShim>,
  x: number,
  groundY: number,
  tree: ForestTreeModel,
  windSway: number
) {
  const scale = tree.scale;
  const foliageColor = tree.colorShade;
  const secColor = tree.secondaryColorShade;
  const cyberTrunkFill = 0x071b16;
  const cyberTrunkOutline = 0x10b981;
  const foliageFillAlpha = 0.24;

  switch (tree.treeType) {
    case 0: {
      const trunkW = 8 * scale;
      const trunkH = 20 * scale;
      graphics.fillStyle(cyberTrunkFill, 0.55);
      graphics.fillRect(x - trunkW / 2, groundY - trunkH, trunkW, trunkH);
      graphics.lineStyle(1.4 * scale, cyberTrunkOutline, 0.85);
      graphics.strokeRect(x - trunkW / 2, groundY - trunkH, trunkW, trunkH);

      const topY = groundY - trunkH - 65 * scale;
      const baseY = groundY - trunkH + 3 * scale;
      const w = 48 * scale;

      graphics.fillStyle(foliageColor, foliageFillAlpha);
      graphics.beginPath();
      graphics.moveTo(x + windSway, topY);
      graphics.lineTo(x + w / 2, baseY);
      graphics.lineTo(x - w / 2, baseY);
      graphics.closePath();
      graphics.fillPath();

      graphics.lineStyle(2.0 * scale, secColor, 0.95);
      graphics.strokePath();
      break;
    }
    case 1: {
      const trunkW = 6 * scale;
      const trunkH = 55 * scale;
      graphics.fillStyle(cyberTrunkFill, 0.55);
      graphics.fillRect(x - trunkW / 2, groundY - trunkH, trunkW, trunkH);
      graphics.lineStyle(1.4 * scale, cyberTrunkOutline, 0.85);
      graphics.strokeRect(x - trunkW / 2, groundY - trunkH, trunkW, trunkH);

      graphics.lineStyle(2.5 * scale, cyberTrunkOutline, 0.9);
      graphics.lineBetween(x, groundY - trunkH + 28 * scale, x - 18 * scale, groundY - trunkH + 12 * scale);
      graphics.lineBetween(x, groundY - trunkH + 20 * scale, x + 18 * scale, groundY - trunkH + 6 * scale);

      const drawNeonCircle = (cx: number, cy: number, r: number) => {
        graphics.fillStyle(foliageColor, foliageFillAlpha);
        graphics.fillCircle(cx, cy, r);
        graphics.lineStyle(2.0 * scale, secColor, 0.95);
        graphics.strokeCircle(cx, cy, r);
      };

      const topX = x + windSway;
      const topY = groundY - trunkH - 8 * scale;
      drawNeonCircle(topX, topY, 18 * scale);
      drawNeonCircle(x - 20 * scale + windSway * 0.7, groundY - trunkH + 8 * scale, 12 * scale);
      drawNeonCircle(x + 20 * scale + windSway * 0.7, groundY - trunkH + 2 * scale, 13 * scale);
      break;
    }
    case 2: {
      const trunkW = 7 * scale;
      const trunkH = 24 * scale;
      graphics.fillStyle(cyberTrunkFill, 0.55);
      graphics.fillRect(x - trunkW / 2, groundY - trunkH, trunkW, trunkH);
      graphics.lineStyle(1.4 * scale, cyberTrunkOutline, 0.85);
      graphics.strokeRect(x - trunkW / 2, groundY - trunkH, trunkW, trunkH);

      const baseY = groundY - trunkH;
      const circles = [
        { cx: x - 14 * scale, cy: baseY - 12 * scale, r: 16 * scale },
        { cx: x + 14 * scale, cy: baseY - 12 * scale, r: 16 * scale },
        { cx: x - 8 * scale, cy: baseY - 32 * scale, r: 18 * scale },
        { cx: x + 8 * scale + windSway, cy: baseY - 38 * scale, r: 20 * scale }
      ];

      for (const c of circles) {
        graphics.fillStyle(foliageColor, foliageFillAlpha);
        graphics.fillCircle(c.cx, c.cy, c.r);
        graphics.lineStyle(2.0 * scale, secColor, 0.95);
        graphics.strokeCircle(c.cx, c.cy, c.r);
      }
      break;
    }
    case 3: {
      const trunkW = 6 * scale;
      const trunkH = 65 * scale;
      graphics.fillStyle(cyberTrunkFill, 0.55);
      graphics.fillRect(x - trunkW / 2, groundY - trunkH, trunkW, trunkH);
      graphics.lineStyle(1.4 * scale, cyberTrunkOutline, 0.85);
      graphics.strokeRect(x - trunkW / 2, groundY - trunkH, trunkW, trunkH);

      graphics.lineStyle(2.5 * scale, cyberTrunkOutline, 0.9);
      graphics.lineBetween(x - 22 * scale, groundY - trunkH + 35 * scale, x, groundY - trunkH + 35 * scale);
      graphics.lineBetween(x, groundY - trunkH + 20 * scale, x + 25 * scale, groundY - trunkH + 20 * scale);

      const drawNeonPill = (cx: number, cy: number, w: number, h: number) => {
        const r = h / 2;
        const leftX = cx - w / 2;
        const rightX = cx + w / 2;

        graphics.beginPath();
        graphics.arc(rightX, cy, r, -Math.PI / 2, Math.PI / 2, false);
        graphics.lineTo(leftX, cy + r);
        graphics.arc(leftX, cy, r, Math.PI / 2, -Math.PI / 2, false);
        graphics.lineTo(rightX, cy - r);
        graphics.closePath();

        graphics.fillStyle(foliageColor, foliageFillAlpha);
        graphics.fillPath();

        graphics.lineStyle(2.0 * scale, secColor, 0.95);
        graphics.strokePath();
      };

      drawNeonPill(x - 24 * scale + windSway * 0.5, groundY - trunkH + 35 * scale, 36 * scale, 12 * scale);
      drawNeonPill(x + 26 * scale + windSway * 0.7, groundY - trunkH + 20 * scale, 42 * scale, 13 * scale);
      drawNeonPill(x + windSway, groundY - trunkH - 4 * scale, 48 * scale, 14 * scale);
      break;
    }
    case 4: {
      const trunkW = 8 * scale;
      const trunkH = 28 * scale;
      graphics.fillStyle(cyberTrunkFill, 0.55);
      graphics.fillRect(x - trunkW / 2, groundY - trunkH, trunkW, trunkH);
      graphics.lineStyle(1.4 * scale, cyberTrunkOutline, 0.85);
      graphics.strokeRect(x - trunkW / 2, groundY - trunkH, trunkW, trunkH);

      const baseY = groundY - trunkH;
      const drawNeonSphere = (cx: number, cy: number, r: number) => {
        graphics.fillStyle(foliageColor, foliageFillAlpha);
        graphics.fillCircle(cx, cy, r);
        graphics.lineStyle(2.0 * scale, secColor, 0.95);
        graphics.strokeCircle(cx, cy, r);
      };

      drawNeonSphere(x - 16 * scale, baseY - 16 * scale, 22 * scale);
      drawNeonSphere(x + 16 * scale, baseY - 16 * scale, 22 * scale);
      drawNeonSphere(x + windSway, baseY - 36 * scale, 25 * scale);
      break;
    }
    case 5: {
      const trunkW = 8 * scale;
      const trunkH = 16 * scale;
      graphics.fillStyle(cyberTrunkFill, 0.55);
      graphics.fillRect(x - trunkW / 2, groundY - trunkH, trunkW, trunkH);
      graphics.lineStyle(1.4 * scale, cyberTrunkOutline, 0.85);
      graphics.strokeRect(x - trunkW / 2, groundY - trunkH, trunkW, trunkH);

      const baseY = groundY - trunkH + 4 * scale;
      const tiers = [
        { y: baseY - 18 * scale, w: 46 * scale, h: 22 * scale },
        { y: baseY - 36 * scale, w: 36 * scale, h: 22 * scale },
        { y: baseY - 56 * scale, w: 24 * scale, h: 24 * scale }
      ];

      for (let tIdx = 0; tIdx < tiers.length; tIdx++) {
        const t = tiers[tIdx]!;
        const sway = windSway * (0.4 + tIdx * 0.3);
        graphics.fillStyle(foliageColor, foliageFillAlpha);
        graphics.beginPath();
        graphics.moveTo(x + sway, t.y - t.h);
        graphics.lineTo(x + t.w / 2, t.y);
        graphics.lineTo(x - t.w / 2, t.y);
        graphics.closePath();
        graphics.fillPath();

        graphics.lineStyle(2.0 * scale, secColor, 0.95);
        graphics.strokePath();
      }
      break;
    }
    case 6: {
      const trunkW = 8 * scale;
      const trunkH = 32 * scale;
      graphics.fillStyle(cyberTrunkFill, 0.55);
      graphics.fillRect(x - trunkW / 2, groundY - trunkH, trunkW, trunkH);
      graphics.lineStyle(1.4 * scale, cyberTrunkOutline, 0.85);
      graphics.strokeRect(x - trunkW / 2, groundY - trunkH, trunkW, trunkH);

      const baseY = groundY - trunkH;
      const drawPod = (cx: number, cy: number, r: number) => {
        graphics.fillStyle(foliageColor, foliageFillAlpha);
        graphics.fillCircle(cx, cy, r);
        graphics.lineStyle(2.0 * scale, secColor, 0.95);
        graphics.strokeCircle(cx, cy, r);
      };

      drawPod(x - 18 * scale, baseY - 12 * scale, 24 * scale);
      drawPod(x + 18 * scale, baseY - 12 * scale, 24 * scale);
      drawPod(x + windSway, baseY - 32 * scale, 26 * scale);
      break;
    }
    case 7: {
      const trunkW = 7 * scale;
      const trunkH = 18 * scale;
      graphics.fillStyle(cyberTrunkFill, 0.55);
      graphics.fillRect(x - trunkW / 2, groundY - trunkH, trunkW, trunkH);
      graphics.lineStyle(1.4 * scale, cyberTrunkOutline, 0.85);
      graphics.strokeRect(x - trunkW / 2, groundY - trunkH, trunkW, trunkH);

      const baseY = groundY - trunkH;
      const scallopedTiers = 5;
      for (let i = 0; i < scallopedTiers; i++) {
        const progress = i / scallopedTiers;
        const tierY = baseY - progress * 55 * scale;
        const tierW = (44 - i * 7) * scale;
        const sway = windSway * progress;

        graphics.fillStyle(foliageColor, foliageFillAlpha);
        graphics.beginPath();
        graphics.moveTo(x + sway, tierY - 14 * scale);
        graphics.lineTo(x + tierW / 2, tierY);
        graphics.lineTo(x - tierW / 2, tierY);
        graphics.closePath();
        graphics.fillPath();

        graphics.lineStyle(1.8 * scale, secColor, 0.95);
        graphics.strokePath();
      }
      break;
    }
    case 8: {
      const trunkW = 6 * scale;
      const trunkH = 50 * scale;
      graphics.fillStyle(cyberTrunkFill, 0.55);
      graphics.fillRect(x - trunkW / 2, groundY - trunkH, trunkW, trunkH);
      graphics.lineStyle(1.4 * scale, cyberTrunkOutline, 0.85);
      graphics.strokeRect(x - trunkW / 2, groundY - trunkH, trunkW, trunkH);

      graphics.lineStyle(2.5 * scale, cyberTrunkOutline, 0.9);
      graphics.lineBetween(x - 22 * scale, groundY - trunkH + 22 * scale, x, groundY - trunkH + 22 * scale);
      graphics.lineBetween(x, groundY - trunkH + 14 * scale, x + 24 * scale, groundY - trunkH + 14 * scale);

      const drawNeonDome = (cx: number, cy: number, r: number) => {
        graphics.fillStyle(foliageColor, foliageFillAlpha);
        graphics.beginPath();
        graphics.arc(cx, cy, r, Math.PI, 0, false);
        graphics.closePath();
        graphics.fillPath();

        graphics.lineStyle(2.0 * scale, secColor, 0.95);
        graphics.strokePath();
      };

      drawNeonDome(x - 22 * scale + windSway * 0.4, groundY - trunkH + 22 * scale, 18 * scale);
      drawNeonDome(x + 24 * scale + windSway * 0.6, groundY - trunkH + 14 * scale, 20 * scale);
      drawNeonDome(x + windSway, groundY - trunkH - 6 * scale, 26 * scale);
      break;
    }
  }
}

function drawZoneEnvironment(
  graphics: ReturnType<typeof createPhaserGraphicsShim>,
  startX: number,
  endX: number,
  drawStartY: number,
  zoneEndY: number,
  pIndex: number,
  typeId: string,
  color: number,
  pulseTimer: number
) {
  const currentZoneHeight = zoneEndY - drawStartY;
  graphics.fillStyle(color, 0.08);
  graphics.fillRect(startX, drawStartY, endX - startX, currentZoneHeight);

  if (typeId === 'normal') {
    const bands = 6;
    const bandH = currentZoneHeight / bands;
    const skyColors = [0x041812, 0x062219, 0x082e22, 0x0a3b2b, 0x0d4734, 0x11543d];
    for (let b = 0; b < bands; b++) {
      graphics.fillStyle(skyColors[b]!, 0.95);
      graphics.fillRect(startX, drawStartY + b * bandH, endX - startX, bandH + 1);
    }

    const moonX = startX + 180 + (pIndex * 340) % (endX - startX - 360);
    const moonY = drawStartY + 55;
    
    graphics.fillStyle(0xa3e635, 0.12);
    graphics.fillCircle(moonX, moonY, 34);
    graphics.fillStyle(0x00ffaa, 0.08);
    graphics.fillCircle(moonX, moonY, 50);

    graphics.fillStyle(0xddffaa, 0.9);
    graphics.fillCircle(moonX, moonY, 18);
    graphics.fillStyle(skyColors[1]!, 0.98);
    graphics.fillCircle(moonX + 6, moonY - 4, 16);

    const beamCount = 4;
    for (let i = 0; i < beamCount; i++) {
      const bx = startX + 300 + i * 400 + Math.sin(pulseTimer * 0.5 + i) * 30;
      graphics.fillStyle(0xa3e635, 0.045);
      graphics.beginPath();
      graphics.moveTo(bx, drawStartY);
      graphics.lineTo(bx + 120, drawStartY);
      graphics.lineTo(bx - 80, zoneEndY);
      graphics.lineTo(bx - 200, zoneEndY);
      graphics.closePath();
      graphics.fillPath();
    }

    graphics.fillStyle(0x041c14, 0.95);
    graphics.beginPath();
    graphics.moveTo(startX, zoneEndY);
    graphics.lineTo(startX, drawStartY + currentZoneHeight * 0.5);
    for (let x = startX + 60; x <= endX; x += 80) {
      const peakY = drawStartY + currentZoneHeight * 0.45 + Math.sin(x * 0.008 + pIndex) * 25 + Math.cos(x * 0.015) * 15;
      graphics.lineTo(x, peakY);
    }
    graphics.lineTo(endX, zoneEndY);
    graphics.closePath();
    graphics.fillPath();

    graphics.fillStyle(0x082b1d, 0.95);
    graphics.beginPath();
    graphics.moveTo(startX, zoneEndY);
    for (let x = startX; x <= endX; x += 50) {
      const hillY = drawStartY + currentZoneHeight * 0.65 + Math.sin(x * 0.012 + pIndex * 2) * 18;
      graphics.lineTo(x, hillY);
    }
    graphics.lineTo(endX, zoneEndY);
    graphics.closePath();
    graphics.fillPath();

    graphics.fillStyle(0x051f15, 0.9);
    for (let x = startX + 30; x < endX; x += 70) {
      const hillY = drawStartY + currentZoneHeight * 0.65 + Math.sin(x * 0.012 + pIndex * 2) * 18;
      const treeH = 22 + (x % 3) * 8;
      const treeW = 16 + (x % 2) * 6;
      graphics.beginPath();
      graphics.moveTo(x, hillY - treeH);
      graphics.lineTo(x + treeW / 2, hillY);
      graphics.lineTo(x - treeW / 2, hillY);
      graphics.closePath();
      graphics.fillPath();
    }

    const trees = getForestTrees(pIndex);
    const groundY = zoneEndY;
    graphics.fillStyle(0x0f361c, 0.95);
    graphics.beginPath();
    graphics.moveTo(startX, groundY);
    for (let x = startX; x <= endX; x += 40) {
      const hillY = groundY - 14 - Math.sin(x * 0.006 + pIndex * 3) * 8;
      graphics.lineTo(x, hillY);
    }
    graphics.lineTo(endX, groundY);
    graphics.closePath();
    graphics.fillPath();

    for (const tree of trees) {
      const treeX = startX + tree.xRatio * (endX - startX);
      const treeGroundY = groundY - tree.yOffset;
      const windSway = Math.sin(pulseTimer * 1.5 + tree.xRatio * 12) * (3 * tree.scale);
      drawNeonGeometricTree(graphics, treeX, treeGroundY, tree, windSway);
    }

    for (let i = 0; i < 16; i++) {
      const sporeX = startX + ((pulseTimer * 22 + i * 145) % (endX - startX));
      const sporeY = drawStartY + ((pulseTimer * 14 + i * 48) % (currentZoneHeight - 20));
      const pulseAlpha = 0.35 + Math.sin(pulseTimer * 3.0 + i) * 0.3;
      const colorHex = i % 2 === 0 ? 0xa3e635 : 0x00ffaa;

      graphics.fillStyle(colorHex, pulseAlpha * 0.4);
      graphics.fillCircle(sporeX, sporeY, 5);
      graphics.fillStyle(0xffffff, pulseAlpha * 0.9);
      graphics.fillCircle(sporeX, sporeY, 2.0);
    }
  } else if (typeId === 'ice') {
    graphics.lineStyle(1.0, 0x00f0ff, 0.22);
    const totalDurationY = currentZoneHeight - 40;
    const baseSpeed = 40;

    for (let gx = startX + 20; gx < endX + 160; gx += 65) {
      const hash = Math.sin(gx * 0.07) * 0.5 + 0.5;
      const scale = 0.3 + hash * 0.7;
      const speedMult = 0.5 + (1.0 - hash) * 0.7;
      const phaseShift = hash * totalDurationY;
      const localDriftY = ((pulseTimer * baseSpeed * speedMult) + phaseShift) % totalDurationY;
      
      const py = drawStartY + 20 + localDriftY;
      const px = gx + Math.sin(py * 0.03 + hash * 5) * 20 - ((pulseTimer * 12) % 150);
      
      const zoneW = endX - startX;
      let wrappedPx = px;
      if (zoneW > 0) {
        wrappedPx = startX + ((px - startX + zoneW) % zoneW);
      }
      
      if (py >= drawStartY + 15 && py <= zoneEndY - 15 && wrappedPx >= startX && wrappedPx <= endX) {
        const shimmer = Math.sin(pulseTimer * 2.0 + hash * 10) * 3;
        const radius = (15 + shimmer) * scale;
        
        for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 3) {
          const armEndX = wrappedPx + Math.cos(angle) * radius;
          const armEndY = py + Math.sin(angle) * radius;
          graphics.lineBetween(wrappedPx, py, armEndX, armEndY);
          
          const bAngle1 = angle + Math.PI / 4;
          const bAngle2 = angle - Math.PI / 4;
          const bx = wrappedPx + Math.cos(angle) * (radius * 0.6);
          const by = py + Math.sin(angle) * (radius * 0.6);
          graphics.lineBetween(bx, by, bx + Math.cos(bAngle1) * (4 * scale), by + Math.sin(bAngle1) * (4 * scale));
          graphics.lineBetween(bx, by, bx + Math.cos(bAngle2) * (4 * scale), by + Math.sin(bAngle2) * (4 * scale));
        }
        graphics.strokeCircle(wrappedPx, py, 4 * scale);
      }
    }

    const dustDurationY = currentZoneHeight - 10;
    for (let gx = startX + 15; gx < endX; gx += 45) {
      const hash = Math.sin(gx * 0.13) * 0.5 + 0.5;
      const speedMult = 0.7 + (1.0 - hash) * 0.8;
      const phaseShift = hash * dustDurationY;
      const localDriftY = ((pulseTimer * 60 * speedMult) + phaseShift) % dustDurationY;
      
      const py = drawStartY + 5 + localDriftY;
      const px = gx + Math.sin(py * 0.04) * 20 - ((pulseTimer * 18) % 120);
      
      const zoneW = endX - startX;
      let wrappedPx = px;
      if (zoneW > 0) {
        wrappedPx = startX + ((px - startX + zoneW) % zoneW);
      }

      if (py >= drawStartY + 3 && py <= zoneEndY - 3 && wrappedPx >= startX && wrappedPx <= endX) {
        graphics.fillStyle(0xffffff, 0.65);
        graphics.fillCircle(wrappedPx, py, 1.2);
        graphics.fillStyle(0x00f0ff, 0.3);
        graphics.fillCircle(wrappedPx, py, 3.0);
      }
    }
  } else if (typeId === 'magma') {
    const step = 20;
    const drawFlameCurve = (p0x: number, p0y: number, p1x: number, p1y: number, p2x: number, p2y: number, numSegments = 8) => {
      for (let i = 1; i <= numSegments; i++) {
        const t = i / numSegments;
        const mt = 1 - t;
        const x = mt * mt * p0x + 2 * mt * t * p1x + t * t * p2x;
        const y = mt * mt * p0y + 2 * mt * t * p1y + t * t * p2y;
        graphics.lineTo(x, y);
      }
    };

    // Bottom Flame Border
    graphics.fillStyle(0xd03000, 0.15);
    graphics.beginPath();
    graphics.moveTo(startX, zoneEndY);
    for (let x = startX; x <= endX; x += step) {
      const wave = Math.sin(x * 0.05 + pulseTimer * 1.8) * 0.4 + 0.6;
      const peakY = zoneEndY - 75 * wave;
      const nextX = x + step;
      drawFlameCurve(x, zoneEndY, x + step * 0.3, peakY + 15, x + step * 0.5, peakY);
      drawFlameCurve(x + step * 0.5, peakY, nextX - step * 0.3, peakY + 30, nextX, zoneEndY);
    }
    graphics.lineTo(endX, zoneEndY);
    graphics.closePath();
    graphics.fillPath();

    graphics.fillStyle(0xff7700, 0.18);
    graphics.beginPath();
    graphics.moveTo(startX, zoneEndY);
    for (let x = startX; x <= endX; x += step) {
      const wave = Math.sin(x * 0.05 + pulseTimer * 2.2 + 0.5) * 0.3 + 0.5;
      const peakY = zoneEndY - 55 * wave;
      const nextX = x + step;
      drawFlameCurve(x, zoneEndY, x + step * 0.3, peakY + 11, x + step * 0.5, peakY);
      drawFlameCurve(x + step * 0.5, peakY, nextX - step * 0.3, peakY + 22, nextX, zoneEndY);
    }
    graphics.lineTo(endX, zoneEndY);
    graphics.closePath();
    graphics.fillPath();

    graphics.fillStyle(0xffdd00, 0.22);
    graphics.beginPath();
    graphics.moveTo(startX, zoneEndY);
    for (let x = startX; x <= endX; x += step) {
      const wave = Math.sin(x * 0.05 + pulseTimer * 2.6 + 1.0) * 0.2 + 0.4;
      const peakY = zoneEndY - 35 * wave;
      const nextX = x + step;
      drawFlameCurve(x, zoneEndY, x + step * 0.3, peakY + 7, x + step * 0.5, peakY);
      drawFlameCurve(x + step * 0.5, peakY, nextX - step * 0.3, peakY + 14, nextX, zoneEndY);
    }
    graphics.lineTo(endX, zoneEndY);
    graphics.closePath();
    graphics.fillPath();

    // Top Flame Border
    graphics.fillStyle(0xd03000, 0.15);
    graphics.beginPath();
    graphics.moveTo(startX, drawStartY);
    for (let x = startX; x <= endX; x += step) {
      const wave = Math.sin(x * 0.05 + pulseTimer * 1.5) * 0.3 + 0.5;
      const peakY = drawStartY + 45 * wave;
      const nextX = x + step;
      drawFlameCurve(x, drawStartY, x + step * 0.3, peakY - 9, x + step * 0.5, peakY);
      drawFlameCurve(x + step * 0.5, peakY, nextX - step * 0.3, peakY - 18, nextX, drawStartY);
    }
    graphics.lineTo(endX, drawStartY);
    graphics.closePath();
    graphics.fillPath();

    graphics.fillStyle(0xff7700, 0.18);
    graphics.beginPath();
    graphics.moveTo(startX, drawStartY);
    for (let x = startX; x <= endX; x += step) {
      const wave = Math.sin(x * 0.05 + pulseTimer * 1.9 + 0.5) * 0.25 + 0.4;
      const peakY = drawStartY + 30 * wave;
      const nextX = x + step;
      drawFlameCurve(x, drawStartY, x + step * 0.3, peakY - 6, x + step * 0.5, peakY);
      drawFlameCurve(x + step * 0.5, peakY, nextX - step * 0.3, peakY - 12, nextX, drawStartY);
    }
    graphics.lineTo(endX, drawStartY);
    graphics.closePath();
    graphics.fillPath();

    graphics.fillStyle(0xffdd00, 0.22);
    graphics.beginPath();
    graphics.moveTo(startX, drawStartY);
    for (let x = startX; x <= endX; x += step) {
      const wave = Math.sin(x * 0.05 + pulseTimer * 2.3 + 1.0) * 0.2 + 0.35;
      const peakY = drawStartY + 20 * wave;
      const nextX = x + step;
      drawFlameCurve(x, drawStartY, x + step * 0.3, peakY - 4, x + step * 0.5, peakY);
      drawFlameCurve(x + step * 0.5, peakY, nextX - step * 0.3, peakY - 8, nextX, drawStartY);
    }
    graphics.lineTo(endX, drawStartY);
    graphics.closePath();
    graphics.fillPath();

    // Floating Sparks
    graphics.fillStyle(0xff7700, 0.15);
    const dy = (pulseTimer * 25) % (currentZoneHeight - 80);
    for (let gx = startX + 50; gx < endX; gx += 120) {
      const sparkY = zoneEndY - 50 - dy;
      if (sparkY > drawStartY + 50) {
        graphics.beginPath();
        graphics.moveTo(gx, sparkY - 6);
        graphics.lineTo(gx + 4, sparkY);
        graphics.lineTo(gx, sparkY + 6);
        graphics.lineTo(gx - 4, sparkY);
        graphics.closePath();
        graphics.fillPath();
      }
    }
  } else if (typeId === 'electric') {
    const getPointOnPath = (pts: { x: number; y: number }[], t: number): { x: number; y: number } => {
      if (pts.length === 0) return { x: 0, y: 0 };
      if (pts.length === 1) return pts[0]!;

      const segmentLengths: number[] = [];
      let totalLength = 0;
      for (let i = 0; i < pts.length - 1; i++) {
        const p1 = pts[i]!;
        const p2 = pts[i + 1]!;
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const len = Math.sqrt(dx * dx + dy * dy);
        segmentLengths.push(len);
        totalLength += len;
      }

      if (totalLength === 0) return pts[0]!;

      let targetDist = t * totalLength;
      for (let i = 0; i < pts.length - 1; i++) {
        const segLen = segmentLengths[i]!;
        if (targetDist <= segLen) {
          const ratio = targetDist / segLen;
          const p1 = pts[i]!;
          const p2 = pts[i + 1]!;
          return {
            x: p1.x + (p2.x - p1.x) * ratio,
            y: p1.y + (p2.y - p1.y) * ratio
          };
        }
        targetDist -= segLen;
      }
      return pts[pts.length - 1]!;
    };

    const drawSingleTrace = (trace: { points: { x: number; y: number }[]; startStyle: 'dot' | 'ring'; endStyle: 'dot' | 'ring' }, offsetX: number) => {
      const pts = trace.points.map(p => ({
        x: p.x + offsetX,
        y: p.y + drawStartY
      }));

      if (pts.length < 2) return;

      const startPt = pts[0]!;
      const endPt = pts[pts.length - 1]!;

      graphics.lineStyle(1.2, color, 0.15);
      graphics.beginPath();
      graphics.moveTo(startPt.x, startPt.y);
      for (let i = 1; i < pts.length; i++) {
        graphics.lineTo(pts[i]!.x, pts[i]!.y);
      }
      graphics.strokePath();

      graphics.lineStyle(1.0, color, 0.25);
      if (trace.startStyle === 'dot') {
        graphics.fillStyle(color, 0.25);
        graphics.fillCircle(startPt.x, startPt.y, 3);
      } else {
        graphics.strokeCircle(startPt.x, startPt.y, 3);
      }

      graphics.lineStyle(1.0, color, 0.25);
      if (trace.endStyle === 'dot') {
        graphics.fillStyle(color, 0.25);
        graphics.fillCircle(endPt.x, endPt.y, 3);
      } else {
        graphics.strokeCircle(endPt.x, endPt.y, 3);
      }

      const progress = (pulseTimer * 0.45 + (startPt.x * 0.003)) % 1.0;
      const ePos = getPointOnPath(pts, progress);

      graphics.fillStyle(0xffffff, 0.65);
      graphics.fillCircle(ePos.x, ePos.y, 2.5);
      graphics.fillStyle(color, 0.25);
      graphics.fillCircle(ePos.x, ePos.y, 5.5);
    };

    const traces: { points: { x: number; y: number }[]; startStyle: 'dot' | 'ring'; endStyle: 'dot' | 'ring' }[] = [
      { points: [{ x: 30, y: 50 }, { x: 180, y: 50 }, { x: 210, y: 20 }, { x: 320, y: 20 }], startStyle: 'ring', endStyle: 'dot' },
      { points: [{ x: 350, y: 20 }, { x: 380, y: 50 }, { x: 480, y: 50 }], startStyle: 'ring', endStyle: 'dot' },
      { points: [{ x: 400, y: 20 }, { x: 520, y: 20 }, { x: 560, y: 50 }, { x: 680, y: 50 }], startStyle: 'ring', endStyle: 'dot' },
      { points: [{ x: 180, y: 80 }, { x: 210, y: 55 }, { x: 350, y: 55 }], startStyle: 'dot', endStyle: 'ring' },
      { points: [{ x: 420, y: 80 }, { x: 580, y: 80 }], startStyle: 'ring', endStyle: 'dot' },
      { points: [{ x: 30, y: 110 }, { x: 210, y: 110 }, { x: 240, y: 85 }, { x: 320, y: 85 }], startStyle: 'dot', endStyle: 'ring' },
      { points: [{ x: 340, y: 85 }, { x: 420, y: 125 }, { x: 500, y: 125 }], startStyle: 'dot', endStyle: 'ring' },
      { points: [{ x: 30, y: 140 }, { x: 180, y: 140 }, { x: 210, y: 165 }, { x: 320, y: 165 }], startStyle: 'ring', endStyle: 'ring' },
      { points: [{ x: 210, y: 140 }, { x: 320, y: 140 }, { x: 350, y: 175 }, { x: 450, y: 175 }], startStyle: 'dot', endStyle: 'ring' },
      { points: [{ x: 470, y: 140 }, { x: 530, y: 140 }, { x: 570, y: 175 }, { x: 680, y: 175 }], startStyle: 'dot', endStyle: 'ring' },
      { points: [{ x: 30, y: 200 }, { x: 120, y: 200 }], startStyle: 'dot', endStyle: 'ring' },
      { points: [{ x: 180, y: 200 }, { x: 240, y: 200 }, { x: 280, y: 240 }, { x: 380, y: 240 }], startStyle: 'ring', endStyle: 'ring' },
      { points: [{ x: 420, y: 200 }, { x: 490, y: 200 }, { x: 530, y: 240 }, { x: 680, y: 240 }], startStyle: 'dot', endStyle: 'ring' },
      { points: [{ x: 30, y: 260 }, { x: 180, y: 260 }], startStyle: 'dot', endStyle: 'dot' },
      { points: [{ x: 320, y: 260 }, { x: 420, y: 260 }, { x: 450, y: 235 }, { x: 540, y: 235 }], startStyle: 'ring', endStyle: 'ring' },
      { points: [{ x: 560, y: 260 }, { x: 680, y: 260 }], startStyle: 'ring', endStyle: 'dot' }
    ];

    for (let offset = startX; offset < endX; offset += 700) {
      traces.forEach(t => drawSingleTrace(t, offset));
    }
  } else if (typeId === 'void') {
    const centerY = drawStartY + currentZoneHeight / 2;

    graphics.lineStyle(1.0, 0x9900ff, 0.15);
    graphics.beginPath();
    let firstW = true;
    for (let x = startX; x <= endX; x += 15) {
      const waveY1 = centerY + Math.sin(x * 0.02 + pulseTimer * 2.5) * 20 * Math.sin(x * 0.004);
      if (firstW) {
        graphics.moveTo(x, waveY1);
        firstW = false;
      } else {
        graphics.lineTo(x, waveY1);
      }
    }
    graphics.strokePath();

    graphics.beginPath();
    let firstW2 = true;
    for (let x = startX; x <= endX; x += 15) {
      const waveY2 = centerY - Math.sin(x * 0.02 - pulseTimer * 2.0) * 20 * Math.sin(x * 0.004);
      if (firstW2) {
        graphics.moveTo(x, waveY2);
        firstW2 = false;
      } else {
        graphics.lineTo(x, waveY2);
      }
    }
    graphics.strokePath();

    for (let gx = startX + 150; gx < endX; gx += 320) {
      for (let r = 25; r <= 100; r += 25) {
        const lensePulse = Math.sin(pulseTimer * 1.5 + r) * 6;
        graphics.lineStyle(1.0, 0xcc33ff, 0.12 + (100 - r) * 0.001);
        graphics.strokeCircle(gx, centerY, r + lensePulse);
      }

      graphics.lineStyle(1.0, 0x800080, 0.08);
      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
        const innerR = 15;
        const outerR = 115;
        graphics.lineBetween(
          gx + Math.cos(angle) * innerR,
          centerY + Math.sin(angle) * innerR,
          gx + Math.cos(angle) * outerR,
          centerY + Math.sin(angle) * outerR
        );
      }

      const corePulse = 8 + Math.sin(pulseTimer * 4.0) * 2.5;
      graphics.fillStyle(0x1a0033, 0.95);
      graphics.fillCircle(gx, centerY, corePulse + 4);
      graphics.fillStyle(0xcc33ff, 0.35);
      graphics.fillCircle(gx, centerY, corePulse);
      graphics.lineStyle(1.5, 0xcc33ff, 0.65);
      graphics.strokeCircle(gx, centerY, corePulse + 4);
      graphics.fillStyle(0xffffff, 0.9);
      graphics.fillCircle(gx, centerY, 3);

      for (let pIdx = 0; pIdx < 8; pIdx++) {
        const radius = 45 + pIdx * 12;
        const speed = (1.5 - pIdx * 0.12) * (pIdx % 2 === 0 ? 1 : -1);
        const angle = pulseTimer * speed + (pIdx * Math.PI / 4);
        
        const px = gx + Math.cos(angle) * radius;
        const py = centerY + Math.sin(angle) * radius;

        graphics.fillStyle(0xcc33ff, 0.38);
        graphics.fillCircle(px, py, 3.5);
        graphics.fillStyle(0xffffff, 0.9);
        graphics.fillCircle(px, py, 1.5);
      }
    }
  } else if (typeId === 'overcharged') {
    graphics.lineStyle(1.0, 0xff9900, 0.08);
    const gridSize = 40;
    for (let gx = startX; gx < endX; gx += gridSize * 2) {
      for (let gy = drawStartY; gy < zoneEndY; gy += gridSize) {
        graphics.beginPath();
        graphics.moveTo(gx, gy);
        graphics.lineTo(gx + gridSize * 0.5, gy + gridSize * 0.5);
        graphics.lineTo(gx + gridSize * 1.5, gy + gridSize * 0.5);
        graphics.lineTo(gx + gridSize * 2.0, gy);
        graphics.strokePath();
      }
    }

    graphics.lineStyle(2.0, 0xffaa00, 0.3);
    const railY1 = drawStartY + currentZoneHeight * 0.25;
    const railY2 = drawStartY + currentZoneHeight * 0.75;
    graphics.lineBetween(startX, railY1, endX, railY1);
    graphics.lineBetween(startX, railY2, endX, railY2);

    graphics.lineStyle(1.5, 0xffcc00, 0.4);
    graphics.beginPath();
    let firstPt = true;
    for (let x = startX; x <= endX; x += 15) {
      const waveOffset = Math.sin(x * 0.03 + pulseTimer * 7.0) * 15 * Math.sin(x * 0.005 + pulseTimer);
      const yCoordVal = drawStartY + currentZoneHeight / 2 + waveOffset;
      if (firstPt) {
        graphics.moveTo(x, yCoordVal);
        firstPt = false;
      } else {
        graphics.lineTo(x, yCoordVal);
      }
    }
    graphics.strokePath();

    for (let gx = startX + 100; gx < endX; gx += 200) {
      graphics.lineStyle(2.0, 0xff9900, 0.35);
      graphics.lineBetween(gx, drawStartY + 10, gx, drawStartY + 35);
      graphics.lineBetween(gx, zoneEndY - 10, gx, zoneEndY - 35);

      graphics.fillStyle(0xffaa00, 0.5);
      graphics.fillCircle(gx, drawStartY + 35, 4);
      graphics.fillCircle(gx, zoneEndY - 35, 4);

      const crackle = Math.sin(pulseTimer * 15.0 + gx);
      if (Math.abs(crackle) > 0.55) {
        graphics.lineStyle(1.5, 0xffe680, 0.65);
        graphics.beginPath();
        graphics.moveTo(gx, drawStartY + 35);
        
        const segments = 5;
        const segH = (currentZoneHeight - 70) / segments;
        let curX = gx;
        for (let s = 1; s < segments; s++) {
          const targetY = drawStartY + 35 + s * segH;
          const deviation = (Math.sin(pulseTimer * 40.0 + s * 10 + gx) > 0 ? 1 : -1) * 18;
          graphics.lineTo(gx + deviation, targetY);
          curX = gx + deviation;
        }
        graphics.lineTo(gx, zoneEndY - 35);
        graphics.strokePath();

        graphics.fillStyle(0xffffff, 0.85);
        graphics.fillCircle(curX, drawStartY + 35 + (currentZoneHeight - 70) / 2, 3);
      }
    }

    graphics.lineStyle(1.0, 0xffaa00, 0.45);
    const dy = (pulseTimer * 45) % (currentZoneHeight - 20);
    for (let gx = startX + 80; gx < endX; gx += 160) {
      const gy = zoneEndY - 15 - dy;
      if (gy >= drawStartY + 15 && gy <= zoneEndY) {
        graphics.beginPath();
        graphics.moveTo(gx, gy - 6);
        graphics.lineTo(gx + 5, gy);
        graphics.lineTo(gx, gy + 6);
        graphics.lineTo(gx - 5, gy);
        graphics.closePath();
        graphics.strokePath();

        graphics.fillStyle(0xffffff, 0.85);
        graphics.fillCircle(gx, gy, 1.5);
      }
    }

    const thickness = 5 + Math.sin(pulseTimer * 2.0) * 2;
    graphics.lineStyle(thickness, 0xffaa00, 0.35);
    graphics.lineBetween(startX, drawStartY + 10, endX, drawStartY + 10);
    graphics.lineBetween(startX, zoneEndY - 10, endX, zoneEndY - 10);
  } else if (typeId === 'chronos') {
    const cy = drawStartY + currentZoneHeight / 2;
    const t = pulseTimer;

    const smallClocks = [
      { x: startX + 90, y: drawStartY + 35, r: 24 },
      { x: startX + 410, y: drawStartY + 140, r: 32 },
      { x: startX + 570, y: drawStartY + 38, r: 26 },
      { x: startX + 890, y: drawStartY + 145, r: 35 },
      { x: startX + 1050, y: drawStartY + 42, r: 28 },
      { x: startX + 1380, y: drawStartY + 138, r: 30 },
      { x: startX + 1540, y: drawStartY + 45, r: 25 },
      { x: startX + 1820, y: drawStartY + 140, r: 34 }
    ];

    for (const sc of smallClocks) {
      graphics.lineStyle(1.0, 0xebd07b, 0.22);
      graphics.strokeCircle(sc.x, sc.y, sc.r);
      graphics.strokeCircle(sc.x, sc.y, sc.r - 4);
      
      const hA = -t * 0.4 + sc.x * 0.01;
      const mA = t * 1.5 + sc.x * 0.02;
      graphics.lineBetween(sc.x, sc.y, sc.x + Math.cos(hA) * (sc.r * 0.5), sc.y + Math.sin(hA) * (sc.r * 0.5));
      graphics.lineBetween(sc.x, sc.y, sc.x + Math.cos(mA) * (sc.r * 0.75), sc.y + Math.sin(mA) * (sc.r * 0.75));
    }

    for (let clockX = startX + 250; clockX < endX; clockX += 480) {
      const R = 85;

      graphics.lineStyle(2.5, 0xd4af37, 0.65);
      graphics.strokeCircle(clockX, cy, R);
      graphics.lineStyle(1.2, 0xd4af37, 0.45);
      graphics.strokeCircle(clockX, cy, R - 8);
      graphics.strokeCircle(clockX, cy, R - 22);

      graphics.lineStyle(1.0, 0xd4af37, 0.55);
      for (let m = 0; m < 60; m++) {
        const tickAngle = (m * Math.PI) / 30;
        const rInner = m % 5 === 0 ? R - 8 : R - 4;
        graphics.lineBetween(
          clockX + Math.cos(tickAngle) * rInner,
          cy + Math.sin(tickAngle) * rInner,
          clockX + Math.cos(tickAngle) * R,
          cy + Math.sin(tickAngle) * R
        );
      }

      const gearAngle = t * 0.4 + clockX * 0.001;
      graphics.lineStyle(1.8, 0xb8860b, 0.4);
      for (let g = 0; g < 12; g++) {
        const ga = gearAngle + (g * Math.PI) / 6;
        graphics.lineBetween(
          clockX + Math.cos(ga) * (R + 2),
          cy + Math.sin(ga) * (R + 2),
          clockX + Math.cos(ga) * (R + 10),
          cy + Math.sin(ga) * (R + 10)
        );
      }

      const hourAngle = -t * 0.3 + (clockX * 0.002);
      const hourLen = R * 0.42;
      graphics.lineStyle(3.0, 0xffd700, 0.9);
      graphics.lineBetween(clockX, cy, clockX + Math.cos(hourAngle) * hourLen, cy + Math.sin(hourAngle) * hourLen);
      graphics.fillStyle(0xffd700, 0.95);
      graphics.fillCircle(clockX + Math.cos(hourAngle) * (hourLen * 0.7), cy + Math.sin(hourAngle) * (hourLen * 0.7), 4);

      const minAngle = t * 1.2 + (clockX * 0.003);
      const minLen = R * 0.65;
      graphics.lineStyle(2.0, 0xd4af37, 0.95);
      graphics.lineBetween(clockX, cy, clockX + Math.cos(minAngle) * minLen, cy + Math.sin(minAngle) * minLen);
      graphics.fillCircle(clockX + Math.cos(minAngle) * (minLen * 0.8), cy + Math.sin(minAngle) * (minLen * 0.8), 3);

      const secAngle = t * 3.8;
      const secLen = R * 0.78;
      graphics.lineStyle(1.2, 0xff3333, 0.9);
      graphics.lineBetween(clockX - Math.cos(secAngle) * 15, cy - Math.sin(secAngle) * 15, clockX + Math.cos(secAngle) * secLen, cy + Math.sin(secAngle) * secLen);
      graphics.fillCircle(clockX, cy, 4);
    }

    const pendulumAngle = Math.sin(t * 2.0) * 0.4;
    graphics.lineStyle(1.5, 0xd4af37, 0.35);
    for (let px = startX + 100; px < endX; px += 320) {
      graphics.lineBetween(px, drawStartY, px + Math.sin(pendulumAngle) * 60, drawStartY + currentZoneHeight - 10);
      graphics.strokeCircle(px + Math.sin(pendulumAngle) * 60, drawStartY + currentZoneHeight - 10, 10);
    }
  } else if (typeId === 'cyber_grid') {
    const t = pulseTimer;
    const gridY = (t * 80) % 30;
    graphics.lineStyle(1.0, 0xff00ff, 0.3);
    for (let gy = drawStartY + gridY; gy < zoneEndY; gy += 30) {
      graphics.lineBetween(startX, gy, endX, gy);
    }
    for (let gx = startX + 15; gx < endX; gx += 40) {
      graphics.lineBetween(gx, drawStartY, gx + Math.sin(gx * 0.05 + t) * 15, zoneEndY);
    }

    graphics.lineStyle(1.5, 0x00f0ff, 0.5);
    for (let traceY = drawStartY + 35; traceY < zoneEndY; traceY += 50) {
      graphics.lineBetween(startX, traceY, endX, traceY);
      const packetX = startX + ((t * 300 + traceY * 13) % (endX - startX));
      graphics.fillStyle(0x00ffff, 0.95);
      graphics.fillRect(packetX, traceY - 2, 10, 4);
      graphics.fillStyle(0xff00ff, 0.8);
      graphics.fillRect(packetX - 8, traceY - 1, 6, 2);
    }

    for (let chipX = startX + 120; chipX < endX; chipX += 280) {
      const chipY = drawStartY + currentZoneHeight / 2;
      graphics.fillStyle(0x0a001a, 0.9);
      graphics.fillRect(chipX - 18, chipY - 14, 36, 28);
      graphics.lineStyle(1.5, 0xff007f, 0.85);
      graphics.strokeRect(chipX - 18, chipY - 14, 36, 28);

      graphics.lineStyle(1.0, 0x00ffff, 0.7);
      graphics.lineBetween(chipX - 24, chipY - 8, chipX - 18, chipY - 8);
      graphics.lineBetween(chipX - 24, chipY + 8, chipX - 18, chipY + 8);
      graphics.lineBetween(chipX + 18, chipY - 8, chipX + 24, chipY - 8);
      graphics.lineBetween(chipX + 18, chipY + 8, chipX + 24, chipY + 8);

      const ledAlpha = 0.5 + Math.sin(t * 4.0 + chipX) * 0.45;
      graphics.fillStyle(0x00ffff, ledAlpha);
      graphics.fillCircle(chipX, chipY, 4);
    }
  } else if (typeId === 'solar_flare') {
    const t = pulseTimer;
    const sunX = startX + (endX - startX) / 2;
    const sunY = drawStartY + currentZoneHeight / 2;
    const sunRadius = currentZoneHeight * 0.42;

    graphics.fillStyle(0x380500, 0.45);
    graphics.fillRect(startX, drawStartY, endX - startX, currentZoneHeight);

    const numRays = 72;
    graphics.lineStyle(1.0, 0xffaa00, 0.25);
    for (let r = 0; r < numRays; r++) {
      const angle = (r / numRays) * Math.PI * 2;
      const rayLen = 40 + Math.sin(r * 5 + t * 4) * 35;
      const r1X = sunX + Math.cos(angle) * (sunRadius + 5);
      const r1Y = sunY + Math.sin(angle) * (sunRadius + 5);
      const r2X = sunX + Math.cos(angle) * (sunRadius + rayLen);
      const r2Y = sunY + Math.sin(angle) * (sunRadius + rayLen);
      graphics.lineBetween(r1X, r1Y, r2X, r2Y);
    }

    for (let p = 0; p < 6; p++) {
      const seed = p * 47.11;
      const baseAngle = (seed + t * 0.3) % (Math.PI * 2);
      const arcSpread = 0.4 + Math.sin(t + p) * 0.15;
      const startAng = baseAngle - arcSpread;
      const endAng = baseAngle + arcSpread;

      const p1X = sunX + Math.cos(startAng) * sunRadius;
      const p1Y = sunY + Math.sin(startAng) * sunRadius;
      const p2X = sunX + Math.cos(endAng) * sunRadius;
      const p2Y = sunY + Math.sin(endAng) * sunRadius;

      const midAng = baseAngle;
      const reach = sunRadius * (1.5 + Math.sin(t * 1.5 + seed) * 0.4);
      const ctrlX = sunX + Math.cos(midAng) * reach;
      const ctrlY = sunY + Math.sin(midAng) * reach;

      graphics.lineStyle(2.5, 0xff4500, 0.85);
      graphics.beginPath();
      graphics.moveTo(p1X, p1Y);
      for (let step = 1; step <= 10; step++) {
        const u = step / 10;
        const bx = (1 - u) * (1 - u) * p1X + 2 * (1 - u) * u * ctrlX + u * u * p2X;
        const by = (1 - u) * (1 - u) * p1Y + 2 * (1 - u) * u * ctrlY + u * u * p2Y;
        graphics.lineTo(bx, by);
      }
      graphics.strokePath();

      graphics.lineStyle(1.2, 0xffffff, 0.9);
      graphics.beginPath();
      graphics.moveTo(p1X, p1Y);
      for (let step = 1; step <= 10; step++) {
        const u = step / 10;
        const bx = (1 - u) * (1 - u) * p1X + 2 * (1 - u) * u * ctrlX + u * u * p2X;
        const by = (1 - u) * (1 - u) * p1Y + 2 * (1 - u) * u * ctrlY + u * u * p2Y;
        graphics.lineTo(bx, by);
      }
      graphics.strokePath();
    }

    graphics.fillStyle(0xff3300, 0.25);
    graphics.fillCircle(sunX, sunY, sunRadius * 1.45);

    const teeth = 36;
    graphics.fillStyle(0xff7700, 0.9);
    graphics.lineStyle(2.0, 0xffd700, 0.95);
    graphics.beginPath();
    for (let i = 0; i <= teeth; i++) {
      const a1 = (i / teeth) * Math.PI * 2 + t * 0.1;
      const a2 = ((i + 0.5) / teeth) * Math.PI * 2 + t * 0.1;

      const rOuter = sunRadius * 1.25 + Math.sin(i * 3 + t * 4) * 6;
      const rInner = sunRadius * 0.98;

      const x1 = sunX + Math.cos(a1) * rInner;
      const y1 = sunY + Math.sin(a1) * rInner;
      const x2 = sunX + Math.cos(a2) * rOuter;
      const y2 = sunY + Math.sin(a2) * rOuter;

      if (i === 0) { graphics.moveTo(x1, y1); }
      else { graphics.lineTo(x1, y1); }
      graphics.lineTo(x2, y2);
    }
    graphics.closePath();
    graphics.fillPath();
    graphics.strokePath();

    graphics.fillStyle(0xffea00, 0.85);
    graphics.fillCircle(sunX, sunY, sunRadius * 0.75);

    graphics.fillStyle(0xffffff, 0.98);
    graphics.fillCircle(sunX, sunY, sunRadius * 0.45);

    graphics.fillStyle(0xffe600, 0.9);
    for (let e = 0; e < 20; e++) {
      const side = e % 2 === 0 ? 1 : -1;
      const emberX = sunX + side * ((t * 80 + e * 45) % (endX - sunX - 30));
      const emberY = sunY + Math.sin(emberX * 0.02 + e) * 40;
      graphics.fillCircle(emberX, emberY, 2.2);
    }
  } else if (typeId === 'crystal_prism') {
    const t = pulseTimer;
    const cy = drawStartY + currentZoneHeight / 2;
    const prismX = startX + (endX - startX) / 2;

    const floorY = drawStartY + currentZoneHeight;
    const ceilingY = drawStartY;
    const crystalPositions = [
      120, 240, 360, 480, 600, 720, 840, 960, 1080, 1200, 1320, 1440, 1560, 1680, 1800
    ];

    for (let i = 0; i < crystalPositions.length; i++) {
      const offsetX = startX + crystalPositions[i]!;
      const seed = i * 1.7;
      const sproutScale = Math.max(0, Math.sin(t * 3.2 + seed));

      if (sproutScale > 0.05) {
        const h = (14 + (i % 4) * 5) * sproutScale;
        const w = (6 + (i % 3) * 2) * sproutScale;

        graphics.fillStyle(0x0e1b2e, 0.85);
        graphics.lineStyle(1.2, 0xd2bdff, 0.85 * sproutScale);
        graphics.beginPath();
        graphics.moveTo(offsetX - w / 2, floorY);
        graphics.lineTo(offsetX, floorY - h);
        graphics.lineTo(offsetX + w / 2, floorY);
        graphics.closePath();
        graphics.fillPath();
        graphics.strokePath();

        if (i % 2 === 0) {
          graphics.beginPath();
          graphics.moveTo(offsetX - w / 2, ceilingY);
          graphics.lineTo(offsetX, ceilingY + h);
          graphics.lineTo(offsetX + w / 2, ceilingY);
          graphics.closePath();
          graphics.fillPath();
          graphics.strokePath();
        }
      }
    }

    const cycleTime = 2.6;
    const cycleIdx = Math.floor(t / cycleTime);
    const isLeftToRight = cycleIdx % 2 === 0;
    const progress = (t % cycleTime) / cycleTime;

    const edgeLeftX = startX + 60;
    const edgeRightX = endX - 60;
    const totalDist = edgeRightX - edgeLeftX;
    const maxHalfSpreadY = currentZoneHeight / 2 - 12;

    if (isLeftToRight) {
      const headX = edgeLeftX + progress * 1.6 * totalDist;
      const tailX = edgeLeftX + Math.max(0, progress * 1.6 - 0.7) * totalDist;

      const whiteStart = Math.max(edgeLeftX, tailX);
      const whiteEnd = Math.min(prismX - 15, headX);
      if (whiteEnd > whiteStart) {
        graphics.lineStyle(9.0, 0xffffff, 0.98);
        graphics.lineBetween(whiteStart, cy, whiteEnd, cy);
        graphics.lineStyle(22.0, 0xffffff, 0.3);
        graphics.lineBetween(whiteStart, cy, whiteEnd, cy);
      }

      if (headX > prismX + 15 && tailX < edgeRightX) {
        const rainbowStart = Math.max(prismX + 15, tailX);
        const rainbowEnd = Math.min(edgeRightX, headX);

        if (rainbowEnd > rainbowStart) {
          const rainbowColors = [
            0xff0033, 0xff7700, 0xffee00, 0x00e640, 0x00d9ff, 0x2244ff, 0xaa00ff
          ];
          for (let r = 0; r < rainbowColors.length; r++) {
            const col = rainbowColors[r]!;
            const bandTargetY = cy + (r - 3) * (maxHalfSpreadY / 3);
            const fraction = (rainbowEnd - (prismX + 15)) / (edgeRightX - (prismX + 15));
            const currentEndY = cy + (bandTargetY - cy) * fraction;

            graphics.lineStyle(6.0, col, 0.95);
            graphics.lineBetween(rainbowStart, cy + (r - 3) * 6, rainbowEnd, currentEndY);
          }
        }
      }
    } else {
      const headX = edgeRightX - progress * 1.6 * totalDist;
      const tailX = edgeRightX - Math.max(0, progress * 1.6 - 0.7) * totalDist;

      const whiteStart = Math.min(edgeRightX, tailX);
      const whiteEnd = Math.max(prismX + 15, headX);
      if (whiteEnd < whiteStart) {
        graphics.lineStyle(9.0, 0xffffff, 0.98);
        graphics.lineBetween(whiteStart, cy, whiteEnd, cy);
        graphics.lineStyle(22.0, 0xffffff, 0.3);
        graphics.lineBetween(whiteStart, cy, whiteEnd, cy);
      }

      if (headX < prismX - 15 && tailX > edgeLeftX) {
        const rainbowStart = Math.min(prismX - 15, tailX);
        const rainbowEnd = Math.max(edgeLeftX, headX);

        if (rainbowEnd < rainbowStart) {
          const rainbowColors = [
            0xff0033, 0xff7700, 0xffee00, 0x00e640, 0x00d9ff, 0x2244ff, 0xaa00ff
          ];
          for (let r = 0; r < rainbowColors.length; r++) {
            const col = rainbowColors[r]!;
            const bandTargetY = cy + (r - 3) * (maxHalfSpreadY / 3);
            const fraction = ((prismX - 15) - rainbowEnd) / ((prismX - 15) - edgeLeftX);
            const currentEndY = cy + (bandTargetY - cy) * fraction;

            graphics.lineStyle(6.0, col, 0.95);
            graphics.lineBetween(rainbowStart, cy + (r - 3) * 6, rainbowEnd, currentEndY);
          }
        }
      }
    }

    const qH = 170;
    const qW = 74;
    const midH = 80;
    const topY = cy - qH / 2;
    const midTopY = cy - midH / 2;
    const midBotY = cy + midH / 2;
    const botY = cy + qH / 2;

    const pTop = { x: prismX, y: topY };
    const pBot = { x: prismX, y: botY };

    const pMidTL = { x: prismX - qW * 0.5, y: midTopY + 8 };
    const pMidTR = { x: prismX + qW * 0.5, y: midTopY + 8 };
    const pMidBL = { x: prismX - qW * 0.5, y: midBotY - 8 };
    const pMidBR = { x: prismX + qW * 0.5, y: midBotY - 8 };

    const innerTL = { x: prismX - qW * 0.2, y: midTopY };
    const innerTR = { x: prismX + qW * 0.2, y: midTopY };
    const innerBL = { x: prismX - qW * 0.2, y: midBotY };
    const innerBR = { x: prismX + qW * 0.2, y: midBotY };

    const qPulse = 0.85 + Math.sin(t * 3.8) * 0.15;
    graphics.fillStyle(0x7c3aed, 0.25 * qPulse);
    graphics.fillCircle(prismX, cy, 110);
    graphics.fillStyle(0x06b6d4, 0.15 * qPulse);
    graphics.fillCircle(prismX, cy, 70);

    graphics.fillStyle(0x06b6d4, 0.85);
    graphics.beginPath();
    graphics.moveTo(innerTL.x, innerTL.y);
    graphics.lineTo(innerTR.x, innerTR.y);
    graphics.lineTo(innerBR.x, innerBR.y);
    graphics.lineTo(innerBL.x, innerBL.y);
    graphics.closePath();
    graphics.fillPath();

    graphics.fillStyle(0x4c1d95, 0.90);
    graphics.beginPath();
    graphics.moveTo(pMidTL.x, pMidTL.y);
    graphics.lineTo(innerTL.x, innerTL.y);
    graphics.lineTo(innerBL.x, innerBL.y);
    graphics.lineTo(pMidBL.x, pMidBL.y);
    graphics.closePath();
    graphics.fillPath();

    graphics.fillStyle(0x2e1065, 0.90);
    graphics.beginPath();
    graphics.moveTo(innerTR.x, innerTR.y);
    graphics.lineTo(pMidTR.x, pMidTR.y);
    graphics.lineTo(pMidBR.x, pMidBR.y);
    graphics.lineTo(innerBR.x, innerBR.y);
    graphics.closePath();
    graphics.fillPath();

    graphics.fillStyle(0x38bdf8, 0.92);
    graphics.beginPath();
    graphics.moveTo(pTop.x, pTop.y);
    graphics.lineTo(innerTL.x, innerTL.y);
    graphics.lineTo(innerTR.x, innerTR.y);
    graphics.closePath();
    graphics.fillPath();

    graphics.fillStyle(0x6d28d9, 0.92);
    graphics.beginPath();
    graphics.moveTo(pTop.x, pTop.y);
    graphics.lineTo(pMidTL.x, pMidTL.y);
    graphics.lineTo(innerTL.x, innerTL.y);
    graphics.closePath();
    graphics.fillPath();

    graphics.fillStyle(0x3b0764, 0.92);
    graphics.beginPath();
    graphics.moveTo(pTop.x, pTop.y);
    graphics.lineTo(innerTR.x, innerTR.y);
    graphics.lineTo(pMidTR.x, pMidTR.y);
    graphics.closePath();
    graphics.fillPath();

    graphics.fillStyle(0x0284c7, 0.92);
    graphics.beginPath();
    graphics.moveTo(innerBL.x, innerBL.y);
    graphics.lineTo(innerBR.x, innerBR.y);
    graphics.lineTo(pBot.x, pBot.y);
    graphics.closePath();
    graphics.fillPath();

    graphics.fillStyle(0x5b21b6, 0.92);
    graphics.beginPath();
    graphics.moveTo(pMidBL.x, pMidBL.y);
    graphics.lineTo(innerBL.x, innerBL.y);
    graphics.lineTo(pBot.x, pBot.y);
    graphics.closePath();
    graphics.fillPath();

    graphics.fillStyle(0x1e1b4b, 0.92);
    graphics.beginPath();
    graphics.moveTo(innerBR.x, innerBR.y);
    graphics.lineTo(pMidBR.x, pMidBR.y);
    graphics.lineTo(pBot.x, pBot.y);
    graphics.closePath();
    graphics.fillPath();

    graphics.lineStyle(2.5, 0xe0f2fe, 0.98);
    graphics.beginPath();
    graphics.moveTo(pTop.x, pTop.y);
    graphics.lineTo(pMidTR.x, pMidTR.y);
    graphics.lineTo(pMidBR.x, pMidBR.y);
    graphics.lineTo(pBot.x, pBot.y);
    graphics.lineTo(pMidBL.x, pMidBL.y);
    graphics.lineTo(pMidTL.x, pMidTL.y);
    graphics.closePath();
    graphics.strokePath();

    graphics.lineStyle(1.8, 0xbae6fd, 0.95);
    graphics.lineBetween(pTop.x, pTop.y, innerTL.x, innerTL.y);
    graphics.lineBetween(pTop.x, pTop.y, innerTR.x, innerTR.y);
    graphics.lineBetween(innerTL.x, innerTL.y, innerTR.x, innerTR.y);
    graphics.lineBetween(innerTL.x, innerTL.y, innerBL.x, innerBL.y);
    graphics.lineBetween(innerTR.x, innerTR.y, innerBR.x, innerBR.y);
    graphics.lineBetween(innerBL.x, innerBL.y, innerBR.x, innerBR.y);
    graphics.lineBetween(innerBL.x, innerBL.y, pBot.x, pBot.y);
    graphics.lineBetween(innerBR.x, innerBR.y, pBot.x, pBot.y);

    graphics.lineBetween(pMidTL.x, pMidTL.y, innerTL.x, innerTL.y);
    graphics.lineBetween(pMidTR.x, pMidTR.y, innerTR.x, innerTR.y);
    graphics.lineBetween(pMidBL.x, pMidBL.y, innerBL.x, innerBL.y);
    graphics.lineBetween(pMidBR.x, pMidBR.y, innerBR.x, innerBR.y);

    const sparkles = [
      { dx: -52, dy: -65, sz: 8, phase: 0 },
      { dx: 48, dy: -78, sz: 11, phase: 1.2 },
      { dx: 65, dy: -42, sz: 7, phase: 2.4 },
      { dx: -60, dy: 55, sz: 9, phase: 3.6 }
    ];
    for (const sp of sparkles) {
      const spAlpha = 0.5 + Math.sin(t * 5.0 + sp.phase) * 0.5;
      if (spAlpha > 0.1) {
        const sx = prismX + sp.dx;
        const sy = cy + sp.dy;
        const s = sp.sz * (0.8 + spAlpha * 0.4);

        graphics.lineStyle(1.8, 0xffffff, spAlpha);
        graphics.lineBetween(sx - s, sy, sx + s, sy);
        graphics.lineBetween(sx, sy - s, sx, sy + s);
        graphics.fillStyle(0xffffff, spAlpha);
        graphics.fillCircle(sx, sy, 2);
      }
    }
  } else if (typeId === 'abyssal') {
    const t = pulseTimer;
    const floorY = drawStartY + currentZoneHeight;

    graphics.fillStyle(0x001126, 0.55);
    graphics.fillRect(startX, drawStartY, endX - startX, currentZoneHeight);

    for (let ray = startX + 100; ray < endX; ray += 220) {
      const rayAlpha = 0.1 + Math.sin(t * 1.5 + ray) * 0.05;
      const rayShift = Math.sin(t + ray * 0.02) * 30;
      graphics.lineStyle(35, 0x00ffff, rayAlpha);
      graphics.lineBetween(ray, drawStartY, ray + rayShift, floorY);
    }

    graphics.fillStyle(0x000a14, 0.9);
    graphics.beginPath();
    graphics.moveTo(startX, floorY);
    graphics.lineTo(startX + 180, floorY - 35);
    graphics.lineTo(startX + 350, floorY);
    graphics.lineTo(endX - 350, floorY);
    graphics.lineTo(endX - 180, floorY - 40);
    graphics.lineTo(endX, floorY);
    graphics.closePath();
    graphics.fillPath();

    const kelpPositions = [
      startX + 60, startX + 110, startX + 160, startX + 220, startX + 280,
      endX - 280, endX - 220, endX - 160, endX - 110, endX - 60
    ];
    graphics.lineStyle(3.0, 0x004d40, 0.85);

    for (let k = 0; k < kelpPositions.length; k++) {
      const kX = kelpPositions[k]!;
      const kH = 50 + (k % 4) * 20;

      graphics.beginPath();
      graphics.moveTo(kX, floorY);
      for (let segment = 1; segment <= 6; segment++) {
        const segY = floorY - (segment / 6) * kH;
        const sway = Math.sin(t * 1.8 + k + segment * 0.4) * (segment * 3.5);
        graphics.lineTo(kX + sway, segY);
      }
      graphics.strokePath();
    }

    const schools = [
      { species: 0, count: 6, speed: 80, yOffset: 35, dir: 1 },
      { species: 1, count: 4, speed: 60, yOffset: 95, dir: -1 },
      { species: 2, count: 5, speed: 75, yOffset: 155, dir: 1 },
      { species: 3, count: 4, speed: 50, yOffset: 215, dir: -1 }
    ];

    for (const s of schools) {
      const schoolY = drawStartY + s.yOffset;
      const trackLen = endX - startX + 300;
      const progress = (t * s.speed + s.yOffset * 10) % trackLen;
      const schoolX = s.dir === 1 ? startX - 150 + progress : endX + 150 - progress;

      for (let f = 0; f < s.count; f++) {
        const creatureX = schoolX - s.dir * f * 26;
        const creatureY = schoolY + Math.sin(creatureX * 0.02 + f) * 14;

        if (creatureX >= startX - 20 && creatureX <= endX + 20) {
          const facingDir = s.dir;
          if (s.species === 0) {
            graphics.fillStyle(0x00ffc4, 0.88);
            graphics.fillCircle(creatureX + facingDir * 3, creatureY, 4);
            graphics.lineStyle(1.2, 0x00ffff, 0.9);
            graphics.lineBetween(creatureX - facingDir * 2, creatureY, creatureX - facingDir * 9, creatureY - 3);
            graphics.lineBetween(creatureX - facingDir * 2, creatureY, creatureX - facingDir * 9, creatureY + 3);
          } else if (s.species === 1) {
            graphics.fillStyle(0x00e5ff, 0.85);
            graphics.lineStyle(1.2, 0xffffff, 0.9);
            graphics.beginPath();
            graphics.moveTo(creatureX + facingDir * 8, creatureY);
            graphics.lineTo(creatureX, creatureY - 7);
            graphics.lineTo(creatureX - facingDir * 8, creatureY);
            graphics.lineTo(creatureX, creatureY + 7);
            graphics.closePath();
            graphics.fillPath();
            graphics.strokePath();

            graphics.lineStyle(1.0, 0x00e5ff, 0.8);
            graphics.lineBetween(creatureX - facingDir * 8, creatureY, creatureX - facingDir * 18, creatureY + Math.sin(t * 3 + f) * 4);
          } else if (s.species === 2) {
            graphics.fillStyle(0xffffff, 0.95);
            graphics.fillCircle(creatureX + facingDir * 4, creatureY, 2.5);
            graphics.lineStyle(2.5, 0x33ffff, 0.85);
            graphics.beginPath();
            graphics.moveTo(creatureX + facingDir * 4, creatureY);
            for (let seg = 1; seg <= 4; seg++) {
              const segX = creatureX - facingDir * seg * 6;
              const segY = creatureY + Math.sin(t * 4 + seg + f) * 5;
              graphics.lineTo(segX, segY);
            }
            graphics.strokePath();
          } else if (s.species === 3) {
            graphics.fillStyle(0x00ffaa, 0.85);
            graphics.fillCircle(creatureX, creatureY, 5);
            graphics.lineStyle(1.2, 0x00ffc4, 0.9);
            graphics.strokeCircle(creatureX, creatureY, 5);

            const lureX = creatureX + facingDir * 9;
            const lureY = creatureY - 6;
            graphics.lineStyle(1.0, 0xffffff, 0.9);
            graphics.lineBetween(creatureX + facingDir * 3, creatureY - 4, lureX, lureY);
            graphics.fillStyle(0xffffff, 0.98);
            graphics.fillCircle(lureX, lureY, 2);

            graphics.lineStyle(1.2, 0x00ffaa, 0.85);
            graphics.lineBetween(creatureX - facingDir * 5, creatureY, creatureX - facingDir * 10, creatureY - 3);
            graphics.lineBetween(creatureX - facingDir * 5, creatureY, creatureX - facingDir * 10, creatureY + 3);
          }
        }
      }
    }

    graphics.fillStyle(0x00ffc4, 0.7);
    for (let b = startX + 40; b < endX; b += 90) {
      const py = floorY - ((t * 45 + b * 7) % currentZoneHeight);
      const radius = 2 + Math.sin(b + t * 2) * 1.2;
      graphics.fillCircle(b + Math.sin(py * 0.04) * 6, py, Math.max(1.5, radius));
    }
  }
}

function drawFuturisticPlatformBar(
  graphics: ReturnType<typeof createPhaserGraphicsShim>,
  startX: number,
  endX: number,
  y: number,
  typeId: string,
  color: number,
  pulseTimer: number
) {
  const tileWidth = 80;
  const height = 20;

  for (let tx = startX; tx < endX; tx += tileWidth) {
    const blockWidth = Math.min(tileWidth, endX - tx);
    const isFullBlock = blockWidth === tileWidth;

    graphics.fillStyle(0x0a0a0a, 0.95);
    graphics.fillRect(tx, y, blockWidth, 6);

    graphics.fillStyle(color, 1.0);
    for (let sx = tx - 10; sx < tx + blockWidth; sx += 20) {
      graphics.beginPath();
      graphics.moveTo(Math.max(tx, sx + 5), y);
      graphics.lineTo(Math.min(tx + blockWidth, sx + 15), y);
      graphics.lineTo(Math.min(tx + blockWidth, sx + 5), y + 6);
      graphics.lineTo(Math.max(tx, sx - 5), y + 6);
      graphics.closePath();
      graphics.fillPath();
    }

    graphics.lineStyle(1.0, 0x050505, 0.95);
    graphics.strokeRect(tx, y, blockWidth, 6);

    graphics.fillStyle(color, 0.16);
    graphics.fillRect(tx, y + 6, blockWidth, height);

    graphics.lineStyle(1.0, color, 0.45);
    graphics.strokeRect(tx + 2, y + 8, blockWidth - 4, height - 4);

    graphics.lineStyle(1.5, 0x050505, 0.95);
    graphics.strokeRect(tx, y + 6, blockWidth, height);

    if (isFullBlock) {
      graphics.fillStyle(0xffffff, 0.85);
      graphics.fillCircle(tx + 6, y + 11, 1.2);
      graphics.fillCircle(tx + tileWidth - 6, y + 11, 1.2);
      graphics.fillCircle(tx + 6, y + height + 1, 1.2);
      graphics.fillCircle(tx + tileWidth - 6, y + height + 1, 1.2);
    }

    graphics.lineStyle(1.5, color, 0.85);

    if (typeId === 'normal') {
      graphics.lineBetween(tx + 12, y + 16, tx + blockWidth - 12, y + 16);
    } else if (typeId === 'ice') {
      graphics.lineStyle(1.0, 0xffffff, 0.45);
      graphics.lineBetween(tx + 18, y + 21, tx + 32, y + 11);
      if (blockWidth > 50) {
        graphics.lineBetween(tx + 48, y + 21, tx + 62, y + 11);
      }
    } else if (typeId === 'magma') {
      const lavaAlpha = 0.45 + Math.sin(pulseTimer * 1.5) * 0.15;
      graphics.lineStyle(1.8, color, lavaAlpha);
      graphics.beginPath();
      graphics.moveTo(tx + 12, y + 11);
      graphics.lineTo(tx + 28, y + 21);
      graphics.lineTo(tx + 48, y + 11);
      graphics.lineTo(tx + blockWidth - 12, y + 21);
      graphics.strokePath();
    } else if (typeId === 'electric') {
      graphics.lineStyle(1.0, color, 0.75);
      graphics.lineBetween(tx + 12, y + 16, tx + blockWidth - 12, y + 16);
      if (isFullBlock) {
        graphics.lineBetween(tx + 40, y + 16, tx + 40, y + 22);
        graphics.fillStyle(color, 0.95);
        graphics.fillCircle(tx + 40, y + 16, 2.5);
      }
    } else if (typeId === 'void') {
      if (isFullBlock) {
        graphics.lineStyle(1.0, color, 0.6);
        graphics.strokeCircle(tx + 40, y + 16, 6);
        const singularityAlpha = 0.75 + Math.sin(pulseTimer * 2.0) * 0.2;
        graphics.fillStyle(0xffffff, singularityAlpha);
        graphics.fillCircle(tx + 40, y + 16, 2.0);
        graphics.fillStyle(color, 0.35);
        graphics.fillCircle(tx + 40, y + 16, 4.5);
      } else {
        graphics.lineBetween(tx + 2, y + 16, tx + blockWidth - 2, y + 16);
      }
    } else if (typeId === 'overcharged') {
      graphics.beginPath();
      if (blockWidth > 30) {
        graphics.moveTo(tx + 15, y + 10);
        graphics.lineTo(tx + 25, y + 16);
        graphics.lineTo(tx + 15, y + 22);
      }
      if (blockWidth > 50) {
        graphics.moveTo(tx + 35, y + 10);
        graphics.lineTo(tx + 45, y + 16);
        graphics.lineTo(tx + 35, y + 22);
      }
      if (blockWidth > 70) {
        graphics.moveTo(tx + 55, y + 10);
        graphics.lineTo(tx + 65, y + 16);
        graphics.lineTo(tx + 55, y + 22);
      }
      graphics.strokePath();
    } else if (typeId === 'chronos') {
      graphics.lineStyle(1.0, color, 0.8);
      graphics.strokeCircle(tx + blockWidth / 2, y + 16, 5);
      graphics.lineBetween(tx + 10, y + 16, tx + blockWidth - 10, y + 16);
    } else if (typeId === 'cyber_grid') {
      graphics.lineStyle(1.2, color, 0.9);
      graphics.lineBetween(tx + 8, y + 16, tx + blockWidth - 8, y + 16);
      graphics.fillStyle(color, 1.0);
      graphics.fillCircle(tx + 16, y + 16, 2.5);
      graphics.fillCircle(tx + blockWidth - 16, y + 16, 2.5);
    } else if (typeId === 'solar_flare') {
      const cx = tx + blockWidth / 2;
      const cy = y + 16;
      graphics.lineStyle(1.6, 0xffff00, 0.9);
      graphics.strokeCircle(cx, cy, 4);
      graphics.fillStyle(0xff3300, 1.0);
      graphics.fillCircle(cx, cy, 2.5);
      
      graphics.lineStyle(1.0, 0xffa500, 0.7);
      graphics.lineBetween(cx - 10, cy, cx - 5, cy);
      graphics.lineBetween(cx + 5, cy, cx + 10, cy);
      graphics.lineBetween(cx, cy - 6, cx, cy - 3);
      graphics.lineBetween(cx, cy + 3, cx, cy + 6);
    } else if (typeId === 'crystal_prism') {
      graphics.lineStyle(1.2, color, 0.9);
      graphics.beginPath();
      graphics.moveTo(tx + blockWidth / 2, y + 8);
      graphics.lineTo(tx + blockWidth / 2 + 10, y + 16);
      graphics.lineTo(tx + blockWidth / 2, y + 24);
      graphics.lineTo(tx + blockWidth / 2 - 10, y + 16);
      graphics.closePath();
      graphics.strokePath();
    } else if (typeId === 'abyssal') {
      graphics.lineStyle(1.5, color, 0.8);
      graphics.lineBetween(tx + 12, y + 12, tx + blockWidth - 12, y + 12);
      graphics.lineBetween(tx + 18, y + 20, tx + blockWidth - 18, y + 20);
    }
  }
}

export function renderStudioBiomeScenario(
  ctx: CanvasRenderingContext2D,
  biomeId: string,
  width: number,
  height: number,
  time: number,
  viewMode: '3lanes' | 'single' = '3lanes'
) {
  ctx.save();
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = '#020108';
  ctx.fillRect(0, 0, width, height);

  const baseW = 1920;
  const baseH = 1080;

  if (Math.abs(width / height - baseW / baseH) < 0.02) {
    // 16:9 Standard
    ctx.scale(width / baseW, height / baseH);
  } else if (width > height) {
    // 21:9 Ultrawide (e.g. 2560x1080) - Uniform scale based on height, centered horizontally
    const s = height / baseH;
    const offsetX = (width - baseW * s) / 2;
    ctx.translate(offsetX, 0);
    ctx.scale(s, s);
  } else {
    // 9:16 Vertical Mobile (e.g. 1080x1920) - Uniform scale based on width, centered vertically
    const s = width / baseW;
    const offsetY = (height - baseH * s) / 2;
    ctx.translate(0, offsetY);
    ctx.scale(s, s);
  }

  const shim = createPhaserGraphicsShim(ctx);
  const biome = BIOME_SCENARIOS_DATA.find((b) => b.id === biomeId) || BIOME_SCENARIOS_DATA[0]!;
  const startX = 50;
  const endX = 1870;

  if (viewMode === '3lanes') {
    drawZoneEnvironment(shim, startX, endX, 0, 300, 3, biome.id, biome.colorNumber, time);
    drawFuturisticPlatformBar(shim, startX, endX, 300, biome.id, biome.colorNumber, time);

    drawZoneEnvironment(shim, startX, endX, 326, 600, 2, biome.id, biome.colorNumber, time);
    drawFuturisticPlatformBar(shim, startX, endX, 600, biome.id, biome.colorNumber, time);

    drawZoneEnvironment(shim, startX, endX, 626, 900, 1, biome.id, biome.colorNumber, time);
    drawFuturisticPlatformBar(shim, startX, endX, 900, biome.id, biome.colorNumber, time);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = '12px Consolas, monospace';
    ctx.fillText('PISTA 3 (SUPERIOR) [Y=300]   |   PISTA 2 (CENTRAL) [Y=600]   |   PISTA 1 (INFERIOR) [Y=900]', 70, 946);
    ctx.fillText('MOTOR GEOMETRY PLATFORMS // LARGURA: 1820px // MODULAR 80px // ESPESSURA: 26px // RenderSystem.ts:lines 2518–4500', 70, 970);
  } else {
    const drawStartY = 40;
    const zoneEndY = 780;
    drawZoneEnvironment(shim, startX, endX, drawStartY, zoneEndY, 1, biome.id, biome.colorNumber, time);
    drawFuturisticPlatformBar(shim, startX, endX, zoneEndY, biome.id, biome.colorNumber, time);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = '14px Consolas, monospace';
    ctx.fillText(`BIOMA EXPANDIDO // ${biome.namePt.toUpperCase()} (${biome.nameEn.toUpperCase()}) // ATALHO DO MOTOR: ${biome.id}`, 70, 840);
    ctx.fillText(`PALETA NEON: ${biome.colorHex} // CÓDIGO FONTE: RenderSystem.ts:lines 2518–4500`, 70, 865);
  }

  ctx.restore();
}

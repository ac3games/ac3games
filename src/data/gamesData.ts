import { GameItem } from '../types';

export const GAMES_DATA: GameItem[] = [
  {
    id: 'geometry-platforms',
    title: 'Geometry Platforms',
    subtitle: 'Sobreviva ao Inferno Vetorial Cyberpunk',
    status: 'available',
    releaseYear: '2026',
    genre: 'Neon Cyber Roguelite Platformer',
    badge: 'DISPONÍVEL NA STEAM & DEMO WEB',
    description: 'Navegue em alta velocidade por trilhos de risco, gerencie energia balística e pilote naves geométricas contra hordas colossais. 12 naves, 16 drones supremos, 20 expressões sensoriais e centenas de sinergias procedurais.',
    features: [
      '12 Chassis de Naves com habilidades táticas exclusivas',
      'Forja de 16 Drones de Armas Supremas orbitais',
      'Matriz Sensorial HUD com 20 Expressões e sinergias neurais',
      'Batalhas contra Super Chefes de Onda e Arena',
      'Modo Autopiloto com IA tática adaptativa'
    ],
    steamUrl: 'https://store.steampowered.com/app/2026_geometry_platforms',
    demoUrl: '#demo',
    coverGradient: 'from-cyan-900/40 via-purple-900/30 to-black',
    accentColor: '#00f0ff'
  },
  {
    id: 'geometry-space',
    title: 'Geometry Space',
    subtitle: 'A Nova Fronteira Estelar da Franquia',
    status: 'upcoming',
    releaseYear: '2027',
    genre: 'Zero-G Vector Space Exploration Roguelite',
    badge: 'EM BREVE 2027',
    description: 'O universo Geometry expande suas fronteiras para o espaço sideral aberto. Voo em gravidade zero 360°, frotas alienígenas colossais, mineração de asteroides e customização molecular de naves capitânias.',
    features: [
      'Combate vetorial espacial omnidirecional em 360°',
      'Sistemas solares procedurais com buracos negros e pulsares',
      'Frotas capitânias modulares com baías de drones',
      'Árvore de hipertecnologias interestelares'
    ],
    coverGradient: 'from-purple-900/40 via-indigo-900/30 to-black',
    accentColor: '#a855f7'
  },
  {
    id: 'geometry-arena',
    title: 'Geometry Arena',
    subtitle: 'Batalhas Colossais em Arenas Fechadas',
    status: 'upcoming',
    releaseYear: '2027',
    genre: 'Colosseum Boss Rush & Bullet Hell Survival',
    badge: 'EM BREVE 2027',
    description: 'Enfrente ondas incessantes de chefes lendários em arenas hexagonais dinâmicas que encolhem e se reconfiguram em tempo real. Pura precisão tática, reflexos afiados e mecânicas extremas de esquiva.',
    features: [
      'Coliseu hexagonal dinâmico com paredes de laser retráteis',
      'Modo Boss Rush com 30+ Guardiões Sintéticos',
      'Multiplicadores de pontuação e ranking mundial em tempo real',
      'Builds instantâneas de alta densidade bélica'
    ],
    coverGradient: 'from-rose-900/40 via-amber-900/20 to-black',
    accentColor: '#ff0055'
  },
  {
    id: 'geometry-tactics',
    title: 'Geometry Tactics',
    subtitle: 'Estratégia Vetorial de Esquadrões em Grade',
    status: 'upcoming',
    releaseYear: '2027',
    genre: 'Turn-Based Tactical Grid Battler',
    badge: 'EM BREVE 2027',
    description: 'O pensamento tático levado ao limite geométrico. Posicione esquadrões de interceptadores, drones e torres de barreira em grades cinéticas. Cada turno é um quebra-cabeça de vetores e linhas de tiro.',
    features: [
      'Combate tático por turnos em grade isométrica vetorial',
      'Sinergias de esquadrão, campos de repulsão e canhões de feixe',
      'Campanha de conquista galáctica por nós estelares',
      'Editor de mapas de batalha compartilhado pela comunidade'
    ],
    coverGradient: 'from-amber-900/40 via-emerald-900/20 to-black',
    accentColor: '#ffd700'
  }
];

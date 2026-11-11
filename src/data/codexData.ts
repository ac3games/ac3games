import { CodexAsset } from '../types';

export const CODEX_ASSETS: CodexAsset[] = [
  // --- 1. DRONES DA FORJA DE ARMAS SUPREMAS (16 Drones - Imagem 1) ---
  {
    id: 'missiles',
    name: 'Mísseis Balísticos',
    category: 'drones',
    categoryLabel: 'Forja de Armas Supremas',
    badge: 'DANO EXPLOSIVO',
    color: '#ff3b30',
    desc: 'Pod de mísseis aerodinâmicos com aletas delta estabilizadoras e escape de plasma aquecido.',
    renderType: 'drone_missiles',
    technicalSpecs: [
      { label: 'Tipo', value: 'Balístico Cinético' },
      { label: 'Alcance', value: 'Longo / Rastreamento' },
      { label: 'Cadência', value: '1.4s por rajada' }
    ]
  },
  {
    id: 'lightning',
    name: 'Bobina Tesla',
    category: 'drones',
    categoryLabel: 'Forja de Armas Supremas',
    badge: 'ENERGIA EM CADEIA',
    color: '#ffd700',
    desc: 'Núcleo condutor de alta voltagem com descargas elétricas encadeadas entre até 5 alvos.',
    renderType: 'drone_lightning',
    technicalSpecs: [
      { label: 'Tipo', value: 'Arco Voltaico' },
      { label: 'Saltos', value: '5 Alvos' },
      { label: 'Stun', value: '0.35s de paralisia' }
    ]
  },
  {
    id: 'golden_aura',
    name: 'Aura Solar',
    category: 'drones',
    categoryLabel: 'Forja de Armas Supremas',
    badge: 'RADIAÇÃO CONTÍNUA',
    color: '#ffcc00',
    desc: 'Emissor coronal radiante com espigões cardinais que vaporizam projéteis e queimam proximidades.',
    renderType: 'drone_golden_aura',
    technicalSpecs: [
      { label: 'Tipo', value: 'Radiação Termal' },
      { label: 'Raio de Efeito', value: '120px contínuo' },
      { label: 'Defesa', value: 'Destrói tiros fracos' }
    ]
  },
  {
    id: 'black_hole',
    name: 'Vórtice Gravitacional',
    category: 'drones',
    categoryLabel: 'Forja de Armas Supremas',
    badge: 'CONTROLE DE CAMPO',
    color: '#a855f7',
    desc: 'Toróide de singularidade gravitacional com discos de acreção orbitais que sugam massas hostis.',
    renderType: 'drone_black_hole',
    technicalSpecs: [
      { label: 'Tipo', value: 'Implosão Gravítica' },
      { label: 'Força de Sucção', value: 'Extrema' },
      { label: 'Dano Final', value: 'Vácuo Colapsante' }
    ]
  },
  {
    id: 'death_wave',
    name: 'Onda de Plasma',
    category: 'drones',
    categoryLabel: 'Forja de Armas Supremas',
    badge: 'IMPACTO FRONTAL',
    color: '#00f0ff',
    desc: 'Ondas cavitacionais de choque em arcos concêntricos que varrem plataformas inteiras.',
    renderType: 'drone_death_wave',
    technicalSpecs: [
      { label: 'Tipo', value: 'Pulso de Cavitação' },
      { label: 'Penetração', value: 'Infinita' },
      { label: 'Empurrão', value: '+450 Knockback' }
    ]
  },
  {
    id: 'chrono_field',
    name: 'Campo Chrono',
    category: 'drones',
    categoryLabel: 'Forja de Armas Supremas',
    badge: 'DILATAÇÃO TEMPORAL',
    color: '#06b6d4',
    desc: 'Engrenagem cronométrica com raios mecânicos que desaceleram o fluxo de tempo inimigo em 65%.',
    renderType: 'drone_chrono_field',
    technicalSpecs: [
      { label: 'Tipo', value: 'Cronometria Estática' },
      { label: 'Lentidão', value: '-65% Vel. Inimiga' },
      { label: 'Área', value: 'Cúpula Temporal' }
    ]
  },
  {
    id: 'orbital_beam_drone',
    name: 'Raio Orbital',
    category: 'drones',
    categoryLabel: 'Forja de Armas Supremas',
    badge: 'PRECISÃO CIRÚRGICA',
    color: '#34d399',
    desc: 'Prisma satélite emissor com feixe laser vertical colimado contínuo que perfura estruturas.',
    renderType: 'drone_orbital_beam',
    technicalSpecs: [
      { label: 'Tipo', value: 'Laser Orbital Satélite' },
      { label: 'Eixo', value: 'Vertical Contínuo' },
      { label: 'Dano por Seg.', value: 'Escalável em EP' }
    ]
  },
  {
    id: 'quantum_boomerang_drone',
    name: 'Bumerangue Quântico',
    category: 'drones',
    categoryLabel: 'Forja de Armas Supremas',
    badge: 'TRAJETÓRIA RETORNO',
    color: '#38bdf8',
    desc: 'Chakram aerodinâmico tri-facetado que fatia inimigos na ida e causa dano crítico no retorno.',
    renderType: 'drone_quantum_boomerang',
    technicalSpecs: [
      { label: 'Tipo', value: 'Lâmina Giratória' },
      { label: 'Crítico de Retorno', value: '2.5x Dano' },
      { label: 'Frequência', value: 'Rotação 350 RPM' }
    ]
  },
  {
    id: 'proximity_mine_drone',
    name: 'Minas de Proximidade',
    category: 'drones',
    categoryLabel: 'Forja de Armas Supremas',
    badge: 'ARMADILHA TÁTICA',
    color: '#ef4444',
    desc: 'Chassi octogonal blindado com espetos de contato que planta minas de detonação sonora nos trilhos.',
    renderType: 'drone_proximity_mine',
    technicalSpecs: [
      { label: 'Tipo', value: 'Detonação de Impacto' },
      { label: 'Armazenamento', value: 'Até 4 minas ativas' },
      { label: 'Dano em Área', value: '380 Dano Fogo' }
    ]
  },
  {
    id: 'mirror_deflector_drone',
    name: 'Defletor Espelhado',
    category: 'drones',
    categoryLabel: 'Forja de Armas Supremas',
    badge: 'REFLEXÃO CINÉTICA',
    color: '#6366f1',
    desc: 'Prisma de diamante e fragmentos refletores que interceptam tiros hostis e os devolvem amplificados.',
    renderType: 'drone_mirror_deflector',
    technicalSpecs: [
      { label: 'Tipo', value: 'Escudo Prismático' },
      { label: 'Reflexão', value: '100% de Projéteis' },
      { label: 'Amplificação', value: '+50% Dano Retornado' }
    ]
  },
  {
    id: 'subzero_cryo_drone',
    name: 'Criogênico Zero Absoluto',
    category: 'drones',
    categoryLabel: 'Forja de Armas Supremas',
    badge: 'CONGELAMENTO CRÍTICO',
    color: '#38bdf8',
    desc: 'Lattice de floco de neve com espigões de geada que cristalizam o chassi dos alvos em gelo sólido.',
    renderType: 'drone_subzero_cryo',
    technicalSpecs: [
      { label: 'Tipo', value: 'Criogenia Profunda' },
      { label: 'Congelamento', value: '1.8s Total' },
      { label: 'Shatter', value: 'Explosão de Cristais' }
    ]
  },
  {
    id: 'tesla_coil_drone',
    name: 'Torre Tesla Portátil',
    category: 'drones',
    categoryLabel: 'Forja de Armas Supremas',
    badge: 'SUPERCARGA ELÉTRICA',
    color: '#c084fc',
    desc: 'Indutor voltaico de alta frequência com faíscas satélites orbitais sincronizadas.',
    renderType: 'drone_tesla_coil',
    technicalSpecs: [
      { label: 'Tipo', value: 'Indução Eletrostática' },
      { label: 'Frequência', value: '0.5s por pulso' },
      { label: 'Sobrecarga', value: 'Interrompe Bosses' }
    ]
  },
  {
    id: 'elemental_buffer_drone',
    name: 'Catalisador Quad-Elemental',
    category: 'drones',
    categoryLabel: 'Forja de Armas Supremas',
    badge: 'AMPLIFICADOR MULTI-TIPO',
    color: '#00ffcc',
    desc: 'Núcleo de diamante com 4 esferas elementais (Fogo, Gelo, Eletricidade e Vácuo) em órbita perpétua.',
    renderType: 'drone_elemental_buffer',
    technicalSpecs: [
      { label: 'Tipo', value: 'Suporte & Amplificação' },
      { label: 'Buff Elemental', value: '+35% Dano Global' },
      { label: 'Reação', value: 'Combos Elementais' }
    ]
  },
  {
    id: 'tactical_buffer_drone',
    name: 'Bastião Fortaleza Aegis',
    category: 'drones',
    categoryLabel: 'Forja de Armas Supremas',
    badge: 'BARREIRA DEFENSIVA',
    color: '#f59e0b',
    desc: 'Fortaleza hexagonal com brasão central que projeta um escudo cinético frontal impenetrável.',
    renderType: 'drone_tactical_buffer',
    technicalSpecs: [
      { label: 'Tipo', value: 'Fortificação Blindada' },
      { label: 'Absorção', value: '3000 HP de Escudo' },
      { label: 'Regeneração', value: '150 HP/s' }
    ]
  },
  {
    id: 'scavenger_harvester_drone',
    name: 'Minerador Ceifador',
    category: 'drones',
    categoryLabel: 'Forja de Armas Supremas',
    badge: 'COLETA & ECONOMIA',
    color: '#10b981',
    desc: 'Prisma esmeralda com 3 ímãs coletores de longo alcance que atraem e multiplicam Evolution Points.',
    renderType: 'drone_scavenger_harvester',
    technicalSpecs: [
      { label: 'Tipo', value: 'Coletor Magnético' },
      { label: 'Raio do Ímã', value: '+250% Alcance' },
      { label: 'Bônus de EP', value: '+20% Pontos Coletados' }
    ]
  },
  {
    id: 'disruptor_debuffer_drone',
    name: 'Disruptor Entrópico',
    category: 'drones',
    categoryLabel: 'Forja de Armas Supremas',
    badge: 'ENFRAQUECEDOR NEON',
    color: '#ec4899',
    desc: 'Sonda triangular invertida com pontas emissoras de ondas de entropia que corroem armaduras inimigas.',
    renderType: 'drone_disruptor_debuffer',
    technicalSpecs: [
      { label: 'Tipo', value: 'Corrosão Entrópica' },
      { label: 'Quebra de Defesa', value: '-40% Blindagem' },
      { label: 'Vulnerabilidade', value: '+25% Dano Recebido' }
    ]
  },

  // --- 2. EXPRESSÕES HUD DO PILOTO (20 Expressões - Imagem 2) ---
  {
    id: 'expr_happy',
    name: 'Feliz',
    category: 'expressions',
    categoryLabel: 'Matriz Sensorial HUD',
    badge: '+25% XP & +20% CRÉDITOS',
    color: '#00f0ff',
    desc: 'Sinergia de Evolução Acelerada. Modula a telemetria afetiva em foco de miras e conversão energética otimizada.',
    renderType: 'expression_happy',
    technicalSpecs: [
      { label: 'Sinergia', value: 'Evolução Acelerada' },
      { label: 'Bônus Primário', value: '+25% Ganho de XP' },
      { label: 'Bônus Secundário', value: '+20% Créditos/EP' }
    ]
  },
  {
    id: 'expr_excited',
    name: 'Emocionado',
    category: 'expressions',
    categoryLabel: 'Matriz Sensorial HUD',
    badge: '+20% CADÊNCIA & +10% CRIT',
    color: '#ffd700',
    desc: 'Foco cinético e excitação de combate. Dispara canhões com ritmo acelerado e acertos críticos letais.',
    renderType: 'expression_excited',
    technicalSpecs: [
      { label: 'Sinergia', value: 'Sobrecarga Adrenérgica' },
      { label: 'Bônus Primário', value: '+20% Cadência Global' },
      { label: 'Bônus Secundário', value: '+10% Chance de Crítico' }
    ]
  },
  {
    id: 'expr_joyful',
    name: 'Alegre',
    category: 'expressions',
    categoryLabel: 'Matriz Sensorial HUD',
    badge: '+35% EN REGEN & -10% CUSTO',
    color: '#34d399',
    desc: 'Harmonia bio-sintética que reduz o desgaste térmico dos capacitores e regenera energia rapidamente.',
    renderType: 'expression_joyful',
    technicalSpecs: [
      { label: 'Sinergia', value: 'Harmonia Fluídica' },
      { label: 'Bônus Primário', value: '+35% Regen de Energia' },
      { label: 'Bônus Secundário', value: '-10% Custo de Módulos' }
    ]
  },
  {
    id: 'expr_angry',
    name: 'Irado',
    category: 'expressions',
    categoryLabel: 'Matriz Sensorial HUD',
    badge: '+25% DANO (HP < 50%)',
    color: '#ef4444',
    desc: 'Modo berserker de retaliação. Canaliza danos estruturais em potência balística pura.',
    renderType: 'expression_angry',
    technicalSpecs: [
      { label: 'Sinergia', value: 'Fúria de Retaliação' },
      { label: 'Bônus Primário', value: '+25% Dano com HP baixo' },
      { label: 'Bônus Secundário', value: '+2% Sifão de Estrutura' }
    ]
  },
  {
    id: 'expr_stern',
    name: 'Severo',
    category: 'expressions',
    categoryLabel: 'Matriz Sensorial HUD',
    badge: '+3 EM SISTEMAS GLOBAIS',
    color: '#60a5fa',
    desc: 'Disciplina militar absoluta. Estabiliza sistemas com tolerância zero a desvios operacionais.',
    renderType: 'expression_stern',
    technicalSpecs: [
      { label: 'Sinergia', value: 'Comando Inflexível' },
      { label: 'Bônus Primário', value: '+3 Níveis em Sistemas' },
      { label: 'Bônus Secundário', value: '+10% Resistência a Recuo' }
    ]
  },
  {
    id: 'expr_surprised',
    name: 'Surpreso',
    category: 'expressions',
    categoryLabel: 'Matriz Sensorial HUD',
    badge: '-20% COOLDOWN & +20% ATIVAÇÃO',
    color: '#38bdf8',
    desc: 'Reflexos hiper-reativos acionados por surpresa que resetam habilidades táticas num piscar de olhos.',
    renderType: 'expression_surprised',
    technicalSpecs: [
      { label: 'Sinergia', value: 'Hiper-Reatividade' },
      { label: 'Bônus Primário', value: '-20% Recarga de Módulos' },
      { label: 'Bônus Secundário', value: '+20% Taxa de Ativação' }
    ]
  },

  // --- 3. AURAS DE CENÁRIO E BIOMAS (11 Auras - Imagem 3) ---
  {
    id: 'aura_cryo',
    name: 'Aura Criogênica do Ártico Sintético',
    category: 'auras',
    categoryLabel: 'Auras & Biomas de Combate',
    badge: 'ESTASE & PERIGO',
    color: '#00f0ff',
    desc: 'Plataforma com trilhos diagonais de advertência neon, anéis de estase com flocos de neve e matriz de frio.',
    renderType: 'aura_cryo',
    technicalSpecs: [
      { label: 'Bioma', value: 'Geleira Sintética' },
      { label: 'Efeito de Campo', value: 'Anel Criogênico R = 180px' },
      { label: 'Plataforma', value: 'Trilhos de Perigo Neon' }
    ]
  },
  {
    id: 'aura_solar',
    name: 'Aura Solar de Fusão Estelar',
    category: 'auras',
    categoryLabel: 'Auras & Biomas de Combate',
    badge: 'FUSÃO TERMONUCLEAR',
    color: '#ffd700',
    desc: 'Anéis solares com ondas de calor pulsante, erupções de fótons e faixas de radiação sobre o cenário.',
    renderType: 'aura_solar',
    technicalSpecs: [
      { label: 'Bioma', value: 'Coroa Solar Vulcânica' },
      { label: 'Efeito de Campo', value: 'Chamas Fotônicas' },
      { label: 'Plataforma', value: 'Trilhos Magmáticos' }
    ]
  },
  {
    id: 'aura_void',
    name: 'Aura de Vácuo Quântico',
    category: 'auras',
    categoryLabel: 'Auras & Biomas de Combate',
    badge: 'GRAVIDADE ZERO',
    color: '#a855f7',
    desc: 'Geometrias hexagonais transparentes flutuantes com distorção óptica e linhas de interferência de fase.',
    renderType: 'aura_void',
    technicalSpecs: [
      { label: 'Bioma', value: 'Vácuo Profundo' },
      { label: 'Efeito de Campo', value: 'Singularidade Central' },
      { label: 'Plataforma', value: 'Plataformas Flutuantes' }
    ]
  },

  // --- 4. CHASSIS DO JOGADOR (12 Naves) ---
  {
    id: 'hull_vector01',
    name: 'Vector-01 (Apex Chassi)',
    category: 'player',
    categoryLabel: 'Naves & Chassis do Piloto',
    badge: 'VERSÁTIL BALANCEADO',
    color: '#00f0ff',
    desc: 'Chassi padrão de interceptador aeroespacial. Casco afiado, aletas cinéticas e propulsão de plasma traseira pura.',
    renderType: 'hull_vector01',
    technicalSpecs: [
      { label: 'Blindagem', value: '1,200 HP' },
      { label: 'Velocidade', value: '480 px/s' },
      { label: 'Slots de Drones', value: '6/6 Máximo' }
    ]
  },
  {
    id: 'hull_flower',
    name: 'Primordial Flower Guardian',
    category: 'player',
    categoryLabel: 'Naves & Chassis do Piloto',
    badge: 'REGENERAÇÃO FLORAL',
    color: '#ff0055',
    desc: 'Chassi biológico vetorial inspirado na flor primordial com 8 pétalas simétricas e anel de cura contínua.',
    renderType: 'hull_flower',
    technicalSpecs: [
      { label: 'Blindagem', value: '1,800 HP' },
      { label: 'Auto-Cura', value: '+45 HP/s' },
      { label: 'Aura', value: 'Pétalas Defletoras' }
    ]
  },

  // --- 5. PROJÉTEIS DE COMBATE (10 Projéteis) ---
  {
    id: 'proj_kinetic_dart',
    name: 'Dardo Cinético Sabot',
    category: 'projectiles',
    categoryLabel: 'Arsenal de Balística',
    badge: 'ALTA VELOCIDADE',
    color: '#00f0ff',
    desc: 'Projétil aerodinâmico de tungstênio com aletas dorsais e trilha de rastro hipersônico.',
    renderType: 'proj_kinetic_dart',
    technicalSpecs: [
      { label: 'Velocidade', value: '1200 px/s' },
      { label: 'Penetração', value: '1 Alvo' },
      { label: 'Tipo', value: 'Cinético Perfurante' }
    ]
  },
  {
    id: 'proj_photon_lance',
    name: 'Lança Fotônica de Plasma',
    category: 'projectiles',
    categoryLabel: 'Arsenal de Balística',
    badge: 'PERFURAÇÃO TOTAL',
    color: '#ffd700',
    desc: 'Feixe de laser colimado com ponta em diamante de foco térmico que atravessa colunas de inimigos.',
    renderType: 'proj_photon_lance',
    technicalSpecs: [
      { label: 'Velocidade', value: '1800 px/s' },
      { label: 'Penetração', value: 'Total / Infinita' },
      { label: 'Tipo', value: 'Energia Fotônica' }
    ]
  }
];

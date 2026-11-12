export interface GameItem {
  id: string;
  title: string;
  subtitle: string;
  status: 'available' | 'upcoming';
  releaseYear: string;
  genre: string;
  badge: string;
  description: string;
  features: string[];
  steamUrl?: string;
  demoUrl?: string;
  coverGradient: string;
  accentColor: string;
}

export type CodexCategory = 
  | 'drones' 
  | 'expressions' 
  | 'auras' 
  | 'platforms'
  | 'player' 
  | 'projectiles' 
  | 'skills' 
  | 'wave_enemies' 
  | 'wave_bosses' 
  | 'arena_bosses';

export interface CodexAsset {
  id: string;
  name: string;
  category: CodexCategory;
  categoryLabel: string;
  badge: string;
  color: string;
  desc: string;
  technicalSpecs?: {
    label: string;
    value: string;
  }[];
  renderType: string;
}

export interface PlayerScore {
  id: string;
  pilot_name: string;
  ship_class: string;
  wave_reached: number;
  score: number;
  game_title: string;
  created_at: string;
}

-- =========================================================
-- AC3games Database Schema (Supabase PostgreSQL)
-- Games, Codex, Leaderboards & Telemetry
-- =========================================================

-- 1. Games Catalog Table
CREATE TABLE IF NOT EXISTS public.games (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('available', 'upcoming')),
    release_year TEXT NOT NULL,
    genre TEXT NOT NULL,
    badge TEXT NOT NULL,
    description TEXT NOT NULL,
    steam_url TEXT,
    demo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Leaderboards Table (Global Highscores)
CREATE TABLE IF NOT EXISTS public.leaderboards (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    pilot_name TEXT NOT NULL,
    game_id TEXT REFERENCES public.games(id) ON DELETE CASCADE,
    ship_class TEXT NOT NULL,
    wave_reached INT NOT NULL DEFAULT 1,
    score BIGINT NOT NULL,
    platform TEXT DEFAULT 'Steam',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Studio Devlogs & News
CREATE TABLE IF NOT EXISTS public.news_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT DEFAULT 'AC3games Team',
    published_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security (RLS) - Public Read Access
ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaderboards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on games" 
ON public.games FOR SELECT USING (true);

CREATE POLICY "Allow public read access on leaderboards" 
ON public.leaderboards FOR SELECT USING (true);

CREATE POLICY "Allow authenticated or public insert on leaderboards" 
ON public.leaderboards FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access on news_posts" 
ON public.news_posts FOR SELECT USING (true);

-- Initial Games Data Seed
INSERT INTO public.games (id, title, subtitle, status, release_year, genre, badge, description, steam_url)
VALUES 
('geometry-platforms', 'Geometry Platforms', 'Sobreviva ao Inferno Vetorial', 'available', '2026', 'Neon Cyber Roguelite Platformer', 'DISPONÍVEL NA STEAM', 'Combate ultra-rápido com 12 chassis de naves, 16 drones supremos e chefes colossais.', 'https://store.steampowered.com/'),
('geometry-space', 'Geometry Space', 'A Nova Fronteira Estelar', 'upcoming', '2027', 'Space Exploration & Vector Roguelite', 'EM BREVE 2027', 'Explore setores estelares infinitos com gravidade zero e combates vetoriais profundos.', NULL),
('geometry-arena', 'Geometry Arena', 'Batalhas Colossais Fechadas', 'upcoming', '2027', 'Boss Rush & Bullet Hell Survival', 'EM BREVE 2027', 'Enfrente ondas intermináveis de chefes em arenas de combate puro e alta tensão.', NULL),
('geometry-tactics', 'Geometry Tactics', 'Estratégia Vetorial de Esquadrões', 'upcoming', '2027', 'Turn-Based Grid Strategy', 'EM BREVE 2027', 'Comande frotas e drones em grade tática com física e sinergias estelares.', NULL)
ON CONFLICT (id) DO NOTHING;

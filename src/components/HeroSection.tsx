import React, { useEffect, useRef } from 'react';
import { Play, Sparkles, Compass } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 1200);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const onResize = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || 1200;
      height = canvas.height = canvas.parentElement?.clientHeight || 600;
    };
    window.addEventListener('resize', onResize);

    // Particles/Nodes
    const nodes: { x: number; y: number; vx: number; vy: number; radius: number; color: string }[] = [];
    const colors = ['#00f0ff', '#a855f7', '#ffd700', '#ff0055'];
    for (let i = 0; i < 45; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2.5 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)]!
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connection lines
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i]!;
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j]!;
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 * (1 - dist / 140)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        ctx.fillStyle = n.color;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section className="relative min-h-[82vh] flex items-center justify-center overflow-hidden border-b border-cyber-cardBorder/40">
      {/* Background Interactive Vector Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
      />

      {/* Radiant Gradient Blurs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyber-cyan/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-cyber-neonPink/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center z-10">
        
        {/* Studio Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyber-card/90 border border-cyber-cyan/30 text-cyber-cyan font-mono text-xs mb-8 shadow-neon-cyan/20">
          <Sparkles className="w-3.5 h-3.5 text-cyber-cyan animate-pulse" />
          <span className="font-semibold tracking-wider">AC3GAMES STUDIO // PORTAL OFICIAL</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-orbitron font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white mb-6">
          A NOVA ERA DA <br />
          <span className="bg-gradient-to-r from-cyber-cyan via-purple-400 to-cyber-neonPink bg-clip-text text-transparent drop-shadow-sm">
            FRANQUIA GEOMETRY
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto font-outfit text-slate-300 text-lg sm:text-xl font-light mb-10 leading-relaxed">
          Desenvolvemos jogos neo-arcade com física vetorial de alta precisão, combates intensos e estética cyberpunk. Conheça <strong className="text-white font-semibold">Geometry Platforms</strong> e os futuros títulos estelares da franquia.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <a
            href="#games"
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyber-cyan to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-orbitron font-bold text-sm tracking-wider shadow-neon-cyan transition-all flex items-center gap-3 transform hover:-translate-y-0.5"
          >
            <Play className="w-4 h-4 fill-black" />
            <span>EXPLORAR JOGOS</span>
          </a>

          <a
            href="#codex"
            className="px-8 py-4 rounded-xl bg-cyber-card hover:bg-cyber-cardBorder/60 border border-cyber-neonPurple/50 hover:border-cyber-neonPurple text-slate-200 font-orbitron font-medium text-sm tracking-wider hover:shadow-neon-purple transition-all flex items-center gap-3 transform hover:-translate-y-0.5"
          >
            <Compass className="w-4 h-4 text-cyber-neonPurple" />
            <span>ACESSAR CODEX DIGITAL 16:9</span>
          </a>
        </div>

        {/* Stats Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-cyber-cardBorder/50 font-mono">
          <div className="p-4 rounded-lg bg-cyber-card/40 border border-cyber-cardBorder">
            <span className="block text-2xl sm:text-3xl font-extrabold text-cyber-cyan">4 JOGOS</span>
            <span className="text-xs text-slate-400 uppercase tracking-widest">Franquia Geometry</span>
          </div>
          <div className="p-4 rounded-lg bg-cyber-card/40 border border-cyber-cardBorder">
            <span className="block text-2xl sm:text-3xl font-extrabold text-cyber-neonAmber">16 DRONES</span>
            <span className="text-xs text-slate-400 uppercase tracking-widest">Forja Suprema</span>
          </div>
          <div className="p-4 rounded-lg bg-cyber-card/40 border border-cyber-cardBorder">
            <span className="block text-2xl sm:text-3xl font-extrabold text-cyber-neonPurple">20 EXPRESSÕES</span>
            <span className="text-xs text-slate-400 uppercase tracking-widest">Matriz Sensorial HUD</span>
          </div>
          <div className="p-4 rounded-lg bg-cyber-card/40 border border-cyber-cardBorder">
            <span className="block text-2xl sm:text-3xl font-extrabold text-cyber-neonPink">100% FREE</span>
            <span className="text-xs text-slate-400 uppercase tracking-widest">Vercel & Supabase</span>
          </div>
        </div>

      </div>
    </section>
  );
};

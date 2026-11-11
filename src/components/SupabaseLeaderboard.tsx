import React, { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { PlayerScore } from '../types';
import { Trophy, ShieldCheck } from 'lucide-react';

const MOCK_LEADERBOARDS: PlayerScore[] = [
  { id: '1', pilot_name: 'Vortex_Apex', ship_class: 'Vector-01 (Apex)', wave_reached: 124, score: 3845000, game_title: 'Geometry Platforms', created_at: 'Hoje' },
  { id: '2', pilot_name: 'CyberNova_99', ship_class: 'Flower Primordial', wave_reached: 118, score: 3410200, game_title: 'Geometry Platforms', created_at: 'Hoje' },
  { id: '3', pilot_name: 'ChronosPilot', ship_class: 'Titan Chrono', wave_reached: 95, score: 2890400, game_title: 'Geometry Platforms', created_at: 'Ontem' },
  { id: '4', pilot_name: 'LaserDrifter', ship_class: 'Sabot Striker', wave_reached: 88, score: 2315000, game_title: 'Geometry Platforms', created_at: 'Ontem' },
  { id: '5', pilot_name: 'ZeroKelvin', ship_class: 'Cryo Sentinel', wave_reached: 76, score: 1980000, game_title: 'Geometry Platforms', created_at: 'Esta semana' },
];

export const SupabaseLeaderboard: React.FC = () => {
  const [scores, setScores] = useState<PlayerScore[]>(MOCK_LEADERBOARDS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const client = supabase;
    if (!isSupabaseConfigured || !client) return;

    const fetchLeaderboards = async () => {
      setLoading(true);
      try {
        const { data, error } = await client
          .from('leaderboards')
          .select('*')
          .order('score', { ascending: false })
          .limit(5);

        if (!error && data && data.length > 0) {
          setScores(data as PlayerScore[]);
        }
      } catch (err) {
        console.warn('Erro ao carregar leaderboards do Supabase, usando dados locais:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboards();
  }, []);

  return (
    <div className="bg-cyber-card rounded-2xl p-6 border border-cyber-cardBorder">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-cyber-cardBorder/60">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-cyber-neonAmber">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-orbitron font-bold text-base text-white">
              Ranking Global de Pilotos
            </h4>
            <span className="font-mono text-xs text-slate-400">
              Telemetria & Pontuações em Tempo Real
            </span>
          </div>
        </div>

        <span
          className={`font-mono text-[10px] font-bold px-2.5 py-1 rounded-full border flex items-center gap-1.5 ${
            isSupabaseConfigured
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              : 'bg-blue-500/10 text-blue-400 border-blue-500/30'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{isSupabaseConfigured ? 'SUPABASE CONECTADO' : 'DEMO TELEMETRIA'}</span>
        </span>
      </div>

      {loading ? (
        <div className="py-8 text-center font-mono text-xs text-slate-500">
          Carregando dados do Supabase...
        </div>
      ) : (
        <div className="space-y-2.5 font-outfit">
          {scores.map((item, idx) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 rounded-xl bg-cyber-darker/60 border border-cyber-cardBorder/40 hover:border-cyber-cyan/30 transition-all text-xs"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-6 text-center font-mono font-bold text-sm ${
                    idx === 0
                      ? 'text-cyber-neonAmber'
                      : idx === 1
                      ? 'text-slate-300'
                      : idx === 2
                      ? 'text-amber-600'
                      : 'text-slate-500'
                  }`}
                >
                  #{idx + 1}
                </span>
                <div>
                  <span className="font-semibold text-white block">{item.pilot_name}</span>
                  <span className="text-[11px] text-slate-400">{item.ship_class}</span>
                </div>
              </div>

              <div className="text-right font-mono">
                <span className="text-cyber-cyan font-bold block text-sm">
                  {item.score.toLocaleString('pt-BR')} PTS
                </span>
                <span className="text-[10px] text-slate-500">Onda {item.wave_reached}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-5 pt-4 border-t border-cyber-cardBorder/50 text-center font-mono text-[11px] text-slate-400">
        Pronto para sincronização oficial via Supabase PostgreSQL
      </div>
    </div>
  );
};

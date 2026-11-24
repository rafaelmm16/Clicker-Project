"use client";

import { CheckCircle2, Lock, Trophy } from "lucide-react";
import {
  ACHIEVEMENT_DEFS,
  formatNumber,
  GameState,
  getAutoClicksPerSecond,
  getBitsPerClick,
  getBitsPerSecond,
  getPcTier,
  getPrestigeMultiplier,
  getTotalUpgradesOwned,
} from "@/lib/game";

interface AchievementsStatsPanelProps {
  state: GameState;
}

export function AchievementsStatsPanel({ state }: AchievementsStatsPanelProps) {
  const unlockedSet = new Set(state.achievements);
  const unlockedCount = state.achievements.length;
  const totalUpgrades = getTotalUpgradesOwned(state.upgrades);
  const bitsPerClick = getBitsPerClick(state);
  const autoClicksPerSec = getAutoClicksPerSecond(state.upgrades);
  const bitsPerSec = getBitsPerSecond(state);
  const prestigeMult = getPrestigeMultiplier(state.prestigeLevel);
  const tier = getPcTier(state.totalBitsEarned);

  return (
    <div className="space-y-5">
      {/* Estatísticas */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold tracking-[0.18em] text-emerald-300 uppercase">
            {"// Telemetria do Sistema"}
          </h2>
          <span
            className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${tier.badgeClass}`}
          >
            {tier.nome}
          </span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-3">
            <p className="text-[11px] text-slate-400 uppercase">Total de Cliques</p>
            <p className="mt-1 text-lg font-bold text-emerald-300">
              {state.totalClicks.toLocaleString("pt-BR")}
            </p>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-3">
            <p className="text-[11px] text-slate-400 uppercase">Bits Acumulados</p>
            <p className="mt-1 text-lg font-bold text-cyan-300">
              {formatNumber(state.totalBitsEarned, 2)}
            </p>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-3">
            <p className="text-[11px] text-slate-400 uppercase">Bits / Clique</p>
            <p className="mt-1 text-lg font-bold text-slate-100">
              {formatNumber(bitsPerClick, 3)}
            </p>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-3">
            <p className="text-[11px] text-slate-400 uppercase">Auto-Clicker</p>
            <p className="mt-1 text-lg font-bold text-amber-300">
              {autoClicksPerSec}/s{" "}
              <span className="text-xs font-normal text-slate-400">
                ({formatNumber(bitsPerSec, 2)}/s)
              </span>
            </p>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-3">
            <p className="text-[11px] text-slate-400 uppercase">Críticos / Glitches</p>
            <p className="mt-1 text-lg font-bold text-fuchsia-300">
              {state.critCount} / {state.glitchesCaught}
            </p>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-3">
            <p className="text-[11px] text-slate-400 uppercase">
              Upgrades / Ascensões
            </p>
            <p className="mt-1 text-lg font-bold text-emerald-300">
              {totalUpgrades} / {state.ascensionCount}{" "}
              <span className="text-xs font-normal text-slate-400">
                ({prestigeMult.toFixed(2)}x)
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Conquistas */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="inline-flex items-center gap-1.5 text-sm font-bold tracking-[0.18em] text-cyan-300 uppercase">
            <Trophy className="h-4 w-4 text-amber-300" />
            {"Conquistas"}
          </h2>
          <span className="rounded border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-300">
            {unlockedCount} / {ACHIEVEMENT_DEFS.length}
          </span>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {ACHIEVEMENT_DEFS.map((ach) => {
            const isUnlocked = unlockedSet.has(ach.id);
            return (
              <div
                key={ach.id}
                className={`flex items-start gap-3 rounded-lg border p-3 transition ${
                  isUnlocked
                    ? "border-emerald-400/45 bg-emerald-950/25 shadow-[0_0_16px_rgba(0,255,157,0.08)]"
                    : "border-slate-800/90 bg-slate-950/50 opacity-65"
                }`}
              >
                <div
                  className={`mt-0.5 shrink-0 ${
                    isUnlocked ? "text-emerald-400" : "text-slate-600"
                  }`}
                >
                  {isUnlocked ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <Lock className="h-4 w-4" />
                  )}
                </div>
                <div>
                  <p
                    className={`text-xs font-bold ${
                      isUnlocked ? "text-emerald-200" : "text-slate-300"
                    }`}
                  >
                    {ach.titulo}
                  </p>
                  <p className="mt-0.5 text-[11px] text-slate-400">
                    {ach.descricao}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

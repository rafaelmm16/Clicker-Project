"use client";

import { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Sparkles,
} from "lucide-react";
import {
  formatNumber,
  GameState,
  getPrestigeMultiplier,
  hasPrestigeSkill,
  PRESTIGE_BONUS_PER_POINT,
  PRESTIGE_SKILLS,
  PrestigeSkillId,
} from "@/lib/game";

interface AscensionPanelProps {
  state: GameState;
  onAscend: () => void;
  onBuySkill: (skillId: PrestigeSkillId) => void;
}

export function AscensionPanel({
  state,
  onAscend,
  onBuySkill,
}: AscensionPanelProps) {
  const [confirming, setConfirming] = useState(false);

  const currentMult = getPrestigeMultiplier(state.prestigeLevel);
  const projectedLevel = state.prestigeLevel + state.contAsc;
  const projectedMult = getPrestigeMultiplier(projectedLevel);
  const canAscend = state.contAsc > 0;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-sm font-bold tracking-[0.18em] text-cyan-300 uppercase">
          {"// Protocolo de Ascensão"}
        </h2>
        <p className="text-xs text-slate-400">
          Converta prestígio pendente em multiplicador global permanente (+
          {(PRESTIGE_BONUS_PER_POINT * 100).toFixed(0)}% por nível) e pontos
          para habilidades permanentes.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-3">
          <p className="text-[11px] text-slate-400 uppercase">Prestígio Total</p>
          <p className="mt-1 text-xl font-bold text-cyan-300">
            Nv. {state.prestigeLevel}
          </p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-3">
          <p className="text-[11px] text-slate-400 uppercase">Bônus Global</p>
          <p className="mt-1 text-xl font-bold text-emerald-300">
            {currentMult.toFixed(2)}x
          </p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-3">
          <p className="text-[11px] text-slate-400 uppercase">Pendentes</p>
          <p className="mt-1 text-xl font-bold text-amber-300">
            +{state.contAsc}
          </p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-3">
          <p className="text-[11px] text-slate-400 uppercase">Pts Habilidade</p>
          <p className="mt-1 text-xl font-bold text-fuchsia-300">
            {state.prestigeCurrency}
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-cyan-500/30 bg-slate-950/85 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-slate-300">
              {currentMult.toFixed(2)}x
            </span>
            <ArrowRight className="h-4 w-4 text-cyan-400" />
            <span className="text-2xl font-extrabold text-emerald-300 drop-shadow-[0_0_10px_rgba(0,255,157,0.45)]">
              {projectedMult.toFixed(2)}x
            </span>
          </div>
          <span className="text-xs text-slate-400">
            Próximo ponto em{" "}
            <strong className="text-cyan-300">
              {formatNumber(state.nextAscBits, 0)} Bits
            </strong>
          </span>
        </div>

        <ul className="mt-4 space-y-1.5 text-xs text-slate-300">
          <li>• Reseta seus Bits atuais e todos os upgrades da loja.</li>
          <li>
            • Converte{" "}
            <strong className="text-emerald-300">+{state.contAsc}</strong>{" "}
            ponto(s) em prestígio permanente e pontos de habilidade.
          </li>
          <li>
            • Mantém o marco de prestígio, habilidades compradas, estatísticas e
            conquistas.
          </li>
        </ul>

        <div className="mt-4">
          {!canAscend ? (
            <div className="rounded-md border border-slate-800 bg-slate-900/70 p-3 text-center text-xs text-slate-400">
              Alcance{" "}
              <strong className="text-emerald-300">
                {formatNumber(state.nextAscBits, 0)} Bits
              </strong>{" "}
              para ganhar seu próximo ponto de prestígio e liberar a ascensão.
            </div>
          ) : confirming ? (
            <div className="flex flex-col gap-3 rounded-md border border-amber-400/50 bg-amber-950/30 p-3.5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-xs text-amber-200">
                <AlertTriangle className="h-4 w-4 shrink-0 text-amber-400" />
                <span>
                  Confirmar reset da run por{" "}
                  <strong>{projectedMult.toFixed(2)}x</strong> permanente?
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onAscend();
                    setConfirming(false);
                  }}
                  className="cursor-pointer rounded-md bg-emerald-400 px-3.5 py-1.5 text-xs font-bold text-slate-950 transition hover:bg-emerald-300"
                >
                  Confirmar Ascensão
                </button>
                <button
                  type="button"
                  onClick={() => setConfirming(false)}
                  className="cursor-pointer rounded-md border border-slate-600 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirming(true)}
              className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-emerald-400/60 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 px-4 py-3 text-sm font-bold tracking-wider text-emerald-200 uppercase shadow-[0_0_20px_rgba(0,255,157,0.18)] transition hover:from-emerald-500/30 hover:to-cyan-500/30"
            >
              <Sparkles className="h-4 w-4 text-cyan-300" />
              Ascender Agora (+{state.contAsc} Prestígio)
            </button>
          )}
        </div>
      </div>

      {/* Habilidades Permanentes de Prestígio */}
      <div>
        <div className="flex items-center justify-between">
          <h3 className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.18em] text-fuchsia-300 uppercase">
            <Cpu className="h-4 w-4" />
            Habilidades Permanentes de Prestígio
          </h3>
          <span className="rounded border border-fuchsia-400/40 bg-fuchsia-500/15 px-2 py-0.5 text-xs font-bold text-fuchsia-200">
            Disponível: {state.prestigeCurrency} pt(s)
          </span>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {PRESTIGE_SKILLS.map((skill) => {
            const owned = hasPrestigeSkill(state, skill.id);
            const canBuy = !owned && state.prestigeCurrency >= skill.custo;

            return (
              <button
                key={skill.id}
                type="button"
                disabled={!canBuy}
                onClick={() => onBuySkill(skill.id)}
                className={`flex flex-col justify-between rounded-lg border p-3.5 text-left transition ${
                  owned
                    ? "border-emerald-400/50 bg-emerald-950/25"
                    : canBuy
                      ? "cursor-pointer border-fuchsia-400/50 bg-slate-950/90 hover:border-cyan-300 hover:bg-fuchsia-950/25"
                      : "cursor-not-allowed border-slate-800 bg-slate-950/50 opacity-60"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-bold text-slate-100">
                      {skill.nome}
                    </p>
                    <p className="mt-1 text-[11px] text-slate-400">
                      {skill.descricao}
                    </p>
                  </div>
                  {owned && (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                  )}
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-slate-800/80 pt-2 text-xs">
                  <span className="text-[11px] text-slate-400">
                    {owned ? "Desbloqueada" : "Permanente"}
                  </span>
                  <span
                    className={`font-bold ${
                      owned
                        ? "text-emerald-300"
                        : canBuy
                          ? "text-fuchsia-300"
                          : "text-rose-400"
                    }`}
                  >
                    {owned ? "ATIVA" : `${skill.custo} pt(s)`}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

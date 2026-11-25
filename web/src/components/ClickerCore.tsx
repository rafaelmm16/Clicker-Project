"use client";

import type { MouseEvent, PointerEvent } from "react";
import {
  Activity,
  Bot,
  Cpu,
  Flame,
  Gauge,
  Keyboard,
  MousePointerClick,
  Radio,
  Sparkles,
  Zap,
} from "lucide-react";
import type { CyberEvent, FloatingGain } from "@/hooks/useClickerGame";
import {
  calculateTotalBonus,
  formatNumber,
  GameState,
  getAutoSpeedMultiplier,
  getBitsPerClick,
  getBitsPerSecond,
  getClicksPerManualAction,
  getCritConfig,
  getEffectiveAutoClicksPerSecond,
  getPrestigeMultiplier,
} from "@/lib/game";

interface ClickerCoreProps {
  state: GameState;
  lastBitChar: "0" | "1";
  floatingGains: FloatingGain[];
  overclockCharge: number;
  overclockSecondsLeft: number;
  frenzySecondsLeft: number;
  comboCount: number;
  comboMultiplier: number;
  empCooldownLeft: number;
  empCooldownMax: number;
  empSurgeSecondsLeft: number;
  activeTempMultiplier: number;
  activeEvent: CyberEvent | null;
  onClickBits: (coords?: { x: number; y: number }) => void;
  onStartHoldClick: (coords?: { x: number; y: number }) => void;
  onStopHoldClick: () => void;
  onTriggerEmp: () => void;
  onClaimEvent: () => void;
  onGoToAscension: () => void;
}

export function ClickerCore({
  state,
  lastBitChar,
  floatingGains,
  overclockCharge,
  overclockSecondsLeft,
  frenzySecondsLeft,
  comboCount,
  comboMultiplier,
  empCooldownLeft,
  empCooldownMax,
  empSurgeSecondsLeft,
  activeTempMultiplier,
  activeEvent,
  onClickBits,
  onStartHoldClick,
  onStopHoldClick,
  onTriggerEmp,
  onClaimEvent,
  onGoToAscension,
}: ClickerCoreProps) {
  const bitsPerClick = getBitsPerClick(state, activeTempMultiplier);
  const basePerClick = 1 + calculateTotalBonus(state.upgrades);
  const prestigeMult = getPrestigeMultiplier(state.prestigeLevel);
  const autoClicksPerSec = getEffectiveAutoClicksPerSecond(state.upgrades);
  const autoSpeedMult = getAutoSpeedMultiplier(state.upgrades);
  const clicksPerManual = getClicksPerManualAction(state);
  const bitsPerSec = getBitsPerSecond(state, activeTempMultiplier);
  const critCfg = getCritConfig(state);
  const progressPct = Math.min(100, (state.bits / state.nextAscBits) * 100);
  const isBoosted = activeTempMultiplier > 1;

  const getRelativeCoords = (
    el: HTMLButtonElement,
    clientX: number,
    clientY: number
  ) => {
    const rect = el.getBoundingClientRect();
    return {
      x: ((clientX - rect.left) / rect.width) * 100,
      y: ((clientY - rect.top) / rect.height) * 100,
    };
  };

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClickBits(getRelativeCoords(e.currentTarget, e.clientX, e.clientY));
  };

  const handlePointerDown = (e: PointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0) return;
    onStartHoldClick(getRelativeCoords(e.currentTarget, e.clientX, e.clientY));
  };

  return (
    <section className="flex flex-col gap-4 rounded-xl border border-emerald-500/30 bg-[#080f1c]/90 p-5 shadow-[0_0_32px_rgba(0,255,157,0.08)]">
      {/* Evento Aleatório: Pacote Criptografado / Glitch */}
      {activeEvent && (
        <button
          type="button"
          onClick={onClaimEvent}
          className="flex w-full animate-pulse cursor-pointer items-center justify-between gap-2 rounded-lg border border-amber-400/80 bg-gradient-to-r from-amber-500/20 via-fuchsia-500/20 to-cyan-500/20 px-3.5 py-2.5 text-left shadow-[0_0_24px_rgba(251,191,36,0.28)] transition hover:scale-[1.01]"
        >
          <div className="flex items-center gap-2">
            <Radio className="h-4 w-4 shrink-0 text-amber-300" />
            <div>
              <p className="text-xs font-extrabold tracking-wide text-amber-200 uppercase">
                {activeEvent.label}
              </p>
              <p className="text-[11px] text-amber-100/80">
                Clique agora para capturar antes que o sinal expire!
              </p>
            </div>
          </div>
          <span className="shrink-0 rounded bg-amber-400 px-2 py-1 text-[10px] font-black text-slate-950 uppercase">
            CAPTURAR
          </span>
        </button>
      )}

      {/* Display de Bits */}
      <div className="rounded-lg border border-emerald-500/20 bg-slate-950/80 p-4 text-center">
        <p className="text-[11px] font-semibold tracking-[0.25em] text-cyan-400/90 uppercase">
          {"// Saldo Disponível"}
        </p>
        <div className="mt-1 flex items-baseline justify-center gap-2">
          <span className="text-4xl font-bold tracking-tight text-emerald-300 drop-shadow-[0_0_14px_rgba(0,255,157,0.45)] sm:text-5xl">
            {formatNumber(state.bits, 2)}
          </span>
          <span className="text-sm font-semibold text-emerald-500 uppercase">
            Bits
          </span>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1 rounded border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-emerald-300">
            <Zap className="h-3.5 w-3.5" />+{formatNumber(bitsPerClick, 3)} / clique
          </span>
          <span className="inline-flex items-center gap-1 rounded border border-cyan-400/30 bg-cyan-500/10 px-2.5 py-1 text-cyan-300">
            <Sparkles className="h-3.5 w-3.5" />
            Prestígio: {prestigeMult.toFixed(2)}x
          </span>
          {autoClicksPerSec > 0 && (
            <span className="inline-flex items-center gap-1 rounded border border-amber-400/40 bg-amber-500/10 px-2.5 py-1 text-amber-200">
              <Bot className="h-3.5 w-3.5 text-amber-300" />
              Auto: {formatNumber(autoClicksPerSec, 1)}/s (+{formatNumber(bitsPerSec, 2)}/s)
            </span>
          )}
          {clicksPerManual > 1 && (
            <span className="inline-flex items-center gap-1 rounded border border-orange-400/40 bg-orange-500/10 px-2.5 py-1 text-orange-200">
              <MousePointerClick className="h-3.5 w-3.5 text-orange-300" />
              {clicksPerManual}x cliques/ação
            </span>
          )}
          {autoSpeedMult > 1 && (
            <span className="inline-flex items-center gap-1 rounded border border-sky-400/40 bg-sky-500/10 px-2.5 py-1 text-sky-200">
              <Gauge className="h-3.5 w-3.5 text-sky-300" />
              Vel. Auto: {autoSpeedMult.toFixed(2)}x
            </span>
          )}
        </div>

        {/* Buffs ativos */}
        {(overclockSecondsLeft > 0 ||
          frenzySecondsLeft > 0 ||
          comboCount > 0 ||
          empSurgeSecondsLeft > 0) && (
          <div className="mt-2.5 flex flex-wrap items-center justify-center gap-2">
            {comboCount > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full border border-sky-400/70 bg-sky-500/20 px-2.5 py-0.5 text-[11px] font-bold text-sky-200">
                <Activity className="h-3.5 w-3.5 text-sky-300" />
                COMBO {comboCount} ({comboMultiplier.toFixed(1)}x)
              </span>
            )}
            {overclockSecondsLeft > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full border border-orange-400/70 bg-orange-500/20 px-2.5 py-0.5 text-[11px] font-bold text-orange-200">
                <Flame className="h-3.5 w-3.5 text-orange-400" />
                OVERCLOCK 2x ({overclockSecondsLeft}s)
              </span>
            )}
            {frenzySecondsLeft > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full border border-fuchsia-400/70 bg-fuchsia-500/20 px-2.5 py-0.5 text-[11px] font-bold text-fuchsia-200">
                <Sparkles className="h-3.5 w-3.5 text-fuchsia-300" />
                FRENESI 5x ({frenzySecondsLeft}s)
              </span>
            )}
            {empSurgeSecondsLeft > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/80 bg-amber-500/25 px-2.5 py-0.5 text-[11px] font-bold text-amber-200">
                <Zap className="h-3.5 w-3.5 text-amber-300" />
                CRÍTICO 100% ({empSurgeSecondsLeft}s)
              </span>
            )}
          </div>
        )}

        <p className="mt-2 text-[11px] text-slate-400">
          Base {formatNumber(basePerClick, 3)} × {prestigeMult.toFixed(2)}x
          {isBoosted ? ` × ${activeTempMultiplier.toFixed(1)}x boost` : ""} · Crítico:{" "}
          {empSurgeSecondsLeft > 0
            ? "100%"
            : `${(critCfg.chance * 100).toFixed(0)}%`}{" "}
          ({critCfg.multiplier}x)
        </p>
      </div>

      {/* Botão Principal de Clique */}
      <div className="relative flex items-center justify-center py-3">
        <button
          type="button"
          onClick={handleButtonClick}
          onPointerDown={handlePointerDown}
          onPointerUp={onStopHoldClick}
          onPointerLeave={onStopHoldClick}
          onPointerCancel={onStopHoldClick}
          className={`group relative flex h-56 w-56 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-full border-2 transition-all duration-100 active:scale-95 ${
            isBoosted
              ? "border-amber-400 bg-gradient-to-b from-amber-950/80 via-slate-950 to-fuchsia-950/70 shadow-[0_0_52px_rgba(251,191,36,0.35),inset_0_0_28px_rgba(217,70,239,0.22)]"
              : "border-emerald-400/70 bg-gradient-to-b from-emerald-950/90 via-slate-950 to-cyan-950/80 shadow-[0_0_40px_rgba(0,255,157,0.22),inset_0_0_24px_rgba(0,229,255,0.16)] hover:border-cyan-300 hover:shadow-[0_0_52px_rgba(0,229,255,0.32)]"
          }`}
        >
          <span className="pointer-events-none absolute inset-3 rounded-full border border-dashed border-emerald-400/30 transition-transform duration-300 group-hover:rotate-12" />
          <Cpu
            className={`mb-2 h-11 w-11 transition-transform duration-150 group-hover:scale-110 group-active:scale-90 ${
              isBoosted ? "text-amber-300" : "text-emerald-300"
            }`}
          />
          <span className="text-lg font-bold tracking-[0.2em] text-emerald-200 uppercase">
            GERAR BIT
          </span>
          <span className="mt-1 rounded border border-cyan-400/30 bg-cyan-500/10 px-2.5 py-0.5 text-xs font-bold text-cyan-300">
            BIT: {lastBitChar}
          </span>

          {/* Números flutuantes */}
          {floatingGains.map((g) => (
            <span
              key={g.id}
              style={{ left: `${g.x}%`, top: `${g.y}%` }}
              className={`animate-float-up pointer-events-none absolute font-extrabold ${
                g.isCrit
                  ? "text-base text-amber-300 drop-shadow-[0_0_12px_rgba(251,191,36,0.95)]"
                  : "text-sm text-emerald-300 drop-shadow-[0_0_8px_rgba(0,255,157,0.8)]"
              }`}
            >
              {g.text}
            </span>
          ))}
        </button>
      </div>

      {/* Barra de Overclock (Combo) */}
      <div className="rounded-lg border border-orange-500/25 bg-slate-950/75 p-3">
        <div className="flex items-center justify-between text-xs">
          <span className="inline-flex items-center gap-1 font-semibold text-orange-300">
            <Flame className="h-3.5 w-3.5" />
            {overclockSecondsLeft > 0
              ? `OVERCLOCK ATIVO (2x)`
              : "Carga de Overclock"}
          </span>
          <span className="text-slate-300">
            {overclockSecondsLeft > 0
              ? `${overclockSecondsLeft}s restantes`
              : `${overclockCharge}%`}
          </span>
        </div>
        <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-900 ring-1 ring-orange-500/20">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500 transition-all duration-150"
            style={{
              width: `${
                overclockSecondsLeft > 0
                  ? (overclockSecondsLeft / 10) * 100
                  : overclockCharge
              }%`,
            }}
          />
        </div>
      </div>

      {/* Habilidade Ativa: Pulso EMP */}
      <button
        type="button"
        disabled={empCooldownLeft > 0}
        onClick={onTriggerEmp}
        className={`relative flex w-full items-center justify-between overflow-hidden rounded-lg border px-3.5 py-2.5 text-left transition ${
          empCooldownLeft === 0
            ? "cursor-pointer border-cyan-400/65 bg-gradient-to-r from-cyan-500/20 via-sky-500/15 to-emerald-500/20 shadow-[0_0_18px_rgba(0,229,255,0.18)] hover:border-emerald-300 hover:shadow-[0_0_24px_rgba(0,255,157,0.25)] active:scale-[0.99]"
            : "cursor-not-allowed border-slate-800 bg-slate-950/70 opacity-75"
        }`}
      >
        {empCooldownLeft > 0 && (
          <div
            className="pointer-events-none absolute inset-y-0 left-0 bg-cyan-500/10 transition-all duration-500"
            style={{
              width: `${((empCooldownMax - empCooldownLeft) / empCooldownMax) * 100}%`,
            }}
          />
        )}
        <div className="relative flex items-center gap-2">
          <Zap
            className={`h-4 w-4 shrink-0 ${
              empCooldownLeft === 0 ? "text-cyan-300" : "text-slate-500"
            }`}
          />
          <div>
            <p className="text-xs font-bold tracking-wide text-slate-100 uppercase">
              Pulso EMP{" "}
              <kbd className="ml-1 rounded border border-slate-700 bg-slate-900 px-1 py-0.2 text-[10px] text-cyan-300">
                E
              </kbd>
            </p>
            <p className="text-[11px] text-slate-400">
              Rajada de cliques críticos + 100% crítico temporário
            </p>
          </div>
        </div>
        <span
          className={`relative shrink-0 rounded px-2 py-1 text-[10px] font-extrabold uppercase ${
            empCooldownLeft === 0
              ? "bg-cyan-400 text-slate-950"
              : "border border-slate-700 bg-slate-900 text-slate-400"
          }`}
        >
          {empCooldownLeft === 0 ? "DISPARAR" : `${empCooldownLeft}s`}
        </span>
      </button>

      {/* Dica de Teclado */}
      <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
        <Keyboard className="h-4 w-4 text-cyan-400" />
        <span>
          Pressione{" "}
          <kbd className="rounded border border-slate-700 bg-slate-900 px-1.5 py-0.5 text-emerald-300">
            0
          </kbd>
          ,{" "}
          <kbd className="rounded border border-slate-700 bg-slate-900 px-1.5 py-0.5 text-emerald-300">
            1
          </kbd>{" "}
          ou{" "}
          <kbd className="rounded border border-slate-700 bg-slate-900 px-1.5 py-0.5 text-emerald-300">
            Espaço
          </kbd>{" "}
          (ou segure) ·{" "}
          <kbd className="rounded border border-slate-700 bg-slate-900 px-1.5 py-0.5 text-cyan-300">
            E
          </kbd>{" "}
          EMP
        </span>
      </div>

      {/* Barra de Marco de Prestígio */}
      <div className="rounded-lg border border-cyan-500/25 bg-slate-950/75 p-3.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-cyan-300">
            Próximo ponto de prestígio
          </span>
          <span className="text-slate-300">
            {formatNumber(state.bits, 0)} / {formatNumber(state.nextAscBits, 0)} Bits
          </span>
        </div>
        <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-900 ring-1 ring-cyan-500/20">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-[0_0_12px_rgba(0,229,255,0.6)] transition-all duration-200"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="mt-2.5 flex items-center justify-between text-xs">
          <span className="text-slate-400">
            Pendentes nesta run:{" "}
            <strong className="text-emerald-300">{state.contAsc}</strong>
          </span>
          {state.contAsc > 0 && (
            <button
              type="button"
              onClick={onGoToAscension}
              className="cursor-pointer rounded border border-emerald-400/50 bg-emerald-500/15 px-2.5 py-1 text-[11px] font-bold text-emerald-200 transition hover:bg-emerald-500/25"
            >
              Ascender agora →
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

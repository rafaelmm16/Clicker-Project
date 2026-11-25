"use client";

import { useState } from "react";
import { ShoppingBag, Sparkles, Trophy } from "lucide-react";
import { AchievementsStatsPanel } from "@/components/AchievementsStatsPanel";
import { AscensionPanel } from "@/components/AscensionPanel";
import { ClickerCore } from "@/components/ClickerCore";
import { HeaderBar } from "@/components/HeaderBar";
import { OfflineModal } from "@/components/OfflineModal";
import { ShopPanel } from "@/components/ShopPanel";
import { ToastContainer } from "@/components/ToastContainer";
import { useClickerGame } from "@/hooks/useClickerGame";
import { ACHIEVEMENT_DEFS } from "@/lib/game";

type ActiveTab = "shop" | "ascension" | "stats";

export default function HomePage() {
  const {
    state,
    offlineReport,
    toasts,
    floatingGains,
    lastBitChar,
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
    handleClick,
    startHoldClick,
    stopHoldClick,
    triggerEmp,
    claimEvent,
    buyUpgrade,
    buyPrestigeSkill,
    ascend,
    renamePc,
    toggleSound,
    manualSave,
    resetSave,
    dismissOfflineReport,
  } = useClickerGame();

  const [activeTab, setActiveTab] = useState<ActiveTab>("shop");

  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="crt-overlay fixed inset-0 z-40" />

      <HeaderBar
        pcName={state.nome}
        totalBitsEarned={state.totalBitsEarned}
        soundEnabled={state.soundEnabled}
        onRename={renamePc}
        onToggleSound={toggleSound}
        onSave={manualSave}
        onReset={resetSave}
      />

      <main className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-12">
        {/* Coluna Esquerda: Núcleo do Clicker */}
        <div className="lg:col-span-5">
          <ClickerCore
            state={state}
            lastBitChar={lastBitChar}
            floatingGains={floatingGains}
            overclockCharge={overclockCharge}
            overclockSecondsLeft={overclockSecondsLeft}
            frenzySecondsLeft={frenzySecondsLeft}
            comboCount={comboCount}
            comboMultiplier={comboMultiplier}
            empCooldownLeft={empCooldownLeft}
            empCooldownMax={empCooldownMax}
            empSurgeSecondsLeft={empSurgeSecondsLeft}
            activeTempMultiplier={activeTempMultiplier}
            activeEvent={activeEvent}
            onClickBits={handleClick}
            onStartHoldClick={startHoldClick}
            onStopHoldClick={stopHoldClick}
            onTriggerEmp={triggerEmp}
            onClaimEvent={claimEvent}
            onGoToAscension={() => setActiveTab("ascension")}
          />
        </div>

        {/* Coluna Direita: Abas (Loja / Ascensão / Conquistas) */}
        <div className="flex flex-col rounded-xl border border-emerald-500/25 bg-[#080f1c]/90 shadow-[0_0_32px_rgba(0,229,255,0.06)] lg:col-span-7">
          <nav className="grid grid-cols-3 border-b border-emerald-500/20 bg-slate-950/70 p-1.5">
            <button
              type="button"
              onClick={() => setActiveTab("shop")}
              className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-xs font-bold tracking-wider uppercase transition ${
                activeTab === "shop"
                  ? "border border-emerald-400/50 bg-emerald-500/15 text-emerald-300 shadow-[0_0_12px_rgba(0,255,157,0.16)]"
                  : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
              }`}
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Sh@p</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("ascension")}
              className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-xs font-bold tracking-wider uppercase transition ${
                activeTab === "ascension"
                  ? "border border-cyan-400/50 bg-cyan-500/15 text-cyan-300 shadow-[0_0_12px_rgba(0,229,255,0.16)]"
                  : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
              }`}
            >
              <Sparkles className="h-4 w-4" />
              <span>Ascensão</span>
              {(state.contAsc > 0 || state.prestigeCurrency > 0) && (
                <span className="rounded-full bg-emerald-400 px-1.5 py-0.5 text-[10px] font-extrabold text-slate-950">
                  {state.contAsc > 0 ? `+${state.contAsc}` : state.prestigeCurrency}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("stats")}
              className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-xs font-bold tracking-wider uppercase transition ${
                activeTab === "stats"
                  ? "border border-amber-400/50 bg-amber-500/15 text-amber-200 shadow-[0_0_12px_rgba(251,191,36,0.14)]"
                  : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
              }`}
            >
              <Trophy className="h-4 w-4" />
              <span className="hidden sm:inline">Conquistas</span>
              <span className="rounded border border-slate-700 bg-slate-900 px-1.5 py-0.5 text-[10px] text-slate-300">
                {state.achievements.length}/{ACHIEVEMENT_DEFS.length}
              </span>
            </button>
          </nav>

          <div className="flex-1 p-5">
            {activeTab === "shop" && (
              <ShopPanel state={state} onBuy={buyUpgrade} />
            )}
            {activeTab === "ascension" && (
              <AscensionPanel
                state={state}
                onAscend={ascend}
                onBuySkill={buyPrestigeSkill}
              />
            )}
            {activeTab === "stats" && <AchievementsStatsPanel state={state} />}
          </div>
        </div>
      </main>

      <footer className="border-t border-emerald-500/15 py-3 text-center text-[11px] text-slate-500">
        CLICKER PROJECT // Versão Web (Next.js + Tailwind CSS) — Save automático
        e produção offline ativos
      </footer>

      <ToastContainer toasts={toasts} />

      {offlineReport && (
        <OfflineModal report={offlineReport} onDismiss={dismissOfflineReport} />
      )}
    </div>
  );
}

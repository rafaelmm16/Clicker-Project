"use client";

import type { ComponentType } from "react";
import { useState } from "react";
import {
  Atom,
  Bot,
  BrainCircuit,
  Cpu,
  Disc,
  Disc3,
  FastForward,
  Gauge,
  GitFork,
  Globe,
  HardDrive,
  Infinity as InfinityIcon,
  Layers,
  MousePointerClick,
  Network,
  Orbit,
  Radar,
  Save,
  Server,
  Usb,
} from "lucide-react";
import {
  BuyMode,
  formatNumber,
  GameState,
  getBulkPurchaseInfo,
  getShopDiscountMultiplier,
  UpgradeId,
} from "@/lib/game";

const UPGRADE_ICONS: Record<UpgradeId, ComponentType<{ className?: string }>> = {
  disquete: Save,
  autoclicker: Bot,
  macro_script: MousePointerClick,
  cd: Disc,
  dvd: Disc3,
  pendrive: Usb,
  turbo_bus: Gauge,
  hd: HardDrive,
  ram: Cpu,
  internet: Globe,
  mainframe: Server,
  hyper_thread: GitFork,
  gpu_cluster: Layers,
  clock_multiplier: FastForward,
  quantum_pc: Atom,
  ai_core: BrainCircuit,
  neural_link: Network,
  quantum_swarm: Radar,
  dyson_server: Orbit,
  singularity_os: InfinityIcon,
};

interface ShopPanelProps {
  state: GameState;
  onBuy: (id: UpgradeId, mode: BuyMode) => void;
}

export function ShopPanel({ state, onBuy }: ShopPanelProps) {
  const [buyMode, setBuyMode] = useState<BuyMode>("1");
  const discount = getShopDiscountMultiplier(state);
  const hasDiscount = discount < 1;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold tracking-[0.18em] text-emerald-300 uppercase">
              {"// SH@P — Upgrades de Hardware"}
            </h2>
            {hasDiscount && (
              <span className="rounded border border-emerald-400/40 bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-bold text-emerald-300">
                -15% CACHE
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400">
            Compre em lote e escale do Disquete até a Singularidade OS.
          </p>
        </div>

        {/* Seletor de compra em lote: 1x / 10x / MAX */}
        <div className="inline-flex rounded-lg border border-emerald-500/30 bg-slate-950 p-0.5 text-xs">
          {(["1", "10", "max"] as BuyMode[]).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setBuyMode(mode)}
              className={`cursor-pointer rounded-md px-2.5 py-1 font-bold uppercase transition ${
                buyMode === mode
                  ? "bg-emerald-400 text-slate-950"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {mode === "max" ? "MAX" : `${mode}x`}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {state.upgrades.map((item, idx) => {
          const { count, totalCost } = getBulkPurchaseInfo(
            item,
            state.bits,
            buyMode,
            discount
          );
          const canAfford = state.bits >= totalCost;
          const Icon = UPGRADE_ICONS[item.id];
          const isAuto = (item.clicksPerSecond ?? 0) > 0;
          const isMulti = (item.extraClicksPerManual ?? 0) > 0;
          const isSpeed = (item.speedBonus ?? 0) > 0;

          return (
            <button
              key={item.id}
              type="button"
              disabled={!canAfford}
              onClick={() => onBuy(item.id, buyMode)}
              className={`group flex flex-col justify-between rounded-lg border p-3.5 text-left transition-all ${
                canAfford
                  ? isAuto
                    ? "cursor-pointer border-cyan-400/55 bg-slate-950/90 hover:border-emerald-300 hover:bg-cyan-950/30 hover:shadow-[0_0_20px_rgba(0,229,255,0.18)] active:scale-[0.99]"
                    : "cursor-pointer border-emerald-400/45 bg-slate-950/90 hover:border-cyan-300 hover:bg-emerald-950/30 hover:shadow-[0_0_20px_rgba(0,255,157,0.14)] active:scale-[0.99]"
                  : "cursor-not-allowed border-slate-800 bg-slate-950/45 opacity-60"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md border ${
                      canAfford
                        ? isAuto
                          ? "border-cyan-400/50 bg-cyan-500/15 text-cyan-300"
                          : "border-emerald-400/40 bg-emerald-500/10 text-emerald-300"
                        : "border-slate-700 bg-slate-900 text-slate-500"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-slate-500">
                        [{idx + 1}]
                      </span>
                      <span className="text-sm font-bold text-slate-100">
                        {item.nome}
                      </span>
                      {isAuto && (
                        <span className="rounded border border-cyan-400/40 bg-cyan-500/15 px-1.5 py-0.2 text-[9px] font-bold tracking-wider text-cyan-300 uppercase">
                          AUTO
                        </span>
                      )}
                      {isMulti && (
                        <span className="rounded border border-amber-400/40 bg-amber-500/15 px-1.5 py-0.2 text-[9px] font-bold tracking-wider text-amber-300 uppercase">
                          MULTI
                        </span>
                      )}
                      {isSpeed && (
                        <span className="rounded border border-sky-400/40 bg-sky-500/15 px-1.5 py-0.2 text-[9px] font-bold tracking-wider text-sky-300 uppercase">
                          VELOC.
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {item.descricao}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 rounded border border-cyan-400/30 bg-cyan-500/10 px-2 py-0.5 text-xs font-bold text-cyan-300">
                  x{item.quantidade}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-slate-800/80 pt-2.5 text-xs">
                {isAuto && item.multiplicador > 0 ? (
                  <span className="font-semibold text-fuchsia-300">
                    +{formatNumber(item.multiplicador, 0)}/clique · +{item.clicksPerSecond}/s
                  </span>
                ) : isAuto ? (
                  <span className="font-semibold text-cyan-300">
                    +{item.clicksPerSecond} clique/s
                  </span>
                ) : isMulti ? (
                  <span className="font-semibold text-amber-300">
                    +{item.extraClicksPerManual} clique(s)/ação
                  </span>
                ) : isSpeed ? (
                  <span className="font-semibold text-sky-300">
                    +{Math.round((item.speedBonus ?? 0) * 100)}% vel. auto
                  </span>
                ) : (
                  <span className="font-semibold text-emerald-400">
                    +{formatNumber(item.multiplicador, 3)} / clique
                  </span>
                )}
                <span
                  className={`font-bold ${
                    canAfford ? "text-cyan-300" : "text-rose-400"
                  }`}
                >
                  {buyMode !== "1" && canAfford ? `(${count}x) ` : ""}
                  {formatNumber(totalCost, 2)} Bits
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { Bot, Clock } from "lucide-react";
import { formatDuration, formatNumber, OfflineReport } from "@/lib/game";

interface OfflineModalProps {
  report: OfflineReport;
  onDismiss: () => void;
}

export function OfflineModal({ report, onDismiss }: OfflineModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl border border-cyan-400/60 bg-[#08101f] p-6 shadow-[0_0_40px_rgba(0,229,255,0.22)]">
        <div className="flex items-center gap-2.5 text-cyan-300">
          <Bot className="h-6 w-6" />
          <h2 className="text-sm font-extrabold tracking-[0.18em] uppercase">
            Relatório de Produção Offline
          </h2>
        </div>

        <p className="mt-3 text-xs text-slate-300">
          Seus scripts de Auto-Clicker continuaram minerando enquanto o terminal
          esteve fechado:
        </p>

        <div className="mt-4 space-y-2 rounded-lg border border-emerald-500/30 bg-slate-950/90 p-4 text-center">
          <div className="inline-flex items-center gap-1.5 text-xs text-slate-400">
            <Clock className="h-3.5 w-3.5 text-cyan-400" />
            <span>
              Tempo offline: <strong className="text-slate-200">{formatDuration(report.elapsedSec)}</strong>{" "}
              (eficiência {(report.efficiency * 100).toFixed(0)}%)
            </span>
          </div>
          <p className="text-3xl font-extrabold text-emerald-300 drop-shadow-[0_0_12px_rgba(0,255,157,0.5)]">
            +{formatNumber(report.bitsEarned, 2)} Bits
          </p>
        </div>

        <button
          type="button"
          onClick={onDismiss}
          className="mt-5 w-full cursor-pointer rounded-lg bg-gradient-to-r from-emerald-400 to-cyan-400 px-4 py-2.5 text-xs font-extrabold tracking-wider text-slate-950 uppercase transition hover:brightness-110"
        >
          Coletar e Continuar
        </button>
      </div>
    </div>
  );
}

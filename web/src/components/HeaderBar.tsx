"use client";

import { useState } from "react";
import {
  Check,
  Pencil,
  RotateCcw,
  Save,
  Terminal,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { getPcTier } from "@/lib/game";

interface HeaderBarProps {
  pcName: string;
  totalBitsEarned: number;
  soundEnabled: boolean;
  onRename: (name: string) => void;
  onToggleSound: () => void;
  onSave: () => void;
  onReset: () => void;
}

export function HeaderBar({
  pcName,
  totalBitsEarned,
  soundEnabled,
  onRename,
  onToggleSound,
  onSave,
  onReset,
}: HeaderBarProps) {
  const [editing, setEditing] = useState(false);
  const [draftName, setDraftName] = useState(pcName);
  const [confirmReset, setConfirmReset] = useState(false);

  const tier = getPcTier(totalBitsEarned);

  const startEdit = () => {
    setDraftName(pcName);
    setEditing(true);
  };

  const submitEdit = () => {
    if (draftName.trim()) {
      onRename(draftName);
    }
    setEditing(false);
  };

  return (
    <header className="border-b border-emerald-500/25 bg-[#070c16]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-400/40 bg-emerald-500/10 text-emerald-400 shadow-[0_0_16px_rgba(0,255,157,0.18)]">
            <Terminal className="h-5 w-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold tracking-[0.2em] text-cyan-400 uppercase">
                CLICKER_OS v2.5
              </span>
              <span
                className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold ${tier.badgeClass}`}
              >
                {tier.nome}
              </span>
            </div>

            {editing ? (
              <div className="mt-1 flex items-center gap-1.5">
                <span className="text-xs text-slate-400">root@</span>
                <input
                  type="text"
                  value={draftName}
                  maxLength={32}
                  autoFocus
                  onChange={(e) => setDraftName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") submitEdit();
                    if (e.key === "Escape") setEditing(false);
                  }}
                  className="w-40 rounded border border-cyan-400/60 bg-slate-950 px-2 py-0.5 text-sm text-cyan-200 outline-none focus:ring-1 focus:ring-cyan-400"
                />
                <button
                  type="button"
                  onClick={submitEdit}
                  className="rounded border border-emerald-400/40 bg-emerald-500/15 p-1 text-emerald-300 hover:bg-emerald-500/25"
                  title="Salvar nome"
                >
                  <Check className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="rounded border border-slate-600/50 bg-slate-800/70 p-1 text-slate-300 hover:bg-slate-700"
                  title="Cancelar"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={startEdit}
                className="group mt-0.5 flex items-center gap-1.5 text-left text-sm font-semibold text-emerald-200 transition hover:text-cyan-300"
                title="Clique para renomear seu PC"
              >
                <span>root@{pcName}:~#</span>
                <Pencil className="h-3.5 w-3.5 text-slate-500 transition group-hover:text-cyan-400" />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleSound}
            className={`inline-flex cursor-pointer items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-semibold transition ${
              soundEnabled
                ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20"
                : "border-slate-700 bg-slate-900/70 text-slate-400 hover:bg-slate-800"
            }`}
            title={soundEnabled ? "Silenciar efeitos sonoros" : "Ativar efeitos sonoros"}
          >
            {soundEnabled ? (
              <Volume2 className="h-3.5 w-3.5" />
            ) : (
              <VolumeX className="h-3.5 w-3.5" />
            )}
            <span className="hidden sm:inline">
              {soundEnabled ? "Som ON" : "Mudo"}
            </span>
          </button>

          <button
            type="button"
            onClick={onSave}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-cyan-400/40 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-500/20 hover:shadow-[0_0_12px_rgba(0,229,255,0.25)]"
          >
            <Save className="h-3.5 w-3.5" />
            Salvar
          </button>

          {confirmReset ? (
            <div className="flex items-center gap-1.5 rounded-md border border-rose-500/50 bg-rose-950/50 px-2.5 py-1 text-xs">
              <span className="text-rose-200">Resetar?</span>
              <button
                type="button"
                onClick={() => {
                  onReset();
                  setConfirmReset(false);
                }}
                className="cursor-pointer rounded bg-rose-500 px-2 py-0.5 font-bold text-slate-950 hover:bg-rose-400"
              >
                Sim
              </button>
              <button
                type="button"
                onClick={() => setConfirmReset(false)}
                className="cursor-pointer rounded border border-slate-600 px-2 py-0.5 text-slate-300 hover:bg-slate-800"
              >
                Não
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmReset(true)}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-300 transition hover:bg-rose-500/20"
              title="Resetar progresso salvo"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Resetar
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

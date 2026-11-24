"use client";

import { Info, Sparkles, Trophy } from "lucide-react";
import type { ToastMessage } from "@/hooks/useClickerGame";

interface ToastContainerProps {
  toasts: ToastMessage[];
}

export function ToastContainer({ toasts }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-50 flex w-80 max-w-[calc(100vw-2rem)] flex-col gap-2">
      {toasts.map((toast) => {
        const styleMap = {
          achievement:
            "border-amber-400/60 bg-slate-950/95 text-amber-200 shadow-[0_0_20px_rgba(251,191,36,0.2)]",
          prestige:
            "border-cyan-400/60 bg-slate-950/95 text-cyan-200 shadow-[0_0_20px_rgba(0,229,255,0.22)]",
          info: "border-emerald-400/50 bg-slate-950/95 text-emerald-200 shadow-[0_0_20px_rgba(0,255,157,0.16)]",
        }[toast.variant];

        const Icon =
          toast.variant === "achievement"
            ? Trophy
            : toast.variant === "prestige"
              ? Sparkles
              : Info;

        return (
          <div
            key={toast.id}
            className={`animate-toast-in flex items-start gap-2.5 rounded-lg border p-3 backdrop-blur-md ${styleMap}`}
          >
            <Icon className="mt-0.5 h-4 w-4 shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-bold tracking-wide">{toast.title}</p>
              <p className="mt-0.5 text-[11px] text-slate-300">
                {toast.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

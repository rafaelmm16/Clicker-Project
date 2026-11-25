"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  ASCENSION_GROWTH_RATE,
  BuyMode,
  clearGameState,
  createInitialState,
  createInitialUpgrades,
  evaluateAchievements,
  formatNumber,
  GameState,
  getAutoCritChance,
  getBitsPerClick,
  getBulkPurchaseInfo,
  getClicksPerManualAction,
  getComboConfig,
  getComboMultiplier,
  getCritConfig,
  getEffectiveAutoClicksPerSecond,
  getEmpConfig,
  getHoldClickIntervalMs,
  getPrestigeMultiplier,
  getShopDiscountMultiplier,
  hasPrestigeSkill,
  loadGameStateWithOffline,
  OfflineReport,
  PRESTIGE_SKILLS,
  PrestigeSkillId,
  PRICE_GROWTH_RATE,
  saveGameState,
  UpgradeId,
} from "@/lib/game";
import {
  playAscendSound,
  playBuySound,
  playClickSound,
  playEmpSound,
  playEventSound,
  playOverclockSound,
} from "@/lib/sound";

export interface ToastMessage {
  id: number;
  title: string;
  description: string;
  variant: "achievement" | "prestige" | "info";
}

export interface FloatingGain {
  id: number;
  text: string;
  x: number;
  y: number;
  isCrit?: boolean;
}

export interface CyberEvent {
  id: number;
  kind: "frenzy" | "jackpot";
  label: string;
  expiresAt: number;
}

interface StoreData {
  game: GameState;
  offlineReport: OfflineReport | null;
}

const SERVER_SNAPSHOT: StoreData = {
  game: createInitialState(),
  offlineReport: null,
};

let clientSnapshot: StoreData | null = null;
const storeListeners = new Set<() => void>();

function getServerSnapshot(): StoreData {
  return SERVER_SNAPSHOT;
}

function getClientSnapshot(): StoreData {
  if (clientSnapshot === null) {
    const loaded = loadGameStateWithOffline();
    if (loaded) {
      clientSnapshot = {
        game: loaded.state,
        offlineReport: loaded.offlineReport,
      };
      if (loaded.offlineReport) {
        saveGameState(loaded.state);
      }
    } else {
      clientSnapshot = {
        game: createInitialState(),
        offlineReport: null,
      };
    }
  }
  return clientSnapshot;
}

function subscribeStore(listener: () => void): () => void {
  storeListeners.add(listener);
  return () => {
    storeListeners.delete(listener);
  };
}

function emitStore(): void {
  for (const listener of storeListeners) {
    listener();
  }
}

function commitGameState(next: GameState, persist = true): void {
  const current = getClientSnapshot();
  clientSnapshot = { ...current, game: next };
  if (persist) {
    saveGameState(next);
  }
  emitStore();
}

function clearOfflineReport(): void {
  const current = getClientSnapshot();
  if (!current.offlineReport) return;
  clientSnapshot = { ...current, offlineReport: null };
  emitStore();
}

export function useClickerGame() {
  const store = useSyncExternalStore(
    subscribeStore,
    getClientSnapshot,
    getServerSnapshot
  );
  const state = store.game;
  const offlineReport = store.offlineReport;

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [floatingGains, setFloatingGains] = useState<FloatingGain[]>([]);
  const [lastBitChar, setLastBitChar] = useState<"0" | "1">("1");

  // Mecânicas temporárias de gameplay (Overclock, Frenesi, Combo, Pulso EMP e Eventos)
  const [overclockCharge, setOverclockCharge] = useState(0);
  const [overclockSecondsLeft, setOverclockSecondsLeft] = useState(0);
  const [frenzySecondsLeft, setFrenzySecondsLeft] = useState(0);
  const [comboCount, setComboCount] = useState(0);
  const [empCooldownLeft, setEmpCooldownLeft] = useState(0);
  const [empSurgeSecondsLeft, setEmpSurgeSecondsLeft] = useState(0);
  const [activeEvent, setActiveEvent] = useState<CyberEvent | null>(null);

  const overclockSecRef = useRef(0);
  const frenzySecRef = useRef(0);
  const overclockChargeRef = useRef(0);
  const comboCountRef = useRef(0);
  const comboTimeoutRef = useRef<number | null>(null);
  const empCooldownRef = useRef(0);
  const empSurgeRef = useRef(0);
  const autoClickAccRef = useRef(0);
  const holdTimerRef = useRef<number | null>(null);
  const nextIdRef = useRef(1);

  const comboConfig = getComboConfig(state);
  const comboMultiplier = getComboMultiplier(comboCount, comboConfig.maxMultiplier);
  const empConfig = getEmpConfig(state);

  const activeTempMultiplier =
    (overclockSecondsLeft > 0 ? 2 : 1) *
    (frenzySecondsLeft > 0 ? 5 : 1) *
    comboMultiplier;

  const getCurrentTempMultiplier = useCallback(() => {
    const currentGame = getClientSnapshot().game;
    const cfg = getComboConfig(currentGame);
    const cMult = getComboMultiplier(comboCountRef.current, cfg.maxMultiplier);
    return (
      (overclockSecRef.current > 0 ? 2 : 1) *
      (frenzySecRef.current > 0 ? 5 : 1) *
      cMult
    );
  }, []);

  const pushToast = useCallback(
    (
      title: string,
      description: string,
      variant: ToastMessage["variant"] = "info"
    ) => {
      const id = nextIdRef.current++;
      setToasts((prev) => [...prev.slice(-3), { id, title, description, variant }]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3800);
    },
    []
  );

  const applyClicks = useCallback(
    (
      clickCount: number,
      options?: {
        coords?: { x: number; y: number };
        manual?: boolean;
        forceCrit?: boolean;
        empUsed?: boolean;
      }
    ) => {
      if (clickCount <= 0) return;

      const manual = options?.manual ?? false;
      const prev = getClientSnapshot().game;

      // Atualiza Combo em cliques manuais
      let nextMaxCombo = prev.maxCombo;
      if (manual) {
        comboCountRef.current += 1;
        setComboCount(comboCountRef.current);
        nextMaxCombo = Math.max(prev.maxCombo, comboCountRef.current);

        if (comboTimeoutRef.current !== null) {
          window.clearTimeout(comboTimeoutRef.current);
        }
        const { decayMs } = getComboConfig(prev);
        comboTimeoutRef.current = window.setTimeout(() => {
          comboCountRef.current = 0;
          setComboCount(0);
          comboTimeoutRef.current = null;
        }, decayMs);
      }

      const tempMult = getCurrentTempMultiplier();

      const critCfg = getCritConfig(prev);
      let isCrit = false;
      let critMult = 1;
      if (options?.forceCrit) {
        isCrit = true;
        critMult = critCfg.multiplier;
      } else if (manual) {
        if (empSurgeRef.current > 0 || Math.random() < critCfg.chance) {
          isCrit = true;
          critMult = critCfg.multiplier;
        }
      } else {
        const autoCritChance = getAutoCritChance(prev);
        if (autoCritChance > 0 && Math.random() < autoCritChance) {
          isCrit = true;
          critMult = critCfg.multiplier;
        }
      }

      // Atualiza barra de Overclock em cliques manuais
      let triggeredOverclock = false;
      if (manual && overclockSecRef.current === 0) {
        const nextCharge = Math.min(100, overclockChargeRef.current + 8);
        if (nextCharge >= 100) {
          overclockChargeRef.current = 0;
          setOverclockCharge(0);
          overclockSecRef.current = 10;
          setOverclockSecondsLeft(10);
          triggeredOverclock = true;
        } else {
          overclockChargeRef.current = nextCharge;
          setOverclockCharge(nextCharge);
        }
      }

      const effectiveTempMult = triggeredOverclock ? tempMult * 2 : tempMult;
      const gain =
        getBitsPerClick(prev, effectiveTempMult) * clickCount * critMult;
      const nextBits = prev.bits + gain;

      let nextContAsc = prev.contAsc;
      let nextThreshold = prev.nextAscBits;
      let prestigeGained = 0;

      while (nextBits >= nextThreshold) {
        nextContAsc++;
        prestigeGained++;
        nextThreshold *= ASCENSION_GROWTH_RATE;
      }

      const draft: GameState = {
        ...prev,
        bits: nextBits,
        contAsc: nextContAsc,
        nextAscBits: nextThreshold,
        totalClicks: prev.totalClicks + clickCount,
        totalBitsEarned: prev.totalBitsEarned + gain,
        critCount: prev.critCount + (isCrit ? 1 : 0),
        overclockCount: prev.overclockCount + (triggeredOverclock ? 1 : 0),
        maxCombo: nextMaxCombo,
        empCount: prev.empCount + (options?.empUsed ? 1 : 0),
      };

      const { nextAchievements, newlyUnlocked } = evaluateAchievements(draft);
      commitGameState({ ...draft, achievements: nextAchievements });

      setLastBitChar(Math.random() > 0.5 ? "1" : "0");

      if (manual && prev.soundEnabled) {
        if (triggeredOverclock) {
          playOverclockSound();
        } else {
          playClickSound(isCrit);
        }
      }

      const floatId = nextIdRef.current++;
      const x = options?.coords?.x ?? 50 + (Math.random() * 24 - 12);
      const y = options?.coords?.y ?? 42 + (Math.random() * 14 - 7);
      const label = isCrit
        ? `CRIT! +${formatNumber(gain, 2)}`
        : `+${formatNumber(gain, 2)}`;

      setFloatingGains((curr) => [
        ...curr.slice(-14),
        { id: floatId, text: label, x, y, isCrit },
      ]);

      window.setTimeout(() => {
        setFloatingGains((curr) => curr.filter((f) => f.id !== floatId));
      }, 750);

      if (triggeredOverclock) {
        pushToast(
          "OVERCLOCK ATIVADO!",
          "Produção em 2x por 10 segundos!",
          "prestige"
        );
      }

      if (prestigeGained > 0) {
        pushToast(
          "MARCO DE PRESTÍGIO!",
          `+${prestigeGained} ponto(s) pendente(s) para ascensão.`,
          "prestige"
        );
      }

      for (const ach of newlyUnlocked) {
        pushToast(`CONQUISTA: ${ach.titulo}`, ach.descricao, "achievement");
      }
    },
    [getCurrentTempMultiplier, pushToast]
  );

  const handleClick = useCallback(
    (coords?: { x: number; y: number }) => {
      const prev = getClientSnapshot().game;
      const clicks = getClicksPerManualAction(prev);
      applyClicks(clicks, { coords, manual: true });
    },
    [applyClicks]
  );

  const stopHoldClick = useCallback(() => {
    if (holdTimerRef.current !== null) {
      window.clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
  }, []);

  const startHoldClick = useCallback(
    (coords?: { x: number; y: number }) => {
      stopHoldClick();
      const scheduleTick = () => {
        const currentGame = getClientSnapshot().game;
        const intervalMs = getHoldClickIntervalMs(currentGame);
        holdTimerRef.current = window.setTimeout(() => {
          handleClick(coords);
          scheduleTick();
        }, intervalMs);
      };
      scheduleTick();
    },
    [handleClick, stopHoldClick]
  );

  useEffect(() => stopHoldClick, [stopHoldClick]);

  const triggerEmp = useCallback(() => {
    if (empCooldownRef.current > 0) return;
    const prev = getClientSnapshot().game;
    const cfg = getEmpConfig(prev);

    empCooldownRef.current = cfg.cooldownSec;
    setEmpCooldownLeft(cfg.cooldownSec);
    empSurgeRef.current = cfg.surgeDurationSec;
    setEmpSurgeSecondsLeft(cfg.surgeDurationSec);

    if (prev.soundEnabled) {
      playEmpSound();
    }

    pushToast(
      "PULSO EMP DISPARADO!",
      `Rajada de ${cfg.burstClicks} cliques críticos + 100% crítico por ${cfg.surgeDurationSec}s!`,
      "prestige"
    );

    applyClicks(cfg.burstClicks, {
      manual: false,
      forceCrit: true,
      empUsed: true,
      coords: { x: 50, y: 35 },
    });
  }, [applyClicks, pushToast]);

  // Loop rápido de Auto-Clicker (100ms) escalando com bônus de velocidade
  useEffect(() => {
    const fastTimer = window.setInterval(() => {
      const currentGame = getClientSnapshot().game;
      const effectiveCps = getEffectiveAutoClicksPerSecond(
        currentGame.upgrades
      );
      if (effectiveCps <= 0) return;

      autoClickAccRef.current += effectiveCps * 0.1;
      if (autoClickAccRef.current >= 1) {
        const wholeClicks = Math.floor(autoClickAccRef.current);
        autoClickAccRef.current -= wholeClicks;
        applyClicks(wholeClicks, { manual: false });
      }
    }, 100);

    return () => window.clearInterval(fastTimer);
  }, [applyClicks]);

  // Tick de 1s: contagem regressiva de buffs (Overclock / Frenesi / EMP)
  useEffect(() => {
    const timer = window.setInterval(() => {
      if (overclockSecRef.current > 0) {
        overclockSecRef.current -= 1;
        setOverclockSecondsLeft(overclockSecRef.current);
      } else if (overclockChargeRef.current > 0) {
        overclockChargeRef.current = Math.max(
          0,
          overclockChargeRef.current - 5
        );
        setOverclockCharge(overclockChargeRef.current);
      }

      if (frenzySecRef.current > 0) {
        frenzySecRef.current -= 1;
        setFrenzySecondsLeft(frenzySecRef.current);
      }

      if (empCooldownRef.current > 0) {
        empCooldownRef.current -= 1;
        setEmpCooldownLeft(empCooldownRef.current);
      }

      if (empSurgeRef.current > 0) {
        empSurgeRef.current -= 1;
        setEmpSurgeSecondsLeft(empSurgeRef.current);
      }
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  // Spawner de Eventos Aleatórios ("Pacote Criptografado") a cada 35-55s
  useEffect(() => {
    let spawnTimeout = 0;
    let expireTimeout = 0;

    const scheduleNext = () => {
      const delayMs = (35 + Math.random() * 20) * 1000;
      spawnTimeout = window.setTimeout(() => {
        const isFrenzy = Math.random() > 0.45;
        const ev: CyberEvent = {
          id: nextIdRef.current++,
          kind: isFrenzy ? "frenzy" : "jackpot",
          label: isFrenzy
            ? "GLITCH DETECTADO: Frenesi 5x (15s)"
            : "PACOTE CRIPTOGRAFADO: Chuva de Bits!",
          expiresAt: Date.now() + 12_000,
        };
        setActiveEvent(ev);

        expireTimeout = window.setTimeout(() => {
          setActiveEvent((curr) => (curr && curr.id === ev.id ? null : curr));
          scheduleNext();
        }, 12_000);
      }, delayMs);
    };

    scheduleNext();
    return () => {
      window.clearTimeout(spawnTimeout);
      window.clearTimeout(expireTimeout);
    };
  }, []);

  const claimEvent = useCallback(() => {
    if (!activeEvent) return;
    const ev = activeEvent;
    setActiveEvent(null);

    const prev = getClientSnapshot().game;
    if (prev.soundEnabled) {
      playEventSound();
    }

    let nextBits = prev.bits;
    let bonusBits = 0;

    if (ev.kind === "frenzy") {
      frenzySecRef.current = 15;
      setFrenzySecondsLeft(15);
      pushToast("FRENESI 5X ATIVADO!", "Todos os ganhos multiplicados por 5x por 15s!", "prestige");
    } else {
      bonusBits = Math.max(25, getBitsPerClick(prev, getCurrentTempMultiplier()) * 25);
      nextBits += bonusBits;
      pushToast(
        "PACOTE DESCRIPTOGRAFADO!",
        `Você recebeu +${formatNumber(bonusBits, 2)} Bits!`,
        "prestige"
      );
    }

    let nextContAsc = prev.contAsc;
    let nextThreshold = prev.nextAscBits;
    while (nextBits >= nextThreshold) {
      nextContAsc++;
      nextThreshold *= ASCENSION_GROWTH_RATE;
    }

    const draft: GameState = {
      ...prev,
      bits: nextBits,
      contAsc: nextContAsc,
      nextAscBits: nextThreshold,
      totalBitsEarned: prev.totalBitsEarned + bonusBits,
      glitchesCaught: prev.glitchesCaught + 1,
    };

    const { nextAchievements, newlyUnlocked } = evaluateAchievements(draft);
    commitGameState({ ...draft, achievements: nextAchievements });

    for (const ach of newlyUnlocked) {
      pushToast(`CONQUISTA: ${ach.titulo}`, ach.descricao, "achievement");
    }
  }, [activeEvent, getCurrentTempMultiplier, pushToast]);

  // Atalhos de teclado: 0, 1 ou Espaço clicam (quando fora de inputs)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (e.key === "0" || e.key === "1" || e.code === "Space") {
        e.preventDefault();
        handleClick();
      } else if (e.key === "e" || e.key === "E") {
        e.preventDefault();
        triggerEmp();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleClick, triggerEmp]);

  const buyUpgrade = useCallback(
    (id: UpgradeId, mode: BuyMode = "1") => {
      const prev = getClientSnapshot().game;
      const idx = prev.upgrades.findIndex((u) => u.id === id);
      if (idx === -1) return;

      const target = prev.upgrades[idx];
      const discount = getShopDiscountMultiplier(prev);
      const { count, totalCost } = getBulkPurchaseInfo(
        target,
        prev.bits,
        mode,
        discount
      );

      if (count <= 0 || prev.bits < totalCost) return;

      const nextUpgrades = prev.upgrades.map((u, i) =>
        i === idx
          ? {
              ...u,
              quantidade: u.quantidade + count,
              preco: u.preco * Math.pow(PRICE_GROWTH_RATE, count),
            }
          : u
      );

      const draft: GameState = {
        ...prev,
        bits: Math.max(0, prev.bits - totalCost),
        upgrades: nextUpgrades,
      };

      const { nextAchievements, newlyUnlocked } = evaluateAchievements(draft);
      commitGameState({ ...draft, achievements: nextAchievements });

      if (prev.soundEnabled) {
        playBuySound();
      }

      for (const ach of newlyUnlocked) {
        pushToast(`CONQUISTA: ${ach.titulo}`, ach.descricao, "achievement");
      }
    },
    [pushToast]
  );

  const buyPrestigeSkill = useCallback(
    (skillId: PrestigeSkillId) => {
      const prev = getClientSnapshot().game;
      if (hasPrestigeSkill(prev, skillId)) return;

      const def = PRESTIGE_SKILLS.find((s) => s.id === skillId);
      if (!def || prev.prestigeCurrency < def.custo) return;

      let nextUpgrades = prev.upgrades;
      if (skillId === "start_auto") {
        nextUpgrades = prev.upgrades.map((u) =>
          u.id === "autoclicker" && u.quantidade === 0
            ? { ...u, quantidade: 1, preco: u.preco * PRICE_GROWTH_RATE }
            : u
        );
      }

      const draft: GameState = {
        ...prev,
        prestigeCurrency: prev.prestigeCurrency - def.custo,
        prestigeSkills: [...prev.prestigeSkills, skillId],
        upgrades: nextUpgrades,
      };

      const { nextAchievements, newlyUnlocked } = evaluateAchievements(draft);
      commitGameState({ ...draft, achievements: nextAchievements });

      if (prev.soundEnabled) {
        playBuySound();
      }
      pushToast("HABILIDADE DESBLOQUEADA!", `${def.nome}: ${def.descricao}`, "prestige");
      for (const ach of newlyUnlocked) {
        pushToast(`CONQUISTA: ${ach.titulo}`, ach.descricao, "achievement");
      }
    },
    [pushToast]
  );

  const ascend = useCallback(() => {
    const prev = getClientSnapshot().game;
    if (prev.contAsc <= 0) return;

    const nextPrestigeLevel = prev.prestigeLevel + prev.contAsc;
    const nextPrestigeCurrency = prev.prestigeCurrency + prev.contAsc;
    const newMult = getPrestigeMultiplier(nextPrestigeLevel);
    const hasFreeAuto = hasPrestigeSkill(prev, "start_auto");

    const draft: GameState = {
      ...prev,
      bits: 0,
      contAsc: 0,
      prestigeLevel: nextPrestigeLevel,
      prestigeCurrency: nextPrestigeCurrency,
      ascensionCount: prev.ascensionCount + 1,
      upgrades: createInitialUpgrades(hasFreeAuto),
    };

    const { nextAchievements, newlyUnlocked } = evaluateAchievements(draft);
    commitGameState({ ...draft, achievements: nextAchievements });

    if (prev.soundEnabled) {
      playAscendSound();
    }

    pushToast(
      "ASCENSÃO CONCLUÍDA!",
      `Multiplicador global: ${newMult.toFixed(2)}x (+${prev.contAsc} pt de habilidade).`,
      "prestige"
    );
    for (const ach of newlyUnlocked) {
      pushToast(`CONQUISTA: ${ach.titulo}`, ach.descricao, "achievement");
    }
  }, [pushToast]);

  const renamePc = useCallback(
    (newName: string) => {
      const cleaned = newName.trim().slice(0, 32);
      if (!cleaned) return;
      commitGameState({ ...getClientSnapshot().game, nome: cleaned });
      pushToast("SISTEMA RENOMEADO", `Host atualizado para ${cleaned}.`, "info");
    },
    [pushToast]
  );

  const toggleSound = useCallback(() => {
    const prev = getClientSnapshot().game;
    commitGameState({ ...prev, soundEnabled: !prev.soundEnabled });
  }, []);

  const manualSave = useCallback(() => {
    const ok = saveGameState(getClientSnapshot().game);
    if (ok) {
      pushToast("JOGO SALVO", "Progresso gravado no navegador.", "info");
    }
  }, [pushToast]);

  const resetSave = useCallback(() => {
    clearGameState();
    overclockSecRef.current = 0;
    frenzySecRef.current = 0;
    overclockChargeRef.current = 0;
    comboCountRef.current = 0;
    empCooldownRef.current = 0;
    empSurgeRef.current = 0;
    if (comboTimeoutRef.current !== null) {
      window.clearTimeout(comboTimeoutRef.current);
      comboTimeoutRef.current = null;
    }
    setOverclockSecondsLeft(0);
    setFrenzySecondsLeft(0);
    setOverclockCharge(0);
    setComboCount(0);
    setEmpCooldownLeft(0);
    setEmpSurgeSecondsLeft(0);
    setActiveEvent(null);
    commitGameState(createInitialState(), false);
    clearOfflineReport();
    pushToast("SAVE RESETADO", "Um novo sistema foi inicializado.", "info");
  }, [pushToast]);

  return {
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
    empCooldownMax: empConfig.cooldownSec,
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
    dismissOfflineReport: clearOfflineReport,
  };
}

export const PRICE_GROWTH_RATE = 1.15;
export const INITIAL_ASCENSION_BITS = 100;
export const ASCENSION_GROWTH_RATE = 2.0;
export const PRESTIGE_BONUS_PER_POINT = 0.25;
export const SAVE_STORAGE_KEY = "clicker-project-save-v2";
export const MAX_OFFLINE_SECONDS = 8 * 60 * 60; // 8 horas

export type BuyMode = "1" | "10" | "max";

export type UpgradeId =
  | "disquete"
  | "autoclicker"
  | "macro_script"
  | "cd"
  | "dvd"
  | "pendrive"
  | "turbo_bus"
  | "hd"
  | "ram"
  | "internet"
  | "mainframe"
  | "hyper_thread"
  | "gpu_cluster"
  | "clock_multiplier"
  | "quantum_pc"
  | "ai_core"
  | "neural_link"
  | "quantum_swarm"
  | "dyson_server"
  | "singularity_os";

export interface UpgradeItem {
  id: UpgradeId;
  nome: string;
  descricao: string;
  quantidade: number;
  precoBase: number;
  preco: number;
  multiplicador: number;
  clicksPerSecond?: number;
  extraClicksPerManual?: number;
  speedBonus?: number;
}

export type PrestigeSkillId =
  | "start_auto"
  | "shop_discount"
  | "crit_mastery"
  | "offline_boost"
  | "combo_mastery"
  | "auto_crit"
  | "emp_overdrive"
  | "rapid_fire";

export interface PrestigeSkillDef {
  id: PrestigeSkillId;
  nome: string;
  descricao: string;
  custo: number;
}

export type AchievementId =
  | "first_click"
  | "fifty_clicks"
  | "first_upgrade"
  | "ten_upgrades"
  | "hundred_bits"
  | "kilobit"
  | "million_bits"
  | "first_ascension"
  | "mainframe_master"
  | "crit_hit"
  | "overclock_mode"
  | "glitch_hunter"
  | "quantum_era"
  | "combo_king"
  | "emp_master"
  | "singularity_era";

export interface AchievementDef {
  id: AchievementId;
  titulo: string;
  descricao: string;
}

export interface PcTier {
  nome: string;
  minBits: number;
  badgeClass: string;
}

export interface OfflineReport {
  elapsedSec: number;
  bitsEarned: number;
  efficiency: number;
}

export interface GameState {
  nome: string;
  bits: number;
  contAsc: number;
  nextAscBits: number;
  prestigeLevel: number;
  prestigeCurrency: number;
  ascensionCount: number;
  totalClicks: number;
  totalBitsEarned: number;
  upgrades: UpgradeItem[];
  prestigeSkills: PrestigeSkillId[];
  achievements: AchievementId[];
  soundEnabled: boolean;
  critCount: number;
  overclockCount: number;
  glitchesCaught: number;
  maxCombo: number;
  empCount: number;
}

export const PRESTIGE_SKILLS: PrestigeSkillDef[] = [
  {
    id: "start_auto",
    nome: "Boot Automático",
    descricao: "Começa toda nova run já com 1 Auto-Clicker grátis.",
    custo: 1,
  },
  {
    id: "shop_discount",
    nome: "Cache Otimizado",
    descricao: "Desconto permanente de 15% em todos os upgrades da loja.",
    custo: 2,
  },
  {
    id: "crit_mastery",
    nome: "Algoritmo Crítico",
    descricao: "Chance de crítico sobe para 15% e multiplicador crítico para 5x.",
    custo: 2,
  },
  {
    id: "offline_boost",
    nome: "Mineração Offline",
    descricao: "Aumenta a eficiência da produção offline de 50% para 100%.",
    custo: 1,
  },
  {
    id: "combo_mastery",
    nome: "Mestre do Combo",
    descricao: "Combo máximo sobe para 3.0x e demora o dobro do tempo para expirar.",
    custo: 2,
  },
  {
    id: "auto_crit",
    nome: "Bots Críticos",
    descricao: "Cliques automáticos passam a ter metade da sua chance de crítico.",
    custo: 3,
  },
  {
    id: "emp_overdrive",
    nome: "Pulso Otimizado",
    descricao: "Reduz cooldown do Pulso EMP para 30s e dobra a duração do crítico garantido.",
    custo: 2,
  },
  {
    id: "rapid_fire",
    nome: "Disparo Contínuo",
    descricao: "Dobra a velocidade ao segurar clique/tecla e adiciona +2 cliques por ação manual.",
    custo: 2,
  },
];

export const ACHIEVEMENT_DEFS: AchievementDef[] = [
  {
    id: "first_click",
    titulo: "Primeiro Clique",
    descricao: "Faça seu primeiro clique.",
  },
  {
    id: "fifty_clicks",
    titulo: "Dedos Rápidos",
    descricao: "Realize 50 cliques no total.",
  },
  {
    id: "first_upgrade",
    titulo: "Primeiro Upgrade",
    descricao: "Compre seu primeiro upgrade na loja.",
  },
  {
    id: "ten_upgrades",
    titulo: "Colecionador",
    descricao: "Possua 10 upgrades ao mesmo tempo.",
  },
  {
    id: "hundred_bits",
    titulo: "Centena de Bits",
    descricao: "Acumule 100 Bits no total.",
  },
  {
    id: "kilobit",
    titulo: "Kilobit",
    descricao: "Acumule 1.024 Bits no total.",
  },
  {
    id: "first_ascension",
    titulo: "Ascendido",
    descricao: "Realize sua primeira ascensão.",
  },
  {
    id: "mainframe_master",
    titulo: "Mainframe Master",
    descricao: "Compre pelo menos 1 Mainframe.",
  },
  {
    id: "crit_hit",
    titulo: "Golpe Crítico",
    descricao: "Acerte seu primeiro clique crítico.",
  },
  {
    id: "overclock_mode",
    titulo: "Overclock Ativo",
    descricao: "Ative o modo Overclock (2x) pela primeira vez.",
  },
  {
    id: "glitch_hunter",
    titulo: "Caçador de Glitches",
    descricao: "Capture um Pacote Criptografado no terminal.",
  },
  {
    id: "quantum_era",
    titulo: "Era Quântica",
    descricao: "Compre pelo menos 1 PC Quântico.",
  },
  {
    id: "million_bits",
    titulo: "Megabit",
    descricao: "Acumule 1.000.000 de Bits no total.",
  },
  {
    id: "combo_king",
    titulo: "Rei do Combo",
    descricao: "Alcance uma sequência de 50 cliques em combo.",
  },
  {
    id: "emp_master",
    titulo: "Pulso Eletromagnético",
    descricao: "Dispare o Pulso EMP pela primeira vez.",
  },
  {
    id: "singularity_era",
    titulo: "Singularidade",
    descricao: "Compre pelo menos 1 Singularidade OS.",
  },
];

export const PC_TIERS: PcTier[] = [
  {
    nome: "Terminal 486",
    minBits: 0,
    badgeClass: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
  },
  {
    nome: "Workstation 90s",
    minBits: 500,
    badgeClass: "border-teal-400/40 bg-teal-500/10 text-teal-300",
  },
  {
    nome: "Estação Cyberpunk",
    minBits: 5_000,
    badgeClass: "border-cyan-400/50 bg-cyan-500/15 text-cyan-300",
  },
  {
    nome: "Servidor Neural",
    minBits: 50_000,
    badgeClass: "border-sky-400/50 bg-sky-500/15 text-sky-300",
  },
  {
    nome: "Núcleo Quântico",
    minBits: 500_000,
    badgeClass: "border-amber-400/60 bg-amber-500/15 text-amber-300",
  },
  {
    nome: "Singularidade Digital",
    minBits: 5_000_000,
    badgeClass: "border-fuchsia-400/60 bg-fuchsia-500/15 text-fuchsia-300",
  },
  {
    nome: "Matriz Cósmica",
    minBits: 50_000_000,
    badgeClass: "border-rose-400/60 bg-rose-500/15 text-rose-300",
  },
];

export function getPcTier(totalBitsEarned: number): PcTier {
  let current = PC_TIERS[0];
  for (const tier of PC_TIERS) {
    if (totalBitsEarned >= tier.minBits) {
      current = tier;
    }
  }
  return current;
}

export function createInitialUpgrades(freeAutoClicker = false): UpgradeItem[] {
  return [
    {
      id: "disquete",
      nome: "Disquete",
      descricao: "Armazenamento magnético retrô de 1.44 MB.",
      quantidade: 0,
      precoBase: 2,
      preco: 2,
      multiplicador: 0.1,
    },
    {
      id: "autoclicker",
      nome: "Auto-Clicker",
      descricao: "Script robótico que executa 1 clique automático por segundo.",
      quantidade: freeAutoClicker ? 1 : 0,
      precoBase: 50,
      preco: freeAutoClicker ? 50 * PRICE_GROWTH_RATE : 50,
      multiplicador: 0,
      clicksPerSecond: 1,
    },
    {
      id: "macro_script",
      nome: "Macro de Clique",
      descricao: "Executa +1 clique extra a cada clique manual.",
      quantidade: 0,
      precoBase: 250,
      preco: 250,
      multiplicador: 0,
      extraClicksPerManual: 1,
    },
    {
      id: "cd",
      nome: "CD",
      descricao: "Disco óptico clássico de 700 MB.",
      quantidade: 0,
      precoBase: 100,
      preco: 100,
      multiplicador: 0.25,
    },
    {
      id: "dvd",
      nome: "DVD",
      descricao: "Mais camadas, mais Bits por pulso.",
      quantidade: 0,
      precoBase: 200,
      preco: 200,
      multiplicador: 0.5,
    },
    {
      id: "pendrive",
      nome: "Pendrive",
      descricao: "Memória flash portátil de alta resposta.",
      quantidade: 0,
      precoBase: 500,
      preco: 500,
      multiplicador: 1.0,
    },
    {
      id: "turbo_bus",
      nome: "Barramento Turbo",
      descricao: "Acelera em +15% a velocidade de todos os Auto-Clickers.",
      quantidade: 0,
      precoBase: 1500,
      preco: 1500,
      multiplicador: 0,
      speedBonus: 0.15,
    },
    {
      id: "hd",
      nome: "HD",
      descricao: "Disco rígido mecânico com cache dedicado.",
      quantidade: 0,
      precoBase: 1024,
      preco: 1024,
      multiplicador: 2.048,
    },
    {
      id: "ram",
      nome: "Memória RAM",
      descricao: "Acesso ultrarrápido para multiplicação de Bits.",
      quantidade: 0,
      precoBase: 2048,
      preco: 2048,
      multiplicador: 4.096,
    },
    {
      id: "internet",
      nome: "Internet",
      descricao: "Conexão fibra ótica puxando pacotes da rede.",
      quantidade: 0,
      precoBase: 4096,
      preco: 4096,
      multiplicador: 8.192,
    },
    {
      id: "mainframe",
      nome: "Mainframe",
      descricao: "Supercomputador corporativo de processamento massivo.",
      quantidade: 0,
      precoBase: 8192,
      preco: 8192,
      multiplicador: 16.384,
    },
    {
      id: "hyper_thread",
      nome: "Hyper-Threading",
      descricao: "Paralelismo de hardware: +3 cliques extras por clique manual.",
      quantidade: 0,
      precoBase: 25000,
      preco: 25000,
      multiplicador: 0,
      extraClicksPerManual: 3,
    },
    {
      id: "gpu_cluster",
      nome: "Cluster GPU",
      descricao: "Centenas de núcleos paralelos minerando Bits em rajada.",
      quantidade: 0,
      precoBase: 32768,
      preco: 32768,
      multiplicador: 65.536,
    },
    {
      id: "clock_multiplier",
      nome: "Multiplicador Clock",
      descricao: "Overclock de barramento: +25% de velocidade nos Auto-Clickers.",
      quantidade: 0,
      precoBase: 120000,
      preco: 120000,
      multiplicador: 0,
      speedBonus: 0.25,
    },
    {
      id: "quantum_pc",
      nome: "PC Quântico",
      descricao: "Qubits em superposição multiplicando cada pulso.",
      quantidade: 0,
      precoBase: 131072,
      preco: 131072,
      multiplicador: 262.144,
    },
    {
      id: "ai_core",
      nome: "IA Autônoma",
      descricao: "Rede neural dedicada executando +5 cliques/s automaticamente.",
      quantidade: 0,
      precoBase: 524288,
      preco: 524288,
      multiplicador: 0,
      clicksPerSecond: 5,
    },
    {
      id: "neural_link",
      nome: "Link Neural",
      descricao: "Interface cérebro-máquina que amplifica cada pulso elétrico.",
      quantidade: 0,
      precoBase: 1048576,
      preco: 1048576,
      multiplicador: 1024,
    },
    {
      id: "quantum_swarm",
      nome: "Enxame Quântico",
      descricao: "Enxame de bots quânticos executando +15 cliques/s.",
      quantidade: 0,
      precoBase: 4194304,
      preco: 4194304,
      multiplicador: 0,
      clicksPerSecond: 15,
    },
    {
      id: "dyson_server",
      nome: "Servidor Dyson",
      descricao: "Megaestrutura orbital convertendo energia estelar em Bits.",
      quantidade: 0,
      precoBase: 16777216,
      preco: 16777216,
      multiplicador: 4096,
    },
    {
      id: "singularity_os",
      nome: "Singularidade OS",
      descricao: "Sistema autoconsciente: +16.384/clique e +30 cliques/s.",
      quantidade: 0,
      precoBase: 67108864,
      preco: 67108864,
      multiplicador: 16384,
      clicksPerSecond: 30,
    },
  ];
}

export function createInitialState(nome = "CYBER-PC"): GameState {
  return {
    nome,
    bits: 0,
    contAsc: 0,
    nextAscBits: INITIAL_ASCENSION_BITS,
    prestigeLevel: 0,
    prestigeCurrency: 0,
    ascensionCount: 0,
    totalClicks: 0,
    totalBitsEarned: 0,
    upgrades: createInitialUpgrades(false),
    prestigeSkills: [],
    achievements: [],
    soundEnabled: true,
    critCount: 0,
    overclockCount: 0,
    glitchesCaught: 0,
    maxCombo: 0,
    empCount: 0,
  };
}

export function hasPrestigeSkill(
  state: Pick<GameState, "prestigeSkills">,
  skillId: PrestigeSkillId
): boolean {
  return state.prestigeSkills.includes(skillId);
}

export function getShopDiscountMultiplier(
  state: Pick<GameState, "prestigeSkills">
): number {
  return hasPrestigeSkill(state, "shop_discount") ? 0.85 : 1.0;
}

export function getCritConfig(state: Pick<GameState, "prestigeSkills">): {
  chance: number;
  multiplier: number;
} {
  if (hasPrestigeSkill(state, "crit_mastery")) {
    return { chance: 0.15, multiplier: 5 };
  }
  return { chance: 0.05, multiplier: 3 };
}

export function getAutoCritChance(
  state: Pick<GameState, "prestigeSkills">
): number {
  if (!hasPrestigeSkill(state, "auto_crit")) return 0;
  return getCritConfig(state).chance * 0.5;
}

export function getComboConfig(state: Pick<GameState, "prestigeSkills">): {
  maxMultiplier: number;
  decayMs: number;
} {
  if (hasPrestigeSkill(state, "combo_mastery")) {
    return { maxMultiplier: 3.0, decayMs: 3600 };
  }
  return { maxMultiplier: 2.0, decayMs: 1800 };
}

export function getComboMultiplier(
  comboCount: number,
  maxMultiplier: number
): number {
  const bonus = Math.floor(Math.max(0, comboCount) / 10) * 0.1;
  return Math.min(maxMultiplier, Number((1 + bonus).toFixed(2)));
}

export function getEmpConfig(state: Pick<GameState, "prestigeSkills">): {
  cooldownSec: number;
  surgeDurationSec: number;
  burstClicks: number;
} {
  if (hasPrestigeSkill(state, "emp_overdrive")) {
    return { cooldownSec: 30, surgeDurationSec: 10, burstClicks: 25 };
  }
  return { cooldownSec: 45, surgeDurationSec: 5, burstClicks: 20 };
}

export function getPrestigeMultiplier(prestigeLevel: number): number {
  return 1 + Math.max(0, prestigeLevel) * PRESTIGE_BONUS_PER_POINT;
}

export function calculateTotalBonus(upgrades: UpgradeItem[]): number {
  return upgrades.reduce(
    (sum, item) => sum + item.quantidade * item.multiplicador,
    0
  );
}

export function getBitsPerClick(
  state: Pick<GameState, "upgrades" | "prestigeLevel">,
  tempMultiplier = 1
): number {
  const base = 1 + calculateTotalBonus(state.upgrades);
  return base * getPrestigeMultiplier(state.prestigeLevel) * tempMultiplier;
}

export function getAutoClicksPerSecond(upgrades: UpgradeItem[]): number {
  return upgrades.reduce(
    (sum, item) => sum + item.quantidade * (item.clicksPerSecond ?? 0),
    0
  );
}

export function getAutoSpeedMultiplier(upgrades: UpgradeItem[]): number {
  const bonus = upgrades.reduce(
    (sum, item) => sum + item.quantidade * (item.speedBonus ?? 0),
    0
  );
  return 1 + bonus;
}

export function getEffectiveAutoClicksPerSecond(
  upgrades: UpgradeItem[]
): number {
  return getAutoClicksPerSecond(upgrades) * getAutoSpeedMultiplier(upgrades);
}

export function getClicksPerManualAction(
  state: Pick<GameState, "upgrades" | "prestigeSkills">
): number {
  const extraFromUpgrades = state.upgrades.reduce(
    (sum, item) => sum + item.quantidade * (item.extraClicksPerManual ?? 0),
    0
  );
  const extraFromSkill = hasPrestigeSkill(state, "rapid_fire") ? 2 : 0;
  return 1 + extraFromUpgrades + extraFromSkill;
}

export function getHoldClickIntervalMs(
  state: Pick<GameState, "upgrades" | "prestigeSkills">
): number {
  const speedFactor = Math.min(3, getAutoSpeedMultiplier(state.upgrades));
  const skillFactor = hasPrestigeSkill(state, "rapid_fire") ? 2 : 1;
  return Math.max(35, Math.round(140 / (speedFactor * skillFactor)));
}

export function getBitsPerSecond(
  state: Pick<GameState, "upgrades" | "prestigeLevel">,
  tempMultiplier = 1
): number {
  return (
    getEffectiveAutoClicksPerSecond(state.upgrades) *
    getBitsPerClick(state, tempMultiplier)
  );
}

export function getTotalUpgradesOwned(upgrades: UpgradeItem[]): number {
  return upgrades.reduce((sum, item) => sum + item.quantidade, 0);
}

export function getBulkPurchaseInfo(
  item: UpgradeItem,
  bits: number,
  mode: BuyMode,
  discountMultiplier: number
): { count: number; totalCost: number } {
  const unitPrice = item.preco * discountMultiplier;
  if (mode === "1") {
    return { count: 1, totalCost: unitPrice };
  }
  if (mode === "10") {
    const cost =
      unitPrice *
      ((Math.pow(PRICE_GROWTH_RATE, 10) - 1) / (PRICE_GROWTH_RATE - 1));
    return { count: 10, totalCost: cost };
  }

  // mode === "max"
  let count = 0;
  let totalCost = 0;
  let nextCost = unitPrice;
  while (count < 500 && totalCost + nextCost <= bits) {
    totalCost += nextCost;
    nextCost *= PRICE_GROWTH_RATE;
    count++;
  }

  if (count === 0) {
    return { count: 1, totalCost: unitPrice };
  }
  return { count, totalCost };
}

export function evaluateAchievements(state: GameState): {
  nextAchievements: AchievementId[];
  newlyUnlocked: AchievementDef[];
} {
  const unlockedSet = new Set<AchievementId>(state.achievements);
  const newlyUnlocked: AchievementDef[] = [];

  const totalUpgrades = getTotalUpgradesOwned(state.upgrades);
  const hasMainframe =
    (state.upgrades.find((u) => u.id === "mainframe")?.quantidade ?? 0) > 0;
  const hasQuantum =
    (state.upgrades.find((u) => u.id === "quantum_pc")?.quantidade ?? 0) > 0;
  const hasSingularity =
    (state.upgrades.find((u) => u.id === "singularity_os")?.quantidade ?? 0) > 0;

  const checks: Record<AchievementId, boolean> = {
    first_click: state.totalClicks >= 1,
    fifty_clicks: state.totalClicks >= 50,
    first_upgrade: totalUpgrades >= 1,
    ten_upgrades: totalUpgrades >= 10,
    hundred_bits: state.totalBitsEarned >= 100,
    kilobit: state.totalBitsEarned >= 1024,
    million_bits: state.totalBitsEarned >= 1_000_000,
    first_ascension: state.ascensionCount >= 1,
    mainframe_master: hasMainframe,
    crit_hit: state.critCount >= 1,
    overclock_mode: state.overclockCount >= 1,
    glitch_hunter: state.glitchesCaught >= 1,
    quantum_era: hasQuantum,
    combo_king: state.maxCombo >= 50,
    emp_master: state.empCount >= 1,
    singularity_era: hasSingularity,
  };

  for (const def of ACHIEVEMENT_DEFS) {
    if (checks[def.id] && !unlockedSet.has(def.id)) {
      unlockedSet.add(def.id);
      newlyUnlocked.push(def);
    }
  }

  return {
    nextAchievements: Array.from(unlockedSet),
    newlyUnlocked,
  };
}

export function formatNumber(value: number, decimals = 2): string {
  if (!Number.isFinite(value)) return "0";
  if (value >= 1_000_000_000_000) {
    return `${(value / 1_000_000_000_000).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}T`;
  }
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}B`;
  }
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}M`;
  }
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatDuration(seconds: number): string {
  const s = Math.floor(seconds);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const rem = s % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${rem}s`;
  return `${rem}s`;
}

interface PersistedSave {
  version: number;
  lastSavedAt?: number;
  nome: string;
  bits: number;
  contAsc: number;
  nextAscBits: number;
  prestigeLevel: number;
  prestigeCurrency?: number;
  ascensionCount: number;
  totalClicks: number;
  totalBitsEarned: number;
  upgrades: Array<{ id: UpgradeId; quantidade: number; preco: number }>;
  prestigeSkills?: PrestigeSkillId[];
  achievements: AchievementId[];
  soundEnabled?: boolean;
  critCount?: number;
  overclockCount?: number;
  glitchesCaught?: number;
  maxCombo?: number;
  empCount?: number;
}

export function saveGameState(state: GameState): boolean {
  if (typeof window === "undefined") return false;
  try {
    const payload: PersistedSave = {
      version: 2,
      lastSavedAt: Date.now(),
      nome: state.nome,
      bits: state.bits,
      contAsc: state.contAsc,
      nextAscBits: state.nextAscBits,
      prestigeLevel: state.prestigeLevel,
      prestigeCurrency: state.prestigeCurrency,
      ascensionCount: state.ascensionCount,
      totalClicks: state.totalClicks,
      totalBitsEarned: state.totalBitsEarned,
      upgrades: state.upgrades.map((u) => ({
        id: u.id,
        quantidade: u.quantidade,
        preco: u.preco,
      })),
      prestigeSkills: state.prestigeSkills,
      achievements: state.achievements,
      soundEnabled: state.soundEnabled,
      critCount: state.critCount,
      overclockCount: state.overclockCount,
      glitchesCaught: state.glitchesCaught,
      maxCombo: state.maxCombo,
      empCount: state.empCount,
    };
    window.localStorage.setItem(SAVE_STORAGE_KEY, JSON.stringify(payload));
    return true;
  } catch {
    return false;
  }
}

export function loadGameStateWithOffline(): {
  state: GameState;
  offlineReport: OfflineReport | null;
} | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SAVE_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<PersistedSave>;
    if (parsed.version !== 2) return null;

    const base = createInitialState(
      typeof parsed.nome === "string" && parsed.nome.trim()
        ? parsed.nome.trim().slice(0, 32)
        : "CYBER-PC"
    );

    const savedUpgradesMap = new Map(
      Array.isArray(parsed.upgrades)
        ? parsed.upgrades.map((u) => [u.id, u])
        : []
    );

    const mergedUpgrades = base.upgrades.map((item) => {
      const saved = savedUpgradesMap.get(item.id);
      if (!saved) return item;
      const qty =
        typeof saved.quantidade === "number" && saved.quantidade >= 0
          ? Math.floor(saved.quantidade)
          : 0;
      const price =
        typeof saved.preco === "number" && saved.preco >= item.precoBase
          ? saved.preco
          : item.precoBase * Math.pow(PRICE_GROWTH_RATE, qty);
      return {
        ...item,
        quantidade: qty,
        preco: price,
      };
    });

    const validAchIds = new Set(ACHIEVEMENT_DEFS.map((a) => a.id));
    const achievements = Array.isArray(parsed.achievements)
      ? parsed.achievements.filter((id): id is AchievementId =>
          validAchIds.has(id)
        )
      : [];

    const validSkillIds = new Set(PRESTIGE_SKILLS.map((s) => s.id));
    const prestigeSkills = Array.isArray(parsed.prestigeSkills)
      ? parsed.prestigeSkills.filter((id): id is PrestigeSkillId =>
          validSkillIds.has(id)
        )
      : [];

    const prestigeLevel =
      typeof parsed.prestigeLevel === "number" && parsed.prestigeLevel >= 0
        ? Math.floor(parsed.prestigeLevel)
        : 0;

    // Compatibilidade com saves antigos que não tinham prestigeCurrency
    const prestigeCurrency =
      typeof parsed.prestigeCurrency === "number" && parsed.prestigeCurrency >= 0
        ? Math.floor(parsed.prestigeCurrency)
        : prestigeLevel;

    let loadedState: GameState = {
      nome: base.nome,
      bits: typeof parsed.bits === "number" && parsed.bits >= 0 ? parsed.bits : 0,
      contAsc:
        typeof parsed.contAsc === "number" && parsed.contAsc >= 0
          ? Math.floor(parsed.contAsc)
          : 0,
      nextAscBits:
        typeof parsed.nextAscBits === "number" && parsed.nextAscBits > 0
          ? parsed.nextAscBits
          : INITIAL_ASCENSION_BITS,
      prestigeLevel,
      prestigeCurrency,
      ascensionCount:
        typeof parsed.ascensionCount === "number" && parsed.ascensionCount >= 0
          ? Math.floor(parsed.ascensionCount)
          : 0,
      totalClicks:
        typeof parsed.totalClicks === "number" && parsed.totalClicks >= 0
          ? Math.floor(parsed.totalClicks)
          : 0,
      totalBitsEarned:
        typeof parsed.totalBitsEarned === "number" && parsed.totalBitsEarned >= 0
          ? parsed.totalBitsEarned
          : 0,
      upgrades: mergedUpgrades,
      prestigeSkills,
      achievements,
      soundEnabled:
        typeof parsed.soundEnabled === "boolean" ? parsed.soundEnabled : true,
      critCount:
        typeof parsed.critCount === "number" && parsed.critCount >= 0
          ? Math.floor(parsed.critCount)
          : 0,
      overclockCount:
        typeof parsed.overclockCount === "number" && parsed.overclockCount >= 0
          ? Math.floor(parsed.overclockCount)
          : 0,
      glitchesCaught:
        typeof parsed.glitchesCaught === "number" && parsed.glitchesCaught >= 0
          ? Math.floor(parsed.glitchesCaught)
          : 0,
      maxCombo:
        typeof parsed.maxCombo === "number" && parsed.maxCombo >= 0
          ? Math.floor(parsed.maxCombo)
          : 0,
      empCount:
        typeof parsed.empCount === "number" && parsed.empCount >= 0
          ? Math.floor(parsed.empCount)
          : 0,
    };

    // Calcula produção offline se ficou fora >= 10s com Auto-Clicker ativo
    let offlineReport: OfflineReport | null = null;
    if (typeof parsed.lastSavedAt === "number" && parsed.lastSavedAt > 0) {
      const rawElapsed = (Date.now() - parsed.lastSavedAt) / 1000;
      const elapsedSec = Math.min(MAX_OFFLINE_SECONDS, Math.floor(rawElapsed));
      const bps = getBitsPerSecond(loadedState);

      if (elapsedSec >= 10 && bps > 0) {
        const efficiency = hasPrestigeSkill(loadedState, "offline_boost")
          ? 1.0
          : 0.5;
        const bitsEarned = elapsedSec * bps * efficiency;
        const nextBits = loadedState.bits + bitsEarned;
        let nextContAsc = loadedState.contAsc;
        let nextThreshold = loadedState.nextAscBits;

        while (nextBits >= nextThreshold) {
          nextContAsc++;
          nextThreshold *= ASCENSION_GROWTH_RATE;
        }

        loadedState = {
          ...loadedState,
          bits: nextBits,
          contAsc: nextContAsc,
          nextAscBits: nextThreshold,
          totalBitsEarned: loadedState.totalBitsEarned + bitsEarned,
        };

        const { nextAchievements } = evaluateAchievements(loadedState);
        loadedState = { ...loadedState, achievements: nextAchievements };
        offlineReport = { elapsedSec, bitsEarned, efficiency };
      }
    }

    return { state: loadedState, offlineReport };
  } catch {
    return null;
  }
}

export function clearGameState(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(SAVE_STORAGE_KEY);
  } catch {
    // ignore storage errors
  }
}

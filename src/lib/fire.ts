export type IncomeSourceKey = "pilon1" | "pilon2" | "pilon3" | "investitii";

export interface FireInputs {
  bugetLunar: number;
  surse: Record<IncomeSourceKey, number>;
  luniFondUrgenta: number;
  randamentFondUrgenta: number;
  randamentInvestitii: number;
  inflatie: number;
  eurRonRate: number;
}

export interface Scenariu {
  id: number;
  venit: number;
  cheltuieli: number;
}

export interface ScenariuRezultat extends Scenariu {
  economii: number;
  rataEconomisire: number;
  luniFaraInvestitii: number;
  luniCuInvestitii: number;
  aniCuInvestitii: number;
}

export interface FireRezultat {
  venitLunarDinInvestitii: number;
  randamentReal: number;
  capitalNecesarRon: number;
  capitalNecesarEur: number;
  fondUrgentaRon: number;
  dobandaLunaraFondUrgenta: number;
  scenarii: ScenariuRezultat[];
}

export const SURSE_ORDER: IncomeSourceKey[] = [
  "pilon1",
  "pilon2",
  "pilon3",
  "investitii",
];

export const SURSE_LABELS: Record<IncomeSourceKey, string> = {
  pilon1: "Pilon 1 pensie",
  pilon2: "Pilon 2 pensie",
  pilon3: "Pilon 3 pensie",
  investitii: "Investitii",
};

export function calculeazaFire(
  inputs: FireInputs,
  scenarii: Scenariu[],
): FireRezultat {
  const {
    bugetLunar,
    surse,
    luniFondUrgenta,
    randamentFondUrgenta,
    randamentInvestitii,
    inflatie,
    eurRonRate,
  } = inputs;

  const randamentReal = randamentInvestitii - inflatie;

  const venitLunarDinInvestitii = bugetLunar * surse.investitii;

  const capitalNecesarRon =
    randamentReal > 0 ? (venitLunarDinInvestitii * 12) / randamentReal : 0;

  const capitalNecesarEur =
    eurRonRate > 0 ? capitalNecesarRon / eurRonRate : 0;

  const fondUrgentaRon = bugetLunar * luniFondUrgenta;
  const dobandaLunaraFondUrgenta =
    (fondUrgentaRon * randamentFondUrgenta) / 12;

  const scenariiRezultat: ScenariuRezultat[] = scenarii.map((s) => {
    const economii = s.venit - s.cheltuieli;
    const rataEconomisire = s.venit > 0 ? economii / s.venit : 0;
    const luniFaraInvestitii = economii > 0 ? capitalNecesarRon / economii : Infinity;
    const luniCuInvestitii =
      economii > 0 && randamentReal > 0
        ? nperMonthsToTarget(randamentReal / 12, economii, capitalNecesarRon)
        : Infinity;
    return {
      ...s,
      economii,
      rataEconomisire,
      luniFaraInvestitii,
      luniCuInvestitii,
      aniCuInvestitii: luniCuInvestitii / 12,
    };
  });

  return {
    venitLunarDinInvestitii,
    randamentReal,
    capitalNecesarRon,
    capitalNecesarEur,
    fondUrgentaRon,
    dobandaLunaraFondUrgenta,
    scenarii: scenariiRezultat,
  };
}

/**
 * Excel NPER echivalent pentru: PV=0, PMT=-pmt (contribuit), FV=target, type=0.
 * Rezolva: FV = PMT * ((1+r)^n - 1) / r  pentru n luni.
 */
export function nperMonthsToTarget(
  ratePerPeriod: number,
  pmt: number,
  fv: number,
): number {
  if (pmt <= 0) return Infinity;
  if (ratePerPeriod === 0) return fv / pmt;
  const ratio = (fv * ratePerPeriod) / pmt + 1;
  if (ratio <= 0) return Infinity;
  return Math.log(ratio) / Math.log(1 + ratePerPeriod);
}

/**
 * Simulare luna-cu-luna a portofoliului: contribuie `pmt` la inceputul fiecarei luni,
 * aplica randament compus. Returneaza valoarea portofoliului la fiecare luna.
 */
export function simuleazaCrestere(
  pmtLunar: number,
  ratePerPeriod: number,
  capitalTinta: number,
  maxMonths = 600,
): { luna: number; valoare: number }[] {
  const out: { luna: number; valoare: number }[] = [{ luna: 0, valoare: 0 }];
  let valoare = 0;
  for (let luna = 1; luna <= maxMonths; luna++) {
    valoare = (valoare + pmtLunar) * (1 + ratePerPeriod);
    out.push({ luna, valoare });
    if (valoare >= capitalTinta) break;
  }
  return out;
}

export const DEFAULT_INPUTS: FireInputs = {
  bugetLunar: 10000,
  surse: { pilon1: 0, pilon2: 0, pilon3: 0, investitii: 1 },
  luniFondUrgenta: 20,
  randamentFondUrgenta: 0.06,
  randamentInvestitii: 0.12,
  inflatie: 0.03,
  eurRonRate: 4.98,
};

export const DEFAULT_SCENARII: Scenariu[] = [
  { id: 1, venit: 18500, cheltuieli: 12000 },
  { id: 2, venit: 20000, cheltuieli: 15000 },
  { id: 3, venit: 15000, cheltuieli: 11000 },
];

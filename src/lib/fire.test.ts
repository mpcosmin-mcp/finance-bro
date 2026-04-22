import { describe, expect, test } from "vitest";
import {
  DEFAULT_INPUTS,
  DEFAULT_SCENARII,
  calculeazaFire,
  nperMonthsToTarget,
} from "./fire";

/**
 * Sanity tests — verifica paritatea cu FIRE plan.xlsx (docs/).
 * Orice schimbare care strica aceste valori inseamna ca logica FIRE a deviat
 * de la Excelul original si trebuie sincronizata cu consultantul.
 */
describe("calculeazaFire — paritate cu Excel", () => {
  const r = calculeazaFire(DEFAULT_INPUTS, DEFAULT_SCENARII);

  test("randament real = nominal - inflatie", () => {
    expect(r.randamentReal).toBeCloseTo(0.09, 10);
  });

  test("venit lunar pasiv = 100% din buget (default)", () => {
    expect(r.venitLunarDinInvestitii).toBe(10000);
  });

  test("capital necesar ≈ 1.333.333 RON (formula 4% generalizata)", () => {
    expect(r.capitalNecesarRon).toBeCloseTo(1_333_333.33, 0);
  });

  test("capital necesar EUR = RON / curs", () => {
    expect(r.capitalNecesarEur).toBeCloseTo(1_333_333.33 / 4.98, 0);
  });

  test("fond urgenta = 20 luni × 10000", () => {
    expect(r.fondUrgentaRon).toBe(200_000);
  });

  test("dobanda lunara fond urgenta ≈ 1.000 RON la 6%/an", () => {
    expect(r.dobandaLunaraFondUrgenta).toBeCloseTo(1_000, 0);
  });

  test("scenariul 1 (18500/12000) ≈ 10.4 ani cu investitii", () => {
    const s1 = r.scenarii[0];
    expect(s1.economii).toBe(6500);
    expect(s1.rataEconomisire).toBeCloseTo(0.3513, 3);
    expect(s1.aniCuInvestitii).toBeCloseTo(10.39, 1);
  });

  test("scenariul 2 (20000/15000) ≈ 12.3 ani cu investitii", () => {
    expect(r.scenarii[1].aniCuInvestitii).toBeCloseTo(12.3, 0);
  });

  test("scenariul 3 (15000/11000) ≈ 14 ani cu investitii", () => {
    expect(r.scenarii[2].aniCuInvestitii).toBeCloseTo(14.0, 0);
  });
});

describe("nperMonthsToTarget — edge cases", () => {
  test("rata zero → capital / pmt", () => {
    expect(nperMonthsToTarget(0, 1000, 12000)).toBe(12);
  });

  test("pmt zero → Infinity (nu ajunge niciodata)", () => {
    expect(nperMonthsToTarget(0.01, 0, 100)).toBe(Infinity);
  });

  test("pmt negativ → Infinity", () => {
    expect(nperMonthsToTarget(0.01, -100, 100)).toBe(Infinity);
  });
});

describe("calculeazaFire — degradari elegante", () => {
  test("randament real <= 0 → capital 0 (nu NaN/Infinity)", () => {
    const r = calculeazaFire(
      { ...DEFAULT_INPUTS, randamentInvestitii: 0.02, inflatie: 0.03 },
      DEFAULT_SCENARII,
    );
    expect(r.capitalNecesarRon).toBe(0);
  });

  test("economii <= 0 → luni Infinity (scenariu fara progres)", () => {
    const r = calculeazaFire(DEFAULT_INPUTS, [
      { id: 1, venit: 10000, cheltuieli: 12000 },
    ]);
    expect(r.scenarii[0].luniFaraInvestitii).toBe(Infinity);
    expect(r.scenarii[0].luniCuInvestitii).toBe(Infinity);
  });
});

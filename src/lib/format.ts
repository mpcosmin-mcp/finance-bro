const ronFmt = new Intl.NumberFormat("ro-RO", {
  style: "currency",
  currency: "RON",
  maximumFractionDigits: 0,
});

const eurFmt = new Intl.NumberFormat("ro-RO", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const pctFmt = new Intl.NumberFormat("ro-RO", {
  style: "percent",
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const numFmt = new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 1 });

export const formatRon = (n: number) => (isFinite(n) ? ronFmt.format(n) : "—");
export const formatEur = (n: number) => (isFinite(n) ? eurFmt.format(n) : "—");
export const formatPct = (n: number) => (isFinite(n) ? pctFmt.format(n) : "—");
export const formatNum = (n: number) => (isFinite(n) ? numFmt.format(n) : "—");

"use client";

import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { NumericInput } from "@/components/numeric-input";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  DEFAULT_INPUTS,
  DEFAULT_SCENARII,
  SURSE_LABELS,
  SURSE_ORDER,
  calculeazaFire,
  simuleazaCrestere,
  type FireInputs,
  type IncomeSourceKey,
  type Scenariu,
} from "@/lib/fire";
import { formatEur, formatNum, formatPct, formatRon } from "@/lib/format";

export default function FireCalculator() {
  const [inputs, setInputs] = useState<FireInputs>(DEFAULT_INPUTS);
  const [scenarii, setScenarii] = useState<Scenariu[]>(DEFAULT_SCENARII);

  const rezultat = useMemo(
    () => calculeazaFire(inputs, scenarii),
    [inputs, scenarii],
  );

  const sumaSurse = useMemo(
    () => SURSE_ORDER.reduce((s, k) => s + (inputs.surse[k] || 0), 0),
    [inputs.surse],
  );
  const sumaSurseOk = Math.abs(sumaSurse - 1) < 0.001;

  const setNum = <K extends keyof FireInputs>(key: K, val: number) =>
    setInputs((p) => ({ ...p, [key]: val } as FireInputs));

  const setSursa = (key: IncomeSourceKey, val: number) =>
    setInputs((p) => ({
      ...p,
      surse: { ...p.surse, [key]: val },
    }));

  const addScenariu = () =>
    setScenarii((p) => [
      ...p,
      {
        id: (p.at(-1)?.id ?? 0) + 1,
        venit: 15000,
        cheltuieli: 10000,
      },
    ]);

  const updateScenariu = (id: number, patch: Partial<Scenariu>) =>
    setScenarii((p) => p.map((s) => (s.id === id ? { ...s, ...patch } : s)));

  const removeScenariu = (id: number) =>
    setScenarii((p) => (p.length > 1 ? p.filter((s) => s.id !== id) : p));

  const chartData = useMemo(() => {
    const r = inputs.randamentInvestitii - inputs.inflatie;
    const capital = rezultat.capitalNecesarRon;
    const seriile = rezultat.scenarii.map((s) => {
      const simulare = simuleazaCrestere(s.economii, r / 12, capital, 600);
      return { id: s.id, simulare };
    });
    const maxLen = Math.max(0, ...seriile.map((s) => s.simulare.length));
    const data: Array<{ luna: number; [key: `s${number}`]: number | null }> = [];
    for (let i = 0; i < maxLen; i++) {
      const row: { luna: number; [key: `s${number}`]: number | null } = {
        luna: i,
      };
      for (const s of seriile) {
        row[`s${s.id}` as `s${number}`] = s.simulare[i]?.valoare ?? null;
      }
      data.push(row);
    }
    return data;
  }, [inputs.randamentInvestitii, inputs.inflatie, rezultat]);

  const chartColors = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:py-12 space-y-8">
      <header className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="inline-block size-2 rounded-full bg-emerald-500" />
          Finance Bro
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Calculator FIRE — Libertate financiara
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Afla de cati bani ai nevoie investiti ca sa-ti acoperi cheltuielile
          lunare din randamentul real, si in cat timp ajungi acolo in functie
          de economiile tale.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Parametri</CardTitle>
            <CardDescription>
              Modifica valorile si vezi rezultatele instant.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Field
              label="Buget lunar necesar la retragere (RON)"
              value={inputs.bugetLunar}
              onChange={(v) => setNum("bugetLunar", v)}
              step={500}
            />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">
                  Surse de venit la retragere
                </Label>
                <span
                  className={`text-xs ${sumaSurseOk ? "text-muted-foreground" : "text-destructive"}`}
                >
                  Total: {formatPct(sumaSurse)}
                </span>
              </div>
              <div className="space-y-2">
                {SURSE_ORDER.map((k) => (
                  <div key={k} className="grid grid-cols-[1fr_110px] items-center gap-3">
                    <span className="text-sm">{SURSE_LABELS[k]}</span>
                    <PercentInput
                      value={inputs.surse[k]}
                      onChange={(v) => setSursa(k, v)}
                    />
                  </div>
                ))}
              </div>
              {!sumaSurseOk && (
                <p className="text-xs text-destructive">
                  Procentele trebuie sa insumeze 100%.
                </p>
              )}
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <Field
                label="Fond de urgenta (luni)"
                value={inputs.luniFondUrgenta}
                onChange={(v) => setNum("luniFondUrgenta", v)}
                step={1}
              />
              <PercentField
                label="Dobanda fond urgenta"
                value={inputs.randamentFondUrgenta}
                onChange={(v) => setNum("randamentFondUrgenta", v)}
              />
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <PercentField
                label="Randament investitii"
                value={inputs.randamentInvestitii}
                onChange={(v) => setNum("randamentInvestitii", v)}
              />
              <PercentField
                label="Inflatie"
                value={inputs.inflatie}
                onChange={(v) => setNum("inflatie", v)}
              />
            </div>

            <Field
              label="Curs EUR/RON"
              value={inputs.eurRonRate}
              onChange={(v) => setNum("eurRonRate", v)}
              step={0.01}
            />

            <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
              Randament real folosit in calcul:{" "}
              <span className="font-medium text-foreground">
                {formatPct(rezultat.randamentReal)}
              </span>{" "}
              (randament - inflatie)
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6 min-w-0">
          <div className="grid gap-4 sm:grid-cols-2">
            <KpiCard
              label="Capital necesar"
              value={formatRon(rezultat.capitalNecesarRon)}
              sub={formatEur(rezultat.capitalNecesarEur)}
              emphasis
            />
            <KpiCard
              label="Venit lunar pasiv (din investitii)"
              value={formatRon(rezultat.venitLunarDinInvestitii)}
              sub={`${formatPct(inputs.surse.investitii)} din bugetul lunar`}
            />
            <KpiCard
              label="Fond de urgenta"
              value={formatRon(rezultat.fondUrgentaRon)}
              sub={`${inputs.luniFondUrgenta} luni × buget lunar`}
            />
            <KpiCard
              label="Dobanda lunara fond urgenta"
              value={formatRon(rezultat.dobandaLunaraFondUrgenta)}
              sub={`la ${formatPct(inputs.randamentFondUrgenta)}/an`}
            />
          </div>

          <Card>
            <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <CardTitle>Scenarii venit vs. cheltuieli</CardTitle>
                <CardDescription>
                  Introdu cate scenarii vrei. Calculam in cat timp ajungi la
                  capitalul necesar, cu si fara investitii.
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={addScenariu}
                className="self-start sm:self-auto"
              >
                <Plus className="size-4" /> Scenariu
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3 md:hidden">
                {rezultat.scenarii.map((s) => (
                  <div
                    key={s.id}
                    className="rounded-lg border bg-card p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Scenariu {s.id}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeScenariu(s.id)}
                        disabled={rezultat.scenarii.length <= 1}
                        aria-label="Sterge scenariul"
                        className="-mr-2"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">
                          Venit lunar
                        </Label>
                        <NumericInput
                          allowDecimals={false}
                          min={0}
                          value={s.venit}
                          onChange={(v) =>
                            updateScenariu(s.id, { venit: v })
                          }
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">
                          Cheltuieli
                        </Label>
                        <NumericInput
                          allowDecimals={false}
                          min={0}
                          value={s.cheltuieli}
                          onChange={(v) =>
                            updateScenariu(s.id, { cheltuieli: v })
                          }
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 rounded-md bg-muted/50 p-3 text-sm">
                      <Stat label="Economii" value={formatRon(s.economii)} />
                      <Stat
                        label="Rata"
                        value={formatPct(s.rataEconomisire)}
                      />
                      <Stat
                        label="Fara investitii"
                        value={
                          isFinite(s.luniFaraInvestitii)
                            ? `${formatNum(s.luniFaraInvestitii / 12)} ani`
                            : "—"
                        }
                      />
                      <Stat
                        label="Cu investitii"
                        value={
                          isFinite(s.aniCuInvestitii)
                            ? `${formatNum(s.aniCuInvestitii)} ani`
                            : "—"
                        }
                        emphasis
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10">#</TableHead>
                      <TableHead>Venit lunar</TableHead>
                      <TableHead>Cheltuieli</TableHead>
                      <TableHead>Economii</TableHead>
                      <TableHead>Rata</TableHead>
                      <TableHead>Fara invest. (ani)</TableHead>
                      <TableHead>Cu invest. (ani)</TableHead>
                      <TableHead className="w-10" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rezultat.scenarii.map((s) => (
                      <TableRow key={s.id}>
                        <TableCell className="text-muted-foreground">
                          {s.id}
                        </TableCell>
                        <TableCell>
                          <NumberCell
                            value={s.venit}
                            onChange={(v) =>
                              updateScenariu(s.id, { venit: v })
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <NumberCell
                            value={s.cheltuieli}
                            onChange={(v) =>
                              updateScenariu(s.id, { cheltuieli: v })
                            }
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {formatRon(s.economii)}
                        </TableCell>
                        <TableCell>{formatPct(s.rataEconomisire)}</TableCell>
                        <TableCell>
                          {isFinite(s.luniFaraInvestitii)
                            ? formatNum(s.luniFaraInvestitii / 12)
                            : "—"}
                        </TableCell>
                        <TableCell className="font-medium">
                          {isFinite(s.aniCuInvestitii)
                            ? formatNum(s.aniCuInvestitii)
                            : "—"}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeScenariu(s.id)}
                            disabled={rezultat.scenarii.length <= 1}
                            aria-label="Sterge scenariul"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <Tabs defaultValue="grafic">
                <TabsList>
                  <TabsTrigger value="grafic">Grafic evolutie</TabsTrigger>
                  <TabsTrigger value="explicatie">Cum calculam</TabsTrigger>
                </TabsList>
                <TabsContent value="grafic" className="mt-4">
                  <div className="h-[240px] sm:h-[320px] w-full min-w-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          {rezultat.scenarii.map((s, i) => (
                            <linearGradient
                              key={s.id}
                              id={`grad-${s.id}`}
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="0%"
                                stopColor={chartColors[i % chartColors.length]}
                                stopOpacity={0.4}
                              />
                              <stop
                                offset="100%"
                                stopColor={chartColors[i % chartColors.length]}
                                stopOpacity={0}
                              />
                            </linearGradient>
                          ))}
                        </defs>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="var(--border)"
                        />
                        <XAxis
                          dataKey="luna"
                          type="number"
                          domain={[0, "dataMax"]}
                          ticks={Array.from(
                            {
                              length:
                                Math.ceil(
                                  (chartData.at(-1)?.luna ?? 0) / 12,
                                ) + 1,
                            },
                            (_, i) => i * 12,
                          )}
                          tickFormatter={(v) => `${Math.round(Number(v) / 12)}a`}
                          stroke="var(--muted-foreground)"
                          fontSize={12}
                        />
                        <YAxis
                          tickFormatter={(v) =>
                            v >= 1_000_000
                              ? `${(v / 1_000_000).toFixed(1)}M`
                              : v >= 1000
                                ? `${Math.round(v / 1000)}k`
                                : `${v}`
                          }
                          stroke="var(--muted-foreground)"
                          fontSize={12}
                        />
                        <Tooltip
                          contentStyle={{
                            background: "var(--popover)",
                            border: "1px solid var(--border)",
                            borderRadius: 8,
                            color: "var(--popover-foreground)",
                          }}
                          formatter={(v) =>
                            typeof v === "number" ? formatRon(v) : "—"
                          }
                          labelFormatter={(l) => {
                            const n = Number(l);
                            return `Luna ${n} (an ${(n / 12).toFixed(1)})`;
                          }}
                        />
                        <ReferenceLine
                          y={rezultat.capitalNecesarRon}
                          stroke="var(--foreground)"
                          strokeDasharray="4 4"
                          label={{
                            value: "Capital tinta",
                            position: "insideTopRight",
                            fill: "var(--muted-foreground)",
                            fontSize: 11,
                          }}
                        />
                        {rezultat.scenarii.map((s, i) => (
                          <Area
                            key={s.id}
                            type="monotone"
                            dataKey={`s${s.id}`}
                            name={`Scenariu ${s.id}`}
                            stroke={chartColors[i % chartColors.length]}
                            strokeWidth={2}
                            fill={`url(#grad-${s.id})`}
                            connectNulls={false}
                          />
                        ))}
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
                <TabsContent value="explicatie" className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <p>
                    <span className="font-medium text-foreground">
                      Capital necesar
                    </span>{" "}
                    = (venit lunar din investitii × 12) / randament real. Este
                    suma care, investita la randamentul real, iti produce venitul
                    pasiv dorit fara sa scada in timp.
                  </p>
                  <p>
                    <span className="font-medium text-foreground">
                      Randament real
                    </span>{" "}
                    = randament nominal − inflatie. Folosim valoarea reala ca
                    sa-ti pastrezi puterea de cumparare in timp.
                  </p>
                  <p>
                    <span className="font-medium text-foreground">
                      Timp cu investitii
                    </span>{" "}
                    = NPER(randament real / 12, economii lunare, capital
                    necesar). Presupunem ca investesti economiile lunar si iti
                    capitalizezi randamentul.
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

    </div>
  );
}

function KpiCard({
  label,
  value,
  sub,
  emphasis,
}: {
  label: string;
  value: string;
  sub?: string;
  emphasis?: boolean;
}) {
  return (
    <Card className={emphasis ? "border-foreground/20" : undefined}>
      <CardHeader className="pb-2">
        <CardDescription>{label}</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={
            emphasis
              ? "text-xl lg:text-2xl xl:text-3xl font-semibold tracking-tight tabular-nums"
              : "text-lg lg:text-xl xl:text-2xl font-semibold tracking-tight tabular-nums"
          }
        >
          {value}
        </div>
        {sub && (
          <div className="text-xs text-muted-foreground mt-1">{sub}</div>
        )}
      </CardContent>
    </Card>
  );
}

function Stat({
  label,
  value,
  emphasis,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div className="space-y-0.5">
      <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
      <div
        className={
          emphasis
            ? "font-semibold tabular-nums"
            : "font-medium tabular-nums"
        }
      >
        {value}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  step?: number;
}) {
  const allowDecimals = step < 1;
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <NumericInput
        value={value}
        onChange={onChange}
        min={0}
        allowDecimals={allowDecimals}
      />
    </div>
  );
}

function PercentField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="relative">
        <NumericInput
          className="pr-8"
          min={0}
          decimals={1}
          value={Number((value * 100).toFixed(1))}
          onChange={(v) => onChange(v / 100)}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
          %
        </span>
      </div>
    </div>
  );
}

function PercentInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="relative">
      <NumericInput
        className="pr-8 h-9"
        min={0}
        allowDecimals={false}
        value={Math.round(value * 100)}
        onChange={(v) => onChange(v / 100)}
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
        %
      </span>
    </div>
  );
}

function NumberCell({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <NumericInput
      className="h-8 w-28"
      allowDecimals={false}
      min={0}
      value={value}
      onChange={onChange}
    />
  );
}

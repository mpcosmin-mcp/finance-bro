"use client";

import { useEffect, useRef, useState, type ComponentProps } from "react";

import { Input } from "@/components/ui/input";

type InputProps = ComponentProps<typeof Input>;

type NumericInputProps = Omit<
  InputProps,
  "value" | "onChange" | "type" | "inputMode"
> & {
  value: number;
  onChange: (value: number) => void;
  /** Numar de zecimale afisat la blur. Default: 0 pentru intregi. */
  decimals?: number;
  /** Daca permite introducerea de zecimale. Default: true. */
  allowDecimals?: boolean;
  /** Valoarea minima permisa (dupa parsing). Default: fara limita. */
  min?: number;
};

function toDisplay(value: number, decimals?: number): string {
  if (!Number.isFinite(value)) return "";
  if (typeof decimals === "number") return value.toFixed(decimals);
  return String(value);
}

function parse(raw: string, allowDecimals: boolean): number | null {
  const cleaned = raw.replace(",", ".").trim();
  if (cleaned === "" || cleaned === "-" || cleaned === "." || cleaned === "-.")
    return null;
  if (!allowDecimals && cleaned.includes(".")) return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

export function NumericInput({
  value,
  onChange,
  decimals,
  allowDecimals = true,
  min,
  onBlur,
  onFocus,
  ...rest
}: NumericInputProps) {
  const [local, setLocal] = useState<string>(() => toDisplay(value, decimals));
  const userEditingRef = useRef(false);

  // Sincronizare cand valoarea externa se schimba din afara (nu din input-ul asta).
  useEffect(() => {
    if (userEditingRef.current) return;
    setLocal(toDisplay(value, decimals));
  }, [value, decimals]);

  return (
    <Input
      {...rest}
      type="text"
      inputMode={allowDecimals ? "decimal" : "numeric"}
      value={local}
      onFocus={(e) => {
        userEditingRef.current = true;
        onFocus?.(e);
      }}
      onChange={(e) => {
        const raw = e.target.value;
        setLocal(raw);
        const parsed = parse(raw, allowDecimals);
        if (parsed === null) {
          // gol / in tranzit (ex. "-", ".") — trimitem 0 ca sa nu rupem calculele
          if (raw.trim() === "") onChange(0);
          return;
        }
        if (typeof min === "number" && parsed < min) return;
        onChange(parsed);
      }}
      onBlur={(e) => {
        userEditingRef.current = false;
        const parsed = parse(local, allowDecimals);
        if (parsed === null) {
          setLocal(toDisplay(value, decimals));
        } else {
          const clamped =
            typeof min === "number" && parsed < min ? min : parsed;
          setLocal(toDisplay(clamped, decimals));
          if (clamped !== value) onChange(clamped);
        }
        onBlur?.(e);
      }}
    />
  );
}

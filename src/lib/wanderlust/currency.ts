/**
 * WanderLust — Currency configuration (Apple Edition)
 * ----------------------------------------------------
 * All listing prices are stored in US Dollars (USD).
 * The Egyptian Pound (EGP) is a display currency converted at a
 * static reference rate (update EGP_PER_USD as needed).
 */

export const EGP_PER_USD = 48.5; // static display reference rate: 1 USD ≈ 48.5 EGP

export type CurrencyCode = "USD" | "EGP";

export const CURRENCIES: Record<
  CurrencyCode,
  { code: CurrencyCode; symbol: string; rate: number; label: string }
> = {
  USD: { code: "USD", symbol: "$", rate: 1, label: "US Dollar" },
  EGP: { code: "EGP", symbol: "E£", rate: EGP_PER_USD, label: "Egyptian Pound" },
};

export const DEFAULT_CURRENCY: CurrencyCode = "USD";

/** Convert an amount from USD into the given currency code. */
export function convert(amountUSD: number, code: CurrencyCode = DEFAULT_CURRENCY): number {
  return amountUSD * CURRENCIES[code].rate;
}

/** Format an amount (stored in USD) as a display string, e.g. "$ 42" / "E£ 2,037". */
export function formatPrice(amountUSD: number, code: CurrencyCode = DEFAULT_CURRENCY): string {
  const c = CURRENCIES[code];
  const value = Math.round(amountUSD * c.rate);
  return `${c.symbol} ${value.toLocaleString("en-US")}`;
}

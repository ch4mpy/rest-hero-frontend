// Amounts are stored as smallest currency unit (e.g. cents).
// `decimals` comes from the currency service (number of decimals of the currency).
export function formatAmount(
  amount: number,
  currency: string,
  decimals = 2,
  locale = "fr-FR",
): string {
  const value = amount / Math.pow(10, decimals);
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      currencyDisplay: "code",
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  } catch {
    return `${value.toFixed(decimals)} ${currency}`;
  }
}

export function formatDate(iso: string, locale = "fr-FR"): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export function maskCardNumber(n: string): string {
  const clean = n.replace(/\s+/g, "");
  if (clean.length < 8) return n;
  return `${clean.slice(0, 4)} •••• •••• ${clean.slice(-4)}`;
}

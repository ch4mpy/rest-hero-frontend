// Amounts are stored as smallest currency unit (integer cents).
export function formatAmount(amount: number, currency: string, locale = "fr-FR"): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      currencyDisplay: "code",
    }).format(amount / 100);
  } catch {
    return `${(amount / 100).toFixed(2)} ${currency}`;
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

import { useQuery } from "@tanstack/react-query";
import { currencyApi } from "../apis";
import type { CurrencyResponse } from "@/rest/currency";
import { formatAmount } from "@/lib/format";

export const DEFAULT_DECIMALS = 2;

export function useCurrencies() {
  const query = useQuery({
    queryKey: ["currencies"],
    queryFn: () => currencyApi.listSupportedCurrencies(),
    staleTime: 60 * 60 * 1000,
  });

  const currencies: CurrencyResponse[] = query.data ?? [];

  const decimalsOf = (iso3: string) =>
    currencies.find((c) => c.iso3 === iso3)?.decimals ?? DEFAULT_DECIMALS;

  const format = (amount: number, iso3: string) =>
    formatAmount(amount, iso3, decimalsOf(iso3));

  return { ...query, currencies, decimalsOf, format };
}

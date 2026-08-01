import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCurrencies } from "@/lib/currencies";

export const ANY_CURRENCY = "__any__";

interface Props {
  id?: string;
  value: string;
  onChange: (iso3: string) => void;
  label?: string;
  /** Adds an "any currency" option, useful for filters. */
  allowAny?: boolean;
  className?: string;
}

export function CurrencySelect({
  id = "currency",
  value,
  onChange,
  label,
  allowAny = false,
  className,
}: Props) {
  const { t } = useTranslation();
  const { currencies } = useCurrencies();

  return (
    <div className={`grid gap-1.5 ${className ?? ""}`}>
      {label !== undefined ? <Label htmlFor={id}>{label}</Label> : null}
      <Select value={value || (allowAny ? ANY_CURRENCY : "")} onValueChange={onChange}>
        <SelectTrigger id={id}>
          <SelectValue placeholder={t("account.currency")} />
        </SelectTrigger>
        <SelectContent>
          {allowAny ? <SelectItem value={ANY_CURRENCY}>{t("transfer.anyCurrency")}</SelectItem> : null}
          {currencies.map((c) => (
            <SelectItem key={c.iso3} value={c.iso3}>
              {c.iso3}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const pad = (n: number) => String(n).padStart(2, "0");

const toLocalInput = (d: Date) => {
  d.setSeconds(0, 0);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const initialFrom = () => {
  const d = new Date();
  d.setMonth(d.getMonth() - 1);
  return toLocalInput(d);
};

const initialTo = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(0, 0, 0, 0);
  return toLocalInput(d);
};

export interface PeriodFilterState {
  from: string;
  to: string;
  rangeValid: boolean;
  fromDate: Date | null;
  toDate: Date | null;
}

export function usePeriodFilter(): PeriodFilterState & {
  setFrom: (v: string) => void;
  setTo: (v: string) => void;
  shiftMonths: (m: number) => void;
  reset: () => void;
  showNextMonth: boolean;
} {
  const [from, setFrom] = useState<string>(initialFrom);
  const [to, setTo] = useState<string>(initialTo);

  const shiftMonths = (months: number) => {
    const f = new Date(from);
    const t = new Date(to);
    f.setMonth(f.getMonth() + months);
    t.setMonth(t.getMonth() + months);
    setFrom(toLocalInput(f));
    setTo(toLocalInput(t));
  };
  const reset = () => {
    setFrom(initialFrom());
    setTo(initialTo());
  };

  const fromValid = !!from && !Number.isNaN(new Date(from).getTime());
  const toValid = !!to && !Number.isNaN(new Date(to).getTime());
  const rangeValid = fromValid && toValid && new Date(from).getTime() <= new Date(to).getTime();
  const showNextMonth = to ? new Date(to).getTime() < Date.now() : false;

  return {
    from,
    to,
    fromDate: fromValid ? new Date(from) : null,
    toDate: toValid ? new Date(to) : null,
    rangeValid,
    setFrom,
    setTo,
    shiftMonths,
    reset,
    showNextMonth,
  };
}

interface PeriodFilterProps {
  idPrefix?: string;
  state: ReturnType<typeof usePeriodFilter>;
}

export function PeriodFilter({ idPrefix = "period", state }: PeriodFilterProps) {
  const { t } = useTranslation();
  const { from, to, setFrom, setTo, shiftMonths, reset, showNextMonth } = state;
  const fromId = `${idPrefix}-from`;
  const toId = `${idPrefix}-to`;

  return (
    <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
      <div className="grid gap-1.5">
        <Label htmlFor={fromId}>{t("payment.from")}</Label>
        <Input
          id={fromId}
          type="datetime-local"
          required
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap items-center gap-2 sm:pb-1">
        <Button
          id={`${idPrefix}-previous-month`}
          type="button"
          variant="outline"
          size="sm"
          onClick={() => shiftMonths(-1)}
        >
          {t("payment.previousMonth")}
        </Button>
        <Button
          id={`${idPrefix}-current-month`}
          type="button"
          variant="outline"
          size="sm"
          onClick={reset}
        >
          {t("payment.currentMonth")}
        </Button>
        {showNextMonth ? (
          <Button
            id={`${idPrefix}-next-month`}
            type="button"
            variant="outline"
            size="sm"
            onClick={() => shiftMonths(1)}
          >
            {t("payment.nextMonth")}
          </Button>
        ) : null}
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor={toId}>{t("payment.to")}</Label>
        <Input
          id={toId}
          type="datetime-local"
          required
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
      </div>
    </div>
  );
}

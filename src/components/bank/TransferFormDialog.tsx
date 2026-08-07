import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { transfersApi } from "../../apis";
import { toast } from "sonner";
import { BeneficiarySelect } from "./BeneficiarySelect";
import { CurrencySelect } from "./CurrencySelect";
import { useCurrencies } from "@/lib/currencies";
import { accountQueryKeys } from "@/lib/resourceEvents";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sourceIban: string;
  customerId: string;
  accountCurrency: string;
}

type Direction = "to" | "from";

export function TransferFormDialog({
  open,
  onOpenChange,
  sourceIban,
  customerId,
  accountCurrency,
}: Props) {
  const { t } = useTranslation();
  const { decimalsOf, format } = useCurrencies();
  const qc = useQueryClient();
  const [direction, setDirection] = useState<Direction>("to");
  const [beneficiaryIban, setBeneficiaryIban] = useState("");
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState(accountCurrency);

  const mutation = useMutation({
    mutationFn: () =>
      transfersApi.transferMoneyBetweenAccounts({
        moneyTransferRequest: {
          sourceIban: direction === "to" ? sourceIban : beneficiaryIban,
          destinationIban: direction === "to" ? beneficiaryIban : sourceIban,
          amount,
          currency,
          label,
        },
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: accountQueryKeys.transfersOut(sourceIban) });
      qc.invalidateQueries({ queryKey: accountQueryKeys.transfersIn(sourceIban) });
      qc.invalidateQueries({ queryKey: accountQueryKeys.account(sourceIban) });
      onOpenChange(false);
      setBeneficiaryIban("");
      setLabel("");
      setAmount(0);
      setCurrency(accountCurrency);
      setDirection("to");
    },
    onError: () => toast.error(t("errors.actionFailed")),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("transfer.createTitle")}</DialogTitle>
        </DialogHeader>
        <form
          className="grid gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate();
          }}
        >
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <BeneficiarySelect
                id="transfer-ben"
                customerId={customerId}
                value={beneficiaryIban}
                onChange={setBeneficiaryIban}
                enabled={open}
                label={
                  direction === "to"
                    ? t("payment.destination")
                    : t("transfer.source")
                }
              />
            </div>
            <ToggleGroup
              type="single"
              value={direction}
              onValueChange={(v) => v && setDirection(v as Direction)}
              variant="outline"
              size="sm"
            >
              <ToggleGroupItem value="to">{t("transfer.directionTo")}</ToggleGroupItem>
              <ToggleGroupItem value="from">{t("transfer.directionFrom")}</ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="transfer-label">{t("transfer.labelField")}</Label>
            <Input
              id="transfer-label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2 grid gap-1.5">
              <Label htmlFor="transfer-amount">
                {t("transfer.amount")}
                {decimalsOf(currency) > 0 ? ` — ${t("amount.withDecimals")}` : ""}
              </Label>
              <Input
                id="transfer-amount"
                type="number"
                min={1}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                required
              />
              <p className="text-sm text-muted-foreground">{format(amount, currency)}</p>
            </div>
            <CurrencySelect
              id="transfer-currency"
              label={t("transfer.currency")}
              value={currency}
              onChange={setCurrency}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {t("actions.cancel")}
            </Button>
            <Button
              type="submit"
              disabled={
                mutation.isPending ||
                !beneficiaryIban ||
                !label ||
                amount <= 0 ||
                currency.length !== 3
              }
            >
              {t("actions.create")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

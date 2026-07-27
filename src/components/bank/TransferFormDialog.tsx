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
import { transfersApi } from "../../apis";
import { toast } from "sonner";
import { BeneficiarySelect } from "./BeneficiarySelect";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sourceIban: string;
  customerId: string;
  accountCurrency: string;
}

export function TransferFormDialog({
  open,
  onOpenChange,
  sourceIban,
  customerId,
  accountCurrency,
}: Props) {
  const { t } = useTranslation();
  const qc = useQueryClient();
  const [destinationIban, setDestinationIban] = useState("");
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState(accountCurrency);

  const mutation = useMutation({
    mutationFn: () =>
      transfersApi.transferMoneyBetweenAccounts({
        moneyTransferRequest: {
          sourceIban,
          destinationIban,
          amount,
          currency,
          label,
        },
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["transfers", sourceIban] });
      qc.invalidateQueries({ queryKey: ["transfers-in", sourceIban] });
      qc.invalidateQueries({ queryKey: ["account", sourceIban] });
      onOpenChange(false);
      setDestinationIban("");
      setLabel("");
      setAmount(0);
      setCurrency(accountCurrency);
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
          <BeneficiarySelect
            id="transfer-ben"
            customerId={customerId}
            value={destinationIban}
            onChange={setDestinationIban}
            enabled={open}
          />
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
              <Label htmlFor="transfer-amount">{t("transfer.amount")}</Label>
              <Input
                id="transfer-amount"
                type="number"
                min={1}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                required
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="transfer-currency">{t("transfer.currency")}</Label>
              <Input
                id="transfer-currency"
                maxLength={3}
                value={currency}
                onChange={(e) => setCurrency(e.target.value.toUpperCase())}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {t("actions.cancel")}
            </Button>
            <Button
              type="submit"
              disabled={
                mutation.isPending ||
                !destinationIban ||
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

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
import { cardApi } from "../../apis";
import { cardQueryKeys } from "@/lib/resourceEvents";
import { toast } from "sonner";
import { BeneficiarySelect } from "./BeneficiarySelect";
import { useCurrencies } from "@/lib/currencies";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cardNumber: string;
  customerId: string;
  currency: string;
}
export function PaymentFormDialog({ open, onOpenChange, cardNumber, customerId, currency }: Props) {
  const { t } = useTranslation();
  const { decimalsOf, format } = useCurrencies();
  const qc = useQueryClient();
  const [destinationIban, setDestinationIban] = useState("");
  const [amount, setAmount] = useState(0);

  const mutation = useMutation({
    mutationFn: () =>
      cardApi.createCardPayment({
        cardNumber,
        cardPaymentCreationRequest: {
          destinationIban,
          amount,
          currency,
          cardNumber,
        },
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: cardQueryKeys.payments(cardNumber) });
      onOpenChange(false);
      setDestinationIban("");
      setAmount(0);
    },
    onError: () => toast.error(t("errors.actionFailed")),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("payment.createTitle")}</DialogTitle>
        </DialogHeader>
        <form
          className="grid gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate();
          }}
        >
          <BeneficiarySelect
            id="pay-ben"
            customerId={customerId}
            value={destinationIban}
            onChange={setDestinationIban}
            enabled={open}
          />
          <div className="grid gap-1.5">
            <Label htmlFor="pay-amount">
              {t("payment.amount")} ({currency})
              {decimalsOf(currency) > 0 ? ` — ${t("amount.withDecimals")}` : ""}
            </Label>
            <Input
              id="pay-amount"
              type="number"
              min={1}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              required
            />
            <p className="text-sm text-muted-foreground">{format(amount, currency)}</p>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {t("actions.cancel")}
            </Button>
            <Button type="submit" disabled={mutation.isPending || !destinationIban || amount <= 0}>
              {t("card.pay")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

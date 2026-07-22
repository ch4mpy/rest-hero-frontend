import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cardService, customerService } from "@/rest/services";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cardNumber: string;
  customerId: string;
  currency: string;
}
export function PaymentFormDialog({ open, onOpenChange, cardNumber, customerId, currency }: Props) {
  const { t } = useTranslation();
  const qc = useQueryClient();
  const [destinationIban, setDestinationIban] = useState("");
  const [amount, setAmount] = useState(0);

  const { data: beneficiaries } = useQuery({
    queryKey: ["beneficiaries", customerId],
    queryFn: () => customerService.listBeneficiaries(customerId),
    enabled: open,
  });

  const mutation = useMutation({
    mutationFn: () =>
      cardService.createPayment(cardNumber, {
        destinationIban,
        amount,
        currency,
        cardNumber,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["payments", cardNumber] });
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
          <div className="grid gap-1.5">
            <Label htmlFor="pay-ben">{t("payment.destination")}</Label>
            <Select value={destinationIban} onValueChange={setDestinationIban}>
              <SelectTrigger id="pay-ben">
                <SelectValue placeholder={t("payment.selectBeneficiary")} />
              </SelectTrigger>
              <SelectContent>
                {beneficiaries?.map((b) => (
                  <SelectItem key={b.id} value={b.iban}>
                    {b.label} — {b.iban}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="pay-amount">
              {t("payment.amount")} ({currency})
            </Label>
            <Input
              id="pay-amount"
              type="number"
              min={1}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              required
            />
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

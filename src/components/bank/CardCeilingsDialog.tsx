import { useEffect, useState } from "react";
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
import type { CardResponse } from "@/rest/card";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  card: CardResponse;
}
export function CardCeilingsDialog({ open, onOpenChange, card }: Props) {
  const { t } = useTranslation();
  const qc = useQueryClient();
  const [tx, setTx] = useState(card.transactionCeiling);
  const [r30, setR30] = useState(card.rolling30Ceiling);

  useEffect(() => {
    if (open) {
      setTx(card.transactionCeiling);
      setR30(card.rolling30Ceiling);
    }
  }, [open, card]);

  const mutation = useMutation({
    mutationFn: () =>
      cardApi.setCardCeilings({
        cardNumber: card.number,
        cardCeilingsRequest: {
          transactionCeiling: tx,
          rolling30Ceiling: r30,
        },
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["card", card.number] });
      onOpenChange(false);
    },
    onError: () => toast.error(t("errors.actionFailed")),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("card.editCeilings")}</DialogTitle>
        </DialogHeader>
        <form
          className="grid gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate();
          }}
        >
          <div className="grid gap-1.5">
            <Label htmlFor="ec-tx">{t("card.transactionCeiling")}</Label>
            <Input
              id="ec-tx"
              type="number"
              min={0}
              value={tx}
              onChange={(e) => setTx(Number(e.target.value))}
              required
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="ec-r30">{t("card.rolling30Ceiling")}</Label>
            <Input
              id="ec-r30"
              type="number"
              min={0}
              value={r30}
              onChange={(e) => setR30(Number(e.target.value))}
              required
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {t("actions.cancel")}
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {t("actions.save")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

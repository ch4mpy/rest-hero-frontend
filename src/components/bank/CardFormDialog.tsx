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
import { cardService } from "@/rest/services";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  iban: string;
}
export function CardFormDialog({ open, onOpenChange, iban }: Props) {
  const { t } = useTranslation();
  const qc = useQueryClient();
  const [transactionCeiling, setTransactionCeiling] = useState(50000);
  const [rolling30Ceiling, setRolling30Ceiling] = useState(200000);

  const mutation = useMutation({
    mutationFn: () => cardService.createCard({ iban, transactionCeiling, rolling30Ceiling }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cards", iban] });
      onOpenChange(false);
    },
    onError: () => toast.error(t("errors.actionFailed")),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("card.addCard")}</DialogTitle>
        </DialogHeader>
        <form
          className="grid gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate();
          }}
        >
          <div className="grid gap-1.5">
            <Label htmlFor="txc">{t("card.transactionCeiling")}</Label>
            <Input
              id="txc"
              type="number"
              min={0}
              value={transactionCeiling}
              onChange={(e) => setTransactionCeiling(Number(e.target.value))}
              required
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="r30c">{t("card.rolling30Ceiling")}</Label>
            <Input
              id="r30c"
              type="number"
              min={0}
              value={rolling30Ceiling}
              onChange={(e) => setRolling30Ceiling(Number(e.target.value))}
              required
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {t("actions.cancel")}
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {t("actions.create")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

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
import { accountService } from "@/rest/services";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customerId: string;
}
export function AccountFormDialog({ open, onOpenChange, customerId }: Props) {
  const { t } = useTranslation();
  const qc = useQueryClient();
  const [iban, setIban] = useState("");
  const [currency, setCurrency] = useState("EUR");

  const mutation = useMutation({
    mutationFn: () => accountService.createAccount({ iban, customerId, currency }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["accounts", customerId] });
      onOpenChange(false);
      setIban("");
      setCurrency("EUR");
    },
    onError: () => toast.error(t("errors.actionFailed")),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("home.addAccount")}</DialogTitle>
        </DialogHeader>
        <form
          className="grid gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate();
          }}
        >
          <div className="grid gap-1.5">
            <Label htmlFor="iban">{t("account.iban")}</Label>
            <Input id="iban" value={iban} onChange={(e) => setIban(e.target.value)} required />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="currency">{t("account.currency")}</Label>
            <Input id="currency" maxLength={3} value={currency} onChange={(e) => setCurrency(e.target.value.toUpperCase())} required />
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

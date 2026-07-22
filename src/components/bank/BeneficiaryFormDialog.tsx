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
import { customerService } from "@/rest/services";
import type { BeneficiaryResponse } from "@/rest/types";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customerId: string;
  beneficiary?: BeneficiaryResponse | null;
}
export function BeneficiaryFormDialog({ open, onOpenChange, customerId, beneficiary }: Props) {
  const { t } = useTranslation();
  const qc = useQueryClient();
  const [label, setLabel] = useState("");
  const [iban, setIban] = useState("");

  useEffect(() => {
    if (open) {
      setLabel(beneficiary?.label ?? "");
      setIban(beneficiary?.iban ?? "");
    }
  }, [open, beneficiary]);

  const mutation = useMutation({
    mutationFn: () =>
      beneficiary
        ? customerService.updateBeneficiary(customerId, beneficiary.id, { label, iban })
        : customerService.addBeneficiary(customerId, { label, iban }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["beneficiaries", customerId] });
      onOpenChange(false);
    },
    onError: () => toast.error(t("errors.actionFailed")),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {beneficiary ? t("beneficiary.edit") : t("home.addBeneficiary")}
          </DialogTitle>
        </DialogHeader>
        <form
          className="grid gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate();
          }}
        >
          <div className="grid gap-1.5">
            <Label htmlFor="ben-label">{t("beneficiary.label")}</Label>
            <Input id="ben-label" value={label} onChange={(e) => setLabel(e.target.value)} required />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="ben-iban">{t("beneficiary.iban")}</Label>
            <Input id="ben-iban" value={iban} onChange={(e) => setIban(e.target.value)} required />
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

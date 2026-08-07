import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus } from "lucide-react";
import { customerApi } from "../../apis";
import type { BeneficiaryResponse, ListBeneficiariesRequest } from "@/rest/customer";
import { BeneficiaryFormDialog } from "./BeneficiaryFormDialog";
import { beneficiaryQueryKeys } from "@/lib/resourceEvents";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export interface BeneficiariesListProps {
  customerId: string;
  canEdit: boolean;
  onSelect?: (b: BeneficiaryResponse) => void;
  selectedId?: number;
  hideCard?: boolean;
}
export function BeneficiariesList({
  customerId,
  canEdit,
  onSelect,
  selectedId,
  hideCard,
}: BeneficiariesListProps) {
  const { t } = useTranslation();
  const qc = useQueryClient();
  const [editing, setEditing] = useState<BeneficiaryResponse | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState<BeneficiaryResponse | null>(null);

  const { data } = useQuery({
    queryKey: beneficiaryQueryKeys.beneficiaries(customerId),
    queryFn: () => customerApi.listBeneficiaries({ customerId }),
  });

  const del = useMutation({
    mutationFn: (b: BeneficiaryResponse) =>
      customerApi.deleteBeneficiary({ customerId, beneficiaryId: b.id }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: beneficiaryQueryKeys.beneficiaries(customerId) });
      setDeleting(null);
    },
    onError: () => toast.error(t("errors.actionFailed")),
  });

  const list = (
    <ul className="divide-y">
      {data?.length ? (
        data.map((b) => (
          <li
            key={b.id}
            className={`flex items-center justify-between gap-3 py-2 ${
              selectedId === b.id ? "bg-accent/10" : ""
            }`}
          >
            <button
              type="button"
              className="flex-1 text-left"
              onClick={() => onSelect?.(b)}
              disabled={!onSelect}
            >
              <div className="font-medium">{b.label}</div>
              <div className="text-xs text-muted-foreground">{b.iban}</div>
            </button>
            {canEdit ? (
              <div className="flex items-center gap-1">
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label={t("beneficiary.edit")}
                  onClick={() => {
                    setEditing(b);
                    setDialogOpen(true);
                  }}
                >
                  <Pencil className="h-4 w-4" aria-hidden />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label={t("beneficiary.delete")}
                  onClick={() => setDeleting(b)}
                >
                  <Trash2 className="h-4 w-4" aria-hidden />
                </Button>
              </div>
            ) : null}
          </li>
        ))
      ) : (
        <li className="py-4 text-sm text-muted-foreground">{t("home.noBeneficiaries")}</li>
      )}
    </ul>
  );

  const addButton = canEdit ? (
    <div className="pt-3">
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          setEditing(null);
          setDialogOpen(true);
        }}
      >
        <Plus className="mr-1 h-4 w-4" aria-hidden />
        {t("home.addBeneficiary")}
      </Button>
    </div>
  ) : null;

  return (
    <>
      {hideCard ? (
        <div>
          {list}
          {addButton}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>{t("home.beneficiaries")}</CardTitle>
          </CardHeader>
          <CardContent>
            {list}
            {addButton}
          </CardContent>
        </Card>
      )}

      <BeneficiaryFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        customerId={customerId}
        beneficiary={editing}
      />

      <AlertDialog open={!!deleting} onOpenChange={(o) => !o && setDeleting(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("beneficiary.confirmDelete")}</AlertDialogTitle>
            <AlertDialogDescription>
              {deleting ? `${deleting.label} — ${deleting.iban}` : null}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("actions.cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleting && del.mutate(deleting)}>
              {t("actions.delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Pencil, CreditCard } from "lucide-react";
import { accountService, cardService } from "@/rest/services";
import { formatAmount, formatDate, maskCardNumber } from "@/lib/format";
import { hasAuthority, useMe } from "@/lib/auth";
import { CardCeilingsDialog } from "@/components/bank/CardCeilingsDialog";
import { PaymentFormDialog } from "@/components/bank/PaymentFormDialog";
import { toast } from "sonner";

export const Route = createFileRoute("/cards/$cardNumber")({
  head: ({ params }) => ({
    meta: [
      { title: `Card ${params.cardNumber} — REST hero` },
      { name: "description", content: `Card details and payments in REST hero online banking.` },
      { property: "og:title", content: `Card ${params.cardNumber} — REST hero` },
      { property: "og:description", content: `Card details and payments.` },
    ],
  }),
  component: CardDetails,
});

function CardDetails() {
  const { cardNumber } = Route.useParams();
  const { t } = useTranslation();
  const qc = useQueryClient();
  const { data: me } = useMe();
  const canEditCeilings = hasAuthority(me, "card.ceilings_edit");
  const canEditStatus = hasAuthority(me, "card.status_edit");

  const [ceilingsOpen, setCeilingsOpen] = useState(false);
  const [payOpen, setPayOpen] = useState(false);
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");

  const { data: card } = useQuery({
    queryKey: ["card", cardNumber],
    queryFn: () => cardService.getCard(cardNumber),
  });

  const { data: account } = useQuery({
    queryKey: ["account", card?.iban],
    queryFn: () => accountService.getAccount(card!.iban),
    enabled: !!card?.iban,
  });

  const { data: payments } = useQuery({
    queryKey: ["payments", cardNumber, from, to],
    queryFn: () =>
      cardService.listPayments(cardNumber, {
        from: from || undefined,
        to: to || undefined,
      }),
  });

  const isOwner = !!(account && me?.sub && account.customerId === me.sub);

  const statusMutation = useMutation({
    mutationFn: (isActive: boolean) => cardService.setStatus(cardNumber, { isActive }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["card", cardNumber] }),
    onError: () => toast.error(t("errors.actionFailed")),
  });

  return (
    <div className="grid gap-6">
      <div>
        <Button asChild variant="ghost" size="sm">
          <Link to={card ? "/accounts/$iban" : "/"} params={card ? { iban: card.iban } : ({} as never)}>
            <ArrowLeft className="mr-1 h-4 w-4" aria-hidden />
            {t("account.back")}
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{t("card.info")}</CardTitle>
          {canEditCeilings && card ? (
            <Button variant="outline" size="sm" onClick={() => setCeilingsOpen(true)}>
              <Pencil className="mr-1 h-4 w-4" aria-hidden />
              {t("card.editCeilings")}
            </Button>
          ) : null}
        </CardHeader>
        <CardContent className="grid gap-3 text-sm">
          {card ? (
            <>
              <Row label={t("account.iban")} value={card.iban} />
              <Row label={t("card.number")} value={maskCardNumber(card.number)} />
              <Row
                label={t("card.transactionCeiling")}
                value={formatAmount(card.transactionCeiling, account?.currency ?? "EUR")}
              />
              <Row
                label={t("card.rolling30Ceiling")}
                value={formatAmount(card.rolling30Ceiling, account?.currency ?? "EUR")}
              />
              <div className="grid grid-cols-3 items-center gap-2">
                <div className="text-muted-foreground">{t("card.active")}</div>
                <div className="col-span-2 flex items-center gap-3">
                  <Switch
                    checked={card.isActive}
                    onCheckedChange={(v) => statusMutation.mutate(v)}
                    disabled={!canEditStatus || statusMutation.isPending}
                    aria-label={t("card.active")}
                  />
                  <span className="text-sm">
                    {card.isActive ? t("card.active") : "—"}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <p className="text-muted-foreground">{t("actions.loading")}</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{t("card.payments")}</CardTitle>
          {isOwner && card ? (
            <Button size="sm" onClick={() => setPayOpen(true)}>
              <CreditCard className="mr-1 h-4 w-4" aria-hidden />
              {t("card.pay")}
            </Button>
          ) : null}
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="pay-from">{t("payment.from")}</Label>
              <Input
                id="pay-from"
                type="datetime-local"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="pay-to">{t("payment.to")}</Label>
              <Input
                id="pay-to"
                type="datetime-local"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>
          </div>

          {payments?.length ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("transfer.timestamp")}</TableHead>
                  <TableHead>{t("payment.destination")}</TableHead>
                  <TableHead className="text-right">{t("transfer.amount")}</TableHead>
                  <TableHead>{t("card.active")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{formatDate(p.timestamp)}</TableCell>
                    <TableCell className="font-mono text-xs">{p.destinationIban}</TableCell>
                    <TableCell className="text-right">{formatAmount(p.amount, p.currency)}</TableCell>
                    <TableCell>
                      {p.isAccepted === false
                        ? t("payment.declined")
                        : t("payment.accepted")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-sm text-muted-foreground">{t("payment.noPayments")}</p>
          )}
        </CardContent>
      </Card>

      {card ? (
        <CardCeilingsDialog open={ceilingsOpen} onOpenChange={setCeilingsOpen} card={card} />
      ) : null}
      {card && account ? (
        <PaymentFormDialog
          open={payOpen}
          onOpenChange={setPayOpen}
          cardNumber={card.number}
          customerId={account.customerId}
          currency={account.currency}
        />
      ) : null}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      <div className="text-muted-foreground">{label}</div>
      <div className="col-span-2 font-medium">{value}</div>
    </div>
  );
}

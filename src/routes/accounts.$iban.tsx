import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, ChevronRight, ArrowLeft } from "lucide-react";
import { accountService, cardService } from "@/rest/services";
import { formatAmount, formatDate, maskCardNumber } from "@/lib/format";
import { hasAuthority, useMe } from "@/lib/auth";
import { CardFormDialog } from "@/components/bank/CardFormDialog";

export const Route = createFileRoute("/accounts/$iban")({
  head: ({ params }) => ({
    meta: [
      { title: `Account ${params.iban} — REST hero` },
      { name: "description", content: `Account details, cards and movements for ${params.iban}.` },
      { property: "og:title", content: `Account ${params.iban} — REST hero` },
      { property: "og:description", content: `Account details in REST hero online banking.` },
    ],
  }),
  component: AccountDetails,
});

interface Filters {
  minAmount?: number;
  maxAmount?: number;
  currencyIso3?: string;
  timestampAfter?: string;
  timestampBefore?: string;
  labelContaining?: string;
  page: number;
  size: number;
}

function AccountDetails() {
  const { iban } = Route.useParams();
  const { t } = useTranslation();
  const { data: me } = useMe();
  const canCreateCard = hasAuthority(me, "card.create_any");
  const [cardDialogOpen, setCardDialogOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({ page: 0, size: 10 });

  const { data: account } = useQuery({
    queryKey: ["account", iban],
    queryFn: () => accountService.getAccount(iban),
  });
  const { data: cards } = useQuery({
    queryKey: ["cards", iban],
    queryFn: () => cardService.listCards(iban),
  });
  const { data: transfers } = useQuery({
    queryKey: ["transfers", iban, filters],
    queryFn: () =>
      accountService.listTransfers({
        sourceIban: iban,
        ...filters,
      }),
  });
  const { data: transfersIn } = useQuery({
    queryKey: ["transfers-in", iban, filters],
    queryFn: () =>
      accountService.listTransfers({
        destinationIban: iban,
        ...filters,
      }),
  });

  const allMovements = [
    ...(transfers?.content ?? []),
    ...(transfersIn?.content ?? []),
  ].sort((a, b) => b.timestamp.localeCompare(a.timestamp));

  return (
    <div className="grid gap-6">
      <div>
        <Button asChild variant="ghost" size="sm">
          <Link to="/">
            <ArrowLeft className="mr-1 h-4 w-4" aria-hidden />
            {t("account.back")}
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("account.info")}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 text-sm">
          <Row label={t("account.iban")} value={iban} />
          {account ? (
            <>
              <Row label={t("account.currency")} value={account.currency} />
              <Row
                label={t("account.balance")}
                value={formatAmount(account.balance, account.currency)}
              />
            </>
          ) : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("account.cards")}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="divide-y">
            {cards?.length ? (
              cards.map((c) => (
                <li key={c.number}>
                  <Link
                    to="/cards/$cardNumber"
                    params={{ cardNumber: c.number }}
                    className="flex items-center justify-between py-3 no-underline hover:bg-accent/10"
                  >
                    <div>
                      <div className="font-medium">{maskCardNumber(c.number)}</div>
                      <div className="text-xs text-muted-foreground">
                        {c.isActive ? t("card.active") : "—"}
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" aria-hidden />
                  </Link>
                </li>
              ))
            ) : (
              <li className="py-4 text-sm text-muted-foreground">—</li>
            )}
          </ul>
          {canCreateCard ? (
            <div className="pt-3">
              <Button variant="outline" size="sm" onClick={() => setCardDialogOpen(true)}>
                <Plus className="mr-1 h-4 w-4" aria-hidden />
                {t("card.addCard")}
              </Button>
            </div>
          ) : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("account.movements")}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form
            className="grid grid-cols-2 gap-3 md:grid-cols-4"
            onSubmit={(e) => {
              e.preventDefault();
              setFilters((f) => ({ ...f, page: 0 }));
            }}
          >
            <Field label={t("transfer.minAmount")}>
              <Input
                type="number"
                min={0}
                value={filters.minAmount ?? ""}
                onChange={(e) =>
                  setFilters((f) => ({
                    ...f,
                    minAmount: e.target.value ? Number(e.target.value) : undefined,
                  }))
                }
              />
            </Field>
            <Field label={t("transfer.maxAmount")}>
              <Input
                type="number"
                min={0}
                value={filters.maxAmount ?? ""}
                onChange={(e) =>
                  setFilters((f) => ({
                    ...f,
                    maxAmount: e.target.value ? Number(e.target.value) : undefined,
                  }))
                }
              />
            </Field>
            <Field label={t("transfer.currency")}>
              <Input
                maxLength={3}
                value={filters.currencyIso3 ?? ""}
                onChange={(e) =>
                  setFilters((f) => ({
                    ...f,
                    currencyIso3: e.target.value ? e.target.value.toUpperCase() : undefined,
                  }))
                }
              />
            </Field>
            <Field label={t("transfer.label")}>
              <Input
                minLength={3}
                value={filters.labelContaining ?? ""}
                onChange={(e) =>
                  setFilters((f) => ({
                    ...f,
                    labelContaining: e.target.value.length >= 3 ? e.target.value : undefined,
                  }))
                }
              />
            </Field>
            <Field label={t("transfer.after")}>
              <Input
                type="datetime-local"
                value={filters.timestampAfter ?? ""}
                onChange={(e) =>
                  setFilters((f) => ({
                    ...f,
                    timestampAfter: e.target.value || undefined,
                  }))
                }
              />
            </Field>
            <Field label={t("transfer.before")}>
              <Input
                type="datetime-local"
                value={filters.timestampBefore ?? ""}
                onChange={(e) =>
                  setFilters((f) => ({
                    ...f,
                    timestampBefore: e.target.value || undefined,
                  }))
                }
              />
            </Field>
            <div className="col-span-2 flex items-end gap-2 md:col-span-4">
              <Button type="submit">{t("transfer.filter")}</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setFilters({ page: 0, size: 10 })}
              >
                {t("transfer.reset")}
              </Button>
            </div>
          </form>

          {allMovements.length ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("transfer.timestamp")}</TableHead>
                  <TableHead>{t("transfer.source")}</TableHead>
                  <TableHead>{t("transfer.destination")}</TableHead>
                  <TableHead>{t("transfer.label")}</TableHead>
                  <TableHead className="text-right">{t("transfer.amount")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allMovements.map((m, i) => (
                  <TableRow key={`${m.timestamp}-${i}`}>
                    <TableCell>{formatDate(m.timestamp)}</TableCell>
                    <TableCell className="font-mono text-xs">{m.sourceIban}</TableCell>
                    <TableCell className="font-mono text-xs">{m.destinationIban}</TableCell>
                    <TableCell>{m.label}</TableCell>
                    <TableCell
                      className={`text-right ${
                        m.destinationIban === iban ? "text-green-700" : "text-foreground"
                      }`}
                    >
                      {m.destinationIban === iban ? "+" : "-"}
                      {formatAmount(m.amount, m.currency)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-sm text-muted-foreground">{t("transfer.noResults")}</p>
          )}
        </CardContent>
      </Card>

      <CardFormDialog open={cardDialogOpen} onOpenChange={setCardDialogOpen} iban={iban} />
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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  const id = label.replace(/\s+/g, "-").toLowerCase();
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div id={id}>{children}</div>
    </div>
  );
}

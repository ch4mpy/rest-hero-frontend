import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, LogIn, ChevronRight } from "lucide-react";
import { hasAuthority, isAuthenticated, useMe } from "@/lib/auth";
import { accountService, customerService, gatewayService } from "@/rest/services";
import type { CustomerResponse } from "@/rest/types";
import { CustomerSelector } from "@/components/bank/CustomerSelector";
import { CustomerFormDialog } from "@/components/bank/CustomerFormDialog";
import { AccountFormDialog } from "@/components/bank/AccountFormDialog";
import { BeneficiariesList } from "@/components/bank/BeneficiariesList";
import { formatAmount } from "@/lib/format";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "REST hero — Home" },
      { name: "description", content: "Home page listing your accounts and beneficiaries in REST hero online banking." },
      { property: "og:title", content: "REST hero — Home" },
      { property: "og:description", content: "Your accounts and beneficiaries." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { t } = useTranslation();
  const { data: me, isLoading } = useMe();
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerResponse | null>(null);
  const [customerDialogOpen, setCustomerDialogOpen] = useState(false);
  const [accountDialogOpen, setAccountDialogOpen] = useState(false);

  const canReadAny = hasAuthority(me, "account.read_any");
  const canCreateCustomer = hasAuthority(me, "customer.edit");
  const canCreateAccount = hasAuthority(me, "account.create");

  // For customers, the customer is themselves.
  const customerId = useMemo(() => {
    if (canReadAny) return selectedCustomer?.id;
    return me?.sub;
  }, [canReadAny, selectedCustomer, me]);

  const isMyself = !canReadAny;
  const canEditBeneficiaries = isMyself || hasAuthority(me, "customer.edit");

  const { data: customerData } = useQuery({
    queryKey: ["customer", customerId],
    queryFn: () => customerService.getCustomer(customerId as string),
    enabled: !!customerId && canReadAny,
  });

  const displayedCustomer: CustomerResponse | undefined = canReadAny
    ? (customerData ?? selectedCustomer ?? undefined)
    : me?.sub
      ? {
          id: me.sub,
          firstName: me.firstName ?? "",
          lastName: me.lastName ?? "",
          email: me.email ?? "",
        }
      : undefined;

  if (isLoading) {
    return <p className="text-muted-foreground">{t("actions.loading")}</p>;
  }

  if (!isAuthenticated(me)) {
    return (
      <div className="mx-auto max-w-md text-center">
        <h1 className="mb-4 font-serif text-4xl text-foreground">{t("home.welcome")}</h1>
        <p className="mb-6 text-muted-foreground">{t("home.welcomeAnon")}</p>
        <Button size="lg" onClick={() => void gatewayService.startLogin()}>
          <LogIn className="mr-2 h-4 w-4" aria-hidden />
          {t("home.signInCta")}
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {canReadAny ? (
        <div className="flex flex-wrap items-center gap-2">
          <CustomerSelector value={selectedCustomer} onChange={setSelectedCustomer} />
          {canCreateCustomer ? (
            <Button variant="outline" size="sm" onClick={() => setCustomerDialogOpen(true)}>
              <Plus className="mr-1 h-4 w-4" aria-hidden />
              {t("home.addCustomer")}
            </Button>
          ) : null}
        </div>
      ) : null}

      {displayedCustomer ? (
        <div className="grid gap-6 md:grid-cols-2">
          <DetailsCard customer={displayedCustomer} />
          <AccountsCard
            customerId={displayedCustomer.id}
            canCreate={canCreateAccount}
            onAdd={() => setAccountDialogOpen(true)}
          />
          <div className="md:col-span-2">
            <BeneficiariesList
              customerId={displayedCustomer.id}
              canEdit={canEditBeneficiaries}
            />
          </div>
        </div>
      ) : (
        <p className="text-muted-foreground">{t("home.noCustomerSelected")}</p>
      )}

      <CustomerFormDialog
        open={customerDialogOpen}
        onOpenChange={setCustomerDialogOpen}
        onCreated={(c) => setSelectedCustomer(c)}
      />
      {displayedCustomer ? (
        <AccountFormDialog
          open={accountDialogOpen}
          onOpenChange={setAccountDialogOpen}
          customerId={displayedCustomer.id}
        />
      ) : null}
    </div>
  );
}

function DetailsCard({ customer }: { customer: CustomerResponse }) {
  const { t } = useTranslation();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("home.details")}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        <Row label={t("user.firstName")} value={customer.firstName} />
        <Row label={t("user.lastName")} value={customer.lastName} />
        <Row label={t("user.email")} value={customer.email} />
      </CardContent>
    </Card>
  );
}

function AccountsCard({
  customerId,
  canCreate,
  onAdd,
}: {
  customerId: string;
  canCreate: boolean;
  onAdd: () => void;
}) {
  const { t } = useTranslation();
  const { data } = useQuery({
    queryKey: ["accounts", customerId],
    queryFn: () => accountService.listAccounts(customerId),
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("home.accounts")}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="divide-y">
          {data?.length ? (
            data.map((a) => (
              <li key={a.iban}>
                <Link
                  to="/accounts/$iban"
                  params={{ iban: a.iban }}
                  className="flex items-center justify-between py-3 no-underline hover:bg-accent/10"
                >
                  <div>
                    <div className="font-medium">{a.iban}</div>
                    <div className="text-xs text-muted-foreground">
                      {formatAmount(a.balance, a.currency)}
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" aria-hidden />
                </Link>
              </li>
            ))
          ) : (
            <li className="py-4 text-sm text-muted-foreground">{t("home.noAccounts")}</li>
          )}
        </ul>
        {canCreate ? (
          <div className="pt-3">
            <Button variant="outline" size="sm" onClick={onAdd}>
              <Plus className="mr-1 h-4 w-4" aria-hidden />
              {t("home.addAccount")}
            </Button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-3 gap-2 text-sm">
      <div className="text-muted-foreground">{label}</div>
      <div className="col-span-2 font-medium">{value}</div>
    </div>
  );
}

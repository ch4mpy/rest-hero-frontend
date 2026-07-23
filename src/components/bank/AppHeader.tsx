import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { useMe, hasAuthority, isAuthenticated, startLogin, logout } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { setLocale, type Locale } from "@/i18n";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, LogOut, LogIn, User } from "lucide-react";

export function AppHeader() {
  const { t, i18n } = useTranslation();
  const { data: me } = useMe();

  return (
    <header className="border-b bg-card">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link to="/" className="flex items-baseline gap-2 no-underline">
          <span className="font-serif text-2xl text-primary">{t("app.title")}</span>
          <span className="hidden text-xs text-muted-foreground sm:inline">{t("app.tagline")}</span>
        </Link>
        <nav aria-label={t("nav.home")} className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" aria-label={t("nav.language")}>
                <Globe className="mr-1 h-4 w-4" aria-hidden />
                {i18n.language.toUpperCase()}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLocale("fr" as Locale)}>
                Français
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLocale("en" as Locale)}>English</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {isAuthenticated(me) ? (
            <>
              <span className="hidden items-center gap-1 text-sm text-muted-foreground sm:flex">
                <User className="h-4 w-4" aria-hidden />
                {me?.firstName ?? me?.username}
                {hasAuthority(me, "account.read_any") ? (
                  <span className="ml-1 rounded bg-accent/20 px-2 py-0.5 text-xs text-accent-foreground">
                    advisor
                  </span>
                ) : null}
              </span>
              <Button variant="outline" size="sm" onClick={() => void logout()}>
                <LogOut className="mr-1 h-4 w-4" aria-hidden />
                {t("nav.signOut")}
              </Button>
            </>
          ) : (
            <Button size="sm" onClick={() => void startLogin()}>
              <LogIn className="mr-1 h-4 w-4" aria-hidden />
              {t("nav.signIn")}
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}

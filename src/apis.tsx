import {
    AccountsApi,
    Configuration as AccountConfiguration,
    FetchParams,
    Middleware,
    MoneyTransfersApi,
    RequestContext,
} from "@/rest/account";
import {CardsApi, Configuration as CardConfiguration} from "@/rest/card";
import {Configuration as CurrencyConfiguration, CurrenciesApi} from "@/rest/currency";
import {Configuration as CustomerConfiguration, CustomersApi} from "@/rest/customer";
import {Configuration as GatewayConfiguration, GatewayApi} from "@/rest/gateway";

export const GATEWAY_BASE_URL =
    (import.meta.env.VITE_GATEWAY_BASE_URL as string | undefined) ??
    "https://host.docker.internal/gateway";

const BFF_BASE_URL =
    (import.meta.env.VITE_BFF_BASE_URL as string | undefined) ??
    "https://host.docker.internal/gateway/bff";

function readCookie(name: string): string | undefined {
    if (typeof document === "undefined") return undefined;
    const match = document.cookie.match(
        new RegExp("(?:^|; )" + name.replace(/[.$?*|{}()[\]\\/+^]/g, "\\$&") + "=([^;]*)"),
    );
    return match ? decodeURIComponent(match[1]) : undefined;
}

const csrfMiddleware: Middleware = {
    pre: async (ctx: RequestContext): Promise<FetchParams | void> => {
        const method = (ctx.init.method ?? "GET").toUpperCase();
        if (method === "GET" || method === "HEAD") return;
        const xsrf = readCookie("XSRF-TOKEN");
        if (!xsrf) return;
        const headers = new Headers(ctx.init.headers as HeadersInit | undefined);
        headers.set("X-XSRF-TOKEN", xsrf);
        return {url: ctx.url, init: {...ctx.init, headers}};
    },
};

const accountServiceConfig = new AccountConfiguration({
    basePath: BFF_BASE_URL,
    credentials: "include",
    middleware: [csrfMiddleware],
});

const cardServiceConfig = new CardConfiguration({
    basePath: BFF_BASE_URL,
    credentials: "include",
    middleware: [csrfMiddleware],
});

const currencyServiceConfig = new CurrencyConfiguration({
    basePath: BFF_BASE_URL,
    credentials: "include",
    middleware: [csrfMiddleware],
});

const customerServiceConfig = new CustomerConfiguration({
    basePath: BFF_BASE_URL,
    credentials: "include",
    middleware: [csrfMiddleware],
});

const gatewayServiceConfig = new GatewayConfiguration({
    basePath: GATEWAY_BASE_URL,
    credentials: "include",
    middleware: [csrfMiddleware],
});

export const accountApi = new AccountsApi(accountServiceConfig);
export const transfersApi = new MoneyTransfersApi(accountServiceConfig);

export const cardApi = new CardsApi(cardServiceConfig);

export const currencyApi = new CurrenciesApi(currencyServiceConfig);

export const customerApi = new CustomersApi(customerServiceConfig);

export const gatewayApi = new GatewayApi(gatewayServiceConfig);

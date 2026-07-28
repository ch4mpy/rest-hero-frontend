import { useQuery, queryOptions } from "@tanstack/react-query";
import { gatewayApi } from "../apis";
import type { UserResponse } from "@/rest/gateway";
import { ResponseError } from "@/rest/gateway/runtime";

export const meQueryOptions = queryOptions({
  queryKey: ["me"],
  queryFn: () => gatewayApi.getMe(),
  retry: false,
  staleTime: 30_000,
});

export function useMe() {
  return useQuery(meQueryOptions);
}

export function isAuthenticated(user?: UserResponse): boolean {
  return !!user?.sub;
}

export function isAdvisor(user?: UserResponse): boolean {
  return !!user?.roles && user.roles.length > 0;
}

export function hasAuthority(user: UserResponse | undefined, authority: string): boolean {
  if (!user?.roles) return false;
  return user.roles.includes(authority);
}

function homeUrl(): string {
  const base = (import.meta.env.BASE_URL ?? "/") as string;
  return new URL(base, window.location.origin).toString();
}

function navigateToLocation(response: Response | undefined, fallback: string): void {
  const location = response?.headers.get("Location");
  window.location.assign(location ?? fallback);
}

/**
 * Ask the gateway to start an OAuth2 flow. The gateway returns the
 * authorization server URI in the response's `Location` header; the
 * browser must perform a top-level navigation to that URL.
 */
export async function startLogin(): Promise<void> {
  try {
    const response = await gatewayApi.startLoginWithGatewayRaw();
    navigateToLocation(response.raw, window.location.href);
  } catch (e) {
    if (e instanceof ResponseError) {
      navigateToLocation(e.response, window.location.href);
      return;
    }
    throw e;
  }
}

/**
 * Log out via the gateway, then always land the user on the app home page.
 */
export async function logout(): Promise<void> {
  try {
    await gatewayApi.logoutRaw();
  } catch (e) {
    if (!(e instanceof ResponseError)) throw e;
  }
  window.location.assign(homeUrl());
}

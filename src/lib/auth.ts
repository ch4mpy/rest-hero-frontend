import { useQuery } from "@tanstack/react-query";
import { gatewayApi } from "../apis";
import type { UserResponse } from "@/rest/gateway";

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => gatewayApi.getMe(),
    retry: false,
    staleTime: 30_000,
  });
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

/**
 * Ask the gateway to start an OAuth2 flow. The gateway responds with a
 * `Location` header pointing at the identity provider; the browser must
 * perform a top-level navigation to that URL.
 */
export async function startLogin(): Promise<void> {
  const response = await gatewayApi.startLoginWithGatewayRaw({ redirect: "manual" });
  const location = response.raw.headers.get("Location");
  window.location.href = location ?? response.raw.url;
}

/**
 * Log out via the gateway. The response's `Location` header describes
 * where to navigate next.
 */
export async function logout(): Promise<void> {
  const response = await gatewayApi.logoutRaw({ redirect: "manual" });
  const location = response.raw.headers.get("Location");
  window.location.href = location ?? window.location.origin;
}

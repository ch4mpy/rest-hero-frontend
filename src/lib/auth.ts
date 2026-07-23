import { useQuery } from "@tanstack/react-query";
import { gatewayApi, GATEWAY_BASE_URL } from "../apis";
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

function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/[.$?*|{}()[\]\\/+^]/g, "\\$&") + "=([^;]*)"),
  );
  return match ? decodeURIComponent(match[1]) : undefined;
}

/**
 * Ask the gateway to start an OAuth2 flow. The gateway responds with a
 * `Location` header pointing at the identity provider; the browser must
 * perform a top-level navigation to that URL (fetch cannot follow it as
 * a normal redirect because the target lives on another origin and the
 * flow needs the user's session cookies).
 */
export async function startLogin(): Promise<void> {
  const response = await fetch(`${GATEWAY_BASE_URL}/oauth2/authorization/gateway`, {
    method: "GET",
    credentials: "include",
    redirect: "manual",
  });
  const location = response.headers.get("Location");
  if (location) {
    window.location.href = location;
    return;
  }
  // Fallback: some browsers hide the Location header on manual redirects.
  // Navigating directly lets the browser follow the redirect chain natively.
  window.location.href = `${GATEWAY_BASE_URL}/oauth2/authorization/gateway`;
}

/**
 * Log out via the gateway. Logout is a POST that also replies with a
 * `Location` header describing where to go next (typically the post-logout
 * landing page). Navigate to it once the call succeeds.
 */
export async function logout(): Promise<void> {
  const xsrf = readCookie("XSRF-TOKEN");
  const headers: Record<string, string> = {};
  if (xsrf) headers["X-XSRF-TOKEN"] = xsrf;
  const response = await fetch(`${GATEWAY_BASE_URL}/logout`, {
    method: "POST",
    credentials: "include",
    redirect: "manual",
    headers,
  });
  const location = response.headers.get("Location");
  window.location.href = location ?? window.location.origin;
}

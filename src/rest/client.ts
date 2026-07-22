// Fetch wrapper for the BFF gateway.
// - includes credentials so the session cookie is sent
// - reads the XSRF-TOKEN cookie and echoes it as X-XSRF-TOKEN on unsafe methods
// - throws a typed ApiError with ProblemDetail on non-2xx

import type { ProblemDetail } from "./types";

export const GATEWAY_BASE_URL: string =
  (import.meta.env.VITE_GATEWAY_BASE_URL as string | undefined) ?? "/gateway";

export class ApiError extends Error {
  status: number;
  problem?: ProblemDetail;
  constructor(status: number, problem?: ProblemDetail, message?: string) {
    super(message ?? problem?.title ?? problem?.detail ?? `HTTP ${status}`);
    this.status = status;
    this.problem = problem;
  }
}

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)"),
  );
  return match ? decodeURIComponent(match[1]) : null;
}

function buildQuery(params?: Record<string, unknown>): string {
  if (!params) return "";
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null || v === "") continue;
    if (Array.isArray(v)) {
      for (const item of v) if (item !== undefined && item !== null && item !== "") sp.append(k, String(item));
    } else {
      sp.append(k, String(v));
    }
  }
  const s = sp.toString();
  return s ? `?${s}` : "";
}

export interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  query?: Record<string, unknown>;
  body?: unknown;
  headers?: Record<string, string>;
  // when true, don't parse the body (returns Response)
  raw?: boolean;
}

export async function apiFetch<T = unknown>(
  path: string,
  opts: RequestOptions = {},
): Promise<T> {
  const method = opts.method ?? "GET";
  const headers: Record<string, string> = { Accept: "application/json", ...(opts.headers ?? {}) };

  if (method !== "GET") {
    const xsrf = readCookie("XSRF-TOKEN");
    if (xsrf) headers["X-XSRF-TOKEN"] = xsrf;
  }

  let body: BodyInit | undefined;
  if (opts.body !== undefined) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(opts.body);
  }

  const url = `${GATEWAY_BASE_URL}${path}${buildQuery(opts.query)}`;
  const res = await fetch(url, {
    method,
    headers,
    body,
    credentials: "include",
    redirect: "manual",
  });

  if (opts.raw) return res as unknown as T;

  if (!res.ok) {
    let problem: ProblemDetail | undefined;
    try {
      problem = (await res.json()) as ProblemDetail;
    } catch {
      // ignore
    }
    throw new ApiError(res.status, problem);
  }

  if (res.status === 204 || res.status === 202) return undefined as T;
  const text = await res.text();
  if (!text) return undefined as T;
  try {
    return JSON.parse(text) as T;
  } catch {
    return text as unknown as T;
  }
}

/**
 * Follows a redirect returned by the gateway (login/logout).
 * The gateway responds with a Location header we must navigate to.
 */
export async function followLocation(path: string, method: "GET" | "POST"): Promise<void> {
  const headers: Record<string, string> = { Accept: "application/json" };
  if (method !== "GET") {
    const xsrf = readCookie("XSRF-TOKEN");
    if (xsrf) headers["X-XSRF-TOKEN"] = xsrf;
  }
  const res = await fetch(`${GATEWAY_BASE_URL}${path}`, {
    method,
    headers,
    credentials: "include",
    redirect: "manual",
  });
  const location = res.headers.get("Location") ?? res.headers.get("location");
  if (location) {
    window.location.href = location;
    return;
  }
  // Some browsers hide the Location header on opaque redirects.
  // Fall back to a full page reload so the session state refreshes.
  window.location.reload();
}

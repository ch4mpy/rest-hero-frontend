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

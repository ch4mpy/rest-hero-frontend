import { useQuery } from "@tanstack/react-query";
import { userService } from "@/rest/services";
import type { UserResponse } from "@/rest/types";

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => userService.getMe(),
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

import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";
import { isAuthenticated, meQueryOptions } from "@/lib/auth";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    try {
      const me = await context.queryClient.ensureQueryData(meQueryOptions);
      if (!isAuthenticated(me)) {
        throw redirect({ to: "/" });
      }
    } catch (e) {
      if (e && typeof e === "object" && "isRedirect" in e) throw e;
      throw redirect({ to: "/" });
    }
  },
  component: () => <Outlet />,
});

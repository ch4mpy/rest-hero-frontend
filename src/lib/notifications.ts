import { useEffect } from "react";
import { useQueryClient, type QueryClient } from "@tanstack/react-query";
import { DomainEventFromJSON, type DomainEvent } from "@/rest/gateway";
import { GATEWAY_BASE_URL, gatewayApi } from "../apis";
import { isAuthenticated, useMe } from "./auth";

function invalidateForEvent(queryClient: QueryClient, event: DomainEvent): void {
  if (!event.resourceId) return;
  switch (event.resourceType) {
    case "account":
      queryClient.invalidateQueries({ queryKey: ["account", event.resourceId] });
      queryClient.invalidateQueries({ queryKey: ["transfers", event.resourceId] });
      queryClient.invalidateQueries({ queryKey: ["transfers-in", event.resourceId] });
      break;
  }
}

/**
 * Subscribes to the gateway's Server-Sent Events stream while the user is authenticated.
 * Payloads carry identifiers only (resource type and id): on each event, the affected React
 * Query cache entries are invalidated so the UI refetches over REST rather than trusting the
 * event as a data source. The gateway has already filtered the stream to events this user is
 * either the owner of or has an audience role for, see chapter 6 of the README.
 */
export function useDomainEventsSubscription(): void {
  const queryClient = useQueryClient();
  const { data: user } = useMe();
  const authenticated = isAuthenticated(user);

  useEffect(() => {
    if (!authenticated) return;

    let eventSource: EventSource | undefined;
    let cancelled = false;

    // EventSource can't be driven by the generated fetch client (it streams, `fetch` doesn't),
    // but reusing its request path keeps the URL in sync with the OpenAPI spec instead of
    // hardcoding "/bff/events" a second time here.
    void gatewayApi.subscribeToServerStateChangedEventsRequestOpts().then((requestOpts) => {
      if (cancelled) return;
      eventSource = new EventSource(`${GATEWAY_BASE_URL}${requestOpts.path}`, {
        withCredentials: true,
      });
      eventSource.onmessage = (message) => {
        const event = DomainEventFromJSON(JSON.parse(message.data));
        invalidateForEvent(queryClient, event);
      };
    });

    return () => {
      cancelled = true;
      eventSource?.close();
    };
  }, [authenticated, queryClient]);
}

import { DomainEventResourceTypeEnum as ResourceType } from "@/rest/gateway";

export type { ResourceType };

export const accountQueryKeys = {
  accounts: (customerId: string | undefined) => ["accounts", customerId] as const,
  account: (iban: string | undefined) => ["account", iban] as const,
  transfersOut: (iban: string | undefined) => ["transfers", iban] as const,
  transfersIn: (iban: string | undefined) => ["transfers-in", iban] as const,
};

export const cardQueryKeys = {
  cards: (iban: string | undefined) => ["cards", iban] as const,
  card: (cardNumber: string | undefined) => ["card", cardNumber] as const,
  // partial key: matches every ["payments", cardNumber, from, to] variant regardless of period
  payments: (cardNumber: string | undefined) => ["payments", cardNumber] as const,
};

export const beneficiaryQueryKeys = {
  beneficiaries: (customerId: string | undefined) => ["beneficiaries", customerId] as const,
};

/**
 * Maps each account-service `resourceType` to the query keys a matching event should invalidate.
 * One resourceType can affect several queries, so this isn't a 1-to-1 rename of the SSE payload's
 * resourceType. Areas are split so an event only invalidates what it actually changed: creating an
 * account doesn't touch its transfer lists, and adding a card doesn't touch its balance.
 */
export const resourceTypeInvalidations: Partial<
  Record<
    ResourceType,
    (resourceId: string, resourceOwner: string | undefined) => readonly (readonly unknown[])[]
  >
> = {
  [ResourceType.Account]: (iban, customerId) => [
    accountQueryKeys.account(iban),
    accountQueryKeys.accounts(customerId),
  ],
  [ResourceType.AccountTransfers]: (iban) => [
    accountQueryKeys.account(iban),
    accountQueryKeys.transfersOut(iban),
    accountQueryKeys.transfersIn(iban),
  ],
  [ResourceType.AccountCards]: (iban) => [cardQueryKeys.cards(iban)],
  [ResourceType.Card]: (cardNumber) => [cardQueryKeys.card(cardNumber)],
  [ResourceType.CardPayments]: (cardNumber) => [cardQueryKeys.payments(cardNumber)],
  [ResourceType.CustomerBeneficiaries]: (_beneficiaryId, customerId) => [
    beneficiaryQueryKeys.beneficiaries(customerId),
  ],
};

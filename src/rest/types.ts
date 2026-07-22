// Hand-crafted typed REST client mirroring the OpenAPI specs. The user can
// regenerate the official typescript-fetch clients locally via `npm run api`
// (requires Java 21+) into src/rest/bff and src/rest/api. This file is used
// by the app in the meantime and stays compatible with the same base URL.

export type Authority =
  | "account.read_any"
  | "account.create"
  | "customer.edit"
  | "customer.read_any"
  | "user.create"
  | "card.create_any"
  | "card.read_any"
  | "card.ceilings_edit"
  | "card.status_edit";

export interface UserResponse {
  sub?: string;
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  roles?: string[];
}

export interface CustomerResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}
export interface CustomerCreationRequest {
  firstName: string;
  lastName: string;
  email: string;
}
export interface BeneficiaryResponse {
  id: number;
  label: string;
  iban: string;
}
export interface BeneficiaryRequest {
  iban: string;
  label: string;
}

export interface AccountResponse {
  iban: string;
  customerId: string;
  currency: string;
  balance: number;
}
export interface AccountCreationRequest {
  iban: string;
  customerId: string;
  currency: string;
}

export interface MoneyTransferResponse {
  sourceIban: string;
  destinationIban: string;
  amount: number;
  currency: string;
  timestamp: string;
  label: string;
}

export interface PageMetadata {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}
export interface Page<T> {
  content: T[];
  page: PageMetadata;
}

export interface CardResponse {
  number: string;
  iban: string;
  transactionCeiling: number;
  rolling30Ceiling: number;
  isActive: boolean;
}
export interface CardRequest {
  iban: string;
  transactionCeiling: number;
  rolling30Ceiling: number;
}
export interface CardStatusRequest {
  isActive: boolean;
}
export interface CardCeilingsRequest {
  transactionCeiling: number;
  rolling30Ceiling: number;
}
export interface CardPaymentResponse {
  id: number;
  timestamp: string;
  currency: string;
  amount: number;
  cardNumber: string;
  destinationIban: string;
  isAccepted?: boolean;
}
export interface CardPaymentCreationRequest {
  currency?: string;
  amount: number;
  cardNumber?: string;
  destinationIban: string;
}

export interface ProblemDetail {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
}

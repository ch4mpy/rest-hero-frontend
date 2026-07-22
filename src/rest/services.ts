import { apiFetch, followLocation } from "./client";
import type {
  AccountCreationRequest,
  AccountResponse,
  BeneficiaryRequest,
  BeneficiaryResponse,
  CardCeilingsRequest,
  CardPaymentCreationRequest,
  CardPaymentResponse,
  CardRequest,
  CardResponse,
  CardStatusRequest,
  CustomerCreationRequest,
  CustomerResponse,
  MoneyTransferResponse,
  Page,
  UserResponse,
} from "./types";

// ---------- User ----------
export const userService = {
  getMe: () => apiFetch<UserResponse>("/users/me"),
  createUser: (body: {
    email: string;
    username: string;
    firstName: string;
    lastName: string;
  }) => apiFetch<void>("/users", { method: "POST", body }),
};

// ---------- Customer ----------
export interface ListCustomersParams {
  search?: string;
  page?: number;
  size?: number;
  sort?: string[];
}
export const customerService = {
  listCustomers: (params?: ListCustomersParams) =>
    apiFetch<Page<CustomerResponse>>("/customers", { query: params as Record<string, unknown> }),
  getCustomer: (customerId: string) =>
    apiFetch<CustomerResponse>(`/customers/${encodeURIComponent(customerId)}`),
  createCustomer: (body: CustomerCreationRequest) =>
    apiFetch<void>("/customers", { method: "POST", body }),
  listBeneficiaries: (customerId: string) =>
    apiFetch<BeneficiaryResponse[]>(
      `/customers/${encodeURIComponent(customerId)}/beneficiaries`,
    ),
  addBeneficiary: (customerId: string, body: BeneficiaryRequest) =>
    apiFetch<void>(`/customers/${encodeURIComponent(customerId)}/beneficiaries`, {
      method: "POST",
      body,
    }),
  updateBeneficiary: (customerId: string, beneficiaryId: number, body: BeneficiaryRequest) =>
    apiFetch<void>(
      `/customers/${encodeURIComponent(customerId)}/beneficiaries/${beneficiaryId}`,
      { method: "PUT", body },
    ),
  deleteBeneficiary: (customerId: string, beneficiaryId: number) =>
    apiFetch<void>(
      `/customers/${encodeURIComponent(customerId)}/beneficiaries/${beneficiaryId}`,
      { method: "DELETE" },
    ),
};

// ---------- Account ----------
export interface ListTransfersParams {
  sourceIban?: string;
  destinationIban?: string;
  minAmount?: number;
  maxAmount?: number;
  currencyIso3?: string;
  timestampAfter?: string;
  timestampBefore?: string;
  labelContaining?: string;
  page?: number;
  size?: number;
  sort?: string[];
}
export const accountService = {
  listAccounts: (customerId: string) =>
    apiFetch<AccountResponse[]>("/accounts", { query: { customerId } }),
  getAccount: (iban: string) =>
    apiFetch<AccountResponse>(`/accounts/${encodeURIComponent(iban)}`),
  createAccount: (body: AccountCreationRequest) =>
    apiFetch<void>("/accounts", { method: "POST", body }),
  listTransfers: (params: ListTransfersParams) =>
    apiFetch<Page<MoneyTransferResponse>>("/transfers", {
      query: params as Record<string, unknown>,
    }),
};

// ---------- Card ----------
export interface ListPaymentsParams {
  from?: string;
  to?: string;
}
export const cardService = {
  listCards: (iban: string) =>
    apiFetch<CardResponse[]>("/cards", { query: { iban } }),
  getCard: (cardNumber: string) =>
    apiFetch<CardResponse>(`/cards/${encodeURIComponent(cardNumber)}`),
  createCard: (body: CardRequest) =>
    apiFetch<void>("/cards", { method: "POST", body }),
  setStatus: (cardNumber: string, body: CardStatusRequest) =>
    apiFetch<void>(`/cards/${encodeURIComponent(cardNumber)}/status`, {
      method: "PUT",
      body,
    }),
  setCeilings: (cardNumber: string, body: CardCeilingsRequest) =>
    apiFetch<void>(`/cards/${encodeURIComponent(cardNumber)}/ceilings`, {
      method: "PUT",
      body,
    }),
  listPayments: (cardNumber: string, params?: ListPaymentsParams) =>
    apiFetch<CardPaymentResponse[]>(
      `/cards/${encodeURIComponent(cardNumber)}/payments`,
      { query: params as Record<string, unknown> },
    ),
  createPayment: (cardNumber: string, body: CardPaymentCreationRequest) =>
    apiFetch<void>(`/cards/${encodeURIComponent(cardNumber)}/payments`, {
      method: "POST",
      body,
    }),
};

// ---------- Gateway (login/logout) ----------
export const gatewayService = {
  startLogin: () => followLocation("/oauth2/authorization/gateway", "GET"),
  logout: () => followLocation("/logout", "POST"),
};

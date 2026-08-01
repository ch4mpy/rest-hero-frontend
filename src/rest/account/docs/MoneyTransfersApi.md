# MoneyTransfersApi

All URIs are relative to *https://localhost:8081*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getMoneyTransfer**](MoneyTransfersApi.md#getmoneytransfer) | **GET** /transfers/{transferId} | Requires the &#x60;account.read_any&#x60; authority or that the authenticated user is the owner of the  source or destination account. |
| [**listMoneyTransfers**](MoneyTransfersApi.md#listmoneytransfers) | **GET** /transfers | Requires the &#x60;account.read_any&#x60; authority or that the authenticated user is the owner of the  source or destination account. |
| [**transferMoneyBetweenAccounts**](MoneyTransfersApi.md#transfermoneybetweenaccounts) | **POST** /transfers | Requires the &#x60;account.transfer&#x60; authority.   This labs implementation ignores other banks. If the source or destination account isn\&#39;t  managed by this service (another bank?), the withdraw / credit is ignored and a transfer is  saved anyway. |



## getMoneyTransfer

> MoneyTransferResponse getMoneyTransfer(transferId)

Requires the &#x60;account.read_any&#x60; authority or that the authenticated user is the owner of the  source or destination account.

Requires the &#x60;account.read_any&#x60; authority or that the authenticated user is the owner of the  source or destination account.

### Example

```ts
import {
  Configuration,
  MoneyTransfersApi,
} from '';
import type { GetMoneyTransferRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new MoneyTransfersApi();

  const body = {
    // number | The ID of the money transfer to retrieve
    transferId: 56,
  } satisfies GetMoneyTransferRequest;

  try {
    const data = await api.getMoneyTransfer(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **transferId** | `number` | The ID of the money transfer to retrieve | [Defaults to ``] |

### Return type

[**MoneyTransferResponse**](MoneyTransferResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`, `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **404** | Not Found |  -  |
| **422** | Unprocessable Content |  -  |
| **409** | Conflict |  -  |
| **500** | Internal Server Error |  -  |
| **200** | the money transfer with the given ID |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listMoneyTransfers

> PagedModelMoneyTransferResponse listMoneyTransfers(sourceIban, destinationIban, minAmount, maxAmount, currency, timestampAfter, timestampBefore, labelContaining, page, size, sort)

Requires the &#x60;account.read_any&#x60; authority or that the authenticated user is the owner of the  source or destination account.

Requires the &#x60;account.read_any&#x60; authority or that the authenticated user is the owner of the  source or destination account.

### Example

```ts
import {
  Configuration,
  MoneyTransfersApi,
} from '';
import type { ListMoneyTransfersRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new MoneyTransfersApi();

  const body = {
    // string | a valid IBAN for the source account (optional) (optional)
    sourceIban: sourceIban_example,
    // string | a valid IBAN for the destination account (optional) (optional)
    destinationIban: destinationIban_example,
    // number | the minimum amount of the transfer (optional) (optional)
    minAmount: 56,
    // number | the maximum amount of the transfer (optional) (optional)
    maxAmount: 56,
    // string | a valid ISO 4217 currency code (optional) (optional)
    currency: currency_example,
    // Date | the earliest timestamp of the transfer (optional) (optional)
    timestampAfter: 2013-10-20T19:20:30+01:00,
    // Date | the latest timestamp of the transfer (optional) (optional)
    timestampBefore: 2013-10-20T19:20:30+01:00,
    // string | a substring of at least 3 characters that should be contained in the         transfer label (optional) (optional)
    labelContaining: labelContaining_example,
    // number | Zero-based page index (0..N) (optional)
    page: 56,
    // number | The size of the page to be returned (optional)
    size: 56,
    // Array<string> | Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. (optional)
    sort: ...,
  } satisfies ListMoneyTransfersRequest;

  try {
    const data = await api.listMoneyTransfers(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **sourceIban** | `string` | a valid IBAN for the source account (optional) | [Optional] [Defaults to `undefined`] |
| **destinationIban** | `string` | a valid IBAN for the destination account (optional) | [Optional] [Defaults to `undefined`] |
| **minAmount** | `number` | the minimum amount of the transfer (optional) | [Optional] [Defaults to `undefined`] |
| **maxAmount** | `number` | the maximum amount of the transfer (optional) | [Optional] [Defaults to `undefined`] |
| **currency** | `string` | a valid ISO 4217 currency code (optional) | [Optional] [Defaults to `undefined`] |
| **timestampAfter** | `Date` | the earliest timestamp of the transfer (optional) | [Optional] [Defaults to `undefined`] |
| **timestampBefore** | `Date` | the latest timestamp of the transfer (optional) | [Optional] [Defaults to `undefined`] |
| **labelContaining** | `string` | a substring of at least 3 characters that should be contained in the         transfer label (optional) | [Optional] [Defaults to `undefined`] |
| **page** | `number` | Zero-based page index (0..N) | [Optional] [Defaults to `0`] |
| **size** | `number` | The size of the page to be returned | [Optional] [Defaults to `20`] |
| **sort** | `Array<string>` | Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. | [Optional] |

### Return type

[**PagedModelMoneyTransferResponse**](PagedModelMoneyTransferResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`, `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **404** | Not Found |  -  |
| **422** | Unprocessable Content |  -  |
| **409** | Conflict |  -  |
| **500** | Internal Server Error |  -  |
| **200** | a paginated list of money transfers matching the filter criteria |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## transferMoneyBetweenAccounts

> transferMoneyBetweenAccounts(moneyTransferRequest)

Requires the &#x60;account.transfer&#x60; authority.   This labs implementation ignores other banks. If the source or destination account isn\&#39;t  managed by this service (another bank?), the withdraw / credit is ignored and a transfer is  saved anyway.

Requires the &#x60;account.transfer&#x60; authority.   This labs implementation ignores other banks. If the source or destination account isn\&#39;t  managed by this service (another bank?), the withdraw / credit is ignored and a transfer is  saved anyway.

### Example

```ts
import {
  Configuration,
  MoneyTransfersApi,
} from '';
import type { TransferMoneyBetweenAccountsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new MoneyTransfersApi();

  const body = {
    // MoneyTransferRequest | the money transfer request
    moneyTransferRequest: ...,
  } satisfies TransferMoneyBetweenAccountsRequest;

  try {
    const data = await api.transferMoneyBetweenAccounts(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **moneyTransferRequest** | [MoneyTransferRequest](MoneyTransferRequest.md) | the money transfer request | |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **404** | Not Found |  -  |
| **422** | Unprocessable Content |  -  |
| **409** | Conflict |  -  |
| **500** | Internal Server Error |  -  |
| **200** | A response with a Location header pointing to the created transfer resource |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


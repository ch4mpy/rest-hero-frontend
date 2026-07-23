# AccountsApi

All URIs are relative to *https://localhost:8081*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createAccount**](AccountsApi.md#createaccount) | **POST** /accounts | Requires the &#x60;account.create&#x60; authority. |
| [**getAccount**](AccountsApi.md#getaccount) | **GET** /accounts/{iban} | Requires the &#x60;account.read_any&#x60; authority or that the given account\&#39;s customer ID matches the  authenticated user. |
| [**listAccounts**](AccountsApi.md#listaccounts) | **GET** /accounts | Requires the &#x60;account.read_any&#x60; authority or that the given customer ID matches the  authenticated user. |



## createAccount

> createAccount(accountCreationRequest)

Requires the &#x60;account.create&#x60; authority.

Requires the &#x60;account.create&#x60; authority.

### Example

```ts
import {
  Configuration,
  AccountsApi,
} from '';
import type { CreateAccountRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountsApi();

  const body = {
    // AccountCreationRequest
    accountCreationRequest: ...,
  } satisfies CreateAccountRequest;

  try {
    const data = await api.createAccount(body);
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
| **accountCreationRequest** | [AccountCreationRequest](AccountCreationRequest.md) |  | |

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
| **200** | a 201 Created response with the Location header set to the newly created account\&#39;s URL. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getAccount

> AccountResponse getAccount(iban)

Requires the &#x60;account.read_any&#x60; authority or that the given account\&#39;s customer ID matches the  authenticated user.

Requires the &#x60;account.read_any&#x60; authority or that the given account\&#39;s customer ID matches the  authenticated user.

### Example

```ts
import {
  Configuration,
  AccountsApi,
} from '';
import type { GetAccountRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountsApi();

  const body = {
    // string | The IBAN of the account to retrieve
    iban: iban_example,
  } satisfies GetAccountRequest;

  try {
    const data = await api.getAccount(body);
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
| **iban** | `string` | The IBAN of the account to retrieve | [Defaults to `&#39;&#39;`] |

### Return type

[**AccountResponse**](AccountResponse.md)

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
| **200** | the account with the given IBAN. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listAccounts

> Array&lt;AccountResponse&gt; listAccounts(customerId)

Requires the &#x60;account.read_any&#x60; authority or that the given customer ID matches the  authenticated user.

Requires the &#x60;account.read_any&#x60; authority or that the given customer ID matches the  authenticated user.

### Example

```ts
import {
  Configuration,
  AccountsApi,
} from '';
import type { ListAccountsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountsApi();

  const body = {
    // string
    customerId: customerId_example,
  } satisfies ListAccountsRequest;

  try {
    const data = await api.listAccounts(body);
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
| **customerId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**Array&lt;AccountResponse&gt;**](AccountResponse.md)

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
| **200** | all accounts with the given customer ID. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


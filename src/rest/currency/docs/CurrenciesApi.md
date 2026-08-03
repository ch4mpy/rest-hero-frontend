# CurrenciesApi

All URIs are relative to *https://localhost:8084*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**change**](CurrenciesApi.md#change) | **GET** /currencies/change |  |
| [**listSupportedCurrencies**](CurrenciesApi.md#listsupportedcurrencies) | **GET** /currencies |  |



## change

> number change(digits, fromIso3, toIso3)



### Example

```ts
import {
  Configuration,
  CurrenciesApi,
} from '';
import type { ChangeRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CurrenciesApi();

  const body = {
    // number | amount in the source currency\'s smallest unit (e.g., cents for USD)
    digits: 56,
    // string | source currency ISO 4217 code
    fromIso3: fromIso3_example,
    // string | target currency ISO 4217 code
    toIso3: toIso3_example,
  } satisfies ChangeRequest;

  try {
    const data = await api.change(body);
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
| **digits** | `number` | amount in the source currency\&#39;s smallest unit (e.g., cents for USD) | [Defaults to `undefined`] |
| **fromIso3** | `string` | source currency ISO 4217 code | [Defaults to `undefined`] |
| **toIso3** | `string` | target currency ISO 4217 code | [Defaults to `undefined`] |

### Return type

**number**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`, `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **422** | Unprocessable Content |  -  |
| **409** | Conflict |  -  |
| **404** | Not Found |  -  |
| **500** | Internal Server Error |  -  |
| **200** | the amount in the target currency\&#39;s smallest unit |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listSupportedCurrencies

> Array&lt;CurrencyResponse&gt; listSupportedCurrencies()



### Example

```ts
import {
  Configuration,
  CurrenciesApi,
} from '';
import type { ListSupportedCurrenciesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CurrenciesApi();

  try {
    const data = await api.listSupportedCurrencies();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**Array&lt;CurrencyResponse&gt;**](CurrencyResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`, `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **422** | Unprocessable Content |  -  |
| **409** | Conflict |  -  |
| **404** | Not Found |  -  |
| **500** | Internal Server Error |  -  |
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


# CardsApi

All URIs are relative to *https://localhost:8082*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createCard**](CardsApi.md#createcard) | **POST** /cards | Requires the &#x60;card.create&#x60; authority. |
| [**createCardPayment**](CardsApi.md#createcardpayment) | **POST** /cards/{cardNumber}/payments | Requires the authenticated user is the owner of the card |
| [**getCard**](CardsApi.md#getcard) | **GET** /cards/{cardNumber} | Requires the &#x60;card.read_any&#x60; authority or that the authenticated user is the owner of the card |
| [**listCardPayments**](CardsApi.md#listcardpayments) | **GET** /cards/{cardNumber}/payments | Requires the &#x60;card.read_any&#x60; authority or that the authenticated user is the owner of the card |
| [**listCards**](CardsApi.md#listcards) | **GET** /cards | Requires the &#x60;card.read_any&#x60; authority or that the authenticated user is the owner of the  account. |
| [**setCardCeilings**](CardsApi.md#setcardceilings) | **PUT** /cards/{cardNumber}/ceilings | Requires the &#x60;card.ceilings_edit&#x60; authority |
| [**setCardStatus**](CardsApi.md#setcardstatus) | **PUT** /cards/{cardNumber}/status | Requires the &#x60;card.status_edit&#x60; authority |



## createCard

> createCard(cardRequest)

Requires the &#x60;card.create&#x60; authority.

Requires the &#x60;card.create&#x60; authority.

### Example

```ts
import {
  Configuration,
  CardsApi,
} from '';
import type { CreateCardRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CardsApi();

  const body = {
    // CardRequest
    cardRequest: ...,
  } satisfies CreateCardRequest;

  try {
    const data = await api.createCard(body);
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
| **cardRequest** | [CardRequest](CardRequest.md) |  | |

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
| **200** | a response with a &#x60;Location&#x60; header pointing to the newly created card resource |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createCardPayment

> createCardPayment(cardNumber, cardPaymentCreationRequest)

Requires the authenticated user is the owner of the card

Requires the authenticated user is the owner of the card

### Example

```ts
import {
  Configuration,
  CardsApi,
} from '';
import type { CreateCardPaymentRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CardsApi();

  const body = {
    // string
    cardNumber: cardNumber_example,
    // CardPaymentCreationRequest
    cardPaymentCreationRequest: ...,
  } satisfies CreateCardPaymentRequest;

  try {
    const data = await api.createCardPayment(body);
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
| **cardNumber** | `string` |  | [Defaults to `&#39;&#39;`] |
| **cardPaymentCreationRequest** | [CardPaymentCreationRequest](CardPaymentCreationRequest.md) |  | |

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
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getCard

> CardResponse getCard(cardNumber)

Requires the &#x60;card.read_any&#x60; authority or that the authenticated user is the owner of the card

Requires the &#x60;card.read_any&#x60; authority or that the authenticated user is the owner of the card

### Example

```ts
import {
  Configuration,
  CardsApi,
} from '';
import type { GetCardRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CardsApi();

  const body = {
    // string | The number of the card to change the status of
    cardNumber: cardNumber_example,
  } satisfies GetCardRequest;

  try {
    const data = await api.getCard(body);
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
| **cardNumber** | `string` | The number of the card to change the status of | [Defaults to `&#39;&#39;`] |

### Return type

[**CardResponse**](CardResponse.md)

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
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listCardPayments

> Array&lt;CardPaymentResponse&gt; listCardPayments(cardNumber, from, to)

Requires the &#x60;card.read_any&#x60; authority or that the authenticated user is the owner of the card

Requires the &#x60;card.read_any&#x60; authority or that the authenticated user is the owner of the card

### Example

```ts
import {
  Configuration,
  CardsApi,
} from '';
import type { ListCardPaymentsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CardsApi();

  const body = {
    // string | The number of the card to retrieve the payments of
    cardNumber: cardNumber_example,
    // Date (optional)
    from: 2013-10-20T19:20:30+01:00,
    // Date (optional)
    to: 2013-10-20T19:20:30+01:00,
  } satisfies ListCardPaymentsRequest;

  try {
    const data = await api.listCardPayments(body);
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
| **cardNumber** | `string` | The number of the card to retrieve the payments of | [Defaults to `&#39;&#39;`] |
| **from** | `Date` |  | [Optional] [Defaults to `undefined`] |
| **to** | `Date` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;CardPaymentResponse&gt;**](CardPaymentResponse.md)

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
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listCards

> Array&lt;CardResponse&gt; listCards(iban)

Requires the &#x60;card.read_any&#x60; authority or that the authenticated user is the owner of the  account.

Requires the &#x60;card.read_any&#x60; authority or that the authenticated user is the owner of the  account.

### Example

```ts
import {
  Configuration,
  CardsApi,
} from '';
import type { ListCardsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CardsApi();

  const body = {
    // string
    iban: iban_example,
  } satisfies ListCardsRequest;

  try {
    const data = await api.listCards(body);
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
| **iban** | `string` |  | [Defaults to `undefined`] |

### Return type

[**Array&lt;CardResponse&gt;**](CardResponse.md)

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
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## setCardCeilings

> setCardCeilings(cardNumber, cardCeilingsRequest)

Requires the &#x60;card.ceilings_edit&#x60; authority

Requires the &#x60;card.ceilings_edit&#x60; authority

### Example

```ts
import {
  Configuration,
  CardsApi,
} from '';
import type { SetCardCeilingsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CardsApi();

  const body = {
    // string | The number of the card to change the ceilings of
    cardNumber: cardNumber_example,
    // CardCeilingsRequest
    cardCeilingsRequest: ...,
  } satisfies SetCardCeilingsRequest;

  try {
    const data = await api.setCardCeilings(body);
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
| **cardNumber** | `string` | The number of the card to change the ceilings of | [Defaults to `&#39;&#39;`] |
| **cardCeilingsRequest** | [CardCeilingsRequest](CardCeilingsRequest.md) |  | |

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
| **202** | Accepted |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## setCardStatus

> setCardStatus(cardNumber, cardStatusRequest)

Requires the &#x60;card.status_edit&#x60; authority

Requires the &#x60;card.status_edit&#x60; authority

### Example

```ts
import {
  Configuration,
  CardsApi,
} from '';
import type { SetCardStatusRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CardsApi();

  const body = {
    // string | The number of the card to change the status of
    cardNumber: cardNumber_example,
    // CardStatusRequest
    cardStatusRequest: ...,
  } satisfies SetCardStatusRequest;

  try {
    const data = await api.setCardStatus(body);
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
| **cardNumber** | `string` | The number of the card to change the status of | [Defaults to `&#39;&#39;`] |
| **cardStatusRequest** | [CardStatusRequest](CardStatusRequest.md) |  | |

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
| **202** | Accepted |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


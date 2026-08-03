# CustomersApi

All URIs are relative to *https://localhost:8083*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**addBeneficiary**](CustomersApi.md#addbeneficiary) | **POST** /customers/{customerId}/beneficiaries | Requires the &#x60;customer.edit&#x60; authority or the user to be the customer |
| [**createCustomer**](CustomersApi.md#createcustomer) | **POST** /customers | Requires the &#x60;customer.edit&#x60; authority |
| [**deleteBeneficiary**](CustomersApi.md#deletebeneficiary) | **DELETE** /customers/{customerId}/beneficiaries/{beneficiaryId} |  |
| [**getBeneficiary**](CustomersApi.md#getbeneficiary) | **GET** /customers/{customerId}/beneficiaries/{beneficiaryId} |  |
| [**getCustomer**](CustomersApi.md#getcustomer) | **GET** /customers/{customerId} | Requires the &#x60;customer.read_any&#x60; authority or the user to be the customer |
| [**listBeneficiaries**](CustomersApi.md#listbeneficiaries) | **GET** /customers/{customerId}/beneficiaries | Requires the &#x60;customer.read_any&#x60; authority or the user to be the customer |
| [**listCustomers**](CustomersApi.md#listcustomers) | **GET** /customers | Requires the &#x60;customer.read_any&#x60; authority |
| [**updateBeneficiary**](CustomersApi.md#updatebeneficiary) | **PUT** /customers/{customerId}/beneficiaries/{beneficiaryId} |  |



## addBeneficiary

> addBeneficiary(customerId, beneficiaryRequest)

Requires the &#x60;customer.edit&#x60; authority or the user to be the customer

Requires the &#x60;customer.edit&#x60; authority or the user to be the customer

### Example

```ts
import {
  Configuration,
  CustomersApi,
} from '';
import type { AddBeneficiaryRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CustomersApi();

  const body = {
    // string | The ID of the customer to retrieve
    customerId: customerId_example,
    // BeneficiaryRequest | Neither IBAN nor label can be used for this customer
    beneficiaryRequest: ...,
  } satisfies AddBeneficiaryRequest;

  try {
    const data = await api.addBeneficiary(body);
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
| **customerId** | `string` | The ID of the customer to retrieve | [Defaults to `&#39;&#39;`] |
| **beneficiaryRequest** | [BeneficiaryRequest](BeneficiaryRequest.md) | Neither IBAN nor label can be used for this customer | |

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
| **422** | Unprocessable Content |  -  |
| **409** | Conflict |  -  |
| **404** | Not Found |  -  |
| **500** | Internal Server Error |  -  |
| **200** | a response with a Location header pointing to the created beneficiary |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createCustomer

> createCustomer(customerCreationRequest)

Requires the &#x60;customer.edit&#x60; authority

Requires the &#x60;customer.edit&#x60; authority

### Example

```ts
import {
  Configuration,
  CustomersApi,
} from '';
import type { CreateCustomerRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CustomersApi();

  const body = {
    // CustomerCreationRequest
    customerCreationRequest: ...,
  } satisfies CreateCustomerRequest;

  try {
    const data = await api.createCustomer(body);
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
| **customerCreationRequest** | [CustomerCreationRequest](CustomerCreationRequest.md) |  | |

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
| **422** | Unprocessable Content |  -  |
| **409** | Conflict |  -  |
| **404** | Not Found |  -  |
| **500** | Internal Server Error |  -  |
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteBeneficiary

> deleteBeneficiary(customerId, beneficiaryId)



### Example

```ts
import {
  Configuration,
  CustomersApi,
} from '';
import type { DeleteBeneficiaryRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CustomersApi();

  const body = {
    // string | The ID of the customer to retrieve
    customerId: customerId_example,
    // number | The ID of the customer to retrieve
    beneficiaryId: 789,
  } satisfies DeleteBeneficiaryRequest;

  try {
    const data = await api.deleteBeneficiary(body);
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
| **customerId** | `string` | The ID of the customer to retrieve | [Defaults to `&#39;&#39;`] |
| **beneficiaryId** | `number` | The ID of the customer to retrieve | [Defaults to ``] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **422** | Unprocessable Content |  -  |
| **409** | Conflict |  -  |
| **404** | Not Found |  -  |
| **500** | Internal Server Error |  -  |
| **202** | Accepted |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getBeneficiary

> BeneficiaryResponse getBeneficiary(customerId, beneficiaryId)



### Example

```ts
import {
  Configuration,
  CustomersApi,
} from '';
import type { GetBeneficiaryRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CustomersApi();

  const body = {
    // string | The ID of the customer to retrieve
    customerId: customerId_example,
    // number | The ID of the customer to retrieve
    beneficiaryId: 789,
  } satisfies GetBeneficiaryRequest;

  try {
    const data = await api.getBeneficiary(body);
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
| **customerId** | `string` | The ID of the customer to retrieve | [Defaults to `&#39;&#39;`] |
| **beneficiaryId** | `number` | The ID of the customer to retrieve | [Defaults to ``] |

### Return type

[**BeneficiaryResponse**](BeneficiaryResponse.md)

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


## getCustomer

> CustomerResponse getCustomer(customerId)

Requires the &#x60;customer.read_any&#x60; authority or the user to be the customer

Requires the &#x60;customer.read_any&#x60; authority or the user to be the customer

### Example

```ts
import {
  Configuration,
  CustomersApi,
} from '';
import type { GetCustomerRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CustomersApi();

  const body = {
    // string | The ID of the customer to retrieve
    customerId: customerId_example,
  } satisfies GetCustomerRequest;

  try {
    const data = await api.getCustomer(body);
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
| **customerId** | `string` | The ID of the customer to retrieve | [Defaults to `&#39;&#39;`] |

### Return type

[**CustomerResponse**](CustomerResponse.md)

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


## listBeneficiaries

> Array&lt;BeneficiaryResponse&gt; listBeneficiaries(customerId)

Requires the &#x60;customer.read_any&#x60; authority or the user to be the customer

Requires the &#x60;customer.read_any&#x60; authority or the user to be the customer

### Example

```ts
import {
  Configuration,
  CustomersApi,
} from '';
import type { ListBeneficiariesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CustomersApi();

  const body = {
    // string
    customerId: customerId_example,
  } satisfies ListBeneficiariesRequest;

  try {
    const data = await api.listBeneficiaries(body);
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

[**Array&lt;BeneficiaryResponse&gt;**](BeneficiaryResponse.md)

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


## listCustomers

> PagedModelCustomerResponse listCustomers(search, page, size, sort)

Requires the &#x60;customer.read_any&#x60; authority

Requires the &#x60;customer.read_any&#x60; authority

### Example

```ts
import {
  Configuration,
  CustomersApi,
} from '';
import type { ListCustomersRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CustomersApi();

  const body = {
    // string | A String contained in username, first or last name, or email. (optional)
    search: search_example,
    // number | Zero-based page index (0..N) (optional)
    page: 56,
    // number | The size of the page to be returned (optional)
    size: 56,
    // Array<string> | Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. (optional)
    sort: ...,
  } satisfies ListCustomersRequest;

  try {
    const data = await api.listCustomers(body);
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
| **search** | `string` | A String contained in username, first or last name, or email. | [Optional] [Defaults to `undefined`] |
| **page** | `number` | Zero-based page index (0..N) | [Optional] [Defaults to `0`] |
| **size** | `number` | The size of the page to be returned | [Optional] [Defaults to `20`] |
| **sort** | `Array<string>` | Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. | [Optional] |

### Return type

[**PagedModelCustomerResponse**](PagedModelCustomerResponse.md)

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


## updateBeneficiary

> updateBeneficiary(customerId, beneficiaryId, beneficiaryRequest)



### Example

```ts
import {
  Configuration,
  CustomersApi,
} from '';
import type { UpdateBeneficiaryRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CustomersApi();

  const body = {
    // string | The ID of the customer to retrieve
    customerId: customerId_example,
    // number | The ID of the customer to retrieve
    beneficiaryId: 789,
    // BeneficiaryRequest
    beneficiaryRequest: ...,
  } satisfies UpdateBeneficiaryRequest;

  try {
    const data = await api.updateBeneficiary(body);
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
| **customerId** | `string` | The ID of the customer to retrieve | [Defaults to `&#39;&#39;`] |
| **beneficiaryId** | `number` | The ID of the customer to retrieve | [Defaults to ``] |
| **beneficiaryRequest** | [BeneficiaryRequest](BeneficiaryRequest.md) |  | |

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
| **422** | Unprocessable Content |  -  |
| **409** | Conflict |  -  |
| **404** | Not Found |  -  |
| **500** | Internal Server Error |  -  |
| **202** | Accepted |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


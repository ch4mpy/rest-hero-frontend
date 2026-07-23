# GatewayApi

All URIs are relative to *https://localhost:7080/gateway*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getMe**](GatewayApi.md#getme) | **GET** /me | Returns information of the current user if authenticated, ANONYMOUS otherwise |
| [**logout**](GatewayApi.md#logout) | **POST** /logout |  |
| [**startLoginWithGateway**](GatewayApi.md#startloginwithgateway) | **GET** /oauth2/authorization/gateway |  |



## getMe

> UserResponse getMe()

Returns information of the current user if authenticated, ANONYMOUS otherwise

Returns information of the current user if authenticated, ANONYMOUS otherwise

### Example

```ts
import {
  Configuration,
  GatewayApi,
} from '';
import type { GetMeRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new GatewayApi();

  try {
    const data = await api.getMe();
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

[**UserResponse**](UserResponse.md)

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
| **500** | Internal Server Error |  -  |
| **404** | Not Found |  -  |
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## logout

> logout()



logout

### Example

```ts
import {
  Configuration,
  GatewayApi,
} from '';
import type { LogoutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new GatewayApi();

  try {
    const data = await api.logout();
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

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **202** | ACCEPTED |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## startLoginWithGateway

> startLoginWithGateway()



Initiate an authorization code flow with the URI to follow in the response\&#39;s Location header

### Example

```ts
import {
  Configuration,
  GatewayApi,
} from '';
import type { StartLoginWithGatewayRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new GatewayApi();

  try {
    const data = await api.startLoginWithGateway();
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

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


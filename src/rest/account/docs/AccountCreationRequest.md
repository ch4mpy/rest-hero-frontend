
# AccountCreationRequest


## Properties

Name | Type
------------ | -------------
`iban` | string
`customerId` | string
`currency` | string

## Example

```typescript
import type { AccountCreationRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "iban": null,
  "customerId": null,
  "currency": null,
} satisfies AccountCreationRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AccountCreationRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



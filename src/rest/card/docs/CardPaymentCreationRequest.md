
# CardPaymentCreationRequest


## Properties

Name | Type
------------ | -------------
`currency` | string
`amount` | number
`cardNumber` | string
`destinationIban` | string

## Example

```typescript
import type { CardPaymentCreationRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "currency": null,
  "amount": null,
  "cardNumber": null,
  "destinationIban": null,
} satisfies CardPaymentCreationRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CardPaymentCreationRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)




# MoneyTransferRequest


## Properties

Name | Type
------------ | -------------
`sourceIban` | string
`destinationIban` | string
`amount` | number
`currency` | string
`label` | string

## Example

```typescript
import type { MoneyTransferRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "sourceIban": null,
  "destinationIban": null,
  "amount": null,
  "currency": null,
  "label": null,
} satisfies MoneyTransferRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MoneyTransferRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



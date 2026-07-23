
# CardRequest


## Properties

Name | Type
------------ | -------------
`iban` | string
`transactionCeiling` | number
`rolling30Ceiling` | number

## Example

```typescript
import type { CardRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "iban": null,
  "transactionCeiling": null,
  "rolling30Ceiling": null,
} satisfies CardRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CardRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



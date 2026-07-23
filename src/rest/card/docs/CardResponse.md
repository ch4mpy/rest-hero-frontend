
# CardResponse


## Properties

Name | Type
------------ | -------------
`number` | string
`iban` | string
`transactionCeiling` | number
`rolling30Ceiling` | number
`isActive` | boolean

## Example

```typescript
import type { CardResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "number": null,
  "iban": null,
  "transactionCeiling": null,
  "rolling30Ceiling": null,
  "isActive": null,
} satisfies CardResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CardResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



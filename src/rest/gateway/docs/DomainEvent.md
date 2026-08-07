
# DomainEvent

Contract shared by every business service publishing to RabbitMQ and by the gateway relaying  events to the frontend over Server-Sent Events. Payload stays minimal (identifiers only): the  frontend is expected to refetch the actual resource over REST once notified.   <p>  <code>resourceType</code> comes from the shared {@link ResourceType ResourceType} taxonomy, so every publishing  service and the frontend agree on the same resource area names. <code>resourceOwner</code> and  <code>audienceRoles</code> together describe who should receive the event: the subject that owns the  resource, plus whichever authorities (mirroring the service\'s own <code>@PreAuthorize</code>  expressions) are allowed to see it regardless of ownership. The gateway only needs to know, for  each connected user, their subject and granted authorities to compute the audience, it has no  notion of what an \"account\" or a \"transfer\" is.

## Properties

Name | Type
------------ | -------------
`resourceType` | string
`resourceId` | string
`resourceOwner` | string
`audienceRoles` | Array&lt;string&gt;
`eventType` | string
`occurredAt` | Date

## Example

```typescript
import type { DomainEvent } from ''

// TODO: Update the object below with actual values
const example = {
  "resourceType": null,
  "resourceId": null,
  "resourceOwner": null,
  "audienceRoles": null,
  "eventType": null,
  "occurredAt": null,
} satisfies DomainEvent

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as DomainEvent
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



# Invokable Endpoints

- id: invokable-endpoints
- points: 20
- level: amateur
- category: function

## Description

Invokable Endpoints can be thought of as functions that act as external endpoints to the logic, which can be invoked to read/write to the logic.

### Types of invokable endpoints

1. Mutating Endpoints - Mutate the state of the logic and are denoted with "!" as a suffix, followed by at least one **mutate** keyword in the body. eg: **endpoint invokable Set!()**.

2. Non-Mutating Endpoints - They don't affect the state of the logic, and you often see the use of the **observe** keyword to read from the state of the logic and return something. eg: **endpoint invokable Get()**.

**NOTE** - Endpoints can only be called externally and not internally within the logic. If you want to call something internally, then head over to the next challenge, which is functions.

## Tasks

### Task 1

Task Description goes here

## Tests

```javascript
async (logicDriver, expect) => {};
```

## Start Code

```cocolang
coco InvokableEndpoints
```

## Solution Code

## Deploy Details

```json
{
  "moduleName": "InvokableEndpoints",
  "deployerEndpoint": "",
  "deployerArgs": []
}
```

# Local Variables

- id: local-variables
- points: 10
- level: Amateur

## Description

Unlike state variables, local variables are not stored on the blockchain instead they only exist until the function or endpoint execution is complete.

### How do you declare a local variable?

Local variables are declared inside the endpoint or function body. Any data assigned to a local variable will be lost after the endpoint or function finishes execution.

## Tasks

### Task 1

Create a **endpoint invokable Add** and declare 2 local variables with respective values **121** & **212** and return their sum using **sum U64** as the return variable.

#### Example on how to return an output from an endpoint

```cocolang
endpoint invokable Test()->(returnVar String):
    yield returnVar "Tested"
```

## Tests

```javascript
async (logicDriver, expect) => {
  const { sum } = await logicDriver.routines.Add();
  expect(sum).to.be.equal(333);
};
```

## Start Code

```cocolang
coco LocalVariables

state persistent:
     random String

endpoint deployer Init!():
    pass

func localVars():
    var u U64
    u = 1
    var Bool  = true

// Local variables don't need a type if you assign a value during declaration.
// Example: var u = 123

// But you must specify the type if no value is assigned during declaration.
// Example: var u U4
```

## Deploy Details

```json
{
  "moduleName": "LocalVariables",
  "deployerEndpoint": "Init!",
  "deployerArgs": []
}
```

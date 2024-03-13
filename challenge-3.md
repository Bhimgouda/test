# Persistent State Variables

- id: persistent-state-variables
- points: 10
- level: rookie
- category: variable

## Description

There are **4 types of variables** in coco-lang:

1. persistent-state
2. ephemeral-state
3. local
4. global variables

Let's start with the persistent-state variables.

**Persistent state variables** are stored on the blockchain and are accessible by all. You can save some data into a persistent-state variable, come back a week later, and the data will still be there.

### How do you declare a persistent state variable?

Persistent-state variables are only declared inside **state persistent:**

```cocolang
coco TokenLedger

state persistent:
    name String
    symbol String
    supply U64
    balances Map[Address]U64

endpoint deployer Init!():
    pass

endpoint invokable SetName!(name String):
    mutate name -> TokenLedger.State.name
```

## Tasks

### Task 1

Write a mutating **endpoint invokable ResetNum!** which will reset the persistent state variable **num** to **0**.

### Task 2

Write a non-mutating **endpoint invokable GetNumPlusTwo**. This function will return **num + 2** without updating the state variable num.

## Tests

```javascript
async (logicDriver, expect) => {
  const ix = await logicDriver.routines.ResetNum();
  await ix.wait();

  const num = await logicDriver.persistentState.get("num");
  expect(num).to.be.equal(0);
};
```

```javascript
async (logicDriver, expect) => {
  const num = await logicDriver.persistentState.get("num");

  const { numPlusTwo } = await logicDriver.routines.GetNumPlusTwo();
  expect(numPlusTwo).to.be.equal(num + 2);
};
```

## Start Code

```cocolang
coco StateVariables

state persistent:
    num U64

/////////////////////
// deployer Endpoints
////////////////////

endpoint deployer InitializeNum!():
    var newNum = 21
    mutate newNum -> StateVariables.State.num

/////////////////////
// mutating/write Endpoints
////////////////////

// Note: Mutating endpoints are denoted with "!" as a suffix.

endpoint invokable SetNum!(newNum U64):
    mutate newNum -> StateVariables.State.num

// Write ResetNum! endpoint here

/////////////////////
// non-mutating/read Endpoints
////////////////////

endpoint invokable GetNumPlusOne()->(numPlusOne U64):
    observe num <- StateVariables.State.num:
        yield numPlusOne num + 1

// Write GetNumPlusTwo endpoint here
```

## Deploy Details

```json
{
  "moduleName": "StateVariables",
  "deployerEndpoint": "InitializeNum!",
  "deployerArgs": []
}
```

**Note:** This endpoint will affect the state of the logic/blockchain. Hence it is a mutating/write endpoint.

**Note:** This endpoint will not affect the state of the logic/blockchain. Hence it is a non-mutating/read-only endpoint

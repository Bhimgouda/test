# Persistent State Variables

- id = persistent-state-variables
- points = 10
- level = Amateur

## Description

There are **4 types of variables** in coco-lang: persistent-state, ephemeral-state, local, and global variables.

Let's start with the persistent-state variables.

**Persistent state variables** are stored on the chain and are accessible by all. You can save some data into a persistent-state variable, come back a week later, and the data will still be there.

### How do you declare a persistent state variable?

Persistent-state variables are only declared inside state persistent:

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

1. Write a mutating(write) **endpoint invokable resetNum!** which will reset the persistent state variable **num** to **0**.

2. Write a non-mutating(read) **endpoint invokable getNumPlusOne**. This function will return num + 1 without updating the state variable num.

## Tests

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

// Non-mutating/Read-only Endpoints
// It does not make any updates to the blockchain.
endpoint invokable GetNum()->(theNum U64):
    observe theNum <- StateVariables.State.num

// Write GetNumPlusOne endpoint here
```

### Solution Code

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

endpoint invokable ResetNum!():
mutate 0 -> StateVariables.State.num

/////////////////////
// non-mutating/read Endpoints
////////////////////

// Non-mutating/Read-only Endpoints
// It does not make any updates to the blockchain.
endpoint invokable GetNum()->(theNum U64):
    observe theNum <- StateVariables.State.num

endpoint invokable GetNumPlusOne()->(numPlusOne U64):
observe num <- StateVariables.State.num:
numPlusOne = num + 1
```

## Deploy Details

```json
{
  "moduleName": "StateVariables",
  "deployerEndpoint": "InitializeNum!",
  "deployerArgs": []
}
```

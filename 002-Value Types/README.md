# Value Types

## Description

Here are some **Primitive data types** available in cocolang.

1. Bool
2. String
3. Bytes
4. Address
5. U64 and U256
6. I64 and I256

All the coco variables when declared with a particular type are initialized with **zero/default values**

When they are used as function arguments or variable assignments, their values are copied over to the new variable.

**Note** - _You can't start a variable name with a number_

## Tasks

### Task1

Create a persistent state variable of type **Bool** called **justABoolean** and initialize it to **true**

#### Test 1

```javascript
async (logicDriver, expect) => {
      const bit256UnsignedInteger = await logicDriver.persistentState.get(
        "bit256UnsignedInteger"
      );
      expect(bit256UnsignedInteger).to.be.equal(50);
    },
```

### Task2

Create a persistent state variable of type **String** called **justAString** and initialize it to **"I am a string"**

### Task3

Create a persistent state variable of type **I64** called **bit64Integer** and initialize it to **-20**

### Task4

Create a persistent state variable of type **I256** called **bit256Integer** and initialize it to **50**

### Task5

Create a persistent state variable of type **U64** called **Bit64UnsignedInteger** and initialize it to **20**

### Task6

Create a persistent state variable of type **U256** called **Bit256UnsignedInteger** and initialize it to **50**

## Tests

```javascript
async (logicDriver, expect) => {
  const justABoolean = await logicDriver.persistentState.get("justABoolean");
  expect(justABoolean).to.be.equal(true);
};
```

```javascript
async (logicDriver, expect) => {
  const justAString = await logicDriver.persistentState.get("justAString");
  expect(justAString).to.be.equal("I am a string");
},
```

```javascript
async (logicDriver, expect) => {
  const bit64Integer = await logicDriver.persistentState.get(
    "bit64Integer"
  );
  expect(bit64Integer).to.be.equal(-20);
},
```

```javascript
async (logicDriver, expect) => {
  const bit256Integer = await logicDriver.persistentState.get(
    "bit256Integer"
  );
  expect(bit256Integer).to.be.equal(50);
},
```

```javascript
async (logicDriver, expect) => {
  const bit64UnsignedInteger = await logicDriver.persistentState.get(
    "bit64UnsignedInteger"
  );
  expect(bit64UnsignedInteger).to.be.equal(20);
},
```

```javascript
async (logicDriver, expect) => {
  const bit256UnsignedInteger = await logicDriver.persistentState.get(
    "bit256UnsignedInteger"
  );
  expect(bit256UnsignedInteger).to.be.equal(50);
},
```

## Start Code

```
coco ValueTypes

state persistent:
    justABytes Bytes
    justAnAddress Address

endpoint deployer Initialize!():
    mutate 0x -> ValueTypes.State.justABytes
    mutate Address(Sender) -> ValueTypes.State.justAnAddress
```

## Solution Code

```
coco ValueTypes

state persistent:
    justABytes Bytes
    justAnAddress Address
    justABoolean Bool
    justAString String
    bit64Integer I64
    bit256Integer I256
    bit64UnsignedInteger U64
    bit256UnsignedInteger U256

endpoint deployer Initialize!():
    mutate 0x -> ValueTypes.State.justABytes
    mutate Address(Sender) -> ValueTypes.State.justAnAddress
    mutate true -> ValueTypes.State.justABoolean
    mutate "I am a string" -> ValueTypes.State.justAString
    mutate -20 -> ValueTypes.State.bit64Integer
    mutate 50 -> ValueTypes.State.bit256Integer
    mutate 20 -> ValueTypes.State.bit64UnsignedInteger
    mutate 50 -> ValueTypes.State.bit256UnsignedInteger
```

## Extra Details

- moduleName = ValueTypes
- deployerEndpoint = Initialize!()
- deployerArgs = []
- points = 10
- level = Amateur

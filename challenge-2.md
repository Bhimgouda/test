# Value Types

- id: value-types
- points: 10
- level: rookie
- category: variable

## Description

Here are some **Primitive Datatypes** available in cocolang.

1. Bool
2. String
3. Bytes
4. Address
5. U64 and U256
6. I64 and I256

All the coco variables when declared with a particular type are initialized with their respective **zero/default values**.

### Note

_You can't start a variable name with a number_

## Tasks

### Task 1

Create a persistent state variable of type **Bool** called **justABoolean** and initialize it to **true**

### Task 2

Create a persistent state variable of type **String** called **justAString** and initialize it to **"I am a string"**

### Task 3

Create a persistent state variable of type **I64** called **bit64Integer** and initialize it to **-20**

### Task 4

Create a persistent state variable of type **I256** called **bit256Integer** and initialize it to **50**

### Task 5

Create a persistent state variable of type **U64** called **bit64UnsignedInteger** and initialize it to **20**

### Task 6

Create a persistent state variable of type **U256** called **bit256UnsignedInteger** and initialize it to **50**

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
};
```

```javascript
async (logicDriver, expect) => {
  const bit64Integer = await logicDriver.persistentState.get("bit64Integer");
  expect(bit64Integer).to.be.equal(-20);
};
```

```javascript
async (logicDriver, expect) => {
  const bit256Integer = await logicDriver.persistentState.get("bit256Integer");
  expect(bit256Integer).to.be.equal(50);
};
```

```javascript
async (logicDriver, expect) => {
  const bit64UnsignedInteger = await logicDriver.persistentState.get(
    "bit64UnsignedInteger"
  );
  expect(bit64UnsignedInteger).to.be.equal(20);
};
```

```javascript
async (logicDriver, expect) => {
  const bit256UnsignedInteger = await logicDriver.persistentState.get(
    "bit256UnsignedInteger"
  );
  expect(bit256UnsignedInteger).to.be.equal(50);
};
```

## Start Code

```cocolang
coco ValueTypes

state persistent:
    justABytes Bytes
    justAnAddress Address
    // Declare variables here

endpoint deployer Initialize!():
    mutate 0x -> ValueTypes.State.justABytes
    mutate Address(Sender) -> ValueTypes.State.justAnAddress
    // Initialize them here
```

## Deploy Details

```json
{
  "moduleName": "ValueTypes",
  "deployerEndpoint": "Initialize!",
  "deployerArgs": []
}
```

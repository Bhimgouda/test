# Counter

- id: counter
- points: 20
- level: amateur
- category: app

## Description

Desciption goes here

## Tasks

### Task 1

Task Description goes here

## Tests

```javascript
async (logicDriver, expect) => {};
```

## Start Code

```cocolang
coco Counter
```

## Solution Code

```cocolang
coco Counter

state persistent:
    count U64

endpoint deployer Init!():
    pass

endpoint invokable Increment!():
    mutate counter <- Counter.State.count:
        counter++

endpoint invokable Decrement!():
    mutate counter <- Counter.State.count:
        counter--
```

## Deploy Details

```json
{
  "moduleName": "Counter",
  "deployerEndpoint": "Init!",
  "deployerArgs": []
}
```

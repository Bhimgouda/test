# Deployer Endpoints

- id: deployer-endpoints
- points: 20
- level: amateur
- category: function

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
coco DeployerEndpoint
```

## Solution Code

```cocolang
coco DeployerEndpoint

state persistent:
    owner Address
    magicNumber U64

endpoint deployer Init!():
    pass

endpoint invokable InitState!(magicNumber U64):
    mutate Address(Sender) -> DeployerEndpoint.State.owner
    mutate magicNumber -> DeployerEndpoint.State.magicNumber
```

## Deploy Details

```json
{
  "moduleName": "DeployerEndpoint",
  "deployerEndpoint": "Init!",
  "deployerArgs": []
}
```

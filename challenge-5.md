# Global Variables or SuperGlobals

- id: global-variables
- points: 10
- level: rookie
- category: variable

## Description

We have 2 types of global variables in coco

1. Participant Context variables

- Sender
- Logic (Module Name)

2. Environment & Interaction Variables

- Env.Timestamp
- Env.ClusterId
- Ixn.Kind
- Ixn.FuelLimit
- Ixn.FuelPrice

**Note** - The coco module name is also a global variable - It can be used to access the state information of the logic module.

## Tasks

### Task 1

Create an **endpoint invokable GetSenderAddress** that returns **senderAddress Address** which is address of the endpoint invoker/caller

## Tests

```javascript
async (logicDriver, expect) => {
  const { senderAddress } = await logicDriver.routines.GetSenderAddress();
  expect(senderAddress).to.be.equal(typeof Object);
};
```

## Start Code

```cocolang
coco GlobalVariables

state persistent:
    myString String

endpoint deployer Init!():
    pass
    // pass means do nothing

func globalVars():
    var logicAddress = Address(GlobalVariables)
    // address of the logic

    var sender = Address(Sender)
    // address of the user that is calling

    var timeStamp = Env.Timestamp()
    // timestamp (in seconds) of current tesseract
    // Not to confuse - This is how you get Current time

endpoint invokable GetMyString()->(aString String):
    // Even Logic's Module Name is a global variable
    // from where we acces the persistent state variables
    observe aString <- GlobalVariables.State.myString
```

## Deploy Details

```json
{
  "moduleName": "GlobalVariables",
  "deployerEndpoint": "Init!",
  "deployerArgs": []
}
```

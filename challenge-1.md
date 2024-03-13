# Hello World

- id: hello-world
- points: 10
- level: rookie
- category: app

## Description

Time to say Hello Coco 👋

## Tasks

### Task 1

Check if the logic name is **HelloWorld** and create a persistent state variable called **greet** and then assign it an initial value of **"Hello World"**

## Tests

```javascript
async (logicDriver, expect) => {
  const greet = await logicDriver.persistentState.get("greet");
  expect(greet).to.be.equal("Hello World");
};
```

## Start Code

```cocolang
coco HelloWorld

state persistent:
    myString String
    // Create the variable here

endpoint deployer Initialize!():
    mutate "My String" -> HelloWorld.State.myString
    // and then mutate it to the desired value here
```

## Deploy Details

```json
{
  "moduleName": "HelloWorld",
  "deployerEndpoint": "Initialize!",
  "deployerArgs": []
}
```

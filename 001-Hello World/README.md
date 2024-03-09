# Hello World

Time to say Hello Coco

## Tasks

1. Check the logic name is **HelloWorld**

2. Create a **persistent state variable** called **greet** and then assign it an initial value of **"Hello World"**

```
    async (logicDriver, expect) => {
      const greet = await logicDriver.persistentState.get(
        'greet'
      );
      expect(greet).to.be.equal('Hello World');
    }
```

## Start Code

```
    coco HelloWorld

    state persistent:
        myString String
        // Write your code here

    endpoint deployer Initialize!():
        mutate "My String" -> HelloWorld.State.myString
```

## Solution Code

```
    coco HelloWorld

    state persistent:
    myString String
    greet String

    endpoint deployer Initialize!():
    mutate "My String" -> HelloWorld.State.myString
    mutate "Hello World" -> HelloWorld.State.greet
```

### Extra Details

moduleName = HelloWorld
deployerEndpoint = Initialize!()
deployerArgs = []
points = 10
level = Amateur

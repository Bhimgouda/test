# Observe and Mutate

- id: observe-and-mutate
- points: 20
- level: Amatuer
- category: state

## Description

As you have already guessed it, the **mutate** keyword mutates the state of the logic, and the **observe** keyword observes from the state of the logic.

**observe** keyword is married to "<-" arrow as you can only read from the state. This "<-" arrow can have a body

```cocolang
observe count <- Counter.State.count
observe count <- Counter.State.count:
    countPlusOne = count + 1

// Data flows from the state to a local variable
```

And the **mutate** keyword is married to "->" arrow. But has an extra-marital affair with "<-" providing us with variety of usecases.

1. So, when you have a predefined value/variable and you want to directly assign it to a state variable, you use "->". And "->" cannot have a body for obvious reasons.

```cocolang
mutate 0 -> Counter.State.count
mutate justAVariable -> Counter.State.count

// The data flows from a local variable to the state variable
```

2. When you don't have a predefined value/variable, instead you want to first read from a state variable and then mutate it. This is often useful with arrays and mappings where you get the data, change an item or two, and then throw back the modified data to the state.

```cocolang
mutate count <- Counter.State.count:
    count = count + 1

// Data comes into the local variable count
// and then we add +1 to it and the final value
// of it goes back to the state variable count.
```

So think of using "<-" arrow with the **mutate** keyword as a boomerang which reads from the state variable, and the final value of the assigned local variable goes back to the state variable.

**Note**: Not to confuse "<-" "->" arrows are only used while observing/mutating the state. And you can always use "=" for assigning at other parts of the function/endpoint body

## Tasks

### Task 1

Task Description goes here

## Tests

```javascript
async (logicDriver, expect) => {};
```

## Start Code

```cocolang
coco ReadWrite

```

## Solution Code

## Deploy Details

```json
{
  "moduleName": "ReadWrite",
  "deployerEndpoint": "",
  "deployerArgs": []
}
```

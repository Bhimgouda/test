# Persistent State Variables

There are 4 types of variables in coco-lang persistent-state, ephemeral-state, local and global.

Let's start off with persistent-state variables.

Persistent-state variables are stored on the chain. So you can save some data into a persistent-state variable, come back a week later and the data will still be there.

### How do you declare a state variable?

Persistent-state variables are only declared inside state persistent:

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

## Tasks

1. Write a invokable endpoint resetNum which will reset the persistent state variable num to 0.

2. Write an invokable endpoint (non-mutating)function getNumPlusOne. This function will return num + 1 without updating the state variable num.

### Note

observe and mutate explainations with how to access state variables and how state variables can also be accessed by their name

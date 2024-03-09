# Local Variables

Unlike state variables, local variables are not stored on the chain.

How do you declare a local variable?
Local variables are declared inside the endpoints or functions

Any data assigned to a local variable will be lost after the endpoint & function finishes execution.

## Here is an example

coco RandomLogic

state persistent:
name String

endpoint deployer Init!():
pass

func setName!(name String):
mutate name -> RandomLogic.State.name

endpoint invokable SetName!(name String):
setName!(name: name)

## Tasks

1. Create a invokable endpoint called Add that returns a U64 variable called sum

2. Inside the endpoint declare a 2 local variables with respective values 121 & 212
   and return their sum

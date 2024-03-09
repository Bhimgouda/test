# Global Variables or SuperGlobals

We have 2 types of global variables in coco

1. Participant Context variables
   1. Sender
   2. Logic (Module Name)

### Note

The coco module name is also a global variable - It can be used to access the state information of the module as well as other information about the logic module.

2. Environment & Interaction Variables
   1. Env.Timestamp
   2. Env.ClusterId
   3. Ixn.Kind
   4. Ixn.FuelLimit
   5. Ixn.FuelPrice

## Tasks

1. Create a invokable endpoint called GetSenderAddress that returns the Address of the Sender

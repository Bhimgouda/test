# Deployer Endpoints

## Solution Code

coco DeployerEndpoint

state persistent:
    owner Address
    magicNumber U64

endpoint deployer Init!():
    pass

endpoint invokable InitState!(magicNumber U64):
    mutate Address(Sender) -> DeployerEndpoint.State.owner
    mutate magicNumber -> DeployerEndpoint.State.magicNumber
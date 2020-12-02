# Adding a New Role

## What's already handled

The [PlayerWrapper](../src/components/PlayerWrapper/index.tsx) component takes care of rendering the current game state information, such as the table of who's alive/dead, and what your current role designation is. It will also handle not rendering functional components if you're dead (and it's not the end game), so you don't need to worry about that either. It also handles showing an alert of game state changes that are visible to yourself.

The Redux store and entire application state is also future-proofed, so as long as the role, phase, and actions you're adding have been implemented on the backend, you shouldn't have to touch any of that.

## What you need to do

1. Update the `PLAYER_ROLE` enum in the [player types](../src/types/player.ts). If your new role also requires a new phase, then you will also need to update the`PHASE_NAME` enum in the [phase types](../src/types/phase.ts);

1. Modify the `ROLE_TEXT` constant in [PlayerWrapper](../src/components/PlayerWrapper/index.tsx) with the instructional text for your new role.

1. If there are any new actions required for your role (for example), you will need to update both the [VillageService](../src/service/Village/index.ts) and [WebSocketVillageProvider](../src/provider/Village/WebSocket/index.ts). Especially in the web socket provider, note that you will need to add a new `type` that implements `SocketMessage` - the types are all contained in the provider, so it should be fairly self-explanatory.

1. Create any relevant components for your new role. Generally this will usually be extending an existing functionality-based component, such as the [PickSinglePlayer](../src/components/Views/PickSinglePlayer) collection of components. See the [existing Views folder](../src/components/Views) for examples.

1. Modify the [ViewController](../src/components/ViewController/index.tsx) by updating the `COMPONENT_MATRIX` with your new role for _all phases_, adding your new phase if required. You should be able to discern the pattern being used by the other phase/role combinations.

1. Ideally, write tests for any new functionality you have added (ie components, connectors, modifications to the Village service and WebSocket provider)

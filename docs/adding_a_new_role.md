# Adding a New Role

First you will need to update the `PLAYER_ROLE` enum in the [player types](../src/types/player.ts). If your new role also requires a new phase, then you will also need to update the`PHASE_NAME` enum in the [phase types](../src/types/phase.ts);

If there are any new actions required for your role (for example), you will need to update both the [VillageService](../src/service/Village/index.ts) and [WebSocketVillageProvider](../src/provider/Village/WebSocket/index.ts). Especially in the web socket provider, note that you will need to add a new `type` that implements `ISocketMessage` - the types are all contained in the provider, so it should be fairly self-explanatory.

Once that's done, create any relevant components for your new role. Generally this will be a "role-specific" component and a "not-that-role" component. See the [existing Views folder](../src/components/Views) for examples.

_Note:_ The above will change after the refactor described in the [Component Design Doc](component_design.md) has been completed.

You will then need to modify [ViewController](../src/components/ViewController/index.tsx) by updating the `COMPONENT_MATRIX` with your new role for _all phases_, adding your new phase if required. You should be able to discern the pattern being used by the other phase/role combinations.

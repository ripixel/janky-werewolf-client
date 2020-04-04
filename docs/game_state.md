# Proposed Game State

To be able to track the game state on the client side (regardless of how the data gets into the application), Redux should be used. This allows for global state management and a single source of truth.

## When to use Local State

Redux will be used for global state management, however for things that are not globally required (ie, internal voting screens) contain these in appropriate components using local state hook.

## Redux Reducers

### Root State

```typescript
interface IState {
  user: IUserState;
  game?: IGameState;
}
```

### User

The user currently accessing the application.

```typescript
interface IUserState {
  id: string; // generated and stored in localStorage, will be a guid - specific to each device. Used to identify user to the server
  name?: string; // defined when joining a game
}
```

### Player

A player present in the game.

```typescript
enum PLAYER_ROLE {
  UNKNOWN = 'UNKNOWN',
  VILLAGER = 'VILLAGER',
  SEER = 'SEER',
  WEREWOLF = 'WEREWOLF',
}

enum PLAYER_TEAM {
  UNKNOWN = 'UNKNOWN',
  GOOD = 'GOOD',
  EVIL = 'EVIL',
}

interface IPlayer {
  id: string; // *NOT* a user ID, is a *player* ID
  name: string;
  role?: PLAYER_ROLE; // Optional, as moderator will not have it
  team?: PLAYER_TEAM; // Optional, as moderator will not have it
  alive?: boolean; // Optional, as moderator will not have it
}
```

### Phases

State for each game phase.

```typescript
enum PHASE_NAME {
  LOBBY = 'LOBBY',
  WELCOME = 'WELCOME',
  AFTERNOON = 'AFTERNOON',
  NIGHT = 'NIGHT',
  MORNING = 'MORNING',
  END = 'END',
}

interface IPhase<T> {
  name: PHASE_NAME;
  data: T; // will be defined on an each-phase basis, ie ILobbyData | IWelcomeData | ...etc;
}
```

### Game

Main game state.

```typescript
// will be null/undefined prior to joining a game
interface IGameState {
  gameCode: string; // the game join code used
  villageName: string;
  moderator?: IPlayer; // optional as initially there will not be a moderator until one is promoted
  players: IPlayer[];
  phase: IPhase;
}
```

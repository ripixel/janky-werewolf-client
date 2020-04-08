export enum PLAYER_ROLE {
  UNKNOWN = 'UNKNOWN',
  VILLAGER = 'VILLAGER',
  SEER = 'SEER',
  WEREWOLF = 'WEREWOLF',
}

export enum PLAYER_TEAM {
  UNKNOWN = 'UNKNOWN',
  GOOD = 'GOOD',
  EVIL = 'EVIL',
}

interface IPlayerAttributes {
  role: PLAYER_ROLE;
  team: PLAYER_TEAM;
  alive: boolean;
}

export interface IPlayer {
  id: string; // *NOT* a user ID, is a *player* ID
  name: string;
  attributes?: IPlayerAttributes; // Optional, as moderator will not have it
}

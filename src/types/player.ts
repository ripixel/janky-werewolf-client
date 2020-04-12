export enum PLAYER_ROLE {
  UNKNOWN = 'Unknown',
  VILLAGER = 'Villager',
  SEER = 'Seer',
  WEREWOLF = 'Werewolf',
  MODERATOR = 'Mod',
}

export enum PLAYER_TEAM {
  UNKNOWN = 'Unknown',
  GOOD = 'Good',
  EVIL = 'Evil',
}

interface IPlayerAttributes {
  role: PLAYER_ROLE;
  team: PLAYER_TEAM;
  alive: boolean;
}

export interface IPlayer {
  id: string; // *NOT* a user ID, is a *player* ID
  name: string;
  attributes: IPlayerAttributes; // Optional, as moderator will not have it
}

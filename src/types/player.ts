export enum PLAYER_ROLE {
  UNKNOWN = 'Unknown',
  VILLAGER = 'Villager',
  SEER = 'Seer',
  WEREWOLF = 'Werewolf',
  MODERATOR = 'Mod',
  BODYGUARD = 'Bodyguard',
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
  name: string;
  attributes: IPlayerAttributes;
}

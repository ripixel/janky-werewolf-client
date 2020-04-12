import { PLAYER_TEAM } from './player';

export enum PHASE_NAME {
  LOBBY = 'Lobby',
  DAY = 'Day',
  SEER = 'Seer',
  WEREWOLF = 'Werewolf',
  END = 'End',
}

export interface IPhase<T extends PHASE_NAME, U = undefined> {
  name: T;
  data?: U;
}

export interface IWerewolfPhaseData {
  [key: string]: string;
}

export interface IEndPhaseData {
  winner: PLAYER_TEAM.EVIL | PLAYER_TEAM.GOOD;
}

type TLobbyPhase = IPhase<PHASE_NAME.LOBBY>;
type TDayPhase = IPhase<PHASE_NAME.DAY>;
type TSeerPhase = IPhase<PHASE_NAME.SEER>;
type TWerewolfPhase = IPhase<PHASE_NAME.WEREWOLF, IWerewolfPhaseData>;
type TEndPhase = IPhase<PHASE_NAME.END, IEndPhaseData>;

export type TPhases =
  | TLobbyPhase
  | TDayPhase
  | TSeerPhase
  | TWerewolfPhase
  | TEndPhase;

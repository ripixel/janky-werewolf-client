import { PLAYER_TEAM } from './player';

export enum PHASE_NAME {
  LOBBY = 'Lobby',
  DAY = 'Day',
  SEER = 'Seer',
  WEREWOLF = 'Werewolf',
  BODYGUARD = 'Bodyguard',
  END = 'End',
}

export interface Phase<T extends PHASE_NAME, U = undefined> {
  name: T;
  data?: U;
}

export interface WerewolfPhaseData {
  [key: string]: string;
}

export interface BodyguardPhaseData {
  last_saved: string; // sometimes this comes back, sometimes it doesn't... will investigate
}

export interface EndPhaseData {
  winner: PLAYER_TEAM.EVIL | PLAYER_TEAM.GOOD;
}

type LobbyPhase = Phase<PHASE_NAME.LOBBY>;
type DayPhase = Phase<PHASE_NAME.DAY>;
type SeerPhase = Phase<PHASE_NAME.SEER>;
type WerewolfPhase = Phase<PHASE_NAME.WEREWOLF, WerewolfPhaseData>;
type BodyguardPhase = Phase<PHASE_NAME.BODYGUARD>;
type EndPhase = Phase<PHASE_NAME.END, EndPhaseData>;

export type Phases =
  | LobbyPhase
  | DayPhase
  | SeerPhase
  | WerewolfPhase
  | BodyguardPhase
  | EndPhase;

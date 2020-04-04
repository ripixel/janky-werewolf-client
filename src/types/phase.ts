export enum PHASE_NAME {
  LOBBY = 'LOBBY',
  WELCOME = 'WELCOME',
  AFTERNOON = 'AFTERNOON',
  NIGHT = 'NIGHT',
  MORNING = 'MORNING',
  END = 'END',
}

export interface IPhase<T extends PHASE_NAME, U> {
  name: T;
  data: U;
}

type TLobbyPhase = IPhase<PHASE_NAME.LOBBY, undefined>;

export type TPhases = TLobbyPhase;

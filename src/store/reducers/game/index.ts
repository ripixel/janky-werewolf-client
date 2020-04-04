import { Action } from 'redux';
import { IPlayer } from '../../../types/player';
import { TPhases } from '../../../types/phase';

export interface IGameState {
  gameCode: string; // the game join code used
  villageName: string;
  moderator?: IPlayer; // optional as initially there will not be a moderator until one is promoted
  players: IPlayer[];
  phase: TPhases;
}

export const gameReducer = (
  state: IGameState | null = null, // possibly null, as game is not present before joining
  action: Action
): IGameState | null => {
  switch (action.type) {
    default:
      return state;
  }
};

export default gameReducer;

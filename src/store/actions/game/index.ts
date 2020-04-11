import { IGameState } from '../../reducers/game';
import { IAction } from '../types';

export enum GAME_ACTION_TYPES {
  INIT_GAME = 'GAME-INIT_GAME',
  UPDATE_GAME = 'GAME-UPDATE_GAME',
}

export type TInitGameAction = IAction<IGameState>;
export const initGame = (gameState: IGameState): TInitGameAction => ({
  type: GAME_ACTION_TYPES.INIT_GAME,
  payload: { ...gameState },
});

export type TUpdateGameAction = IAction<IGameState>;
export const updateGame = (gameState: IGameState): TUpdateGameAction => ({
  type: GAME_ACTION_TYPES.UPDATE_GAME,
  payload: { ...gameState },
});

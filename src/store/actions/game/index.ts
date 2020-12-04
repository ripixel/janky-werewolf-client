import { GameState } from '../../reducers/game';
import { Action } from '../types';

export enum GAME_ACTION_TYPES {
  INIT_GAME = 'GAME-INIT_GAME',
  UPDATE_GAME = 'GAME-UPDATE_GAME',
}

export type InitGameAction = Action<GameState>;
export const initGame = (gameState: GameState): InitGameAction => ({
  type: GAME_ACTION_TYPES.INIT_GAME,
  payload: { ...gameState },
});

export type UpdateGameAction = Action<GameState>;
export const updateGame = (gameState: GameState): UpdateGameAction => ({
  type: GAME_ACTION_TYPES.UPDATE_GAME,
  payload: { ...gameState },
});

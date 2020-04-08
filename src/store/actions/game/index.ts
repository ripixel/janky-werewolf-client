import { IGameState } from '../../reducers/game';
import { IAction } from '../types';

export enum GAME_ACTION_TYPES {
  INIT_GAME = 'GAME-INIT_GAME',
}

export type TInitGameAction = IAction<IGameState>;

export const initGame = (gameState: IGameState): TInitGameAction => ({
  type: GAME_ACTION_TYPES.INIT_GAME,
  payload: { ...gameState },
});

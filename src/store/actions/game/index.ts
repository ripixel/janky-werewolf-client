import { GameStateFromSocket } from '../../../provider/Village/WebSocket';
import { Action } from '../types';

export enum GAME_ACTION_TYPES {
  INIT_GAME = 'GAME-INIT_GAME',
  UPDATE_GAME = 'GAME-UPDATE_GAME',
  DISMISS_ALERT = 'GAME-DISMISS_ALERT',
}

export type InitGameAction = Action<GameStateFromSocket>;
export const initGame = (gameState: GameStateFromSocket): InitGameAction => ({
  type: GAME_ACTION_TYPES.INIT_GAME,
  payload: { ...gameState },
});

export type UpdateGameAction = Action<GameStateFromSocket>;
export const updateGame = (
  gameState: GameStateFromSocket
): UpdateGameAction => ({
  type: GAME_ACTION_TYPES.UPDATE_GAME,
  payload: { ...gameState },
});

export type DismissAlertAction = Action<{ alertId: string }>;
export const dismissAlert = (id: string): DismissAlertAction => ({
  type: GAME_ACTION_TYPES.DISMISS_ALERT,
  payload: { alertId: id },
});

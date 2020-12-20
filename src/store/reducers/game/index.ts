import { Player } from '../../../types/player';
import { Phases } from '../../../types/phase';
import {
  GAME_ACTION_TYPES,
  InitGameAction,
  UpdateGameAction,
} from '../../actions/game';
import { Action } from '../../actions/types';

export interface GameState {
  lobbyId: string; // the game join code used
  villageName: string;
  players: Player[];
  phase: Phases;
  oldPlayers?: Player[];
}

export const gameReducer = (
  state: GameState | null = null, // possibly null, as game is not present before joining
  action: Action
): GameState | null => {
  switch (action.type) {
    case GAME_ACTION_TYPES.INIT_GAME:
      return state ? state : { ...(action as InitGameAction).payload };
    case GAME_ACTION_TYPES.UPDATE_GAME:
      if (!state) {
        throw new Error('No game exists to update - needs init first');
      }

      return {
        ...(action as UpdateGameAction).payload,
        oldPlayers: state.players,
      };
    default:
      return state;
  }
};

export default gameReducer;

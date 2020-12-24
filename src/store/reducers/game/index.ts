import { Player } from '../../../types/player';
import { Phases } from '../../../types/phase';
import {
  DismissAlertAction,
  GAME_ACTION_TYPES,
  InitGameAction,
  UpdateGameAction,
} from '../../actions/game';
import { Action } from '../../actions/types';
import { calculatePlayerChanges } from '../../../utils/calculatePlayerChanges';

export enum ALERT_ICON {
  DEATH = 'DEATH',
  TEAM_EVIL = 'TEAM_EVIL',
  TEAM_GOOD = 'TEAM_GOOD',
}

export interface Alert {
  id: string;
  title: string;
  content: string;
  icon: ALERT_ICON;
  subject: string; // player name
  dismissed?: boolean;
}

export interface GameState {
  lobbyId: string; // the game join code used
  villageName: string;
  players: Player[];
  phase: Phases;
  alerts: Alert[];
}

export const gameReducer = (
  state: GameState | null = null, // possibly null, as game is not present before joining
  action: Action
): GameState | null => {
  switch (action.type) {
    case GAME_ACTION_TYPES.INIT_GAME:
      return state
        ? state
        : { ...(action as InitGameAction).payload, alerts: [] };
    case GAME_ACTION_TYPES.UPDATE_GAME:
      if (!state) {
        throw new Error('No game exists to update - needs init first');
      }

      const payload = (action as UpdateGameAction).payload;

      return {
        ...payload,
        alerts: [
          ...state.alerts,
          ...calculatePlayerChanges(state.players, payload.players),
        ],
      };
    case GAME_ACTION_TYPES.DISMISS_ALERT:
      if (!state) {
        throw new Error('No game exists to update - needs init first');
      }

      const alertId = (action as DismissAlertAction).payload.alertId;

      const alerts = [...state.alerts];
      const alert = alerts.find(
        (alertFromState) => alertFromState.id === alertId
      );

      if (!alert) {
        throw new Error(
          'Could not find alert to dismiss with ID of ' + alertId
        );
      }

      alert.dismissed = true;

      return {
        ...state,
        alerts,
      };
    default:
      return state;
  }
};

export default gameReducer;

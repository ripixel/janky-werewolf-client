import { PHASE_NAME } from '../../../types/phase';
import { initGame, updateGame, GAME_ACTION_TYPES, dismissAlert } from '.';
import { GameStateFromSocket } from '../../../provider/Village/WebSocket';

describe('Store > Actions > Game', () => {
  describe('initGame', () => {
    const mockGameState: GameStateFromSocket = {
      lobbyId: '12test34',
      phase: {
        name: PHASE_NAME.LOBBY,
        data: undefined,
      },
      players: [],
      villageName: 'test village',
    };

    it('returns as expected', () => {
      expect(initGame(mockGameState)).toEqual({
        type: GAME_ACTION_TYPES.INIT_GAME,
        payload: { ...mockGameState },
      });
    });
  });

  describe('updateGame', () => {
    const mockGameState: GameStateFromSocket = {
      lobbyId: '12test34',
      phase: {
        name: PHASE_NAME.LOBBY,
        data: undefined,
      },
      players: [],
      villageName: 'test village',
    };

    it('returns as expected', () => {
      expect(updateGame(mockGameState)).toEqual({
        type: GAME_ACTION_TYPES.UPDATE_GAME,
        payload: { ...mockGameState },
      });
    });
  });

  describe('dismissAlert', () => {
    it('returns as expected', () => {
      expect(dismissAlert('test-id')).toEqual({
        type: GAME_ACTION_TYPES.DISMISS_ALERT,
        payload: {
          alertId: 'test-id',
        },
      });
    });
  });
});

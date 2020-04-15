import { IGameState } from '../../reducers/game';
import { PHASE_NAME } from '../../../types/phase';
import { initGame, updateGame, GAME_ACTION_TYPES } from '.';

describe('Game Actions', () => {
  describe('initGame', () => {
    const mockGameState: IGameState = {
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
    const mockGameState: IGameState = {
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
});

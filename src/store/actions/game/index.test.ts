import { IGameState } from '../../reducers/game';
import { PHASE_NAME } from '../../../types/phase';
import { initGame, GAME_ACTION_TYPES } from '.';

describe('Game Actions', () => {
  describe('initGame', () => {
    const mockGameState: IGameState = {
      gameCode: '12test34',
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
});

import gameReducer, { IGameState } from '.';
import { PHASE_NAME } from '../../../types/phase';

describe('store > reducers > game', () => {
  describe('with an unknown action', () => {
    const action = { type: 'UNKNOWN' };

    it('has no effect on null state', () => {
      expect(gameReducer(null, action)).toBeNull();
    });

    it('has no effect on non-null state', () => {
      const state: IGameState = {
        gameCode: '123',
        villageName: 'Test Village',
        players: [],
        phase: {
          name: PHASE_NAME.LOBBY,
          data: undefined,
        },
      };

      expect(gameReducer(state, action)).toEqual(state);
    });
  });
});

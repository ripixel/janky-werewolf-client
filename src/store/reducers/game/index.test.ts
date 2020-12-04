import { PHASE_NAME } from '../../../types/phase';
import { GAME_ACTION_TYPES, InitGameAction } from '../../actions/game';
import gameReducer, { GameState } from '.';

describe('store > reducers > game', () => {
  const mockGameState: GameState = {
    lobbyId: '123',
    villageName: 'Test Village',
    players: [],
    phase: {
      name: PHASE_NAME.LOBBY,
      data: undefined,
    },
  };
  describe('with an unknown action', () => {
    const action = { type: 'UNKNOWN', payload: undefined };

    it('has no effect on null state', () => {
      expect(gameReducer(null, action)).toBeNull();
    });

    it('has no effect on non-null state', () => {
      expect(gameReducer(mockGameState, action)).toEqual(mockGameState);
    });
  });

  describe(`with ${GAME_ACTION_TYPES.INIT_GAME} action`, () => {
    const mockAction: InitGameAction = {
      type: GAME_ACTION_TYPES.INIT_GAME,
      payload: { ...mockGameState, villageName: 'Another Village' },
    };
    it('inits new game on null state', () => {
      expect(gameReducer(null, mockAction)).toEqual(mockAction.payload);
    });

    it('does not overwrite existing game state', () => {
      expect(gameReducer(mockGameState, mockAction)).toEqual(mockGameState);
    });
  });

  describe(`with ${GAME_ACTION_TYPES.INIT_GAME} action`, () => {
    const mockAction: InitGameAction = {
      type: GAME_ACTION_TYPES.UPDATE_GAME,
      payload: { ...mockGameState, villageName: 'Another Village' },
    };
    it('throws as expected on null state', () => {
      expect(() => gameReducer(null, mockAction)).toThrow();
    });

    it('overwrites existing game state', () => {
      expect(gameReducer(mockGameState, mockAction)).toEqual(
        mockAction.payload
      );
    });
  });
});

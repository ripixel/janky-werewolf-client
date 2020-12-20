import { PHASE_NAME } from '../../../types/phase';
import {
  GAME_ACTION_TYPES,
  InitGameAction,
  UpdateGameAction,
} from '../../actions/game';
import gameReducer, { GameState } from '.';
import { PLAYER_ROLE, PLAYER_TEAM } from '../../../types/player';

describe('Store > Reducers > Game', () => {
  const mockGameState: GameState = {
    lobbyId: '123',
    villageName: 'Test Village',
    players: [],
    oldPlayers: [],
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

  describe(`with ${GAME_ACTION_TYPES.UPDATE_GAME} action`, () => {
    const mockAction: UpdateGameAction = {
      type: GAME_ACTION_TYPES.UPDATE_GAME,
      payload: {
        ...mockGameState,
        villageName: 'Updated Village',
        players: [
          {
            name: 'Timothy',
            attributes: {
              role: PLAYER_ROLE.MODERATOR,
              team: PLAYER_TEAM.UNKNOWN,
              alive: true,
            },
          },
        ],
      },
    };

    it('updates previous players into state', () => {
      expect(gameReducer(mockAction.payload, mockAction)).toEqual({
        ...mockAction.payload,
        oldPlayers: mockAction.payload.players,
      });
    });
  });
});

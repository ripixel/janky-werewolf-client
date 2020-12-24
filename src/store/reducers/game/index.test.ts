import { PHASE_NAME } from '../../../types/phase';
import {
  DismissAlertAction,
  GAME_ACTION_TYPES,
  InitGameAction,
  UpdateGameAction,
} from '../../actions/game';
import gameReducer, { ALERT_ICON, GameState } from '.';
import { PLAYER_ROLE, PLAYER_TEAM } from '../../../types/player';

jest.mock('uuid', () => ({
  v4: (): string => 'uuid-v4',
}));

describe('Store > Reducers > Game', () => {
  const mockGameState: GameState = {
    lobbyId: '123',
    villageName: 'Test Village',
    players: [
      {
        name: 'Timothy',
        attributes: {
          role: PLAYER_ROLE.UNKNOWN,
          team: PLAYER_TEAM.UNKNOWN,
          alive: true,
        },
      },
    ],
    phase: {
      name: PHASE_NAME.LOBBY,
      data: undefined,
    },
    alerts: [],
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

  describe(`with ${GAME_ACTION_TYPES.UPDATE_GAME} action`, () => {
    const mockAction: UpdateGameAction = {
      type: GAME_ACTION_TYPES.UPDATE_GAME,
      payload: { ...mockGameState, villageName: 'Another Village' },
    };

    it('throws as expected on null state', () => {
      expect(() => gameReducer(null, mockAction)).toThrow();
    });

    it('overwrites existing game state', () => {
      expect(gameReducer(mockGameState, mockAction)).toEqual({
        ...mockAction.payload,
        alerts: [],
      });
    });

    describe('updates the alerts array as appropriate', () => {
      it('creates a death alert', () => {
        const mockAlertingAction: UpdateGameAction = {
          type: GAME_ACTION_TYPES.UPDATE_GAME,
          payload: {
            ...mockGameState,
            villageName: 'Updated Village',
            players: [
              {
                name: 'Timothy',
                attributes: {
                  role: PLAYER_ROLE.BODYGUARD,
                  team: PLAYER_TEAM.GOOD,
                  alive: false,
                },
              },
            ],
          },
        };

        expect(gameReducer(mockGameState, mockAlertingAction)).toEqual({
          ...mockAlertingAction.payload,
          alerts: [
            {
              id: 'uuid-v4',
              content:
                'It appears as though Timothy died a tragic death. They were a Bodyguard, on the Good team.',
              icon: 'DEATH',
              title: 'Timothy was killed!',
              subject: 'Timothy',
            },
          ],
        });
      });

      it('creates a role alert', () => {
        const mockAlertingAction: UpdateGameAction = {
          type: GAME_ACTION_TYPES.UPDATE_GAME,
          payload: {
            ...mockGameState,
            villageName: 'Updated Village',
            players: [
              {
                name: 'Timothy',
                attributes: {
                  role: PLAYER_ROLE.UNKNOWN,
                  team: PLAYER_TEAM.GOOD,
                  alive: true,
                },
              },
            ],
          },
        };

        expect(gameReducer(mockGameState, mockAlertingAction)).toEqual({
          ...mockAlertingAction.payload,
          alerts: [
            {
              id: 'uuid-v4',
              content: "You've found out some information! Aren't you clever!",
              icon: 'TEAM_GOOD',
              title: 'Timothy is Good',
              subject: 'Timothy',
            },
          ],
        });
      });
    });
  });

  describe(`with ${GAME_ACTION_TYPES.DISMISS_ALERT} action`, () => {
    const mockAction: DismissAlertAction = {
      type: GAME_ACTION_TYPES.DISMISS_ALERT,
      payload: { alertId: 'test-id' },
    };

    it('throws as expected on null state', () => {
      expect(() => gameReducer(null, mockAction)).toThrow();
    });

    it('throws as expected when it cannot find an applicable alert', () => {
      expect(() => gameReducer(mockGameState, mockAction)).toThrow();
    });

    it('updates the dismissed alert within state', () => {
      const mockAlert = {
        title: 'Test Title',
        content: 'Test Content',
        icon: ALERT_ICON.DEATH,
        subject: 'Dave',
        id: 'test-id',
      };

      const result = gameReducer(
        {
          ...mockGameState,
          alerts: [mockAlert],
        },
        mockAction
      );

      expect(result).toEqual({
        ...mockGameState,
        alerts: [{ ...mockAlert, dismissed: true }],
      });
    });
  });
});

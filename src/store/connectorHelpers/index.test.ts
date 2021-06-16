/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getAllPlayers,
  getPhaseName,
  getPlayersWithoutRole,
  getPlayersWithRole,
  getSelf,
  getUnreadAlerts,
  getWerewolfVotes,
} from '.';
import { PLAYER_ROLE } from '../../types/player';
import { ALERT_ICON } from '../reducers/game';

describe('Store > Connector Helpers', () => {
  describe('getSelf', () => {
    it('returns self when present', () => {
      const mockState = {
        game: {
          players: [
            {
              name: 'dave',
            },
          ],
        },
        user: {
          name: 'dave',
        },
      } as any;

      const result = getSelf(mockState);

      expect(result).toEqual(mockState.game.players[0]);
    });

    it('returns undefined when cannot find self', () => {
      const mockState = {
        game: {
          players: [
            {
              name: 'dave',
            },
          ],
        },
        user: {
          name: 'tom',
        },
      } as any;

      const result = getSelf(mockState);

      expect(result).toBeUndefined();
    });
  });

  describe('getAllPlayers', () => {
    it('returns all players', () => {
      const mockState = {
        game: {
          players: [
            {
              name: 'dave',
            },
            {
              name: 'tom',
            },
          ],
        },
      } as any;

      const result = getAllPlayers(mockState);

      expect(result).toEqual(mockState.game.players);
    });

    it('excludes self when requested', () => {
      const mockState = {
        game: {
          players: [
            {
              name: 'dave',
            },
            {
              name: 'tom',
            },
          ],
        },
        user: {
          name: 'dave',
        },
      } as any;

      const result = getAllPlayers(mockState, true);

      expect(result).toEqual([mockState.game.players[1]]);
    });
  });

  describe('getPlayersWithRole', () => {
    it('returns all players with the desired role', () => {
      const mockState = {
        game: {
          players: [
            {
              name: 'dave',
              attributes: { role: PLAYER_ROLE.SEER },
            },
            {
              name: 'tom',
              attributes: { role: PLAYER_ROLE.SEER },
            },
            {
              name: 'alex',
              attributes: { role: PLAYER_ROLE.MODERATOR },
            },
          ],
        },
      } as any;

      const result = getPlayersWithRole(mockState, PLAYER_ROLE.SEER);

      expect(result).toEqual([
        mockState.game.players[0],
        mockState.game.players[1],
      ]);
    });

    it('returns an empty array if no players match', () => {
      const mockState = {
        game: {
          players: [
            {
              name: 'dave',
              attributes: { role: PLAYER_ROLE.SEER },
            },
            {
              name: 'tom',
              attributes: { role: PLAYER_ROLE.SEER },
            },
            {
              name: 'alex',
              attributes: { role: PLAYER_ROLE.MODERATOR },
            },
          ],
        },
      } as any;

      const result = getPlayersWithRole(mockState, PLAYER_ROLE.VILLAGER);

      expect(result).toEqual([]);
    });

    it('excludes self when requested', () => {
      const mockState = {
        game: {
          players: [
            {
              name: 'dave',
              attributes: { role: PLAYER_ROLE.SEER },
            },
            {
              name: 'tom',
              attributes: { role: PLAYER_ROLE.SEER },
            },
            {
              name: 'alex',
              attributes: { role: PLAYER_ROLE.MODERATOR },
            },
          ],
        },
        user: {
          name: 'tom',
        },
      } as any;

      const result = getPlayersWithRole(mockState, PLAYER_ROLE.SEER, true);

      expect(result).toEqual([mockState.game.players[0]]);
    });
  });

  describe('getPlayersWithoutRole', () => {
    it('returns all players without the desired role', () => {
      const mockState = {
        game: {
          players: [
            {
              name: 'dave',
              attributes: { role: PLAYER_ROLE.SEER },
            },
            {
              name: 'tom',
              attributes: { role: PLAYER_ROLE.SEER },
            },
            {
              name: 'alex',
              attributes: { role: PLAYER_ROLE.MODERATOR },
            },
          ],
        },
      } as any;

      const result = getPlayersWithoutRole(mockState, PLAYER_ROLE.MODERATOR);

      expect(result).toEqual([
        mockState.game.players[0],
        mockState.game.players[1],
      ]);
    });

    it('returns an empty array if no players match', () => {
      const mockState = {
        game: {
          players: [
            {
              name: 'dave',
              attributes: { role: PLAYER_ROLE.SEER },
            },
            {
              name: 'tom',
              attributes: { role: PLAYER_ROLE.SEER },
            },
          ],
        },
      } as any;

      const result = getPlayersWithoutRole(mockState, PLAYER_ROLE.SEER);

      expect(result).toEqual([]);
    });

    it('excludes self when requested', () => {
      const mockState = {
        game: {
          players: [
            {
              name: 'dave',
              attributes: { role: PLAYER_ROLE.SEER },
            },
            {
              name: 'tom',
              attributes: { role: PLAYER_ROLE.SEER },
            },
            {
              name: 'alex',
              attributes: { role: PLAYER_ROLE.MODERATOR },
            },
          ],
        },
        user: {
          name: 'tom',
        },
      } as any;

      const result = getPlayersWithoutRole(
        mockState,
        PLAYER_ROLE.MODERATOR,
        true
      );

      expect(result).toEqual([mockState.game.players[0]]);
    });
  });

  describe('getPhaseName', () => {
    it('returns the phase name', () => {
      const mockState = {
        game: {
          phase: {
            name: 'day',
          },
        },
      } as any;

      const result = getPhaseName(mockState);

      expect(result).toEqual('day');
    });
  });

  describe('getWerewolfVotes', () => {
    it('returns the formatted werewolf votes excluding mods and werewolves', () => {
      const mockState = {
        game: {
          players: [
            {
              name: 'dave',
              attributes: { role: PLAYER_ROLE.MODERATOR, alive: true },
            },
            {
              name: 'tom',
              attributes: { role: PLAYER_ROLE.WEREWOLF, alive: true },
            },
            {
              name: 'mike',
              attributes: { role: PLAYER_ROLE.WEREWOLF, alive: true },
            },
            {
              name: 'alex',
              attributes: { role: PLAYER_ROLE.VILLAGER, alive: true },
            },
            {
              name: 'harry',
              attributes: { role: PLAYER_ROLE.BODYGUARD, alive: true },
            },
            {
              name: 'james',
              attributes: { role: PLAYER_ROLE.BODYGUARD, alive: false },
            },
          ],
          phase: {
            data: {
              tom: 'harry',
              mike: 'alex',
            },
          },
        },
      } as any;

      const result = getWerewolfVotes(mockState);

      expect(result).toEqual({
        harry: 1,
        alex: 1,
      });
    });

    it('returns an empty object if no players', () => {
      const mockState = {
        game: {
          players: [],
          phase: {
            data: {
              tom: 'harry',
              mike: 'alex',
            },
          },
        },
      } as any;

      const result = getWerewolfVotes(mockState);

      expect(result).toEqual({});
    });
  });

  describe('getUnreadAlerts', () => {
    it('returns applicable alerts', () => {
      const mockState = {
        game: {
          alerts: [
            // Should be ignored because the subject is the user
            {
              title: 'Test Title',
              content: 'Test Content',
              icon: ALERT_ICON.DEATH,
              subject: 'Dave',
              id: 'test-id-1',
            },
            // Should be ignored because dismissed = true
            {
              title: 'Test Title',
              content: 'Test Content',
              icon: ALERT_ICON.DEATH,
              subject: 'James',
              id: 'test-id-2',
              dismissed: true,
            },
            // Applicable
            {
              title: 'Test Title',
              content: 'Test Content',
              icon: ALERT_ICON.DEATH,
              subject: 'Mike',
              id: 'test-id-3',
            },
          ],
        },
        user: {
          name: 'Dave',
        },
      } as any;

      const result = getUnreadAlerts(mockState);

      expect(result).toEqual([mockState.game.alerts[2]]);
    });
  });
});

import { Player, PLAYER_ROLE, PLAYER_TEAM } from '../../types/player';

import { calculatePlayerChanges } from '.';

jest.mock('uuid', () => ({
  v4: (): string => 'uuid-v4',
}));

describe('Utils > calculatePlayerChanges', () => {
  describe('reports changes correctly', () => {
    describe('detects kills', () => {
      it('with a single player', () => {
        const oldPlayers: Player[] = [
          {
            name: 'Timothy',
            attributes: {
              role: PLAYER_ROLE.UNKNOWN,
              team: PLAYER_TEAM.UNKNOWN,
              alive: true,
            },
          },
        ];

        const newPlayers: Player[] = [
          {
            name: 'Timothy',
            attributes: {
              role: PLAYER_ROLE.UNKNOWN,
              team: PLAYER_TEAM.UNKNOWN,
              alive: false,
            },
          },
        ];

        const result = calculatePlayerChanges(oldPlayers, newPlayers);

        expect(result).toEqual([
          {
            content:
              'It appears as though Timothy died a tragic death. They were a Unknown, on the Unknown team.',
            icon: 'DEATH',
            id: 'uuid-v4',
            subject: 'Timothy',
            title: 'Timothy was killed!',
          },
        ]);
      });

      it('with multiple players', () => {
        const oldPlayers: Player[] = [
          {
            name: 'Timothy',
            attributes: {
              role: PLAYER_ROLE.UNKNOWN,
              team: PLAYER_TEAM.UNKNOWN,
              alive: true,
            },
          },
          {
            name: 'James',
            attributes: {
              role: PLAYER_ROLE.UNKNOWN,
              team: PLAYER_TEAM.UNKNOWN,
              alive: true,
            },
          },
        ];

        const newPlayers: Player[] = [
          {
            name: 'Timothy',
            attributes: {
              role: PLAYER_ROLE.UNKNOWN,
              team: PLAYER_TEAM.UNKNOWN,
              alive: true,
            },
          },
          {
            name: 'James',
            attributes: {
              role: PLAYER_ROLE.UNKNOWN,
              team: PLAYER_TEAM.UNKNOWN,
              alive: false,
            },
          },
        ];

        const result = calculatePlayerChanges(oldPlayers, newPlayers);

        expect(result).toEqual([
          {
            content:
              'It appears as though James died a tragic death. They were a Unknown, on the Unknown team.',
            icon: 'DEATH',
            id: 'uuid-v4',
            subject: 'James',
            title: 'James was killed!',
          },
        ]);
      });
    });

    describe('detects team reveals', () => {
      it('with a single player', () => {
        const oldPlayers: Player[] = [
          {
            name: 'Timothy',
            attributes: {
              role: PLAYER_ROLE.UNKNOWN,
              team: PLAYER_TEAM.UNKNOWN,
              alive: true,
            },
          },
        ];

        const newPlayers: Player[] = [
          {
            name: 'Timothy',
            attributes: {
              role: PLAYER_ROLE.UNKNOWN,
              team: PLAYER_TEAM.GOOD,
              alive: true,
            },
          },
        ];

        const result = calculatePlayerChanges(oldPlayers, newPlayers);

        expect(result).toEqual([
          {
            content: "You've found out some information! Aren't you clever!",
            icon: 'TEAM_GOOD',
            id: 'uuid-v4',
            subject: 'Timothy',
            title: 'Timothy is Good',
          },
        ]);
      });

      it('with multiple players', () => {
        const oldPlayers: Player[] = [
          {
            name: 'Timothy',
            attributes: {
              role: PLAYER_ROLE.UNKNOWN,
              team: PLAYER_TEAM.UNKNOWN,
              alive: true,
            },
          },
          {
            name: 'James',
            attributes: {
              role: PLAYER_ROLE.UNKNOWN,
              team: PLAYER_TEAM.UNKNOWN,
              alive: true,
            },
          },
        ];

        const newPlayers: Player[] = [
          {
            name: 'Timothy',
            attributes: {
              role: PLAYER_ROLE.UNKNOWN,
              team: PLAYER_TEAM.UNKNOWN,
              alive: true,
            },
          },
          {
            name: 'James',
            attributes: {
              role: PLAYER_ROLE.UNKNOWN,
              team: PLAYER_TEAM.EVIL,
              alive: true,
            },
          },
        ];

        const result = calculatePlayerChanges(oldPlayers, newPlayers);

        expect(result).toEqual([
          {
            content: "You've found out some information! Aren't you clever!",
            icon: 'TEAM_EVIL',
            id: 'uuid-v4',
            subject: 'James',
            title: 'James is Evil',
          },
        ]);
      });
    });

    it('reports a kill over a team reveal', () => {
      const oldPlayers: Player[] = [
        {
          name: 'Timothy',
          attributes: {
            role: PLAYER_ROLE.UNKNOWN,
            team: PLAYER_TEAM.UNKNOWN,
            alive: true,
          },
        },
      ];

      const newPlayers: Player[] = [
        {
          name: 'Timothy',
          attributes: {
            role: PLAYER_ROLE.BODYGUARD,
            team: PLAYER_TEAM.GOOD,
            alive: false,
          },
        },
      ];

      const result = calculatePlayerChanges(oldPlayers, newPlayers);

      expect(result).toEqual([
        {
          content:
            'It appears as though Timothy died a tragic death. They were a Bodyguard, on the Good team.',
          icon: 'DEATH',
          id: 'uuid-v4',
          subject: 'Timothy',
          title: 'Timothy was killed!',
        },
      ]);
    });
  });
});

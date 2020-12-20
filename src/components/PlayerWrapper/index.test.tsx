/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { PLAYER_ROLE, PLAYER_TEAM } from '../../types/player';
import { PHASE_NAME } from '../../types/phase';
import {
  getPhaseName,
  getPlayersWithoutRole,
  getSelf,
} from '../../store/connectorHelpers';

import { alertOnPlayerStateChanges, mapStateToProps, PlayerWrapper } from '.';

jest.mock('../../store/connectorHelpers', () => ({
  getPhaseName: jest.fn((): string => 'phase-name'),
  getPlayersWithoutRole: jest.fn((): string => 'players-without-role'),
  getSelf: jest.fn((): string => 'self'),
}));

describe('Components > PlayerWrapper', () => {
  describe('renders as expected', () => {
    it('throws an error if no self given', () => {
      expect(() =>
        render(
          <PlayerWrapper
            players={[]}
            oldPlayers={[]}
            phaseName={PHASE_NAME.LOBBY}
          />
        )
      ).toThrow('No game yet initialised!');
    });

    it('throws an error if no phaseName given', () => {
      expect(() =>
        render(
          <PlayerWrapper
            players={[]}
            oldPlayers={[]}
            self={{
              attributes: {
                alive: true,
                role: PLAYER_ROLE.UNKNOWN,
                team: PLAYER_TEAM.UNKNOWN,
              },
              name: 'tom',
            }}
          />
        )
      ).toThrow('No game yet initialised!');
    });

    it('shows player information box', () => {
      const result = render(
        <PlayerWrapper
          players={[]}
          oldPlayers={[]}
          self={{
            attributes: {
              alive: true,
              role: PLAYER_ROLE.UNKNOWN,
              team: PLAYER_TEAM.UNKNOWN,
            },
            name: 'tom',
          }}
          phaseName={PHASE_NAME.LOBBY}
        />
      );

      expect(result.getByText('tom')).toBeInTheDocument();
      expect(result.getByText('Unknown - Alive')).toBeInTheDocument();
    });

    it('shows child elements if alive', () => {
      const result = render(
        <PlayerWrapper
          players={[]}
          oldPlayers={[]}
          self={{
            attributes: {
              alive: true,
              role: PLAYER_ROLE.UNKNOWN,
              team: PLAYER_TEAM.UNKNOWN,
            },
            name: 'tom',
          }}
          phaseName={PHASE_NAME.LOBBY}
        >
          <p>Test Children</p>
        </PlayerWrapper>
      );

      expect(result.getByText('Test Children')).toBeInTheDocument();
    });

    it('does not show child elements if dead', () => {
      const result = render(
        <PlayerWrapper
          players={[]}
          oldPlayers={[]}
          self={{
            attributes: {
              alive: false,
              role: PLAYER_ROLE.UNKNOWN,
              team: PLAYER_TEAM.UNKNOWN,
            },
            name: 'tom',
          }}
          phaseName={PHASE_NAME.LOBBY}
        >
          <p>Test Children</p>
        </PlayerWrapper>
      );

      expect(
        result.getByText("You're dead! Ghosts can't talk, be quiet!")
      ).toBeInTheDocument();
      expect(() => result.getByText('Test Children')).toThrow();
    });

    it('shows instructions', () => {
      const result = render(
        <PlayerWrapper
          players={[]}
          oldPlayers={[]}
          self={{
            attributes: {
              alive: true,
              role: PLAYER_ROLE.VILLAGER,
              team: PLAYER_TEAM.GOOD,
            },
            name: 'tom',
          }}
          phaseName={PHASE_NAME.LOBBY}
        />
      );

      expect(result.getByText('Instructions')).toBeInTheDocument();
      expect(result.getByText('No special powers')).toBeInTheDocument();
      expect(
        result.getByText('You win when all the evil players are dead')
      ).toBeInTheDocument();
    });

    it('shows the player table', () => {
      const result = render(
        <PlayerWrapper
          players={[
            {
              attributes: {
                alive: true,
                role: PLAYER_ROLE.BODYGUARD,
                team: PLAYER_TEAM.GOOD,
              },
              name: 'dave',
            },
          ]}
          oldPlayers={[
            {
              attributes: {
                alive: true,
                role: PLAYER_ROLE.BODYGUARD,
                team: PLAYER_TEAM.GOOD,
              },
              name: 'dave',
            },
          ]}
          self={{
            attributes: {
              alive: true,
              role: PLAYER_ROLE.VILLAGER,
              team: PLAYER_TEAM.GOOD,
            },
            name: 'tom',
          }}
          phaseName={PHASE_NAME.LOBBY}
        />
      );

      expect(result.getByText('Players')).toBeInTheDocument();
      expect(result.getByText('Name')).toBeInTheDocument();
      expect(result.getByText('Team')).toBeInTheDocument();
      expect(result.getByText('Role')).toBeInTheDocument();
      expect(result.getAllByText('Alive')).toHaveLength(2); // 2 because of the table header and the value

      expect(result.getByText('dave')).toBeInTheDocument();
      expect(result.getByText('Good')).toBeInTheDocument();
      expect(result.getByText('Bodyguard')).toBeInTheDocument();
    });
  });

  describe('mapStateToProps', () => {
    it('returns correct props', () => {
      const mockState = {
        some: 'mock-state',
      } as any;

      const result = mapStateToProps(mockState);

      expect(getSelf).toHaveBeenCalledTimes(1);
      expect(getSelf).toHaveBeenCalledWith(mockState);
      expect(getPlayersWithoutRole).toHaveBeenCalledTimes(2);
      expect(getPlayersWithoutRole).toHaveBeenCalledWith(
        PLAYER_ROLE.MODERATOR,
        true,
        undefined,
        undefined
      );
      expect(getPhaseName).toHaveBeenCalledTimes(1);
      expect(getPhaseName).toHaveBeenCalledWith(mockState);

      expect(result).toEqual({
        self: 'self',
        players: 'players-without-role',
        oldPlayers: 'players-without-role',
        phaseName: 'phase-name',
      });
    });
  });

  describe('alertOnPlayerStateChanges', () => {
    let alertSpy: jest.SpyInstance;

    beforeEach(() => {
      jest.resetAllMocks();
      alertSpy = jest.spyOn(window, 'alert');
    });

    it('does not alert when no changes', () => {
      const oldPlayers = [
        {
          name: 'dave',
          attributes: {
            role: PLAYER_ROLE.UNKNOWN,
            team: PLAYER_TEAM.UNKNOWN,
            alive: true,
          },
        },
      ];
      const newPlayers = [
        {
          name: 'dave',
          attributes: {
            role: PLAYER_ROLE.UNKNOWN,
            team: PLAYER_TEAM.UNKNOWN,
            alive: true,
          },
        },
      ];

      alertOnPlayerStateChanges(oldPlayers, newPlayers);

      expect(alertSpy).toHaveBeenCalledTimes(0);
    });

    it('alerts changes about death', () => {
      const oldPlayers = [
        {
          name: 'dave',
          attributes: {
            role: PLAYER_ROLE.UNKNOWN,
            team: PLAYER_TEAM.UNKNOWN,
            alive: true,
          },
        },
        {
          name: 'tom',
          attributes: {
            role: PLAYER_ROLE.UNKNOWN,
            team: PLAYER_TEAM.UNKNOWN,
            alive: true,
          },
        },
      ];
      const newPlayers = [
        {
          name: 'dave',
          attributes: {
            role: PLAYER_ROLE.BODYGUARD,
            team: PLAYER_TEAM.GOOD,
            alive: false,
          },
        },
      ];

      alertOnPlayerStateChanges(oldPlayers, newPlayers);

      expect(alertSpy).toHaveBeenCalledTimes(1);
      expect(alertSpy).toHaveBeenCalledWith(
        'dave is now dead! They were a Bodyguard.'
      );
    });

    it('alerts changes about team revealing', () => {
      const oldPlayers = [
        {
          name: 'dave',
          attributes: {
            role: PLAYER_ROLE.UNKNOWN,
            team: PLAYER_TEAM.UNKNOWN,
            alive: true,
          },
        },
        {
          name: 'tom',
          attributes: {
            role: PLAYER_ROLE.UNKNOWN,
            team: PLAYER_TEAM.UNKNOWN,
            alive: true,
          },
        },
      ];
      const newPlayers = [
        {
          name: 'dave',
          attributes: {
            role: PLAYER_ROLE.BODYGUARD,
            team: PLAYER_TEAM.GOOD,
            alive: true,
          },
        },
      ];

      alertOnPlayerStateChanges(oldPlayers, newPlayers);

      expect(alertSpy).toHaveBeenCalledTimes(1);
      expect(alertSpy).toHaveBeenCalledWith(
        '[ONLY TO YOU] You now know that dave is Good.'
      );
    });
  });
});

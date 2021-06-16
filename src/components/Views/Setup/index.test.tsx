/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  render,
  queries,
  RenderResult,
  fireEvent,
} from '@testing-library/react';

import { VillageServiceContextProvider } from '../../../context/VillageService';
import { Player, PLAYER_ROLE, PLAYER_TEAM } from '../../../types/player';
import {
  getPlayersWithoutRole,
  getPlayersWithRole,
} from '../../../store/connectorHelpers';

import { mapStateToProps, Setup } from '.';

jest.mock('../../../store/connectorHelpers', () => ({
  getPlayersWithoutRole: jest.fn((): string => 'players-without-role'),
  getPlayersWithRole: jest.fn((): string[] => ['players-with-role-1']),
}));

const getTestPlayer = (): Player => ({
  name:
    'Test Player ' +
    Math.random()
      .toString(36)
      .substring(7),
  attributes: {
    alive: true,
    role: PLAYER_ROLE.UNKNOWN,
    team: PLAYER_TEAM.UNKNOWN,
  },
});

describe('<Setup />', () => {
  const baseProps = {
    villageName: 'Test Village',
    lobbyId: '12test34',
    moderator: {
      name: 'Test Moderator',
      attributes: {
        alive: true,
        role: PLAYER_ROLE.MODERATOR,
        team: PLAYER_TEAM.UNKNOWN,
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('renders as expected', () => {
    const expectStandard = (result: RenderResult<typeof queries>): void => {
      expect(result.getByText('Join Test Village using:')).toBeInTheDocument();
      expect(result.getByText('12test34')).toBeInTheDocument();

      expect(result.getByPlaceholderText('Villagers')).toHaveValue(0);
      expect(result.getByPlaceholderText('Werewolves')).toHaveValue(0);
      expect(result.getByRole('checkbox', { name: 'Seers' })).toBeChecked();

      expect(result.getByText('Start Game')).toBeInTheDocument();
    };

    it('with no moderator', () => {
      const mockVillageService: any = {
        startGame: jest.fn(),
      };

      const result = render(
        <VillageServiceContextProvider value={mockVillageService}>
          <Setup
            {...baseProps}
            moderator={undefined}
            players={[
              getTestPlayer(),
              getTestPlayer(),
              getTestPlayer(),
              getTestPlayer(),
            ]}
          />
        </VillageServiceContextProvider>
      );

      expect(result.container).toBeEmptyDOMElement();
    });

    // expectations are in expectStandard
    // eslint-disable-next-line jest/expect-expect
    it('with no players', () => {
      const result = render(<Setup {...baseProps} players={[]} />);

      expectStandard(result);
    });

    it('with one player', () => {
      const result = render(
        <Setup
          {...baseProps}
          players={[
            {
              name: 'Test Player',
              attributes: {
                alive: true,
                role: PLAYER_ROLE.UNKNOWN,
                team: PLAYER_TEAM.UNKNOWN,
              },
            },
          ]}
        />
      );

      expectStandard(result);

      expect(result.getByText('Test Player')).toBeInTheDocument();
    });

    it('with multiple player', () => {
      const result = render(
        <Setup
          {...baseProps}
          players={[
            {
              name: 'Test Player 1',
              attributes: {
                alive: true,
                role: PLAYER_ROLE.UNKNOWN,
                team: PLAYER_TEAM.UNKNOWN,
              },
            },
            {
              name: 'Test Player 2',
              attributes: {
                alive: true,
                role: PLAYER_ROLE.UNKNOWN,
                team: PLAYER_TEAM.UNKNOWN,
              },
            },
          ]}
        />
      );

      expectStandard(result);

      expect(result.getByText('Test Player 1')).toBeInTheDocument();
      expect(result.getByText('Test Player 2')).toBeInTheDocument();
    });
  });

  describe('Start Game button', () => {
    it('functions when deck setup is correct', async () => {
      const mockVillageService: any = {
        startGame: jest.fn(),
      };

      const result = render(
        <VillageServiceContextProvider value={mockVillageService}>
          <Setup
            {...baseProps}
            players={[
              getTestPlayer(),
              getTestPlayer(),
              getTestPlayer(),
              getTestPlayer(),
            ]}
            moderator={getTestPlayer()}
          />
        </VillageServiceContextProvider>
      );

      fireEvent.change(result.getByPlaceholderText('Werewolves'), {
        target: { value: '1' },
      });

      fireEvent.change(result.getByPlaceholderText('Villagers'), {
        target: { value: '2' },
      });
      await result.findByDisplayValue('2');

      fireEvent.click(result.getByText('Start Game'));

      expect(mockVillageService.startGame).toHaveBeenCalledTimes(1);
      expect(mockVillageService.startGame).toHaveBeenCalledWith(
        1,
        true,
        false,
        false
      );
    });

    describe('does not function when deck setup is incorrect', () => {
      it('with no players', async () => {
        const mockVillageService: any = {
          startGame: jest.fn(),
        };

        const result = render(
          <VillageServiceContextProvider value={mockVillageService}>
            <Setup {...baseProps} players={[]} moderator={getTestPlayer()} />
          </VillageServiceContextProvider>
        );

        fireEvent.change(result.getByPlaceholderText('Werewolves'), {
          target: { value: '1' },
        });

        fireEvent.change(result.getByPlaceholderText('Villagers'), {
          target: { value: '2' },
        });
        await result.findByDisplayValue('2');

        fireEvent.click(result.getByText('Start Game'));

        expect(mockVillageService.startGame).toHaveBeenCalledTimes(0);
      });

      it('with a mismatched number of players to roles', async () => {
        const mockVillageService: any = {
          startGame: jest.fn(),
        };

        const result = render(
          <VillageServiceContextProvider value={mockVillageService}>
            <Setup
              {...baseProps}
              players={[
                getTestPlayer(),
                getTestPlayer(),
                getTestPlayer(),
                getTestPlayer(),
              ]}
              moderator={getTestPlayer()}
            />
          </VillageServiceContextProvider>
        );

        fireEvent.change(result.getByPlaceholderText('Werewolves'), {
          target: { value: '1' },
        });

        fireEvent.change(result.getByPlaceholderText('Villagers'), {
          target: { value: '3' },
        });
        await result.findByDisplayValue('3');

        fireEvent.click(result.getByText('Start Game'));

        expect(mockVillageService.startGame).toHaveBeenCalledTimes(0);
      });

      it('if there a no werewolves set', async () => {
        const mockVillageService: any = {
          startGame: jest.fn(),
        };

        const result = render(
          <VillageServiceContextProvider value={mockVillageService}>
            <Setup
              {...baseProps}
              players={[
                getTestPlayer(),
                getTestPlayer(),
                getTestPlayer(),
                getTestPlayer(),
              ]}
              moderator={getTestPlayer()}
            />
          </VillageServiceContextProvider>
        );

        fireEvent.change(result.getByPlaceholderText('Villagers'), {
          target: { value: '3' },
        });
        await result.findByDisplayValue('3');

        fireEvent.click(result.getByText('Start Game'));

        expect(mockVillageService.startGame).toHaveBeenCalledTimes(0);
      });

      it('if there are equal werewolves to villagers + seers', async () => {
        const mockVillageService: any = {
          startGame: jest.fn(),
        };

        const result = render(
          <VillageServiceContextProvider value={mockVillageService}>
            <Setup
              {...baseProps}
              players={[
                getTestPlayer(),
                getTestPlayer(),
                getTestPlayer(),
                getTestPlayer(),
                getTestPlayer(),
                getTestPlayer(),
              ]}
              moderator={getTestPlayer()}
            />
          </VillageServiceContextProvider>
        );

        fireEvent.change(result.getByPlaceholderText('Werewolves'), {
          target: { value: '3' },
        });
        await result.findByDisplayValue('3');

        fireEvent.change(result.getByPlaceholderText('Villagers'), {
          target: { value: '2' },
        });
        await result.findByDisplayValue('2');

        fireEvent.click(result.getByText('Start Game'));

        expect(mockVillageService.startGame).toHaveBeenCalledTimes(0);
      });

      it('if there are more werewolves than villagers + seers', async () => {
        const mockVillageService: any = {
          startGame: jest.fn(),
        };

        const result = render(
          <VillageServiceContextProvider value={mockVillageService}>
            <Setup
              {...baseProps}
              players={[
                getTestPlayer(),
                getTestPlayer(),
                getTestPlayer(),
                getTestPlayer(),
                getTestPlayer(),
              ]}
              moderator={getTestPlayer()}
            />
          </VillageServiceContextProvider>
        );

        fireEvent.change(result.getByPlaceholderText('Villagers'), {
          target: { value: '1' },
        });

        fireEvent.change(result.getByPlaceholderText('Werewolves'), {
          target: { value: '3' },
        });
        await result.findByDisplayValue('3');

        fireEvent.click(result.getByText('Start Game'));

        expect(mockVillageService.startGame).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('mapStateToProps', () => {
    describe('returns correct props', () => {
      it('when a moderator is found', () => {
        const mockState = {
          some: 'mock-state',
          game: {
            villageName: 'villageName-test',
            lobbyId: '1234',
          },
        } as any;

        const result = mapStateToProps(mockState);

        expect(getPlayersWithRole).toHaveBeenCalledTimes(1);
        expect(getPlayersWithRole).toHaveBeenCalledWith(
          mockState,
          PLAYER_ROLE.MODERATOR
        );

        expect(getPlayersWithoutRole).toHaveBeenCalledTimes(1);
        expect(getPlayersWithoutRole).toHaveBeenCalledWith(
          mockState,
          PLAYER_ROLE.MODERATOR
        );

        expect(result).toEqual({
          lobbyId: '1234',
          moderator: 'players-with-role-1',
          players: 'players-without-role',
          villageName: 'villageName-test',
        });
      });

      it("when a moderator isn't found", () => {
        (getPlayersWithRole as jest.Mock).mockReturnValueOnce([]);

        const mockState = {
          some: 'mock-state',
          game: {
            villageName: 'villageName-test',
            lobbyId: '1234',
          },
        } as any;

        const result = mapStateToProps(mockState);

        expect(getPlayersWithRole).toHaveBeenCalledTimes(1);
        expect(getPlayersWithRole).toHaveBeenCalledWith(
          mockState,
          PLAYER_ROLE.MODERATOR
        );

        expect(getPlayersWithoutRole).toHaveBeenCalledTimes(1);
        expect(getPlayersWithoutRole).toHaveBeenCalledWith(
          mockState,
          PLAYER_ROLE.MODERATOR
        );

        expect(result).toEqual({
          lobbyId: '1234',
          moderator: undefined,
          players: 'players-without-role',
          villageName: 'villageName-test',
        });
      });
    });
  });
});

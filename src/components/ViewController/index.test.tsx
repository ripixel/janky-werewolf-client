/* eslint-disable @typescript-eslint/no-explicit-any, react/display-name  */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { PHASE_NAME } from '../../types/phase';
import { PLAYER_ROLE, PLAYER_TEAM } from '../../types/player';
import { getPhaseName, getSelf } from '../../store/connectorHelpers';

jest.mock('../../store/connectorHelpers', () => ({
  getPhaseName: jest.fn((): string => 'phase-name'),
  getSelf: jest.fn((): string => 'self'),
}));

import { mapStateToProps, ViewController } from '.';

jest.mock('../Views/JoinOrCreate', () => (): JSX.Element => (
  <div data-testid='joinOrCreate' />
));
jest.mock('../PlayerWrapper', () => (props: any): JSX.Element => (
  <div data-testid='playerWrapper'>{props.children}</div>
));
jest.mock('./matrix', () => ({
  COMPONENT_MATRIX: {
    Lobby: {
      default: (): JSX.Element => <div data-testid='default' />,
      Seer: (): JSX.Element => <div data-testid='seer' />,
    },
    Day: {
      default: (): JSX.Element => <div data-testid='default' />,
      Seer: (): JSX.Element => <div data-testid='seer' />,
    },
  },
}));

describe('Components > ViewController', () => {
  describe('renders as expected', () => {
    it('displays JoinOrCreate component when no phase given', () => {
      const result = render(<ViewController />);

      expect(result.getByTestId('joinOrCreate')).toBeInTheDocument();
    });

    it('displays nothing if no self', () => {
      const result = render(<ViewController phaseName={PHASE_NAME.LOBBY} />);

      expect(result.container).toBeEmptyDOMElement();
    });

    it('displays the default component if one could not be found for the role in the matrix', () => {
      const result = render(
        <ViewController
          phaseName={PHASE_NAME.LOBBY}
          self={{
            name: 'dave',
            attributes: {
              role: PLAYER_ROLE.LYCAN,
              alive: true,
              team: PLAYER_TEAM.UNKNOWN,
            },
          }}
        />
      );

      expect(result.getByTestId('default')).toBeInTheDocument();
    });

    it('displays the role component if found in the matrix', () => {
      const result = render(
        <ViewController
          phaseName={PHASE_NAME.LOBBY}
          self={{
            name: 'dave',
            attributes: {
              role: PLAYER_ROLE.SEER,
              alive: true,
              team: PLAYER_TEAM.UNKNOWN,
            },
          }}
        />
      );

      expect(result.getByTestId('seer')).toBeInTheDocument();
    });

    it('wraps the component in the player wrapper if not in the lobby phase', () => {
      const result = render(
        <ViewController
          phaseName={PHASE_NAME.DAY}
          self={{
            name: 'dave',
            attributes: {
              role: PLAYER_ROLE.SEER,
              alive: true,
              team: PLAYER_TEAM.UNKNOWN,
            },
          }}
        />
      );

      expect(result.getByTestId('seer')).toBeInTheDocument();
      expect(result.getByTestId('playerWrapper')).toBeInTheDocument();
    });

    it('does not wrap in the player wrapper if in the lobby phase', () => {
      const result = render(
        <ViewController
          phaseName={PHASE_NAME.LOBBY}
          self={{
            name: 'dave',
            attributes: {
              role: PLAYER_ROLE.SEER,
              alive: true,
              team: PLAYER_TEAM.UNKNOWN,
            },
          }}
        />
      );

      expect(result.getByTestId('seer')).toBeInTheDocument();
      expect(() => result.getByTestId('playerWrapper')).toThrow();
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
      expect(getPhaseName).toHaveBeenCalledTimes(1);
      expect(getPhaseName).toHaveBeenCalledWith(mockState);

      expect(result).toEqual({
        self: 'self',
        phaseName: 'phase-name',
      });
    });
  });
});

/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IState } from '../../../../../store/reducers';
import { PHASE_NAME } from '../../../../../types/phase';

import { mapStateToProps } from '.';

describe('<MobileLobbyView> connector', () => {
  describe('mapStateToProps', () => {
    it('throws as expected when no game', () => {
      const state: IState = {
        user: {
          id: '123',
        },
        game: null,
      };

      expect(() => mapStateToProps(state)).toThrow();
    });

    it('returns as expected when user is a player', () => {
      const state: IState = {
        user: {
          id: '123',
          name: 'test',
        },
        game: {
          gameCode: '456',
          villageName: '789',
          phase: {
            name: PHASE_NAME.LOBBY,
            data: undefined,
          },
          players: [
            {
              id: '456',
              name: 'test',
            },
          ],
        },
      };

      expect(mapStateToProps(state)).toEqual({
        isModerator: false,
      });
    });

    it('returns as expected when user is the moderator', () => {
      const state: IState = {
        user: {
          id: '123',
          name: 'test',
        },
        game: {
          gameCode: '456',
          villageName: '789',
          phase: {
            name: PHASE_NAME.LOBBY,
            data: undefined,
          },
          players: [
            {
              id: '789',
              name: 'not-test',
            },
          ],
          moderator: {
            id: '456',
            name: 'test',
          },
        },
      };

      expect(mapStateToProps(state)).toEqual({
        isModerator: true,
      });
    });
  });
});

/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IState } from '../../../../../store/reducers';
import { PHASE_NAME } from '../../../../../types/phase';

import { mapStateToProps } from '.';

describe('<MobileLobbyModeratorView> connector', () => {
  describe('mapStateToProps', () => {
    it('throws as expected when no game', () => {
      const state: IState = {
        user: {
          secret: '123',
        },
        game: null,
      };

      expect(() => mapStateToProps(state)).toThrow();
    });

    it('returns as expected when game present', () => {
      const state: IState = {
        user: {
          secret: '123',
        },
        game: {
          lobbyId: '456',
          villageName: '789',
          phase: {
            name: PHASE_NAME.LOBBY,
            data: undefined,
          },
          players: [],
        },
      };

      expect(mapStateToProps(state)).toEqual({
        villageName: state.game!.villageName,
        lobbyId: state.game!.lobbyId,
        players: state.game!.players,
      });
    });
  });
});

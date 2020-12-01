import { mapStateToProps } from '.';
import { IState } from '../../../store/reducers';
import { PHASE_NAME } from '../../../types/phase';

describe('<ViewController> connector', () => {
  describe('mapStateToProps', () => {
    it('returns as expected when no phase', () => {
      const state: IState = {
        user: {
          secret: '123',
        },
        game: null,
      };

      expect(mapStateToProps(state)).toEqual({ phaseName: undefined });
    });

    it('returns as expected when phase present', () => {
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

      expect(mapStateToProps(state)).toEqual({ phaseName: PHASE_NAME.LOBBY });
    });
  });
});

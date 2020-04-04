import { mapStateToProps } from '.';
import { IState } from '../../../store/reducers';

describe('<Hello> connector', () => {
  describe('mapStateToProps', () => {
    it('returns as expected', () => {
      const state: IState = {
        user: {
          id: '123',
        },
        game: null,
      };

      expect(mapStateToProps(state)).toEqual({ userId: '123' });
    });
  });
});

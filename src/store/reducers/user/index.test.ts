import userReducer, { IUserState } from '.';
import { USER_ACTION_TYPES } from '../../actions/user';

jest.mock('uuid', () => ({
  v4: (): string => 'test-guid-secret',
}));

describe('store > reducers > user', () => {
  describe('initial state', () => {
    const action = { type: 'UNKNOWN', payload: undefined };

    afterEach(() => {
      window.localStorage.removeItem('userSecret');
    });

    it('generates an secret if non exists', () => {
      expect(userReducer(undefined, action)).toEqual({
        secret: 'test-guid-secret',
      });
      expect(window.localStorage.getItem('userSecret')).toEqual(
        'test-guid-secret'
      );
    });

    it('uses one if already exists', () => {
      window.localStorage.setItem('userSecret', 'a-different-guid');
      expect(userReducer(undefined, action)).toEqual({
        secret: 'a-different-guid',
      });
    });
  });

  describe('with an unknown action', () => {
    const action = { type: 'UNKNOWN', payload: undefined };
    const state: IUserState = {
      secret: '123',
    };

    it('has no effect on state', () => {
      expect(userReducer(state, action)).toEqual(state);
    });
  });

  describe(`with ${USER_ACTION_TYPES.SET_NAME} action`, () => {
    const action = { type: USER_ACTION_TYPES.SET_NAME, payload: 'dave' };
    const state: IUserState = {
      secret: '123',
    };

    it('updates the state as expected', () => {
      expect(userReducer(state, action)).toEqual({
        secret: '123',
        name: 'dave',
      });
    });
  });
});

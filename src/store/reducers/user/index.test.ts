import userReducer, { IUserState } from '.';
import { USER_ACTION_TYPES } from '../../actions/user';

jest.mock('uuid', () => ({
  v4: (): string => 'test-guid-id',
}));

describe('store > reducers > user', () => {
  describe('initial state', () => {
    const action = { type: 'UNKNOWN', payload: undefined };

    afterEach(() => {
      window.localStorage.removeItem('userId');
    });

    it('generates an ID if non exists', () => {
      expect(userReducer(undefined, action)).toEqual({ id: 'test-guid-id' });
      expect(window.localStorage.getItem('userId')).toEqual('test-guid-id');
    });

    it('uses one if already exists', () => {
      window.localStorage.setItem('userId', 'a-different-guid');
      expect(userReducer(undefined, action)).toEqual({
        id: 'a-different-guid',
      });
    });
  });

  describe('with an unknown action', () => {
    const action = { type: 'UNKNOWN', payload: undefined };
    const state: IUserState = {
      id: '123',
    };

    it('has no effect on state', () => {
      expect(userReducer(state, action)).toEqual(state);
    });
  });

  describe(`with ${USER_ACTION_TYPES.SET_NAME} action`, () => {
    const action = { type: USER_ACTION_TYPES.SET_NAME, payload: 'dave' };
    const state: IUserState = {
      id: '123',
    };

    it('updates the state as expected', () => {
      expect(userReducer(state, action)).toEqual({
        id: '123',
        name: 'dave',
      });
    });
  });
});

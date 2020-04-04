import userReducer, { IUserState } from '.';

jest.mock('uuid', () => ({
  v4: (): string => 'test-guid-id',
}));

describe('store > reducers > user', () => {
  describe('initial state', () => {
    const action = { type: 'UNKNOWN' };

    afterEach(() => {
      window.localStorage.removeItem('userId');
    });

    it('generates an ID if non exists', () => {
      expect(userReducer(undefined, action)).toEqual({ id: 'test-guid-id' });
    });

    it('uses one if already exists', () => {
      window.localStorage.setItem('userId', 'a-different-guid');
      expect(userReducer(undefined, action)).toEqual({
        id: 'a-different-guid',
      });
    });
  });

  describe('with an unknown action', () => {
    const action = { type: 'UNKNOWN' };
    const state: IUserState = {
      id: '123',
    };

    it('has no effect on state', () => {
      expect(userReducer(state, action)).toEqual(state);
    });
  });
});

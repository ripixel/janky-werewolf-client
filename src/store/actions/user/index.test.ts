import { USER_ACTION_TYPES, setName } from '.';

describe('User Actions', () => {
  describe('setName', () => {
    it('returns as expected', () => {
      expect(setName('dave')).toEqual({
        type: USER_ACTION_TYPES.SET_NAME,
        payload: 'dave',
      });
    });
  });
});

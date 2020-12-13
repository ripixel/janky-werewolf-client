import userReducer from './user';
import gameReducer from './game';

import rootReducer, { State } from '.';

jest.mock('./user', () => jest.fn((): object => ({})));
jest.mock('./game', () => jest.fn((): object => ({})));

describe('Store > Reducers (Root)', () => {
  it('passes actions to all combined reducers', () => {
    const state = {
      user: {},
      game: {},
    } as State;
    const action = { type: 'UNKNOWN' };
    rootReducer(state, action);

    expect(userReducer).toHaveBeenLastCalledWith(state.user, action);
    expect(gameReducer).toHaveBeenLastCalledWith(state.game, action);
  });
});

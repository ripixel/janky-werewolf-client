import userReducer from './user';
import gameReducer from './game';

import rootReducer, { IState } from '.';

jest.mock('./user', () => jest.fn((): object => ({})));
jest.mock('./game', () => jest.fn((): object => ({})));

describe('store > root reducer', () => {
  it('passes actions to all combined reducers', () => {
    const state = {
      user: {},
      game: {},
    } as IState;
    const action = { type: 'UNKNOWN' };
    rootReducer(state, action);

    expect(userReducer).toHaveBeenLastCalledWith(state.user, action);
    expect(gameReducer).toHaveBeenLastCalledWith(state.game, action);
  });
});

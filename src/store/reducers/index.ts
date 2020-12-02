import { combineReducers } from 'redux';
import userReducer, { UserState } from './user';
import gameReducer, { GameState } from './game';

export interface State {
  user: UserState;
  game: GameState | null;
}

export const rootReducer = combineReducers<State>({
  user: userReducer,
  game: gameReducer,
});

export default rootReducer;

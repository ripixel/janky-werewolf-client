import { combineReducers } from 'redux';
import userReducer, { IUserState } from './user';
import gameReducer, { IGameState } from './game';

export interface IState {
  user: IUserState;
  game: IGameState | null;
}

export const rootReducer = combineReducers<IState>({
  user: userReducer,
  game: gameReducer,
});

export default rootReducer;

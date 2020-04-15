import { Store } from 'redux';

import { IState } from '../../store/reducers';
import { IGameState } from '../../store/reducers/game';
import { initGame, updateGame } from '../../store/actions/game';
import { IAction } from '../../store/actions/types';
import { IUserState } from '../../store/reducers/user';
import { setName } from '../../store/actions/user';

export interface IStoreInteractorService {
  initGame: (gameState: IGameState) => void;
  updateGame: (gameState: IGameState) => void;
  setUserName: (name: string) => void;
  getUser: () => IUserState;
}

export class StoreInteractorService implements IStoreInteractorService {
  store: Store<IState, IAction>;

  constructor(store: Store<IState, IAction>) {
    this.store = store;
  }

  initGame(gameState: IGameState): void {
    this.store.dispatch(initGame(gameState));
  }

  updateGame(gameState: IGameState): void {
    this.store.dispatch(updateGame(gameState));
  }

  setUserName(name: string): void {
    this.store.dispatch(setName(name));
  }

  getUser(): IUserState {
    return this.store.getState().user;
  }
}

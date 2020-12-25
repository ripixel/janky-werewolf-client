import { Store } from 'redux';

import { State } from '../../store/reducers';
import { initGame, updateGame } from '../../store/actions/game';
import { Action } from '../../store/actions/types';
import { UserState } from '../../store/reducers/user';
import { setName } from '../../store/actions/user';
import { GameStateFromSocket } from '../../provider/Village/WebSocket';

export interface AbstractStoreInteractorService {
  initGame: (gameState: GameStateFromSocket) => void;
  updateGame: (gameState: GameStateFromSocket) => void;
  setUserName: (name: string) => void;
  getUser: () => UserState;
}

export class StoreInteractorService implements AbstractStoreInteractorService {
  store: Store<State, Action>;

  constructor(store: Store<State, Action>) {
    this.store = store;
  }

  initGame(gameState: GameStateFromSocket): void {
    this.store.dispatch(initGame(gameState));
  }

  updateGame(gameState: GameStateFromSocket): void {
    this.store.dispatch(updateGame(gameState));
  }

  setUserName(name: string): void {
    this.store.dispatch(setName(name));
  }

  getUser(): UserState {
    return this.store.getState().user;
  }
}

export default StoreInteractorService;

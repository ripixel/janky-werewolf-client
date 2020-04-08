import { Store } from 'redux';

import { IState } from '../../store/reducers';
import { IGameState } from '../../store/reducers/game';
import { initGame } from '../../store/actions/game';
import { IAction } from '../../store/actions/types';

export interface IStoreInteractorService {
  initGame: (gameState: IGameState) => void;
  getUserId: () => string;
}

export class StoreInteractorService implements IStoreInteractorService {
  store: Store<IState, IAction>;

  constructor(store: Store<IState, IAction>) {
    this.store = store;
  }

  initGame(gameState: IGameState): void {
    this.store.dispatch(initGame(gameState));
  }

  getUserId(): string {
    return this.store.getState().user.id;
  }
}

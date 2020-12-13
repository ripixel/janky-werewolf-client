/* eslint-disable @typescript-eslint/no-explicit-any */
import { initGame, updateGame } from '../../store/actions/game';
import { setName } from '../../store/actions/user';

import { StoreInteractorService } from '.';

jest.mock('../../store/actions/game', () => ({
  initGame: jest.fn(() => 'initGameReturn'),
  updateGame: jest.fn(() => 'updateGameReturn'),
}));

jest.mock('../../store/actions/user', () => ({
  setName: jest.fn(() => 'setNameReturn'),
}));

describe('Services > StoreInteractor', () => {
  const mockStore: any = {
    dispatch: jest.fn(),
    getState: (): any => ({
      user: { id: 'testuserSecret', name: 'test-user-name' },
    }),
  };
  const mockGame: any = {
    some: 'game-state',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('constructs ok', () => {
    const service = new StoreInteractorService(mockStore);
    expect(service).toBeInstanceOf(StoreInteractorService);
  });

  describe('initGame', () => {
    it('dispatches as expected', () => {
      const service = new StoreInteractorService(mockStore);

      service.initGame(mockGame);

      expect(initGame as jest.Mock).toHaveBeenCalledTimes(1);
      expect(initGame as jest.Mock).toHaveBeenCalledWith(mockGame);
      expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
      expect(mockStore.dispatch).toHaveBeenCalledWith('initGameReturn');
    });
  });

  describe('updateGame', () => {
    it('dispatches as expected', () => {
      const service = new StoreInteractorService(mockStore);

      service.updateGame(mockGame);

      expect(updateGame as jest.Mock).toHaveBeenCalledTimes(1);
      expect(updateGame as jest.Mock).toHaveBeenCalledWith(mockGame);
      expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
      expect(mockStore.dispatch).toHaveBeenCalledWith('updateGameReturn');
    });
  });

  describe('setUserName', () => {
    it('dispatches as expected', () => {
      const service = new StoreInteractorService(mockStore);

      service.setUserName('dave');

      expect(setName as jest.Mock).toHaveBeenCalledTimes(1);
      expect(setName as jest.Mock).toHaveBeenCalledWith('dave');
      expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
      expect(mockStore.dispatch).toHaveBeenCalledWith('setNameReturn');
    });
  });

  describe('getUser', () => {
    it('returns as expected', () => {
      const service = new StoreInteractorService(mockStore);

      expect(service.getUser()).toEqual({
        id: 'testuserSecret',
        name: 'test-user-name',
      });
    });
  });
});

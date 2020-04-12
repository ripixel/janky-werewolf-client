/* eslint-disable @typescript-eslint/no-explicit-any */
import { initGame } from '../../store/actions/game';
import { StoreInteractorService } from '.';

jest.mock('../../store/actions/game', () => ({
  initGame: jest.fn(() => 'initGameReturn'),
}));

describe('StoreInteractorService', () => {
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
    it('returns as expected', () => {
      const service = new StoreInteractorService(mockStore);

      service.initGame(mockGame);

      expect(initGame as jest.Mock).toHaveBeenCalledTimes(1);
      expect(initGame as jest.Mock).toHaveBeenCalledWith(mockGame);
      expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
      expect(mockStore.dispatch).toHaveBeenCalledWith('initGameReturn');
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

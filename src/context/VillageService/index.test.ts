/* eslint-disable @typescript-eslint/no-explicit-any */
import { VillageService } from '../../service/Village';
import { DevVillageProvider } from '../../provider/Village/Dev';
import { StoreInteractorService } from '../../service/StoreInteractor';
import store from '../../store';

import { initVillageServiceContext } from '.';

jest.mock('react', () => ({
  createContext: (): any => ({ Provider: 'provider', Consumer: 'consumer' }),
}));

// Auto-mock should be fine for these
jest.mock('../../service/Village');
jest.mock('../../provider/Village/Dev');
jest.mock('../../service/StoreInteractor');
jest.mock('../../store');

describe('VillageServiceContext', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  // not going to test React.createContext itself because... it's react

  describe('initVillageServiceContext', () => {
    it('calls createContext correctly', () => {
      initVillageServiceContext();

      expect(DevVillageProvider as jest.Mock).toHaveBeenCalledTimes(1);
      expect(StoreInteractorService as jest.Mock).toHaveBeenCalledTimes(1);
      expect(StoreInteractorService as jest.Mock).toHaveBeenCalledWith(store);
      expect(VillageService as jest.Mock).toHaveBeenCalledTimes(1);
    });
  });
});
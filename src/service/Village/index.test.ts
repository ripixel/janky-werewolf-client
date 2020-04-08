/* eslint-disable @typescript-eslint/no-explicit-any */
import { logError } from '../../utils/logger';
import { VillageService } from '.';

jest.mock('../../store/actions/game', () => ({
  initGame: jest.fn(() => 'initGameReturn'),
}));
jest.mock('../../utils/logger');

describe('VillageService', () => {
  const mockProvider: any = {
    createVillage: jest.fn(
      () => new Promise((resolve) => resolve('create-village-return'))
    ),
    joinVillage: jest.fn(
      () => new Promise((resolve) => resolve('join-village-return'))
    ),
  };
  const mockInteractor: any = {
    initGame: jest.fn(),
    getUserId: jest.fn(() => 'test-user-id'),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('constructs ok', () => {
    const service = new VillageService(mockProvider, mockInteractor);
    expect(service).toBeInstanceOf(VillageService);
  });

  describe('createVillage', () => {
    it('requests store initGame correctly', async () => {
      const service = new VillageService(mockProvider, mockInteractor);

      await service.createVillage('test village');

      expect(mockInteractor.getUserId).toHaveBeenCalledTimes(1);
      expect(mockProvider.createVillage).toHaveBeenCalledTimes(1);
      expect(mockProvider.createVillage).toHaveBeenCalledWith(
        'test village',
        'test-user-id'
      );
      expect(mockInteractor.initGame).toHaveBeenCalledTimes(1);
      expect(mockInteractor.initGame).toHaveBeenCalledWith(
        'create-village-return'
      );
    });

    it('handles provider error correctly', async () => {
      const error = new Error('Oh no!');
      mockProvider.createVillage.mockImplementationOnce(() => {
        throw error;
      });
      const service = new VillageService(mockProvider, mockInteractor);

      await service.createVillage('this should throw');

      expect(logError as jest.Mock).toHaveBeenCalledTimes(1);
      expect(logError as jest.Mock).toHaveBeenCalledWith(error);
    });
  });

  describe('joinVillage', () => {
    it('requests store initGame correctly', async () => {
      const service = new VillageService(mockProvider, mockInteractor);

      await service.joinVillage('test player', '12code34');

      expect(mockInteractor.getUserId).toHaveBeenCalledTimes(1);
      expect(mockProvider.joinVillage).toHaveBeenCalledTimes(1);
      expect(mockProvider.joinVillage).toHaveBeenCalledWith(
        'test player',
        '12code34',
        'test-user-id'
      );
      expect(mockInteractor.initGame).toHaveBeenCalledTimes(1);
      expect(mockInteractor.initGame).toHaveBeenCalledWith(
        'join-village-return'
      );
    });

    it('handles provider error correctly', async () => {
      const error = new Error('Oh no!');
      mockProvider.joinVillage.mockImplementationOnce(() => {
        throw error;
      });
      const service = new VillageService(mockProvider, mockInteractor);

      await service.joinVillage('throw', 'please');

      expect(logError as jest.Mock).toHaveBeenCalledTimes(1);
      expect(logError as jest.Mock).toHaveBeenCalledWith(error);
    });
  });
});

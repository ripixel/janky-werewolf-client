/* eslint-disable @typescript-eslint/no-explicit-any */
import { logError } from '../../utils/logger';
import { VillageService } from '.';

jest.mock('../../store/actions/game', () => ({
  initGame: jest.fn(() => 'initGameReturn'),
}));
jest.mock('../../utils/logger');

describe('VillageService', () => {
  const mockProvider: any = {
    createVillage: jest.fn(),
    joinVillage: jest.fn(),
    setInteractor: jest.fn(),
  };
  const mockInteractor: any = {
    setUserName: jest.fn(),
    getUser: jest.fn(() => ({
      secret: 'test-user-secret',
      name: 'test-user-name',
    })),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('constructs ok', () => {
    const service = new VillageService(mockProvider, mockInteractor);
    expect(service).toBeInstanceOf(VillageService);
  });

  describe('createVillage', () => {
    it('works as expected', () => {
      const service = new VillageService(mockProvider, mockInteractor);

      service.createVillage('test-user-name');

      expect(mockInteractor.setUserName).toHaveBeenCalledTimes(1);
      expect(mockInteractor.setUserName).toHaveBeenCalledWith('test-user-name');
      expect(mockProvider.createVillage).toHaveBeenCalledTimes(1);
      expect(mockProvider.createVillage).toHaveBeenCalledWith({
        userName: 'test-user-name',
        userSecret: 'test-user-secret',
      });
    });

    it('handles provider error correctly', () => {
      const error = new Error('Oh no!');
      mockProvider.createVillage.mockImplementationOnce(() => {
        throw error;
      });
      const service = new VillageService(mockProvider, mockInteractor);

      service.createVillage('this should throw');

      expect(logError as jest.Mock).toHaveBeenCalledTimes(1);
      expect(logError as jest.Mock).toHaveBeenCalledWith(error);
    });
  });

  describe('joinVillage', () => {
    it('requests store initGame correctly', () => {
      const service = new VillageService(mockProvider, mockInteractor);

      service.joinVillage('test-user-name', 'ABCD');

      expect(mockInteractor.setUserName).toHaveBeenCalledTimes(1);
      expect(mockInteractor.setUserName).toHaveBeenCalledWith('test-user-name');
      expect(mockProvider.joinVillage).toHaveBeenCalledTimes(1);
      expect(mockProvider.joinVillage).toHaveBeenCalledWith({
        userName: 'test-user-name',
        lobbyId: 'ABCD',
        userSecret: 'test-user-secret',
      });
    });

    it('handles provider error correctly', () => {
      const error = new Error('Oh no!');
      mockProvider.joinVillage.mockImplementationOnce(() => {
        throw error;
      });
      const service = new VillageService(mockProvider, mockInteractor);

      service.joinVillage('throw', 'please');

      expect(logError as jest.Mock).toHaveBeenCalledTimes(1);
      expect(logError as jest.Mock).toHaveBeenCalledWith(error);
    });
  });
});

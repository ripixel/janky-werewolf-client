/* eslint-disable @typescript-eslint/no-explicit-any */
import { logError } from '../../utils/logger';
import { VillageService } from '.';

jest.mock('../../store/actions/game', () => ({
  initGame: jest.fn(() => 'initGameReturn'),
}));
jest.mock('../../utils/logger');

describe('Services > Village', () => {
  const mockProvider: any = {
    createVillage: jest.fn(),
    joinVillage: jest.fn(),
    setInteractor: jest.fn(),
    startGame: jest.fn(),
    werewolfVoteForPlayer: jest.fn(),
    seerInspectPlayer: jest.fn(),
    bodyguardSavePlayer: jest.fn(),
    lynchPlayer: jest.fn(),
    sleepNow: jest.fn(),
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

  describe('startGame', () => {
    it('requests the provider startGame correctly', () => {
      const service = new VillageService(mockProvider, mockInteractor);

      service.startGame(1, true, true, true);

      expect(mockProvider.startGame).toHaveBeenCalledTimes(1);
      expect(mockProvider.startGame).toHaveBeenCalledWith({
        werewolves: 1,
        seer: true,
        bodyguard: true,
        lycan: true,
      });
    });

    it('handles provider error correctly', () => {
      const error = new Error('Oh no!');
      mockProvider.startGame.mockImplementationOnce(() => {
        throw error;
      });

      const service = new VillageService(mockProvider, mockInteractor);

      service.startGame(1, true, true, true);

      expect(logError as jest.Mock).toHaveBeenCalledTimes(1);
      expect(logError as jest.Mock).toHaveBeenCalledWith(error);
    });
  });

  describe('werewolfVoteForPlayer', () => {
    it('requests the provider startGame correctly', () => {
      const service = new VillageService(mockProvider, mockInteractor);

      service.werewolfVoteForPlayer('dave');

      expect(mockProvider.werewolfVoteForPlayer).toHaveBeenCalledTimes(1);
      expect(mockProvider.werewolfVoteForPlayer).toHaveBeenCalledWith({
        playerName: 'dave',
      });
    });

    it('handles provider error correctly', () => {
      const error = new Error('Oh no!');
      mockProvider.werewolfVoteForPlayer.mockImplementationOnce(() => {
        throw error;
      });

      const service = new VillageService(mockProvider, mockInteractor);

      service.werewolfVoteForPlayer('dave');

      expect(logError as jest.Mock).toHaveBeenCalledTimes(1);
      expect(logError as jest.Mock).toHaveBeenCalledWith(error);
    });
  });

  describe('seerInspectPlayer', () => {
    it('requests the provider startGame correctly', () => {
      const service = new VillageService(mockProvider, mockInteractor);

      service.seerInspectPlayer('dave');

      expect(mockProvider.seerInspectPlayer).toHaveBeenCalledTimes(1);
      expect(mockProvider.seerInspectPlayer).toHaveBeenCalledWith({
        playerName: 'dave',
      });
    });

    it('handles provider error correctly', () => {
      const error = new Error('Oh no!');
      mockProvider.seerInspectPlayer.mockImplementationOnce(() => {
        throw error;
      });

      const service = new VillageService(mockProvider, mockInteractor);

      service.seerInspectPlayer('dave');

      expect(logError as jest.Mock).toHaveBeenCalledTimes(1);
      expect(logError as jest.Mock).toHaveBeenCalledWith(error);
    });
  });

  describe('bodyguardSavePlayer', () => {
    it('requests the provider startGame correctly', () => {
      const service = new VillageService(mockProvider, mockInteractor);

      service.bodyguardSavePlayer('dave');

      expect(mockProvider.bodyguardSavePlayer).toHaveBeenCalledTimes(1);
      expect(mockProvider.bodyguardSavePlayer).toHaveBeenCalledWith({
        playerName: 'dave',
      });
    });

    it('handles provider error correctly', () => {
      const error = new Error('Oh no!');
      mockProvider.bodyguardSavePlayer.mockImplementationOnce(() => {
        throw error;
      });

      const service = new VillageService(mockProvider, mockInteractor);

      service.bodyguardSavePlayer('dave');

      expect(logError as jest.Mock).toHaveBeenCalledTimes(1);
      expect(logError as jest.Mock).toHaveBeenCalledWith(error);
    });
  });

  describe('lynchPlayer', () => {
    it('requests the provider startGame correctly', () => {
      const service = new VillageService(mockProvider, mockInteractor);

      service.lynchPlayer('dave');

      expect(mockProvider.lynchPlayer).toHaveBeenCalledTimes(1);
      expect(mockProvider.lynchPlayer).toHaveBeenCalledWith({
        playerName: 'dave',
      });
    });

    it('handles provider error correctly', () => {
      const error = new Error('Oh no!');
      mockProvider.lynchPlayer.mockImplementationOnce(() => {
        throw error;
      });

      const service = new VillageService(mockProvider, mockInteractor);

      service.lynchPlayer('dave');

      expect(logError as jest.Mock).toHaveBeenCalledTimes(1);
      expect(logError as jest.Mock).toHaveBeenCalledWith(error);
    });
  });

  describe('sleepNow', () => {
    it('requests the provider startGame correctly', () => {
      const service = new VillageService(mockProvider, mockInteractor);

      service.sleepNow();

      expect(mockProvider.sleepNow).toHaveBeenCalledTimes(1);
    });

    it('handles provider error correctly', () => {
      const error = new Error('Oh no!');
      mockProvider.sleepNow.mockImplementationOnce(() => {
        throw error;
      });

      const service = new VillageService(mockProvider, mockInteractor);

      service.sleepNow();

      expect(logError as jest.Mock).toHaveBeenCalledTimes(1);
      expect(logError as jest.Mock).toHaveBeenCalledWith(error);
    });
  });
});

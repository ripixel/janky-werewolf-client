/* eslint-disable @typescript-eslint/no-unused-vars */
import { IVillageProvider } from '../../provider/Village/types';
import { IStoreInteractorService } from '../StoreInteractor';
import { logError } from '../../utils/logger';

export interface IVillageService {
  createVillage: (userName: string) => void;
  joinVillage: (userName: string, lobbyId: string) => void;
  startGame: (werewolves: number, seer: boolean, bodyguard: boolean) => void;
  werewolfVoteForPlayer: (playerName: string) => void;
  seerInspectPlayer: (playerName: string) => void;
  bodyguardSavePlayer: (playerName: string) => void;
  lynchPlayer: (playerName: string) => void;
  sleepNow: () => void;
}

export class VillageService implements IVillageService {
  villageProvider: IVillageProvider;
  storeInteractor: IStoreInteractorService;

  constructor(
    villageProvider: IVillageProvider,
    storeInteractor: IStoreInteractorService
  ) {
    this.villageProvider = villageProvider;
    this.storeInteractor = storeInteractor;
    this.villageProvider.setInteractor(storeInteractor);
  }

  createVillage(userName: string): void {
    try {
      this.storeInteractor.setUserName(userName);
      this.villageProvider.createVillage({
        userName,
        userSecret: this.storeInteractor.getUser().secret,
      });
    } catch (error) {
      this.onError(error);
    }
  }

  joinVillage(userName: string, lobbyId: string): void {
    try {
      this.storeInteractor.setUserName(userName);
      this.villageProvider.joinVillage({
        lobbyId,
        userName,
        userSecret: this.storeInteractor.getUser().secret,
      });
    } catch (error) {
      this.onError(error);
    }
  }

  startGame(werewolves: number, seer: boolean, bodyguard: boolean): void {
    try {
      this.villageProvider.startGame({ werewolves, seer, bodyguard });
    } catch (error) {
      this.onError(error);
    }
  }

  werewolfVoteForPlayer(playerName: string): void {
    try {
      this.villageProvider.werewolfVoteForPlayer({ playerName });
    } catch (error) {
      this.onError(error);
    }
  }

  seerInspectPlayer(playerName: string): void {
    try {
      this.villageProvider.seerInspectPlayer({ playerName });
    } catch (error) {
      this.onError(error);
    }
  }

  bodyguardSavePlayer(playerName: string): void {
    try {
      this.villageProvider.bodyguardSavePlayer({ playerName });
    } catch (error) {
      this.onError(error);
    }
  }

  lynchPlayer(playerName: string): void {
    try {
      this.villageProvider.lynchPlayer({ playerName });
    } catch (error) {
      this.onError(error);
    }
  }

  sleepNow(): void {
    try {
      this.villageProvider.sleepNow();
    } catch (error) {
      this.onError(error);
    }
  }

  private onError(error: Error): void {
    logError(error);
  }
}

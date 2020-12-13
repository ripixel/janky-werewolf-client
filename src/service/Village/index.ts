/* eslint-disable @typescript-eslint/no-unused-vars */
import { VillageProvider } from '../../provider/Village/types';
import { AbstractStoreInteractorService } from '../StoreInteractor';
import { logError } from '../../utils/logger';

export interface AbstractVillageService {
  createVillage: (userName: string) => void;
  joinVillage: (userName: string, lobbyId: string) => void;
  startGame: (
    werewolves: number,
    seer: boolean,
    bodyguard: boolean,
    lycan: boolean
  ) => void;
  werewolfVoteForPlayer: (playerName: string) => void;
  seerInspectPlayer: (playerName: string) => void;
  bodyguardSavePlayer: (playerName: string) => void;
  lynchPlayer: (playerName: string) => void;
  sleepNow: () => void;
}

export class VillageService implements AbstractVillageService {
  villageProvider: VillageProvider;
  storeInteractor: AbstractStoreInteractorService;

  constructor(
    villageProvider: VillageProvider,
    storeInteractor: AbstractStoreInteractorService
  ) {
    this.villageProvider = villageProvider;
    this.storeInteractor = storeInteractor;
    this.villageProvider.setInteractor(storeInteractor);
    this.onError.bind(this);
  }

  createVillage(userName: string): void {
    this.runSafe(() => {
      this.storeInteractor.setUserName(userName);
      this.villageProvider.createVillage({
        userName,
        userSecret: this.storeInteractor.getUser().secret,
      });
    });
  }

  joinVillage(userName: string, lobbyId: string): void {
    this.runSafe(() => {
      this.storeInteractor.setUserName(userName);
      this.villageProvider.joinVillage({
        lobbyId,
        userName,
        userSecret: this.storeInteractor.getUser().secret,
      });
    });
  }

  startGame(
    werewolves: number,
    seer: boolean,
    bodyguard: boolean,
    lycan: boolean
  ): void {
    this.runSafe(() => {
      this.villageProvider.startGame({ werewolves, seer, bodyguard, lycan });
    });
  }

  werewolfVoteForPlayer(playerName: string): void {
    this.runSafe(() => {
      this.villageProvider.werewolfVoteForPlayer({ playerName });
    });
  }

  seerInspectPlayer(playerName: string): void {
    this.runSafe(() => {
      this.villageProvider.seerInspectPlayer({ playerName });
    });
  }

  bodyguardSavePlayer(playerName: string): void {
    this.runSafe(() => {
      this.villageProvider.bodyguardSavePlayer({ playerName });
    });
  }

  lynchPlayer(playerName: string): void {
    this.runSafe(() => {
      this.villageProvider.lynchPlayer({ playerName });
    });
  }

  sleepNow(): void {
    this.runSafe(() => {
      this.villageProvider.sleepNow();
    });
  }

  private onError(error: Error): void {
    logError(error);
  }

  private runSafe(toRun: () => void): void {
    try {
      toRun();
    } catch (error) {
      this.onError(error);
    }
  }
}

export default VillageService;

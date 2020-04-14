/* eslint-disable @typescript-eslint/no-unused-vars */
import { IVillageProvider } from '../../provider/Village/types';
import { IStoreInteractorService } from '../StoreInteractor';
import { logError } from '../../utils/logger';

export interface IVillageService {
  createVillage: (villageName: string, playerName: string) => Promise<void>;
  joinVillage: (playerName: string, gameCode: string) => Promise<void>;
  startGame: (
    villagersCount: number,
    werewolvesCount: number,
    seersCount: number
  ) => Promise<void>;
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
  }

  async createVillage(villageName: string, playerName: string): Promise<void> {
    try {
      this.storeInteractor.setUserName(playerName);
      this.storeInteractor.initGame(
        await this.villageProvider.createVillage(
          villageName,
          playerName,
          this.storeInteractor.getUser().id
        )
      );
    } catch (error) {
      this.onError(error);
    }
  }

  async joinVillage(playerName: string, gameCode: string): Promise<void> {
    try {
      this.storeInteractor.setUserName(playerName);
      this.storeInteractor.initGame(
        await this.villageProvider.joinVillage(
          playerName,
          gameCode,
          this.storeInteractor.getUser().id
        )
      );
    } catch (error) {
      this.onError(error);
    }
  }

  async startGame(
    villagersCount: number,
    werewolvesCount: number,
    seersCount: number
  ): Promise<void> {
    try {
      await this.villageProvider.startGame(
        villagersCount,
        werewolvesCount,
        seersCount
      );
    } catch (error) {
      this.onError(error);
    }
  }

  private onError(error: Error): void {
    logError(error);
  }
}

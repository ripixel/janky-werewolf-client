import { IStoreInteractorService } from '../../service/StoreInteractor';

export interface ICreateVillageData {
  userName: string;
  userSecret: string;
}

export interface IJoinVillageData {
  userName: string;
  lobbyId: string;
  userSecret: string;
}

export interface IStartGameData {
  werewolves: number;
  seer: boolean;
}

export interface IVoteData {
  playerName: string;
}

export interface IVillageProvider {
  setInteractor: (interactor: IStoreInteractorService) => void;
  createVillage: (createVillageData: ICreateVillageData) => void;
  joinVillage: (joinVillageData: IJoinVillageData) => void;
  startGame: (startGameData: IStartGameData) => void;
  werewolfVoteForPlayer: (voteData: IVoteData) => void;
  seerInspectPlayer: (voteData: IVoteData) => void;
  lynchPlayer: (voteData: IVoteData) => void;
  sleepNow: () => void;
}

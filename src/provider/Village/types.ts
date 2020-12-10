import { AbstractStoreInteractorService } from '../../service/StoreInteractor';

export interface CreateVillageData {
  userName: string;
  userSecret: string;
}

export interface JoinVillageData {
  userName: string;
  lobbyId: string;
  userSecret: string;
}

export interface StartGameData {
  werewolves: number;
  seer: boolean;
  bodyguard: boolean;
  lycan: boolean;
}

export interface VoteData {
  playerName: string;
}

export interface VillageProvider {
  setInteractor: (interactor: AbstractStoreInteractorService) => void;
  createVillage: (createVillageData: CreateVillageData) => void;
  joinVillage: (joinVillageData: JoinVillageData) => void;
  startGame: (startGameData: StartGameData) => void;
  werewolfVoteForPlayer: (voteData: VoteData) => void;
  seerInspectPlayer: (voteData: VoteData) => void;
  bodyguardSavePlayer: (voteData: VoteData) => void;
  lynchPlayer: (voteData: VoteData) => void;
  sleepNow: () => void;
}

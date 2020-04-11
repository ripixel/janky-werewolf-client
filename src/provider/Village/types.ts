import { IGameState } from '../../store/reducers/game';

export interface IVillageProvider {
  createVillage: (
    villageName: string,
    playerName: string,
    userId: string
  ) => Promise<IGameState>;
  joinVillage: (
    playerName: string,
    gameCode: string,
    userId: string
  ) => Promise<IGameState>;
  startGame: (
    villagersCount: number,
    werewolvesCount: number,
    seersCount: number
  ) => Promise<IGameState>;
}

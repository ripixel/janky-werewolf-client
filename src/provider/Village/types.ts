import { IGameState } from '../../store/reducers/game';

export interface IVillageProvider {
  createVillage: (villageName: string, userId: string) => Promise<IGameState>;
  joinVillage: (
    playerName: string,
    gameCode: string,
    userId: string
  ) => Promise<IGameState>;
}

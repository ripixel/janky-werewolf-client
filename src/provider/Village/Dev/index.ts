/* eslint-disable @typescript-eslint/no-unused-vars */
import { IVillageProvider } from '../types';
import { IGameState } from '../../../store/reducers/game';
import { PHASE_NAME } from '../../../types/phase';
import { IPlayer } from '../../../types/player';

/**
 * This Dev provider is only used for development purposes, whie the
 * API BE is actually being built or new features are being developed.
 * Therefore it is not covered by tests, and should not really be reviewed.
 */

const createGameState = (
  villageName: string,
  player?: IPlayer
): IGameState => ({
  gameCode: '12test34',
  phase: {
    name: PHASE_NAME.LOBBY,
    data: undefined,
  },
  players: player ? [player] : [],
  villageName,
});

export class DevVillageProvider implements IVillageProvider {
  async createVillage(
    villageName: string,
    _userId: string
  ): Promise<IGameState> {
    return new Promise((resolve) => {
      resolve(createGameState(villageName));
    });
  }

  async joinVillage(
    playerName: string,
    _gameCode: string,
    _userId: string
  ): Promise<IGameState> {
    return new Promise((resolve) => {
      resolve(
        createGameState('Some Dev Village', {
          id: 'someDevPlayerId',
          name: playerName,
        })
      );
    });
  }
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import { IVillageProvider } from '../types';
import { IGameState } from '../../../store/reducers/game';
import { PHASE_NAME } from '../../../types/phase';
import { IPlayer, PLAYER_ROLE, PLAYER_TEAM } from '../../../types/player';

/**
 * This Dev provider is only used for development purposes, whie the
 * API BE is actually being built or new features are being developed.
 * Therefore it is not covered by tests, and should not really be reviewed.
 */

const getTestPlayer = (
  index: number,
  role: PLAYER_ROLE,
  team: PLAYER_TEAM
): IPlayer => ({
  id: Math.random()
    .toString(36)
    .substring(7),
  name: 'Test Player ' + index,
  attributes: {
    alive: true,
    role,
    team,
  },
});

export class DevVillageProvider implements IVillageProvider {
  async createVillage(
    villageName: string,
    playerName: string,
    _userId: string
  ): Promise<IGameState> {
    return new Promise((resolve) => {
      resolve({
        gameCode: '12test34',
        phase: {
          name: PHASE_NAME.LOBBY,
          data: undefined,
        },
        players: [],
        moderator: {
          id: '123',
          name: playerName,
        },
        villageName,
      });
    });
  }

  async joinVillage(
    playerName: string,
    _gameCode: string,
    _userId: string
  ): Promise<IGameState> {
    return new Promise((resolve) => {
      resolve({
        gameCode: '12test34',
        phase: {
          name: PHASE_NAME.LOBBY,
          data: undefined,
        },
        players: [
          {
            id: 'abc',
            name: playerName,
          },
        ],
        moderator: {
          id: '123',
          name: 'Matt',
        },
        villageName: 'Dev Village',
      });
    });
  }

  async startGame(
    villagersCount: number,
    werewolvesCount: number,
    seersCount: number
  ): Promise<IGameState> {
    const players: IPlayer[] = [];

    let index = 0;
    for (let i = 0; i < villagersCount; i++) {
      players.push(
        getTestPlayer(index, PLAYER_ROLE.VILLAGER, PLAYER_TEAM.GOOD)
      );
      index++;
    }

    for (let i = 0; i < werewolvesCount; i++) {
      players.push(
        getTestPlayer(index, PLAYER_ROLE.WEREWOLF, PLAYER_TEAM.EVIL)
      );
      index++;
    }

    for (let i = 0; i < seersCount; i++) {
      players.push(getTestPlayer(index, PLAYER_ROLE.SEER, PLAYER_TEAM.GOOD));
      index++;
    }

    return new Promise((resolve) => {
      resolve({
        gameCode: '12test34',
        phase: {
          name: PHASE_NAME.WELCOME,
          data: undefined,
        },
        players,
        moderator: {
          id: '123',
          name: 'Matt',
        },
        villageName: 'Dev Village',
      });
    });
  }
}

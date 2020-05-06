/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IVillageProvider,
  ICreateVillageData,
  IJoinVillageData,
  IStartGameData,
  IVoteData,
} from '../types';
import { IStoreInteractorService } from '../../../service/StoreInteractor';
import { TPhases } from '../../../types/phase';
import { IPlayer, PLAYER_ROLE, PLAYER_TEAM } from '../../../types/player';
import { IGameState } from '../../../store/reducers/game';

enum SOCKET_ACTIONS {
  JOIN = 'join',
  START = 'start',
  WEREWOLF = 'werewolf',
  SEER = 'seer',
  LYNCH = 'lynch',
  SLEEP = 'sleep',
}

interface ISocketMessage<T extends SOCKET_ACTIONS, U = undefined> {
  action: T;
  data: U;
}

type TCreateMessage = ISocketMessage<
  SOCKET_ACTIONS.JOIN,
  {
    name: string;
    secret: string;
  }
>;

type TJoinMessage = ISocketMessage<
  SOCKET_ACTIONS.JOIN,
  {
    name: string;
    secret: string;
    code: string;
  }
>;

type TStartMessage = ISocketMessage<
  SOCKET_ACTIONS.START,
  {
    code: string;
    werewolves: number;
  }
>;

type TWerewolf = ISocketMessage<
  SOCKET_ACTIONS.WEREWOLF,
  {
    code: string;
    player: string;
  }
>;

type TSeer = ISocketMessage<
  SOCKET_ACTIONS.SEER,
  {
    code: string;
    player: string;
  }
>;

type TLynch = ISocketMessage<
  SOCKET_ACTIONS.LYNCH,
  {
    code: string;
    player: string;
  }
>;

type TSleep = ISocketMessage<
  SOCKET_ACTIONS.SLEEP,
  {
    code: string;
  }
>;

type TSocketMessages =
  | TCreateMessage
  | TJoinMessage
  | TStartMessage
  | TWerewolf
  | TSeer
  | TLynch
  | TSleep;

interface IMessageGameState {
  game_state: {
    lobbyId: string;
    phase: TPhases;
    players: IPlayer[];
  };
}

export class WebSocketVillageProvider implements IVillageProvider {
  socket?: WebSocket;
  storeInteractor!: IStoreInteractorService;
  lobbyId?: string;
  gameInit: boolean;
  moderatorName?: string;

  constructor() {
    this.gameInit = false;
  }

  setInteractor(interactor: IStoreInteractorService): void {
    this.initSocket();
    this.storeInteractor = interactor;
  }

  createVillage({ userName, userSecret }: ICreateVillageData): void {
    this.moderatorName = userName;
    this.sendSocketMessage({
      action: SOCKET_ACTIONS.JOIN,
      data: {
        name: userName,
        secret: userSecret,
      },
    } as TCreateMessage);
  }

  joinVillage({ userName, lobbyId, userSecret }: IJoinVillageData): void {
    this.sendSocketMessage({
      action: SOCKET_ACTIONS.JOIN,
      data: {
        name: userName,
        secret: userSecret,
        code: lobbyId,
      },
    } as TJoinMessage);
  }

  startGame({ werewolves, seer, bodyguard }: IStartGameData): void {
    this.sendSocketMessage({
      action: SOCKET_ACTIONS.START,
      data: {
        code: this.getLobbyId(),
        werewolves,
        seer,
        bodyguard,
      },
    } as TStartMessage);
  }

  werewolfVoteForPlayer({ playerName }: IVoteData): void {
    this.sendSocketMessage({
      action: SOCKET_ACTIONS.WEREWOLF,
      data: {
        code: this.getLobbyId(),
        player: playerName,
      },
    } as TWerewolf);
  }

  seerInspectPlayer({ playerName }: IVoteData): void {
    this.sendSocketMessage({
      action: SOCKET_ACTIONS.SEER,
      data: {
        code: this.getLobbyId(),
        player: playerName,
      },
    } as TSeer);
  }

  lynchPlayer({ playerName }: IVoteData): void {
    this.sendSocketMessage({
      action: SOCKET_ACTIONS.LYNCH,
      data: {
        code: this.getLobbyId(),
        player: playerName,
      },
    } as TLynch);
  }

  sleepNow(): void {
    this.sendSocketMessage({
      action: SOCKET_ACTIONS.SLEEP,
      data: {
        code: this.getLobbyId(),
      },
    } as TSleep);
  }

  private initSocket(): void {
    if (!process.env.WEBSOCKET_URL) {
      throw new Error('No WEBSOCKET_URL defined in env vars');
    }

    this.socket = new WebSocket(process.env.WEBSOCKET_URL);
    this.socket.onmessage = this.onSocketMessage.bind(this);
  }

  private sendSocketMessage(message: TSocketMessages): void {
    if (!this.socket) {
      throw new Error(
        "No socket available - you haven't started or joiend a game"
      );
    }
    this.socket.send(JSON.stringify(message));
  }

  private onSocketMessage(event: MessageEvent): void {
    const gameState = this.transformSocketGameStateToLocal(
      JSON.parse(event.data) as IMessageGameState
    );

    this.lobbyId = gameState.lobbyId;

    if (!this.gameInit) {
      this.storeInteractor.initGame(gameState);
      this.gameInit = true;
    } else {
      this.storeInteractor.updateGame(gameState);
    }
  }

  private getLobbyId(): string {
    if (!this.lobbyId) {
      throw new Error(
        'No lobby id present - did you create/join a game correctly?'
      );
    }

    return this.lobbyId;
  }

  private transformSocketGameStateToLocal({
    game_state,
  }: IMessageGameState): IGameState {
    game_state.players.forEach(
      (player) =>
        (player.attributes = player.attributes
          ? player.attributes
          : {
              alive: false,
              role: PLAYER_ROLE.UNKNOWN,
              team: PLAYER_TEAM.UNKNOWN,
            })
    );

    if (this.moderatorName) {
      const self = game_state.players.find(
        (player) => player.name === this.moderatorName
      );

      if (!self) {
        throw new Error('Cannot find self for moderator setting');
      }

      self.attributes = {
        alive: true,
        role: PLAYER_ROLE.MODERATOR,
        team: PLAYER_TEAM.UNKNOWN,
      };
    }

    return {
      lobbyId: game_state.lobbyId,
      phase: game_state.phase,
      players: game_state.players,
      villageName: 'Janktown',
    };
  }
}

export default WebSocketVillageProvider;

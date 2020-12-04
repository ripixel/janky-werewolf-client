/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  VillageProvider,
  CreateVillageData,
  JoinVillageData,
  StartGameData,
  VoteData,
} from '../types';
import { AbstractStoreInteractorService } from '../../../service/StoreInteractor';
import { Phases } from '../../../types/phase';
import { Player, PLAYER_ROLE, PLAYER_TEAM } from '../../../types/player';
import { GameState } from '../../../store/reducers/game';

enum SOCKET_ACTIONS {
  JOIN = 'join',
  START = 'start',
  WEREWOLF = 'werewolf',
  SEER = 'seer',
  BODYGUARD = 'bodyguard',
  LYNCH = 'lynch',
  SLEEP = 'sleep',
}

interface SocketMessage<T extends SOCKET_ACTIONS, U = undefined> {
  action: T;
  data: U;
}

type CreateMessage = SocketMessage<
  SOCKET_ACTIONS.JOIN,
  {
    name: string;
    secret: string;
  }
>;

type JoinMessage = SocketMessage<
  SOCKET_ACTIONS.JOIN,
  {
    name: string;
    secret: string;
    code: string;
  }
>;

type StartMessage = SocketMessage<
  SOCKET_ACTIONS.START,
  {
    code: string;
    werewolves: number;
  }
>;

type Werewolf = SocketMessage<
  SOCKET_ACTIONS.WEREWOLF,
  {
    code: string;
    player: string;
  }
>;

type Seer = SocketMessage<
  SOCKET_ACTIONS.SEER,
  {
    code: string;
    player: string;
  }
>;

type Bodyguard = SocketMessage<
  SOCKET_ACTIONS.BODYGUARD,
  {
    code: string;
    player: string;
  }
>;

type Lynch = SocketMessage<
  SOCKET_ACTIONS.LYNCH,
  {
    code: string;
    player: string;
  }
>;

type Sleep = SocketMessage<
  SOCKET_ACTIONS.SLEEP,
  {
    code: string;
  }
>;

type SocketMessages =
  | CreateMessage
  | JoinMessage
  | StartMessage
  | Werewolf
  | Seer
  | Bodyguard
  | Lynch
  | Sleep;

interface MessageGameState {
  game_state: {
    lobbyId: string;
    phase: Phases;
    players: Player[];
  };
}

export class WebSocketVillageProvider implements VillageProvider {
  socket?: WebSocket;
  storeInteractor!: AbstractStoreInteractorService;
  lobbyId?: string;
  gameInit: boolean;
  moderatorName?: string;

  constructor() {
    this.gameInit = false;
  }

  setInteractor(interactor: AbstractStoreInteractorService): void {
    this.initSocket();
    this.storeInteractor = interactor;
  }

  createVillage({ userName, userSecret }: CreateVillageData): void {
    this.moderatorName = userName;
    this.sendSocketMessage({
      action: SOCKET_ACTIONS.JOIN,
      data: {
        name: userName,
        secret: userSecret,
      },
    } as CreateMessage);
  }

  joinVillage({ userName, lobbyId, userSecret }: JoinVillageData): void {
    this.sendSocketMessage({
      action: SOCKET_ACTIONS.JOIN,
      data: {
        name: userName,
        secret: userSecret,
        code: lobbyId,
      },
    } as JoinMessage);
  }

  startGame({ werewolves, seer, bodyguard }: StartGameData): void {
    this.sendSocketMessage({
      action: SOCKET_ACTIONS.START,
      data: {
        code: this.getLobbyId(),
        werewolves,
        seer,
        bodyguard,
      },
    } as StartMessage);
  }

  werewolfVoteForPlayer({ playerName }: VoteData): void {
    this.sendSocketMessage({
      action: SOCKET_ACTIONS.WEREWOLF,
      data: {
        code: this.getLobbyId(),
        player: playerName,
      },
    } as Werewolf);
  }

  seerInspectPlayer({ playerName }: VoteData): void {
    this.sendSocketMessage({
      action: SOCKET_ACTIONS.SEER,
      data: {
        code: this.getLobbyId(),
        player: playerName,
      },
    } as Seer);
  }

  bodyguardSavePlayer({ playerName }: VoteData): void {
    this.sendSocketMessage({
      action: SOCKET_ACTIONS.BODYGUARD,
      data: {
        code: this.getLobbyId(),
        player: playerName,
      },
    } as Bodyguard);
  }

  lynchPlayer({ playerName }: VoteData): void {
    this.sendSocketMessage({
      action: SOCKET_ACTIONS.LYNCH,
      data: {
        code: this.getLobbyId(),
        player: playerName,
      },
    } as Lynch);
  }

  sleepNow(): void {
    this.sendSocketMessage({
      action: SOCKET_ACTIONS.SLEEP,
      data: {
        code: this.getLobbyId(),
      },
    } as Sleep);
  }

  private initSocket(): void {
    const websocketUrl =
      localStorage.getItem('WEBSOCKET_URL') || process.env.WEBSOCKET_URL;
    if (!websocketUrl) {
      throw new Error('No WEBSOCKET_URL defined in env vars');
    }

    this.socket = new WebSocket(websocketUrl);
    this.socket.onmessage = this.onSocketMessage.bind(this);
  }

  private sendSocketMessage(message: SocketMessages): void {
    if (!this.socket) {
      throw new Error(
        "No socket available - you haven't started or joiend a game"
      );
    }
    this.socket.send(JSON.stringify(message));
  }

  private onSocketMessage(event: MessageEvent): void {
    const gameState = this.transformSocketGameStateToLocal(
      JSON.parse(event.data) as MessageGameState
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
  }: MessageGameState): GameState {
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

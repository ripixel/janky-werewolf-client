/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { waitFor } from '@testing-library/react';

import WS from 'jest-websocket-mock';

import { AbstractStoreInteractorService } from '../../../service/StoreInteractor';

import Provider from '.';

describe('Providers > Village > WebSocket', () => {
  let mockStoreInteractor: AbstractStoreInteractorService;

  beforeAll(() => {
    global.WebSocket = WS as any;
  });

  beforeEach(() => {
    mockStoreInteractor = {
      getUser: jest.fn(),
      initGame: jest.fn(),
      setUserName: jest.fn(),
      updateGame: jest.fn(),
    };
  });

  afterEach(() => {
    if (WS.instances.length > 0) {
      WS.instances[0].server.clients().forEach((client) => {
        client.close();
      });
    }
  });

  it('constructs correctly', () => {
    const provider = new Provider();

    expect(provider).not.toBeNull();
    expect(WS.instances).toHaveLength(0);
  });

  describe('setInteractor', () => {
    it('inits the websocket', () => {
      const provider = new Provider();

      provider.setInteractor(mockStoreInteractor);

      expect(WS.instances).toHaveLength(1);
      expect((WS.instances[0].server as any).url).toEqual(
        'ws://fakewebsocket.url/'
      );
    });
  });

  describe('createVillage', () => {
    it('sends the correct socket message', async () => {
      const provider = new Provider();

      provider.setInteractor(mockStoreInteractor);
      provider.createVillage({
        userName: 'userName-test',
        userSecret: 'userSecret-test',
      });

      await waitFor(() => {
        expect(WS.instances[0]).toHaveReceivedMessages([
          JSON.stringify({
            action: 'join',
            data: {
              name: 'userName-test',
              secret: 'userSecret-test',
            },
          }),
        ]);
      });
    });
  });

  describe('joinVillage', () => {
    it('sends the correct socket message', async () => {
      const provider = new Provider();

      provider.setInteractor(mockStoreInteractor);
      provider.joinVillage({
        userName: 'userName-test',
        userSecret: 'userSecret-test',
        lobbyId: 'lobbyId-test',
      });

      await waitFor(() => {
        expect(WS.instances[0]).toHaveReceivedMessages([
          JSON.stringify({
            action: 'join',
            data: {
              name: 'userName-test',
              secret: 'userSecret-test',
              code: 'lobbyId-test',
            },
          }),
        ]);
      });
    });
  });

  describe('startGame', () => {
    it('throws an error if no lobby ID available', () => {
      const provider = new Provider();

      provider.setInteractor(mockStoreInteractor);
      expect(() =>
        provider.startGame({
          werewolves: 1,
          seer: true,
          bodyguard: true,
          lycan: true,
        })
      ).toThrow('No lobby id present - did you create/join a game correctly?');
    });

    it('sends the correct socket message when lobby ID is available', async () => {
      const provider = new Provider();

      (provider as any).lobbyId = '1234';

      provider.setInteractor(mockStoreInteractor);
      provider.startGame({
        werewolves: 1,
        seer: true,
        bodyguard: true,
        lycan: true,
      });

      await waitFor(() => {
        expect(WS.instances[0]).toHaveReceivedMessages([
          JSON.stringify({
            action: 'start',
            data: {
              code: '1234',
              werewolves: 1,
              seer: true,
              bodyguard: true,
              lycan: true,
            },
          }),
        ]);
      });
    });
  });

  describe('werewolfVoteForPlayer', () => {
    it('throws an error if no lobby ID available', () => {
      const provider = new Provider();

      provider.setInteractor(mockStoreInteractor);
      expect(() =>
        provider.werewolfVoteForPlayer({
          playerName: 'playerName-test',
        })
      ).toThrow('No lobby id present - did you create/join a game correctly?');
    });

    it('sends the correct socket message when lobby ID is available', async () => {
      const provider = new Provider();

      (provider as any).lobbyId = '1234';

      provider.setInteractor(mockStoreInteractor);
      provider.werewolfVoteForPlayer({
        playerName: 'playerName-test',
      });

      await waitFor(() => {
        expect(WS.instances[0]).toHaveReceivedMessages([
          JSON.stringify({
            action: 'werewolf',
            data: {
              code: '1234',
              player: 'playerName-test',
            },
          }),
        ]);
      });
    });
  });

  describe('seerInspectPlayer', () => {
    it('throws an error if no lobby ID available', () => {
      const provider = new Provider();

      provider.setInteractor(mockStoreInteractor);
      expect(() =>
        provider.seerInspectPlayer({
          playerName: 'playerName-test',
        })
      ).toThrow('No lobby id present - did you create/join a game correctly?');
    });

    it('sends the correct socket message when lobby ID is available', async () => {
      const provider = new Provider();

      (provider as any).lobbyId = '1234';

      provider.setInteractor(mockStoreInteractor);
      provider.seerInspectPlayer({
        playerName: 'playerName-test',
      });

      await waitFor(() => {
        expect(WS.instances[0]).toHaveReceivedMessages([
          JSON.stringify({
            action: 'seer',
            data: {
              code: '1234',
              player: 'playerName-test',
            },
          }),
        ]);
      });
    });
  });

  describe('bodyguardSavePlayer', () => {
    it('throws an error if no lobby ID available', () => {
      const provider = new Provider();

      provider.setInteractor(mockStoreInteractor);
      expect(() =>
        provider.bodyguardSavePlayer({
          playerName: 'playerName-test',
        })
      ).toThrow('No lobby id present - did you create/join a game correctly?');
    });

    it('sends the correct socket message when lobby ID is available', async () => {
      const provider = new Provider();

      (provider as any).lobbyId = '1234';

      provider.setInteractor(mockStoreInteractor);
      provider.bodyguardSavePlayer({
        playerName: 'playerName-test',
      });

      await waitFor(() => {
        expect(WS.instances[0]).toHaveReceivedMessages([
          JSON.stringify({
            action: 'bodyguard',
            data: {
              code: '1234',
              player: 'playerName-test',
            },
          }),
        ]);
      });
    });
  });

  describe('lynchPlayer', () => {
    it('throws an error if no lobby ID available', () => {
      const provider = new Provider();

      provider.setInteractor(mockStoreInteractor);
      expect(() =>
        provider.lynchPlayer({
          playerName: 'playerName-test',
        })
      ).toThrow('No lobby id present - did you create/join a game correctly?');
    });

    it('sends the correct socket message when lobby ID is available', async () => {
      const provider = new Provider();

      (provider as any).lobbyId = '1234';

      provider.setInteractor(mockStoreInteractor);
      provider.lynchPlayer({
        playerName: 'playerName-test',
      });

      await waitFor(() => {
        expect(WS.instances[0]).toHaveReceivedMessages([
          JSON.stringify({
            action: 'lynch',
            data: {
              code: '1234',
              player: 'playerName-test',
            },
          }),
        ]);
      });
    });
  });

  describe('sleepNow', () => {
    it('throws an error if no lobby ID available', () => {
      const provider = new Provider();

      provider.setInteractor(mockStoreInteractor);
      expect(() => provider.sleepNow()).toThrow(
        'No lobby id present - did you create/join a game correctly?'
      );
    });

    it('sends the correct socket message when lobby ID is available', async () => {
      const provider = new Provider();

      (provider as any).lobbyId = '1234';

      provider.setInteractor(mockStoreInteractor);
      provider.sleepNow();

      await waitFor(() => {
        expect(WS.instances[0]).toHaveReceivedMessages([
          JSON.stringify({
            action: 'sleep',
            data: {
              code: '1234',
            },
          }),
        ]);
      });
    });
  });

  // Cannot figure out how to test socket sending properly - maybe need to not use such a
  // balls-to-the-wall mock of the websockets (that's doing lots of funky "real" client stuff).
  // Seems that every time I do a "new WebSocket()" it actually uses the same WebSocket mock
  // and just creates a new client, which is annoying as all hell.
});

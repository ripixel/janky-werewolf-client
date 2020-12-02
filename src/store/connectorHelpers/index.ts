import { PHASE_NAME, WerewolfPhaseData } from '../../types/phase';
import { Player, PLAYER_ROLE } from '../../types/player';
import { logError } from '../../utils/logger';
import { State } from '../reducers';

export const getSelf = (state: State): Player | undefined =>
  state.game?.players.find((player) => player.name === state.user.name);

const sortPlayersByName = (players: Player[]): Player[] =>
  players.sort((a, b) =>
    a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
  );

export const getAllPlayers = (state: State, excludeSelf = false): Player[] =>
  sortPlayersByName(
    (excludeSelf
      ? state.game?.players.filter((player) => player.name !== state.user.name)
      : state.game?.players) || []
  );

export const getPlayersWithRole = (
  state: State,
  role: PLAYER_ROLE,
  excludeSelf = false
): Player[] =>
  sortPlayersByName(
    state.game?.players.filter((player) => {
      const matchesRole = player.attributes.role === role;

      if (!matchesRole) {
        return false;
      }

      if (excludeSelf) {
        return player.name !== state.user.name;
      }

      return true;
    }) || []
  );

export const getPlayersWithoutRole = (
  state: State,
  role: PLAYER_ROLE,
  excludeSelf = false
): Player[] =>
  sortPlayersByName(
    state.game?.players.filter((player) => {
      const matchesRole = player.attributes.role !== role;

      if (!matchesRole) {
        return false;
      }

      if (excludeSelf) {
        return player.name !== state.user.name;
      }

      return true;
    }) || []
  );

export const getPhaseName = (state: State): PHASE_NAME | undefined =>
  state.game?.phase.name;

export const getWerewolfVotes = (state: State): { [key: string]: number } => {
  const playerNames = state.game?.players
    .filter(
      (player) =>
        player.attributes.role !== PLAYER_ROLE.MODERATOR &&
        player.attributes.role !== PLAYER_ROLE.WEREWOLF &&
        player.attributes.alive
    )
    .map((player) => player.name);

  if (!playerNames || playerNames.length === 0) {
    logError(
      new Error('Could not find player names while getting werewolf votes')
    );
    return {};
  }

  const phaseData = state.game?.phase.data as WerewolfPhaseData;

  const werewolfVotes: { [key: string]: number } = {};

  playerNames.forEach((playerName) => {
    const votesForPlayer = Object.values(phaseData).filter(
      (votedForName) => votedForName === playerName
    );

    werewolfVotes[playerName] = votesForPlayer.length;
  });

  return werewolfVotes;
};

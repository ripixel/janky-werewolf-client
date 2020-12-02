import { connect } from 'react-redux';

import { State } from '../../../../../store/reducers';
import { PHASE_NAME, WerewolfPhaseData } from '../../../../../types/phase';
import { PLAYER_ROLE } from '../../../../../types/player';

export interface PropsFromState {
  werewolfVotes: { [key: string]: number };
}

export const mapStateToProps = (state: State): PropsFromState => {
  if (!state.game) {
    throw new Error('No game yet initialised!');
  }

  if (state.game.phase.name !== PHASE_NAME.WEREWOLF) {
    throw new Error('Not in the Werewolf phase - something is wrong');
  }

  const playerNames = state.game.players
    .filter(
      (player) =>
        player.attributes.role !== PLAYER_ROLE.MODERATOR &&
        player.attributes.role !== PLAYER_ROLE.WEREWOLF &&
        player.attributes.alive
    )
    .map((player) => player.name);

  const phaseData = state.game.phase.data as WerewolfPhaseData;

  const werewolfVotes: { [key: string]: number } = {};

  playerNames.forEach((playerName) => {
    const votesForPlayer = Object.values(phaseData).filter(
      (votedForName) => votedForName === playerName
    );

    werewolfVotes[playerName] = votesForPlayer.length;
  });

  return {
    werewolfVotes,
  };
};

export default connect(mapStateToProps);

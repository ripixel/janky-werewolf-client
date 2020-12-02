import { connect } from 'react-redux';

import { State } from '../../../store/reducers';
import { PHASE_NAME } from '../../../types/phase';
import { Player, PLAYER_ROLE } from '../../../types/player';
import { logError } from '../../../utils/logger';

export interface PropsFromState {
  self: Player;
  players: Player[];
  phaseName: PHASE_NAME;
}

export const mapStateToProps = (state: State): PropsFromState => {
  if (!state.game) {
    throw new Error('No game yet initialised!');
  }

  const self = state.game.players.find(
    (player) => player.name === state.user.name
  );

  if (!self) {
    logError(
      new Error('Could not find self in player list - something funky!')
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return {} as any;
  }

  return {
    self,
    players: state.game.players
      .filter(
        (player) =>
          player.name !== self.name &&
          player.attributes.role !== PLAYER_ROLE.MODERATOR
      )
      .sort((a, b) =>
        a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
      ),
    phaseName: state.game.phase.name,
  };
};

export default connect(mapStateToProps);

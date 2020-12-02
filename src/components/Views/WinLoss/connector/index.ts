import { connect } from 'react-redux';

import { State } from '../../../../store/reducers';
import { PHASE_NAME, EndPhaseData } from '../../../../types/phase';
import { PLAYER_TEAM } from '../../../../types/player';

export interface PropsFromState {
  winner: PLAYER_TEAM.EVIL | PLAYER_TEAM.GOOD;
}

export const mapStateToProps = (state: State): PropsFromState => {
  if (!state.game) {
    throw new Error('No game yet initialised!');
  }

  if (state.game.phase.name !== PHASE_NAME.END) {
    throw new Error('Not in the End phase - something is wrong');
  }

  return {
    winner: (state.game.phase.data as EndPhaseData).winner,
  };
};

export default connect(mapStateToProps);

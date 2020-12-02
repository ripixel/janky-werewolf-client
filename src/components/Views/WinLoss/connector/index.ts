import { connect } from 'react-redux';

import { IState } from '../../../../store/reducers';
import { PHASE_NAME, IEndPhaseData } from '../../../../types/phase';
import { PLAYER_TEAM } from '../../../../types/player';

export interface PropsFromState {
  winner: PLAYER_TEAM.EVIL | PLAYER_TEAM.GOOD;
}

export const mapStateToProps = (state: IState): PropsFromState => {
  if (!state.game) {
    throw new Error('No game yet initialised!');
  }

  if (state.game.phase.name !== PHASE_NAME.END) {
    throw new Error('Not in the End phase - something is wrong');
  }

  return {
    winner: (state.game.phase.data as IEndPhaseData).winner,
  };
};

export default connect(mapStateToProps);

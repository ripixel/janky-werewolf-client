import { connect } from 'react-redux';

import { IState } from '../../../store/reducers';
import { PHASE_NAME } from '../../../types/phase';
import { PLAYER_ROLE } from '../../../types/player';

export interface PropsFromState {
  phaseName?: PHASE_NAME;
  role?: PLAYER_ROLE;
}

export const mapStateToProps = (state: IState): PropsFromState => {
  const self = state.game?.players.find(
    (player) => player.name === state.user.name
  );

  return {
    phaseName: state.game?.phase.name,
    role: self?.attributes.role,
  };
};

export default connect(mapStateToProps);

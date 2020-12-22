import React from 'react';
import { connect } from 'react-redux';

import { State } from '../../../store/reducers';
import { EndPhaseData } from '../../../types/phase';
import { PLAYER_TEAM } from '../../../types/player';

export interface Props {
  winner: PLAYER_TEAM.EVIL | PLAYER_TEAM.GOOD;
}

export const WinLoss: React.FC<Props> = (props) => {
  // If we're rendering this, the game is over. Clear the lastLobbyId from localstorage
  // so that the restart screen appears
  window.localStorage.removeItem('lastLobbyId');

  return (
    <React.Fragment>
      <h2>{props.winner} Team Won!</h2>
    </React.Fragment>
  );
};

export const mapStateToProps = (state: State): Props => {
  return {
    winner: (state.game?.phase.data as EndPhaseData).winner,
  };
};

export default connect(mapStateToProps)(WinLoss);

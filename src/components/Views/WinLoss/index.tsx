import React from 'react';

import connector, { PropsFromState } from './connector';

export const WinLoss: React.FC<PropsFromState> = (props) => {
  // If we're rendering this, the game is over. Clear the lastLobbyId from localstorage
  // so that the restart screen appears
  window.localStorage.removeItem('lastLobbyId');
  window.localStorage.removeItem('previousPlayersState');

  return (
    <React.Fragment>
      <h2>{props.winner} Team Won!</h2>
    </React.Fragment>
  );
};

export default connector(WinLoss);

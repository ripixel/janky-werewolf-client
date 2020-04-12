import { connect } from 'react-redux';

import { IPlayer } from '../../../../types/player';
import { IState } from '../../../../store/reducers';

export interface IPropsFromState {
  players: IPlayer[];
}

export const mapStateToProps = (state: IState): IPropsFromState => {
  if (!state.game) {
    throw new Error('No game yet initialised!');
  }

  return {
    players: state.game.players,
  };
};

export default connect(mapStateToProps);

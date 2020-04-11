import { connect } from 'react-redux';

import { IPlayer } from '../../../../../../types/player';
import { IState } from '../../../../../../store/reducers';

export interface IPropsFromState {
  villageName: string;
  gameCode: string;
  moderator?: IPlayer;
  players: IPlayer[];
}

export const mapStateToProps = (state: IState): IPropsFromState => {
  if (!state.game) {
    throw new Error('No game yet initialised!');
  }

  return {
    villageName: state.game.villageName,
    gameCode: state.game.gameCode,
    moderator: state.game.moderator,
    players: state.game.players,
  };
};

export default connect(mapStateToProps);

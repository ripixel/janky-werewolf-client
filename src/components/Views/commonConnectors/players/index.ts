import { connect } from 'react-redux';

import { IPlayer, PLAYER_ROLE } from '../../../../types/player';
import { IState } from '../../../../store/reducers';

export interface IPropsFromState {
  players: IPlayer[];
}

export const mapStateToProps = (state: IState): IPropsFromState => {
  if (!state.game) {
    throw new Error('No game yet initialised!');
  }

  return {
    players: state.game.players
      .filter(
        (player) =>
          player.attributes.role !== PLAYER_ROLE.MODERATOR &&
          player.name !== state.user.name
      )
      .sort((a, b) =>
        a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
      ),
  };
};

export default connect(mapStateToProps);

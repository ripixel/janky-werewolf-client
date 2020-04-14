import { connect } from 'react-redux';

import { IState } from '../../../../../store/reducers';

export interface IPropsFromState {
  isModerator: boolean;
}

export const mapStateToProps = (state: IState): IPropsFromState => {
  if (!state.game) {
    throw new Error('No game yet initialised!');
  }

  return {
    isModerator: state.game.moderator?.name === state.user.name,
  };
};

export default connect(mapStateToProps);

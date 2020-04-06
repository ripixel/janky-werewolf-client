import { connect } from 'react-redux';

import { IState } from '../../../../store/reducers';

export interface IPropsFromState {
  phaseName?: string;
}

export const mapStateToProps = (state: IState): IPropsFromState => ({
  phaseName: state.game?.phase.name,
});

export default connect(mapStateToProps);

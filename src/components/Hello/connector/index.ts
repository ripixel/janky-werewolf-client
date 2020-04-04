import { connect } from 'react-redux';

import { IState } from '../../../store/reducers';

export interface IPropsFromState {
  userId: string;
}

export const mapStateToProps = (state: IState): IPropsFromState => ({
  userId: state.user.id,
});

export default connect(mapStateToProps);

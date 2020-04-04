import { connect } from 'react-redux';

import { IState } from '../../store/reducers';

interface IPropsFromState {
  userId: string;
}

const mapStateToProps = (state: IState): IPropsFromState => ({
  userId: state.user.id,
});

export default connect(mapStateToProps);

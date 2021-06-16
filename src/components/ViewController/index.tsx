import React from 'react';
import { connect } from 'react-redux';

import PlayerWrapper from '../PlayerWrapper';

import { PHASE_NAME } from '../../types/phase';
import { Player } from '../../types/player';

import { logError } from '../../utils/logger';

import { State } from '../../store/reducers';
import { getPhaseName, getSelf } from '../../store/connectorHelpers';

import JoinOrCreate from '../Views/JoinOrCreate';

import { COMPONENT_MATRIX } from './matrix';

interface Props {
  phaseName?: PHASE_NAME;
  self?: Player;
}

export const ViewController: React.FC<Props> = (props) => {
  if (!props.phaseName) {
    return <JoinOrCreate />;
  }

  if (!props.self) {
    logError(new Error('Phase exists but no self given'));
    return null;
  }

  const MatrixComponent = (COMPONENT_MATRIX[props.phaseName][
    props.self.attributes.role
  ] || COMPONENT_MATRIX[props.phaseName].default) as React.FC<{}>;

  return props.phaseName !== PHASE_NAME.LOBBY ? (
    <PlayerWrapper>
      <MatrixComponent />
    </PlayerWrapper>
  ) : (
    <MatrixComponent />
  );
};

export const mapStateToProps = (state: State): Props => ({
  self: getSelf(state),
  phaseName: getPhaseName(state),
});

export default connect(mapStateToProps)(ViewController);

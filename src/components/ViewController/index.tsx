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

  if (!props.self?.attributes.role) {
    logError(new Error('Phase exists but player does not have a role'));
    return null;
  }

  const MatrixComponent =
    COMPONENT_MATRIX[props.phaseName][props.self.attributes.role];

  if (!MatrixComponent) {
    logError(
      new Error(
        `No component found for phase ${props.phaseName} with role ${props.self?.attributes.role}`
      )
    );
    return null;
  }

  return (
    <PlayerWrapper>
      <MatrixComponent />
    </PlayerWrapper>
  );
};

export const mapStateToProps = (state: State): Props => ({
  self: getSelf(state),
  phaseName: getPhaseName(state),
});

export default connect(mapStateToProps)(ViewController);

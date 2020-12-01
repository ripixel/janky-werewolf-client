import React from 'react';

import DayModeratorView from '../Views/Day/Moderator';
import DayPlayerView from '../Views/Day/Player';
import LobbyModeratorView from '../Views/Lobby/Moderator';
import LobbyPlayerView from '../Views/Lobby/Player';
import NoPhaseView from '../Views/NoPhase';
import SeerPhaseNonSeerView from '../Views/Seer/NonSeer';
import SeerPhaseSeerView from '../Views/Seer/Seer';
import BodyguardPhaseBodyguardView from '../Views/Bodyguard/Bodyguard';
import BodyguaredPhaseNonBodyguardView from '../Views/Bodyguard/NonBodyguard';
import WerewolfPhaseNonWerewolfView from '../Views/Werewolf/NonWerewolf';
import WerewolfPhaseWerewolfView from '../Views/Werewolf/Werewolf';
import EndView from '../Views/End';
import PlayerWrapper from '../PlayerWrapper';

import { PHASE_NAME } from '../../types/phase';
import { PLAYER_ROLE } from '../../types/player';

import { logError } from '../../utils/logger';

import connector, { IPropsFromState } from './connector';

const COMPONENT_MATRIX: {
  [key in PHASE_NAME]: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key in PLAYER_ROLE]?: React.FC<any>;
  };
} = {
  [PHASE_NAME.LOBBY]: {
    [PLAYER_ROLE.MODERATOR]: LobbyModeratorView,
    [PLAYER_ROLE.UNKNOWN]: LobbyPlayerView,
  },
  [PHASE_NAME.DAY]: {
    [PLAYER_ROLE.BODYGUARD]: DayPlayerView,
    [PLAYER_ROLE.MODERATOR]: DayModeratorView,
    [PLAYER_ROLE.SEER]: DayPlayerView,
    [PLAYER_ROLE.VILLAGER]: DayPlayerView,
    [PLAYER_ROLE.WEREWOLF]: DayPlayerView,
  },
  [PHASE_NAME.SEER]: {
    [PLAYER_ROLE.BODYGUARD]: SeerPhaseNonSeerView,
    [PLAYER_ROLE.MODERATOR]: SeerPhaseNonSeerView,
    [PLAYER_ROLE.SEER]: SeerPhaseSeerView,
    [PLAYER_ROLE.VILLAGER]: SeerPhaseNonSeerView,
    [PLAYER_ROLE.WEREWOLF]: SeerPhaseNonSeerView,
  },
  [PHASE_NAME.BODYGUARD]: {
    [PLAYER_ROLE.BODYGUARD]: BodyguardPhaseBodyguardView,
    [PLAYER_ROLE.MODERATOR]: BodyguaredPhaseNonBodyguardView,
    [PLAYER_ROLE.SEER]: BodyguaredPhaseNonBodyguardView,
    [PLAYER_ROLE.VILLAGER]: BodyguaredPhaseNonBodyguardView,
    [PLAYER_ROLE.WEREWOLF]: BodyguaredPhaseNonBodyguardView,
  },
  [PHASE_NAME.WEREWOLF]: {
    [PLAYER_ROLE.BODYGUARD]: WerewolfPhaseNonWerewolfView,
    [PLAYER_ROLE.MODERATOR]: WerewolfPhaseNonWerewolfView,
    [PLAYER_ROLE.SEER]: WerewolfPhaseNonWerewolfView,
    [PLAYER_ROLE.VILLAGER]: WerewolfPhaseNonWerewolfView,
    [PLAYER_ROLE.WEREWOLF]: WerewolfPhaseWerewolfView,
  },
  [PHASE_NAME.END]: {
    [PLAYER_ROLE.BODYGUARD]: EndView,
    [PLAYER_ROLE.MODERATOR]: EndView,
    [PLAYER_ROLE.SEER]: EndView,
    [PLAYER_ROLE.VILLAGER]: EndView,
    [PLAYER_ROLE.WEREWOLF]: EndView,
  },
};

export const ViewController: React.FC<IPropsFromState> = (props) => {
  console.log('RENDERING VIEW CONTROLLER', props);

  if (!props.phaseName) {
    return <NoPhaseView />;
  }

  if (props.phaseName && !props.role) {
    logError(new Error('Phase exists but player does not have a role'));
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const MatrixComponent = COMPONENT_MATRIX[props.phaseName][props.role!];

  if (!MatrixComponent) {
    logError(
      new Error(
        `No component found for phase ${props.phaseName} with role ${props.role}`
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

export default connector(ViewController);

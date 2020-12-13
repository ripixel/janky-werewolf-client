import { PHASE_NAME } from '../../types/phase';
import { PLAYER_ROLE } from '../../types/player';

import Setup from '../Views/Setup';
import WaitingForStartTextOnly from '../Views/TextOnly/WaitingForStart';
import DaytimeTextOnly from '../Views/TextOnly/Daytime';
import LynchPickSinglePlayer from '../Views/PickSinglePlayer/Lynch';
import SeerPickSinglePlayer from '../Views/PickSinglePlayer/Seer';
import NonSeerTextOnly from '../Views/TextOnly/NonSeer';
import NonBodyguardTextOnly from '../Views/TextOnly/NonBodyguard';
import BodyguardPickSinglePlayer from '../Views/PickSinglePlayer/Bodyguard';
import NonWerewolfTextOnly from '../Views/TextOnly/NonWerewolf';
import WerewolfVoteSinglePlayer from '../Views/VoteSinglePlayer/Werewolf';
import WinLoss from '../Views/WinLoss';

export const COMPONENT_MATRIX: {
  [key in PHASE_NAME]: {
    [key in PLAYER_ROLE | 'default']?: React.FC<{}>;
  };
} = {
  [PHASE_NAME.LOBBY]: {
    [PLAYER_ROLE.MODERATOR]: Setup,
    default: WaitingForStartTextOnly,
  },
  [PHASE_NAME.DAY]: {
    [PLAYER_ROLE.MODERATOR]: LynchPickSinglePlayer,
    default: DaytimeTextOnly,
  },
  [PHASE_NAME.SEER]: {
    [PLAYER_ROLE.SEER]: SeerPickSinglePlayer,
    default: NonSeerTextOnly,
  },
  [PHASE_NAME.BODYGUARD]: {
    [PLAYER_ROLE.BODYGUARD]: BodyguardPickSinglePlayer,
    default: NonBodyguardTextOnly,
  },
  [PHASE_NAME.WEREWOLF]: {
    [PLAYER_ROLE.WEREWOLF]: WerewolfVoteSinglePlayer,
    default: NonWerewolfTextOnly,
  },
  [PHASE_NAME.END]: {
    default: WinLoss,
  },
};

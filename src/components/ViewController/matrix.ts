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
    [key in PLAYER_ROLE]?: React.FC<{}>;
  };
} = {
  [PHASE_NAME.LOBBY]: {
    [PLAYER_ROLE.MODERATOR]: Setup,
    [PLAYER_ROLE.UNKNOWN]: WaitingForStartTextOnly,
  },
  [PHASE_NAME.DAY]: {
    [PLAYER_ROLE.BODYGUARD]: DaytimeTextOnly,
    [PLAYER_ROLE.MODERATOR]: LynchPickSinglePlayer,
    [PLAYER_ROLE.SEER]: DaytimeTextOnly,
    [PLAYER_ROLE.VILLAGER]: DaytimeTextOnly,
    [PLAYER_ROLE.WEREWOLF]: DaytimeTextOnly,
  },
  [PHASE_NAME.SEER]: {
    [PLAYER_ROLE.BODYGUARD]: NonSeerTextOnly,
    [PLAYER_ROLE.MODERATOR]: NonSeerTextOnly,
    [PLAYER_ROLE.SEER]: SeerPickSinglePlayer,
    [PLAYER_ROLE.VILLAGER]: NonSeerTextOnly,
    [PLAYER_ROLE.WEREWOLF]: NonSeerTextOnly,
  },
  [PHASE_NAME.BODYGUARD]: {
    [PLAYER_ROLE.BODYGUARD]: BodyguardPickSinglePlayer,
    [PLAYER_ROLE.MODERATOR]: NonBodyguardTextOnly,
    [PLAYER_ROLE.SEER]: NonBodyguardTextOnly,
    [PLAYER_ROLE.VILLAGER]: NonBodyguardTextOnly,
    [PLAYER_ROLE.WEREWOLF]: NonBodyguardTextOnly,
  },
  [PHASE_NAME.WEREWOLF]: {
    [PLAYER_ROLE.BODYGUARD]: NonWerewolfTextOnly,
    [PLAYER_ROLE.MODERATOR]: NonWerewolfTextOnly,
    [PLAYER_ROLE.SEER]: NonWerewolfTextOnly,
    [PLAYER_ROLE.VILLAGER]: NonWerewolfTextOnly,
    [PLAYER_ROLE.WEREWOLF]: WerewolfVoteSinglePlayer,
  },
  [PHASE_NAME.END]: {
    [PLAYER_ROLE.BODYGUARD]: WinLoss,
    [PLAYER_ROLE.MODERATOR]: WinLoss,
    [PLAYER_ROLE.SEER]: WinLoss,
    [PLAYER_ROLE.VILLAGER]: WinLoss,
    [PLAYER_ROLE.WEREWOLF]: WinLoss,
  },
};

import { PLAYER_ROLE, PLAYER_TEAM } from '../../types/player';

export const ROLE_TEXT = {
  [PLAYER_ROLE.VILLAGER]: 'No special powers',
  [PLAYER_ROLE.SEER]:
    "Each night, choose someone and find out if they're good or evil.",
  [PLAYER_ROLE.BODYGUARD]:
    'Each night, choose someone to protect. If the werewolves try to kill them, they will be saved. You cannot guard the same person on consecutive nights.',
  [PLAYER_ROLE.WEREWOLF]:
    'Each night, choose someone to kill. All werewolves must agree.',
  [PLAYER_ROLE.MODERATOR]:
    "You are running the game! Do your talking and explain what's happening.",
  [PLAYER_ROLE.LYCAN]:
    'No special powers but you will appear to the seer as a werewolf.',
  [PLAYER_ROLE.UNKNOWN]:
    'You should never see this. If you do, tell James/Mike',
};

export const TEAM_TEXT = {
  [PLAYER_TEAM.EVIL]:
    'You win when the number of good players is equal to or less than the number of werewolves alive',
  [PLAYER_TEAM.GOOD]: 'You win when all the evil players are dead',
  [PLAYER_TEAM.UNKNOWN]:
    'You should never see this. If you do, tell James/Mike',
};

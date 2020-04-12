import * as React from 'react';
import { IPlayer, PLAYER_ROLE, PLAYER_TEAM } from '../../../../../types/player';

interface IProps {
  self: IPlayer;
}

const roleText = {
  [PLAYER_ROLE.VILLAGER]: 'No special powers',
  [PLAYER_ROLE.SEER]:
    "Each night, choose someone and find out if they're good or evil",
  [PLAYER_ROLE.WEREWOLF]:
    'Each night, choose someone to kill. All werewolves must agree.',
  [PLAYER_ROLE.MODERATOR]:
    'You should never see this. If you do, tell James/Mike',
  [PLAYER_ROLE.UNKNOWN]:
    'You should never see this. If you do, tell James/Mike',
};

const teamText = {
  [PLAYER_TEAM.EVIL]:
    'You win when the number of good players is equal to or less than the number of werewolves alive',
  [PLAYER_TEAM.GOOD]: 'You win when all the evil players are dead',
  [PLAYER_TEAM.UNKNOWN]:
    'You should never see this. If you do, tell James/Mike',
};

export const MobileDayPlayerView = (props: IProps): JSX.Element => (
  <React.Fragment>
    <h2>
      You are a {props.self.attributes.role} - {props.self.attributes.team} -{' '}
      {props.self.attributes.alive ? 'Alive' : 'Dead'}
    </h2>

    {props.self.attributes.alive ? (
      <React.Fragment>
        <h3>Team Description</h3>
        <p>{teamText[props.self.attributes.team]}</p>

        <h3>Role Description</h3>
        <p>{roleText[props.self.attributes.role]}</p>

        <p>Talk, and suggest a lynching maybe?</p>
      </React.Fragment>
    ) : (
      <p>You are dead! So shhhh! Ghosts can&apos;t talk!</p>
    )}
  </React.Fragment>
);

export default MobileDayPlayerView;

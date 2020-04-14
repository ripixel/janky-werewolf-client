import * as React from 'react';
import classnames from 'classnames';

import connector, { IPropsFromState } from './connector';
import { PLAYER_ROLE, PLAYER_TEAM } from '../../types/player';

import styles from './styles.scss';

type TProps = IPropsFromState & {
  children: React.ReactNode;
};

const roleText = {
  [PLAYER_ROLE.VILLAGER]: 'No special powers',
  [PLAYER_ROLE.SEER]:
    "Each night, choose someone and find out if they're good or evil",
  [PLAYER_ROLE.WEREWOLF]:
    'Each night, choose someone to kill. All werewolves must agree.',
  [PLAYER_ROLE.MODERATOR]:
    "You are running the game! Do your talking and explain what's happening.",
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

export const PlayerWrapper = (props: TProps): JSX.Element => {
  let aliveStatus = '';
  if (props.self.attributes.role !== PLAYER_ROLE.MODERATOR) {
    aliveStatus = props.self.attributes.alive ? ' - Alive' : ' - Dead';
  }

  const selfInfoClasses = classnames(styles.selfInfo, {
    [styles['selfInfo--team-Good']]:
      props.self.attributes.team === PLAYER_TEAM.GOOD,
    [styles['selfInfo--team-Evil']]:
      props.self.attributes.team === PLAYER_TEAM.EVIL,
  });

  return (
    <div className={styles.wrapper}>
      <div className={selfInfoClasses}>
        <h3>{props.self.name}</h3>
        <h4>
          {props.self.attributes.role}
          {aliveStatus}
        </h4>
      </div>
      <div className={styles.content}>{props.children}</div>
      <div className={styles.instructions}>
        <h3>Instructions</h3>
        <p>{roleText[props.self.attributes.role]}</p>
        <p>
          {props.self.attributes.role !== PLAYER_ROLE.MODERATOR &&
            teamText[props.self.attributes.team]}
        </p>
      </div>
      <div className={styles.players}>
        <h3>Players</h3>
        <table>
          {props.players.map((player) => (
            <tr key={player.name}>
              <td>{player.name}</td>
              <td>{player.attributes.team}</td>
              <td>{player.attributes.role}</td>
              <td>{player.attributes.alive ? 'Alive' : 'Dead'}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default connector(PlayerWrapper);

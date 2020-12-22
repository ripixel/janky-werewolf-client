import React from 'react';
import classnames from 'classnames';

import { PLAYER_ROLE, PLAYER_TEAM, Player } from '../../types/player';

import styles from './styles.scss';
import { PHASE_NAME } from '../../types/phase';
import { connect } from 'react-redux';
import { State } from '../../store/reducers';
import {
  getOldPlayersWithoutRole,
  getPhaseName,
  getPlayersWithoutRole,
  getSelf,
} from '../../store/connectorHelpers';

interface Props {
  self?: Player;
  players: Player[];
  oldPlayers: Player[];
  phaseName?: PHASE_NAME;
}

const ROLE_TEXT = {
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

const TEAM_TEXT = {
  [PLAYER_TEAM.EVIL]:
    'You win when the number of good players is equal to or less than the number of werewolves alive',
  [PLAYER_TEAM.GOOD]: 'You win when all the evil players are dead',
  [PLAYER_TEAM.UNKNOWN]:
    'You should never see this. If you do, tell James/Mike',
};

export const alertOnPlayerStateChanges = (
  oldPlayers: Player[],
  newPlayers: Player[]
): void => {
  if (oldPlayers.length === 0) {
    return;
  }

  const changes: string[] = [];

  oldPlayers.forEach((oldPlayer) => {
    const newPlayer = newPlayers.find(
      (player) => player.name === oldPlayer.name
    );

    if (!newPlayer) {
      return;
    }

    if (newPlayer.attributes.alive !== oldPlayer.attributes.alive) {
      changes.push(
        `${newPlayer.name} is now dead! They were a ${newPlayer.attributes.role}.`
      );
    } else if (newPlayer.attributes.team !== oldPlayer.attributes.team) {
      changes.push(
        `[ONLY TO YOU] You now know that ${newPlayer.name} is ${newPlayer.attributes.team}.`
      );
    }
  });

  if (changes.length > 0) {
    alert(changes.join('\n'));
  }
};

export const PlayerWrapper: React.FC<Props> = (props) => {
  /**
   * This section is a dirty, dirty hack - but it will do for a quick and easy last-changed alert
   */

  if (!props.self || !props.phaseName) {
    throw new Error('No game yet initialised!');
  }

  if (props.self.attributes.role !== PLAYER_ROLE.MODERATOR) {
    alertOnPlayerStateChanges(props.oldPlayers, props.players);
  }

  let aliveStatus = '';
  if (props.self.attributes.role !== PLAYER_ROLE.MODERATOR) {
    aliveStatus = props.self.attributes.alive ? ' - Alive' : ' - Dead';
  }

  const selfInfoClasses = classnames(styles.selfInfo, {
    [styles['selfInfo--team-Good']]:
      props.self.attributes.team === PLAYER_TEAM.GOOD,
    [styles['selfInfo--team-Evil']]:
      props.self.attributes.team === PLAYER_TEAM.EVIL,
    [styles['selfInfo--team-Unknown']]:
      props.self.attributes.team === PLAYER_TEAM.UNKNOWN,
  });

  const shouldRenderChildren =
    props.self.attributes.alive || props.phaseName === PHASE_NAME.END;

  return (
    <div className={styles.wrapper}>
      <div className={selfInfoClasses}>
        <h3>{props.self.name}</h3>
        <h4>
          {props.self.attributes.role}
          {aliveStatus}
        </h4>
      </div>
      <div className={styles.content}>
        {shouldRenderChildren ? (
          props.children
        ) : (
          <p>You&apos;re dead! Ghosts can&apos;t talk, be quiet!</p>
        )}
      </div>
      <div className={styles.instructions}>
        <h3>Instructions</h3>
        <p>{ROLE_TEXT[props.self.attributes.role]}</p>
        <p>
          {props.self.attributes.role !== PLAYER_ROLE.MODERATOR &&
            TEAM_TEXT[props.self.attributes.team]}
        </p>
      </div>
      <div className={styles.players}>
        <h3>Players</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Team</th>
              <th>Role</th>
              <th>Alive</th>
            </tr>
          </thead>
          <tbody>
            {props.players.map((player) => (
              <tr key={player.name}>
                <td>{player.name}</td>
                <td>{player.attributes.team}</td>
                <td>{player.attributes.role}</td>
                <td>{player.attributes.alive ? 'Alive' : 'Dead'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const mapStateToProps = (state: State): Props => ({
  self: getSelf(state),
  players: getPlayersWithoutRole(state, PLAYER_ROLE.MODERATOR, true),
  oldPlayers: getOldPlayersWithoutRole(state, PLAYER_ROLE.MODERATOR, true),
  phaseName: getPhaseName(state),
});

export default connect(mapStateToProps)(PlayerWrapper);

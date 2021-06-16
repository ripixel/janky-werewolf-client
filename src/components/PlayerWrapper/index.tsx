import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

import { PLAYER_ROLE, PLAYER_TEAM, Player } from '../../types/player';
import { PHASE_NAME } from '../../types/phase';
import { State } from '../../store/reducers';
import {
  getPhaseName,
  getPlayersWithoutRole,
  getSelf,
} from '../../store/connectorHelpers';
import { ROLE_TEXT, TEAM_TEXT } from './copy';

import styles from './styles.scss';

interface Props {
  self?: Player;
  players: Player[];
  phaseName?: PHASE_NAME;
}

export const PlayerWrapper: React.FC<Props> = (props) => {
  if (!props.self || !props.phaseName) {
    throw new Error('No game yet initialised!');
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
  phaseName: getPhaseName(state),
});

export default connect(mapStateToProps)(PlayerWrapper);

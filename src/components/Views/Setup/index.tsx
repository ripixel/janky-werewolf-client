import React from 'react';
import { connect } from 'react-redux';

import { VillageServiceContext } from '../../../context/VillageService';
import NumberInput from '../../Input/Number';
import CheckboxInput from '../../Input/Checkbox';
import Button from '../../Button';

import styles from './styles.scss';
import { Player, PLAYER_ROLE } from '../../../types/player';
import { State } from '../../../store/reducers';
import {
  getPlayersWithoutRole,
  getPlayersWithRole,
} from '../../../store/connectorHelpers';
import { logError } from '../../../utils/logger';

interface Props {
  villageName?: string;
  lobbyId?: string;
  moderator?: Player;
  players: Player[];
}

export const Setup: React.FC<Props> = (props) => {
  const [villagersCount, setVillagersCount] = React.useState(0);
  const [werewolvesCount, setWerewolvesCount] = React.useState(0);
  const [seerEnabled, setSeerEnabled] = React.useState(true);
  const [bodyguardEnabled, setBodyguardEnabled] = React.useState(false);
  const [lycanEnabled, setLycanEnabled] = React.useState(false);
  const villageService = React.useContext(VillageServiceContext);

  const onClick = (): void => {
    villageService.startGame(
      werewolvesCount,
      seerEnabled,
      bodyguardEnabled,
      lycanEnabled
    );
  };

  if (!props.villageName || !props.lobbyId || !props.moderator) {
    logError(
      new Error('Missing villageName, lobbyId, or moderator for Setup view')
    );
    return null;
  }

  const bodyguardsCount = bodyguardEnabled ? 1 : 0;
  const seersCount = seerEnabled ? 1 : 0;
  const lycansCount = lycanEnabled ? 1 : 0;

  const goodCount = villagersCount + seersCount + bodyguardsCount + lycansCount;
  const evilCount = werewolvesCount;
  const totalCount = goodCount + evilCount;

  const startGameDisabled: boolean =
    !props.moderator ||
    props.players.length === 0 ||
    totalCount !== props.players.length ||
    goodCount === 0 ||
    evilCount === 0 ||
    evilCount >= goodCount;

  return (
    <React.Fragment>
      <h2>Join {props.villageName} using:</h2>
      <p className={styles.joinCode}>{props.lobbyId}</p>

      <h2>Players</h2>
      {props.players.length === 0 && <p>Waiting for players to join...</p>}
      {props.players.map((player) => (
        <p key={player.name}>{player.name}</p>
      ))}

      <h2>Deck Setup</h2>
      <div>
        <label htmlFor='Villagers'>Villagers:</label>
        <br />
        <NumberInput
          name='Villagers'
          placeholder='Villagers'
          value={villagersCount}
          onChange={setVillagersCount}
        />
      </div>

      <div>
        <label htmlFor='Werewolves'>Werewolves:</label>
        <br />
        <NumberInput
          name='Werewolves'
          placeholder='Werewolves'
          value={werewolvesCount}
          onChange={setWerewolvesCount}
        />
      </div>

      <div className={styles.flex}>
        <div className={styles.flexTogether}>
          <label htmlFor='Seers'>Seer:</label>
          <CheckboxInput
            name='Seers'
            checked={seerEnabled}
            onChange={setSeerEnabled}
          />
        </div>

        <div className={styles.flexTogether}>
          <label htmlFor='Bodyguards'>Bodyguard:</label>
          <CheckboxInput
            name='Bodyguards'
            checked={bodyguardEnabled}
            onChange={setBodyguardEnabled}
          />
        </div>

        <div className={styles.flexTogether}>
          <label htmlFor='Lycans'>Lycan:</label>
          <CheckboxInput
            name='Lycans'
            checked={lycanEnabled}
            onChange={setLycanEnabled}
          />
        </div>
      </div>

      <Button disabled={startGameDisabled} onClick={onClick}>
        Start Game
      </Button>
    </React.Fragment>
  );
};

export const mapStateToProps = (state: State): Props => {
  const moderators = getPlayersWithRole(state, PLAYER_ROLE.MODERATOR);

  return {
    villageName: state.game?.villageName,
    lobbyId: state.game?.lobbyId,
    moderator:
      moderators && moderators.length === 1 ? moderators[0] : undefined,
    players: getPlayersWithoutRole(state, PLAYER_ROLE.MODERATOR),
  };
};

export default connect(mapStateToProps)(Setup);

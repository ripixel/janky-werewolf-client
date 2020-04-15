import * as React from 'react';

import { VillageServiceContext } from '../../../../../context/VillageService';
import NumberInput from '../../../../Input/Number';
import Button from '../../../../Button';

import connector, { IPropsFromState } from './connector';
import { logInfo } from '../../../../../utils/logger';

import styles from './styles.scss';

type TProps = IPropsFromState;

export const MobileLobbyModeratorView = (props: TProps): JSX.Element => {
  const [villagersCount, setVillagersCount] = React.useState(0);
  const [werewolvesCount, setWerewolvesCount] = React.useState(0);
  const seersCount = 1; // can't be changed in this version
  const villageService = React.useContext(VillageServiceContext);

  const onClick = (): void => {
    villageService.startGame(werewolvesCount);
  };

  const startGameDisabled: boolean =
    !props.moderator ||
    props.players.length === 0 ||
    villagersCount + werewolvesCount + seersCount !== props.players.length ||
    villagersCount + seersCount === 0 ||
    werewolvesCount === 0 ||
    werewolvesCount >= villagersCount + seersCount;

  return (
    <React.Fragment>
      <h2>Join {props.villageName} using:</h2>
      <p className={styles.joinCode}>{props.lobbyId}</p>

      <h2>Players</h2>
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
        <label htmlFor='Seers'>Seers:</label>
        <br />
        <NumberInput
          name='Seers'
          placeholder='Seers'
          value={seersCount}
          onChange={(): void =>
            logInfo("Can't change number of Seers in this version")
          }
          disabled={true}
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

      <Button disabled={startGameDisabled} onClick={onClick}>
        Start Game
      </Button>
    </React.Fragment>
  );
};

export default connector(MobileLobbyModeratorView);

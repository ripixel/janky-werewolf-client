import * as React from 'react';

import { VillageServiceContext } from '../../../../../context/VillageService';
import NumberInput from '../../../../Input/Number';
import Button from '../../../../Button';

import connector, { IPropsFromState } from './connector';

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
      <h2>You are the Moderator</h2>
      <h2>Join {props.villageName} using:</h2>
      <p>{props.lobbyId}</p>

      <h2>Players</h2>
      {props.players.map((player) => (
        <p key={player.id}>{player.name}</p>
      ))}

      <h2>Moderator</h2>
      <p>{props.moderator ? props.moderator.name : 'Not set'}</p>

      <h2>Deck Setup</h2>

      <h3>Good</h3>
      <p>Villagers:</p>
      <NumberInput
        placeholder='Villagers'
        value={villagersCount}
        onChange={setVillagersCount}
      />
      <p>Seers: 1 (cannot change in this version!)</p>

      <h3>Evil</h3>
      <p>Werewolves:</p>
      <NumberInput
        placeholder='Werewolves'
        value={werewolvesCount}
        onChange={setWerewolvesCount}
      />

      <Button disabled={startGameDisabled} onClick={onClick}>
        Start Game
      </Button>
    </React.Fragment>
  );
};

export default connector(MobileLobbyModeratorView);

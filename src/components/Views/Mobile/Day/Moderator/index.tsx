import * as React from 'react';
import Button from '../../../../Button';
import connector, { IPropsFromState } from '../../../commonConnectors/players';
import { VillageServiceContext } from '../../../../../context/VillageService';

export const MobileDayModeratorView = (props: IPropsFromState): JSX.Element => {
  const villageService = React.useContext(VillageServiceContext);

  const onLynchClick = (playerName: string): void => {
    villageService.lynchPlayer(playerName);
  };

  const onSleepClick = (): void => {
    villageService.sleepNow();
  };

  return (
    <React.Fragment>
      <h2>You are the Moderator</h2>

      <h3>Click on a player to lynch them:</h3>
      {props.players
        .filter((player) => player.attributes.alive)
        .map(
          (player): JSX.Element => (
            <Button
              key={`lynch-${player.name}`}
              onClick={(): void => onLynchClick(player.name)}
            >
              {player.name}
            </Button>
          )
        )}

      <Button onClick={onSleepClick}>Sleep Without Lynching</Button>
    </React.Fragment>
  );
};

export default connector(MobileDayModeratorView);

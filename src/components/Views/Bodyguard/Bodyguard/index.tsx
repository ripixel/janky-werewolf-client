import React from 'react';
import Button from '../../../Button';
import connector, { IPropsFromState } from '../../commonConnectors/players';
import { VillageServiceContext } from '../../../../context/VillageService';

export const BodyguardPhaseBodyguardView: React.FC<IPropsFromState> = (
  props
) => {
  const villageService = React.useContext(VillageServiceContext);

  const onClick = (playerName: string): void => {
    villageService.bodyguardSavePlayer(playerName);
  };

  return (
    <React.Fragment>
      <h2>You are a Bodyguard</h2>

      <h3>Click on a player to save them from the werewolves:</h3>
      {props.players
        .filter((player) => player.attributes.alive)
        .map((player) => (
          <Button
            key={`bodyguard-${player.name}`}
            onClick={(): void => onClick(player.name)}
          >
            {player.name}
          </Button>
        ))}
    </React.Fragment>
  );
};

export default connector(BodyguardPhaseBodyguardView);

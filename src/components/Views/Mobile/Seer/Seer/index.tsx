import * as React from 'react';
import Button from '../../../../Button';
import connector, { IPropsFromState } from '../../../commonConnectors/players';
import { VillageServiceContext } from '../../../../../context/VillageService';

export const MobileSeerPhaseSeerView = (
  props: IPropsFromState
): JSX.Element => {
  const villageService = React.useContext(VillageServiceContext);

  const onClick = (playerName: string): void => {
    villageService.seerInspectPlayer(playerName);
  };

  return (
    <React.Fragment>
      <h2>You are a Seer</h2>

      <h3>Click on a player to uncover their team:</h3>
      {props.players.map(
        (player): JSX.Element => (
          <Button
            key={`seer-${player.name}`}
            onClick={(): void => onClick(player.name)}
          >
            {player.name}
          </Button>
        )
      )}
    </React.Fragment>
  );
};

export default connector(MobileSeerPhaseSeerView);

import * as React from 'react';
import Button from '../../../../Button';
import connector, { IPropsFromState } from './connector';
import { VillageServiceContext } from '../../../../../context/VillageService';

export const MobileSeerPhaseSeerView = (
  props: IPropsFromState
): JSX.Element => {
  const villageService = React.useContext(VillageServiceContext);

  const onClick = (playerName: string): void => {
    villageService.werewolfVoteForPlayer(playerName);
  };

  return (
    <React.Fragment>
      <h2>You are a Werewolf</h2>

      <h3>Click on a player to vote to kill them:</h3>
      <p>A player is only killed when all werewolf votes agree</p>
      {Object.keys(props.werewolfVotes).map(
        (playerName): JSX.Element => (
          <Button
            key={`kill-${playerName}`}
            onClick={(): void => onClick(playerName)}
          >
            {playerName} - Current votes {props.werewolfVotes[playerName]}
          </Button>
        )
      )}
    </React.Fragment>
  );
};

export default connector(MobileSeerPhaseSeerView);

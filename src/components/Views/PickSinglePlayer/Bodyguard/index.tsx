import React, { useContext } from 'react';

import PickSinglePlayer from '..';
import { VillageServiceContext } from '../../../../context/VillageService';
import connector, { PropsFromState } from '../../commonConnectors/players';

export const BodyguardPickSinglePlayer: React.FC<PropsFromState> = ({
  players,
}) => {
  const villageService = useContext(VillageServiceContext);

  return (
    <PickSinglePlayer
      title='You are a Bodyguard'
      instructions='Click on a player to save them from the werewolves if they are chosen'
      players={players.filter((player) => player.attributes.alive)}
      onPlayerPick={villageService.bodyguardSavePlayer}
    />
  );
};

export default connector(BodyguardPickSinglePlayer);

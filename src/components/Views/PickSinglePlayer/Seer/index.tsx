import React, { useContext } from 'react';

import PickSinglePlayer from '..';
import { VillageServiceContext } from '../../../../context/VillageService';
import { PLAYER_TEAM } from '../../../../types/player';
import connector, { PropsFromState } from '../../commonConnectors/players';

export const SeerPickSinglePlayer: React.FC<PropsFromState> = ({ players }) => {
  const villageService = useContext(VillageServiceContext);

  return (
    <PickSinglePlayer
      title='You are a Seer'
      instructions='Click on a player to find out their allegiance'
      players={players.filter(
        (player) =>
          player.attributes.alive &&
          player.attributes.team === PLAYER_TEAM.UNKNOWN
      )}
      onPlayerPick={villageService.seerInspectPlayer}
    />
  );
};

export default connector(SeerPickSinglePlayer);

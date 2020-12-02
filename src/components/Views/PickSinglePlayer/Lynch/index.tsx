import React, { useContext } from 'react';

import PickSinglePlayer from '..';
import { VillageServiceContext } from '../../../../context/VillageService';
import { PLAYER_TEAM } from '../../../../types/player';
import connector, { PropsFromState } from '../../commonConnectors/players';

export const LynchPickSinglePlayer: React.FC<PropsFromState> = ({
  players,
}) => {
  const villageService = useContext(VillageServiceContext);

  return (
    <PickSinglePlayer
      title='You are the Moderator'
      instructions='Click on a player to lynch them'
      players={players.filter(
        (player) =>
          player.attributes.alive &&
          player.attributes.team === PLAYER_TEAM.UNKNOWN
      )}
      onPlayerPick={villageService.seerInspectPlayer}
      onSkipPlayerPick={villageService.sleepNow}
      skipPlayerPickText='Sleep Without Lynching'
    />
  );
};

export default connector(LynchPickSinglePlayer);

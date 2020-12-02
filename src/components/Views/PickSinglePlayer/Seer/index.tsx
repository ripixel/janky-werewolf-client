import React, { useContext } from 'react';
import { connect } from 'react-redux';

import PickSinglePlayer from '..';
import { VillageServiceContext } from '../../../../context/VillageService';
import { PLAYER_TEAM } from '../../../../types/player';
import { getAllPlayers } from '../../../../store/connectorHelpers';
import { State } from '../../../../store/reducers';
import { Player } from '../../../../types/player';

interface Props {
  players: Player[];
}

export const SeerPickSinglePlayer: React.FC<Props> = ({ players }) => {
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

export const mapStateToProps = (state: State): Props => ({
  players: getAllPlayers(state, true),
});

export default connect(mapStateToProps)(SeerPickSinglePlayer);

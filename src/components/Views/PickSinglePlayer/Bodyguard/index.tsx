import React, { useContext } from 'react';
import { connect } from 'react-redux';

import PickSinglePlayer from '..';
import { VillageServiceContext } from '../../../../context/VillageService';
import { getPlayersWithoutRole } from '../../../../store/connectorHelpers';
import { State } from '../../../../store/reducers';
import { Player, PLAYER_ROLE } from '../../../../types/player';

interface Props {
  players: Player[];
}

export const BodyguardPickSinglePlayer: React.FC<Props> = ({ players }) => {
  const villageService = useContext(VillageServiceContext);

  return (
    <PickSinglePlayer
      title='You are a Bodyguard'
      instructions='Click on a player to save them from the werewolves if they are chosen'
      players={players.filter((player) => player.attributes.alive)}
      onPlayerPick={(playerName: string): void =>
        villageService.bodyguardSavePlayer(playerName)
      }
    />
  );
};

export const mapStateToProps = (state: State): Props => ({
  players: getPlayersWithoutRole(state, PLAYER_ROLE.MODERATOR, true),
});

export default connect(mapStateToProps)(BodyguardPickSinglePlayer);

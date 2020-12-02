import React from 'react';

import VoteSinglePlayer from '..';
import connector, { PropsFromState } from './connector';
import { VillageServiceContext } from '../../../../context/VillageService';

export const WerewolfVoteSinglePlayer: React.FC<PropsFromState> = ({
  werewolfVotes,
}) => {
  const villageService = React.useContext(VillageServiceContext);

  const onVote = (playerName: string): void => {
    villageService.werewolfVoteForPlayer(playerName);
  };

  return (
    <VoteSinglePlayer
      title='You are a Werewolf'
      instructions='Click on a player to vote to kill them'
      note='A player is only killed when all werewolf votes agree'
      onVote={onVote}
      currentVotes={werewolfVotes}
    />
  );
};

export default connector(WerewolfVoteSinglePlayer);

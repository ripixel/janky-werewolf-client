import React from 'react';
import { connect } from 'react-redux';

import VoteSinglePlayer from '..';
import { VillageServiceContext } from '../../../../context/VillageService';
import { getWerewolfVotes } from '../../../../store/connectorHelpers';
import { State } from '../../../../store/reducers';

export interface Props {
  werewolfVotes: { [key: string]: number };
}

export const WerewolfVoteSinglePlayer: React.FC<Props> = ({
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

export const mapStateToProps = (state: State): Props => ({
  werewolfVotes: getWerewolfVotes(state),
});

export default connect(mapStateToProps)(WerewolfVoteSinglePlayer);

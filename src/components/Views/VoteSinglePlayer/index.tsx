import React from 'react';

import Button from '../../Button';

interface Props {
  title: string;
  instructions: string;
  note: string;
  onVote: (playerName: string) => void;
  currentVotes: {
    [key: string]: number;
  };
}

export const VoteSinglePlayer: React.FC<Props> = ({
  title,
  instructions,
  note,
  onVote,
  currentVotes,
}) => (
  <React.Fragment>
    <h2>{title}</h2>
    <h3>{instructions}</h3>
    <p>{note}</p>

    {Object.keys(currentVotes).map((playerName) => (
      <Button key={`${playerName}`} onClick={(): void => onVote(playerName)}>
        {playerName} - Current votes {currentVotes[playerName]}
      </Button>
    ))}
  </React.Fragment>
);

export default VoteSinglePlayer;

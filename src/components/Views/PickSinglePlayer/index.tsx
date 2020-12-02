import React from 'react';

import Button from '../../Button';
import { Player } from '../../../types/player';

interface Props {
  title: string;
  instructions: string;
  onPlayerPick: (playerName: string) => void;
  players: Player[];
  onSkipPlayerPick?: () => void;
  skipPlayerPickText?: string;
}

export const PickSinglePlayer: React.FC<Props> = ({
  title,
  instructions,
  players,
  onPlayerPick,
  onSkipPlayerPick,
  skipPlayerPickText,
}) => {
  return (
    <React.Fragment>
      <h2>{title}</h2>
      <h3>{instructions}</h3>
      {players.map((player) => (
        <Button
          key={`${player.name}`}
          onClick={(): void => onPlayerPick(player.name)}
        >
          {player.name}
        </Button>
      ))}

      {onSkipPlayerPick && skipPlayerPickText && (
        <Button onClick={onSkipPlayerPick}>{skipPlayerPickText}</Button>
      )}
    </React.Fragment>
  );
};

export default PickSinglePlayer;

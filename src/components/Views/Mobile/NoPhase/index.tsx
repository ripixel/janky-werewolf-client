import * as React from 'react';
import TextInput from '../../../Input/Text';
import Button from '../../../Button';

interface IProps {
  onJoinVillageClick: (playerName: string, gameCode: string) => void; // will come from redux dispatch connect
}

export const MobileNoPhaseView = (props: IProps): JSX.Element => {
  const [playerName, setPlayerName] = React.useState('');
  const [gameCode, setGameCode] = React.useState('');

  return (
    <React.Fragment>
      <TextInput
        value={playerName}
        onChange={setPlayerName}
        placeholder='Player Name'
      />
      <TextInput
        value={gameCode}
        onChange={setGameCode}
        placeholder='Game Code'
      />
      <Button
        onClick={(): void => props.onJoinVillageClick(playerName, gameCode)}
      >
        Join Village
      </Button>
    </React.Fragment>
  );
};

export default MobileNoPhaseView;

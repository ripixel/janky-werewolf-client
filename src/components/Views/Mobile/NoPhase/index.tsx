import * as React from 'react';
import TextInput from '../../../Input/Text';
import Button from '../../../Button';
import { VillageServiceContext } from '../../../../context/VillageService';

export const MobileNoPhaseView = (): JSX.Element => {
  const [playerName, setPlayerName] = React.useState('');
  const [gameCode, setGameCode] = React.useState('');
  const villageService = React.useContext(VillageServiceContext);

  const onClick = async (): Promise<void> => {
    await villageService.joinVillage(playerName, gameCode);
  };

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
      <Button onClick={onClick}>Join Village</Button>
    </React.Fragment>
  );
};

export default MobileNoPhaseView;

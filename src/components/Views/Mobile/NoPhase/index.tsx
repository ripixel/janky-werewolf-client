import * as React from 'react';
import TextInput from '../../../Input/Text';
import Button from '../../../Button';
import { VillageServiceContext } from '../../../../context/VillageService';

export const MobileNoPhaseView = (): JSX.Element => {
  const [userName, setUserName] = React.useState('');
  const [lobbyId, setLobbyId] = React.useState('');
  const villageService = React.useContext(VillageServiceContext);

  const onClick = (): void => {
    if (lobbyId) {
      villageService.joinVillage(userName, lobbyId);
    } else {
      villageService.createVillage(userName);
    }
  };

  return (
    <React.Fragment>
      <TextInput
        value={userName}
        onChange={setUserName}
        placeholder='Player Name'
      />
      <TextInput
        value={lobbyId}
        onChange={setLobbyId}
        placeholder='Game Code'
      />
      <Button onClick={onClick} disabled={!userName}>
        {!lobbyId ? 'Create' : 'Join'} Village
      </Button>
    </React.Fragment>
  );
};

export default MobileNoPhaseView;

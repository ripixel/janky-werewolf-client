import React from 'react';
import TextInput from '../../Input/Text';
import Button from '../../Button';
import { VillageServiceContext } from '../../../context/VillageService';

export const JoinOrCreate: React.FC = () => {
  const [userName, setUserName] = React.useState(
    window.localStorage.getItem('lastName') ?? ''
  );
  const [lobbyId, setLobbyId] = React.useState(
    window.localStorage.getItem('lastLobbyId') ?? ''
  );
  const villageService = React.useContext(VillageServiceContext);

  const onClick = (): void => {
    window.localStorage.setItem('lastName', userName);
    if (lobbyId) {
      window.localStorage.setItem('lastLobbyId', lobbyId);
      villageService.joinVillage(userName, lobbyId);
    } else {
      villageService.createVillage(userName);
    }
  };

  return (
    <React.Fragment>
      <h3>
        Welcome to
        <br />
        Janky Werewolf
      </h3>
      <p>To create a game, enter your Player Name and leave Game Code blank</p>
      <p>To join a game, enter your Player Name and a Game Code</p>
      <TextInput
        value={userName}
        onChange={(userName: string): void =>
          setUserName(
            userName
              .replace(/[^0-9a-zA-z\s]/g, '')
              .trimStart()
              .substr(0, 12)
          )
        }
        placeholder='Player Name'
      />
      <TextInput
        value={lobbyId}
        onChange={(lobbyId: string): void =>
          setLobbyId(
            lobbyId
              .toUpperCase()
              .replace(/[^A-Z]/g, '')
              .substr(0, 4)
          )
        }
        placeholder='Game Code'
      />
      <Button
        onClick={onClick}
        disabled={!userName || (!!lobbyId && lobbyId.length !== 4)}
      >
        {!lobbyId ? 'Create' : 'Join'} Village
      </Button>
    </React.Fragment>
  );
};

export default JoinOrCreate;

import * as React from 'react';

import TextInput from '../../../Input/Text';
import Button from '../../../Button';
import { VillageServiceContext } from '../../../../context/VillageService';

export const DesktopNoPhaseView = (): JSX.Element => {
  const [villageName, setVillageName] = React.useState('');
  const villageService = React.useContext(VillageServiceContext);

  const onClick = async (): Promise<void> => {
    await villageService.createVillage(villageName);
  };

  return (
    <React.Fragment>
      <TextInput
        value={villageName}
        onChange={setVillageName}
        placeholder='Village Name'
      />
      <Button onClick={onClick}>Create Village</Button>
    </React.Fragment>
  );
};

export default DesktopNoPhaseView;

import * as React from 'react';
import TextInput from '../../../Input/Text';
import Button from '../../../Button';

interface IProps {
  onCreateVillageClick: (villageName: string) => void; // will come from redux dispatch connect
}

export const DesktopNoPhaseView = (props: IProps): JSX.Element => {
  const [villageName, setVillageName] = React.useState('');

  return (
    <React.Fragment>
      <TextInput
        value={villageName}
        onChange={setVillageName}
        placeholder='Village Name'
      />
      <Button onClick={(): void => props.onCreateVillageClick(villageName)}>
        Create Village
      </Button>
    </React.Fragment>
  );
};

export default DesktopNoPhaseView;

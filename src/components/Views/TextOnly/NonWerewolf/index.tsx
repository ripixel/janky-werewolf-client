import React from 'react';

import TextOnly from '..';

export const NonWerewolfTextOnly: React.FC = () => (
  <TextOnly
    title='You are not a Werewolf'
    description="The Werewolves are busy eating people, pray it's not you!"
  />
);

export default NonWerewolfTextOnly;

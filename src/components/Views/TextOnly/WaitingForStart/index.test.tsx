/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { WaitingForStartTextOnly } from '.';

describe('Components > Views > TextOnly > WaitingForStart', () => {
  it('renders as expected', () => {
    const result = render(<WaitingForStartTextOnly />);

    expect(
      result.getByText('Waiting for the game to start')
    ).toBeInTheDocument();
    expect(
      result.getByText(
        'Once everyone is ready, the Moderator will start the game, and you will find out your role! Get ready for Janky Werewolf!'
      )
    ).toBeInTheDocument();
  });
});

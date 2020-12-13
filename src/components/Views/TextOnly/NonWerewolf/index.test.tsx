/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { NonWerewolfTextOnly } from '.';

describe('Components > Views > TextOnly > NonWerewolf', () => {
  it('renders as expected', () => {
    const result = render(<NonWerewolfTextOnly />);

    expect(result.getByText('You are not a Werewolf')).toBeInTheDocument();
    expect(
      result.getByText(
        "The Werewolves are busy eating people, pray it's not you!"
      )
    ).toBeInTheDocument();
  });
});

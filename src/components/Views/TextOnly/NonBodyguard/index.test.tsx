/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { NonBodyguardTextOnly } from '.';

describe('Components > Views > TextOnly > NonBodyguard', () => {
  it('renders as expected', () => {
    const result = render(<NonBodyguardTextOnly />);

    expect(result.getByText('You are not a Bodyguard')).toBeInTheDocument();
    expect(
      result.getByText("The Bodyguards are busy saving people... pray it's you")
    ).toBeInTheDocument();
  });
});

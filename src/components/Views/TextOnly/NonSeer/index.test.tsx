/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { NonSeerTextOnly } from '.';

describe('Components > Views > TextOnly > NonSeer', () => {
  it('renders as expected', () => {
    const result = render(<NonSeerTextOnly />);

    expect(result.getByText('You are not a Seer')).toBeInTheDocument();
    expect(
      result.getByText(
        'The Seers are busy finding out allegiances, hang tight!'
      )
    ).toBeInTheDocument();
  });
});

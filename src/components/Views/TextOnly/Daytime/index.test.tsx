/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { DaytimeTextOnly } from '.';

describe('Components > Views > TextOnly > Daytime', () => {
  it('renders as expected', () => {
    const result = render(<DaytimeTextOnly />);

    expect(result.getByText("It's the day")).toBeInTheDocument();
    expect(
      result.getByText(
        'Have a chat, and suggest a lynching maybe? Otherwise you can always ask the moderator to sleep without killing anyone'
      )
    ).toBeInTheDocument();
  });
});

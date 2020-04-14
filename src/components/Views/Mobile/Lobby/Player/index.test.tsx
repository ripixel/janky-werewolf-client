import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { MobileLobbyPlayerView } from '.';

describe('<MobileLobbyPlayerView>', () => {
  it('renders as expected', () => {
    const result = render(<MobileLobbyPlayerView />);

    expect(result.getByText('You are a Player')).toBeInTheDocument();
  });
});

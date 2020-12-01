import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { LobbyPlayerView } from '.';

describe('<LobbyPlayerView>', () => {
  it('renders as expected', () => {
    const result = render(<LobbyPlayerView />);

    expect(result.getByText('You are a Player')).toBeInTheDocument();
  });
});

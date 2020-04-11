import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { DesktopLobbyView } from '.';

describe('<DesktopLobbyView>', () => {
  it('renders as expected', () => {
    const result = render(<DesktopLobbyView />);

    expect(result.getByText('Desktop Lobby')).toBeInTheDocument();
  });
});

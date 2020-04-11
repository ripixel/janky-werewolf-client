import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { MobileLobbyView } from '.';

describe('<MobileLobbyView>', () => {
  it('renders as expected', () => {
    const result = render(<MobileLobbyView />);

    expect(result.getByText('Mobile Lobby')).toBeInTheDocument();
  });
});

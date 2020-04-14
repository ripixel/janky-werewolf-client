import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { DesktopNoPhaseView } from '.';

describe('<DesktopNoPhaseView>', () => {
  it('renders as expected', () => {
    const result = render(<DesktopNoPhaseView />);

    expect(result.getByText('Desktop No Phase')).toBeInTheDocument();
  });
});

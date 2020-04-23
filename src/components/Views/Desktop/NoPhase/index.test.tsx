import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { DesktopNoPhaseView } from '.';

jest.mock('../../../../public/assets/ss_mod.png', () => 'ss_mod/path.png');

describe('<DesktopNoPhaseView>', () => {
  it('renders as expected', () => {
    const result = render(<DesktopNoPhaseView />);

    expect(result.getByText('Can you survive the night?')).toBeInTheDocument();
  });
});

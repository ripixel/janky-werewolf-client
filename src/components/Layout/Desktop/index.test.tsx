import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import DesktopLayout from '.';

describe('<DesktopLayout>', () => {
  it('renders as expected', () => {
    const result = render(
      <DesktopLayout>
        <p>Test</p>
      </DesktopLayout>
    );

    expect(
      result.getByText('Janky Werewolf - Desktop Host')
    ).toBeInTheDocument();
    expect(result.getByText('Test')).toBeInTheDocument();
  });
});

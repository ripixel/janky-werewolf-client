import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { Layout } from '.';

jest.mock('../../../public/assets/favicon.png', () => 'favicon/path.png');

describe('Components > Layout', () => {
  it('renders as expected', () => {
    const result = render(
      <Layout>
        <p>Test</p>
      </Layout>
    );

    expect(result.getByText('Janky Werewolf')).toBeInTheDocument();
    expect(result.getByText('Test')).toBeInTheDocument();
    expect(result.getByText('test_ver')).toBeInTheDocument();
  });
});

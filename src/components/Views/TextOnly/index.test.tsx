/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { TextOnly } from '.';

describe('Components > Views > TextOnly', () => {
  it('renders as expected', () => {
    const result = render(
      <TextOnly title='title-test' description='description-test' />
    );

    expect(result.getByText('title-test')).toBeInTheDocument();
    expect(result.getByText('description-test')).toBeInTheDocument();
  });
});

import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { Hello } from '.';

describe('<Hello>', () => {
  it('should render correctly', () => {
    const result = render(
      <Hello compiler='TypeScript' framework='React' userId='123' />
    );

    const helloFrom = result.getByText('Hello from TypeScript and React!');
    expect(helloFrom).toBeInTheDocument();
    expect(helloFrom.tagName).toBe('H1');

    const envText = result.getByText(
      'You are using the test environment, and a sample variable taken from a .env file is some-jest-value'
    );
    expect(envText).toBeInTheDocument();
    expect(envText.tagName).toBe('P');

    const idText = result.getByText('Your user Id is 123');
    expect(idText).toBeInTheDocument();
    expect(idText.tagName).toBe('P');
  });
});

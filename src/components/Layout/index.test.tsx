import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { Layout } from '.';

jest.mock('../../../public/assets/favicon.png', () => 'favicon/path.png');

describe('Components > Layout', () => {
  describe('renders as expected', () => {
    it('when no websocket URL is defined in localStorage', () => {
      const result = render(
        <Layout>
          <p>Test</p>
        </Layout>
      );

      expect(result.getByText('Janky Werewolf')).toBeInTheDocument();
      expect(result.getByText('Test')).toBeInTheDocument();
      expect(result.getByText('test_ver')).toBeInTheDocument();
    });

    it('when a websocket URL is defined in localStorage', () => {
      window.localStorage.setItem('WEBSOCKET_URL', 'test');

      const result = render(
        <Layout>
          <p>Test</p>
        </Layout>
      );

      expect(
        result.getByText(
          'You are currently playing against a non-production version of Janky Werewolf'
        )
      ).toBeInTheDocument();
      expect(result.getByText('Test')).toBeInTheDocument();
      expect(result.getByText('test_ver')).toBeInTheDocument();

      window.localStorage.removeItem('WEBSOCKET_URL');
    });
  });
});

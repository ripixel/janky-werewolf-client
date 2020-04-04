import * as React from 'react';
import { Provider } from 'react-redux';

import store from '../../store';

import Layout from '../Layout';

import './reset.scss';
import './styles.scss';

export const App = (): JSX.Element => (
  <Provider store={store}>
    <Layout />
  </Provider>
);

export default App;

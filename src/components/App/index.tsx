import * as React from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import store from '../../store';
import Layout from '../Layout';
import {
  VillageServiceContextProvider,
  initVillageServiceContext,
} from '../../context/VillageService';

import './reset.scss';
import './styles.scss';

export const App = (): JSX.Element => (
  <VillageServiceContextProvider value={initVillageServiceContext()}>
    <ReduxProvider store={store}>
      <Layout />
    </ReduxProvider>
  </VillageServiceContextProvider>
);

export default App;

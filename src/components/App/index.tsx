import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import store from '../../store';
import Layout from '../Layout';
import {
  VillageServiceContextProvider,
  initVillageServiceContext,
} from '../../context/VillageService';
import ViewController from '../ViewController';

import './reset.scss';
import './styles.scss';

export const App: React.FC = () => (
  <VillageServiceContextProvider value={initVillageServiceContext()}>
    <ReduxProvider store={store}>
      <Layout>
        <ViewController />
      </Layout>
    </ReduxProvider>
  </VillageServiceContextProvider>
);

export default App;

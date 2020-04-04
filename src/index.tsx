import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Hello from './components/Hello';
import { initLogger } from './utils/logger';
import store from './store';

initLogger();

ReactDOM.render(
  <Provider store={store}>
    <Hello compiler='TypeScript' framework='React' />
  </Provider>,
  document.getElementById('root')
);

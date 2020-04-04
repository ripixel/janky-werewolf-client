import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { initLogger } from './utils/logger';
import App from './components/App';

initLogger();

ReactDOM.render(<App />, document.getElementById('root'));

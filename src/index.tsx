import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';

import { Hello } from './components/Hello';

if (process.env.SENTRY_DSN) {
	Sentry.init({ dsn: process.env.SENTRY_DSN });
}

ReactDOM.render(
	<Hello compiler='TypeScript' framework='React' />,
	document.getElementById('root')
);

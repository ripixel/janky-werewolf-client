/* eslint-disable no-console, react-hooks/rules-of-hooks */

import {
  captureException,
  configureSentryuserSecret,
  configureSentryLobbyId,
  initSentry,
  CustomHttpError,
} from '../sentry';

const isDev = (): boolean => process.env.NODE_ENV === 'development';
const useSentry = (): boolean => Boolean(process.env.SENTRY_DSN);

export const initLogger = (): void => {
  if (useSentry()) {
    initSentry(
      process.env.SENTRY_DSN as string,
      process.env.NODE_ENV as string,
      process.env.VERSION as string
    );
  }
};

export const configureLoggeruserSecret = (userSecret: string): void => {
  if (useSentry()) {
    configureSentryuserSecret(userSecret);
  }
};

export const configureLoggerLobbyId = (code: string): void => {
  if (useSentry()) {
    configureSentryLobbyId(code);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const logInfo = (message: string, data?: any): void => {
  if (isDev()) {
    console.info(message, data);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const logWarn = (message: string, data?: any): void => {
  if (isDev()) {
    console.warn(message, data);
  }
};

export const logError = (err: Error | CustomHttpError): void => {
  if (isDev()) {
    console.error(err);
  }

  if (useSentry()) {
    captureException(err);
  }
};

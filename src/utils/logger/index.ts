/* eslint-disable no-console, react-hooks/rules-of-hooks */

import {
  captureException,
  configureSentryUserId,
  configureSentryGameCode,
  initSentry,
  ICustomHttpError,
} from '../sentry';

const isDev = (): boolean => process.env.NODE_ENV === 'development';
const useSentry = (): boolean => Boolean(process.env.SENTRY_DSN);

export const initLogger = (): void => {
  if (useSentry()) {
    initSentry(
      process.env.SENTRY_DSN as string,
      process.env.NODE_ENV as string
    );
  }
};

export const configureLoggerUserId = (userId: string): void => {
  if (useSentry()) {
    configureSentryUserId(userId);
  }
};

export const configureLoggerGameCode = (code: string): void => {
  if (useSentry()) {
    configureSentryGameCode(code);
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

export const logError = (err: Error | ICustomHttpError): void => {
  if (isDev()) {
    console.error(err);
  }

  if (useSentry()) {
    captureException(err);
  }
};

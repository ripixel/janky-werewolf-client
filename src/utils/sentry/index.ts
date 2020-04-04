import {
  init,
  setUser,
  withScope,
  captureException as sentryCaptureException,
  setContext,
} from '@sentry/browser';

export interface ICustomHttpError extends Error {
  statusCode?: number;
}

export const initSentry = (dsn: string, environment: string): void => {
  init({
    dsn,
    environment,
    maxBreadcrumbs: 50,
    attachStacktrace: true,
  });
};

export const configureSentryUserId = (userId: string): void => {
  setUser({ id: userId });
};

export const configureSentryGameCode = (code: string): void => {
  setContext('gameCode', {
    code,
  });
};

export const captureException = (err: ICustomHttpError): void => {
  withScope((scope) => {
    if (err.statusCode) {
      scope.setExtra('statusCode', err.statusCode);
    }
    sentryCaptureException(err);
  });
};

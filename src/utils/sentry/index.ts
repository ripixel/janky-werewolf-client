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

export const configureSentryuserSecret = (userSecret: string): void => {
  setUser({ id: userSecret });
};

export const configureSentryLobbyId = (code: string): void => {
  setContext('lobbyId', {
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

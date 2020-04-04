import {
  captureException,
  configureSentryUserId,
  configureSentryGameCode,
  initSentry,
  ICustomHttpError,
} from '../sentry';

import {
  initLogger,
  configureLoggerUserId,
  configureLoggerGameCode,
  logError,
} from '.';

// Auto-mocking should be good enough for this
jest.mock('../sentry');

const envVars: Record<string, string> = {
  SENTRY_DSN: 'test_dummy_dsn',
  NODE_ENV: 'development', // supresses console.errors
};

const setEnvVars = (): void => {
  Object.keys(envVars).forEach((key) => {
    process.env[key] = envVars[key];
  });
};

const clearEnvVars = (): void => {
  Object.keys(envVars).forEach((key) => {
    delete process.env[key];
  });
};

const runTests = (withSentry: boolean): void => {
  describe('initLogger()', () => {
    if (withSentry) {
      it('inits sentry', () => {
        initLogger();

        expect(initSentry as jest.Mock).toHaveBeenCalledTimes(1);
      });
    } else {
      it('does not init sentry', () => {
        initLogger();

        expect(initSentry as jest.Mock).toHaveBeenCalledTimes(0);
      });
    }
  });

  describe('configureLoggerUserId()', () => {
    if (withSentry) {
      it('configures sentry', () => {
        configureLoggerUserId('123');

        expect(configureSentryUserId).toHaveBeenCalledTimes(1);
        expect(configureSentryUserId).toHaveBeenCalledWith('123');
      });
    } else {
      it('does not configure sentry', () => {
        configureLoggerUserId('123');

        expect(configureSentryUserId).toHaveBeenCalledTimes(0);
      });
    }
  });

  describe('configureLoggerGameCode()', () => {
    if (withSentry) {
      it('configures sentry', () => {
        configureLoggerGameCode('its-a-guid');

        expect(configureSentryGameCode).toHaveBeenCalledTimes(1);
        expect(configureSentryGameCode).toHaveBeenCalledWith('its-a-guid');
      });
    } else {
      it('does not configure sentry', () => {
        configureLoggerGameCode('its-a-guid');

        expect(configureSentryGameCode).toHaveBeenCalledTimes(0);
      });
    }
  });

  // No tests as using console.info
  // describe('logInfo', () => {});

  // No tests as using console.warn
  // describe('logWarn', () => {});

  describe('logError', () => {
    describe('with standard Error', () => {
      const error = new Error('Oh no!');

      if (withSentry) {
        it('captures exception with sentry', () => {
          logError(error);

          expect(captureException as jest.Mock).toHaveBeenCalledTimes(1);
          expect(captureException as jest.Mock).toHaveBeenCalledWith(error);
        });
      } else {
        it('does not capture exception with sentry', () => {
          logError(error);

          expect(captureException as jest.Mock).toHaveBeenCalledTimes(0);
        });
      }
    });

    describe('with ICustomHttpError', () => {
      const error: ICustomHttpError = new Error('Oh no!');
      error.statusCode = 500;

      if (withSentry) {
        it('captures exception with sentry', () => {
          logError(error);

          expect(captureException as jest.Mock).toHaveBeenCalledTimes(1);
          expect(captureException as jest.Mock).toHaveBeenCalledWith(error);
        });
      } else {
        it('does not capture exception with sentry', () => {
          logError(error);

          expect(captureException as jest.Mock).toHaveBeenCalledTimes(0);
        });
      }
    });
  });
};

describe('Logger Utility', () => {
  beforeEach(() => {
    (captureException as jest.Mock).mockReset();
    (configureSentryUserId as jest.Mock).mockReset();
    (configureSentryGameCode as jest.Mock).mockReset();
    (initSentry as jest.Mock).mockReset();

    setEnvVars();
  });

  afterEach(() => {
    clearEnvVars();
  });

  describe('with no sentry dsn set', () => {
    beforeEach(() => {
      delete process.env.SENTRY_DSN;
    });

    runTests(false);
  });

  describe('with sentry dsn set', () => {
    runTests(true);
  });
});

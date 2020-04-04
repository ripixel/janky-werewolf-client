import {
  init,
  setUser,
  captureException,
  withScope,
  setContext,
} from '@sentry/browser';
import {
  configureSentryUserId,
  configureSentryGameCode,
  initSentry,
  captureException as localCaptureException,
  ICustomHttpError,
} from '.';

jest.mock('@sentry/browser', () => ({
  init: jest.fn(),
  setUser: jest.fn(),
  captureException: jest.fn(),
  withScope: jest.fn(),
  setContext: jest.fn(),
}));

describe('Sentry Utility', () => {
  describe('initSentry', () => {
    it('should initialize', () => {
      initSentry('test_dummy_dsn', 'test_env');

      expect(init as jest.Mock).toHaveBeenCalledTimes(1);
      expect(init as jest.Mock).toHaveBeenCalledWith({
        dsn: 'test_dummy_dsn',
        environment: 'test_env',
        maxBreadcrumbs: 50,
        attachStacktrace: true,
      });
    });
  });

  describe('configureSentryUserId', () => {
    beforeEach(() => {
      (setUser as jest.Mock).mockReset();
    });
    it('should call sentry with proper data', () => {
      configureSentryUserId('12345');

      expect(setUser as jest.Mock).toHaveBeenCalledWith({
        id: '12345',
      });
      expect(setUser as jest.Mock).toHaveBeenCalledTimes(1);
    });
  });

  describe('configureSentryPathDrnId', () => {
    beforeEach(() => {
      (setContext as jest.Mock).mockReset();
    });

    it('should call sentry with proper data', () => {
      configureSentryGameCode('its-a-guid');

      expect(setContext as jest.Mock).toHaveBeenCalledTimes(1);
      expect(setContext as jest.Mock).toHaveBeenCalledWith('gameCode', {
        code: 'its-a-guid',
      });
    });
  });

  describe('captureException', () => {
    let scopeSpy: Record<string, jest.Mock>;

    beforeEach(() => {
      scopeSpy = { setExtra: jest.fn() };

      (withScope as jest.Mock).mockImplementationOnce((cb) => cb(scopeSpy));
    });

    it('should call sentry method with proper data', () => {
      const error = new Error('TEST');

      localCaptureException(error);

      expect(captureException as jest.Mock).toHaveBeenCalledWith(error);
      expect(captureException as jest.Mock).toHaveBeenCalledTimes(1);
    });

    it('should set extra data if status code exists', () => {
      const error: ICustomHttpError = new Error('TEST');
      error.statusCode = 500;

      localCaptureException(error);

      expect(scopeSpy.setExtra).toHaveBeenCalledWith('statusCode', 500);
      expect(captureException as jest.Mock).toHaveBeenCalledWith(error);
    });
  });
});

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { getPhaseName, getUnreadAlerts } from '../../store/connectorHelpers';
import { dismissAlert } from '../../store/actions/game';

import { Alerts, mapDispatchToProps, mapStateToProps } from '.';
import { PHASE_NAME } from '../../types/phase';
import { ALERT_ICON } from '../../store/reducers/game';

jest.mock('../../store/connectorHelpers', () => ({
  getPhaseName: jest.fn((): string => 'phase-name'),
  getUnreadAlerts: jest.fn((): string => 'unread-alerts'),
}));

jest.mock('../../store/actions/game');

describe('Components > Alerts', () => {
  const mockAlert = {
    title: 'Test Title',
    content: 'Test Content',
    icon: ALERT_ICON.DEATH,
    subject: 'Dave',
    id: 'test-id',
  };

  describe('renders null', () => {
    describe('with no alerts passed', () => {
      it('when alerts array is undefined', () => {
        const result = render(
          <Alerts phase={PHASE_NAME.DAY} dismissAlert={jest.fn()} />
        );

        expect(result.container).toBeEmptyDOMElement();
      });
      it('when alerts array has no members', () => {
        const result = render(
          <Alerts phase={PHASE_NAME.DAY} alerts={[]} dismissAlert={jest.fn()} />
        );

        expect(result.container).toBeEmptyDOMElement();
      });
    });

    it('when phase is LOBBY', () => {
      const result = render(
        <Alerts
          phase={PHASE_NAME.LOBBY}
          alerts={[mockAlert]}
          dismissAlert={jest.fn()}
        />
      );

      expect(result.container).toBeEmptyDOMElement();
    });

    it('when phase is END', () => {
      const result = render(
        <Alerts
          phase={PHASE_NAME.END}
          alerts={[mockAlert]}
          dismissAlert={jest.fn()}
        />
      );

      expect(result.container).toBeEmptyDOMElement();
    });
  });

  describe('renders as expected', () => {
    it('with one alert', () => {
      const result = render(
        <Alerts
          phase={PHASE_NAME.DAY}
          alerts={[mockAlert]}
          dismissAlert={jest.fn()}
        />
      );

      expect(result.getByText('Test Title')).toBeInTheDocument();
      expect(result.getByText('Test Content')).toBeInTheDocument();
      expect(result.getByText('DEATH')).toBeInTheDocument();
      expect(result.getByText('Dismiss')).toBeInTheDocument();
      expect(() => result.getByText('0 Unread Alerts')).toThrow();
    });

    it('with multiple alerts', () => {
      const result = render(
        <Alerts
          phase={PHASE_NAME.DAY}
          alerts={[mockAlert, mockAlert]}
          dismissAlert={jest.fn()}
        />
      );

      expect(result.getByText('Test Title')).toBeInTheDocument();
      expect(result.getByText('Test Content')).toBeInTheDocument();
      expect(result.getByText('DEATH')).toBeInTheDocument();
      expect(result.getByText('Dismiss')).toBeInTheDocument();
      expect(result.getByText('1 Unread Alerts')).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('clicking the Dismiss button functions as expected', () => {
      const mockDismissAlert = jest.fn();

      const result = render(
        <Alerts
          phase={PHASE_NAME.DAY}
          alerts={[mockAlert]}
          dismissAlert={mockDismissAlert}
        />
      );

      result.getByText('Dismiss').click();

      expect(mockDismissAlert).toHaveBeenCalledTimes(1);
      expect(mockDismissAlert).toHaveBeenCalledWith('test-id');
    });
  });

  describe('mapStateToProps', () => {
    it('returns correct props', () => {
      const mockState = {
        some: 'mock-state',
      } as any;

      const result = mapStateToProps(mockState);

      expect(getPhaseName).toHaveBeenCalledTimes(1);
      expect(getPhaseName).toHaveBeenCalledWith(mockState);
      expect(getUnreadAlerts).toHaveBeenCalledTimes(1);
      expect(getUnreadAlerts).toHaveBeenCalledWith(mockState);

      expect(result).toEqual({
        phase: 'phase-name',
        alerts: 'unread-alerts',
      });
    });
  });

  describe('mapDispatchToProps', () => {
    it('returns correct props', () => {
      const mockDispatch = jest.fn();

      const result = mapDispatchToProps(mockDispatch);

      expect(result).toEqual({
        dismissAlert: expect.any(Function),
      });

      result.dismissAlert('123');
      expect(dismissAlert).toHaveBeenCalledTimes(1);
      expect(dismissAlert).toHaveBeenCalledWith('123');
    });
  });
});

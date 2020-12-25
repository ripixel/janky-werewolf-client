import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { dismissAlert, DismissAlertAction } from '../../store/actions/game';
import { getPhaseName, getUnreadAlerts } from '../../store/connectorHelpers';

import { State } from '../../store/reducers';
import { Alert } from '../../store/reducers/game';
import { PHASE_NAME } from '../../types/phase';
import Button from '../Button';

import styles from './styles.scss';

interface Props {
  phase?: PHASE_NAME;
  alerts?: Alert[];
  dismissAlert: (id: string) => DismissAlertAction;
}

export const Alerts: React.FC<Props> = ({ alerts, phase, dismissAlert }) => {
  if (
    !alerts ||
    alerts.length === 0 ||
    phase === PHASE_NAME.LOBBY ||
    phase === PHASE_NAME.END
  ) {
    return null;
  }

  const alert = (
    <React.Fragment>
      <p>{alerts[0].title}</p>
      <p>{alerts[0].content}</p>
      <p className={styles.alertIcon}>{alerts[0].icon}</p>
      <Button onClick={(): DismissAlertAction => dismissAlert(alerts[0].id)}>
        Dismiss
      </Button>
    </React.Fragment>
  );

  const remainingAlerts = alerts.length - 1;

  return alert ? (
    <div className={styles.alert}>
      {alert}
      {remainingAlerts > 0 && (
        <p className={styles.remainingAlerts}>
          {remainingAlerts} Unread Alerts
        </p>
      )}
    </div>
  ) : null;
};

export const mapStateToProps = (state: State): Omit<Props, 'dismissAlert'> => ({
  phase: getPhaseName(state),
  alerts: getUnreadAlerts(state),
});

export const mapDispatchToProps = (
  dispatch: Dispatch
): Pick<Props, 'dismissAlert'> => ({
  dismissAlert: (id: string): DismissAlertAction => dispatch(dismissAlert(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Alerts);

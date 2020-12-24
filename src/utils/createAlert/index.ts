import { v4 as uuidv4 } from 'uuid';

import { Alert, ALERT_ICON } from '../../store/reducers/game';

export const createAlert = ({
  title,
  content,
  icon,
  subject,
}: {
  title: string;
  content: string;
  icon: ALERT_ICON;
  subject: string;
}): Alert => ({
  id: uuidv4(),
  title,
  content,
  icon,
  subject,
});

import { createAlert } from '.';
import { ALERT_ICON } from '../../store/reducers/game';

jest.mock('uuid', () => ({
  v4: (): string => 'uuid-v4',
}));

describe('Utils > createAlert', () => {
  it('creates a valid alert', () => {
    const mockInput = {
      title: 'Test Title',
      content: 'Test Content',
      icon: ALERT_ICON.DEATH,
      subject: 'Test Subject',
    };

    expect(createAlert(mockInput)).toEqual({
      ...mockInput,
      id: 'uuid-v4',
    });
  });
});

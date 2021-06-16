import { PHASE_NAME } from '../../types/phase';

import { COMPONENT_MATRIX } from './matrix';

describe('Components > ViewController > Matrix', () => {
  it('has a defined default for every game phase', () => {
    Object.values(PHASE_NAME).forEach((phase) => {
      expect(COMPONENT_MATRIX[phase].default).not.toBeUndefined();
    });
  });
});

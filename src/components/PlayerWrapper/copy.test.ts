import { PLAYER_ROLE, PLAYER_TEAM } from '../../types/player';

import { TEAM_TEXT, ROLE_TEXT } from './copy';

describe('Components > PlayerWrapper > Copy', () => {
  describe('TEAM_TEXT', () => {
    it('has a defined value for each team', () => {
      Object.values(PLAYER_TEAM).forEach((team) => {
        expect(TEAM_TEXT[team]).not.toBeUndefined();
      });
    });
  });

  describe('ROLE_TEXT', () => {
    it('has a defined value for every role', () => {
      Object.values(PLAYER_ROLE).forEach((role) => {
        expect(ROLE_TEXT[role]).not.toBeUndefined();
      });
    });
  });
});

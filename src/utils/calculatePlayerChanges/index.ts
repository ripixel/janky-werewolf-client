import { Alert, ALERT_ICON } from '../../store/reducers/game';
import { Player, PLAYER_TEAM } from '../../types/player';
import { createAlert } from '../createAlert';

export const calculatePlayerChanges = (
  oldPlayers: Player[],
  newPlayers: Player[]
): Alert[] => {
  const changes: Alert[] = [];

  oldPlayers.forEach((oldPlayer) => {
    const newPlayer = newPlayers.find(
      (player) => player.name === oldPlayer.name
    );

    if (!newPlayer) {
      return;
    }

    if (newPlayer.attributes.alive !== oldPlayer.attributes.alive) {
      changes.push(
        createAlert({
          title: `${newPlayer.name} was killed!`,
          content: `It appears as though ${newPlayer.name} died a tragic death. They were a ${newPlayer.attributes.role}, on the ${newPlayer.attributes.team} team.`,
          icon: ALERT_ICON.DEATH,
          subject: newPlayer.name,
        })
      );
    } else if (newPlayer.attributes.team !== oldPlayer.attributes.team) {
      changes.push(
        createAlert({
          title: `${newPlayer.name} is ${newPlayer.attributes.team}`,
          content: `You've found out some information! Aren't you clever!`,
          icon:
            newPlayer.attributes.team === PLAYER_TEAM.GOOD
              ? ALERT_ICON.TEAM_GOOD
              : ALERT_ICON.TEAM_EVIL,
          subject: newPlayer.name,
        })
      );
    }
  });

  return changes;
};

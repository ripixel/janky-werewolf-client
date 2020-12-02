import { v4 as uuidv4 } from 'uuid';

import { Action } from '../../actions/types';
import { USER_ACTION_TYPES, SetNameAction } from '../../actions/user';

export interface UserState {
  secret: string; // generated and stored in localStorage, will be a guid - specific to each device. Used to identify user to the server
  name?: string; // defined when joining a game
}

const getOrGenerateId = (): string => {
  const KEY = 'userSecret';
  const idFromStorage = window.localStorage.getItem(KEY);
  if (idFromStorage) {
    return idFromStorage;
  }

  const newId = uuidv4();
  window.localStorage.setItem(KEY, newId);
  return newId;
};

const getInitialState = (): UserState => ({
  secret: getOrGenerateId(),
});

export const userReducer = (
  state: UserState = getInitialState(),
  action: Action
): UserState => {
  switch (action.type) {
    case USER_ACTION_TYPES.SET_NAME:
      return { ...state, name: (action as SetNameAction).payload };
    default:
      return state;
  }
};

export default userReducer;

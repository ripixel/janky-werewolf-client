import { v4 as uuidv4 } from 'uuid';

import { IAction } from '../../actions/types';
import { USER_ACTION_TYPES, TSetNameAction } from '../../actions/user';

export interface IUserState {
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

const getInitialState = (): IUserState => ({
  secret: getOrGenerateId(),
});

export const userReducer = (
  state: IUserState = getInitialState(),
  action: IAction
): IUserState => {
  switch (action.type) {
    case USER_ACTION_TYPES.SET_NAME:
      return { ...state, name: (action as TSetNameAction).payload };
    default:
      return state;
  }
};

export default userReducer;

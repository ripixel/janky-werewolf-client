import { IAction } from '../types';

export enum USER_ACTION_TYPES {
  SET_NAME = 'USER-SET_NAME',
}

export type TSetNameAction = IAction<string>;
export const setName = (name: string): TSetNameAction => ({
  type: USER_ACTION_TYPES.SET_NAME,
  payload: name,
});

import { createAction, props } from '@ngrx/store';
import { Action } from '@ngrx/store';
import { Users } from '../reducers/user.reducer';

export enum UserActionTypes {
  LoadUsers = '[User] Load Users',
  LoadUsersSuccess = '[User] Load Users Success',
  LoadUsersFailure = '[User] Load Users Failure',
}

export const loadUsers = createAction(
  UserActionTypes.LoadUsers
);

export const loadUsersSuccess = createAction(
  UserActionTypes.LoadUsersSuccess,
  props<{ data: any }>()
);

export const loadUsersFailure = createAction(
  UserActionTypes.LoadUsersFailure,
  props<{ error: any }>()
);


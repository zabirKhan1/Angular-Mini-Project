import { createAction, props } from '@ngrx/store';
import { UserType } from '../../Components/Models/userModels';

export enum UserListActionTypes {
  LoadUsersList = '[User] Load UsersList',
  LoadUsersListSuccess = '[User] Load UsersList Success',
  LoadUsersListFailure = '[User] Load UsersList Failure',
}

export const loadUsersList = createAction(
    UserListActionTypes.LoadUsersList
  );
  
  export const loadUsersListSuccess = createAction(
    UserListActionTypes.LoadUsersListSuccess,
    props<{ users: UserType[] }>()
  );
  
  export const loadUsersListFailure = createAction(
    UserListActionTypes.LoadUsersListFailure,
    props<{ error: string }>()
  );
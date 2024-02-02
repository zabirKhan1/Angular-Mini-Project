import { createAction, props } from "@ngrx/store";
import { UserType, UsersTypes } from "../../Components/Models/userModels";

export enum UserListActionTypes {
  LoadUsersList = "[User] Load UsersList",
  LoadUsersListSuccess = "[User] Load UsersList Success",
  LoadUsersListFailure = "[User] Load UsersList Failure",

  DeleteUser = "[User] Delete User",
  DeleteUserSuccess = "[User] Delete User Success",

  AddUser = "[User] Add User",
  AddUserSuccess = "[User] Add User Success",

  UpdateUser = "[User] Update User",
  UpdateUserSuccess = "[User] Update User Success",
}

export const loadUsersList = createAction(UserListActionTypes.LoadUsersList);

export const loadUsersListSuccess = createAction(
  UserListActionTypes.LoadUsersListSuccess,
  props<{ users: UsersTypes[] }>()
);

export const loadUsersListFailure = createAction(
  UserListActionTypes.LoadUsersListFailure,
  props<{ error: string }>()
);

export const addUser = createAction(
  UserListActionTypes.AddUser,
  props<{ users: UserType }>()
);

export const addUserSuccesSuccess = createAction(
  UserListActionTypes.AddUserSuccess
);

export const deleteUser = createAction(
  UserListActionTypes.DeleteUser,
  props<{ users: UserType }>()
);

export const deleteUserSucces = createAction(
  UserListActionTypes.DeleteUserSuccess
);

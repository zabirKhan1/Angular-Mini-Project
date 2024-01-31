import { Action, createReducer, on } from "@ngrx/store";
import { UserType } from "../../Components/Models/userModels";
import {
  loadUsersList,
  loadUsersListFailure,
  loadUsersListSuccess,
} from "../actions/userList.action";

export interface userListState {
  users: UserType[];
  err: string;
}

export const initialState: userListState = {
  users: [],
  err: "",
};

export const userListReducer = createReducer(
  initialState,
  on(loadUsersList, (state) => ({
    ...state,
  })),
  on(loadUsersListSuccess, (state, action) => {
    return {
      ...state,
      users: action.users,
    };
  }),
  on(loadUsersListFailure, (state, action) => ({
    ...state,
    err: action.error,
  }))
);

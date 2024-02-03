import { Action, createReducer, on } from "@ngrx/store";
import { UsersTypes } from "../../Components/Models/userModels";
import {
  loadUsersDataById,
  loadUsersDataByIdFailure,
  loadUsersDataByIdSuccess,
  loadUsersList,
  loadUsersListFailure,
  loadUsersListSuccess,
} from "../actions/userList.action";

export interface userListState {
  users: UsersTypes[];
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

export const initialStateUser: UsersTypes = {
  firstname: "",
  lastname: "",
  dob: "",
  company: "",
  email: "",
  address: "",
  id: "",
};

export const userByIdReducer = createReducer(
  initialStateUser,
  on(loadUsersDataById, (state) => ({
    ...state,
  })),
  on(loadUsersDataByIdSuccess, (state, action) => {
    return {
      ...state,
      users: action.users,
    };
  }),
  on(loadUsersDataByIdFailure, (state, action) => ({
    ...state,
    err: action.error,
  }))
);

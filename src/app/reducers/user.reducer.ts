import { Action, createReducer, on } from "@ngrx/store";
import {
  loadUsers,
  loadUsersSuccess,
  loadUsersFailure,
} from "../actions/user.actions";
export interface Users {
  firstname: string;
  lastname: string;
}

export interface State {
  users: Users[];
  err: string;
}

export const initialState: State = {
  users: [{ firstname: "zabir", lastname: "khan" }],
  err: "",
};

const userReducer = createReducer(
  initialState,
  on(loadUsers, (state) => ({
    ...state,
  })),
  on(loadUsersSuccess, (state, action) => ({
    ...state,
    users: action.data,
    err: "",
  })),
  on(loadUsersFailure, (state, action) => ({
    ...state,
    err: action.error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return userReducer(state, action);
}

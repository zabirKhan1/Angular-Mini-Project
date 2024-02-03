import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { userListState } from "../reducers/userList.reducer";
import { UsersTypes } from "../../Components/Models/userModels";

const getUserListState = createFeatureSelector<any>("UserList");

export const gerUserList = createSelector(getUserListState, (state) => {
  return state.users;
});

export const selectUserList = createSelector(
  gerUserList,
  (state: userListState) => state
);

const getUserListByIdState = createFeatureSelector<any>("UserById");

export const gerUserById = createSelector(getUserListByIdState, (state) => {
  return state.users;
});

export const selectUserById = createSelector(
  gerUserById,
  (state: UsersTypes) => state
);

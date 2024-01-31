import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { userListState } from "../reducers/userList.reducer";

const getUserListState = createFeatureSelector<any>("UserList");

export const gerUserList = createSelector(getUserListState, (state) => {
  return state.users;
});

export const selectUserList = createSelector(
  gerUserList,
  (state: userListState) => state
);

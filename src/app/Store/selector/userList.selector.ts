import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { userListState } from "../reducers/userList.reducer";

export const SelectUserList = (state: AppState) => state.userList;

export const selectCartProducts = createSelector(
  SelectUserList,
  (state: userListState) => state.users
);

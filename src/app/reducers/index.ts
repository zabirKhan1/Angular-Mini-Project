import { isDevMode } from "@angular/core";
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from "@ngrx/store";
import * as fromUser from "./user.reducer";

export interface State {
  [fromUser.userFeatureKey]: fromUser.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromUser.userFeatureKey]: fromUser.reducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];

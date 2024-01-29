import { createReducer, on } from "@ngrx/store";
import { UserActions } from "../actions/user.actions";

export const userFeatureKey = "user";

export interface State {
  
}

export const initialState: State = {
  name:'zabirr'
};

export const reducer = createReducer(initialState);

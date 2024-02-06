import { createReducer, on } from "@ngrx/store";
import {
  loadDashboardData,
  loadDashboardDataFailure,
  loadDashboardDataSuccess,
} from "../actions/dashboard.action";
import { Dashboard } from "../../Components/Models/userModels";

export interface userListState {
  dashboardData: Dashboard[];
  err: string;
}

export const initialState: userListState = {
  dashboardData: [],
  err: "",
};

export const dashboardDataReducer = createReducer(
  initialState,
  on(loadDashboardData, (state) => ({
    ...state,
  })),
  on(loadDashboardDataSuccess, (state, action) => {
    return {
      ...state,
      dashboardData: action.dash,
    };
  }),
  on(loadDashboardDataFailure, (state, action) => ({
    ...state,
    err: action.error,
  }))
);

import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DashboardTypes } from "../actions/dashboard.action";

const getDashBoardDataState = createFeatureSelector<any>("dashData");

export const getDashboardData = createSelector(getDashBoardDataState, (state) => {
  return state.dashboardData;
});

export const selectDashBoardData = createSelector(
  getDashboardData,
  (state: DashboardTypes) => state
);
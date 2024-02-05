import { createAction, props } from "@ngrx/store";

export enum DashboardTypes {
  LoadDashboardData = "[User] Load DashboardData",
  LoadDashboardDataSuccess = "[User] Load DashboardData Success",
  LoadDashboardDataFailure = "[User] Load DashboardDataList Failure",
}

export const loadDashboardData = createAction(DashboardTypes.LoadDashboardData);

export const loadDashboardDataSuccess = createAction(
  DashboardTypes.LoadDashboardDataSuccess,
  props<{ dash: any[] }>()
);

export const loadUsersListFailure = createAction(
  DashboardTypes.LoadDashboardDataFailure,
  props<{ error: string }>()
);

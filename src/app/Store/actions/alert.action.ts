import { createAction, props } from "@ngrx/store";

export enum alertTypes {
  ShowAlerts = "'Alerts' Show Alerts",
  Empty = "'Alerts' Empty",
}

export const showAlerts = createAction(
  alertTypes.ShowAlerts,
  props<{ message: string; res: string }>()
);

export const emptyAction = createAction(alertTypes.Empty);

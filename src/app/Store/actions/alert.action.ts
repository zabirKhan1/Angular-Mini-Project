import { createAction, props } from "@ngrx/store";


export const SHOW_ALERT = '[customer] show alert'
export const showAlert = createAction(SHOW_ALERT, props<{ message: string, resptype: string }>())
export const emptyAction = createAction('emptyaction')

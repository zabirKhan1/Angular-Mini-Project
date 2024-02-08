import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { emptyAction, showAlert } from "../actions/alert.action";
import { exhaustMap, map } from "rxjs";
@Injectable()
export class alertEffect {
  constructor(private matSnack: MatSnackBar, private actions$: Actions) {}

  _showalert = createEffect(() =>
  this.actions$.pipe(
      ofType(showAlert),
      exhaustMap((action) => {
          return this.Showsnackbaraler(action.message, action.resptype).afterDismissed().pipe(
              map(() => {
                  return emptyAction();
              })
          )
      })
  )
)

Showsnackbaraler(message: string, resptype: string = 'fail') {
  let _class = resptype === 'pass' ? 'text-green' : 'text-red';
  return this.matSnack.open(message, 'OK', {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 5000,
      panelClass: [_class]
  })
}
}

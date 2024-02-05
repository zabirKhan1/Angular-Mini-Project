import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { emptyAction, showAlerts } from "../actions/alert.action";
import { exhaustMap, map } from "rxjs";
@Injectable()
export class alertEffect {
  constructor(private matSnack: MatSnackBar, private actions$: Actions) {}

  snackBarEffect = (message: string, res: string = "fail") => {
    let _class = res === "pass" ? "text-green" : "text-red";
    return this.matSnack.open(message, "OK", {
      verticalPosition: "top",
      horizontalPosition: "end",
      duration: 5000,
      panelClass: [_class],
    });
  };

  alertEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(showAlerts),
      exhaustMap((action) => {
        return this.snackBarEffect(action.message, action.res)
          .afterDismissed()
          .pipe(
            map(() => {
              return emptyAction();
            })
          );
      })
    );
  });
}

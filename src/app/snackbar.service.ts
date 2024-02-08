import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Actions } from "@ngrx/effects";

@Injectable({
  providedIn: "root",
})
export class SnackbarService {
  constructor(private matSnack: MatSnackBar, private actions$: Actions) {}

  snackBarEffect = (message: string, res: string = "fail") => {
    let _class = res === "pass" ? "text-green" : "text-red";
    return this.matSnack.open(message, "OK", {
      verticalPosition: "bottom",
      horizontalPosition: "center",
      duration: 5000,
      panelClass: [_class],
    });
  };
}

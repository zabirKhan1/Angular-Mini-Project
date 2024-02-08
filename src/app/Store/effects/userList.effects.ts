import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { HttpClient } from "@angular/common/http";
import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { CommonServices } from "../../services/services.module";
import {
  addUser,
  addUserSucces,
  deleteUser,
  deleteUserSucces,
  loadUsersDataById,
  loadUsersDataByIdFailure,
  loadUsersDataByIdSuccess,
  loadUsersList,
  loadUsersListFailure,
  loadUsersListSuccess,
  updateUser,
  updateUserSuccess,
} from "../actions/userList.action";
import { MatSnackBar } from "@angular/material/snack-bar";
import { showAlerts } from "../actions/alert.action";

@Injectable()
export class UserListEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private CommonServices: CommonServices,
    private matSnack: MatSnackBar
  ) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsersList),
      switchMap(() =>
        this.CommonServices.getAllUsers().pipe(
          map((users) => loadUsersListSuccess({ users: users })),
          catchError((_err) =>
          of(showAlerts({ message: "Failed to Load User Data", res:_err}))
        )
        )
      )
    )
  );

  loadUsersById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsersDataById),
      switchMap((action) => {
        return this.CommonServices.getUserById(action.code).pipe(
          map((users) => loadUsersDataByIdSuccess({ users: users })),
          catchError((_err) =>
          of(showAlerts({ message: "Failed to Load User Data", res:_err}))
        )
        );
      })
    )
  );

  addUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addUser),
      switchMap((action) => {
        return this.CommonServices.AddUser(action as any).pipe(
          switchMap(() => {
            return of(
              addUserSucces(),
              showAlerts({ message: "Added successfully", res: "pass" })
            );
          }),
          catchError((_err) =>
            of(showAlerts({ message: "Failed to add", res: "fail" }))
          )
        );
      })
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      switchMap((action) => {
        return this.CommonServices.updateUserById(action.user, action.id).pipe(
          switchMap(() => {
            return of(
              updateUserSuccess(),
              showAlerts({ message: "Updated successfully", res: "pass" })
            );
          }),
          catchError((_err) =>
            of(showAlerts({ message: "Failed to Update", res: "fail" }))
          )
        );
      })
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUser),
      switchMap((action) => {
        return this.CommonServices
          .deleteUserById(Object.values(action).slice(0, 4).join("") as any)
          .pipe(
            switchMap(() => {
              return of(
                deleteUserSucces(),
                showAlerts({
                  message: "Deleted User successfully",
                  res: "pass",
                })
              );
            }),
            catchError((_err) =>
              of(showAlerts({ message: "Failed to Delete", res: "fail" }))
            )
          );
      })
    )
  );
}

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
import { showAlert } from "../actions/alert.action";

@Injectable()
export class UserListEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private CommonServices: CommonServices,
    private matSnack: MatSnackBar,
  ) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsersList),
      switchMap(() =>
        this.CommonServices.getAllUsers().pipe(
          map((users) => loadUsersListSuccess({ users: users })),
          catchError((_err: string) => {
            return of(
              showAlert({
                message: "Failed to Load User Data",
                resptype: "fail",
              })
            );
          })
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
          catchError((_err) => {
            return of(
              showAlert({ message: "Failed to Load User Data", resptype: 'fail' })
            );
          })
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
              showAlert({ message: "Added successfully", resptype: "pass" })
            );
          }),
          catchError((_err) => {
            return of(
              showAlert({ message: "Failed to add", resptype: "fail" })
            );
          })
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
              showAlert({ message: "Updated successfully", resptype: "pass" })
            );
          }),
          catchError((_err) => {
            return of(
              showAlert({ message: "Failed to Update", resptype: "fail" })
            );
          })
        );
      })
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUser),
      switchMap((action) => {
        return this.CommonServices.deleteUserById(
          Object.values(action).slice(0, 4).join("") as any
        ).pipe(
          switchMap(() => {
            return of(
              deleteUserSucces(),
              showAlert({
                message: "Deleted User successfully",
                resptype: "pass",
              })
            );
          }),
          catchError((_err) => {
            return of(
              showAlert({ message: "Failed to Delete", resptype: "fail" })
            );
          })
        );
      })
    )
  );
}

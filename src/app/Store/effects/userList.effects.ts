import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { HttpClient } from "@angular/common/http";
import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { UserService } from "../../services/services.module";
import {
  addUser,
  addUserSuccesSuccess,
  deleteUser,
  deleteUserSucces,
  loadUsersList,
  loadUsersListFailure,
  loadUsersListSuccess,
} from "../actions/userList.action";
import { MatSnackBar } from "@angular/material/snack-bar";
import { showAlerts } from "../actions/alert.action";
import { UserType } from "../../Components/Models/userModels";
@Injectable()
export class UserListEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private userService: UserService,
    private matSnack: MatSnackBar
  ) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsersList),
      switchMap(() =>
        this.userService.getAllUsers().pipe(
          map((users) => loadUsersListSuccess({ users: users })),
          catchError((error) => of(loadUsersListFailure({ error })))
        )
      )
    )
  );

  addUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addUser),
      switchMap((action) => {
        return this.userService.AddUser(action as any).pipe(
          switchMap(() => {
            return of(
              addUserSuccesSuccess(),
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

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUser),
      switchMap((action) => {
        console.log('deleeyye-----',action)
        return this.userService.deleteUserById( Object.values(action).slice(0, 4).join('') as any).pipe(
          switchMap(() => {
            return of(
              deleteUserSucces(),
              showAlerts({ message: "Deleted User successfully", res: "pass" })
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

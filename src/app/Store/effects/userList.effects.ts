import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { HttpClient } from "@angular/common/http";
import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { UserService } from "../../services/services.module";
import {
  loadUsersList,
  loadUsersListFailure,
  loadUsersListSuccess,
} from "../actions/userList.action";
@Injectable()
export class UserListEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private userService: UserService
  ) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsersList),
      switchMap(() =>
        this.userService.getUsers().pipe(
          map((users) => loadUsersListSuccess({ users: users })),
          catchError((error) => of(loadUsersListFailure({ error })))
        )
      )
    )
  );
}

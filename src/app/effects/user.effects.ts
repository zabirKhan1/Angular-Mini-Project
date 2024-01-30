import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { HttpClient } from "@angular/common/http";
import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { UserService } from "../services/services.module";
import { loadUsers, loadUsersFailure, loadUsersSuccess } from "../actions/user.actions";
@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private userService: UserService
  ) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      switchMap(() =>
        this.userService.getUsers().pipe(
          map(users => loadUsersSuccess({ data: users })),
          catchError(error => of(loadUsersFailure({ error })))
        )
      )
    )
  );
}

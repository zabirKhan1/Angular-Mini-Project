import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { loadDashboardData, loadDashboardDataFailure, loadDashboardDataSuccess } from "../actions/dashboard.action";
import { DashboardModule } from "../../services/dashboard.module";

@Injectable()
export class DashboardDataEffect {
  constructor(
    private actions$: Actions,
    private dashServices: DashboardModule,
  ) {}

  loadDashBoardData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDashboardData),
      switchMap(() =>
        this.dashServices.getDashboardData().pipe(
          map((data) => loadDashboardDataSuccess({ dash: data })),
          catchError((error) => of(loadDashboardDataFailure({ error })))
        )
      )
    )
  );

}

import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { CommonServices } from "../../services/services.module";
import { loadDashboardData, loadDashboardDataFailure, loadDashboardDataSuccess } from "../actions/dashboard.action";

@Injectable()
export class DashboardDataEffect {
  constructor(
    private actions$: Actions,
    private CommonServices: CommonServices,
  ) {}

  loadDashBoardData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDashboardData),
      switchMap(() =>
        this.CommonServices.getDashboardData().pipe(
          map((data) => loadDashboardDataSuccess({ dash: data })),
          catchError((error) => of(loadDashboardDataFailure({ error })))
        )
      )
    )
  );

}

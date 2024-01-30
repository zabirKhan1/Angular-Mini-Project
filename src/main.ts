import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "./app/app.config";
import { AppComponent } from "./app/app.component";
import { ActionReducerMap, provideStore } from "@ngrx/store";
import { provideRouter } from "@angular/router";
import { routes } from "./app/app.routes";
import { provideEffects } from "@ngrx/effects";
import { UserEffects } from "./app/effects/user.effects";
import { State, reducer } from "./app/reducers/user.reducer";

interface RootState {
  user: State
}

// Define the root reducer
const rootReducer: ActionReducerMap<RootState> = {
  user: reducer,
};

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideStore(rootReducer),
    // provideEffects([UserEffects]),
  ],
}).catch((err) => console.error(err));

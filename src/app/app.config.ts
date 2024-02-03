import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideState, provideStore } from "@ngrx/store";
import { provideHttpClient, withFetch } from "@angular/common/http";
import { provideClientHydration } from "@angular/platform-browser";
import {
  userByIdReducer,
  userListReducer,
} from "./Store/reducers/userList.reducer";
import { UserListEffects } from "./Store/effects/userList.effects";
import { provideEffects } from "@ngrx/effects";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(withFetch()),
    provideStore(),
    provideState({ name: "UserList", reducer: userListReducer }),
    provideState({ name: "UserById", reducer: userByIdReducer }),
    provideEffects([UserListEffects]),
  ],
};

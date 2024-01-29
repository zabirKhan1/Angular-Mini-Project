import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "./app/app.config";
import { AppComponent } from "./app/app.component";
import { provideStore } from "@ngrx/store";
import { provideRouter } from "@angular/router";
import { routes } from "./app/app.routes";
import { provideEffects } from "@ngrx/effects";
import { reducers } from "./app/reducers";
import { UserEffects } from "./app/effects/user.effects";

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideStore(reducers),
    provideEffects([UserEffects]),
  ],
}).catch((err) => console.error(err));

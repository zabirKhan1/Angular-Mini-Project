import { Routes } from "@angular/router";
import { DashboardComponent } from "./Components/dashboard/dashboard.component";

export const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
  },
  {
    path: "user-data",
    loadComponent: () =>
      import("./Components/user-data/user-data.component").then(
        (e) => e.UserDataComponent
      ),
  },
];

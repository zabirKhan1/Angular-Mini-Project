import { Routes } from "@angular/router";
import { DashboardComponent } from "./Components/dashboard/dashboard.component";
import { AddUserComponent } from "./Components/add-user/add-user.component";
import { UserDetailsComponent } from "./Components/user-details/user-details.component";

export const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
  },
  {
    path: "add-user",
    component: AddUserComponent,
  },
  {
    path: "edit-user/:id",
    component: AddUserComponent,
  },
  {
    path: "view-user-details/:id",
    component: UserDetailsComponent,
  },
  {
    path: "user-data",
    loadComponent: () =>
      import("./Components/user-data/user-data.component").then(
        (e) => e.UserDataComponent
      ),
  },
];

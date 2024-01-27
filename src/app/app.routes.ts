import { Routes } from '@angular/router';
import { UserDataComponent } from './Components/user-data/user-data.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';


export const routes: Routes = [
  {
    path: 'user-data',
    component: UserDataComponent,
  },
  {
    path: '',
    component: DashboardComponent,
  },
];

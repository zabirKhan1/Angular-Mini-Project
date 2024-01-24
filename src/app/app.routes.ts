import { Routes } from '@angular/router';
import { UserDataComponent } from './user-data/user-data.component';
import { DashboardComponent } from './dashboard/dashboard.component';

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

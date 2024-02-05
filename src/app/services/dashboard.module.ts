import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class DashboardModule {

  constructor(private http: HttpClient) {}

  getDashboardData(): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:3000/dashboard");
  }
 }

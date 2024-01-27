import { Component, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ChartModule } from 'angular-highcharts';
import { HeaderComponent } from './Components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
// import { reducers, metaReducers, reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    RouterModule,
    ChartModule,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Project';
}

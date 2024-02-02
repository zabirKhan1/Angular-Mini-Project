import { Component, isDevMode } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink, RouterModule, RouterOutlet } from "@angular/router";
import { ChartModule } from "angular-highcharts";
import { HeaderComponent } from "./Components/header/header.component";
import { HttpClientModule } from "@angular/common/http";
import { MaterialModuleModule } from "./Module/material-module/material-module.module";
import { DateConvertorPipe } from "./CustomPipe/date-convertor.pipe";
@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    RouterModule,
    RouterLink,
    ChartModule,
    HttpClientModule,
    MaterialModuleModule,
    DateConvertorPipe
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "Project";
}

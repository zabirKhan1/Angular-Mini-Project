import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Chart, ChartModule } from "angular-highcharts";
import { loadUsersList } from "../../Store/actions/userList.action";
import { selectUserList } from "../../Store/selector/userList.selector";
import { Observable } from "rxjs";
import { DashboardService } from "../../services/dashboard.service";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [ChartModule],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css",
})
export class DashboardComponent {
  pieChartData: any;
  barcharts: any;
  pieChat: any;
  barChartData: any;
  userList$!: Observable<any>;
  users: any = [];
  NumberOfUser: number | null = null;

  constructor(
    private store: Store,
    private dashboardServices: DashboardService
  ) {}

  lineCharts: any;
  lineChartData: any;
  ngOnInit() {
    this.store.dispatch(loadUsersList());
    this.userList$ = this.store.select(selectUserList);
    this.userList$.subscribe((user) => {
      this.NumberOfUser = user.length;
      this.users = user;
      this.pieChartData = this.dashboardServices.countUsersByMonth(user);
      this.barChartData = this.dashboardServices.calculateAgeGroups(user);
      const usersCreatedLastWeek =
        this.dashboardServices.getUsersCreatedLastWeek(user);
      const dataForLineChart =
        this.dashboardServices.getDataForLineChart(usersCreatedLastWeek);

      this.dashboardServices.lineChartObj = {
        ...this.dashboardServices.lineChartObj,
        series: [
          {
            name: "Users Created Last 7 Days",
            data: dataForLineChart,
          },
        ],
        title: {
          text: "Users Created Last 7 Days",
        },
      };

      this.dashboardServices.barChartObj = {
        ...this.dashboardServices.barChartObj,
        series: [
          {
            name: "Number Of People",
            data: this.barChartData,
          },
        ],
      };

      this.dashboardServices.pieChartObj = {
        ...this.dashboardServices.pieChartObj,
        series: [
          {
            type: "pie",
            data: this.pieChartData,
            name: "No Of people",
          },
        ],
      };
      this.lineCharts = new Chart(this.dashboardServices.lineChartObj as any);
      this.barcharts = new Chart(this.dashboardServices.barChartObj as any);
      this.pieChat = new Chart(this.dashboardServices.pieChartObj as any);
    });
  }
}

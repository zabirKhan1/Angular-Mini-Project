import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Chart, ChartModule } from "angular-highcharts";
import { loadUsersList } from "../../Store/actions/userList.action";
import { selectUserList } from "../../Store/selector/userList.selector";
import { Observable } from "rxjs";
import { DashboardService } from "../../services/dashboard.service";
import * as Highcharts from "highcharts";
import HighchartsSankey from "highcharts/modules/sankey";
HighchartsSankey(Highcharts);
import { Options } from "highcharts";

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
  sankeyChartOptions: any;

  nodes = [
    {
        "id": "16293",
        "name": "EM3 NF-29"
    },
    {
        "id": "16871",
        "name": "dms1 NF-29"
    },
    {
        "id": "16875",
        "column": 2,
        "name": "n1meter NF-29 Xpert"
    }
]

  data =[
    [
        "16871",
        "17593",
        25
    ],
    [
        "16871",
        "17322",
        25
    ],
    [
        "16293",
        "16875",
        50
    ]
]
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

      // Initialize Sankey chart
      this.sankeyChartOptions = new Chart({
        chart: {
          type: "sankey",
        },
        title: {
          text: "Sankey Diagram",
        },
        series: [
          {
            type: "sankey",
            keys: ["from", "to", "weight"],
            nodes: this.nodes,
            data: this.data,
          },
        ],
      });

      this.lineCharts = new Chart(this.dashboardServices.lineChartObj as any);
      this.barcharts = new Chart(this.dashboardServices.barChartObj as any);
      this.pieChat = new Chart(this.dashboardServices.pieChartObj as any);
    });
  }
}

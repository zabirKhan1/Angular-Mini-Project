import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Chart, ChartModule } from "angular-highcharts";
import * as Highcharts from "highcharts";
import { loadDashboardData } from "../../Store/actions/dashboard.action";
import { selectDashBoardData } from "../../Store/selector/dashboard.selector";
import { Dashboard, UsersTypes } from "../Models/userModels";
import { loadUsersList } from "../../Store/actions/userList.action";
import { selectUserList } from "../../Store/selector/userList.selector";
import { Observable } from "rxjs";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [ChartModule],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css",
})
export class DashboardComponent {
  dataDashboard: Dashboard[] = [];
  pieChartData: any;
  barcharts: any;
  pieChat: any;
  barChartData: any;
  userList$!: Observable<any>;
  users: any = [];
  NumberOfUser: number | null = null;

  countUsersByMonth(users: UsersTypes[]) {
    const monthCounts = Array.from({ length: 12 }, () => 0);
    users.forEach((user) => {
      const month = new Date(user.dob).getMonth();
      monthCounts[month]++;
    });
    const monthData: any[] = [];
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    monthNames.forEach((month, index) => {
      monthData.push([month, monthCounts[index]]);
    });
    return monthData;
  }

  calculateAgeGroups(users: any[]): [string, number][] {
    const ageGroups = {
      "0-18": 0,
      "18-25": 0,
      "26-35": 0,
      "36-45": 0,
      "46-55": 0,
      "56+": 0,
    };
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    users.forEach((user) => {
      const dob = new Date(user.dob);
      const age = currentYear - dob.getFullYear();
      if (age <= 18) {
        ageGroups["0-18"]++;
      } else if (age >= 18 && age <= 25) {
        ageGroups["18-25"]++;
      } else if (age >= 26 && age <= 35) {
        ageGroups["26-35"]++;
      } else if (age >= 36 && age <= 45) {
        ageGroups["36-45"]++;
      } else if (age >= 46 && age <= 55) {
        ageGroups["46-55"]++;
      } else {
        ageGroups["56+"]++;
      }
    });
    const dataArray = Object.entries(ageGroups);
    return dataArray;
  }

  getUsersCreatedLastWeek(users: any[]): any[] {
    const currentDate = new Date();
    const lastWeekDate = new Date();
    lastWeekDate.setDate(currentDate.getDate() - 7);
    return users.filter((u: any) => new Date(u.createdAt) >= lastWeekDate);
  }

  getDataForLineChart(usersCreatedLastWeek: any[]): number[] {
    const currentDate = new Date();
    const dataForLineChart = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(currentDate.getDate() - i);
      const dateString = date.toISOString().slice(0, 10);
      const usersCreatedOnDate = usersCreatedLastWeek.filter(
        (u: any) => u.createdAt.slice(0, 10) === dateString
      ).length;
      dataForLineChart.push(usersCreatedOnDate);
    }
    return dataForLineChart;
  }

  barChartObj = {
    chart: {
      type: "column",
      height: null,
    },
    title: {
      text: "",
    },
    subtitle: {
      text: "",
    },
    xAxis: {
      categories: ["0-18", "18-25", "26-35", "36-45", "46-55", "56+"],
      title: {
        text: null,
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Number Of Users Of different ages",
        align: "high",
      },
      labels: {
        overflow: "justify",
      },
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    legend: {
      layout: "horizontal",
      align: "left",
      verticalAlign: "bottom",
      x: -40,
      y: 80,
      floating: true,
      borderWidth: 1,
      backgroundColor:
        Highcharts?.defaultOptions?.legend?.backgroundColor || "#FFFFFF",
      shadow: true,
    },
    credits: {
      enabled: false,
    },
    series: [{}],
  };

  pieChartObj = {
    chart: {
      type: "pie",
      height: null,
    },
    title: {
      text: "Number Of Users Born In Different Months",
    },
    credits: {
      enabled: false,
    },

    legend: {
      floating: true,
      align: "left",
      layout: "verticle",
      verticalAlign: "top",
      width: 400,
      x: -20,
      y: 100,
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
      },
    },
    series: [{}],
  };

  lineChartObj = {
    chart: {
      type: "line",
    },
    title: {
      text: "Linechart",
    },
    credits: {
      enabled: false,
    },
    yAxis: {
      title: {
        text: "Number Of users",
      },
      gridLineWidth: 0,
    },
    legend: {
      y: 25,
    },
    series: [
      {
        name: "Line 1",
        data: [{}],
      },
    ],
  };

  constructor(private store: Store) {}

  lineCharts: any;
  lineChartData: any;
  ngOnInit() {
    this.store.dispatch(loadUsersList());
    this.userList$ = this.store.select(selectUserList);
    this.userList$.subscribe((user) => {
      this.NumberOfUser = user.length;
      this.users = user;
      this.pieChartData = this.countUsersByMonth(user);
      this.barChartData = this.calculateAgeGroups(user);
      const usersCreatedLastWeek = this.getUsersCreatedLastWeek(user);
      const dataForLineChart = this.getDataForLineChart(usersCreatedLastWeek);

      this.lineChartObj = {
        ...this.lineChartObj,
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

      this.barChartObj = {
        ...this.barChartObj,
        series: [
          {
            name: "Number Of People",
            data: this.barChartData,
          },
        ],
      };

      this.pieChartObj = {
        ...this.pieChartObj,
        series: [
          {
            type: "pie",
            data: this.pieChartData,
            name: "No Of people",
          },
        ],
      };
      this.lineCharts = new Chart(this.lineChartObj as any);
      this.barcharts = new Chart(this.barChartObj as any);
      this.pieChat = new Chart(this.pieChartObj as any);
    });
  }
}

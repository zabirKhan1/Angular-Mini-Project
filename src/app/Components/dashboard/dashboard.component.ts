import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Chart, ChartModule } from "angular-highcharts";
import * as Highcharts from "highcharts";
import { loadDashboardData } from "../../Store/actions/dashboard.action";
import { selectDashBoardData } from "../../Store/selector/dashboard.selector";
import { Dashboard } from "../Models/userModels";

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

  lineChartObj = {
    chart: {
      type: "line",
      height: null,
    },
    title: {
      text: "Linechart",
    },
    credits: {
      enabled: false,
    },
    series: [],
  };

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
      categories: ["2018-19", "2019-20", "2020-21", "2021-22"],
      title: {
        text: null,
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "In Thousand of Rupees",
        align: "high",
      },
      labels: {
        overflow: "justify",
      },
    },
    tooltip: {
      valuePrefix: "Rs. ",
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
    series: [],
  };

  pieChartObj = {
    chart: {
      type: "pie",
      height: null,
    },
    title: {
      text: "",
    },
    legend: {
      floating: true,
      align: "left",
      layout: "horizontal",
      verticalAlign: "bottom",
      width: 400,
      x: 0,
      y: 15,
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
    series: [],
  };

  constructor(private store: Store) {}

  lineCharts: any;
  lineChartData: any;
  barChartData: any;
  ngOnInit() {
    this.store.dispatch(loadDashboardData());
    this.store.select(selectDashBoardData).subscribe((data) => {
      this.dataDashboard = data as any;

      this.pieChartData = this.dataDashboard.find(
        (data: { chartType: string }) => data.chartType === "populationDivision"
      );
      this.barChartData = this.dataDashboard.find(
        (data: { chartType: string }) => data.chartType === "BudgetForState"
      );
      this.lineChartData = this.dataDashboard.find(
        (data: { chartType: string }) =>
          data.chartType === "NumberOfPeopleMigrating"
      );
      this.lineChartObj = {
        ...this.lineChartObj,
        series: this.lineChartData.data,
        title: {
          ...this.lineChartObj,
          text: this.lineChartData.title,
        },
      };
      this.barChartObj = {
        ...this.barChartObj,
        series: this.barChartData.data,
      };

      this.barChartObj = {
        ...this.barChartObj,
        series: this.barChartData.data,
        title: {
          ...this.barChartObj.title,
          text: this.barChartData.title,
        },
        subtitle: {
          ...this.barChartObj.title,
          text: this.barChartData.subtitle,
        },
      };

      this.pieChartObj = {
        ...this.pieChartObj,
        series: this.pieChartData.data,
        title: {
          ...this.pieChartObj.title,
          text: this.pieChartData.title,
        },
      };
      this.lineCharts = new Chart(this.lineChartObj);
      this.barcharts = new Chart(this.barChartObj as any);
      this.pieChat = new Chart(this.pieChartObj as any);
    });
  }
}

import { Component } from "@angular/core";
import { Chart, ChartModule } from "angular-highcharts";
import * as Highcharts from "highcharts";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [ChartModule],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css",
})
export class DashboardComponent {
  charts = new Chart({
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
    series: [
      {
        name: "Line 1",
        data: [1, 2, 9],
      } as any,
    ],
  });
  barcharts = new Chart({
    chart: {
      type: "column",
      height: null,
    },
    title: {
      text: "Trend of Receipt Budget",
    },
    subtitle: {
      text: "Data visualisation for receipt budgeting of the state",
    },
    xAxis: {
      categories: ["2018-19", "2019-20", "2020-21"],
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
    series: [
      {
        name: "Population",
        data: [
          ["Delhi", 24.2],
          ["Uttar Pradesh", 20.8],
          ["Madhya Pradesh", 14.9],
        ],
      } as any,
    ],
  });

  pieChat = new Chart({
    chart: {
      type: "pie",
      height: null,
    },
    title: {
      text: "Population Data",
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
    series: [
      {
        type: "pie",
        data: [
          ["Urban", 50],
          ["Rular", 79],
          ["Mid Urban", 15],
        ],
      },
    ],
  });
}

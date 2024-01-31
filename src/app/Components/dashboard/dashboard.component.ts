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
    },
    title: {
      text: "Linechart",
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: 'Line 1' ,
        data: [1, 2, 9] 
      } as any
    ]
  });
  barcharts = new Chart({
    chart: {
      type: "bar"
    },
    title: {
      text: "Trend of Receipt Budget"
    },
    subtitle: {
      text:
        'Data visualisation for receipt budgeting of the state'
    },
    xAxis: {
      categories: ["2018-19", "2019-20", "2020-21"],
      title: {
        text: null
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: "In Thousand of Rupees",
        align: "high"
      },
      labels: {
        overflow: "justify"
      }
    },
    tooltip: {
      valuePrefix: "Rs. "
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true
        }
      }
    },
    legend: {
      layout: "horizontal",
      align: "center",
      verticalAlign: "top",
      x: -40,
      y: 80,
      floating: true,
      borderWidth: 1,
      backgroundColor:
        Highcharts?.defaultOptions?.legend?.backgroundColor || "#FFFFFF",
      shadow: true
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: 'Population',
        data: [
            ['Shanghai', 24.2],
            ['Beijing', 20.8],
            ['Karachi', 14.9],
            ['Shenzhen', 13.7],
            ['Guangzhou', 13.1],
            ['Istanbul', 12.7],
            ['Mumbai', 12.4],
            ['Moscow', 12.2],
            ['São Paulo', 12.0],
            ['Delhi', 11.7],
            ['Kinshasa', 11.5],
            ['Tianjin', 11.2],
            ['Lahore', 11.1],
            ['Jakarta', 10.6],
            ['Dongguan', 10.6],
            ['Lagos', 10.6],
            ['Bengaluru', 10.3],
            ['Seoul', 9.8],
            ['Foshan', 9.3],
            ['Tokyo', 9.3]
        ],} as any
    ]
  });
  pieChat=new Chart({
    chart: {
      type: 'pie',
      // backgroundColor: '#BBBBBB',
      
    },
    title: {
        text: undefined
    },
    legend: {
        floating: true,
        align: 'left',
        layout: 'vertical',
        verticalAlign: 'top',
        width: 300,
        x: 200,
        y: 0
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    },
    series: [
      {
        type: "pie",
        data: [1, 2, 3, 4, 5]
      }
    ]
  })
}

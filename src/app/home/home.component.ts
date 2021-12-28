import { Component, OnInit } from '@angular/core';
import { ThemeConstantService } from '../shared/services/theme-constant.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  themeColors = this.colorConfig.get().colors;
  blue = this.themeColors.blue;
  blueLight = this.themeColors.blueLight;
  cyan = this.themeColors.cyan;
  cyanLight = this.themeColors.cyanLight;
  gold = this.themeColors.gold;
  purple = this.themeColors.purple;
  purpleLight = this.themeColors.purpleLight;
  red = this.themeColors.red;

  constructor( private colorConfig:ThemeConstantService) { }

  ngOnInit(): void {
  }

  summaryFormat = () => `$3,531`;




  salesChartOptions: any = {
    scaleShowVerticalLines: false,
    maintainAspectRatio: false,
    responsive: true,
    scales: {
        xAxes: [{
            display: true,
            scaleLabel: {
                display: false,
                labelString: 'Month'
            },
            gridLines: false,
            ticks: {
                display: true,
                beginAtZero: true,
                fontSize: 13,
                padding: 10
            }
        }],
        yAxes: [{
            display: true,
            scaleLabel: {
                display: false,
                labelString: 'Value'
            },
            gridLines: {
                drawBorder: false,
                offsetGridLines: false,
                drawTicks: false,
                borderDash: [3, 4],
                zeroLineWidth: 1,
                zeroLineBorderDash: [3, 4]
            },
            ticks: {
                max: 80,
                stepSize: 20,
                display: true,
                beginAtZero: true,
                fontSize: 13,
                padding: 10
            }
        }]
    }
};
salesChartLabels: string[] = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
salesChartType = 'bar';
salesChartColors: Array<any> = [
    {
        backgroundColor: this.themeColors.blue,
        borderWidth: 0
    },
    {
        backgroundColor: this.themeColors.blueLight,
        borderWidth: 0
    }
];
salesChartData: any[] = [
    {
        data: [20, 30, 35, 45, 55, 45],
        label: 'Online',
        categoryPercentage: 0.35,
        barPercentage: 0.70
    },
    {
        data: [25, 35, 40, 50, 60, 50],
        label: 'Offline',
        categoryPercentage: 0.35,
        barPercentage: 0.70
    }
];

}

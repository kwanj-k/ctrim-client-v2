import { Component } from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent {

  chartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true,
              fontColor: 'black'
          },
      }]
    }
  };

  chartData = [
    { data: [150000, 200000, 180000, 250000, 200000, 220000, 300000],
      label: 'Sales'},
    { data: [60000, 90000, 60000, 30000, 40000, 50000, 45000],
      label: 'Profits' },
    { data: [400000, 350000, 420000, 540000, 250000, 300000, 350000],
      label: 'Net Worth'
       },
  ];
  myColors = [
    {
      backgroundColor: [
        'rgba(51, 184, 173, 0.438)',
        'rgba(36, 204, 78, 0.61)',
        'rgba(206, 52, 137, 0.705)',
    ],
      borderColor: [
        'rgba(51, 184, 173, 1)',
        'rgba(36, 204, 78,  1)',
        'rgba(206, 52, 137, 1)',
    ],
      pointBackgroundColor: 'rgb(103, 58, 183)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(103, 58, 183, .8)'
    },
    // ...colors for additional data sets
  ];


  chartLabels = ['January', 'February', 'Mar', 'April', 'May', 'June', 'July'];

}

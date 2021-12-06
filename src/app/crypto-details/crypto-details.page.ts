import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Highcharts from 'highcharts';


@Component({
   selector: 'app-crypto-details',
   templateUrl: './crypto-details.page.html',
   styleUrls: ['./crypto-details.page.scss'],
})
export class CryptoDetailsPage implements OnInit {
   highcharts = Highcharts;
   chartOptions = {
      chart: {
         type: 'areaspline',
         zoomType: 'x',
         panning: true,
         panKey: 'shift',
         scrollablePlotArea: {
            minWidth: 300
         }
      },
      title: {
         text: "Percent change in price"
      },
      // subtitle: {
      //    text: "Source: WorldClimate.com"
      // },
      xAxis: {
         categories: ['3m', '2m', '1m', '1w', '1d', '1h']
      },
      yAxis: {
         title: {
            text: "Percent Change"
         }
      },
      tooltip: {
         backgroundColor: '#FCFFC5',
         borderColor: 'black',
         borderRadius: 10,
         borderWidth: 3,
         valueSuffix: " %",
         label:"test"
      },
      responsive: {
         rules: [{
            condition: {
               maxWidth: 500
            },
            chartOptions: {
               legend: {
                  enabled: false
               }
            }
         }]
      },
      res: {
         rules: [{
            condition: {
               maxWidth: 100
            },
            chartOptions: {
               chart: {
                  height: 200
               },
               subtitle: {
                  text: null
               },
               navigator: {
                  enabled: true
               }
            }
         }]
      },
      series: [
         // {
         //    name: 'Tokyo',
         //    data: [-53.22366617, -38.92618989, -32.95635107, -18.09961304, -12.6282003, 3.45679759]
         // },
         //  {
         //     name: 'New York',
         //     data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8,24.1, 20.1, 14.1, 8.6, 2.5]
         //  },
         //  {
         //     name: 'Berlin',
         //     data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
         //  },
         //  {
         //     name: 'London',
         //     data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
         //  }
      ]
   };
   public cryptoData: any[] = [];
   constructor(private route: ActivatedRoute, private router: Router) {
      this.route.queryParams.subscribe(params => {
         if (params && params.data) {
            this.cryptoData = JSON.parse(params.data);
            console.log(this.cryptoData);
            let usd = this.cryptoData['quote']['USD'];
            console.log(usd);

            let percentage = [];
            percentage.push(usd.percent_change_90d, usd.percent_change_60d, usd.percent_change_30d, usd.percent_change_24h, usd.percent_change_24h, usd.percent_change_7d, usd.percent_change_1h);
            console.log(percentage);

            this.chartOptions['series'].push(
               {
                  name: this.cryptoData['name'],
                  data: percentage
               }
            )
         }
      });
   }

   ngOnInit() {

   }

}

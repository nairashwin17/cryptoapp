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
      //    text: ""
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
      series: []
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

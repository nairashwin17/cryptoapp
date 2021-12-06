import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  providers: [DashboardService]
})
export class DashboardPage implements OnInit {

  public cryptoList :any= [];

// managing subscription
  private subscription: Subscription = new Subscription();
  constructor(
    private _dashboardService: DashboardService,
    public router: Router
  ) { }

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.getCryptoList();   //calling crypto list api
  }

  /**
   * Calling Crypto List Api
   */
  public getCryptoList() {
    const params ={
      limit:20,
    }
     this.subscription.add(
       this._dashboardService.getCryptoList(params).subscribe((data)=>{
        if(data){ //check for status or api status code
          this.cryptoList = data['data'];  // setting value to array
        }
        else{
          console.log('Error in api');
        }
       },
       (err)=>{
         console.log(err);
         
       })
     )
     
  }

/**
 * Refresh Crypto List
 */
  public refreshList(event){
    if(event){
      setTimeout(() => {
        event.target.complete();
      }, 2000);
    }

    this.getCryptoList();
  }

  /**
   * Redirecting to Details 
   */
   gotoCryptoDetails(crypto_data){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        data: JSON.stringify(crypto_data)
      }
    };
    this.router.navigate(['crypto-details'], navigationExtras);
   }
}

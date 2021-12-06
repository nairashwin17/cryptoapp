import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { LoadingController, Platform } from '@ionic/angular';
import { from, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { URLS } from '../_config/api.config';


@Injectable()
export class DashboardService {
  constructor(
    private http: HttpClient, 
    private nativehttp:HTTP, 
    public  loadingCtrl: LoadingController,
    public platform: Platform
    ) { }

  //calling api with http client
  getCryptoList(dataParams?: any): Observable<{}> {
    return this.http.get(URLS.cryptolist,{
      params: dataParams
    });
  }


    //Called using native http
   getNativeList(dataParams?: any){
    //  let loading =  this.loadingCtrl.create();
    console.log(dataParams);
    //   loading.present();
      // let nativeCall = this.nativehttp.get(URLS.cryptolist, dataParams,{'Content-type': 'application/json'});
      // this.nativehttp.setDataSerializer('json');
      return from(this.nativehttp.get(URLS.cryptolist, dataParams,{'Content-type': 'application/json'})).pipe(map(response => {
        return JSON.parse(response['data'] as any);

      }));
    }
}

import { NetworkService, ConnectionStatus } from './services/network.service';
import { Component } from '@angular/core';
 
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OfflineManagerService } from './services/offline-manager.service';
import { Network } from '@ionic-native/network/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    // private offlineManager: OfflineManagerService,
    private network: Network, public dialogs: Dialogs,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.network.onDisconnect().subscribe(()=>{
        this.dialogs.alert('network was Disconnected')
      });

      this.network.onConnect().subscribe(()=>{
        setTimeout(() => {
          console.log('connect');
          this.dialogs.alert('we got a' + this.network.type + 'connection');
        }, 2000);
        
      })
    });
  }
}

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Network } from 'ionic-native';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';

declare var Connection;

/*
  Generated class for the ConnectivityService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ConnectivityService {

    isConnected: boolean = false;

    constructor(public http: Http) {
        Network.onConnect().subscribe(() => {
            console.log("Network connected");
            setTimeout(() => {
                this.isConnected = true;
                if (Network.connection === Connection.WIFI ) {
                    console.log("WiFi connection available");
                }
            }, 3000);
        });

        Network.onDisconnect().subscribe(() => {
            console.log("Network disconnected");
            this.isConnected = false;
        });
    }

}

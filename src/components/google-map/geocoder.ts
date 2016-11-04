import { StatusBar } from 'ionic-native';
import { Observer } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Geocoder {

    private static geocoder: google.maps.Geocoder = null;

    constructor() { }

    /**
     *
     *
     * @param {string} address
     * @returns {Observable<google.maps.LatLng>}
     *
     * @memberOf GoogleMap
     */
    static getLatLng(address: string): Observable<google.maps.LatLng> {
        console.log("Getting latitude and longitude for - " + address);

        if (!this.geocoder) this.geocoder  = new google.maps.Geocoder();

        return Observable.create((observer: Observer<google.maps.LatLng>) => {
            this.geocoder.geocode({"address": address}, (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
                if (status === google.maps.GeocoderStatus.OK) {
                    observer.next(results[0].geometry.location);
                    observer.complete();
                } else {
                    console.log(results);
                    console.log(status);
                    observer.error({});
                }
            });
        });
    }

}

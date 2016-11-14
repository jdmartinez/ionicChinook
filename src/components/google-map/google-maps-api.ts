import { Geocoder } from './geocoder';
import { Injectable, ElementRef } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

export interface MapLocation {
    address: string;
    latitude: number;
    longitude: number;
}

@Injectable()
export class GoogleMapApi {

    private map: google.maps.Map;

    /**
     * Creates an instance of GoogleMapApi.
     *
     *
     * @memberOf GoogleMapApi
     */
    constructor() {
        this.map = Observable.create();
    }

    /**
     *
     *
     * @param {ElementRef} element
     * @param {google.maps.MapOptions} mapOptions
     * @returns {Observable<google.maps.Map>}
     *
     * @memberOf GoogleMapApi
     */
    createMap(element: ElementRef, mapOptions: google.maps.MapOptions): Observable<google.maps.Map> {
        return Observable.of(new google.maps.Map(element.nativeElement, mapOptions));
    }

    /**
     *
     *
     * @param {google.maps.MapOptions} mapOptions
     * @returns {Observable<void>}
     *
     * @memberOf GoogleMapApi
     */
    setOptions(mapOptions: google.maps.MapOptions): Observable<void> {
        return Observable.create(observer => {
            this.map.setOptions(mapOptions);
            observer.next();
        });
    }

    /**
     *
     *
     * @param {MapLocation} location
     *
     * @memberOf GoogleMapApi
     */
    setCenter(location: MapLocation) {
        if (location.address) {
            Geocoder.getLatLng(location.address).subscribe(latLng => {
                this.map.setCenter(latLng);
            });
        } else {
            this.map.setCenter(new google.maps.LatLng(location.latitude, location.longitude));
        }
    }

    /**
     *
     *
     * @param {google.maps.MarkerOptions} [options=<google.maps.MarkerOptions>{}]
     * @returns {Observable<google.maps.Marker>}
     *
     * @memberOf GoogleMapApi
     */
    createMarker(options: google.maps.MarkerOptions = <google.maps.MarkerOptions>{}): Observable<google.maps.Marker> {
        return Observable.create((observer: Observer<google.maps.Marker>) => {
            options.map = this.map;
            observer.next(new google.maps.Marker(options));
        });
    }

    /**
     *
     *
     * @param {google.maps.InfoWindowOptions} [options]
     * @returns {Observable<google.maps.InfoWindow>}
     *
     * @memberOf GoogleMapApi
     */
    createInfoWindow(options?: google.maps.InfoWindowOptions): Observable<google.maps.InfoWindow> {
        return Observable.of(new google.maps.InfoWindow(options));
    }

    /**
     *
     *
     * @template TEvent
     * @param {string} event
     * @returns {Observable<TEvent>}
     *
     * @memberOf GoogleMapApi
     */
    subscribeToEvent<TEvent>(event: string): Observable<TEvent> {
        return Observable.create((observer: Observer<TEvent>) => {
            this.map.addListener(event, (arg: TEvent) => {
                observer.next(arg);
            });
        });
    }

}

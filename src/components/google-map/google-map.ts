import { Geolocation } from 'ionic-native';
import { Component, ElementRef, Input, Output, EventEmitter, ViewChild, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConnectivityService } from './../../providers/connectivity-service';

import { GoogleMapApi } from './google-maps-api';
import { Geocoder } from './geocoder';

/**
 * Google Maps component
 *
 * @export
 * @class GoogleMap
 */
@Component({
  selector: 'google-map',
  templateUrl: 'google-map.html',
  providers: [ConnectivityService]
})
export class GoogleMap {
    @ViewChild("map") private mapElement: ElementRef;

    private DefaultZoomLevel = 16;
    private map: google.maps.Map;
    private googleMapApi: GoogleMapApi = new GoogleMapApi();
    private mapInitialized: boolean = false;

    /**
     * The longitude that defines the center of the map.
     *
     * @type {number}
     * @memberOf GoogleMap
     */
    @Input() longitude: number = 0;

    /**
     * The latitude that defines the center of the map.
     *
     * @type {number}
     * @memberOf GoogleMap
     */
    @Input() latitude: number = 0;

    /**
     * The address that defines the center of the map.
     *
     * @type {string}
     * @memberOf GoogleMap
     */
    @Input() address: string = "";

    /**
     * The zoom level of the map. Default value is 16.
     *
     * @type {number}
     * @memberOf GoogleMap
     */
    @Input() zoom: number = this.DefaultZoomLevel;

    /**
     * Event that fires when map is idle.
     *
     * @memberOf GoogleMap
     */
    @Output() onMapIdle = new EventEmitter();

    /**
     * Creates an instance of GoogleMap.
     *
     * @param {NavController} navCtrl
     * @param {ConnectivityService} connectivityService
     * @param {GoogleMapApi} googleMapApi
     *
     * @memberOf GoogleMap
     */
    constructor(public navCtrl: NavController,
                public connectivityService: ConnectivityService,
                private zone: NgZone) {

    }

    /**
     * Component initialization
     *
     * @memberOf GoogleMap
     */
    initMap() {
        Geolocation.getCurrentPosition().then((position) => {
            let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            let mapOpt: google.maps.MapOptions = {
                center: latLng,
                zoom: this.zoom,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            this.googleMapApi.createMap(this.mapElement, mapOpt).subscribe(map => {
                this.map = map;

                this.googleMapApi
                    .subscribeToEvent<void>("idle")
                    .subscribe(() => this.onMapIdle.emit());

                this.setInitialized(true);
            });
        });
    }

    /**
     *
     *
     *
     * @memberOf GoogleMap
     */
    loadGoogleMaps() {

    }

    /**
     *
     *
     * @private
     * @param {boolean} value
     *
     * @memberOf GoogleMap
     */
    private setInitialized(value: boolean) {
        this.mapInitialized = value;
    }


}

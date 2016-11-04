import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Customer } from './../../models/customer';
import { Geolocation } from 'ionic-native';

@Component({
  selector: 'page-customer-details',
  templateUrl: 'customer-details.html'
})
export class CustomerDetails {
  selectedItem: Customer;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = <Customer>navParams.get('customer');
  }

  ionViewDidLoad() {
      this.platform.ready().then(() => {
        Geolocation.getCurrentPosition().then(position => {
            this.getMap();
        }, err => console.log(err));
      });
  }

  getMap() {
    let location: google.maps.LatLng;
    let geocoder = new google.maps.Geocoder();

    geocoder.geocode({
        address: this.selectedItem.getFullAddress()
    }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
            console.log(results);
            location = results[0].geometry.location;

            let mapElement = document.getElementById("map");
            let map = new google.maps.Map(mapElement, {
                zoom: 16,
                center: location,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
            });

            let marker = new google.maps.Marker({
                position: location,
                map: map,
                title: this.selectedItem.getFullName()
            });

            let infoWindow = new google.maps.InfoWindow({
                content: `<h5>${this.selectedItem.getFullAddress()}</h5>`
            });

            marker.addListener("click", () => infoWindow.open(map, marker));

            google.maps.event.addListenerOnce(map, "idle", () => {
                google.maps.event.trigger(map, 'resize');
                mapElement.classList.add("show-map");
            });
        }
    });
  }

}

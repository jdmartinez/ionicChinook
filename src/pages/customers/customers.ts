import { CustomerProvider } from './../../providers/customer-provider';
import { Customer } from './../../models/customer';
import { Component, Input } from '@angular/core';
import { Geolocation } from 'ionic-native';

import { NavController } from 'ionic-angular';
import { GoogleMap } from '../../components/google-map/google-map'

@Component({
  selector: 'page-customers',
  templateUrl: 'customers-master-detail.html',
  entryComponents: [GoogleMap]
})
export class Customers {
  customers: Customer[];

  selected: Customer;

  constructor(public navCtrl: NavController, private customerProvider: CustomerProvider) {

      customerProvider
        .load()
        .subscribe(cs => {this.customers = cs});
  }

  showDetails(customer: Customer) {
    //this.navCtrl.push(CustomerDetails, {customer});
    this.selected = customer;

      Geolocation.getCurrentPosition().then(position => {
          this.getMap(customer);
      }, err => console.log(err));
  }

  getMap(customer: Customer) {
    let location: google.maps.LatLng;
    let geocoder = new google.maps.Geocoder();

    geocoder.geocode({
        address: customer.getFullAddress()
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
                title: customer.getFullName()
            });

            let infoWindow = new google.maps.InfoWindow({
                content: `<h5>${customer.getFullAddress()}</h5>`
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

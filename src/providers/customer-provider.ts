import { Customer } from './../models/customer';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

/*
  Generated class for the Customers provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CustomerProvider {

    data: Customer[];

    dataUri: String = "assets/data/customers.json";

    constructor(public http: Http) {

    }

    load(): Observable<Customer[]> {
        if (this.data) {
            return Observable.of(this.data);
        }

        return this.http.get(`${this.dataUri}`)
            .map(res => res.json())
            .map(data => data.map(item => new Customer().fromJson(item)));

    }

    loadDetails(id: Number): Observable<Customer> {
        return this.load()
            .map(data => <Customer>data.filter(c => c.id === id)[0]);
    }

}

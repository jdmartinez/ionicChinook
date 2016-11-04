import { CustomerProvider } from './../providers/customer-provider';
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Customers } from '../pages/customers/customers';
import { CustomerDetails } from '../pages/customer-details/customer-details';

import { GoogleMap } from '../components/google-map/google-map'

@NgModule({
  declarations: [
    MyApp,
    Customers,
    CustomerDetails,
    GoogleMap
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Customers,
    CustomerDetails,
    GoogleMap
  ],
  providers: [
    CustomerProvider
  ]
})
export class AppModule {}

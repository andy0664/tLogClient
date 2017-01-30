import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import {GeoLocation, GeoResult} from "../models/models";

/*
  Generated class for the Geocoder provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Geocoder {

  geoLocation:GeoLocation = new GeoLocation();
  provider:any;

  constructor(public http: Http) {
    console.log('Hello Geocoder Provider');
    this.provider = new OpenStreetMapProvider();
  }


  geocode = (location:string):Promise<Array<GeoResult>> =>
    this.provider.search({query:location})
      .then((res:Array<GeoResult>)=>res)
}

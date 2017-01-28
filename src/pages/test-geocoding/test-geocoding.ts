import { Component } from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import {GeoLocation, GeoResult} from "../../models/models";


/*
  Generated class for the TestGeocoding page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-test-geocoding',
  templateUrl: 'test-geocoding.html'
})
export class TestGeocodingPage {

  location:string;
  geoLocation:GeoLocation = new GeoLocation();
  test:GeoResult = new GeoResult();
  provider:any;

  constructor(public navCtrl: NavController,
              private alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    console.log('Hello TestGeocodingPage Page');
  }

  showAlert = (title: string, message: string) => this.alertCtrl.create({
    title: title,
    message: message,
    buttons: ['OK']
  }).present();


  search = ()=>{
    this.provider = new OpenStreetMapProvider();
    this.provider.search({query:this.location})
      .then((res:Array<GeoResult>)=>{console.log("Result: "+JSON.stringify(res[0]));this.createGeoLocation(res)})
      .catch(err=>console.log(err));
  }

  createGeoLocation=(res:Array<GeoResult>)=>{
    if(res.length===0){
      this.showAlert("INFO","Could not find any location with that name")
    }else{
      let geoResult:GeoResult=res[0];
      this.geoLocation.coordinates=[];
      this.geoLocation.coordinates[0]=Number.parseFloat(geoResult.x);
      this.geoLocation.coordinates[1]=Number.parseFloat(geoResult.y);
      this.geoLocation.label=geoResult.label;
      this.geoLocation.boundingbox=geoResult.raw.boundingbox;
      console.log("GeoLocation: "+JSON.stringify(this.geoLocation));
    }
  }

}

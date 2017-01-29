import {Component} from '@angular/core';
import {NavController, AlertController, LoadingController, Loading} from 'ionic-angular';
import {Tlog} from "../../providers/tlog";
import {SearchResult, GeoResult} from "../../models/models";
import {Serverconfig} from "../../providers/serverconfig";
import {TripPage} from "../trip/trip";
import {ShowUserPage} from "../show-user/show-user";
import {Geocoder} from "../../providers/geocoder";

/*
 Generated class for the Search page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  items: SearchResult[];
  searchType: string='users';
  searchValue: string;
  searchString: string;
  geoLocation:GeoResult;
  loader:Loading;

  constructor(public navCtrl: NavController,
              private tlog: Tlog,
              private alertCtrl: AlertController,
              private serverConfig: Serverconfig,
              private geocoder:Geocoder,
              private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('Hello SearchPage Page');
  }

  getItems = (ev: any) => {
      this.searchValue = ev.target.value;
      this.prepareSearchString();
  }

  resetItems = (type:string) => {this.items=[];this.searchType=type;this.prepareSearchString()}



  getLocationCoords = ()=>{
    this.geocoder.geocode(this.searchValue)
      .then((res:Array<GeoResult>) => this.prepareGeoLocation(res))
      .catch(err => {this.loader.dismiss();this.showAlert("Error", "Could not find the Location with that name")});
  }

  prepareGeoLocation=(res:Array<GeoResult>)=>{
    if(res.length===0){
      this.loader.dismiss();
      this.showAlert("INFO","Could not find any location with that name")
    }else{
      this.geoLocation=res[0];
      let startPoint = parseFloat(this.geoLocation.raw.boundingbox[0])+parseFloat(this.geoLocation.raw.boundingbox[2]);
      let endPoint = parseFloat(this.geoLocation.raw.boundingbox[1])+parseFloat(this.geoLocation.raw.boundingbox[3]);
      this.searchString = `${this.serverConfig.tripByLocationURI}?startPoint=${startPoint}&endPoint=${endPoint}`;
      this.search();
    }
  }

  prepareSearchString = () => {
    this.loader = this.loadingCtrl.create({
      content: "searching"
    });
    this.items = [];
    if (this.searchValue && this.searchValue.trim() != '') {
      switch(this.searchType){
        case 'trips':
          this.searchString = `${this.serverConfig.tripSearchURI}/${this.searchValue}`; this.search();break;
        case 'users':
          this.searchString = `${this.serverConfig.userSearchURI}/${this.searchValue}`;this.search();break;
        case 'locations':
          this.getLocationCoords();
      }
    }
  }

  search = ()=>{
    this.tlog.search(this.searchString)
      .then(res => {this.loader.dismiss();this.items = res})
      .catch(err => {this.loader.dismiss();this.showAlert("Error", "Search is not working right now")});
  }

  tripClicked = (tripID:string)=>{
    this.navCtrl.push(TripPage, {
      trip: tripID
    });
  }

  userClicked = (userID:string)=>{
    this.navCtrl.push(ShowUserPage, {
      user: userID
    });
  }

  showAlert = (title: string, message: string) => this.alertCtrl.create({
    title: title,
    message: message,
    buttons: ['OK']
  }).present();


}

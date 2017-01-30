import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {SearchResult, GeoResult} from "../../models/models";
import {Tlog} from "../../providers/tlog";
import {Geocoder} from "../../providers/geocoder";
import {TripPage} from "../trip/trip";

/*
 Generated class for the ListTopTrips page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-list-top-trips',
  templateUrl: 'list-top-trips.html'
})
export class ListTopTripsPage {

  filterLocation: string;
  filterDate: Date;
  defaultDate: Date = new Date('2000-01-01');
  defaultLocationCoord:number=0.0;
  startPoint:number;
  endPoint:number;
  trips:Array<SearchResult>=[];

  constructor(public navCtrl: NavController,
              private tLogService: Tlog,
              private alertCtrl: AlertController,
              private geocoder:Geocoder) {
  }

  ionViewDidLoad() {
    console.log('Hello ListTopTripsPage Page');
  }

  showAlert = (title:string,message:string) =>
    this.alertCtrl.create({title: title, message: message, buttons: ['OK']}).present();

  ngOnInit(): void {
    this.topTenRequest(this.defaultDate,this.defaultLocationCoord,this.defaultLocationCoord);
  }


  filter = ()=>{
    let dateValue=this.filterDate;
    if(this.filterDate===undefined)
      dateValue=this.defaultDate;
    if (this.filterLocation && this.filterLocation.trim() != ''){
      this.geocoder.geocode(this.filterLocation)
        .then((res:Array<GeoResult>) =>{this.prepareGeoLocation(res,dateValue)})
    }else{
      this.topTenRequest(dateValue,this.defaultLocationCoord,this.defaultLocationCoord);
    }
  }

  prepareGeoLocation=(res:Array<GeoResult>,dateValue:Date)=>{
    if(res.length===0){
      this.showAlert("INFO","No results for that location")
    }else{
      let geoLocation=res[0];
      this.startPoint = parseFloat(geoLocation.raw.boundingbox[0])+parseFloat(geoLocation.raw.boundingbox[2]);
      this.endPoint = parseFloat(geoLocation.raw.boundingbox[1])+parseFloat(geoLocation.raw.boundingbox[3]);
      this.topTenRequest(dateValue,this.startPoint,this.endPoint)
    }
  }

  topTenRequest = (dateValue:Date,startPointVal:number,endPointVal:number)=>{
    this.tLogService.getTopTenTrips(dateValue,startPointVal,endPointVal)
      .then(res=>this.trips=res)
      .catch(err => this.showAlert("ERROR",`Could not load top 10 ${err.json().message}`))
  }

  tripClicked = (tripID:string)=>{
    this.navCtrl.push(TripPage, {
      trip: tripID
    });
  }
}

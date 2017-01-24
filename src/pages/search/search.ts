import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {Tlog} from "../../providers/tlog";
import {SearchResult} from "../../models/models";
import {Serverconfig} from "../../providers/serverconfig";
import {TripPage} from "../trip/trip";
import {ShowUserPage} from "../show-user/show-user";

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

  constructor(public navCtrl: NavController, private tlog: Tlog, private alertCtrl: AlertController, private serverConfig: Serverconfig) {
  }

  ionViewDidLoad() {
    console.log('Hello SearchPage Page');
  }

  getItems = (ev: any) => {
    this.searchValue = ev.target.value;
    this.searchString = this.serverConfig.userSearchURI;
    this.search();
  }

  resetItems = (type:string) => {this.searchType=type;this.search()}

  search = () => {
    this.items = [];
    if (this.searchValue && this.searchValue.trim() != '') {
      this.searchString = this.serverConfig.userSearchURI;
      if (this.searchType === 'trips') {
        this.searchString = this.serverConfig.tripSearchURI;
      }
      this.tlog.search(this.searchString, this.searchValue)
        .then(res => this.items = res)
        .catch(err => this.showAlert("Error", "Search is not working right now"));
    }
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

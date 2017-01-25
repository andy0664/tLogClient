import { Component } from '@angular/core';

import {NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';

import {Security} from '../../providers/security';
import {LoginPage} from "../login/login";
import {Trip, ReceiveFriendRequest} from "../../models/models";
import {Tlog} from "../../providers/tlog";
import {AddTripPage} from "../add-trip/add-trip";
import {TripPage} from "../trip/trip";
import {FriendRequestNotificationPage} from "../friend-request-notification/friend-request-notification";



@Component({
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<Trip>;
  newFriendRequests:ReceiveFriendRequest[]=[];


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private security: Security,
              private tLogService: Tlog,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.items = [];

  }

  addTrip = () => this.navCtrl.push(AddTripPage)

  showAlert = (title: string, message: string) => this.alertCtrl.create({
    title: title,
    message: message,
    buttons: ['OK']
  }).present();

  loadTrips = () => {
    const loading = this.loadingCtrl.create({
      content: "Fetching your trips"
    });
    loading.present()
      .then(this.tLogService.getTrips)
      .then(trips => this.items = trips).then(() => {
      loading.dismiss();
      if (this.items.length === 0) {
        this.showAlert("INFO", "You do not have any trips yet. Press the Plus Icon to create one.")
      }
    })
      .catch(err => {
        loading.dismiss();
        this.showAlert("Error", `Could not retrieve list of trips: ${err.message || err}`);
      });
  }

  checkNotifications = ()=>{
    this.tLogService.openFriendRequest()
      .then(res=>this.newFriendRequests=res)
      .catch(err => {
        this.showAlert("Error", `Could not check for new notifications: ${err.message || err}`);
      });
  }

  ionViewWillEnter = () => {
    this.security.isNotloggedIn().then(exp => {
      if (exp) this.navCtrl.setRoot(LoginPage); else{
        this.loadTrips();
        this.checkNotifications();
      }
    });
  }

  itemTapped(event, tripID) {
    this.navCtrl.push(TripPage, {
      trip: tripID
    });
  }

  showFriendRequests = ()=>{
    console.log("Open Requests: "+this.newFriendRequests.length);
    this.navCtrl.push(FriendRequestNotificationPage, {
      friendRequests: this.newFriendRequests
    });
  }
}

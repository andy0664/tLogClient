import {Component} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {ReceiveFriendRequest, Notification} from "../../models/models";
import {Security} from "../../providers/security";
import {Tlog} from "../../providers/tlog";
import {TripPage} from "../trip/trip";

/*
 Generated class for the FriendRequestNotification page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-friend-request-notification',
  templateUrl: 'friend-request-notification.html'
})
export class FriendRequestNotificationPage {

  friendRequests: ReceiveFriendRequest[] = [];
  notifications: Notification[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private tlog: Tlog,
              private alertCtrl: AlertController,
              private security: Security) {
  }

  ionViewWillEnter() {
    this.updateFriendRequest();
    this.updateNotifications();
  }

  showAlert = (title: string, message: string) => this.alertCtrl.create({
    title: title,
    message: message,
    buttons: ['OK']
  }).present();

  accept = (userID: string) => {
    this.tlog.acceptFriendRequest(userID)
      .then(() => this.updateFriendRequest())
      .catch(err => this.showAlert("Error", `Could not send request: ${err.message || err}`))
  }

  reject = (userID: string) => {
    this.tlog.rejectFriendRequest(userID)
      .then(() => this.updateFriendRequest())
      .catch(err => this.showAlert("Error", `Could not send request: ${err.message || err}`))
  }

  updateFriendRequest = () => {
    this.tlog.openFriendRequest()
      .then((res) => this.friendRequests = res)
      .catch(err => this.showAlert("Error", `Problem to update friend requests: ${err.message || err}`))
  }

  updateNotifications = () => {
    this.tlog.getNotifications()
      .then((res) => this.notifications = res)
      .catch(err => this.showAlert("Error", `Problem to update notifications: ${err.message || err}`))
  }

  displayTrip = (tripID: string, notificationID: string) => {
    console.log("show trip");
    this.tlog.readNotification(notificationID)
      .then(res => this.navCtrl.push(TripPage, {
        trip: tripID
      }))
      .catch(err => this.showAlert("Error", `There seems to be a problem: ${err.message || err}`))
  }

  removeNotification = (notificationID:string)=>{
    this.tlog.readNotification(notificationID)
      .then(res => this.notifications = this.notifications.filter(notification=>notification._id!==notificationID))
      .catch(err => this.showAlert("Error", `There seems to be a problem: ${err.message || err}`));
  }

}

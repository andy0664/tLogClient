import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello FriendRequestNotificationPage Page');
  }

}

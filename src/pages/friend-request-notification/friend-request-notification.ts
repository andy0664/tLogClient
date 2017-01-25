import { Component } from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {ReceiveFriendRequest} from "../../models/models";
import {Security} from "../../providers/security";
import {Tlog} from "../../providers/tlog";

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

  friendRequests:ReceiveFriendRequest[]=[];

  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  private tlog: Tlog,
  private alertCtrl: AlertController,
  private security:Security) {}

  ionViewDidLoad() {
    console.log('Hello FriendRequestNotificationPage Page');
    this.friendRequests=this.navParams.get("friendRequests");
  }

  showAlert = (title: string, message: string) => this.alertCtrl.create({
    title: title,
    message: message,
    buttons: ['OK']
  }).present();

  accept = (userID:string)=>{
    this.tlog.acceptFriendRequest(userID)
      .then(()=>this.removeRequest())
      .catch(err=>this.showAlert("Error", `Could not send request: ${err.message || err}`))
  }

  reject = (userID:string)=>{
    this.tlog.rejectFriendRequest(userID)
      .then(()=>this.removeRequest())
      .catch(err=>this.showAlert("Error", `Could not send request: ${err.message || err}`))
  }

  removeRequest = ()=>{
    this.tlog.openFriendRequest()
      .then((res)=>this.friendRequests=res)
      .catch(err=>this.showAlert("Error", `Problem to update friend requests: ${err.message || err}`))
  }

}

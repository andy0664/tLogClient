import {Component} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {Tlog} from "../../providers/tlog";
import {User, FriendRequest} from "../../models/models";
import {Security} from "../../providers/security";
import {SafeUrl, DomSanitizer} from "@angular/platform-browser";
import {TripPage} from "../trip/trip";

/*
 Generated class for the ShowUser page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-show-user',
  templateUrl: 'show-user.html'
})
export class ShowUserPage {

  user: User = new User();
  count: number;
  url: SafeUrl;
  userID:string;
  ownProfile:boolean=false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private tlog: Tlog,
              private alertCtrl: AlertController,
              private sanitizer: DomSanitizer,
              private security: Security) {
  }

  ngOnInit(): void {
    console.log('Hello ShowUser Page to show: ' + this.navParams.get("user"));
    this.userID=this.navParams.get("user");
    this.initUser();
    this.url = this.navParams.get("url");
  }

  initUser = ()=>{
    this.tlog.loadOtherUser(this.userID)
      .then(user => {
        this.user = user;
        this.security.getUser()
          .then(storedUser => {
            if(this.userID===storedUser.id)
              this.ownProfile=true;})
      })
      .catch(err => this.showAlert("Error", "Could not load the specific user"));
    this.tlog.checkFriend(this.userID)
      .then(res => this.count=res)
      .catch(err => this.showAlert("ERROR",`Problem checking if already a friend ${err.json().message}`))
  }

  showAlert = (title: string, message: string) => this.alertCtrl.create({
    title: title,
    message: message,
    buttons: ['OK']
  }).present();

  friendAction = () => {
    if(this.count===0){
      this.friendRequest();
    }else{
      this.removeFriend();
    }
  }

  friendRequest = () =>{
    console.log("Send Friend request");
    let friendRequest = new FriendRequest();
    friendRequest.userTo=this.userID;
    this.security.getUser()
      .then(user =>  {friendRequest.userFrom=user.id;
        this.tlog.sendFriendRequest(friendRequest)
          .then(res => {this.count=1;
            this.tlog.presentToast("Request has been send.");
          })})
      .catch(err => this.showAlert("ERROR",`Couldn't send request ${err.json().message}`))
  }


  removeFriend = () =>{
    this.tlog.removeFriend(this.userID)
      .then(res => {
        this.initUser();
        this.tlog.presentToast("User has been removed.");
      })
      .catch(err => this.showAlert("ERROR",`Couldn't remove friend ${err.json().message}`))
  }

  showTrip = (tripID:string)=>{
    this.navCtrl.push(TripPage, {
      trip: tripID
    });
  }

  showFriend = (friendID:string,url:SafeUrl)=>{
    console.log("Show Friend");
    this.userID=friendID;
    this.url = url;
    this.initUser();
  }




}

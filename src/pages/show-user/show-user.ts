import {Component} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {Tlog} from "../../providers/tlog";
import {User, FriendRequest} from "../../models/models";
import {Security} from "../../providers/security";

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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private tlog: Tlog,
              private alertCtrl: AlertController,
              private security: Security) {
  }

  ngOnInit(): void {
    console.log('Hello ShowUser Page to show: ' + this.navParams.get("user"));
    this.initUser();
  }

  initUser = ()=>{
    this.tlog.loadOtherUser(this.navParams.get("user"))
      .then(user => {
        this.user = user;
        console.log(this.user)
      })
      .catch(err => this.showAlert("Error", "Could not load the specific user"));
    this.tlog.checkFriend(this.navParams.get("user"))
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
    friendRequest.userTo=this.navParams.get("user")
    this.security.getUser()
      .then(user =>  {friendRequest.userFrom=user.id;
        this.tlog.sendFriendRequest(friendRequest)
          .then(res => {this.count=1;
            this.tlog.presentToast("Request has been send");
          })})
      .catch(err => this.showAlert("ERROR",`Couldn't send request ${err.json().message}`))
  }


  removeFriend = () =>{
    this.tlog.removeFriend(this.navParams.get("user"))
      .then(res => this.initUser())
      .catch(err => this.showAlert("ERROR",`Couldn't remove friend ${err.json().message}`))
  }




}

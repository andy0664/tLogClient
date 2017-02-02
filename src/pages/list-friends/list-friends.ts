import { Component } from '@angular/core';
import {NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import {Security} from "../../providers/security";
import {Tlog} from "../../providers/tlog";
import {Friend, ProfileUser} from "../../models/models";
import {ShowUserPage} from "../show-user/show-user";
import {SafeUrl, DomSanitizer} from "@angular/platform-browser";

/*
  Generated class for the ListFriends page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-list-friends',
  templateUrl: 'list-friends.html'
})
export class ListFriendsPage {

  friends:Friend[]=[]
  images: SafeUrl[];
  profileimage:SafeUrl;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private security: Security,
              private tLogService: Tlog,
              private alertCtrl: AlertController,
              private sanitizer: DomSanitizer,
              private tlog: Tlog,
              private loadingCtrl: LoadingController) {}

  ionViewDidLoad() {
    console.log('Hello ListFriendsPage Page');
    this.security.getUser()
      .then(user =>this.tLogService.getUserFriends(user.id)
        .then(friends=>{
          this.friends=friends;
          for(let friend of this.friends){
            this.tlog.getUser(friend._id)
              .then(user=>{
                console.log(JSON.stringify(user))
                //friend.image = user.images[0]

                Promise.all(user.images.map((image) => {
                  console.log(image.id);
                  this.tlog.getImageURL(image.id)
                    .then((url=>{
                      friend.url = this.sanitizer.bypassSecurityTrustUrl(url)
                    }))
                }))
              });

          }
        }))
      .catch(err => this.showAlert("ERROR",`Couldn't send request ${err.json().message}`))
  }

  showAlert = (title: string, message: string) => this.alertCtrl.create({
    title: title,
    message: message,
    buttons: ['OK']
  }).present();


  userClicked = (userID:string, url:SafeUrl)=>{
    this.navCtrl.push(ShowUserPage, {
      user: userID,
      url: url
    });
  }

}

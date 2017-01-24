import { Component } from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {Tlog} from "../../providers/tlog";
import {User} from "../../models/models";

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

  user:User=new User();

  constructor(public navCtrl: NavController, public navParams: NavParams, private tlog: Tlog,private alertCtrl: AlertController) {
  }

  ngOnInit(): void {
    console.log('Hello ShowUser Page to show: ' + this.navParams.get("user"));
    this.tlog.loadOtherUser(this.navParams.get("user"))
      .then(user => {this.user = user;console.log(this.user)})
      .catch(err=>this.showAlert("Error","Could not load the specific user"));
  }

  showAlert = (title: string, message: string) => this.alertCtrl.create({
    title: title,
    message: message,
    buttons: ['OK']
  }).present();


}

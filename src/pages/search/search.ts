import { Component } from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {Tlog} from "../../providers/tlog";
import {User} from "../../models/models";

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

  items:User[];

  constructor(public navCtrl: NavController, private tlog:Tlog, private alertCtrl:AlertController) {}

  ionViewDidLoad() {
    console.log('Hello SearchPage Page');
  }

  getItems =(ev:any)=>{
    let searchValue = ev.target.value;
    if (searchValue && searchValue.trim() != ''){
      this.tlog.searchUser(searchValue)
        .then(res => this.items=res)
        .catch(err=>this.showAlert("Error","Search is not working right now"));
    }
  }



  showAlert = (title: string, message: string) => this.alertCtrl.create({
    title: title,
    message: message,
    buttons: ['OK']
  }).present();


}

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello ListFriendsPage Page');
  }

}

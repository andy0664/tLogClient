import { Component } from '@angular/core';
import {NavController, AlertController, LoadingController, NavParams} from 'ionic-angular';
import {Tlog} from "../../providers/tlog";
import {AddCommentPage} from "../add-comment/add-comment";
import {Comment} from "../../models/models";

/*
  Generated class for the ShowComments page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-show-comments',
  templateUrl: 'show-comments.html'
})
export class ShowCommentsPage {

  comments:Array<Comment>=[];
  tripID:string;
  creator:string;

  constructor(public navCtrl: NavController,private alertCtrl: AlertController,
              public navParams: NavParams,
              private loadingCtrl: LoadingController,
              private tlog: Tlog) {}

  showAlert = (title: string, message: string) => this.alertCtrl.create({
    title: title,
    message: message,
    buttons: ['OK']
  }).present();


  ionViewWillEnter(){
    const loading = this.loadingCtrl.create({
      content: "Fetching comments"
    });
    this.creator = this.navParams.get("creator");
    console.log("Creator: "+ this.creator)
    this.tripID=this.navParams.get("tripID");
    this.tlog.loadTripComments(this.tripID)
      .then(res=>{
        loading.dismiss();
        this.comments=res;
      })
      .catch(err => {
        loading.dismiss(); this.showAlert("INFO","Could not load comments.");
      })
  }


  newComment = ()=>{
    this.navCtrl.push(AddCommentPage, {
      tripID: this.tripID
    });
  }



}

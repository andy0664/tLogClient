import { Component } from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {Tlog} from "../../providers/tlog";
import {User, SearchResult} from "../../models/models";
import {Serverconfig} from "../../providers/serverconfig";

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

  items:SearchResult[];
  searchType:String;

  constructor(public navCtrl: NavController, private tlog:Tlog, private alertCtrl:AlertController,private serverConfig:Serverconfig) {}

  ionViewDidLoad() {
    console.log('Hello SearchPage Page');
  }

  getItems =(ev:any)=>{
    console.log("SearchType="+this.searchType)
    let searchValue = ev.target.value;
    let searchString = this.serverConfig.userSearchURI;
    if (searchValue && searchValue.trim() != ''){
      if(this.searchType==='trips'){
        searchString=this.serverConfig.tripSearchURI;
      }
      this.tlog.search(searchString,searchValue)
        .then(res => this.items=res)
        .catch(err=>this.showAlert("Error","Search is not working right now"));
    }else{
      this.items=[];
    }
  }

  showAlert = (title: string, message: string) => this.alertCtrl.create({
    title: title,
    message: message,
    buttons: ['OK']
  }).present();


}

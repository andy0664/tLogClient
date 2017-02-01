import {Component} from '@angular/core';
import {NavController, AlertController, NavParams, LoadingController} from 'ionic-angular';
import {Camera, Transfer, CameraOptions} from "ionic-native";
import {Serverconfig} from "../../providers/serverconfig";
import {Security} from "../../providers/security";
import {ProfileUser} from "../../models/models";

/*
 Generated class for the AddImage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-add-user-image',
  templateUrl: 'add-user-image.html'
})
export class AddUserImagePage {

  constructor(public navCtrl: NavController,
              private alertCtrl: AlertController,
              private navParams: NavParams,
              private security: Security,
              private loading: LoadingController,
              private  serverconfig: Serverconfig) {
  }

  showAlert = (title: string, message: string) => this.alertCtrl.create({
    title: title,
    message: message,
    buttons: ['OK']
  }).present();

  user: ProfileUser;
  image: any = null;

  mode: string;

  description: string;

  takePhotoOptions = {
    destinationType: Camera.DestinationType.FILE_URI
  };

  selectPhotoOptions = {
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: Camera.DestinationType.FILE_URI
  };

  upload = () => {
    let loader = this.loading.create({content: "Uploading Image to TLog-Server"});
    loader.present();
    this.security.getToken()
      .then(token =>
        new Transfer().upload(this.image,
          `${this.serverconfig.userURI}/${this.user._id}/image`,
          {params: {description: this.description}, headers: {authorization: `Bearer ${token}`}}))
      .then(() => {loader.dismiss();this.navCtrl.pop()})
      .catch(err => {loader.dismiss();this.showAlert("ERROR", `Could not upload image (${err.body})`)});
  };



  getPicture = (option:CameraOptions) => () => {
    Camera.getPicture(option).then(imageURI => {
      this.image = imageURI;
    })
      .catch(err => {
        this.showAlert("ERROR", `Could not take picture (${err})`)
      });
  };

  takePhoto = this.getPicture(this.takePhotoOptions);

  selectPicture = this.getPicture(this.selectPhotoOptions);

  ngOnInit() {
    this.user = this.navParams.get("user");
    console.log(JSON.stringify(this.user))
  }

}

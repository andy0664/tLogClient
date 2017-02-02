import { Component } from '@angular/core';
import {NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import {ProfileUser} from "../../models/models";
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {Security} from "../../providers/security";
import {Tlog} from "../../providers/tlog";
import {Serverconfig} from "../../providers/serverconfig";
import {ListPage} from "../list/list";
import {AddUserImagePage} from "../add-user-image/add-user-image";
import {SafeUrl, DomSanitizer} from "@angular/platform-browser";

/*
 Generated class for the Userprofile page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-userprofile',
  templateUrl: 'userprofile.html'
})
export class UserProfile {

  private EMAIL_REGEXP = "^[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?)*$";

  userForm: FormGroup;
  user: ProfileUser = new ProfileUser();

  images: SafeUrl[];


  constructor(public navCtrl: NavController,
              private fb:FormBuilder,
              private security: Security,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private loading: LoadingController,
              private serverconfig: Serverconfig,
              private sanitizer: DomSanitizer,
              private tlog: Tlog) {}

  onSubmit() {

  }

  ionViewWillEnter() {
  }



  buildForm(): void {
    this.user.local={password:"",username:"",email:""};
    this.userForm = this.fb.group({
      'username': [this.user.local.username,[Validators.required,Validators.maxLength(16),Validators.minLength(3)]],
      'email': [this.user.local.email,[Validators.required,Validators.minLength(5),Validators.maxLength(256),Validators.pattern(this.EMAIL_REGEXP)]]
      //'password': [this.user.password,[Validators.required,Validators.minLength(8),Validators.maxLength(128)]]
    });
  }

  ngOnInit(): void {
    this.buildForm();
    this.userForm.valueChanges
      .subscribe(data => this.onValueChanged(data))
    this.security.getUser().then(user=>this.tlog.getUser(user.id)
      .then(user=>{
        this.user=user;
        this.getImages();
      }))
      .catch(err=>this.showAlert("Error","Could not change the the user"));


  }


  getImages = () =>  Promise.all(this.user.images.map((image) => this.tlog.getImageURL(image.id)
    .then((url=>this.sanitizer.bypassSecurityTrustUrl(url)))))
    .then(urls => urls.forEach((url,i)=>this.user.images[i].url=url));


  onValueChanged(data?: any){
    if (!this.userForm) return;
    const form = this.userForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  showAlert = (title: string, message: string) => this.alertCtrl.create({
    title: title,
    message: message,
    buttons: ['OK']
  }).present();


  change() {
    this.user.local.username = this.userForm.value.username;
    this.user.local.email = this.userForm.value.email;
    this.tlog.updateUser(this.user._id, this.user)
      .then(res=>{this.user=res; this.navCtrl.setRoot(ListPage)})
      .catch(err=>this.showAlert("Error","Could not change the user"));
  }

  addImage = () => this.navCtrl.push(AddUserImagePage, {user: this.user, userID: this.user._id});


  validationMessages = {
    'username': {
      'required': 'You need to enter a username',
      'minlength': "Your username has to have at least 3 characters",
      'maxlength': "Your username must not be longer than 16 characters"
    },
    'email': {
      'required': 'You need to enter an email',
      'minlength': "Your email has to have at least 5 characters",
      'maxlength': "Your email must not be longer than 256 characters",
      'pattern': "You have to enter a valid email"
    }
  };

  formErrors = {
    'username':'',
    'email':''
  };

}

import { Component } from '@angular/core';
import {NavController, AlertController, NavParams} from 'ionic-angular';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Tlog} from "../../providers/tlog";
import {NewComment} from "../../models/models";

/*
  Generated class for the AddComment page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-comment',
  templateUrl: 'add-comment.html'
})
export class AddCommentPage {

  commentForm: FormGroup;
  comment:NewComment = new NewComment();
  tripID:string;

  constructor(public navCtrl: NavController,
              private fb: FormBuilder,
              private tLogService: Tlog,
              private alertCtrl: AlertController,
              private navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('Hello AddCommentPage Page');
  }

  buildForm = (): void => {
    this.commentForm = this.fb.group({
      'comment': [this.comment.comment, [Validators.required, Validators.maxLength(500), Validators.minLength(3)]]
    });
  };

  showAlert = (title: string, message: string) => this.alertCtrl.create({
    title: title,
    message: message,
    buttons: ['OK']
  }).present();

  validationMessages = {
    'comment': {
      'required': 'You need to enter a comment',
      'maxlength': "Must not exceed 500 characters",
      'minlength': "Mimimum length 3 characters"
    }
  };

  onSubmit = () => {
    console.log("Submitted POI Form!!")
  };

  ngOnInit(): void {
    this.buildForm();
    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged = (data?: any) => {
    if (!this.commentForm) return;
    const form = this.commentForm;
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
  };

  formErrors = {
    'comment': ''
  };

  save =() =>{
    const comment = this.commentForm.value;
    comment.trip=this.navParams.get("tripID");
    this.tLogService.addComment(comment)
      .then(()=>this.navCtrl.pop())
      .catch(err=>this.showAlert("Error",`There seems to be a problem ${err.message || err}`));
  }

}

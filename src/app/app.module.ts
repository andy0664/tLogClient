import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import {Security} from "../providers/security";
import {LoginPage} from "../pages/login/login";
import {ReactiveFormsModule} from "@angular/forms";
import {RegisterPage} from "../pages/register/register";
import {Storage} from '@ionic/storage';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http } from '@angular/http';
import {Serverconfig} from "../providers/serverconfig";
import {Tlog} from "../providers/tlog";
import {AddTripPage} from "../pages/add-trip/add-trip";
import {TripPage} from "../pages/trip/trip";
import {AddPoiPage} from "../pages/add-poi/add-poi";
import {ShowPoiPage} from "../pages/show-poi/show-poi";
import {AddImagePage} from "../pages/add-image/add-image";
import {SearchPage} from "../pages/search/search";
import {ListFriendsPage} from "../pages/list-friends/list-friends";
import {ShowUserPage} from "../pages/show-user/show-user";
import {FriendRequestNotificationPage} from "../pages/friend-request-notification/friend-request-notification";
import {ShowCommentsPage} from "../pages/show-comments/show-comments";
import {AddCommentPage} from "../pages/add-comment/add-comment";
import {TestGeocodingPage} from "../pages/test-geocoding/test-geocoding";
import {Geocoder} from "../providers/geocoder";
import {ListTopTripsPage} from "../pages/list-top-trips/list-top-trips";
import {UserProfile} from "../pages/userprofile/userprofile";



let storage = new Storage();

export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    headerPrefix: '',
    noJwtError: true,
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => storage.get('id_token')),
  }), http);
}

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    LoginPage,
    RegisterPage,
    AddTripPage,
    TripPage,
    AddPoiPage,
    ShowPoiPage,
    AddImagePage,
    SearchPage,
    ListFriendsPage,
    ShowUserPage,
    FriendRequestNotificationPage,
    ShowCommentsPage,
    AddCommentPage,
    TestGeocodingPage,
    ListTopTripsPage,
    UserProfile
  ],
  imports: [
    IonicModule.forRoot(MyApp), ReactiveFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    LoginPage,
    RegisterPage,
    AddTripPage,
    TripPage,
    AddPoiPage,
    ShowPoiPage,
    AddImagePage,
    SearchPage,
    ListFriendsPage,
    ShowUserPage,
    FriendRequestNotificationPage,
    ShowCommentsPage,
    AddCommentPage,
    TestGeocodingPage,
    ListTopTripsPage,
    UserProfile
  ],
  providers: [Security,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    },
    Serverconfig,
    Tlog,
    Geocoder
  ]
})
export class AppModule {}

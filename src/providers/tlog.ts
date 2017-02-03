import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AuthHttp} from "angular2-jwt";
import {Promise} from "es6-promise";
import {Serverconfig} from "./serverconfig";
import {
  Trip, POI, User, SearchResult, FriendRequest, ReceiveFriendRequest, Friend, Comment,
  NewComment, TopTenTripResult, ProfileUser, Notification
} from '../models/models';
import {Security} from "./security";
import { ToastController } from 'ionic-angular';


/*
 Generated class for the Tlog provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class Tlog {

  constructor(private authHttp: AuthHttp,
              private serverconfig: Serverconfig,
              private security: Security,
              public toastCtrl: ToastController) {

  }

  getTrips = (): Promise<Array<Trip>> => this.authHttp.get(this.serverconfig.mineURI).toPromise().then((res) => res.json());


  addTrip = (trip: Trip): Promise<Trip> =>
    this.authHttp.post(this.serverconfig.tripURI, trip).toPromise()
      .then(res => res.json());

  loadTrip = (tripID: string): Promise<Trip> =>
    this.authHttp.get(`${this.serverconfig.tripURI}/${tripID}`)
      .toPromise().then(res => res.json());

  addPOI = (tripID: string, poi: POI): Promise<POI> =>
    this.authHttp.post(`${this.serverconfig.tripURI}/addpoi/${tripID}`, poi)
      .toPromise().then(res => res.json());


  updatePOI = (tripID: string, poi: POI): Promise<POI> =>
    this.authHttp.patch(`${this.serverconfig.poiURI}/${poi._id}`, poi)
      .toPromise().then(res => {
      console.log("GOT UPDATE RESPONSE: " + res.json());
      return res.json()
    });

  updateTrip = (tripID: string, trip: Trip): Promise<Trip> =>
    this.authHttp.patch(`${this.serverconfig.tripURI}/${trip._id}`, trip)
      .toPromise().then(res => {
      console.log("GOT UPDATE RESPONSE: " + res.json());
      return res.json()
    });

  loadOtherUser = (userID: string): Promise<User> =>
    this.authHttp.get(`${this.serverconfig.userOtherURI}/${userID}`)
      .toPromise().then(res => res.json());

  sendFriendRequest = (friendRequest: FriendRequest): Promise<boolean> =>
    this.authHttp.post(`${this.serverconfig.friendRequestURI}`, friendRequest)
      .toPromise().then(res => true);

  checkFriend = (userID: string): Promise<number> =>
    this.authHttp.get(`${this.serverconfig.checkFriendURI}/${userID}`)
      .toPromise().then(res => res.json());

  openFriendRequest = (): Promise<Array<ReceiveFriendRequest>> =>
    this.authHttp.get(this.serverconfig.openFriendRequest)
      .toPromise().then(res => res.json());

  removeFriend = (userID: string): Promise<number> =>
    this.authHttp.get(`${this.serverconfig.removeFriendURI}/${userID}`)
      .toPromise().then(res => res.json());

  acceptFriendRequest = (userID: string): Promise<boolean> =>
    this.authHttp.get(`${this.serverconfig.acceptFriendRequest}/${userID}`)
      .toPromise().then(res => true);

  rejectFriendRequest = (userID: string): Promise<boolean> =>
    this.authHttp.get(`${this.serverconfig.rejectFriendRequest}/${userID}`)
      .toPromise().then(res => true);


  getUserFriends = (userID: string): Promise<Array<Friend>> =>
    this.authHttp.get(`${this.serverconfig.userFriendURI}/${userID}`)
      .toPromise().then(res => res.json());

  getNotifications = (): Promise<Array<Notification>> =>
    this.authHttp.get(this.serverconfig.checkNotificationURI)
      .toPromise().then(res => res.json());

  readNotification = (notificationID:string): Promise<Array<Notification>> =>
    this.authHttp.get(`${this.serverconfig.readNotificationURI}/${notificationID}`)
      .toPromise().then(res => res.json());


  search = (searchString: string): Promise<Array<SearchResult>> =>
    this.authHttp.get(searchString)
      .toPromise().then(res => {
      console.log("GOT UPDATE RESPONSE: " + res.json());
      return res.json()
    });


  likeTrip = (tripID: string): Promise<boolean> =>
    this.authHttp.get(`${this.serverconfig.likeTripURI}/${tripID}`)
      .toPromise().then(res => true);

  unlikeTrip = (tripID: string): Promise<boolean> =>
    this.authHttp.get(`${this.serverconfig.unlikeTripURI}/${tripID}`)
      .toPromise().then(res => true);

  checkLikeTrip = (tripID: string): Promise<number> =>
    this.authHttp.get(`${this.serverconfig.checkLikeTripURI}/${tripID}`)
      .toPromise().then(res => res.json());

  loadTripComments = (tripID: string): Promise<Array<Comment>> =>
    this.authHttp.get(`${this.serverconfig.commentsURI}/${tripID}`)
      .toPromise().then(res => res.json());

  addComment = (comment: NewComment): Promise<Comment> =>
    this.authHttp.post(`${this.serverconfig.addCommentURI}`, comment)
      .toPromise().then(res => res.json());

  getTopTenTrips = (dateFilter: Date, startPoint: number, endPoint: number): Promise<Array<TopTenTripResult>> =>
    this.authHttp.get(`${this.serverconfig.topTenTripURI}?startPoint=${startPoint}&endPoint=${endPoint}&dateFilter=${dateFilter}`)
      .toPromise().then(res => res.json());

  getImage = (imageId: string) =>
    this.authHttp.get(`${this.serverconfig.poiURI}/image/${imageId}`).toPromise();


  getUser = (userID: string): Promise<ProfileUser> =>
    this.authHttp.get(`${this.serverconfig.userURI}/${userID}`).toPromise()
      .then(res => res.json());


  updateUser = (userID: string, user: ProfileUser): Promise<ProfileUser> =>
    this.authHttp.patch(`${this.serverconfig.userURI}/${user._id}`, user)
      .toPromise().then(res => res.json());


  removePoi = (poiID:string): Promise<boolean> =>
    this.authHttp.delete(`${this.serverconfig.removePoiURI}/${poiID}`)
      .toPromise().then(res => true);

  removeTrip = (tripID: string): Promise<boolean> =>
    this.authHttp.delete(`${this.serverconfig.removeTripURI}/${tripID}`)
      .toPromise().then(res => true);


  presentToast(msg:string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }


  getImageURL = (imageId: string): Promise<string> => new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    this.security.getToken()
      .then(token => {
        xhr.open("GET", `${this.serverconfig.poiURI}/image/${imageId}`);
        xhr.setRequestHeader("authorization", `Bearer ${token}`);
        xhr.responseType = "arraybuffer";

        xhr.onload = function (e) {
          // Obtain a blob: URL for the image data.
          let arrayBufferView = new Uint8Array(this.response);
          let blob = new Blob([arrayBufferView], {type: "image/jpeg"});
          let urlCreator = window.URL || (window as any).webkitURL;
          let imageUrl = urlCreator.createObjectURL(blob);
          resolve(imageUrl);
        };

        xhr.send();
      });
  });



}

import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the Serverconfig provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Serverconfig {

  private _host = "http://10.0.0.2:3000/api";
  private _loginURI = `${this._host}/auth/login`;
  private _logoutURI = `${this._host}/auth/logout`;
  private _registerURI = `${this._host}/auth/signup`;
  private _mineURI = `${this._host}/trip/mine`;
  private _tripURI = `${this._host}/trip`;
  private _tripSearchURI = `${this._host}/trip/search`;
  private _tripByLocationURI = `${this._host}/trip/findByLocation`;
  private _poiURI = `${this.host}/poi`;
  private _removePoiURI = `${this.host}/poi`;
  private _removeTripURI = `${this.host}/trip`;


  private _userURI = `${this.host}/user`;
  private _userOtherURI = `${this.host}/user/other`;
  private _userSearchURI = `${this.host}/user/search`;
  private _friendRequestURI = `${this.host}/user/friendRequest`;
  private _checkFriendURI = `${this.host}/user/checkFriend`;
  private _removeFriendURI = `${this.host}/user/removeFriend`;
  private _openFriendRequest = `${this.host}/user/openFriendRequest`;
  private _acceptFriendRequest = `${this.host}/user/acceptRequest`;
  private _rejectFriendRequest = `${this.host}/user/rejectRequest`;
  private _userFriendURI = `${this.host}/user/getFriends`;

  private _checkNotificationURI = `${this.host}/user/checkNotification`;
  private _readNotificationURI = `${this.host}/user/readNotification`;



  private _commentsURI = `${this.host}/comment/all`;
  private _addCommentURI = `${this.host}/comment`;

  private _likeTripURI = `${this.host}/trip/like`;
  private _unlikeTripURI = `${this.host}/trip/unlike`;
  private _checkLikeTripURI = `${this.host}/trip/checkLike`;
  private _topTenTripURI = `${this.host}/trip/topTenTrips`;

  public get host():string {return this._host};
  public get loginURI():string {return this._loginURI};
  public get logoutURI():string {return this._logoutURI};
  public get registerURI():string {return this._registerURI};
  public get mineURI() {return this._mineURI};
  public get tripURI () {return this._tripURI};
  public get tripSearchURI () {return this._tripSearchURI};
  public get poiURI() {return this._poiURI};
  public get userURI(){return this._userURI};
  public get userSearchURI(){return this._userSearchURI};
  public get userOtherURI(){return this._userOtherURI};
  public get friendRequestURI(){return this._friendRequestURI};
  public get checkFriendURI(){return this._checkFriendURI};
  public get removeFriendURI(){return this._removeFriendURI};
  public get openFriendRequest(){return this._openFriendRequest};
  public get acceptFriendRequest(){return this._acceptFriendRequest};
  public get rejectFriendRequest(){return this._rejectFriendRequest};
  public get userFriendURI(){return this._userFriendURI};
  public get likeTripURI(){return this._likeTripURI};
  public get unlikeTripURI(){return this._unlikeTripURI};
  public get checkLikeTripURI(){return this._checkLikeTripURI};
  public get commentsURI(){return this._commentsURI};
  public get addCommentURI(){return this._addCommentURI};
  public get tripByLocationURI(){return this._tripByLocationURI};
  public get topTenTripURI(){return this._topTenTripURI};
  public get checkNotificationURI(){return this._checkNotificationURI};
  public get readNotificationURI(){return this._readNotificationURI};
  public get removePoiURI(){return this._removePoiURI};
  public get removeTripURI(){return this._removeTripURI};

  constructor() {
  }

}

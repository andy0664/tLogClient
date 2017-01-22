import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the Serverconfig provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Serverconfig {

  private _host = "http://192.168.1.2:3000/api";
  private _loginURI = `${this._host}/auth/login`;
  private _registerURI = `${this._host}/auth/signup`;
  private _mineURI = `${this._host}/trip/mine`;
  private _tripURI = `${this._host}/trip`;
  private _tripSearchURI = `${this._host}/trip/search`;
  private _poiURI = `${this.host}/poi`;

  private _userURI = `${this.host}/user`;
  private _userSearchURI = `${this.host}/user/search`;


  public get host():string {return this._host};
  public get loginURI():string {return this._loginURI};
  public get registerURI():string {return this._registerURI};
  public get mineURI() {return this._mineURI};
  public get tripURI () {return this._tripURI};
  public get tripSearchURI () {return this._tripSearchURI};
  public get poiURI() {return this._poiURI};
  public get userURI(){return this._userURI};
  public get userSearchURI(){return this._userSearchURI};

  constructor() {
  }

}

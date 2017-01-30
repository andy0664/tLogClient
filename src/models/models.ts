import {SafeUrl} from "@angular/platform-browser";
/**
 * Created by salho on 18.11.16.
 */
export class User {
  id?:string;
  username: string;
  password: string;
  email: string;
  friends?:User[];
  local?:{username:string};
  trips?:[{_id:string,name:string}];
}

export interface Image {
  id: string;
  descrption?: string;
  uploaded: string;
  user: string;
  url?: SafeUrl;
}

export class FriendRequest{
  _id?:string;
  userFrom?: string;
  userTo?: string;
}

export class Friend{
  _id?:string;
  local:{username:string};
}

export class ReceiveFriendRequest{
  _id?:string;
  userTo:string;
  userFrom:{_id:string,local:{username:string}};
  createdAt:Date;
}

export class POI {
  _id?: string;
  trip?:{_id:string,name:string};
  name: string;
  description: string;
  createdAt: Date;
  loc: {
    coordinates: number[]
  };
  sumCoordinates:number;
  images: Image[];
}

export class Trip {
  _id?: string;
  name: string;
  description?: string;
  begin?: Date;
  end?: Date;
  share?: Boolean;
  createdAt?: Date;
  creator?: {username: {local: string}};
  pois?:[POI];
  likes?:[{_id:string,local:{username:string}}];
}

export class NewComment{
  trip:string;
  comment:string;
}

export class GeoLocation{
  label:string;
  coordinates:Array<number>;
  boundingbox:Array<string>;
}

export class GeoResult{
  x: string;
  y: string;
  label: string;
  bounds: [number[]];
  raw: {boundingbox:Array<string>};
}

export class Comment{
  creator?:{_id:string,local:{username:string}};
  trip?:{_id:string,name:string};
  comment:string;
  createdAt:Date;
}

export class TopTenTripResult{
  _id?: string;
  creator?:{_id:string,local:{username:string}};
  name?:string;
  description?:string;
  likeCount?:number;
}

export class SearchResult{
  _id?: string;
  local?:{username:string};
  name?:string;
}

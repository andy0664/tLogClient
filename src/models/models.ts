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
  userFrom: string;
  userTo: string;
}

export class POI {
  _id?: string;
  name: string;
  description: string;
  createdAt: Date;
  loc: {
    coordinates: number[]
  };
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
}

export class SearchResult{
  _id?: string;
  local?:{username:string};
  name?:string;
}

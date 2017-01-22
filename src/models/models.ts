import {SafeUrl} from "@angular/platform-browser";
/**
 * Created by salho on 18.11.16.
 */
export class User {
  username: string;
  password: string;
  email: string;
  friends?:User[];
}

export interface Image {
  id: string;
  descrption?: string;
  uploaded: string;
  user: string;
  url?: SafeUrl;
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

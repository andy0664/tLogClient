import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar } from 'ionic-native';

import { ListPage } from '../pages/list/list';
import {LoginPage} from "../pages/login/login";
import {SearchPage} from "../pages/search/search";
import {ListFriendsPage} from "../pages/list-friends/list-friends";
import {TestGeocodingPage} from "../pages/test-geocoding/test-geocoding";
import {ListTopTripsPage} from "../pages/list-top-trips/list-top-trips";



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = ListPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Logout', component: LoginPage },
      { title: 'My Trips', component: ListPage },
      { title: 'Search', component: SearchPage },
      { title: 'My Friends', component: ListFriendsPage },
      { title: 'Top 10 Trips', component: ListTopTripsPage },
      { title: 'Test Geocoding', component: TestGeocodingPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }


  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}

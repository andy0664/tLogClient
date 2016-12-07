import {Component} from '@angular/core';
import {NavController, AlertController, NavParams, LoadingController, ActionSheetController} from 'ionic-angular';
import {Geolocation, Coordinates} from "ionic-native";
import "leaflet";
import "drmonty-leaflet-awesome-markers/js/leaflet.awesome-markers"
import {Tlog} from "../../providers/tlog";
import {Trip, POI} from "../../models/models";



/*
 Generated class for the Trip page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-trip',
  templateUrl: 'trip.html'
})
export class TripPage {

  defaultLocation:L.LatLng =  new L.LatLng(47.0720698,15.4429915);
  center:L.LatLng = this.defaultLocation;
  map: L.Map;
  currentLocationMarker: L.Marker;
  markers: L.Marker[];
  currentLocationIcon: L.AwesomeMarkers.Icon;
  trip: Trip = new Trip();
  path:L.Polyline;
  currentLocationMarkerOptions: L.AwesomeMarkers.IconOptions = {iconUrl: null, icon: "hand-o-down", markerColor: "red"};

  constructor(public navCtrl: NavController,
              private alertCtrl: AlertController,
              public navParams: NavParams,
              private loadingCtrl: LoadingController,
              private tlog: Tlog,
              private asCtrl: ActionSheetController
             ) {
    L.AwesomeMarkers.Icon.prototype.options.prefix = 'fa';
    this.currentLocationIcon = L.AwesomeMarkers.icon({
      icon: 'hand-o-down',
      markerColor: 'red'
    });
  }

  presentNewPOIActionSheet = () => {
    let actionSheet = this.asCtrl.create({
      //title: 'Modify your album',
      buttons: [
        {
          text: 'Add POI',
          handler: () => {

          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    actionSheet.present();
  }

  showAlert = (title: string, message: string) => this.alertCtrl.create({
    title: title,
    message: message,
    buttons: ['OK']
  }).present();

  getCurrentLocation = (): Promise<Coordinates> => {
    const loading = this.loadingCtrl.create({content: "Trying to determine your current position"});
    loading.present();
    return Geolocation.getCurrentPosition()
      .then(pos => {
        this.center = L.latLng(pos.coords.latitude, pos.coords.longitude);
        this.currentLocationMarker = L.marker(this.center,{icon: this.currentLocationIcon});
        this.initMap();
        loading.dismiss();
        return this.center;
      })
      .catch(err => {
        loading.dismiss();
        this.center = this.defaultLocation;
        this.showAlert("INFO","Could not get your position, using a default location instead.");
        this.currentLocationMarker = L.marker(this.center,{icon: this.currentLocationIcon});
        this.initMap();
      })
  };

  poiToLatLng = (poi: POI) => L.latLng(poi.loc.coordinates[1], poi.loc.coordinates[0]);
  poiToCoords = (poi: POI) => L.marker(this.poiToLatLng(poi)).on('popupopen',this.onPopupOpen);


  initMap = () => {
    if (this.map) this.map.remove();
    if (this.trip.pois.length > 0) this.center = this.poiToLatLng(this.trip.pois[this.trip.pois.length - 1]);
    this.map = L
        .map("map")
        .setView(this.center, 13);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    this.map.panTo(this.center);
    this.markers = this.trip.pois.map(poi => this.poiToCoords(poi).bindPopup(poi.name));
    this.path = new L.Polyline(this.markers.map(m=>m.getLatLng()));
    this.map.addLayer(this.path);
    this.markers.forEach(m => m.addTo(this.map));
    if (this.currentLocationMarker) {
      this.currentLocationMarker.addTo(this.map);
      this.currentLocationMarker
        .bindPopup("<h3>You are here</h3><p>You can drag this marker. Press the '+' Icon in the Task Bar to add this POI.</p>")
        .openPopup();
    }

  };

  addCurrentLocationMarker = (pos: L.LatLng) =>
    L.marker(pos, {draggable: true, icon: this.currentMarkerIcon})
      .on("dragend", this.onMarkerPositionChanged.bind(this))
      .addTo(this.map);

  onMapClicked = (e) => {
    console.log("Map Clicked");
  };

  onMarkerPositionChanged = (e) => {
    console.log("Marker dragged");
  };

  onPopupOpen = (e:L.LeafletPopupEvent) =>
    this.map.panTo(e.target.getLatLng());


  loadTrip = (tripID: string) => this.tlog.loadTrip(tripID)
    .then(trip => this.trip = trip);

  ionViewWillEnter = () => {
    if (this.currentLocationMarker) {
      this.map.removeLayer(this.currentLocationMarker);
      this.currentLocationMarker = null;
    }
    console.log('Hello TripPage Page to show: ' + this.navParams.get("trip"));
    this.loadTrip(this.navParams.get("trip"))
      .then(() => {
        if (this.trip.pois.length === 0) this.getCurrentLocation(); else this.initMap()
      })
  }

  defaultLocation:L.LatLng =  new L.LatLng(47.0720698,15.4429915);
  center:L.LatLng = this.defaultLocation;
  map:L.Map;
  currentLocationMarker: L.Marker;
  currentLocationIcon: L.AwesomeMarkers.Icon;

  constructor(
      public navCtrl: NavController,
      private tlogService: Tlog,
      private alertCtrl: AlertController,
      private navParams: NavParams,
      private loadingCtrl: LoadingController
  ) {
    L.AwesomeMarkers.Icon.prototype.options.prefix = 'fa';
    this.currentLocationIcon = L.AwesomeMarkers.icon({
      icon: 'hand-o-down',
      markerColor: 'red'
    });
  }




  showAlert = (title:string,message:string) =>
    this.alertCtrl.create({title: title, message: message, buttons: ['OK']}).present();

  initMap = () => {
    if (this.map) this.map.remove();
    this.map = L.map("map").setView(this.center,13);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    if (this.currentLocationMarker) {
      this.currentLocationMarker.addTo(this.map);
      this.currentLocationMarker.bindPopup("<h4>Your are here!</h4>").openPopup();
    }
  };

  ionViewDidLoad() {

  }

  getCurrentPosition = () => {
    let loader = this.loadingCtrl.create({content: "Trying to determine you current location ...."});
    loader.present();
    Geolocation.getCurrentPosition()
      .then(resp => {
        loader.dismiss();
        this.center = new L.LatLng(resp.coords.latitude,resp.coords.longitude);
        this.currentLocationMarker = L.marker(this.center,{icon: this.currentLocationIcon});
        this.initMap();
      })
      .catch(err => {
        loader.dismiss();
        this.center = this.defaultLocation;
        this.showAlert("INFO","Could not get your position, using a default location instead.");
        this.currentLocationMarker = L.marker(this.center,{icon: this.currentLocationIcon});
        this.initMap();
      })
  };

  ionViewWillEnter = () =>
    this.tlogService.loadTrip(this.navParams.get("tripID"))
      .then(trip => {if (trip.pois.length ===0) this.getCurrentPosition()})
      .catch(err => this.showAlert("ERROR",`Could not load this Trip (${err})`))


}

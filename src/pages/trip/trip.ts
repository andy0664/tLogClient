import {Component} from '@angular/core';
import {NavController, AlertController, NavParams, LoadingController, ActionSheetController} from 'ionic-angular';
import {Geolocation, ActionSheet} from "ionic-native";
import "leaflet";
import "drmonty-leaflet-awesome-markers/js/leaflet.awesome-markers"
import {Tlog} from "../../providers/tlog";
import {Trip, POI} from "../../models/models";
import {AddPoiPage} from "../add-poi/add-poi";
import {ShowPoiPage} from "../show-poi/show-poi";
import {AddImagePage} from "../add-image/add-image";
import {ShowCommentsPage} from "../show-comments/show-comments";
import {Security} from "../../providers/security";
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

  defaultLocation: L.LatLng = new L.LatLng(47.0720698, 15.4429915);
  center: L.LatLng = this.defaultLocation;
  map: L.Map;
  currentLocationMarker: L.Marker;
  markers: L.Marker[];
  isOwner: boolean = false;
  trip: Trip = new Trip();
  path: L.Polyline;
  like: number = 0;
  likeCount: number;
  comments:Array<Component>=[];
  commentCount: number;
  creator:string;
  removePoiType=1;
  removeTripType=2;
  iconMap:Map<string,string> = new Map([['Bar','http://fs5.directupload.net/images/170206/temp/xcr66xxz.png'],
    ['Food','http://fs5.directupload.net/images/170206/xvipb6zk.png'],
    ['Museum','http://fs5.directupload.net/images/170206/i6k7zb5h.png'],
    ['Point','http://fs5.directupload.net/images/170206/bgk3j7f4.png'],
    ['Shopping','http://fs5.directupload.net/images/170206/sbozfos9.png']]);


  constructor(public navCtrl: NavController,
              private alertCtrl: AlertController,
              public navParams: NavParams,
              private loadingCtrl: LoadingController,
              private tlog: Tlog,
              private asCtrl: ActionSheetController,
              private security: Security) {
  }

  presentPOIActionSheetOwner = (poi: POI): ActionSheet =>
    this.asCtrl.create({
      buttons: [
        {
          text: 'Show Details',
          handler: () => {
            this.showPoi(poi);
          }
        },
        {
          text: 'Edit POI',
          handler: () => {
            this.editPOI(poi);
          }
        }, {
          text: 'Add Image',
          handler: () => {
            this.addImage(poi);
          }
        }, {
          text: 'Remove POI',
          handler: () => {
            this.startRemovePoi(poi);
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    }).present();


  presentPOIActionSheet = (poi: POI): ActionSheet =>
    this.asCtrl.create({
      //title: 'Modify your album',
      buttons: [
        {
          text: 'Show Details',
          handler: () => {
            this.showPoi(poi);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    }).present();

  showConfirm(message:string,id:string,type:number) {
    let confirm = this.alertCtrl.create({
      message: message,
      buttons: [
        {
          text: 'No',
          handler: () => {
          }
        },
        {
          text: 'Yes',
          handler: () => {
            switch (type){
              case this.removePoiType:
                this.removePoi(id);break;
              case this.removeTripType:
                this.removeTrip();break;
            }
          }
        }
      ]
    });
    confirm.present();
  }

  showAlert = (title: string, message: string) => this.alertCtrl.create({
    title: title,
    message: message,
    buttons: ['OK']
  }).present();

  poiToLatLng = (poi: POI) => L.latLng(poi.loc.coordinates[1], poi.loc.coordinates[0]);

  poiToCoords = (poi: POI) => L.marker(this.poiToLatLng(poi),
    {icon:L.icon({iconUrl:this.iconMap.get(poi.type),
      iconAnchor:[26,44],
      iconSize: [50, 50]})})
    .on('popupopen',this.onPopupOpen(poi));

  /*poiToCoords = (poi: POI) => L.marker(this.poiToLatLng(poi))
   .on('popupopen', this.onPopupOpen(poi));*/


  initMap = () => {
    if (this.map) this.map.remove();
    if (this.trip.pois.length > 0) this.center = this.poiToLatLng(this.trip.pois[this.trip.pois.length - 1]);
    this.map = L
      .map("map")
      .setView(this.center, 13);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    this.markers = this.trip.pois.map(poi => this.poiToCoords(poi).bindPopup(`<h4>${poi.name}</h4><p>${poi.description}</p>`));
    this.path = new L.Polyline(this.markers.map(m => m.getLatLng()));
    this.map.addLayer(this.path);
    this.markers.forEach(m => m.addTo(this.map));
  };

  /*addCurrentLocationMarker = (pos: L.LatLng) => {
   if (!this.map) this.initMap();
   this.currentLocationMarker = L.marker(pos, {draggable: true, icon: this.currentLocationIcon})
   .bindPopup("<h3>You are here</h3><p>You can drag this marker. Press the '+' Icon in the Task Bar to add this POI.</p>")
   .addTo(this.map);
   this.currentLocationMarker.openPopup()
   this.currentLocationMarker.on("dragend", this.onMarkerPositionChanged.bind(this))
   };*/

  addCurrentLocationMarker = (pos: L.LatLng) => {
    if (!this.map) this.initMap();
    this.currentLocationMarker = L.marker(pos, {draggable: true})
      .bindPopup("<h3>You are here</h3>" +
        "<p>You can drag this marker. Press the '+' Icon in the Task Bar to add this POI.</p>")
      .addTo(this.map);
    this.currentLocationMarker.openPopup()
    this.currentLocationMarker.on("dragend", this.onMarkerPositionChanged.bind(this))
  };

  onMapClicked = (e) => {
    console.log("Map Clicked");
  };

  onMarkerPositionChanged = (e) => {
    console.log("Marker dragged");
  };

  onPopupOpen = (poi: POI) => (e: L.LeafletPopupEvent) => {
    this.map.panTo(e.target.getLatLng());
    if(this.isOwner)
      this.presentPOIActionSheetOwner(poi);
    else
      this.presentPOIActionSheet(poi);
  };


  editPOI = (poi: POI) => {
    console.log("About to edit POI " + JSON.stringify(poi));
    this.navCtrl.push(AddPoiPage,
      {
        poi: poi,
        tripID: this.trip._id,
        coordinates: {lng: poi.loc.coordinates[0], lat: poi.loc.coordinates[1]}
      });
  };

  startRemovePoi = (poi:POI) =>{
    this.showConfirm('You want to delete this POI?',poi._id,this.removePoiType);
  }

  startRemoveTrip = () =>{
    this.showConfirm('You want to delete this Trip?',this.trip._id,this.removeTripType);
  }

  removePoi = (poiID:string)=>{
    this.tlog.removePoi(poiID)
      .then(()=>{this.showAlert('INFO','POI removed'); this.ionViewWillEnter()})
      .catch((err)=>this.showAlert('ERROR',`Problem to remove this POI ${err.message}`))
  }

  removeTrip = () =>{
    this.tlog.removeTrip(this.trip._id)
      .then(()=>this.navCtrl.pop())
      .catch((err)=>this.showAlert('ERROR',`Problem to remove this Trip ${err.message}`))
  }

  showPoi = (poi) => this.navCtrl.push(ShowPoiPage, {
    poi: poi
  });

  addImage = (poi: POI) => this.navCtrl.push(AddImagePage, {poi: poi, tripID: this.trip._id});

  addPOI = () => this.navCtrl.push(AddPoiPage,
    {
      tripID: this.trip._id,
      coordinates: this.currentLocationMarker.getLatLng()
    });


  ionViewWillEnter = () => {

    if (this.currentLocationMarker) {
      this.map.removeLayer(this.currentLocationMarker);
      this.currentLocationMarker = null;
    }

    console.log('Hello TripPage Page to show: ' + this.navParams.get("trip"));
    this.tlog.loadTrip(this.navParams.get("trip"))
      .then(trip => {
        this.trip = trip;
        this.creator = this.trip.creator.local.username
        this.likeCount = this.trip.likes.length;

        const loading = this.loadingCtrl.create({
          content: "Fetching comments"
        });
        this.tlog.loadTripComments(this.trip._id)
          .then(res=>{
            loading.dismiss();this.comments=res
            this.commentCount = this.comments.length;
          })
          .catch(err => {
            loading.dismiss(); this.showAlert("INFO","Could not load comments.");
          })

        this.security.isOwner(this.trip.creator._id)
          .then((res: boolean) => {
            this.isOwner = res;
            this.tlog.checkLikeTrip(this.trip._id)
              .then(res => {
                this.like = res;
                if (this.trip.pois.length === 0 && this.isOwner) this.getCurrentPosition(); else this.initMap()
              })
          })
      }).catch(err => this.showAlert("Error", `There seems to be a problem ${err}`));


  };


  getCurrentPosition = () => {
    let loader = this.loadingCtrl.create({content: "Trying to determine your current location ...."});
    loader.present();
    Geolocation.getCurrentPosition()
      .then(resp => {
        loader.dismiss();
        this.center = new L.LatLng(resp.coords.latitude, resp.coords.longitude);
        this.addCurrentLocationMarker(this.center);
      })
      .catch(err => {
        loader.dismiss();
        this.center = this.defaultLocation;
        this.showAlert("INFO", "Could not get your position, using a default location instead.");
        this.addCurrentLocationMarker(this.center);
      })
  };

  changeShareState = () => {
    this.trip.share = !this.trip.share;
    this.tlog.updateTrip(this.trip._id, this.trip)
      .then(res => this.trip = res)
      .catch(err => this.showAlert("Error", "Could not change the public state"));
  }

  changeLikeState = () => {
    let action = this.tlog.likeTrip;
    if (this.like === 1)
      action = this.tlog.unlikeTrip
    action(this.trip._id)
      .then(() => {
        if (this.like === 0) {
          this.like = 1;
          this.likeCount++
        } else {
          this.like = 0;
          this.likeCount--
        }
      })
      .catch(err => this.showAlert("Error", "There seems to be a problem"));

  }

  comment = () => {
    console.log("write comment");
    this.navCtrl.push(ShowCommentsPage, {
      tripID: this.trip._id,
      trip: this.trip,
      creator: this.creator
    });
  }

}

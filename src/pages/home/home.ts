import { Component , ViewChild, ElementRef , NgZone , ChangeDetectorRef } from '@angular/core';
import { IonicPage,Platform,MenuController,ToastController,ModalController, NavController, NavParams , Events , LoadingController , ViewController ,  AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PreferencesProvider } from '../../providers/preferences/preferences';
import { Geolocation ,Geoposition} from '@ionic-native/geolocation';
import {GlobalserviceProvider} from '../../providers/globalservice/globalservice';
import { Slides } from 'ionic-angular';
import { DatePickerDirective } from 'ion-datepicker';
 import { DateModelPage } from '../date-model/date-model';

declare var AdvancedGeolocation:any;

declare var google: any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  leftMenuOpen: boolean = false;
  rightMenuOpen: boolean = false;
@ViewChild(DatePickerDirective) private datepickerDirective:DatePickerDirective;

@ViewChild('map') mapElement: ElementRef;
  public lat;
  public lng;
  public  zone:any;
  public isNoLoc:any;
  public city;
  public country;
  public text;
  //public markersList:any;
  public map: any;
  public gmap: any;
  public autocompleteItems;
  public autocomplete;
  service = new google.maps.places.AutocompleteService();
  public services;
  public region;
  public currentLat;
  public currentLng;
  public show : boolean = false;
  public subShow;
  @ViewChild(Slides) slides: Slides;
  public userID;
  public dateShow : boolean = false;
  constructor(public navCtrl: NavController,
              public menuCtrl: MenuController, 
              public storage: Storage,
              public platform:Platform,private alertCtrl: AlertController,
              public geolocation:Geolocation,
              public modalCtrl: ModalController,
              private chRef: ChangeDetectorRef,
              private toastCtrl: ToastController,
              public loadingCtrl: LoadingController,
              public globalservice: GlobalserviceProvider,
              public preferences: PreferencesProvider) {
     this.zone = new NgZone({enableLongStackTrace: false});
     this.isNoLoc = false;
     this.autocompleteItems = [];
     this.autocomplete = {
       query: ''
     };
     this.globalservice.getStoredValue("USERKey").then(user => {
       console.log("user" , user);
       this.userID = user.user_id;
     })
    
  }

 /* ionViewDidEnter(){
   setTimeout(this.load(), 1000);
  }*/
  ionViewDidLoad() {
  //  this.load();
   setTimeout(this.load(), 1000);
  }

load(){
    let loading = this.loadingCtrl.create({
      content: "wait please",
      dismissOnPageChange: true
    });
    loading.present();
    console.log("here first");
    var markersList = [];    
          let options = {
        enableHighAccuracy : true
    };
        this.geolocation.getCurrentPosition(options).then((pos : Geoposition) => {
           loading.dismiss();
           this.isNoLoc = false;
  console.log("resp",pos);
  this.lat = pos.coords.latitude;
  this.lng = pos.coords.longitude;
  console.log("this.lat in home page : ", this.lat);
  console.log("this.lng in home page : ", this.lng);
   this.getAddress(this.lat,this.lng);
  this.allService();
 let latLng = new google.maps.LatLng(this.lat, this.lng);
 
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      let marker = new google.maps.Marker({
          map: this.map,
          draggable: true,
          animation: google.maps.Animation.DROP,
          position: latLng,
      });
      this.markersList.push(marker);
      google.maps.event.addListener(marker, 'click', (event) => {
      });
      google.maps.event.addListener(marker, 'dragend', (event) => {
                   this.zone.run(() => {
                   this.lat = event.latLng.lat();
                   this.lng = event.latLng.lng();
                   this.getAddress(this.lat,this.lng);
                })
                console.log(event.latLng.lat());  
                console.log(event.latLng.lng());  
      });

    },(err : PositionError)=>{
        console.log("error : " + err.message);
    });

  }
  public markersList = []; 
  clearMarkers() {
        this.setMapOnAll(null);
      }
  setMapOnAll(map) {
        for (var i = 0; i < this.markersList.length; i++) {
          this.markersList[i].setMap(map);
        }
      }
getAddress(lat,lng){
        this.city = "";
        this.country = "";
        this.region = "";
        var geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(lat,lng);
        geocoder.geocode({ 'latLng': latlng },  (results , status) => {
           if(status == google.maps.GeocoderStatus.OK) {
                if(results[0]) {
                    console.log(results[0]);

                    var components = results[0].address_components;  // from Google API place object 

                    for (var i=0; i< components.length; i++)
                    {
                            if (components[i].types[0] == "locality") {
                                  //this is the object you are looking for
                                  this.city = components[i].long_name;
                              }
                            if (components[i].types[0] == "country") {
                                  //this is the object you are looking for
                                  this.country = components[i].long_name;
                            }
                             if (components[i].types[0] == "administrative_area_level_2") {
                                  //this is the object you are looking for
                                  this.region = components[i].long_name;
                            }
                    }
                    this.text = results[0].formatted_address;
                    console.log(this.text);
                    console.log("this.region",this.region);
            this.allService();
                     setTimeout(() => {
                          this.chRef.detectChanges(); //Whenever you need to force update view
                    });
                } else {
                    this.text = "";
                }
            } else {
                    this.text = "";
            }   
        });
    }
 chooseItem(item: any) {
     this.clearMarkers();
     let me = this;
     console.log(item);
     var map = this.map;
     var bounds = new google.maps.LatLngBounds();
     var geocoder = new google.maps.Geocoder();
     geocoder.geocode({ 
          'placeId': item.place_id
      }, 
      function(responses, status) {
          if (status == 'OK') {
                
                var lat = responses[0].geometry.location.lat();
                var lng = responses[0].geometry.location.lng();
                console.log(lat, lng);
                me.getAddress(lat,lng);
                me.lat = responses[0].geometry.location.lat();
                me.lng = responses[0].geometry.location.lng();
                me.text = item.description;
                me.zone.run(function () {
                me.autocompleteItems = [];
                me.autocomplete = {
                   query: ''
                };

                });

                var marker = new google.maps.Marker({
                   map: map,
                   draggable: true,
                   animation: google.maps.Animation.DROP,
                   position: responses[0].geometry.location
                 });
                google.maps.event.addListener(marker, 'dragend', (event) => {
                            me.zone.run(() => {
                               me.lat = event.latLng.lat();
                               me.lng = event.latLng.lng();
                               me.getAddress(me.lat,me.lng);
                            })    
                            this.lat = event.latLng.lat();
                            this.lng = event.latLng.lng();
                            console.log(this.lat);  
                            console.log(this.lng);  
                });
                if (responses[0].geometry.viewport) {
                  // Only geocodes have viewport.
                  bounds.union(responses[0].geometry.viewport);
                } else {
                  bounds.extend(responses[0].geometry.location);
                }
                map.fitBounds(bounds);
          }
      });
  }

  updateSearch() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let me = this;
    this.service.getPlacePredictions({ input: this.autocomplete.query}, function (predictions, status) {
      me.autocompleteItems = []; 
      me.zone.run(function () {
        if(predictions){
        predictions.forEach(function (prediction) {
          console.log(prediction);
          me.autocompleteItems.push(prediction);
        });
        }
      });
    });
  }
presentAlert() {
  let alert = this.alertCtrl.create({
    title: 'services',
    subTitle: 'there are services here',
    buttons: ['Dismiss']
  });
  alert.present();
}
allService(){
  console.log("this.region",this.region);
  this.globalservice.getAllService(this.region).subscribe(res => {
        this.services = res;
        if(this.services.state == "عفوا لايوجد خدمات فى هذة المنطقة فى الوقت الحالى"){
          console.log("no state");
          this.show = false;
        }else{
          console.log("yes state");
          this.presentAlert();
          this.show = true;
        }
        console.log("services : ", this.services);
  })
}
public subService;
serviceID(id){
  console.log("serviceID : ", id);
     this.globalservice.getSub(id).subscribe(res => {
        this.subService = res;
        console.log("subService" , this.subService);
    });
}
public orderRes;
public svID;
public SsvID;
order(service_id,subService_id){
  console.log(service_id,subService_id);
  this.svID = service_id;
  this.SsvID = subService_id;

}
orderNW(){
  console.log("this.SsvID",this.SsvID);
  console.log("svID",this.svID);
  let data = {
    "services_id":this.svID,
    "sub_services_id":this.SsvID,
    "user_id":this.userID,
    "user_lat":this.lat,
    "user_long":this.lng

  }
  this.globalservice.ordernw(data).then(res => {
    console.log("res", res);
    this.orderRes = res;
    console.log(this.orderRes.state);
    if (this.orderRes.state == "202"){
      console.log("order complete");
      this.presentToast("order completed wait for the provider , thanks")
    
    }else{
      this.presentToast("please try again , thanks")
      console.log("order not complete");
    }
  },(err)=>{
    console.log(err);
  })
}
public orderResLater;
orderSchedule(){
     let profileModal = this.modalCtrl.create(DateModelPage, { userId: 8675309 });
     profileModal.onDidDismiss(data => {
       console.log(data.foo);
       if(data.foo == null){
         this.presentToast("please choose date");
       }else{
           let datax = {
         "scheduling_orders":data.foo,  
         "user_id": this.userID
       }
       this.globalservice.orderSched(datax).then(res=>{
           this.orderResLater = res;
           console.log("this.orderResLater",this.orderResLater);
             if (this.orderResLater.state == "202"){
               this.presentToast("we will remind you on the date , thanks");
      console.log("order complete");
    
    }else{
      this.presentToast("please try again")
      console.log("order not complete");
    }
       },(err)=>{
    console.log(err);
  })
       }
     
     

   });
   profileModal.present();
  //this.dateShow = true;
}
  slideChanged() {
 //   console.log("obj" , obj);
    let currentIndex = this.slides.getActiveIndex();
  /*  if (currentIndex == 4){
        this.subShow = true;
        console.log("shreg sarf shi");
    }else{
      this.subShow = false;
    }*/
    console.log('Current index is', currentIndex);
  }
  presentProfileModal() {

 }
 presentToast(msg) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 3000,
    position: 'top'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}

/*
 infowindow = new google.maps.InfoWindow();
  var locations = [
  ['Bondi Beach', -33.890542, 151.274856, 4],
  ['Coogee Beach', -33.923036, 151.259052, 5],
  ['Cronulla Beach', -34.028249, 151.157507, 3],
  ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
  ['Maroubra Beach', -33.950198, 151.259302, 1]
];
marker;
i;
for ( i = 0; i < locations.length; i++) {  
 let marker = new google.maps.Marker({
    position: new google.maps.LatLng(this.locations[i][1], this.locations[i][2]),
    map: this.map
  });

  google.maps.event.addListener(marker, 'click', (function(marker, i) {
    return function() {
      this.infowindow.setContent(this.locations[i][0]);
      this.infowindow.open(this.map, marker);
    }
  })(marker, i));
}*/

}

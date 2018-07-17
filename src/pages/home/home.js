var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef, NgZone, ChangeDetectorRef } from '@angular/core';
import { Platform, MenuController, NavController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PreferencesProvider } from '../../providers/preferences/preferences';
import { Geolocation } from '@ionic-native/geolocation';
import { GlobalserviceProvider } from '../../providers/globalservice/globalservice';
import { Slides } from 'ionic-angular';
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, menuCtrl, storage, platform, geolocation, chRef, loadingCtrl, globalservice, preferences) {
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.storage = storage;
        this.platform = platform;
        this.geolocation = geolocation;
        this.chRef = chRef;
        this.loadingCtrl = loadingCtrl;
        this.globalservice = globalservice;
        this.preferences = preferences;
        this.leftMenuOpen = false;
        this.rightMenuOpen = false;
        this.service = new google.maps.places.AutocompleteService();
        this.show = false;
        this.subShow = false;
        this.seven_ton = false;
        this.sewag = false;
        this.pick = false;
        this.zone = new NgZone({ enableLongStackTrace: false });
        this.isNoLoc = false;
        this.autocompleteItems = [];
        this.autocomplete = {
            query: ''
        };
    }
    /* ionViewDidEnter(){
      setTimeout(this.load(), 1000);
     }*/
    HomePage.prototype.ionViewDidLoad = function () {
        setTimeout(this.load(), 1000);
    };
    //  locations on map
    /* getPosition():any{
              let optionsGPS = {timeout: 5000, enableHighAccuracy: true};
    
        this.geolocation.getCurrentPosition(optionsGPS).then(resp => {
    
          this.loadMap(resp);
    
        }).catch((error) =>{
          console.log(error);
        })
      }*/
    /*  loadMap(position: Geoposition){
    console.log("pos",position);
    let latitud = position.coords.latitude;
    let longitud = position.coords.longitude;
    console.log(latitud, longitud);
    
    let mapEle: HTMLElement = document.getElementById('map');
    
    let myLatLng = {lat: latitud, lng: longitud};
    
    let mapOptions = {
              center: myLatLng,
              zoom: 15,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            }
          this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    
    
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      let marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        title: 'Hello World!'
      });
      mapEle.classList.add('show-map');
        });
    
      }*/
    HomePage.prototype.load = function () {
        var _this = this;
        /*    let loading = this.loadingCtrl.create({
              content: "wait please",
              dismissOnPageChange: true
            });
            loading.present();
            console.log("here first");
            var markersList = [];
            let latLng = "";*/
        var markersList = [];
        var latLng = new google.maps.LatLng(30.051708599999998, 31.186160200000003);
        var mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        var marker = new google.maps.Marker({
            map: this.map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: latLng,
        });
        markersList.push(marker);
        google.maps.event.addListener(marker, 'click', function (event) {
        });
        google.maps.event.addListener(marker, 'dragend', function (event) {
            _this.zone.run(function () {
                _this.lat = event.latLng.lat();
                _this.lng = event.latLng.lng();
                _this.getAddress(_this.lat, _this.lng);
            });
            console.log(event.latLng.lat());
            console.log(event.latLng.lng());
        });
        /*       let optionsGPS = {timeout: 5000, enableHighAccuracy: false};
               this.geolocation.getCurrentPosition(optionsGPS).then((position) => {
               loading.dismiss();
               this.isNoLoc = false;
               this.lat = position.coords.latitude;
               this.lng = position.coords.longitude;
               console.log("lat : " , this.lat);
               console.log("lng  : " , this.lng);
               this.getAddress(this.lat,this.lng);
               
            }, (err) => {
            console.log("error" , err);
            });*/
    };
    HomePage.prototype.getAddress = function (lat, lng) {
        var _this = this;
        this.city = "";
        this.country = "";
        this.region = "";
        var geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(lat, lng);
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    console.log(results[0]);
                    var components = results[0].address_components; // from Google API place object 
                    for (var i = 0; i < components.length; i++) {
                        if (components[i].types[0] == "locality") {
                            //this is the object you are looking for
                            _this.city = components[i].long_name;
                        }
                        if (components[i].types[0] == "country") {
                            //this is the object you are looking for
                            _this.country = components[i].long_name;
                        }
                        if (components[i].types[0] == "administrative_area_level_2") {
                            //this is the object you are looking for
                            _this.region = components[i].long_name;
                        }
                    }
                    _this.text = results[0].formatted_address;
                    console.log(_this.text);
                    console.log("this.region", _this.region);
                    _this.allService();
                    setTimeout(function () {
                        _this.chRef.detectChanges(); //Whenever you need to force update view
                    });
                }
                else {
                    _this.text = "";
                }
            }
            else {
                _this.text = "";
            }
        });
    };
    HomePage.prototype.chooseItem = function (item) {
        var me = this;
        console.log(item);
        var map = this.map;
        var bounds = new google.maps.LatLngBounds();
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            'placeId': item.place_id
        }, function (responses, status) {
            if (status == 'OK') {
                var lat = responses[0].geometry.location.lat();
                var lng = responses[0].geometry.location.lng();
                console.log(lat, lng);
                me.getAddress(lat, lng);
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
                google.maps.event.addListener(marker, 'dragend', function (event) {
                    me.zone.run(function () {
                        me.lat = event.latLng.lat();
                        me.lng = event.latLng.lng();
                        me.getAddress(me.lat, me.lng);
                    });
                    console.log(event.latLng.lat());
                    console.log(event.latLng.lng());
                });
                if (responses[0].geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(responses[0].geometry.viewport);
                }
                else {
                    bounds.extend(responses[0].geometry.location);
                }
                map.fitBounds(bounds);
            }
        });
    };
    HomePage.prototype.updateSearch = function () {
        if (this.autocomplete.query == '') {
            this.autocompleteItems = [];
            return;
        }
        var me = this;
        this.service.getPlacePredictions({ input: this.autocomplete.query }, function (predictions, status) {
            me.autocompleteItems = [];
            me.zone.run(function () {
                if (predictions) {
                    predictions.forEach(function (prediction) {
                        console.log(prediction);
                        me.autocompleteItems.push(prediction);
                    });
                }
            });
        });
    };
    HomePage.prototype.allService = function () {
        var _this = this;
        console.log("this.region", this.region);
        this.globalservice.getAllService(this.region).subscribe(function (res) {
            _this.services = res;
            if (_this.services.state == "عفوا لايوجد خدمات فى هذة المنطقة فى الوقت الحالى") {
                console.log("no state");
                _this.show = false;
            }
            else {
                console.log("yes state");
                _this.show = true;
            }
            console.log("services : ", _this.services);
        });
    };
    HomePage.prototype.Sewage = function () {
        console.log("ton clicked");
        this.seven_ton = true;
        this.sewag = false;
        this.pick = false;
    };
    HomePage.prototype.water_suplly = function () {
        console.log("sewag clicked");
        this.sewag = true;
        this.seven_ton = false;
        this.pick = false;
    };
    HomePage.prototype.Pick_up = function () {
        console.log("pick clicked");
        this.pick = true;
        this.seven_ton = false;
        this.sewag = false;
    };
    HomePage.prototype.serviceID = function (id) {
        console.log("serviceID : ", id);
    };
    HomePage.prototype.slideChanged = function () {
        //   console.log("obj" , obj);
        var currentIndex = this.slides.getActiveIndex();
        /*  if (currentIndex == 4){
              this.subShow = true;
              console.log("shreg sarf shi");
          }else{
            this.subShow = false;
          }*/
        console.log('Current index is', currentIndex);
    };
    __decorate([
        ViewChild('map'),
        __metadata("design:type", ElementRef)
    ], HomePage.prototype, "mapElement", void 0);
    __decorate([
        ViewChild(Slides),
        __metadata("design:type", Slides)
    ], HomePage.prototype, "slides", void 0);
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [NavController,
            MenuController,
            Storage,
            Platform,
            Geolocation,
            ChangeDetectorRef,
            LoadingController,
            GlobalserviceProvider,
            PreferencesProvider])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map
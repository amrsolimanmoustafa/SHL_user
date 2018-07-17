var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import { User } from '../model/UserModel';
import { GlobalserviceProvider } from '../providers/globalservice/globalservice';
var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, menuCtrl, events, user1, geolocation, globalservice, storage) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.menuCtrl = menuCtrl;
        this.events = events;
        this.user1 = user1;
        this.geolocation = geolocation;
        this.globalservice = globalservice;
        this.storage = storage;
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: HomePage }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            var options = {
                enableHighAccuracy: true
            };
            _this.geolocation.getCurrentPosition(options).then(function (pos) {
                console.log("resp", pos);
                _this.globalservice.lat = pos.coords.latitude;
                _this.globalservice.long = pos.coords.longitude;
                _this.currentPos = pos;
                console.log(pos);
            }, function (err) {
                console.log("error : " + err.message);
            });
            /*this.geolocation.getCurrentPosition().then((resp) => {
              console.log("resp",resp);
              this.globalservice.lat = resp.coords.latitude;
              this.globalservice.long = resp.coords.longitude;
                let mylocation = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude);
              });*/
            _this.globalservice.getStoredValue("USERKey").then(function (user) {
                console.log("user", user);
                if (user != null) {
                    console.log("Home page");
                    _this.rootPage = HomePage;
                }
                else {
                    console.log("login page");
                    _this.rootPage = LoginPage;
                }
            });
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.exit = function () {
        this.menuCtrl.close();
        this.globalservice.logout();
        this.globalservice.storage.remove("USERKey");
        this.nav.setRoot(LoginPage);
    };
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html'
        }),
        __metadata("design:paramtypes", [Platform,
            StatusBar,
            SplashScreen,
            MenuController,
            Events,
            User,
            Geolocation,
            GlobalserviceProvider,
            Storage])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map
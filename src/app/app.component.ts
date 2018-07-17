import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { VerifyPage } from '../pages/verify/verify';
import { Geolocation ,Geoposition} from '@ionic-native/geolocation';

import { Storage } from '@ionic/storage';
import {User} from '../model/UserModel';
import {GlobalserviceProvider} from '../providers/globalservice/globalservice';
declare var google: any;
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;
public currentPos;
  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              public menuCtrl: MenuController,
              public events: Events,
              private user1:User,
              public geolocation: Geolocation,
              public globalservice : GlobalserviceProvider,
              public storage: Storage) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {



/*this.geolocation.getCurrentPosition().then((resp) => {
  console.log("resp",resp);
  this.globalservice.lat = resp.coords.latitude;
  this.globalservice.long = resp.coords.longitude;
    let mylocation = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude);
  });*/
      this.globalservice.getStoredValue("USERKey").then(user=>{
       console.log("user",user);
         if (user != null){
           console.log("Home page");
this.rootPage = HomePage;
         }else{
           console.log("login page");
           this.rootPage = LoginPage;
         }
      });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  exit(){
    this.menuCtrl.close();
    this.globalservice.logout();
     this.globalservice.storage.remove("USERKey");
    this.nav.setRoot(LoginPage);
  }
  // menuClosed() {
  //   document.querySelector('#ion-nav').className = '';
  // }

  // menuOpened() {
  //   document.querySelector('#ion-nav').className = 'menuOpen';
  // }
}

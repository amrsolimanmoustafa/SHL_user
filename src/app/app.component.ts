import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,AlertController, Events, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { VerifyPage } from '../pages/verify/verify';
import { Geolocation ,Geoposition} from '@ionic-native/geolocation';
import { FCM , NotificationData} from '@ionic-native/fcm';
import { Storage } from '@ionic/storage';
import {User} from '../model/UserModel';
import {GlobalserviceProvider} from '../providers/globalservice/globalservice';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

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
              private push: Push,
              private user1:User,
              private alertCtrl:AlertController,
              public geolocation: Geolocation,
              public globalservice : GlobalserviceProvider,
              private fcm: FCM,
              public storage: Storage) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
        this.fcm.subscribeToTopic('marketing');

this.fcm.getToken().then(token => {
  this.globalservice.tokenID = token;
 console.log("token" , token);
});

/*this.fcm.onNotification().subscribe(data : NotificationData => {
  console.log("data in push", data);
  console.log("data in push2", JSON.stringify(data));
  if(data.wasTapped){
    console.log("Received in background");
    console.log(JSON.stringify(data))
  } else {
    console.log("Received in foreground");
    console.log(JSON.stringify(data))
  };
});*/
  this.fcm.onNotification().subscribe(
        (data:NotificationData)=>{
          console.log("myData : ",data);
           let confirmAlert = this.alertCtrl.create({
          title: 'New Notification',
          message: data.message,
          buttons: [{
            text: 'Ignore',
            role: 'cancel'
          }, {
            text: 'View',
            handler: () => {
              //TODO: Your logic here
            //  this.nav.push(DetailsPage, {message: data.message});
            }
          }]
        });
        confirmAlert.present();
          if(data.wasTapped){
             let confirmAlert = this.alertCtrl.create({
          title: 'New Notification',
          message: data.message,
          buttons: [{
            text: 'Ignore',
            role: 'cancel'
          }, {
            text: 'View',
            handler: () => {
              //TODO: Your logic here
            //  this.nav.push(DetailsPage, {message: data.message});
            }
          }]
        });
        confirmAlert.present();
            //ocurre cuando nuestra app está en segundo plano y hacemos tap en la notificación que se muestra en el dispositivo
            console.log("Received in background",JSON.stringify(data))
          }else{
            //ocurre cuando nuestra aplicación se encuentra en primer plano,
            //puedes mostrar una alerta o un modal con los datos del mensaje
              let confirmAlert = this.alertCtrl.create({
          title: 'New Notification',
          message: data.message,
          buttons: [{
            text: 'Ignore',
            role: 'cancel'
          }, {
            text: 'View',
            handler: () => {
              //TODO: Your logic here
            //  this.nav.push(DetailsPage, {message: data.message});
            }
          }]
        });
        confirmAlert.present();
            console.log("Received in foreground",JSON.stringify(data))
          }
         },error=>{
          console.error("Error in notification",error)
         }
      );

this.fcm.onTokenRefresh().subscribe(token => {
   console.log("token" , token);
});

this.fcm.unsubscribeFromTopic('marketing');

/*
    const options: PushOptions = {
      android: {
        senderID: "869191053828"
      }
    };
    const pushObject: PushObject = this.push.init(options);

    pushObject.on('registration').subscribe((data: any) => {
      console.log("device token ->", data.registrationId);

      let alert = this.alertCtrl.create({
                  title: 'device token',
                  subTitle: data.registrationId,
                  buttons: ['OK']
                });
                alert.present();

    });

    pushObject.on('notification').subscribe((data: any) => {
      console.log('message', data.message);
      //if user using app and push notification comes
      if (data.additionalData.foreground) {
        // if application open, show popup
        let confirmAlert = this.alertCtrl.create({
          title: 'New Notification',
          message: data.message,
          buttons: [{
            text: 'Ignore',
            role: 'cancel'
          }, {
            text: 'View',
            handler: () => {
              //TODO: Your logic here
            //  this.nav.push(DetailsPage, {message: data.message});
            }
          }]
        });
        confirmAlert.present();
      } else {
        //if user NOT using app and push notification comes
        //TODO: Your logic on click of push notification directly
      //  this.nav.push(DetailsPage, {message: data.message})
      let alert = this.alertCtrl.create({
                  title: 'clicked on',
                  subTitle: "you clicked on the notification!",
                 buttons: ['OK']
                });
                alert.present();
        console.log("Push notification clicked");
      }
    });

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

*/
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
}

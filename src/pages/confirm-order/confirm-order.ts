import { Component , ViewChild, ElementRef , NgZone , ChangeDetectorRef } from '@angular/core';
import { IonicPage,Platform,MenuController,ToastController,ModalController, NavController, NavParams , Events , LoadingController , ViewController ,  AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PreferencesProvider } from '../../providers/preferences/preferences';
import { Geolocation ,Geoposition} from '@ionic-native/geolocation';
import {GlobalserviceProvider} from '../../providers/globalservice/globalservice';

declare var google: any;

/**
 * Generated class for the ConfirmOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-confirm-order',
  templateUrl: 'confirm-order.html',
})
export class ConfirmOrderPage {
  leftMenuOpen: boolean = false;
  rightMenuOpen: boolean = false;
  @ViewChild('map') mapElement: ElementRef;
  public map: any;

	public service_id;
	public subService_id;
	public servicePrice;
	public subServiceIcon;
	public myLat;
	public myLng;
	public orderRes;
	public userID;
  constructor(public navCtrl: NavController,
  			  public navParams: NavParams ,
  			  private toastCtrl: ToastController,
              public loadingCtrl: LoadingController,
              public globalservice: GlobalserviceProvider,) {

  	this.service_id = this.navParams.get('serviceID');
  	this.subService_id = this.navParams.get('subID');
  	this.servicePrice = this.navParams.get('subPrice');
  	this.subServiceIcon = this.navParams.get('SubIcon');
  	this.myLat = this.navParams.get('lat');
  	this.myLng = this.navParams.get('lng');
  	console.log("this.service_id :" , this.service_id);
  	console.log("this.subService_id :" , this.subService_id);
  	console.log("this.servicePrice :" , this.servicePrice);
  	console.log("this.subServiceIcon :" , this.subServiceIcon);
  	console.log("this.myLat :" , this.myLat);
  	console.log("this.myLng :" , this.myLng);
  	   this.globalservice.getStoredValue("USERKey").then(user => {
       console.log("user" , user);
       this.userID = user.user_id;
     })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmOrderPage');
     this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 15,
      center: {lat: this.myLat, lng: this.myLng}
    });
  }
orderNW(){
  let data = {
    "services_id":this.service_id,
    "sub_services_id":this.subService_id,
    "user_id":this.userID,
    "user_lat":this.myLat,
    "user_long":this.myLng

  }
  this.globalservice.ordernw(data).then(res => {
    console.log("res", res);
    this.orderRes = res;
    console.log("state",this.orderRes.state);
    if (this.orderRes.state == "202"){
      console.log("order complete");
      this.presentToast("order completed wait for the provider , thanks")
    
    }else{
      this.presentToast("please try again , thanks")
      console.log("order not complete");
    }
  },(err)=>{
    console.log("error here   : ",err);
  })
}
present(){
	
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
}

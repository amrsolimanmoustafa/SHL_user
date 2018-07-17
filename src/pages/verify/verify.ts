import { Component } from '@angular/core';
import { NavController, NavParams , ToastController } from 'ionic-angular';
import {GlobalserviceProvider} from '../../providers/globalservice/globalservice';
import { HomePage } from '../../pages/home/home';
/**
 * Generated class for the VerifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-verify',
  templateUrl: 'verify.html',
})
export class VerifyPage {
	public verfy;
	public mobile;
	public result;
	public result2;
	user = {phone : '',v_code:''};

  constructor(public globalservice:GlobalserviceProvider,
    public navCtrl: NavController, 
    public toastCtrl : ToastController,
    public navParams: NavParams) {
  this.verfy = this.navParams.get('verf');
  this.mobile = this.navParams.get('mob');
  this.user.phone = this.mobile;
  console.log(this.verfy,this.mobile);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyPage');
    this.globalservice.verfy(this.mobile).subscribe(res => {
    	this.result = res;
    	console.log(this.result);
    })
  }
enter(){
	console.log(this.user);
	this.globalservice.active(this.user).then(res => {
			this.result2 = res;
			console.log(this.result2);
      this.afterSign(this.result2);
	},(err)=>{
		console.log(err);
    this.afterSign(err);
	})
}
afterSign(error){
  console.log("state" , error.state)
  if(error.state == 'رقم التفعيل خاطئ برجاء المراجعة '){
    console.log("there is error you will not enter",error);
    this.presentToast("رقم التفعيل خاطئ برجاء المراجعة");
        this.navCtrl.push(HomePage);

  }else{
    this.presentToast("you will enter successfully");
    this.navCtrl.push(HomePage);
  }
  
}
presentToast(msg) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 3000,
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}
changeMob(){
  this.navCtrl.pop();
}
}

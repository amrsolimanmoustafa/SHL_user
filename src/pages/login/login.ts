import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {GlobalserviceProvider} from '../../providers/globalservice/globalservice';
import {VerifyPage} from '../../pages/verify/verify';
import {User} from '../../model/UserModel';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
user = {phone : '',token_id: this.globalservice.tokenID,lang_id:'' };
public result;
  constructor(private user1:User,public globalservice:GlobalserviceProvider,public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
login(){
	console.log(this.user);
	console.log("tokenID",this.globalservice.tokenID);

	this.globalservice.login(this.user).then(res =>{
		this.result = res;
		console.log(this.result);
		console.log("v-code : " , this.result.v_code);
		console.log("v-phone : " , this.result.phone);
				  this.user1.setuser(this.result);
   		   		  console.log("result!!",this.result);
  				  this.globalservice.storeValue("USERKey" , this.result);
		this.navCtrl.push(VerifyPage,{verf:this.result.v_code,mob:this.result.phone});
	},(err)=>{
		console.log(err);
	})
}
lang(num){
	console.log(num);
	if(num == '1'){
		this.user.lang_id = 'ar';
	}else if(num =='2'){
		this.user.lang_id = 'en';
	}else{
		this.user.lang_id = 'do';
	}

}

}

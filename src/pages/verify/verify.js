var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { GlobalserviceProvider } from '../../providers/globalservice/globalservice';
import { HomePage } from '../../pages/home/home';
/**
 * Generated class for the VerifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var VerifyPage = /** @class */ (function () {
    function VerifyPage(globalservice, navCtrl, toastCtrl, navParams) {
        this.globalservice = globalservice;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.navParams = navParams;
        this.user = { phone: '', v_code: '' };
        this.verfy = this.navParams.get('verf');
        this.mobile = this.navParams.get('mob');
        this.user.phone = this.mobile;
        console.log(this.verfy, this.mobile);
    }
    VerifyPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad VerifyPage');
        this.globalservice.verfy(this.mobile).subscribe(function (res) {
            _this.result = res;
            console.log(_this.result);
        });
    };
    VerifyPage.prototype.enter = function () {
        var _this = this;
        console.log(this.user);
        this.globalservice.active(this.user).then(function (res) {
            _this.result2 = res;
            console.log(_this.result2);
            _this.afterSign(_this.result2);
        }, function (err) {
            console.log(err);
            _this.afterSign(err);
        });
    };
    VerifyPage.prototype.afterSign = function (error) {
        console.log("state", error.state);
        if (error.state == 'رقم التفعيل خاطئ برجاء المراجعة ') {
            console.log("there is error you will not enter", error);
            this.presentToast("رقم التفعيل خاطئ برجاء المراجعة");
            this.navCtrl.push(HomePage);
        }
        else {
            this.presentToast("you will enter successfully");
            this.navCtrl.push(HomePage);
        }
    };
    VerifyPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    VerifyPage.prototype.changeMob = function () {
        this.navCtrl.pop();
    };
    VerifyPage = __decorate([
        Component({
            selector: 'page-verify',
            templateUrl: 'verify.html',
        }),
        __metadata("design:paramtypes", [GlobalserviceProvider,
            NavController,
            ToastController,
            NavParams])
    ], VerifyPage);
    return VerifyPage;
}());
export { VerifyPage };
//# sourceMappingURL=verify.js.map
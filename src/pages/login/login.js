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
import { NavController, NavParams } from 'ionic-angular';
import { GlobalserviceProvider } from '../../providers/globalservice/globalservice';
import { VerifyPage } from '../../pages/verify/verify';
import { User } from '../../model/UserModel';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = /** @class */ (function () {
    function LoginPage(user1, globalservice, navCtrl, navParams) {
        this.user1 = user1;
        this.globalservice = globalservice;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.user = { phone: '', token_id: 'xx', lang_id: '' };
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        console.log(this.user);
        this.globalservice.login(this.user).then(function (res) {
            _this.result = res;
            console.log(_this.result);
            console.log("v-code : ", _this.result.v_code);
            console.log("v-phone : ", _this.result.phone);
            _this.user1.setuser(_this.result);
            console.log("result!!", _this.result);
            _this.globalservice.storeValue("USERKey", _this.result);
            _this.navCtrl.push(VerifyPage, { verf: _this.result.v_code, mob: _this.result.phone });
        }, function (err) {
            console.log(err);
        });
    };
    LoginPage.prototype.lang = function (num) {
        console.log(num);
        if (num == '1') {
            this.user.lang_id = 'ar';
        }
        else if (num == '2') {
            this.user.lang_id = 'en';
        }
        else {
            this.user.lang_id = 'do';
        }
    };
    LoginPage = __decorate([
        Component({
            selector: 'page-login',
            templateUrl: 'login.html',
        }),
        __metadata("design:paramtypes", [User, GlobalserviceProvider, NavController, NavParams])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map
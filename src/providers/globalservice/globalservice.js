var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
/*
  Generated class for the GlobalserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var GlobalserviceProvider = /** @class */ (function () {
    function GlobalserviceProvider(storage, http, geolocation) {
        this.storage = storage;
        this.http = http;
        this.geolocation = geolocation;
        this.login_url = "http://admin.shl-app.com/api/login";
        this.verfy_code_url = "http://admin.shl-app.com/api/testcode/";
        this.active_code_url = "http://admin.shl-app.com/api/activate";
        this.allService_url = "http://admin.shl-app.com/api/allserivces";
        this.ur = "?lang=ar";
        this.loggedIn = false;
        console.log('Hello GlobalserviceProvider Provider');
        this.geo();
        console.log('Hello ');
    }
    // get methods
    GlobalserviceProvider.prototype.verfy = function (mob) {
        return this.http.get(this.verfy_code_url + mob);
    };
    GlobalserviceProvider.prototype.getAllService = function (region) {
        return this.http.get(this.allService_url + '/' + region + this.ur);
    };
    GlobalserviceProvider.prototype.geo = function () {
        var _this = this;
        var options = {
            enableHighAccuracy: true
        };
        this.geolocation.getCurrentPosition(options).then(function (pos) {
            console.log("resp", pos);
            _this.lat = pos.coords.latitude;
            _this.long = pos.coords.longitude;
            _this.currentPos = pos;
            console.log(pos);
        }, function (err) {
            console.log("error : " + err.message);
        });
    };
    // post methods
    GlobalserviceProvider.prototype.login = function (data) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.login_url, data).subscribe(function (res) {
                console.log("login ", data);
                resolve(res);
            }, function (e) {
                reject(e);
            });
        });
        return promise;
    };
    GlobalserviceProvider.prototype.active = function (data) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.post(_this.active_code_url, data).subscribe(function (res) {
                console.log("active code ", data);
                resolve(res);
            }, function (e) {
                reject(e);
            });
        });
        return promise;
    };
    // storage data
    GlobalserviceProvider.prototype.storeValue = function (key, value) {
        var _this = this;
        this.loggedIn = true;
        var promise = new Promise(function (resolve, reject) {
            console.log('storage', key, value);
            _this.storage.set(key, value);
            resolve(true);
        });
        return promise;
    };
    GlobalserviceProvider.prototype.getStoredValue = function (key) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.storage.get(key).then(function (val) {
                console.log('am from local storage ', val);
                resolve(val);
            }).catch(function (e) {
                console.log('storage err :', e);
            });
        });
        return promise;
    };
    GlobalserviceProvider.prototype.removeStoredKey = function (key) {
        this.storage.remove(key);
    };
    GlobalserviceProvider.prototype.logout = function () {
        this.loggedIn = false;
        this.storage.remove("USERKey");
        this.storage.set("USERKey", null);
    };
    GlobalserviceProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Storage, HttpClient, Geolocation])
    ], GlobalserviceProvider);
    return GlobalserviceProvider;
}());
export { GlobalserviceProvider };
//# sourceMappingURL=globalservice.js.map
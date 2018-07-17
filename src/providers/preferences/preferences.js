var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Events } from 'ionic-angular';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
/*
  Generated class for the PreferencesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var PreferencesProvider = /** @class */ (function () {
    function PreferencesProvider(events) {
        this.events = events;
        this.menuStatus = 'Close';
    }
    PreferencesProvider.prototype.setMenuOpen = function () {
        this.menuStatus = 'Open';
    };
    PreferencesProvider.prototype.setMenuClose = function () {
        this.menuStatus = 'Close';
    };
    PreferencesProvider.prototype.getMenuStatus = function () {
        var _this = this;
        this.events.subscribe('menuStatus', function (val) {
            _this.menuStatus = val;
            console.log('Menu is ', _this.menuStatus);
            if (_this.menuStatus == 'Open') {
                return true;
            }
            else if (_this.menuStatus == 'Close') {
                return false;
            }
            else {
                return false;
            }
        });
    };
    PreferencesProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Events])
    ], PreferencesProvider);
    return PreferencesProvider;
}());
export { PreferencesProvider };
//# sourceMappingURL=preferences.js.map
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { VerifyPage } from '../pages/verify/verify';
import { NativeStorage } from '@ionic-native/native-storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from "@angular/common/http";
import { IonicStorageModule } from '@ionic/storage';
import { PreferencesProvider } from '../providers/preferences/preferences';
import { GlobalserviceProvider } from '../providers/globalservice/globalservice';
import { Geolocation } from '@ionic-native/geolocation';
import { User } from '../model/UserModel';
import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                MyApp,
                HomePage,
                LoginPage,
                VerifyPage
            ],
            imports: [
                BrowserModule, HttpClientModule, FormsModule,
                ReactiveFormsModule,
                AgmCoreModule.forRoot({
                    libraries: ["places"],
                    apiKey: 'AIzaSyCBTiPVu896nhbML6rLegEAaUoUkDEqEKA'
                }),
                IonicModule.forRoot(MyApp),
                IonicStorageModule.forRoot()
            ],
            bootstrap: [IonicApp],
            entryComponents: [
                MyApp,
                HomePage,
                LoginPage,
                VerifyPage
            ],
            providers: [
                StatusBar,
                SplashScreen,
                { provide: ErrorHandler, useClass: IonicErrorHandler },
                PreferencesProvider,
                GlobalserviceProvider,
                Geolocation,
                NativeStorage,
                User
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map
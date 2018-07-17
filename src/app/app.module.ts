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
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { IonicStorageModule } from '@ionic/storage';
import { PreferencesProvider } from '../providers/preferences/preferences';
import { GlobalserviceProvider } from '../providers/globalservice/globalservice';
import { Geolocation } from '@ionic-native/geolocation';
import {User} from '../model/UserModel';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
 import { DatePickerModule } from 'ion-datepicker';
 import { DateModelPage } from '../pages/date-model/date-model';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    VerifyPage,
    DateModelPage
  ],
  imports: [
    BrowserModule,HttpClientModule, FormsModule,DatePickerModule,
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
    VerifyPage,
    DateModelPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PreferencesProvider,
    GlobalserviceProvider,
    Geolocation,
    NativeStorage,
    User
  ]
})
export class AppModule {}

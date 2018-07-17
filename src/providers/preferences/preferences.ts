import { Events } from 'ionic-angular';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
/*
  Generated class for the PreferencesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PreferencesProvider {
  public menuStatus: string = 'Close';
  constructor(public events: Events) {
    
  }

  setMenuOpen() {
    this.menuStatus = 'Open';
  }

  setMenuClose() {
    this.menuStatus = 'Close';
  }

  getMenuStatus() {
    this.events.subscribe('menuStatus', (val)=>{
      this.menuStatus = val;
      console.log('Menu is ',this.menuStatus);
      if( this.menuStatus == 'Open' ) {
        return true;
      } else if ( this.menuStatus == 'Close' ) { 
        return false;
      } else {
        return false;
      }
    });
  }

}

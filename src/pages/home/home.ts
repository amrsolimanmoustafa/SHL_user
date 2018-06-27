import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';



import { Storage } from '@ionic/storage';

import { PreferencesProvider } from '../../providers/preferences/preferences';

declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  leftMenuOpen: boolean = false;
  rightMenuOpen: boolean = false;

  @ViewChild('gmap') mapRef: ElementRef;

  gmap: any;

  constructor(public navCtrl: NavController,
              public menuCtrl: MenuController, 
              public storage: Storage,
              public preferences: PreferencesProvider) {

  }

  ionViewDidLoad(){
   setTimeout(this.showMap(), 1000);
  }

  showMap() {
    const location = new google.maps.LatLng(31.2631955, 29.9942023);

    const options = {
      center: location,
      zoom: 18,
      disableDefaultUI: true
    }

    
    this.gmap = new google.maps.Map(this.mapRef.nativeElement, options);
    
    const marker = new google.maps.Marker({
      position: location
    });

    marker.setMap(this.gmap);
  }
}

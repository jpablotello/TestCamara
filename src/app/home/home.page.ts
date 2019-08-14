import { Component } from '@angular/core';
import {Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  image: string = null;
  japish = false;
  mensajeFoto: string = null;
  contadorFotos = 0;
  gpsPositionLat: number = null;
  gpsPositionLong: number = null;


  getPicture() {

    const options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 100
    }
    this.camera.getPicture( options )
    .then(imageData => {
      this.image = `data:image/jpeg;base64,${imageData}`;
      this.japish = true;
      this.contadorFotos++;
      this.mensajeFoto = 'Fotos Sacadas : ' + this.contadorFotos;
      // Obtencion de gps
      this.geolocation.getCurrentPosition().then((resp) => {
        this.gpsPositionLat = resp.coords.latitude;
        this.gpsPositionLong = resp.coords.longitude;
       }).catch((error) => {
         console.log('Error getting location', error);
       });
    })
    .catch(error => {
      console.error( error );
    });
  }

  constructor(private camera: Camera ,
              private geolocation: Geolocation) {
  }
}

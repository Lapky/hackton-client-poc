import * as geoLocation from "nativescript-geolocation";
import { Accuracy } from "ui/enums"; // used to describe at what accuracy the location should be get
import { Component, OnInit, Input } from '@angular/core';
import { LostPet } from '~/models/lost-pet';
import { SpatialLocation } from '~/models/spatial-location';
import { MapView, Marker } from 'nativescript-google-maps-sdk';

@Component({
  selector: 'lost-pet-pet-location',
  templateUrl: './lost-pet/lost-pet-pet-location/lost-pet-pet-location.component.html',
  styleUrls: ['./lost-pet/lost-pet-pet-location/lost-pet-pet-location.component.css'],
  providers: []
})
export class LostPetPetLocationComponent implements OnInit {
  currentGeoLocation: any;
  @Input() lostPet: LostPet;

  latitude = 32.0672359;
  longitude = 34.7947387;
  zoom = 18;
  minZoom = 0;
  maxZoom = 22;
  bearing = 0;
  tilt = 0;
  padding = [40, 40, 40, 40];
  mapView: MapView & { infoWindowTemplates: string };
  lastCamera: String;

  enableLocationServices(): void {
    geoLocation.isEnabled().then(enabled => {
        if (!enabled) {
          console.log("fuck");
            geoLocation.enableLocationRequest().then(() => this.getDeviceLocation());
        } else {
          console.log("not fuck");
        }
    });
}

private getDeviceLocation(): Promise<any> {
  return new Promise((resolve, reject) => {
    geoLocation.enableLocationRequest().then(() => {
      geoLocation.getCurrentLocation({desiredAccuracy: Accuracy.high, maximumAge: 5000, timeout: 20000 }).then(location => {
              resolve(location);
          }).catch(error => {
              reject(error);
          });
      });
  });
}

  constructor() {
  }

  ngOnInit(): void {
    this.enableLocationServices();
    this.getDeviceLocation().then(res => {
        this.latitude=res.latitude;
        this.longitude = res.longitude;
    });
  }
  onMapReady(event) {
    this.mapView = event.object;
    this.mapView.myLocationEnabled = true;
    this.mapView.settings.myLocationButtonEnabled = true;
  }

  onCoordinateTapped(args) {
    this.lostPet.since = "?????";
    this.lostPet.lastSeenLocation = new SpatialLocation();
    this.lostPet.lastSeenLocation.latitude = args.position.latitude;
    this.lostPet.lastSeenLocation.longtitude = args.position.longitude;
    console.log("lastSeenLocation", this.lostPet.lastSeenLocation)

    this.mapView.removeAllMarkers();
    var marker = new Marker();
    marker.position = args.position;
    this.mapView.addMarker(marker);
  }
}
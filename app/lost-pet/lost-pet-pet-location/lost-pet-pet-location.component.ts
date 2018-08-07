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

  constructor() {
  }

  ngOnInit(): void {
  }

  onMapReady(event) {
    this.mapView = event.object;
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
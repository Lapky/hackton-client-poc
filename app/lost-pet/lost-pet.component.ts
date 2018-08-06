import { Component, OnInit } from '@angular/core';
import { LostPet } from '~/models/lost-pet';
import { PetType } from '~/models/pet-type';
import { SpatialLocation } from '~/models/spatial-location';
import { Guid } from "guid-typescript";
import { LostPetsReporterService } from '~/services/lost-pets-reporter.service';
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { MapView } from 'nativescript-google-maps-sdk';

@Component({
  selector: 'lost-pet',
  templateUrl: './lost-pet/lost-pet.component.html',
  styleUrls: ['./lost-pet/lost-pet.component.css'],
  providers: []
})
export class LostPetComponent implements OnInit {
  private _lostPet: LostPet;

  latitude =  32.0672359;
  longitude = 34.7947387;
  zoom = 18;
  minZoom = 0;
  maxZoom = 22;
  bearing = 0;
  tilt = 0;
  padding = [40, 40, 40, 40];
  mapView: MapView & { infoWindowTemplates: string };
  lastCamera: String;

  
  constructor(private lostPetsReporterService: LostPetsReporterService) {
    
  }

  ngOnInit(): void {
    this._lostPet = new LostPet();
  }

  get lostPet(): LostPet {
    return this._lostPet;
  }
  onMapReady(event) {
    console.log('Map Ready, retrieving pets...');
    this.mapView = event.object; 
  }

  onTap(value: string): void {
    alert(value);
  }

  addPet() {
    console.log(this.lostPet)
    this.lostPetsReporterService.report(this.lostPet);
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
  }

  setPicture(pictureBase64, index) {
    console.log("GOT PICTURE", pictureBase64)
    this.lostPet.picturesBase64[index] = pictureBase64;
  }
}
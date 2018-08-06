import { Component, OnInit } from '@angular/core';
import { LostPet } from '~/models/lost-pet';
import { PetType } from '~/models/pet-type';
import { SpatialLocation } from '~/models/spatial-location';
import { Guid } from "guid-typescript";
import { LostPetsReporterService } from '~/services/lost-pets-reporter.service';
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

@Component({
  selector: 'lost-pet',
  templateUrl: './lost-pet/lost-pet.component.html',
  styleUrls: ['./lost-pet/lost-pet.component.css'],
  providers: []
})
export class LostPetComponent implements OnInit {
  protected _lostPet: LostPet;
  protected values = ['נקבה', 'זכר'];

  constructor(private lostPetsReporterService: LostPetsReporterService) {
  }

  ngOnInit(): void {
    this._lostPet = new LostPet();
  }

  get lostPet(): LostPet {
    return this._lostPet;
  }

  onTap(value: string): void {
    alert(value);
  }

  addPet() {
    console.log("ADDING")
    var lostPet = new LostPet();
    lostPet.type = PetType.dog;
    lostPet.name = "papi " + Guid.create();
    lostPet.lastSeenLocation = new SpatialLocation();
    //lostPet.lastSeenLocation.latitude = args.position.latitude;
    //lostPet.lastSeenLocation.longtitude  = args.position.longitude;

    this.lostPetsReporterService.report(lostPet);
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
  }
}
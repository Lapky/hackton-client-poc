import { Component } from '@angular/core';
import { LostPet } from  '~/models/lost-pet';
import { PetType } from '~/models/pet-type';
import { SpatialLocation } from '~/models/spatial-location';
import { Guid } from "guid-typescript";
import { LostPetsReporterService } from '~/services/lost-pets-reporter.service';

@Component({
  selector: 'lost-pet',
  templateUrl: './lost-pet/lost-pet.component.html',
  styleUrls: ['./lost-pet/lost-pet.component.scss'],
  providers: []
})
export class LostPetComponent {
  constructor(private lostPetsReporterService : LostPetsReporterService) {
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
}
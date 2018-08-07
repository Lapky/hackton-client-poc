import { Component, OnInit } from '@angular/core';
import { LostPet } from '~/models/lost-pet';
import { PetType } from '~/models/pet-type';
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
  public lostPet: LostPet = new LostPet();
  public availableSteps : Array<string> = ['pet-details', 'pictures', 'location', 'owner-details'];
  public currentStepIndex : number = 0;

  constructor(private lostPetsReporterService: LostPetsReporterService) {
  }

  ngOnInit(): void {
  }

  shouldShowStep(stepName : string) : boolean {
    var result = this.availableSteps[this.currentStepIndex] == stepName;
    return result;
  }

  nextStep() {
    this.currentStepIndex++;
  }

  previousStep() {
    this.currentStepIndex--;
  }

  addPet() {
    console.log("Adding pet", this.lostPet)
    this.lostPetsReporterService.report(this.lostPet);
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
  }
}
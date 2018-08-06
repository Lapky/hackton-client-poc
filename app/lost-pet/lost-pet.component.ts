import { Component,OnInit } from '@angular/core';
import { LostPet } from  '~/models/lost-pet';
import { PetType } from '~/models/pet-type';
import { SpatialLocation } from '~/models/spatial-location';
import { Guid } from "guid-typescript";
import { LostPetsReporterService } from '~/services/lost-pets-reporter.service';
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as listviewModule from "nativescript-ui-listview";
import * as sidedrawerModule from "nativescript-ui-sidedrawer";
import * as calendarModule from "nativescript-ui-calendar";
import * as chartModule from "nativescript-ui-chart";
import * as dataformModule from "nativescript-ui-dataform";
import * as gaugeModule from "nativescript-ui-gauge";
import * as autocompleteModule from "nativescript-ui-autocomplete";

class SomeDataContainer {
  public list: string;
  public picker: string;
  public name: string;
  public age: string;
  public desc: string;
  public animalType: string;
  public color: string;
  public pname: string;
  public pnumber: string;
  public email: string;
  public anotherdesc: string;
  constructor() {
      this.name = "";
      this.color = ""
      this.animalType = "";
      this.picker = "";
      this.desc = "";
      this.pname = "";   
      this.pnumber = "";  
      this.email = "";
      this.anotherdesc=""
  }
}
@Component({
  selector: 'lost-pet',
  templateUrl: './lost-pet/lost-pet.component.html',
  styleUrls: ['./lost-pet/lost-pet.component.css'],
  providers: []
})
export class LostPetComponent  implements OnInit  {
  protected _somedata: SomeDataContainer;
  protected values = [ 'נקבה', 'זכר'];
  constructor(private lostPetsReporterService : LostPetsReporterService) {
    
  }

  ngOnInit(): void {
    this._somedata = new SomeDataContainer();
}

get somedata(): SomeDataContainer {
    return this._somedata;
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
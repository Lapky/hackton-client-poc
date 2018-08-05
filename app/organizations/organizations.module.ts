import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { LostPetRoutingModule } from "./lost-pet-routing.module";
import { LostPetComponent } from "./lost-pet.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        LostPetRoutingModule
    ],
    declarations: [
        LostPetComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class LostPetModule { }

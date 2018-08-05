import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { LostPetComponent } from "./lost-pet.component";

const routes: Routes = [
    { path: "lost-pet", component: LostPetComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class LostPetRoutingModule { }

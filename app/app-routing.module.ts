import { NgModule } from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { MapComponent} from "./map/map.component"
import { LostPetComponent } from '~/lost-pet/lost-pet.component';

const routes: Routes = [
    { path: "", redirectTo: "/map", pathMatch: "full" },
    { path: "home", loadChildren: "./home/home.module#HomeModule" },
    { path: 'lost-pet', component: LostPetComponent },
    { path: 'map', component: MapComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }

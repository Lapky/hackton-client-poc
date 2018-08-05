import { NgModule } from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { MapComponent} from "./map/map.component"
const routes: Routes = [
    { path: "", redirectTo: "/map", pathMatch: "full" },
    { path: "home", loadChildren: "./home/home.module#HomeModule" },
    { path: 'map', component: MapComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }

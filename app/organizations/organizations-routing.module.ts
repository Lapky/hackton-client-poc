import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { OrganizationsComponent } from "./organizations.component";

const routes: Routes = [
    { path: "organizations", component: OrganizationsComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class OrganizationsRoutingModule { }

import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { SosReportComponent } from "./sos-report.component";

const routes: Routes = [
    { path: "sos-report", component: SosReportComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class SosReportRoutingModule { }

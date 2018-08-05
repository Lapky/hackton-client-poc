import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SosReportRoutingModule } from "./sos-report-routing.module";
import { SosReportComponent } from "./sos-report.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        SosReportRoutingModule
    ],
    declarations: [
        SosReportComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SosReportModule { }

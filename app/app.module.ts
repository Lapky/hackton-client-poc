import { HttpClientModule } from '@angular/common/http';
import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MapComponent } from "./map/map.component";
import { LostPetsProviderService } from "./services/lost-pets-provider.service";
import { LapkyServerService } from "./services/lapky-server.service";
import { LostPetsRepository } from "./services/lost-pets-repository";
import { LostPetsReporterService } from '~/services/lost-pets-reporter.service';
import { LostPetComponent } from '~/lost-pet/lost-pet.component';
import { SosReportComponent } from '~/sos-report/sos-report.component';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        NativeScriptModule,
        NativeScriptUISideDrawerModule,
        HttpClientModule
    ],
    declarations: [
        AppComponent,
        MapComponent,
        LostPetComponent,
        SosReportComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers: [
        LapkyServerService,
        LostPetsProviderService,
        LostPetsReporterService,
        LostPetsRepository
    ]
})
export class AppModule { }

import { HttpClientModule } from '@angular/common/http';
import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MapComponent } from "./map/map.component";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { NativeScriptUICalendarModule } from "nativescript-ui-calendar/angular";
import { NativeScriptUIChartModule } from "nativescript-ui-chart/angular";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";
import { NativeScriptUIAutoCompleteTextViewModule } from "nativescript-ui-autocomplete/angular";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { LostPetsProviderService } from "./services/lost-pets-provider.service";
import { LapkyServerService } from "./services/lapky-server.service";
import { LostPetsRepository } from "./services/lost-pets-repository";
import { LostPetsReporterService } from '~/services/lost-pets-reporter.service';
import { OrganizationsRepository } from "~/organizations/organizations-repository";
import { SosReportsProviderService } from "~/services/sos-reports-provider.service";
import { SosReporterService } from "~/services/sos-reporter.service";

import { LostPetOwnerDetailsComponent } from '~/lost-pet/lost-pet-owner-details/lost-pet-owner-details.component';
import { LostPetPetPicturesComponent } from '~/lost-pet/lost-pet-pet-pictures/lost-pet-pet-pictures.component';
import { LostPetPetDetailsComponent } from '~/lost-pet/lost-pet-pet-details/lost-pet-pet-details.component';
import { LostPetPetLocationComponent } from '~/lost-pet/lost-pet-pet-location/lost-pet-pet-location.component';
import { LostPetComponent } from '~/lost-pet/lost-pet.component';
import { SosReportComponent } from '~/sos-report/sos-report.component';
import { PicturePickerComponent } from '~/picture-picker/picture-picker.component';
import { OrganizationsComponent } from '~/organizations/organizations.component';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        NativeScriptModule,
        NativeScriptUISideDrawerModule,
        HttpClientModule,
        NativeScriptCommonModule,
        NativeScriptUIListViewModule,
        NativeScriptUICalendarModule,
        NativeScriptUIChartModule,
        NativeScriptUIDataFormModule,
        NativeScriptUIAutoCompleteTextViewModule,
        NativeScriptFormsModule
    ],
    declarations: [
        AppComponent,
        MapComponent,
        LostPetComponent,
        SosReportComponent,
        OrganizationsComponent,
        PicturePickerComponent,
        LostPetPetDetailsComponent,
        LostPetPetPicturesComponent,
        LostPetPetLocationComponent,
        LostPetOwnerDetailsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers: [
        LapkyServerService,
        LostPetsProviderService,
        LostPetsReporterService,
        LostPetsRepository,
        OrganizationsRepository,
        SosReportsProviderService,
        SosReporterService
    ]
})
export class AppModule { }

import { Component } from '@angular/core';
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { SosReport } from '~/models/sos-report';
import { SosReporterService } from '~/services/sos-reporter.service';
import { SpatialLocation } from '~/models/spatial-location';

@Component({
    selector: 'sos-report',
    templateUrl: './sos-report/sos-report.component.html',
    styleUrls: ['./sos-report/sos-report.component.css'],
    providers: []
})
export class SosReportComponent {
    private _sosReport: SosReport;

    constructor(private sosReporterService: SosReporterService) {
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    ngOnInit(): void {
        this._sosReport = new SosReport();
    }

    get sosReport(): SosReport {
        return this._sosReport;
    }

    onTap(value: string): void {
        alert(value);
    }

    addReport() {
        console.log(this.sosReport)
        this.sosReport.lastSeenLocation = new SpatialLocation();
        this.sosReport.lastSeenLocation.latitude = 32.0675697;
        this.sosReport.lastSeenLocation.longtitude = 34.7936282
        this.sosReporterService.report(this.sosReport);
    }

    setPicture(pictureData, index) {
        console.log("GOT PICTURE", pictureData.base64)
        this.sosReport.picturesBase64[index] = pictureData.base64;
        this.sosReport.pictures[index] = pictureData.src;
    }
}
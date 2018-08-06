import { Component } from '@angular/core';
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { SosReport } from '~/models/sos-report';
import { SosReporterService } from '~/services/sos-reporter.service';

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
        this.sosReporterService.report(this.sosReport);
    }

    setPicture(pictureBase64, index) {
        console.log("GOT PICTURE", pictureBase64)
        this.sosReport.picturesBase64[index] = pictureBase64;
    }
}
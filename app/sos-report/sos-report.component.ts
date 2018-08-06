import { Component } from '@angular/core';
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

@Component({
    selector: 'sos-report',
    templateUrl: './sos-report/sos-report.component.html',
    styleUrls: ['./sos-report/sos-report.component.css'],
    providers: []
})
export class SosReportComponent {
    constructor() {
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
import { Component, OnInit } from "@angular/core";
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Slider } from "ui/slider";

@Component({
    selector: "Settings",
    moduleId: module.id,
    templateUrl: "./settings.component.html",
    styleUrls: ["./settings.component.css"]

})

export class SettingsComponent implements OnInit {
    public currentValue;


constructor() {
}

    ngOnInit(): void {
        this.currentValue=5;
        }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
    public onSliderValueChange(args) {
        let slider = <Slider>args.object;
        this.currentValue = slider.value;
    }
}

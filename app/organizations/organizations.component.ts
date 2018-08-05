import { Component, OnInit } from '@angular/core';
import { Guid } from "guid-typescript";
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

@Component({
  selector: 'organizations',
  templateUrl: './organizations/organizations.component.html',
  styleUrls: ['./organizations/organizations.component.scss'],
  providers: []
})
export class OrganizationsComponent implements OnInit {
  constructor() {
  }

  async ngOnInit() {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    if (sideDrawer)
        sideDrawer.closeDrawer();
}

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
  }
}
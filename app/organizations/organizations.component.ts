import { Component } from '@angular/core';
import { Guid } from "guid-typescript";
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

@Component({
  selector: 'organizations',
  templateUrl: './organizations/organizations.component.html',
  styleUrls: ['./organizations/organizations.component.scss'],
  providers: []
})
export class OrganizationsComponent {
  constructor() {
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
  }
}
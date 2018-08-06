import { Component, OnInit } from '@angular/core';
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { OrganizationsRepository } from "./organizations-repository";
var utilityModule = require("utils/utils");

@Component({
  selector: 'organizations',
  templateUrl: './organizations/organizations.component.html',
  styleUrls: ['./organizations/organizations.component.scss'],
  providers: []
})
export class OrganizationsComponent implements OnInit {
  public organizations : Array<any>;

  constructor(private organizationsRepository : OrganizationsRepository) {
    this.organizations = organizationsRepository.organizations;
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

  goToLink(location) {
    utilityModule.openUrl(location);
  }
}
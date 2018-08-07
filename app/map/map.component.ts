import * as geoLocation from "nativescript-geolocation";
import {Component, ViewChild, OnInit} from '@angular/core';
import * as app from "application";
import { registerElement } from 'nativescript-angular/element-registry';
import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Fab } from "nativescript-floatingactionbutton";
import { LostPetsProviderService } from "../services/lost-pets-provider.service";
import { LostPet } from '~/models/lost-pet';
import { Image } from 'tns-core-modules/ui/image/image';
import { ImageSource } from 'tns-core-modules/image-source/image-source';
import { SosReportsProviderService } from '~/services/sos-reports-provider.service';
import { SpatialLocation } from '~/models/spatial-location';
import { SosReport } from '~/models/sos-report';

registerElement("Fab", () => Fab);
registerElement('MapView', () => MapView);
 
@Component({
    moduleId: module.id,
    selector: 'map',
    templateUrl: 'map.html',
    styleUrls: ['map.css'],
})
export class MapComponent {
    latitude =  32.0672359;
    longitude = 34.7947387;
    zoom = 18;
    minZoom = 0;
    maxZoom = 22;
    bearing = 0;
    tilt = 0;
    padding = [40, 40, 40, 40];
    mapView: MapView & { infoWindowTemplates: string };
    lastCamera: String;

    enableLocationServices(): void {
        geoLocation.isEnabled().then(enabled => {
            if (!enabled) {
              console.log("fuck");
                geoLocation.enableLocationRequest().then(() => this.getDeviceLocation());
            } else {
              console.log("not fuck");
            }
        });
    }
    
    private getDeviceLocation(): Promise<any> {
      return new Promise((resolve, reject) => {
        geoLocation.enableLocationRequest().then(() => {
          geoLocation.getCurrentLocation({timeout: 10000}).then(location => {
                  resolve(location);
              }).catch(error => {
                  reject(error);
              });
          });
      });
    }

    constructor(private lostPetsProviderService: LostPetsProviderService, private sosReportsProviderService : SosReportsProviderService) {        
    }

    async ngOnInit() {
    this.enableLocationServices();
    this.getDeviceLocation().then(res => {
        this.latitude=res.latitude;
        this.longitude = res.longitude;
    });
        const sideDrawer = <RadSideDrawer>app.getRootView();
        if (sideDrawer)
            sideDrawer.closeDrawer();
    }

    onMapReady(event) {
        console.log('Map Ready, retrieving pets...');
        this.mapView = event.object;

        this.mapView.infoWindowTemplates = `<template key="lostPet" class="gavno-pet">
		<GridLayout class="gavno-pet" columns="110, *, auto" rows="auto, auto, 1, auto">
			<Image src="{{userData.image}}"
			 rowSpan="4" height="120" margin="3" verticalAlignment="top" className="infoWindowImage"></Image>
			<Label text="{{userData.name}}" className="section name" width="auto" col="1" colSpan="2"></Label>			
			<Label text="{{userData.since}}" className="section since" width="auto" row="1" col="1" colSpan="2"></Label>
			<StackLayout col="1" row="2" backgroundColor="#E2E6EB"></StackLayout>
			<Label text="פרטים" className="section details" width="auto" row="3" col="1" ></Label>
			<Label text="שיתוף" className="section share" width="auto" row="3" col="2" ></Label>
        </GridLayout>
    </template><template key="sos" class="gavno-pet">
    <GridLayout class="gavno-pet" columns="auto, *, auto" rows="auto, auto, 1, auto">        
        <Label text="מצוקה" className="section name" width="auto" col="1" colSpan="2"></Label>			
        <Label text="{{userData.summary}}" className="section since" width="auto" row="1" col="1" colSpan="2"></Label>
        <StackLayout col="1" row="2" backgroundColor="#E2E6EB"></StackLayout>
        <Label text="פרטים" className="section details" width="auto" row="3" col="1" ></Label>
        <Label text="שיתוף" className="section share" width="auto" row="3" col="2" ></Label>
    </GridLayout>
</template>`;
        this.reloadMarkers();
    }

    reloadMarkers() {
        this.mapView.removeAllMarkers();
        this.lostPetsProviderService.getLostPetsInArea().subscribe(lostPet => this.lostPetToMarker(lostPet));
        this.sosReportsProviderService.getSosReportsInArea().subscribe(sos => this.sosToMarker(sos));
    }

    sosToMarker(sos : SosReport) {
        var userData = {
            index: 1,            
            summary: sos.summary,
        };

        this.addMarker(sos.lastSeenLocation, "sos", userData, "marker_sos");
    }

    lostPetToMarker(pet : LostPet) {
        var userData = {
            index: 1,
            breed: pet.breed,
            name: pet.name,
            type: pet.type,
            since: pet.since,
            image: pet.image
        };

        this.addMarker(pet.lastSeenLocation, "lostPet", userData, "marker_lost");
    }

    addMarker(location : SpatialLocation, infoWindowTemplate : string, userData : any, iconName : string) {
        var marker = new Marker();        
        marker.position = Position.positionFromLatLng(location.latitude, location.longtitude);        
        marker.infoWindowTemplate = infoWindowTemplate;
        marker.userData = userData;

        console.log("ADDING MARKER", marker, marker.position.latitude, marker.position.longitude);

        var icon = new Image();
        icon.imageSource = new ImageSource();
        icon.imageSource.fromResource(iconName);                
        marker.icon = icon;

        this.mapView.addMarker(marker);
    }

    onCoordinateTapped(args) {
    }

    onMarkerEvent(args) {
        console.log("Marker Event: '" + args.eventName
            + "' triggered on: " + args.marker.title
            + ", Lat: " + args.marker.position.latitude + ", Lon: " + args.marker.position.longitude, args);
    }

    onCameraChanged(args) {
        this.lastCamera = JSON.stringify(args.camera);
    
    }
    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
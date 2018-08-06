import {Component, ViewChild, OnInit} from '@angular/core';
import * as app from "application";
import { registerElement } from 'nativescript-angular/element-registry';
import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Fab } from "nativescript-floatingactionbutton";
import { LostPetsProviderService } from "../services/lost-pets-provider.service";
import { LostPet } from '~/models/lost-pet';
import { Image } from 'tns-core-modules/ui/image/image';

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

    constructor(private lostPetsProviderService: LostPetsProviderService) {        
    }

    async ngOnInit() {
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
    </template>`;
        this.reloadMarkers();
    }

    reloadMarkers() {
        this.mapView.removeAllMarkers();
        this.lostPetsProviderService.getLostPetsInArea().subscribe(lostPet => this.petToMarker(lostPet));
    }

    petToMarker(pet : LostPet) {
        console.log("RECEIVED LOST PET! " + pet.name)        
        var marker = new Marker();        
        marker.position = Position.positionFromLatLng(pet.lastSeenLocation.latitude, pet.lastSeenLocation.longtitude);        
        marker.infoWindowTemplate = "lostPet";
        marker.userData = {
            index: 1,
            breed: pet.breed,
            name: pet.name,
            type: pet.type,
            since: pet.since,
            image: pet.image
        };
        var icon = new Image();
        icon.imageSource = new ImageSource();
        icon.imageSource.fromResource("marker_lost");                
        marker.icon = icon;

        this.mapView.addMarker(marker);
    }

    onCoordinateTapped(args) {
        console.log("Coordinate Tapped, Lat: " + args.position.latitude + ", Lon: " + args.position.longitude, args);
    }

    onMarkerEvent(args) {
        console.log("Marker Event: '" + args.eventName
            + "' triggered on: " + args.marker.title
            + ", Lat: " + args.marker.position.latitude + ", Lon: " + args.marker.position.longitude, args);
    }

    onCameraChanged(args) {
        console.log("Camera changed: " + JSON.stringify(args.camera), JSON.stringify(args.camera) === this.lastCamera);
        this.lastCamera = JSON.stringify(args.camera);
    
    }
    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
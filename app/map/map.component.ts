import {Component, ViewChild, OnInit} from '@angular/core';
import * as app from "application";
import { registerElement } from 'nativescript-angular/element-registry';
import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Fab } from "nativescript-floatingactionbutton";
import { LostPetsProviderService } from "../services/lost-pets-provider.service";
import { LostPet } from '~/models/lost-pet';

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
        this.mapView.infoWindowTemplates = `        <template key="lostPet">
        <StackLayout orientation="vertical" width="160" height="160" >
            <Image src="https://drmartybecker.com/wp-content/uploads/2017/03/bigstock-Mixed-Breed-Dog-Looking-Sidewa-136323740.jpg" stretch="fill"  height="100" width="100" className="infoWindowImage"></Image>
            <Label text="{{title}}" className="title" width="125" ></Label>
            <Label text="{{snippet}}" className="breed" width="125"   ></Label>
            <Label text="{{lastSeen}}" className="last-seen" width="125"   ></Label>                
        </StackLayout>
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
        marker.title = pet.name + " (" + pet.type + ")";
        marker.snippet = "Breed: " + pet.breed;
        marker.infoWindowTemplate = "lostPet";
        marker.userData = {index: 1};

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
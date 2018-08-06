import { PetType } from "./pet-type";
import { SpatialLocation } from './spatial-location';

export class LostPet {
    id: string;
    isLost: boolean;
    name: string;
    color: string;
    breed: string;
    comments: string;
    type: PetType;
    creationTime: Date;
    lastUpdateTime: Date;
    ownerName: string;
    ownerEmail: string;
    ownerPhoneNumber: string;
    pictures: Array<string>;
    lastSeenLocation: SpatialLocation;
    since: string;
    image: string;

    constructor() {
        this.isLost = true;
        this.name = "";
        this.color = "";
        this.breed = "";
        this.comments = "";
        this.type = PetType.dog;
        // this.creationTime = new Date();
        // this.lastUpdateTime = new Date();
        this.ownerName = "";
        this.ownerEmail = "";
        this.ownerPhoneNumber = "";
        // this.pictures = [];//new Array<string>();
        // this.lastSeenLocation = new SpatialLocation();
    }
}
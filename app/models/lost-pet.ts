import { PetType } from "./pet-type";
import { SpatialLocation } from './spatial-location';

export class LostPet {
    id: string;
    name: string;
    color: string;
    breed: string;
    comments: string;
    type: PetType;
    creationTime: Date;
    lastUpdateTime: Date;
    ownerName: string;
    ownerEmail: string;
    ownerPhoneNumber: number;
    pictures: Array<string>;
    lastSeenLocation: SpatialLocation;
    since: string;
}
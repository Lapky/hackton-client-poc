import { SpatialLocation } from './spatial-location';

export class SosReport {
    id: string;
    comments: string;
    creationTime: Date;
    lastUpdateTime: Date;
    reporterName: string;
    reporterEmail: string;
    reporterPhoneNumber: string;
    pictures: Array<string>;
    picturesBase64: Array<string>;
    lastSeenLocation: SpatialLocation;
    since: string;
    latitude: number;
    longtitude: number;
    summary: string;

    constructor() {
        this.comments = "";
        // this.creationTime = new Date();
        // this.lastUpdateTime = new Date();
        this.reporterName = "";
        this.reporterEmail = "";
        this.reporterPhoneNumber = "";
        this.pictures = ["", "", "", "", ""];//new Array<string>();
        this.picturesBase64 = ["", "", "", "", ""];//new Array<string>();
        // this.lastSeenLocation = new SpatialLocation();
    }

    public get image(): string {
        return this.pictures[0];
    }

    public set image(value: string) {
        this.pictures[0] = value;
    } 
}
import { Injectable } from '@angular/core';
import { LostPet } from '../models/lost-pet';
import { SpatialLocation } from '~/models/spatial-location';
import { PetType } from '~/models/pet-type';

@Injectable()
export class LostPetsRepository {
    public lostPets : Array<LostPet> = [];
    
    constructor(){
        var a = new LostPet();
        a.breed = "Garbage";
        a.name = "Dota";
        a.type = PetType.dog;
        a.lastSeenLocation = new SpatialLocation();
        a.lastSeenLocation.latitude = 32.0667061;
        a.lastSeenLocation.longtitude = 34.7958102;
    
        var b = new LostPet();
        b.name = "Mufasa";
        b.type = PetType.cat;
        b.lastSeenLocation = new SpatialLocation();
        b.lastSeenLocation.latitude = 32.0662697;
        b.lastSeenLocation.longtitude = 34.7959282

        this.lostPets.push(a);
        this.lostPets.push(b);
    }
}
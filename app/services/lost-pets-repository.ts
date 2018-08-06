import { Injectable } from '@angular/core';
import { LostPet } from '../models/lost-pet';
import { SpatialLocation } from '~/models/spatial-location';
import { PetType } from '~/models/pet-type';

@Injectable()
export class LostPetsRepository {
    public lostPets : Array<LostPet> = [];
    
    constructor(){
        var a = new LostPet();        
        a.name = "דוטה";
        a.image = "https://usercontent2.hubstatic.com/7532585_f520.jpg";
        a.type = PetType.dog;
        a.since = "לפני יומיים";
        a.lastSeenLocation = new SpatialLocation();
        a.lastSeenLocation.latitude = 32.0667061;
        a.lastSeenLocation.longtitude = 34.7958102;
        this.lostPets.push(a);

        var b = new LostPet();
        b.name = "מארני";
        b.image = "http://animated.name/uploads/posts/2016-08/1471240448_613.gif";
        b.type = PetType.cat;
        b.lastSeenLocation = new SpatialLocation();
        b.lastSeenLocation.latitude = 32.0662697;
        b.lastSeenLocation.longtitude = 34.7959282
        b.since = "לפני 3 ימים";
        this.lostPets.push(b);

        var c = new LostPet();
        c.name = "לילי";
        c.image = "https://media.mnn.com/assets/images/2017/03/sad-beagle-looking-out-window.jpg.653x0_q80_crop-smart.jpg";
        c.type = PetType.cat;
        c.lastSeenLocation = new SpatialLocation();
        c.lastSeenLocation.latitude = 32.0673697;
        c.lastSeenLocation.longtitude = 34.7939282
        c.since = "לפני 7 ימים";
        this.lostPets.push(c);
        
        var d = new LostPet();
        d.name = "קובו";
        d.image = "https://az616578.vo.msecnd.net/files/2016/03/18/6359393392043025602048062725_dumb%20dog.jpg";
        d.type = PetType.dog;
        d.lastSeenLocation = new SpatialLocation();
        d.lastSeenLocation.latitude = 32.0675697;
        d.lastSeenLocation.longtitude = 34.7936282
        d.since = "לפני 14 ימים";
        this.lostPets.push(d);
        
    }
}
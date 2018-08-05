import { Injectable } from '@angular/core';
import { LapkyServerService } from './lapky-server.service';
import { LostPet } from '~/models/lost-pet';
import { LostPetsRepository } from '~/services/lost-pets-repository';
import { Observable } from 'rxjs';
import { from } from 'rxjs';

@Injectable()
export class LostPetsProviderService {
  constructor(private lapkyServerService: LapkyServerService, 
              private lostPetsRepository : LostPetsRepository) {
                
  }

  public getLostPetsInArea() : Observable<LostPet> {
    return from(this.lostPetsRepository.lostPets);
  }
}
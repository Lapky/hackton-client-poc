import { Injectable } from '@angular/core';
import { LapkyServerService } from './lapky-server.service';
import { Observable } from 'rxjs';
import { LostPet } from '../models/lost-pet';
import { LostPetsRepository } from '~/services/lost-pets-repository';

@Injectable()
export class LostPetsReporterService {
  constructor(private lapkyServerService: LapkyServerService,
              private lostPetsRepository : LostPetsRepository) {
  }

  public report(lostPet : LostPet) {
    this.lostPetsRepository.lostPets.push(lostPet);
  }
}
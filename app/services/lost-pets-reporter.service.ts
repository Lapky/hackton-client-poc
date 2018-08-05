import { Injectable } from '@angular/core';
import { LapkyServerService } from './lapky-server.service';
import { Observable } from 'rxjs';
import { LostPet } from '../models/lost-pet';

@Injectable()
export class LostPetsReporterService {
  constructor(private lapkyServerService: LapkyServerService){}

  public report(lostPet : LostPet) {
      
      this.lapkyServerService.post('', );
  }
}
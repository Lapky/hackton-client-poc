import { Injectable } from '@angular/core';
import { LapkyServerService } from './lapky-server.service';
import { LostPetsRepository } from '~/services/lost-pets-repository';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { SosReport } from '~/models/sos-report';

@Injectable()
export class SosReportsProviderService {
  constructor(private lapkyServerService: LapkyServerService, 
              private lostPetsRepository : LostPetsRepository) {
                
  }

  public getSosReportsInArea() : Observable<SosReport> {
    return from(this.lostPetsRepository.sosReports);
  }
}
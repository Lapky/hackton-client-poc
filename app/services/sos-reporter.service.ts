import { Injectable } from '@angular/core';
import { LapkyServerService } from './lapky-server.service';
import { LostPetsRepository } from '~/services/lost-pets-repository';
import { SosReport } from '~/models/sos-report';

@Injectable()
export class SosReporterService {
  constructor(private lapkyServerService: LapkyServerService,
              private lostPetsRepository : LostPetsRepository) {
  }

  public report(sosReport : SosReport) {
    this.lostPetsRepository.sosReports.push(sosReport);
  }
}
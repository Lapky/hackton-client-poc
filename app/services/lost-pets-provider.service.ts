import { Injectable } from '@angular/core';
import { LapkyServerService } from './lapky-server.service';
import { Observable } from 'rxjs';

@Injectable()
export class LostPetsProviderService {
  constructor(private lapkyServerService: LapkyServerService){}

  public getLostPetsInArea() : Observable<any> {
      return this.lapkyServerService.test();
  }
}
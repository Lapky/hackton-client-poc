import { Component, OnInit, Input } from '@angular/core';
import { LostPet } from '~/models/lost-pet';

@Component({
  selector: 'lost-pet-owner-details',
  templateUrl: './lost-pet/lost-pet-owner-details/lost-pet-owner-details.component.html',
  styleUrls: ['./lost-pet/lost-pet-owner-details/lost-pet-owner-details.component.css'],
  providers: []
})
export class LostPetOwnerDetailsComponent implements OnInit {
  @Input() lostPet: LostPet;

  constructor() {
  }

  ngOnInit(): void {
  }
}
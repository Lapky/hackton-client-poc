import { Component, OnInit, Input } from '@angular/core';
import { LostPet } from '~/models/lost-pet';

@Component({
  selector: 'lost-pet-pet-details',
  templateUrl: './lost-pet/lost-pet-pet-details/lost-pet-pet-details.component.html',
  styleUrls: ['./lost-pet/lost-pet-pet-details/lost-pet-pet-details.component.css'],
  providers: []
})
export class LostPetPetDetailsComponent implements OnInit {
  @Input() lostPet: LostPet;

  constructor() {
  }

  ngOnInit(): void {
  }
}
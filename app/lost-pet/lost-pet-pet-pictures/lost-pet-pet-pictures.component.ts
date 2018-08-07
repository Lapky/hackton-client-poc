import { Component, OnInit, Input } from '@angular/core';
import { LostPet } from '~/models/lost-pet';

@Component({
  selector: 'lost-pet-pet-pictures',
  templateUrl: './lost-pet/lost-pet-pet-pictures/lost-pet-pet-pictures.component.html',
  styleUrls: ['./lost-pet/lost-pet-pet-pictures/lost-pet-pet-pictures.component.css'],
  providers: []
})
export class LostPetPetPicturesComponent implements OnInit {
  @Input() lostPet: LostPet;

  constructor() {
  }

  ngOnInit(): void {
  }

  setPicture(pictureData, index) {
    this.lostPet.picturesBase64[index] = pictureData.base64;
    this.lostPet.pictures[index] = pictureData.src;
  }
}
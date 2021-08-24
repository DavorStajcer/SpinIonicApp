import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MobileDish } from 'src/app/interfaces/mobileMenu';

@Component({
  selector: 'app-mobile-meal',
  templateUrl: './mobile-meal.component.html',
  styleUrls: ['./mobile-meal.component.scss'],
})
export class MobileMealComponent implements OnInit {

  constructor() { }

  public defaultImgUrl : string = "/assets/images/meal.png"
  @Input() mobileDish : MobileDish
  @Output() clickEmitter : EventEmitter<MobileDish> = new EventEmitter()

  ngOnInit() {
    if(this.mobileDish.imageUrl == undefined || this.mobileDish.imageUrl == null)
      this.mobileDish.imageUrl = this.defaultImgUrl
  }

  onMobileMealClicked(){
    this.clickEmitter.emit(this.mobileDish)
  }

}

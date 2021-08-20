import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MobileDish } from 'src/app/interfaces/mobileMenu';

@Component({
  selector: 'app-mobile-meal',
  templateUrl: './mobile-meal.component.html',
  styleUrls: ['./mobile-meal.component.scss'],
})
export class MobileMealComponent implements OnInit {

  constructor() { }


  @Input() mobileDish : MobileDish
  @Output() clickEmitter : EventEmitter<MobileDish> = new EventEmitter()

  ngOnInit() {}

  onMobileMealClicked(){
    this.clickEmitter.emit(this.mobileDish)
  }

}

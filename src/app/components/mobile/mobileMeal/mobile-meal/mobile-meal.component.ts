import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MobileMenu } from 'src/app/interfaces/mobileMenu';

@Component({
  selector: 'app-mobile-meal',
  templateUrl: './mobile-meal.component.html',
  styleUrls: ['./mobile-meal.component.scss'],
})
export class MobileMealComponent implements OnInit {

  constructor() { }


  @Input() mobileMenu : MobileMenu
  @Output() clickEmitter : EventEmitter<MobileMenu> = new EventEmitter()

  ngOnInit() {}

  onMobileMealClicked(){
    this.clickEmitter.emit(this.mobileMenu)
  }

}

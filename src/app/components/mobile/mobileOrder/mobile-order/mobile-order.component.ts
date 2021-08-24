import { Component, Input, OnInit } from '@angular/core';
import { MobileOrder } from 'src/app/interfaces/mobileOrder';

@Component({
  selector: 'app-mobile-order',
  templateUrl: './mobile-order.component.html',
  styleUrls: ['./mobile-order.component.scss'],
})
export class MobileOrderComponent implements OnInit {

  public defaultImgUrl : string = "/assets/images/meal.png"
  @Input() mobileOrder : MobileOrder

  constructor() { }

  ngOnInit() {
    if(this.mobileOrder.imageUrl == undefined || this.mobileOrder.imageUrl == null)
    this.mobileOrder.imageUrl = this.defaultImgUrl
  }

}

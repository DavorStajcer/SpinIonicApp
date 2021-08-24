import { Component,EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Order } from 'src/app/interfaces/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {

  constructor() { }

  public defaultImgUrl : string = "/assets/images/meal.png"
  @Input() order : Order
  @Output() clickEmitter : EventEmitter<Order> = new EventEmitter()

  ngOnInit() {
    if(this.order.imageUrl == undefined || this.order.imageUrl == null)
      this.order.imageUrl = this.defaultImgUrl
  }

  onOrderClicked(){
    this.clickEmitter.emit(this.order)
  }


}

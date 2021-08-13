import { Component,EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Order } from 'src/app/interfaces/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {

  constructor() { }

  @Input() order : Order
  @Output() clickEmitter : EventEmitter<Order> = new EventEmitter()

  ngOnInit() {}

  onOrderClicked(){
    this.clickEmitter.emit(this.order)
  }


}

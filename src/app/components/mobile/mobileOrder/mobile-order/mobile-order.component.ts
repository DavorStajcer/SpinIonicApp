import { Component, Input, OnInit } from '@angular/core';
import { MobileOrder } from 'src/app/interfaces/mobileOrder';

@Component({
  selector: 'app-mobile-order',
  templateUrl: './mobile-order.component.html',
  styleUrls: ['./mobile-order.component.scss'],
})
export class MobileOrderComponent implements OnInit {

  @Input() mobileOrder : MobileOrder

  constructor() { }

  ngOnInit() {}

}

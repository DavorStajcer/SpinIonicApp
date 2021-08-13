import { Component,EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Dish } from 'src/app/interfaces/dish';
import { Order } from 'src/app/interfaces/order';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
})
export class MealComponent implements OnInit {

  constructor() { }

  @Input() dish : Dish
  @Output() clickEmitter : EventEmitter<Dish> = new EventEmitter()

  ngOnInit() {}

  onDishClicked(){
    this.clickEmitter.emit(this.dish)
  }

}

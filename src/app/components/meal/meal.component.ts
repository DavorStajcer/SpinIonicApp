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

  public defaultImgUrl : string = "/assets/images/meal.png"
  @Input() dish : Dish
  @Output() clickEmitter : EventEmitter<Dish> = new EventEmitter()

  ngOnInit() {
    if(this.dish.imageUrl == undefined || this.dish.imageUrl == null)
      this.dish.imageUrl = this.defaultImgUrl
  }

  onDishClicked(){
    this.clickEmitter.emit(this.dish)
  }

}

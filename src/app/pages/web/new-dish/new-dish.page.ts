import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestourantService } from 'src/app/services/restourant/restourant.service';

@Component({
  selector: 'app-new-dish',
  templateUrl: './new-dish.page.html',
  styleUrls: ['./new-dish.page.scss'],
})
export class NewDishPage implements OnInit {


  name : string
  description : string

  constructor(
    private restaurantService : RestourantService,
    private router : Router,
    ) { }

  ngOnInit() {
  }

  onSelectImage(){
    console.log("On select image")
  }

  onSaveDish(){
    this.restaurantService.addNewDish(this.name,this.description)
    this.router.navigate(["/web/menu"])
  }

  onCancel(){
    this.router.navigate(["/web/menu"])
  }

}

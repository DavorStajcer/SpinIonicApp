import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestourantService } from 'src/app/services/restourant/restourant.service';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { PictureSourceType } from '@ionic-native/camera';
import { File } from '@ionic-native/file/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-new-dish',
  templateUrl: './new-dish.page.html',
  styleUrls: ['./new-dish.page.scss'],
})
export class NewDishPage implements OnInit {


  name: string
  description: string
  imageResponse : string[]

  constructor(
    private restaurantService: RestourantService,
    private router: Router,
    private camera: Camera,
    private file: File,
    private imagePicker : ImagePicker,
  ) { }

  ngOnInit() {
  }

  onSelectImage() {
    console.log("On select image")
  }

  onSaveDish() {
    this.restaurantService.addNewDish(this.name, this.description)
    this.router.navigate(["/web/menu"])
  }

  onCancel() {
    this.router.navigate(["/web/menu"])
  }

  changeListener(event : any){
    console.log(event.target.value)
    
  }



}

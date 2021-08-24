import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestourantService } from 'src/app/services/restourant/restourant.service';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { PictureSourceType } from '@ionic-native/camera';
import { File } from '@ionic-native/file/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-new-dish',
  templateUrl: './new-dish.page.html',
  styleUrls: ['./new-dish.page.scss'],
})
export class NewDishPage implements OnInit {


  name: string
  description: string
  imageResponse: string[]

  private selectedFile: any
  isSaveDisabled: boolean = true
  imageUrl: string

  constructor(
    private restaurantService: RestourantService,
    private router: Router,
    private firebaseStorage: AngularFireStorage,
    private userService: UserService,
  ) { }

  ngOnInit() {
  }

  onNameChanged(event: any) {
    console.log(event.target.value)
    let dishName : string = event.target.value
    if (dishName == undefined || dishName == null || dishName == " " || dishName === "" )
      this.isSaveDisabled = true
    else
      this.isSaveDisabled = false
  }

  async onSaveDish() {
    if (this.selectedFile) {
      let userId = this.userService._currentUser.value.userId
      let companyId = this.userService._currentUser.value.companyId
      let fileToUpload = this.selectedFile[0]
      this.imageUrl = await this.uploadPicture(`${companyId}${userId}${this.name}`, fileToUpload)
      await this.restaurantService.addNewDish(this.name, this.description,this.imageUrl)
    }
    await this.router.navigate(["/web/menu"])
  }

  onCancel() {
    this.router.navigate(["/web/menu"])
  }

  async changeListener(event: any) {
    this.selectedFile = event.target.files
    console.log(this.selectedFile);
    if (!this.selectedFile || this.selectedFile.lenght == 0)
      return
    console.log(event.target.files)
    let userId = this.userService._currentUser.value.userId
    let companyId = this.userService._currentUser.value.companyId
    let fileToUpload = this.selectedFile[0]
    this.imageUrl = await this.uploadPicture(`${companyId}${userId}`, fileToUpload)
    console.log(`GOT IMAGE URL -> ${this.imageUrl}`)
  }

  async uploadPicture(childFirebasePath: string, file: any): Promise<string> {
    try {
      const task = await this.firebaseStorage.ref('/images').child(childFirebasePath).put(file)
      return this.firebaseStorage.ref(`images/${childFirebasePath}`).getDownloadURL().toPromise()
    } catch (error) {
      console.log(error);
    }
  }



}

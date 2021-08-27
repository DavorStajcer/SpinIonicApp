import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestourantService } from 'src/app/services/restourant/restourant.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { UserService } from 'src/app/services/user/user.service';
import { PicturesRepo } from './picturesRepo';

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
    private picturesRepo: PicturesRepo,
    private userService: UserService,
  ) { }

  ngOnInit() {
  }

  onNameChanged(event: any) {
    console.log(event.target.value)
    let dishName: string = event.target.value
    if (dishName == undefined || dishName == null || dishName == " " || dishName === "" || this.imageUrl == undefined || this.imageUrl == null)
      this.isSaveDisabled = true
    else
      this.isSaveDisabled = false
  }

  async onSaveDish() {
    if (this.selectedFile) {
      let userId = this.userService._currentUser.value.userId
      let companyId = this.userService._currentUser.value.companyId
      let fileToUpload = this.selectedFile[0]
      this.imageUrl = await this.picturesRepo.uploadWebPicture(`${companyId}${userId}${this.name}`, fileToUpload)
      await this.restaurantService.addNewDish(this.name, this.description, this.imageUrl)
    }
    this.onCancel()
  }

  async onCancel() {
    await this.router.navigate(["/web/menu"])
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
    this.imageUrl = await this.picturesRepo.uploadWebPicture(`${companyId}${userId}`, fileToUpload)
    if (this.name == undefined || this.name == null || this.name == " " || this.name === "" || this.imageUrl == undefined || this.imageUrl == null)
      this.isSaveDisabled = true
    else
      this.isSaveDisabled = false
    console.log(`GOT IMAGE URL -> ${this.imageUrl}`)
  }





}

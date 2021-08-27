import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';




@Injectable()
export class PicturesRepo {

  constructor(
    private firebaseStorage: AngularFireStorage,
  ) { }

  private PHOTO_STORAGE: string = "photos";


  async uploadWebPicture(childFirebasePath: string, file: any): Promise<string> {
    try {
      await this.firebaseStorage.ref('/images').child(childFirebasePath).put(file)
      return this.firebaseStorage.ref(`images/${childFirebasePath}`).getDownloadURL().toPromise()
    } catch (error) {
      console.log(error);

    }
  }

}
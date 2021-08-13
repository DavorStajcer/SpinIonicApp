import { Injectable } from '@angular/core';
import { GetResult, KeysResult, Storage } from '@capacitor/storage';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }



  async getData(storageKey : string) : Promise<any | undefined> {
    return JSON.parse( (await Storage.get({key : storageKey})).value)
  }
  async setData(storageKey : string, value : any) : Promise<void> {
    return await Storage.set({key : storageKey, value : JSON.stringify(value)})
  }

  async removeData(storageKey : string) : Promise<void>{
    return await Storage.remove({key : storageKey})
  }

  async getKeys() : Promise<KeysResult> {
    return await Storage.keys() 
  }

}

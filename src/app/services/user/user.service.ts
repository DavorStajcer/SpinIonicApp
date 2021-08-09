import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestourantService } from 'src/app/services/restourant/restourant.service';


export interface User {

  name: string
  companyId: number
  userId: number
  companyName: string
  isAdmin: number
}

export enum AuthMode {
  logIn,
  signUp
}



@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLoggedIn: boolean = false
  isAsRestourant : boolean = false
  authMode: AuthMode = AuthMode.logIn

  private _isSignUp: boolean = false;
  get isSignUp(): boolean {
    return this.authMode == AuthMode.signUp;
  }
  set isSignUp(value: boolean) {
    this._isSignUp = value;
  }


  url: string = "https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food"

  constructor(private httpClient: HttpClient,private restaurantService : RestourantService) {

  }

  mapAuthModeToString() {
    return this.authMode == AuthMode.logIn ? "Sing up instead" : "Log in isntead"
  }

  mapAuthModeToAuthButtonString() {
    return this.authMode == AuthMode.logIn ? "Log in" : "Sign up"
  }

  changeAuthMode() {
    this.authMode == AuthMode.logIn ? this.authMode = AuthMode.signUp : this.authMode = AuthMode.logIn
    console.log(this.authMode)
  }



  logIn(email: string, password: string) {
    this.authMode = AuthMode.signUp
    console.log(`email -> ${email}`)
    console.log(`password -> ${password}`)
    let body = {
      "db": "Food",
      "queries": [
        {
          "query": "spUsersAzur",
          "params": {
            "action": "login",
            "email": `${email}`,
            "password": `${password}`
          }
        }
      ]
    }
    this.httpClient.post(this.url, body)
      .subscribe((response: Array<User>) => {
        console.log(`on Next, response -> ${response[0]}`)
        if (response.length == 1)
          this.isLoggedIn = true
      }, error => {
        console.log("on error")
      }, () => {
        console.log("on complete")
      })
  }

  signUp(username: string, email: string, password: string,restourantName : string) {

    let body = {
      "db": "Food",
      "queries": [
        {
          "query": "spUsersAzur",
          "params": {
            "action": "insert",
            "name": username,
            "email": email,
            "password": password
          }
        }
      ]
    }

    return this.httpClient.post(this.url, body)
    .subscribe((res : any) => {
      if (res.length > 0) {
        console.log(res[0].userid)
        if(!this.isAsRestourant)
          return
        let userId = res[0].userid  
        this.restaurantService.registerRestoraunt(restourantName,userId)
      }
    })

  }

}









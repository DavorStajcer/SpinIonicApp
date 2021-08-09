import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  authMode : AuthMode = AuthMode.logIn

  private _isNameVisible: boolean = false;
    get isNameVisible(): boolean {
        return this.authMode == AuthMode.signUp;
    }
     set bar(value: boolean) {
        this._isNameVisible = value;
  }


  url: string = "https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food"

  constructor(private httpClient: HttpClient){

  }

  mapAuthModeToString(){
    return this.authMode == AuthMode.logIn ? "Sing up instead" : "Log in isntead"
  }

  mapAuthModeToAuthButtonString(){
    return this.authMode == AuthMode.logIn ? "Log in" : "Sign up"
  }

  changeAuthMode(){
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
      .subscribe((response : Array<User>) => {
        console.log(`on Next, response -> ${response[0]}`)
        if(response.length == 1)
          this.isLoggedIn = true
      }, error => {
        console.log("on error")
      }, () => {
        console.log("on complete")
      })
  }

  signUp(username: string,email: string,  password: string) {

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

    return this.httpClient.post(this.url, body).pipe().toPromise()

  }



  signUpAdmin(userid : number) {
/*     let body = {
      "db": "Food",
      "queries": {
        "db": "Food",
        "queries": [
          {
            "query": "spUsersAzur",
            "params": {
              "action": "usertoadmins",
              "userid": userid
            }
          }
        ]
      }
    }
    console.log("Registering admin...")
    return this.httpClient.post(this.url, body).pipe().toPromise() */
    console.log(`Registering admin..., userid -> ${userid}`)
    let body = {
      "db": "Food",
      "queries": {
        "db": "Food",
        "queries": [
          {
            "query": "spUsersAzur",
            "params": {
              "action": "usertoadmins",
              "userid": userid
            }
          }
        ]
      }
    }
    this.httpClient.post(this.url, body).subscribe((res: Array<User>) => {
        if (res.length > 0) {
          this.isLoggedIn = true;
          console.log("Registered")

        }
      });

    }
    
   /*  subscribe((res: Array<User>) => {
        if (res.length > 0) {
          this.isLoggedIn = true;
          console.log(this.isLoggedIn)
        }
      }); */

    }
  

  

  




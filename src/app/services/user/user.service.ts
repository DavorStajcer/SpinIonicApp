import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestourantService } from 'src/app/services/restourant/restourant.service';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from '../storage/storage.service';



export enum AuthMode {
  logIn,
  signUp
}



@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLoggedIn: boolean = false;
  isAsRestourant: boolean = false;
  authMode: AuthMode = AuthMode.logIn;
  currentUser: User;
  public isMobile : boolean;


  _currentUser : BehaviorSubject<User> = new BehaviorSubject(null)

  private _isSignUp: boolean = false;
  get isSignUp(): boolean {
    return this.authMode == AuthMode.signUp;
  }
  set isSignUp(value: boolean) {
    this._isSignUp = value;
  }


  private url: string = "https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food"

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private storage : StorageService,
  ) {

  }


  getUserCompany(){
    return this._currentUser.getValue().companyId
  }

  mapAuthModeToString() {
    return this.authMode == AuthMode.logIn ? "Sing up instead" : "Log in isntead"
  }

  mapAuthModeToAuthButtonString() {
    return this.authMode == AuthMode.logIn ? "Log in" : "Sign up"
  }

  changeAuthMode() {
    this.authMode == AuthMode.logIn ? this.authMode = AuthMode.signUp : this.authMode = AuthMode.logIn
    if (this.authMode == AuthMode.logIn)
      this.isAsRestourant = false
    console.log(this.authMode)
  }

  async logOut(){
    this._currentUser.next(null)
    await this.storage.removeData("user")
  }

  async isUserAuthenticated(){
    let user : User = await this.storage.getData("user") as User
    if(user == undefined || user == null)
      return false
    this._currentUser.next(user)
    return true
  }

  logIn(email: string, password: string) {
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
       /*      "email" : "vedran.prpic1@gmail.com",
            "password" : "lozinka" */
          }
        }
      ]
    }
    this.httpClient.post(this.url, body)
      .subscribe(async (response: Array<User>) => {
        console.log(`on Next, response -> ${response[0]}`)
        if (response.length == 1) {
          this.isLoggedIn = true
          this.currentUser = response[0]
          this._currentUser.next(response[0])
          await this.router.navigate([`/${this.isMobile ? "mobile/tabs" : "web"}/dashboard`])
       /*    this.router.navigate(
            ['web/dashboard'], 
            {
            replaceUrl : true,
          }) */
        }

        await this.storage.setData("user",response[0])

      }, error => {
        console.log("on error")
      }, () => {
        console.log("on complete")
      })
  }

  signUp(username: string, email: string, password: string, restourantName: string) {

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
      .subscribe((res: any) => {
        if (res.length > 0) {
          console.log(res[0].userid)
          if (!this.isAsRestourant)
            return
          this.currentUser = res[0]
          let userId = res[0].userid
          this.registerRestoraunt(restourantName, userId)
        }
      })

  }

  private  registerRestoraunt(companyName: string, userId: number) {

    let body = {
      "db": "Food",
      "queries": [
        {
          "query": "spCompanyAzur",
          "params": {
            "action": "insert",
            "name": companyName,
            "status": 1,
            "userid": userId
          }
        }
      ]
    }
    console.log("Registering restaurant...")
    this.httpClient.post(this.url, body).subscribe((res: Array<User>) => {
      console.log("Registered !")
    });

  }

}









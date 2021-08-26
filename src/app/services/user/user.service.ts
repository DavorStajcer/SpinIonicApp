import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestourantService } from 'src/app/services/restourant/restourant.service';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { UserRepo } from 'src/app/pages/login/userRepo';



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
  //currentUser: User;
  public isMobile: boolean;


  _currentUser: BehaviorSubject<User> = new BehaviorSubject(null)

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
    private storage: StorageService,
    private userRepo: UserRepo
  ) {

  }


  getUserCompany() {
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

  async logOut() {
    this._currentUser.next(null)
    await this.storage.removeData("user")
  }

  async isUserAuthenticated() {
    let user: User = await this.storage.getData("user") as User
    if (user == undefined || user == null)
      return false
    this._currentUser.next(user)
    return true
  }

  async logIn(email: string, password: string) {
    let response: User = await this.userRepo.logIn(email, password)

    this.isLoggedIn = true
    console.log(`LOGGED IN -> ${response}`)
    this._currentUser.next(response)
    await this.storage.setData("user", response)
    await this.router.navigate([`/${this.isMobile ? "mobile/tabs" : "web"}/dashboard`])

  }

  async signUp(username: string, email: string, password: string, restourantName: string) {


    let response = await this.userRepo.signUp(username, email, password, restourantName)
    if (this.isAsRestourant)
      await this.userRepo.registerRestoraunt(restourantName, response.userid)
    await this.logIn(email,password)  //Register restaurant ne vraca restaurant id, tak da ne mogu dodat novog usera odmah jer mi treba njegov companyId. Log in vraca cijelog usera, koji bi nakon dodavanja firme sa njegovim userId-om trebao u bazi imati dobar companyId


  }



}









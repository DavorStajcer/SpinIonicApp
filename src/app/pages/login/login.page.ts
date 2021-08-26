import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { UserService, AuthMode } from 'src/app/services/user/user.service';

//daca@gmail.com
//12345


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  restourantName: string
  username: string
  email: string
  password: string
  isAsRestaurant : boolean = false

  isSingUp : boolean 
  auhtModeText: string
  changeAuthModeText: string



  constructor
    (
      private userService: UserService,
  ) { }

  ngOnInit() {
    this.mapAuthModeToUi()
  } 


  authenticate() {
    this.userService.authMode == AuthMode.logIn
      ? this.userService.logIn(this.email, this.password)
      : this.userService.signUp(this.username, this.email, this.password, this.restourantName)
  }

  changeAuthMode() {
    this.userService.changeAuthMode()
    this.mapAuthModeToUi()
  }

  private mapAuthModeToUi(){
    this.isSingUp = this.userService.isSignUp
    if(!this.isSingUp)
      this.isAsRestaurant = false
    this.auhtModeText = this.userService.mapAuthModeToAuthButtonString()
    this.changeAuthModeText = this.userService.mapAuthModeToString()
  }

  onIsAsRestaurantChanged(){
    this.userService.isAsRestourant = this.isAsRestaurant
    console.log(this.isAsRestaurant)
  }

}

import { Component, OnInit } from '@angular/core';
import { UserService, AuthMode } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  restourantName : string
  username: string
  email: string
  password: string


  constructor(private userService: UserService) { }

  ngOnInit() {
   
  }


  authenticate(){
    this.userService.authMode == AuthMode.logIn 
    ? this.userService.logIn(this.email,this.password) 
    : this.userService.signUp(this.username,this.email,this.password,this.restourantName)
  }

}

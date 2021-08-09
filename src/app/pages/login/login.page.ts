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


  restourantName : string
  username: string
  email: string = "daca@gmail.com"
  password: string = "12345"


  constructor(private userService: UserService) { }

  ngOnInit() {
   
  }


  authenticate(){
    this.userService.authMode == AuthMode.logIn 
    ? this.userService.logIn(this.email,this.password) 
    : this.userService.signUp(this.username,this.email,this.password,this.restourantName)
  }

}

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  email: string
  password: string

  constructor(private userService: UserService) { }

  ngOnInit() {
   
  }

  onLoginClicked(){
    this.userService.logIn(this.email, this.password)
    console.log("Log in clicked")

  }

}

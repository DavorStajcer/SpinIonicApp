import { Component, OnInit } from '@angular/core';
import { RestourantService } from 'src/app/services/restourant/restourant.service';
import { UserService, AuthMode } from 'src/app/services/user/user.service';
import { SignUpMode } from 'src/app/services/restourant/restourant.service';


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

  //signUpMode : SignUpMode = SignUpMode.normal

  
/*   private _isRestourantNameVisible: boolean = false;
    get isRestourantNameVisible(): boolean {
        return this.signUpMode == SignUpMode.restaurant;
    }
     set isRestourantNameVisible(value: boolean) {
        this._isRestourantNameVisible = value;
  }
 */

  constructor(private userService: UserService, private restaurantService : RestourantService) { }

  ngOnInit() {
   
  }

  /* changeSignUpMode(){
    this.signUpMode == SignUpMode.normal? this.signUpMode = SignUpMode.restaurant : this.signUpMode = SignUpMode.normal
  }


 */

  authenticate(){
    this.userService.authMode == AuthMode.logIn 
    ? this.userService.logIn(this.email,this.password) 
    : this.userService.signUp(this.username,this.email,this.password).then((res : any) => {
      console.log(res)
      if (res.length > 0) {
        console.log(res[0].userid)
        if(!this.restaurantService.isAsRestourant)
          return
        let userId = res[0].userid  
  /*       this.userService.signUpAdmin(userId) .then( (res : any) => {
          console.log("Admin registered")
          console.log(res)
          this.restaurantService.registerRestoraunt(this.restourantName,userId)
        })  */
      }
    })
  }

}

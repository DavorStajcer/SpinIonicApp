import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface User {

  name: string
  companyId: number
  userId: number
  companyName: string
  isAdmin: number
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLoggedIn: boolean = false
  url: string = "https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food"

  constructor(private httpClient: HttpClient) { }


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


}

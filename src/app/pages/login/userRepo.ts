import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { User } from "src/app/interfaces/user"

@Injectable()
export class UserRepo {


    private url: string = "https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food"

    constructor(
        private httpClient: HttpClient
    ) {

    }

    async logIn(email: string, password: string): Promise<User> {
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
                        /*    "email": "vedran.prpic1@gmail.com",
                           "password": "lozinka" */
                    }
                }
            ]
        }
        return await this.httpClient.post(this.url, body)
            .toPromise()
            .then(response => {
                let currentUser = response[0]
                return currentUser
            })

    }

    signUp(username: string, email: string, password: string, restourantName: string): Promise<{
        userid : number
    }> {

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
            .toPromise()
            .then(res => {
                let currentUser = res[0]
                return currentUser
            })

    }

    async registerRestoraunt(companyName: string, userId: number): Promise<void> {

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
        return await this.httpClient.post(this.url, body)
          .toPromise()
          .then((res: Array<User>) => {
            console.log("Registered !")
          });
    
      }
}
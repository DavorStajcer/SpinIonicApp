import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/interfaces/user';



@Injectable({
  providedIn: 'root'
})
export class RestourantService {

  constructor(private httpClient: HttpClient) { }

  url: string = "https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food"


  registerRestoraunt(companyName: string, userId: number) {

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


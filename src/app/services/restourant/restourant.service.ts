import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { Order } from 'src/app/interfaces/order';
import { BehaviorSubject } from 'rxjs';
import { Menu } from 'src/app/interfaces/menu';
import { Dish } from 'src/app/interfaces/dish';
import { OrderFilter } from 'src/app/util/orderFilter';
import { Restaurant } from 'src/app/interfaces/restaurant';
import { map } from 'rxjs/operators'
import { MobileMenu } from 'src/app/interfaces/mobileMenu';
import { StorageService } from '../storage/storage.service';




@Injectable({
  providedIn: 'root'
})
export class RestourantService {

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private storage: StorageService,
  ) {

    /*   this.filteredOrders.subscribe((newFilteredOrders)=>{
        this.orders.next(newFilteredOrders)
      }) */
  }

  url: string = "https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food"


  orders: BehaviorSubject<Array<Order>> = new BehaviorSubject(null)
  menus: BehaviorSubject<Array<Menu>> = new BehaviorSubject(null)
  restaurants: BehaviorSubject<Array<Restaurant>> = new BehaviorSubject(null)
  allOrders: Array<Order>
  allUserOrders : BehaviorSubject<Array<Order>> = new BehaviorSubject(null)
  mobileMenuInCart : Array<MobileMenu> = []

  dishes: Array<Dish> = []




  public currentDay = 0
  public dayDishesInMenu: Map<number, BehaviorSubject<Array<Dish>>> = new Map([
    [0, new BehaviorSubject([])],
    [1, new BehaviorSubject([])],
    [2, new BehaviorSubject([])],
    [3, new BehaviorSubject([])],
    [4, new BehaviorSubject([])],
  ])
  public dayDishesNotInMenu: Map<number, BehaviorSubject<Array<Dish>>> = new Map([
    [0, new BehaviorSubject([])],
    [1, new BehaviorSubject([])],
    [2, new BehaviorSubject([])],
    [3, new BehaviorSubject([])],
    [4, new BehaviorSubject([])],
  ])


  /*   onDishesSearchTermChnaged(searchTerm : string){
     if(searchTerm == undefined ||searchTerm == null || searchTerm == "")
 
   } */

  async onRestaurantClicked(companyId: number) {
    await this.storage.setData("restaurantId", companyId)
  }

  onMobileMenuClicked(clickedMobileMenu : MobileMenu){
    this.mobileMenuInCart.push(clickedMobileMenu)
  }

  onDishClicked(clickedDish: Dish) {
    let newList = []
    let dishesInMenu = this.dayDishesInMenu.get(this.currentDay).value
    this.dayDishesNotInMenu.get(this.currentDay).value.forEach((dish) => {
      if (dish.DishId == clickedDish.DishId && dish.Name == dish.Name && dish.Description == dish.Description) {
        dishesInMenu.push(dish)
        this.insertDishInMenu(this.currentDay, dish.DishId)
      }
      else
        newList.push(dish)

    })
    this.dayDishesInMenu.get(this.currentDay).next(dishesInMenu)
    this.dayDishesNotInMenu.get(this.currentDay).next(newList)
  }

  onDishFromMenuClicked(clickedDish: Dish) {
    let newList = []
    let dishesNotInMenu = this.dayDishesNotInMenu.get(this.currentDay).value
    this.dayDishesInMenu.get(this.currentDay).value.forEach((dish) => {
      if (dish.DishId == clickedDish.DishId && dish.Name == dish.Name && dish.Description == dish.Description) {
        dishesNotInMenu.push(dish)
        this.deleteDishFromMenu(this.currentDay, dish.DishId)
      }
      else
        newList.push(dish)

    })
    this.dayDishesNotInMenu.get(this.currentDay).next(dishesNotInMenu)
    this.dayDishesInMenu.get(this.currentDay).next(newList)

  }

  onDayChanged(newDay: number) {
    this.currentDay = newDay
  }




  onMenuChanged() {
    for (let i = 0; i < 5; i++) {
      let currentDayMenu = OrderFilter.mapMenuToDay(this.menus.value, i)
      let dishesInMenu = OrderFilter.mapMenuToDishes(currentDayMenu, this.dishes)
      this.dayDishesInMenu.get(i).next(dishesInMenu)
      let dishesNotInMenu = OrderFilter.filterChosenDishes(this.dishes, dishesInMenu)
      this.dayDishesNotInMenu.get(i).next(dishesNotInMenu)
    }
  }


  async addNewDish(name: string, description: string) {
    let currentNotMenuDishes: Dish[] = this.dayDishesNotInMenu.get(this.currentDay).value
    currentNotMenuDishes.push({
      Bread: false,
      Description: description,
      DishId: -1,
      Name: name,
      Salad: false,
      Soup: false,
    })

    let body = {
      "db": "Food",
      "queries": [
        {
          "query": "spDishAzur",
          "params": {
            "action": "insert",
            "companyid": this.userService.getUserCompany(),
            "name": name,
            "soup": 0,
            "salad": 0,
            "bread": 0,
            "userid": this.userService._currentUser.value.userId
          }
        }
      ]
    }

    this.httpClient.post(this.url, body)
      .subscribe((response: any) => {
        console.log(`Inserted dish into menu -> ${response}`)
      })
  }


  insertDishInMenu(day: number, dishId: number) {
    console.log(`Inserting dish into menu... day -> ${day}, dishId -> ${dishId}`)
    let body = {
      "db": "Food",
      "queries": [
        {
          "query": "spMenuAzur",
          "params": {
            "action": "insert",
            "dishid": dishId,
            "day": day + 1,
            "userid": this.userService._currentUser.value.userId
          }
        }
      ]
    }
    this.httpClient.post(this.url, body)
      .subscribe((response: any) => {
        console.log(`Inserted dish into menu -> ${response}`)
      })
  }
  deleteDishFromMenu(day: number, dishId: number) {
    console.log(`Inserting dish into menu... day -> ${day}, dishId -> ${dishId}`)
    let body = {
      "db": "Food",
      "queries": [
        {
          "query": "spMenuAzur",
          "params": {
            "action": "delete",
            "dishid": dishId,
            "day": day + 1,
            "userid": this.userService._currentUser.value.userId
          }
        }
      ]
    }
    this.httpClient.post(this.url, body)
      .subscribe((response: any) => {
        console.log(`Deleted dish from menu -> ${response}`)
      })
  }


  onOrderClicked(order: Order) {

  }



  async addOrder(order: Order) {
    let resId = await this.storage.getData("restaurantId")

    let body = {
      "db": "Food",
      "queries": [
        {
          "query": "spOrder",
          "params": {
            "userid": "2",
            "dishid": "1",
            "day": "1"

          }
        }
      ]
    }



  }





  initRestaurantForCompanyUser() {
    let body = {
      "db": "Food",
      "queries": [
        {
          "query": "spOrdersQuery",
          "params": {
            "action": "forCompany",
            "restoranid": this.userService.getUserCompany()
          },
          "tablename": "orders"
        },
        {
          "query": "spMenu",
          "params": {
            "action": "week",
            "companyid": this.userService.getUserCompany()
          },
          "tablename": "menus"
        },
        {
          "query": "spDishMenu",
          "params": {
            "action": "dish",
            "companyid": this.userService.getUserCompany()
          },
          "tablename": "dishes"
        }

      ]
    }

    return this.httpClient.post(this.url, body)
      .toPromise()
      .then((result: any) => {
        this.orders.next(result.orders)
        this.menus.next(result.menus)
        this.dishes = result.dishes
        return result.orders as Array<Order>
      })


  }


  async initRestaurantForCustomerUser() {
    let body = {
      "db": "Food",
      "queries": [
        {
          "query": "spCompany",
          "params": {
            "@action": "all"
          },
          "tablename": "restaurants"
        },
        {
          "query": "spMenu",
          "params": {
            "action": "all"
          },
          "tablename": "menus"
        },
      ]
    }

    return await this.httpClient.post(this.url, body)
      .pipe(
        map(
          (response: {
            restaurants: Restaurant[],
            menus: MobileMenu[],
            orders: Order[]
          }) => {
            console.log("INITIALIZING ORDERS")
            if (response.restaurants.length > 0 && response.menus.length > 0) {
              let restourants: Array<Restaurant> = response.restaurants.map((restorant) => ({
                companyId: restorant.companyId,
                name: restorant.name,
                menus: [1, 2, 3, 4, 5].map((day: number) => {
                  /*    return response.menus.filter((menu: MobileMenu) => {
                      let isForThisRestaurantAndDay = day == menu.day && menu.companyId == restorant.companyId
                      return isForThisRestaurantAndDay
                     }) */
                  let restaurantMenus: MobileMenu[] = []

                  response.menus.forEach((menu: MobileMenu) => {
                    if(menu.inCart == undefined ||menu.inCart == null)
                      menu.inCart = false
                    if (day == menu.day && menu.companyId == restorant.companyId)
                      restaurantMenus.push(menu)
                  })
                  return restaurantMenus
                }),
                image: ""
              }))
              this.restaurants.next(restourants)

            }
          }
        )
      ).toPromise()

  }


  async initOrdersForRestaurantAndUser() {
    let resId = await this.storage.getData("restaurantId")

    let body = {
      "db": "Food",
      "queries": [
        {
          "query": "spOrdersQuery",
          "params": {
            "action": "forCompany",
            "restoranid": resId,
            "tablename": "companyOrders"
          }
        },
        {
          "query": "spOrdersQuery",
          "params": {
              "action": "all",
              "tablename": "allOrders"
          }
      }
      ]
    }

    return await this.httpClient.post(this.url, body)
      .toPromise()
      .then((response: any) => {
        console.log("ORDERS RESPONSE :")
        console.log(response)
        let ordersForUser: Array<Order> = []
        response.companyOrders.forEach((order) => {
          if (order.naruciteljid == 5)
            //this.userService._currentUser.value.userId)
            ordersForUser.push(order)
        })
        let userOrders = OrderFilter.mapOrdersToUser(response.allOrders,this.userService._currentUser.value)
        this.allUserOrders.next(userOrders) 
      })

  }
}


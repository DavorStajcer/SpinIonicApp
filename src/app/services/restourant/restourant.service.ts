import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { Order } from 'src/app/interfaces/order';
import { BehaviorSubject } from 'rxjs';
import { Dish } from 'src/app/interfaces/dish';
import { OrderFilter } from 'src/app/util/orderFilter';
import { Restaurant } from 'src/app/interfaces/restaurant';
import { map } from 'rxjs/operators'
import { MobileDish } from 'src/app/interfaces/mobileMenu';
import { StorageService } from '../storage/storage.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { MobileOrder } from 'src/app/interfaces/mobileOrder';
import { MenuDish } from 'src/app/interfaces/menu';




@Injectable({
  providedIn: 'root'
})
export class RestourantService {

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private storage: StorageService,
    private firebaseStorage: AngularFireStorage,
  ) {


  }

  url: string = "https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food"


  orders: BehaviorSubject<Array<Order>> = new BehaviorSubject(null)
  menu: BehaviorSubject<Array<MenuDish>> = new BehaviorSubject(null)
  restaurants: BehaviorSubject<Array<Restaurant>> = new BehaviorSubject(null)
  allOrders: Array<Order>
  allUserOrders: BehaviorSubject<Array<Order>> = new BehaviorSubject(null)
  mobileMenuInCart: Array<MobileDish> = []

  dishes: Array<Dish> = []
  public isBottomNavBarHidden = new BehaviorSubject<boolean>(false)



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




  async onRestaurantClicked(companyId: number) {
    await this.storage.setData("restaurantId", companyId)
    this.isBottomNavBarHidden.next(true)
  }

  onMobileMenuClicked(clickedMobileMenu: MobileDish) {
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
    for (let i = 0; i < this.dayDishesNotInMenu.size; i++)

      this.dayDishesInMenu.get(this.currentDay).next(newList)

  }

  onDayChanged(newDay: number) {
    this.currentDay = newDay
  }



  onMenuChanged(menu: Array<MenuDish>) {
    for (let i = 0; i < 5; i++) {
      let currentDayMenu = OrderFilter.mapMenuToDay(menu, i)
      let dishesInMenu = OrderFilter.mapMenuToDishes(currentDayMenu, this.dishes)
      this.dayDishesInMenu.get(i).next(dishesInMenu)
      let dishesNotInMenu = OrderFilter.filterChosenDishes(this.dishes, dishesInMenu)
      this.dayDishesNotInMenu.get(i).next(dishesNotInMenu)
    }
  }


  async addNewDish(name: string, description: string, imageUrl: string) {

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
        let currentNotMenuDishes: Dish[] = this.dayDishesNotInMenu.get(this.currentDay).value
        currentNotMenuDishes.push({
          Bread: false,
          Description: description,
          DishId: -1,
          Name: name,
          Salad: false,
          Soup: false,
          imageUrl: imageUrl,
        })
        for (let i = 0; i < this.dayDishesNotInMenu.size; i++)
          this.dayDishesNotInMenu.get(i).next(currentNotMenuDishes)
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
            "companyid": this.userService.getUserCompany() //Get menu for week and company, list of MenuMeal items
          },
          "tablename": "menu"
        },
        {
          "query": "spDishMenu",
          "params": {
            "action": "dish",
            "companyid": this.userService.getUserCompany() //All dishes for company
          },
          "tablename": "dishes"
        }

      ]
    }

    return this.httpClient.post(this.url, body)
      .toPromise()
      .then(async (result: any) => {
        this.orders.next(result.orders)
        this.menu.next(result.menu)
        this.dishes = result.dishes
        this.setImagesOnDishesAndOrders()
      })

  }

  private async setImagesOnDishesAndOrders() {
    let promisesToResolve: Promise<any>[] = []
    this.dishes.forEach(dish => {
      let promise = this.mapImageToDish(dish)
      promisesToResolve.push(promise)
    })
    this.orders.value.forEach(order => {
      let promise = this.mapImageToOrder(order)
      promisesToResolve.push(promise)
    })
    await Promise.all(promisesToResolve)
  }

  async mapImageToDish(dish: Dish) {
    let userId = this.userService._currentUser.value.userId
    let companyId = this.userService._currentUser.value.companyId
    let imageUrl: string
    try {
      imageUrl = await this.firebaseStorage.ref(`images/${companyId}${userId}${dish.Name}`).getDownloadURL().toPromise()
    } catch (e) {
      //Nothing
    } finally {
      if (imageUrl != null && imageUrl != undefined)
        dish.imageUrl = imageUrl
    }
  }

  async mapImageToMobileDish(dish: MobileDish) {
    let userId = this.userService._currentUser.value.userId
    let companyId = this.userService._currentUser.value.companyId
    let imageUrl: string
    try {
      imageUrl = await this.firebaseStorage.ref(`images/${companyId}${userId}${dish.name}`).getDownloadURL().toPromise()
    } catch (e) {
      console.log(e)
    } finally {
      if (imageUrl)
        dish.imageUrl = imageUrl
    }
  }

  async mapImageToOrder(order: Order) {
    let userId = this.userService._currentUser.value.userId
    let companyId = this.userService._currentUser.value.companyId
    let imageUrl: string
    try {
      imageUrl = await this.firebaseStorage.ref(`images/${companyId}${userId}${order.jelo}`).getDownloadURL().toPromise()
    } catch (e) {
      console.log(e)
    } finally {
      if (imageUrl)
        order.imageUrl = imageUrl
    }
  }
  async mapImageToMobileOrder(order: MobileOrder) {
    let userId = this.userService._currentUser.value.userId
    let companyId = this.userService._currentUser.value.companyId
    let imageUrl: string
    try {
      imageUrl = await this.firebaseStorage.ref(`images/${companyId}${userId}${order.dishName}`).getDownloadURL().toPromise()
    } catch (e) {
      console.log(e)
    } finally {
      if (imageUrl)
        order.imageUrl = imageUrl
    }
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
            menus: MobileDish[],
          }) => {
            console.log("INITIALIZING ORDERS")
            if (response.restaurants.length > 0 && response.menus.length > 0) {
              let restourants: Array<Restaurant> = response.restaurants.map((restorant) => ({
                companyId: restorant.companyId,
                name: restorant.name,
                menus: [1, 2, 3, 4, 5].map((day: number) => {
                  let restaurantMenus: MobileDish[] = []
                  response.menus.forEach((menu: MobileDish) => {
                    if (menu.inCart == undefined || menu.inCart == null)
                      menu.inCart = false
                    if (day == menu.day && menu.companyId == restorant.companyId)
                      restaurantMenus.push(menu)
                  })
                  return restaurantMenus
                }),
                image: ""
              }))

              this.putImagesOnDishesInMenus(restourants)
              this.restaurants.next(restourants)
            }
          }
        )
      ).toPromise()

  }

  private putImagesOnDishesInMenus(restourants: Restaurant[]) {
    restourants.forEach(restaurant => {
      restaurant.menus.forEach(async mobileDishes => {
        let promisesToResolve = []
        mobileDishes.forEach(mobileDish => {
          let promise = this.mapImageToMobileDish(mobileDish)
          promisesToResolve.push(promise)

        })
        await Promise.all(promisesToResolve)
      })
    })

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

          },
          "tablename": "companyOrders"
        },
        {
          "query": "spOrdersQuery",
          "params": {
            "action": "all",

          },
          "tablename": "allOrders"
        }
      ]
    }

    return await this.httpClient.post(this.url, body)
      .toPromise()
      .then(async (response: any) => {
        console.log("ORDERS RESPONSE :")
        console.log(response)
        let ordersForUser: Array<Order> = []
        response.companyOrders.forEach((order) => {
          if (order.naruciteljid == 5)
            //this.userService._currentUser.value.userId)
            ordersForUser.push(order)
        })
        let userOrders = OrderFilter.mapOrdersToUser(response.allOrders, this.userService._currentUser.value)

        this.allUserOrders.next(userOrders)
      })

  }
}


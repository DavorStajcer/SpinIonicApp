
import { Dish } from "../interfaces/dish";
import { Menu } from "../interfaces/menu";
import { Order } from "../interfaces/order";

 export abstract class OrderFilter {

    public static mapOrdersToDay(orders : Array<Order>,day : string){
        let modifiedOrders = []
        orders.forEach((order)=>{
            if(order.dan == day)
                modifiedOrders.push(order)
        })
        return modifiedOrders
    }

    public static mapMenuToDay(menus : Array<Menu>,day : number){
        let modifiedOrders = []
        menus.forEach((menu)=>{
            if(menu.day == day + 1)
                modifiedOrders.push(menu)
        })
        return modifiedOrders
    }

    public static mapMenuToDishes(menus : Array<Menu>,dishes : Array<Dish>){
        let dishesFromMenu : Dish[] = []
        menus.forEach((menu)=>{
            dishes.forEach((dish) => {
                if(menu.name == dish.Name)
                    dishesFromMenu.push(dish)
            })
        })
        return dishesFromMenu
    }

    public static filterChosenDishes(allDishes : Array<Dish>,menuDishes : Array<Dish>){
        let dishesNotInMenu : Dish[] = []
        allDishes.forEach((dish)=>{
            let isInMenu = false
            menuDishes.forEach((menuDish) => {
                if(dish.DishId == menuDish.DishId)
                    isInMenu = true
            })
            if(!isInMenu)
                dishesNotInMenu.push(dish)
        })
        return dishesNotInMenu
    }

/*      public static areDishesEqual(first : Dish,second : Dish){
        return first.jelo == second.jelo &&
        first.resoranid == second.resoranid && 
        first.salad == second.salad &&
        first.soup == second.soup &&
        first.bread == second.bread
    } */



}
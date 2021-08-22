
import { Dish } from "../interfaces/dish";
import { Menu } from "../interfaces/menu";
import { MobileOrder } from "../interfaces/mobileOrder";
import { Order } from "../interfaces/order";
import { User } from "../interfaces/user";

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

    public static mapOrdersToUser(orders : Array<Order>, user : User){
        let userOrders : Array<Order> = []
        orders.forEach((order)=>{
            if(order.naruciteljid == user.userId)
                userOrders.push(order)
        })
        return userOrders
    }

    public static mapMobileOrdersToUser(orders : Array<MobileOrder>, user : User){
        let userOrders : Array<MobileOrder> = []
        orders.forEach((order)=>{
            if(order.orderCompanyUserId == user.userId)
                userOrders.push(order)
        })
        return userOrders
    }

    public static filterOrdersForSearchTerm(order : Array<Order>,searchTerm : string) : Order[]{
        let filteredOrders : Order[] = []
        if(searchTerm == null || searchTerm == undefined ||searchTerm == "")
            return [...order]
        order.forEach((dish)=>{
            if(dish.jelo.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
                filteredOrders.push(dish)
        })
        return filteredOrders    
    }
    public static filterDishForSearchTerm(dish : Array<Dish>,searchTerm : string) : Dish[]{
        let filteredDishes : Dish[] = []
        if(searchTerm == null || searchTerm == undefined ||searchTerm == "")
            return [...dish]
        dish.forEach((dish)=>{
            if(dish.Name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
                filteredDishes.push(dish)
        })
        return filteredDishes    
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
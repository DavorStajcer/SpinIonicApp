import { Day } from "../interfaces/day";
import { Order } from "../interfaces/order";

 abstract class OrderFilter {

    public static mapOrdersToDay(orders : Array<Order>,day : string){
        let modifiedOrders = []
        orders.forEach((order)=>{
            if(order.dan == day)
                modifiedOrders.push(order)
        })
        return modifiedOrders
    }
}
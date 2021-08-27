import { MenuDish } from "./menu";
import { MobileDish } from "./mobileMenu";

export interface Restaurant {
    companyId : number,
    name : string,
    menus? : MobileDish[][],
    image? : string
}
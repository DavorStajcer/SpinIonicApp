import { Menu } from "./menu";
import { MobileMenu } from "./mobileMenu";

export interface Restaurant {
    companyId : number,
    name : string,
    menus? : MobileMenu[][],
    image? : string
}
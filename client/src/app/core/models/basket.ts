import { v4 as uuid } from 'uuid';

export interface IBasket {
    id: string;
    items: Item[];
}

export interface Item {
    id: number;
    productName: string;
    price: number;
    quantity: number;
    pictureUrl: string;
    type: string;
    brand: string;
}

export class Basket implements IBasket{
    id = uuid();
    items: Item[]=[];
}

export interface IBasketTotal{
    shipping:number;
    subtotal:number;
    total:number;
}
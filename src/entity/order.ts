import { OrderItem } from "./order_item";

export class Order{
    _id: string;
    _customerId: string;
    _itens: OrderItem[] = [];

    constructor(_id: string, _customerId: string, _itens: OrderItem[]){
        this._id = _id;
        this._customerId = _customerId;
        this._itens = _itens;
    }
    
}
import { OrderItem } from "./order_item";

export class Order{
    private _id: string;
    private _customerId: string;
    private _itens: OrderItem[];
    private _total: number;

    constructor(_id: string, _customerId: string, _itens: OrderItem[]){
        this._id = _id;
        this._customerId = _customerId;
        this._itens = _itens;
        this._total = this.total();
        this.validate();
    }

    validate(): boolean {
        if (this._id.length === 0){
            throw new Error("ID cannot be empty");
        }
        if (this._customerId.length === 0){
            throw new Error("Customer ID cannot be empty");
        }     
        if (this._itens.length === 0){
            throw new Error("Items quantity must be greater than zero");
        }   
        return true;

    }

    total(): number{
        return this._itens.reduce((acc, item) => acc + item.price, 0);
    }
    
}
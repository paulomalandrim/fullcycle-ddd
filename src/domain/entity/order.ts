import { OrderItem } from "./order_item";

export class Order{
    private _id: string;
    private _customerId: string;
    private _items: OrderItem[];
    private _total: number;

    get customerId(): string{
        return this._customerId;
    }

    
    get items(): OrderItem[]{
        return this._items;
    }
        

    constructor(_id: string, _customerId: string, _items: OrderItem[]){
        this._id = _id;
        this._customerId = _customerId;
        this._items = _items;
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
        if (this._items.length === 0){
            throw new Error("Items quantity must be greater than zero");
        }   
        return true;

    }

    get id(): string{
        return this._id;
    }

    total(): number{
        // AJUSTADO PARA OBTER O TOTAL ATRAVES DO PRICE * QUANTITY AO INVES 
        // DE RECEBER O PRICE CALCULADO DO ITEM
        return this._items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    }
    
}
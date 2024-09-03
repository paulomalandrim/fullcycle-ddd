export class OrderItem{
    private _id:string;
    private _name:string;
    private _price:number;
    private _productId:string;
    private _quantity: number;

    constructor(id:string, name:string, price:number, productId: string, quantity: number){
        this._id = id;
        this._name = name;
        this._price = price;
        this._productId = productId;
        this._quantity = quantity;
        this.validate();
    }

    get quantity(){
        return this._quantity;
    }

    get name(){
        return this._name;
    }

    get productId(): string{
        return this._productId;
    }

    validate(): boolean{
        if (this._quantity == 0){
            throw new Error("Quantity must be greater than zero");
        }
        return true;
    }

    get id(){
        return this._id;
    }
    
    get price(){
        //return this._price * this._quantity;
        // Campo foi ajustado pois ao devolver o price * quantity o conteúdo do 
        // objeto inserido e o objeto lido são diferentes
        return this._price
    }




}
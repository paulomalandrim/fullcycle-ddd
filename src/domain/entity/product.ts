export default class Product{

    private _id: string;
    private _name: string;
    private _price: number;

    constructor(_id: string, _name: string, _price: number){
        this._id = _id;
        this._name = _name;
        this._price = _price;
        this.validate();
    }

    validate(): boolean {
        if (this._id.length === 0){
            throw new Error("ID cannot be empty");
        }
        if (this._name.length === 0){
            throw new Error("Name cannot be empty");
        }     
        if (this._price < 0){
            throw new Error("Price must be greater or equal zero");
        }   
        return true;

    }

    changeName(name: string){
        this._name = name;
        this.validate();
    }

    get name(): string{
        return this._name;
    }

    changePrice(price: number){
        this._price = price;
        this.validate();
    }

    get price(): number{
        return this._price;
    }

}
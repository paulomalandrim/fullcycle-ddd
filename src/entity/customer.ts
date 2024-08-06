import Address from "./address";

class Customer{
    _id: string;
    _name: string;
    _address!: Address;
    _active: boolean;

    constructor(id: string, name: string, active: boolean){
        this._id = id;
        this._name = name;
        this._active = active;
        this.validate();
    }

    validate(){
        if (this._name.length === 0){
            throw new Error("Name cannot be empty");
        }
        if (this._id.length === 0){
            throw new Error("ID cannot be empty");
        }
    }

    changeName(name: string){
        this._name = name;
    }

    activate(){
        if (this._address === undefined){
            throw new Error("Address must be set before activating the customer");
        }
        this._active = true;
    }

    deactivate(){
        this._active = false;
    }

    set address(address: Address){
        this._address = address;
    }

}
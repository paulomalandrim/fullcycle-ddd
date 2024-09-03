import Address from "../value-object/address";

export default class Customer{

    private _id: string;
    private _name: string;
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string){
        this._id = id;
        this._name = name;
        this.validate();
    }

    get name(): String{
        return this._name;
    }

    get id(): string{
        return this._id;
    }

    get rewardPoints(): number{
        return this._rewardPoints;
    }

    get address(): Address{
        return this._address;
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

    changeAddress(address: Address){
        this._address = address;
    }

    isActive(): boolean {
        return this._active;
    }

    addRewardPoints(points: number){
        this._rewardPoints += points;
    }

}
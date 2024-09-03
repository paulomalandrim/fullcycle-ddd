import Product from "../entity/product";

export default class ProductService{

    static increasePrice(prodcts: Product[], percentege: number): void{
        prodcts.forEach(product => {
            product.changePrice(product.price + (product.price * percentege / 100));
        });
    }
}
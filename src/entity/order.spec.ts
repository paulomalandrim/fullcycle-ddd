import { Order } from "./order";
import { OrderItem } from "./order_item";

describe("Order unit tests", () => {
    
    it("should throw error when id is empty", () => {
        expect(() => {
            let order = new Order("", "123", []);
        }).toThrow("ID cannot be empty");
    
    });

    it("should throw error when customer id is empty", () => {
        expect(() => {
            let order = new Order("123", "", []);
        }).toThrow("Customer ID cannot be empty");
    });

    it("should throw error when customer id is empty", () => {
        expect(() => {
            let order = new Order("123", "123", []);
        }).toThrow("Items quantity must be greater than zero");
    });

    it("should calculate total", () => {
        const item1 = new OrderItem("i1","Item1", 100, "p1", 2);
        const item2 = new OrderItem("i1","Item1", 100, "p2", 2);
    
        const order = new Order("123", "123", [item1, item2]);
        const total = order.total();

        expect(total).toBe(400);
    });

    it("should throw error if the item quantity is greater than zero", () => {
        expect(() => {
            const item1 = new OrderItem("i1","Item1", 100, "p1", 0);
            const order = new Order("123", "123", [item1]);    
        }).toThrow("Quantity must be greater than zero");
    });

});
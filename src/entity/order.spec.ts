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
        const item1 = new OrderItem("i1","Item1",100);
        const item2 = new OrderItem("i1","Item1",100);
    
        const order = new Order("123", "123", [item1, item2]);
        const total = order.total();

        expect(total).toBe(200);
    })

/*
    it("should activate customer", () => {
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 123, "11111", "São Paulo", "11111");
        customer.address = address;

        customer.activate();

        expect(customer.isActive()).toBe(true);
    })

    it("should deactivate customer", () => {
        const customer = new Customer("1", "Customer 1");
        
        customer.deactivate();

        expect(customer.isActive()).toBe(false);
    })

    it("should throw error when address is undefined", () => {

        expect (() => {
            const customer = new Customer("1", "Customer 1");    
            customer.activate();
        }).toThrow("Address must be set before activating the customer");
        
    })*/


});
import Address from "./address";
import Customer from "./customer";

describe("Customer unit testes", () => {
    
    it("should throw error when id is empty", () => {
        expect(() => {
            let customer = new Customer("", "John Doe");
        }).toThrow("ID cannot be empty");
    
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("123", "");
        }).toThrow("Name cannot be empty");
    })

    it("should change name", () => {
        const customer = new Customer("123", "John");
        customer.changeName("Jane");
        expect(customer.name).toBe("Jane");
    })

    it("should activate customer", () => {
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 123, "11111", "São Paulo", "11111");
        customer.changeAddress(address);

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
        
    })


});
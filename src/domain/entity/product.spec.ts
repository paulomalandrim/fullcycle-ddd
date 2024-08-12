import Product from "./product";

describe("Product unit tests", () => {
    
    it("should throw error when id is empty", () => {
        expect(() => {
            let product = new Product("", "Product 1", 100);
        }).toThrow("ID cannot be empty");
    
    });

    it("should throw error when customer id is empty", () => {
        expect(() => {
            let product = new Product("123", "", 100);
        }).toThrow("Name cannot be empty");
    });

    it("should throw error when price is less than zero", () => {
        expect(() => {
            let product = new Product("123", "Product 1", -9);
        }).toThrow("Price must be greater or equal zero");
    });

    it("should change name", () => {
        const product = new Product("123", "Produto 1", 100);
        product.changeName("Product 2");
        expect(product.name).toBe("Product 2");
    });

    it("should throw error when change by a empty name", () => {
        const product = new Product("123", "Produto 1", 100);
        expect(() => {
            product.changeName("");
        }).toThrow("Name cannot be empty");
    });

    it("should change price", () => {
        const product = new Product("123", "Produto 1", 100);
        product.changePrice(200);
        expect(product.price).toBe(200);
    });

    it("should throw error when change by a empty name", () => {
        const product = new Product("123", "Produto 1", 100);
        expect(() => {
            product.changePrice(-20);
        }).toThrow("Price must be greater or equal zero");
    });
/*
    it("should calculate total", () => {
        const item1 = new OrderItem("i1","Item1",100);
        const item2 = new OrderItem("i1","Item1",100);
    
        const order = new Order("123", "123", [item1, item2]);
        const total = order.total();

        expect(total).toBe(200);
    })


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
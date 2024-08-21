import { Sequelize } from "sequelize-typescript";
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import ProductModel from "../db/sequelize/model/procuct.model";
import ProductRepository from "./product.repository";
import Product from "../../domain/entity/product";
import { OrderItem } from "../../domain/entity/order_item";
import { Order } from "../../domain/entity/order";
import OrderRepository from "./order.repository";

describe("Order repository test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true},
        });
        
       await sequelize.addModels([OrderItemModel, CustomerModel, ProductModel, OrderModel]);
       
        await sequelize.sync();

    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a new order", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "name");
        const address = new Address("street", 123, "campinas", "sp", "11111");

        customer.changeAddress(address);

        await customerRepository.create(customer);

        const productRespoitory = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRespoitory.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );

        const order = new Order("123", "123", [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"]
        })

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customerId: customer.id,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    productId: product.id,
                    orderId: order.id,
                    quantity: orderItem.quantity,
                    name: orderItem.name,
                    price: orderItem.price,                    
                }
            ]
        })


    })

    it("should update an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "name");
        const address = new Address("street", 123, "campinas", "sp", "11111");

        customer.changeAddress(address);

        await customerRepository.create(customer);

        const productRespoitory = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRespoitory.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );

        const order = new Order("123", "123", [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"]
        })

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customerId: customer.id,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    productId: product.id,
                    orderId: order.id,
                    quantity: orderItem.quantity,
                    name: orderItem.name,
                    price: orderItem.price,                    
                }
            ]
        })    
       


    });


    it("should retrieve customer by ID after creation", async () => {
    
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("rua 1", 111, "Campinas", "SP", "13033333");
        customer.changeAddress(address);

        await customerRepository.create(customer);

        const retrievedCustomer = await customerRepository.find("1");

        expect(retrievedCustomer).not.toBeNull();
        expect(retrievedCustomer.id).toBe(customer.id);
        expect(retrievedCustomer.name).toBe(customer.name);
        expect(retrievedCustomer.address.street).toBe(customer.address.street);
        expect(retrievedCustomer.address.number).toBe(customer.address.number);
        expect(retrievedCustomer.address.city).toBe(customer.address.city);
        expect(retrievedCustomer.address.state).toBe(customer.address.state);
        expect(retrievedCustomer.address.zip).toBe(customer.address.zip);
        expect(retrievedCustomer.isActive()).toBe(false);
        expect(retrievedCustomer.rewardPoints).toBe(customer.rewardPoints);
    });

    it("should throw an error when customer is not found", async () => {
        const customerRepository = new CustomerRepository();

        expect(async () => {
            await customerRepository.find("12323");
        }).rejects.toThrow("Customer not found");
    })

    

    

});
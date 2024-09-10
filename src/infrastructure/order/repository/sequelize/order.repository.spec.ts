import { Sequelize } from "sequelize-typescript";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import ProductModel from "../../../produtct/repository/sequelize/procuct.model";
import ProductRepository from "../../../produtct/repository/sequelize/product.repository";
import Product from "../../../../domain/product/entity/product";
import { OrderItem } from "../../../../domain/checkout/entity/order_item";
import { Order } from "../../../../domain/checkout/entity/order";
import { or } from "sequelize";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";
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

    it("should update an order adding a new item", async () => {
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

        // CRIAR UM NOVO PRODUTO
        const product1 = new Product("124", "Product 2", 100);
        await productRespoitory.create(product1);

        // CRIAR NOVO ITEM
        const orderItem1 = new OrderItem(
            "2",
            product1.name,
            product1.price,
            product1.id,
            3
        );

        const orderAlterada = new Order("123", "123", [orderItem,orderItem1]);

        await orderRepository.update(orderAlterada);

        const orderModel = await OrderModel.findOne({
            where: { id: orderAlterada.id },
            include: ["items"]
        })

        expect(orderModel.toJSON()).toStrictEqual({
            id: orderAlterada.id,
            customerId: customer.id,
            total: orderAlterada.total(),
            items: [
                {
                    id: orderItem.id,
                    productId: product.id,
                    orderId: orderAlterada.id,
                    quantity: orderItem.quantity,
                    name: orderItem.name,
                    price: orderItem.price,                    
                },
                {
                    id: orderItem1.id,
                    productId: product1.id,
                    orderId: orderAlterada.id,
                    quantity: orderItem1.quantity,
                    name: orderItem1.name,
                    price: orderItem1.price,                    
                }
            ]
        })    

    });


    it("should update an order with another product in the same item", async () => {
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

        // ALTERANDO O PRODUTO DA ORDER
        const product1 = new Product("124", "Product 2", 100);
        await productRespoitory.create(product1);

        // O ITEM CRIADO TEM O MESMO CODIGO DO EXISTEM PARA ATUALIZAR
        const orderItem1 = new OrderItem(
            "1",
            product1.name,
            product1.price,
            product1.id,
            3
        );

        const orderAlterada = new Order("123", "123", [orderItem1]);

        await orderRepository.update(orderAlterada);

        const orderModel = await OrderModel.findOne({
            where: { id: orderAlterada.id },
            include: ["items"]
        })

        expect(orderModel.toJSON()).toStrictEqual({
            id: orderAlterada.id,
            customerId: customer.id,
            total: orderAlterada.total(),
            items: [
                {
                    id: orderItem1.id,
                    productId: product1.id,
                    orderId: orderAlterada.id,
                    quantity: orderItem1.quantity,
                    name: orderItem1.name,
                    price: orderItem1.price,                    
                }
            ]
        })    

    });

    it("should throw an error when not found an order in update", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("111", "name");
        const address = new Address("street", 123, "campinas", "sp", "11111");

        customer.changeAddress(address);

        await customerRepository.create(customer);

        const productRespoitory = new ProductRepository();
        const product = new Product("111", "Product 1", 10);
        await productRespoitory.create(product);

        const orderItem = new OrderItem("9", product.name, product.price, product.id, 2);

        const order = new Order("123", "123", [orderItem]);

        const orderRepository = new OrderRepository();

        expect( async () => {   
            await orderRepository.update(order)
        }).rejects.toThrow("Order not found");

    });

    it("should retrieve order by ID after creation", async () => {
    
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

        const orderFound = await orderRepository.find(order.id);

        expect(orderFound).not.toBeNull();
        expect(orderFound.id).toBe(order.id);
        expect(orderFound.customerId).toBe(order.customerId);

    });

    it("should throw an error when order is not found", async () => {
        const orderRepository = new OrderRepository();

        expect(async () => {
            await orderRepository.find("123");
        }).rejects.toThrow("Order not found");
    })

    it("should retrieve all orders after creation", async () => {
    
        const customerRepository = new CustomerRepository();
        const productRespoitory = new ProductRepository();
        const orderRepository = new OrderRepository();


        const customer1 = new Customer("123", "name");
        const address1 = new Address("street", 123, "campinas", "sp", "11111");
        customer1.changeAddress(address1);
        await customerRepository.create(customer1);

        const product1 = new Product("123", "Product 1", 10);
        await productRespoitory.create(product1);
        
        const orderItem1 = new OrderItem("1", product1.name, product1.price, product1.id, 2);
         
        const order1 = new Order("123", "123", [orderItem1]);
        await orderRepository.create(order1);

        const customer2 = new Customer("124", "name 2");
        const address2 = new Address("street", 124, "campinas", "sp", "11222");
        customer2.changeAddress(address2);
        await customerRepository.create(customer2);

        const product2 = new Product("124", "Product 2", 20);
        await productRespoitory.create(product2);

        const orderItem2 = new OrderItem("2", product2.name, product2.price, product2.id, 2);

        const order2 = new Order("124", "124", [orderItem2]);
        await orderRepository.create(order2);

        const createdOrders = [order1, order2];

        const foundOrders = await orderRepository.findAll();

        expect(createdOrders).toEqual(foundOrders);
 
    });
    
    it("should retrieve all orders after creation", async () => {
    
        const orderRepository = new OrderRepository();

        const foundOrders = await orderRepository.findAll();

        expect(foundOrders).toBeNull;
 
    });
    

});
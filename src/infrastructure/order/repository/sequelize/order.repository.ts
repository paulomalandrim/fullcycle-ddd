
import { Order } from "../../../../domain/checkout/entity/order";
import { OrderItem } from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface{
    async create(entity: Order): Promise<void> {
        await OrderModel.create({
           id: entity.id,
           customerId: entity.customerId,
           total: entity.total(),
           items: entity.items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            productId: item.productId,
            quantity: item.quantity
           })),
        },
        {
            include: [{model: OrderItemModel}]
        });      
    }

    async update(entity: Order): Promise<void> {
        
        let orderModel
        try {
            orderModel = await OrderModel.findOne({ where: { id: entity.id }, 
                                                    rejectOnEmpty: true,
                                                    include: ["items"] });
        } catch (error) {
            throw new Error("Order not found")
        }

        entity.items.forEach(async (item) => {
            await OrderItemModel.upsert({
                id: item.id,
                productId: item.productId,
                orderId: entity.id,
                quantity: item.quantity,
                name: item.name, 
                price: item.price            
            });
        });
        
        await OrderModel.update(
            {
                name: entity.id,
                customerId: entity.customerId,
                total: entity.total()
            },
            {
                where: {
                    id: entity.id
                },
            }
        );
     }

     async find(id: string): Promise<Order> {
        let orderModel
        try {
            orderModel = await OrderModel.findOne({ where: { id }, 
                                                    rejectOnEmpty: true, 
                                                    include: ["items"] });
        } catch (error) {
            throw new Error("Order not found")
        }

        const order = new Order(
            orderModel.id,
            orderModel.customerId,
            orderModel.items.map((item) => {
                return new OrderItem(
                    item.id,
                    item.name,
                    item.price,
                    item.productId,
                    item.quantity
                );
            })
        );
        return order;
     }

    async findAll(): Promise<Order[]> {
        const ordersModel = await OrderModel.findAll({ include: ["items"] });
        
        return ordersModel.map((orderModel) => {
           return new Order(
                orderModel.id, 
                orderModel.customerId, 
                orderModel.items.map((orderItemModel) => {
                    return new OrderItem(
                        orderItemModel.id,
                        orderItemModel.name,
                        orderItemModel.price,
                        orderItemModel.productId,
                        orderItemModel.quantity
                    )
                }))
        });

    }
    
}
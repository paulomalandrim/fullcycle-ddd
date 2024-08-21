
import { Order } from "../../domain/entity/order";
import { OrderItem } from "../../domain/entity/order_item";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

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
        }
    );
    }

    async update(entity: Order): Promise<void> {
    //     await CustomerModel.update(
    //         {
    //             name: entity.name,
    //             street: entity.address.street,
    //             number: entity.address.number,
    //             zipcode: entity.address.zip,
    //             city: entity.address.city,
    //             state: entity.address.state,
    //             active: entity.isActive(),
    //             rewardPoints: entity.rewardPoints,
    //         },
    //         {
    //             where: {
    //                 id: entity.id
    //             },
    //         }
    //     );
     }

     async find(id: string): Promise<Order> {
        let orderModel
        try {
            orderModel = await OrderModel.findOne({ where: { id }, rejectOnEmpty: true });
        } catch (error) {
            throw new Error("Order not found")
        }

        const order = new Order(
            orderModel.id,
            orderModel.customerId,
            orderModel.items.map((orderItemModel) => {
                const item = new OrderItem(
                    orderItemModel.id,
                    orderItemModel.name,
                    orderItemModel.price,
                    orderItemModel.productId,
                    orderItemModel.quantity
                )
                return item;
            })
        );

        return order;
     }

    async findAll(): Promise<Order[]> {
        const ordersModel = await OrderModel.findAll();
        
       return ordersModel.map((orderModel) => {
           const order = new Order(
                orderModel.id, 
                orderModel.customerId, 
                orderModel.items.map((orderItemModel) => {
                    const orderItem = new OrderItem(
                        orderItemModel.id,
                        orderItemModel.name,
                        orderItemModel.price,
                        orderItemModel.productId,
                        orderItemModel.quantity
                    );
                    return orderItem;
                }))
            return order; 
        });

    }
    
}
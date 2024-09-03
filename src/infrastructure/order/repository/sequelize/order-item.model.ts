import {BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import ProductModel from "../../../produtct/repository/sequelize/procuct.model";
import OrderModel from "./order.model";

@Table({
    tableName: "order_items",
    timestamps: false,
})
export default class OrderItemModel extends Model{
    @PrimaryKey
    @Column
    declare id: string;

    @ForeignKey(() => ProductModel)
    @Column({allowNull: false})
    declare productId: string;

    @BelongsTo(() => ProductModel)
    declare product: Awaited<ProductModel>;

    @ForeignKey(() => OrderModel)
    @Column({allowNull: false})
    declare orderId: string;

    @BelongsTo(() => OrderModel)
    declare order: Awaited<OrderModel>;

    @Column({allowNull: false})
    declare quantity: number;

    @Column({allowNull: false})
    declare name: string;

    @Column({allowNull: false})
    declare price: number;

}
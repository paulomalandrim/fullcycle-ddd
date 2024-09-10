import Address from "./domain/customer/value-object/address";
import Customer from "./domain/customer/entity/customer";
import { Order } from "./domain/checkout/entity/order";
import { OrderItem } from "./domain/checkout/entity/order_item";

let customer = new Customer("111", "Paulo Malandrim");
const address = new Address("rua 1", 555, "Campinas", "SP", "1333");
customer.changeAddress(address);
customer.activate();

const item1 = new OrderItem("122", "item1", 100, "123", 10);
const item2 = new OrderItem("123", "item2", 100, "123", 15);
const item3 = new OrderItem("124", "item3", 100, "123", 19);

const order = new Order("123", "111", [item1, item2, item3]);

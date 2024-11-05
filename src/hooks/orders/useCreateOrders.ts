import { CreateOrderDto } from "@/dto/order/createOrder.dto"
import { OrdersService } from "@/services/orders.service";

export const useCreateProduct = () => {
    const createProduct = async (order: CreateOrderDto) => {
        const orderService = new OrdersService("http://localhost:3001/");
        await orderService.create(order);
    }

    return {createProduct};
};
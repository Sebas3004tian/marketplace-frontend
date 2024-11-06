import { CreateOrderDto } from "@/dto/order/createOrder.dto"
import { OrdersService } from "@/services/orders.service";

export const useCreateProduct = () => {
    const createProduct = async (order: CreateOrderDto) => {
        const orderService = new OrdersService("https://marketplace-backend-production-d4eb.up.railway.app/");
        await orderService.create(order);
    }

    return {createProduct};
};
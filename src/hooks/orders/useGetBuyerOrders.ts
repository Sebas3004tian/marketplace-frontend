import { Order } from "@/interfaces/order";
import { OrdersService } from "@/services/orders.service";

export const useGetBuyerOrders = () => {
    const getBuyerOrders = async () => {
        const ordersService = new OrdersService("http://localhost:3001/");
        const buyerOrders = await ordersService.getBuyerOrders();

        return buyerOrders as Order[];
    }

    return {getBuyerOrders};
};
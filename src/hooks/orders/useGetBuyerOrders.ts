import { Order } from "@/interfaces/order";
import { OrdersService } from "@/services/orders.service";

export const useGetBuyerOrders = () => {
    const getBuyerOrders = async () => {
        const ordersService = new OrdersService("https://marketplace-backend-production-d4eb.up.railway.app/");
        const buyerOrders = await ordersService.getBuyerOrders();

        return buyerOrders as Order[];
    }

    return {getBuyerOrders};
};
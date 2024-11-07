import { Order } from "@/interfaces/order";
import { OrdersService } from "@/services/orders.service";

export const useGetSellerOrders = () => {
    const getSellerOrders = async () => {
        const ordersService = new OrdersService("https://marketplace-backend-production-d4eb.up.railway.app/");
        const sellerOrders = await ordersService.getSellerOrders();

        return sellerOrders as Order[];
    }

    return {getSellerOrders};
};
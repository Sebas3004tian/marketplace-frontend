import { Order } from "@/interfaces/order";
import { OrdersService } from "@/services/orders.service";

export const useGetSellerOrders = () => {
    const getSellerOrders = async () => {
        const ordersService = new OrdersService("http://localhost:3001/");
        const sellerOrders = await ordersService.getSellerOrders();

        return sellerOrders as Order[];
    }

    return {getSellerOrders};
};
import axios, {AxiosInstance}  from 'axios';
import { CreateOrderDto } from '@/dto/order/createOrder.dto';
import Cookies from "js-cookie";

export class OrdersService {
    protected readonly axios: AxiosInstance;
    constructor(url: string) {
        this.axios= axios.create({
            baseURL: url,
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 30000,
            timeoutErrorMessage: 'Request Timeout'
        });
    }

    public async getSellerOrders() {
        const response = await this.axios.get("/orders/seller_orders", {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        });
        return response.data;
    }

    public async getBuyerOrders() {
        const response = await this.axios.get("/orders/buyer_orders", {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        });
        return response.data;
    }
    public async create(createOrderDto: CreateOrderDto) {
        const response = await this.axios.post("/orders/create",createOrderDto, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        });
        return response.data;
    }
}
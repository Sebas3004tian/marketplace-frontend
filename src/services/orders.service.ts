import axios, {AxiosInstance}  from 'axios';
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

    /* ----------- Los implementa Paz ---------------
    /*public async getBuyerOrders() {

    }
    /*public async create(createOrderDto: CreateOrderDto) {

    }*/
}
import axios, {AxiosInstance} from 'axios';
import Cookies from "js-cookie";
import {Product} from "@/interfaces/product";

export class ProductsService {
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

    public async getAll() {
        const response = await this.axios.get('/product/all', {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        });
        return response.data;
    }

    public async create(product: Product) {
        return await this.axios.post('/product/create', product, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })
    }
}
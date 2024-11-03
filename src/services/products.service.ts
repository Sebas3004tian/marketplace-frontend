import axios, { AxiosInstance } from 'axios';
import Cookies from "js-cookie";
import { Product } from "@/interfaces/product";
import { CreateProductDto } from "@/dto/product/createProduct.dto";

export class ProductsService {
    protected readonly axios: AxiosInstance;

    constructor(url: string) {
        this.axios = axios.create({
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

    public async getMyProducts() {
        const response = await this.axios.get('/product/seller_products', {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        });
        return response.data;
    }

    public async getProduct(id: string) {
        const response = await this.axios.get(`/product/get/${id}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        });
        return response.data;
    }

    public async create(product: CreateProductDto) {
        return await this.axios.post('/product/create', product, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        });
    }

    public async update(id: string, product: Partial<Product>) {
        const response = await this.axios.patch(`/product/update/${id}`, product, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        });
        return response.data;
    }

    public async delete(id: string) {
        const response = await this.axios.delete(`/product/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        });
        return response.data;
    }
}

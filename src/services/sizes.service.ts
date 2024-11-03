import axios, {AxiosInstance}  from 'axios';
import Cookies from "js-cookie";
import {CreateSizeDto} from "@/dto/size/createSize.dto";

export class SizesService {
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

    public async getByProduct(productId: string) {
        const response = await this.axios.get("/sizes/product/"+productId, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        });
        return response.data;
    }

    public async delete(id: string) {
        const response = await this.axios.delete("/sizes/delete/"+id, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        });
        return response.data;
    }

    public async create(createSizeDto: CreateSizeDto) {
        const response = await this.axios.post("/sizes/create", createSizeDto, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        });
        return response.data;
    }
}
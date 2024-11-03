import axios, {AxiosInstance}  from 'axios';
import Cookies from "js-cookie";
import {Option} from "@/interfaces/option";

export class OptionsService {
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

    public async getBySize(sizeId: string) {
        const response = await this.axios.get("/options/size/"+sizeId, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        });
        return response.data;
    }

    public async delete(id: string) {
        const response = await this.axios.delete("/options/delete/"+id, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        });
        return response.data;
    }

    public async update(id: string, option: Partial<Option>) {
        const response = await this.axios.put("/options/update/"+id, option, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        });
        return response.data;
    }
}
import axios, {AxiosInstance}  from 'axios';
import Cookies from "js-cookie";

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
}
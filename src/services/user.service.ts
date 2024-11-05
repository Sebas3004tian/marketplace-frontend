import axios, {AxiosInstance}  from 'axios';
import Cookies from "js-cookie";

export class UserService {
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

    public async editUser(id: string, fullName: string, email: string, address: string) {
        const response = await this.axios.put(`/users/${id}`, {
            fullName,
            email,
            address
        },{
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        }
    );
    
        return response.data;
    }
    
}
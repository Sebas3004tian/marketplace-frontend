import axios, {AxiosInstance}  from 'axios';

export class AuthService {
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

    public async login(email: string, password: string) {
        const response = await this.axios.post('/auth/login', {
            email,
            password
        });

        return response.data;
    }
}
import axios, { AxiosInstance } from 'axios';

export class UploadService {
    protected readonly axios: AxiosInstance;

    constructor(url: string) {
        this.axios = axios.create({
            baseURL: url,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            timeout: 30000,
            timeoutErrorMessage: 'Request Timeout'
        });
    }

    public async upload(file: File): Promise<string> {
        const formData = new FormData();
        formData.append('file', file);

        const response = await this.axios.post('/upload/image', formData);
        return response.data.url;
    }
}
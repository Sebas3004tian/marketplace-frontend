import axios, {AxiosInstance}  from 'axios';
import { CreateReviewDto} from '@/dto/review/createReview.dto'
import Cookies from "js-cookie";

export class ReviewService {
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

    public async getAll(id:string) {
        const response = await this.axios.get(`/review/${id}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        });
        return response.data;
    }

    public async create(reviewDto: CreateReviewDto) {
        const response = await this.axios.post(`/review/product`,reviewDto ,{
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        });
        return response.data;
    }
}